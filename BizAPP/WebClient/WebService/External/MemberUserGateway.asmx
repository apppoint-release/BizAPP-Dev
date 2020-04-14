<%@ WebService Language="C#" Class="BizAPP.Runtime.WebService.MemberUserGateway" %>
namespace BizAPP.Runtime.WebService
{
	using System;
	using System.Web;
	using System.Web.Services;
	using System.Web.Services.Protocols;

	using BizAPP.Runtime.Core.Service.Session;
	using BizAPP.Runtime.WebService.Utility;
	using BizAPP.Runtime.Core;
	using System.Configuration;
	using System.Collections;
	using BizAPP.Common.Exceptions;
	using BizAPP.Common;
	using BizAPP.Runtime.Core.Utils;
	using BizAPP.Runtime.Core.Service.ExternalDataSource;

	[WebService( Namespace="http://tempuri.org/" )]
	[WebServiceBinding( ConformsTo=WsiProfiles.BasicProfile1_1 )]
	// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
	// [System.Web.Script.Services.ScriptService]
	public class MemberUserGateway : System.Web.Services.WebService
	{

		/// <summary>
		/// Creates member if it does not exists already with the given name
		/// </summary>
		/// <param name="memberName"></param>
		/// <param name="memberId"></param>
		/// <returns></returns>

		[WebMethod]
		public string CreateMember( string providerConfigurationName, string userName, string memberId )
		{
			m_log.Debug( "BIZAPPWS : CreateMember" );

			IRuntimeSession runtimeSession = GetSession( );
			if ( runtimeSession == null )
				throw new BizAPPException( "Invalid Session" );

			string errorString = "Member has been created successfully";
			try
			{
				CreateMember( providerConfigurationName, userName, memberId, runtimeSession );
			}
			catch ( BizAPPException ex )
			{
				m_log.Error( "BIZAPPWS : CreateMember Error - {0}", ex.Message );
				m_log.Debug( "BIZAPPWS : CreateMember Error - {0}", ex.StackTrace );
				errorString = ex.Message;
			}
			finally
			{
				( runtimeSession as IDisposable ).Dispose( );
			}
			return errorString;
		}


		/// <summary>
		/// 
		/// </summary>
		/// <returns></returns>
		[WebMethod( Description="Makes the member active or inactive" )]
		public string SetActive( string userName, string memberId, bool isActive )
		{
			m_log.Debug( "BIZAPPWS : SetActive" );

			IRuntimeSession runtimeSession = GetSession( );
			if ( runtimeSession == null )
				throw new BizAPPException( "Invalid Session" );


			string externalUserId = string.Format( "{0}_{1}", userName, memberId );


			string errorString = string.Format( "Member is {0}activated", isActive ? string.Empty : "de" );
			try
			{
				IRuntimeObject user  = GetMemberUser( runtimeSession, externalUserId );
				if ( user == null )
					throw new BizAPPException( "User not available" );
				if ( !user.Editable )
					user.Modify( );
				user[ WellKnownSystemObjects.SystemUnit.SystemModule.User.Fields.Active ] = isActive;
				user.Save( );
			}
			catch ( BizAPPException ex )
			{
				m_log.Error( "BIZAPPWS : SetActive Error - {0}", ex.Message );
				m_log.Debug( "BIZAPPWS : SetActive Error - {0}", ex.StackTrace );
				errorString = ex.Message;
			}
			finally
			{
				( runtimeSession as IDisposable ).Dispose( );
			}
			return errorString;
		}


		private IRuntimeSession GetSession( )
		{
			string userName = "admin";// ConfigurationManager.AppSettings[ "UserName" ];
			string password = "admin";// ConfigurationManager.AppSettings[ "Password" ];
			string enterprise ="Inspect_User";// ConfigurationManager.AppSettings[ "Enterprise" ];

			if ( string.IsNullOrEmpty( userName ) )
				throw new BizAPPException( "Username not specified." ); // TODO
			if ( string.IsNullOrEmpty( enterprise ) )
				throw new BizAPPException( "Enterprise not specified." ); // TODO

			try
			{
				IRuntimeSession currentSession = DoLogin( userName, password, enterprise );
				if ( currentSession != null )
				{
					currentSession.Mode = SessionMode.Service;
					return currentSession;
				}
			}
			catch ( BizAPPException ex )
			{
				throw;
			}

			return null;
		}

		IRuntimeObject GetMemberUser( IRuntimeSession session, string externalUserId )
		{
			Hashtable ht = new Hashtable( 1 );
			ht[ WellKnownSystemObjects.SystemUnit.SystemModule.User.Fields.LoginID ] = externalUserId;
			IRuntimeObjectCollection users =  session.GetObjectsWithPublicFields( OBJECTTYPE_MEMBER, ht );

			if ( users.Count > 0 )
				return users.ToRuntimeObjects( true )[ 0 ];
			else
				return null;
		}

		IRuntimeObject GetMemberRole( IRuntimeSession session, string externalUserId )
		{
			Hashtable ht = new Hashtable( 1 );
			ht[ WellKnownSystemObjects.SystemUnit.SystemModule.Role.Fields.ShortName ] = externalUserId;
			IRuntimeObjectCollection roles =  session.GetObjectsWithPublicFields( WellKnownSystemObjects.SystemUnit.SystemModule.Role.ObjectType, ht );

			if ( roles.Count > 0 )
				return roles.ToRuntimeObjects( true )[ 0 ];
			else
				return null;
		}

		private bool CreateMember( string providerConfigurationName, string userName, string memberId, IRuntimeSession runtimeSession )
		{
			if ( runtimeSession == null )
				throw new BizAPPException( "Invalid Session" );

			try
			{
				string externalUserId = string.Format( "{0}_{1}", userName, memberId );

				IRuntimeObject user  = GetMemberUser( runtimeSession, externalUserId );

				if ( user == null )
					user = runtimeSession.CreateObject( OBJECTTYPE_MEMBER );

				if ( !user.Editable )
					user.Modify( );

				user[ WellKnownSystemObjects.SystemUnit.SystemModule.User.Fields.LoginID ] = externalUserId;
				//user[ WellKnownSystemObjects.SystemUnit.SystemModule.User.Fields.Active ] = true;
				//user[ "MemberId" ] = memberId;
				user[ "FirstName" ] = userName;

				IRuntimeObject role = GetMemberRole( runtimeSession, externalUserId );

				if ( role == null )
					role = runtimeSession.CreateObject( WellKnownSystemObjects.SystemUnit.SystemModule.Role.ObjectType );

				if ( !role.Editable )
					role.Modify( );

				role[ WellKnownSystemObjects.SystemUnit.SystemModule.Role.Fields.User ] = user;
				role[ WellKnownSystemObjects.SystemUnit.SystemModule.Role.Fields.ShortName ] = externalUserId;

				user.Save( );
				role.Save( );


                IExternalDataSourceProvider provider = runtimeSession.GetExternalProvider ( "ENIT", providerConfigurationName );

				if ( provider == null )
					throw new BizAPPException( "Provider 'ENIT' is not available" );

				string[ ] connectionParameters = provider.DefaultConnectionParameterNames;

				NamedConfigurationHelper.SetupExternalConfiguration( "ENIT", provider.DefaultConnectionParameterNames, user, memberId );

				return true;
			}
			catch ( BizAPPException ex )
			{
				throw ex;
			}
		}

		/// <summary>
		/// Perform login using configured credentials
		/// </summary>
		/// <returns></returns>
		static IRuntimeSession DoLogin( string userName, string password, string enterprise )
		{
			m_log.Debug( "DoLogin..." );

			HttpContext currentContext = HttpContext.Current;
			string hosting = GetConfiguredValue( currentContext, WSConstants.HOSTINGAGENT );
			if ( string.IsNullOrEmpty( hosting ) )
				throw new Exception( "Hosting URI has not been specified in the configuration" ); // TODO : Localize

			string locator = GetConfiguredValue( currentContext, WSConstants.LOCATOR );
			if ( string.IsNullOrEmpty( locator ) )
				throw new Exception( "Locator URI has not been specified in the configuration" ); // TODO : Localize

			// Use user specific value first..
			if ( string.IsNullOrEmpty( enterprise ) )
			{
				enterprise = GetConfiguredValue( currentContext, WSConstants.ENTERPRISE );
				if ( string.IsNullOrEmpty( enterprise ) )
					throw new Exception( "Enterprise has not been specified in the configuration" ); // TODO : Localize
			}

			m_log.Debug( "Login : Hosting={0} Locator={1} Enterprise={2}", hosting, locator, enterprise );

			// TODO :Fix this after fixing the external object load problem
			//RuntimeBootstrap bootstrap = RuntimeBootstrap.GetTheOnlyBootstrap( locator );
			RuntimeBootstrap bootstrap = RuntimeBootstrap.GetTheOnlyBootstrap( hosting, locator );
			IRuntimeSession session = bootstrap.GetSession( userName, password, enterprise, BizAPP.Runtime.Core.Service.Authentication.NetworkInformation.Current, SessionMode.Client );
			m_log.Debug( "Login done : BizAPPsession id : {0}", session.SessionId );
			return session;
		}


		/// <summary>
		/// Gets the current configured value from form post, then query string, then config file...
		/// </summary>
		/// <param name="currentContext"></param>
		/// <param name="parameterName"></param>
		/// <returns></returns>
		static string GetConfiguredValue( HttpContext currentContext, string parameterName )
		{
			string value = null;
			if ( currentContext != null )
			{
				value = currentContext.Request.Form[ parameterName ];
				if ( string.IsNullOrEmpty( value ) )
					value = currentContext.Request.QueryString[ parameterName ];
			}

			if ( string.IsNullOrEmpty( value ) )
				value = ConfigurationManager.AppSettings[ parameterName ];
			return value;
		}

		//const string OBJECTTYPE_MEMBER ="MemberManagement.MemberDataMgmt.MemberUser";
		const string OBJECTTYPE_MEMBER = WellKnownSystemObjects.SystemUnit.SystemModule.User.ObjectType;
		/// <summary>
		/// Logger
		/// </summary>
		static Logger m_log = Logger.GetInstance( typeof( MemberUserGateway ).FullName );

	}
}