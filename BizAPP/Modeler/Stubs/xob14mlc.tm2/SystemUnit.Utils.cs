namespace SystemUnit.Utils
{
	public interface IPublishContext
	{
BizAPP.Runtime.Core.IRuntimeObject Activity
{
get;
set;
}
BizAPP.Runtime.Core.IRuntimeObject Application
{
get;
set;
}
BizAPP.Runtime.Core.ISoftTransaction Transaction
{
get;
set;
}
SystemUnit.Utils.IActivityChangeSet ChangeSet
{
get;
set;
}
SystemUnit.Utils.PublishType PublishType
{
get;
set;
}
SystemUnit.Utils.IPublishInfo PublishInfo
{
get;
set;
}
SystemUnit.Utils.PackageInfo PackageInfo
{
get;
set;
}
System.String TraceCategory
{
get;
set;
}
System.Boolean PublishToGAC
{
get;
set;
}
System.Boolean CheckDependentActivities
{
get;
set;
}
SystemUnit.Utils.ICodegenInfo CodegenInfo
{
get;
set;
}
BizAPP.Runtime.Core.Service.Session.IRuntimeSession Session
{
get;
set;
}
System.Object[] Args
{
get;
set;
}
System.Collections.Generic.List<BizAPP.Runtime.Core.IRuntimeObject> PublishedObjects
{
get;
set;
}

	}
}
namespace SystemUnit.Utils
{
	[System.Serializable]
public partial class PublishContext : SystemUnit.Utils.IPublishContext
	{
public static System.Collections.Generic.List<System.String[]> OrderedCollection = null;
public const System.String SIGN_KEY_FOLDER = @".";
public BizAPP.Runtime.Core.IRuntimeObject Activity
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public BizAPP.Runtime.Core.IRuntimeObject Application
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public BizAPP.Runtime.Core.ISoftTransaction Transaction
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public SystemUnit.Utils.IActivityChangeSet ChangeSet
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public SystemUnit.Utils.PublishType PublishType
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public SystemUnit.Utils.IPublishInfo PublishInfo
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public SystemUnit.Utils.PackageInfo PackageInfo
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String TraceCategory
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Boolean PublishToGAC
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Boolean CheckDependentActivities
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public SystemUnit.Utils.ICodegenInfo CodegenInfo
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public BizAPP.Runtime.Core.Service.Session.IRuntimeSession Session
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Object[] Args
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Collections.Generic.List<BizAPP.Runtime.Core.IRuntimeObject> PublishedObjects
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public PublishContext(  )
		{}

	}
}
namespace SystemUnit.Utils
{
	public interface ICodegenInfo
	{
		void InitializeItems(  );
System.Collections.Generic.Dictionary<System.String,System.String> Builds
{
get;
set;
}
System.Collections.Generic.Dictionary<System.String,System.Collections.Generic.List<System.String>> IdToAssembliesMap
{
get;
set;
}
System.Collections.Generic.Dictionary<System.String,System.String> IdToObjectMap
{
get;
set;
}
System.Collections.Generic.Dictionary<System.String,System.String> IdToAssemblyReferences
{
get;
set;
}
System.Collections.Generic.Dictionary<System.String,BizAPP.Runtime.Core.IRuntimeObject> BOsInChangeSet
{
get;
set;
}
System.Collections.Generic.Dictionary<System.String,System.Xml.XmlDocument> BOXmls
{
get;
set;
}
System.String CodegenFolder
{
get;
set;
}
System.String InstallerFolder
{
get;
set;
}
System.String StubsFolder
{
get;
set;
}
System.String KeysFolder
{
get;
set;
}
System.Boolean InstallerInterfaceToGAC
{
get;
set;
}

	}
}
namespace SystemUnit.Utils
{
	[System.Serializable]
public partial class CodegenInfo : SystemUnit.Utils.ICodegenInfo
	{
public const System.String CODEGEN_FOLDER = @"codegen";
public const System.String INSTALLER_FOLDER = @"installer";
		public void Clear(  )
		{
throw new System.NotImplementedException( );
		}

		public void InitializeItems(  )
		{
throw new System.NotImplementedException( );
		}

public System.Collections.Generic.Dictionary<System.String,System.String> Builds
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Collections.Generic.Dictionary<System.String,System.Collections.Generic.List<System.String>> IdToAssembliesMap
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Collections.Generic.Dictionary<System.String,System.String> IdToObjectMap
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Collections.Generic.Dictionary<System.String,System.String> IdToAssemblyReferences
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Collections.Generic.Dictionary<System.String,BizAPP.Runtime.Core.IRuntimeObject> BOsInChangeSet
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Collections.Generic.Dictionary<System.String,System.Xml.XmlDocument> BOXmls
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String CodegenFolder
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String InstallerFolder
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String StubsFolder
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String KeysFolder
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Boolean InstallerInterfaceToGAC
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public CodegenInfo(  )
		{}

	}
}
namespace SystemUnit.Utils
{
public enum PublishType
{
Publish = 0,
Package = 1,
PublishApplication = 2,
PublishData = 3,
Test = 4,
ValidateChanges = 5,
PublishOne = 6,
PublishIncremental = 7,
PublishAll = 8,
PackageEnterprise = 9,
Validate = 10,
PublishApplicationData = 11,
PublishCancelDraftedItems = 12
}
}
namespace SystemUnit.Utils
{
	public interface IPublishInfo
	{
System.IServiceProvider Context
{
get;
set;
}
System.String PublishPath
{
get;
set;
}
System.Boolean TestDB
{
get;
set;
}
System.IServiceProvider UserDbContext
{
get;
set;
}

	}
}
namespace SystemUnit.Utils
{
	[System.Serializable]
public partial class PublishInfo : SystemUnit.Utils.IPublishInfo
	{
public static System.Boolean bDelete = true;
public System.IServiceProvider Context
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String PublishPath
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Boolean TestDB
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.IServiceProvider UserDbContext
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public PublishInfo(  )
		{}

	}
}
namespace SystemUnit.Utils
{
	[System.Serializable]
public partial class PackageInfo
	{
public const System.String BUSINESSOBJECT_FOLDER = @"BusinessObjects";
public const System.String BASEDEF_FOLDER = @"BaseDefs";
public const System.String RUNTIMEOBJECT_FOLDER = @"RuntimeObjects";
public const System.String INSTALLER_FOLDER = @"Installer";
public System.String PackagePath
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ActivityFolder
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ActivityFile
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String BusinessObjectFolder
{
get {throw new System.NotImplementedException( );}}
public System.String RuntimeObjectFolder
{
get {throw new System.NotImplementedException( );}}
public System.String InstallerFolder
{
get {throw new System.NotImplementedException( );}}
		public PackageInfo(  )
		{}

	}
}
namespace SystemUnit.Utils
{
	public interface IActivityChangeSet
	{
System.Collections.Hashtable BusinessObjectItems
{
get;
set;
}

	}
}
namespace SystemUnit.Utils
{
	[System.Serializable]
public partial class ActivityChangeSet : SystemUnit.Utils.IActivityChangeSet
	{
public System.Collections.Hashtable BusinessObjectItems
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public ActivityChangeSet(  )
		{}

	}
}
namespace SystemUnit.Utils.Mapper
{
	public interface IMapperObject
	{
		BizAPP.Runtime.Core.FieldBehaviorType GetFieldBehavior(  System.String fieldName );
		BizAPP.Common.Database.DbTypeEx GetFieldDbTypeEx(  System.String fieldName );
		void EditObject(  BizAPP.Runtime.Core.ISoftTransaction softTx );
		System.Boolean IsRelationShipField(  System.String fieldName );
		System.Boolean IsRelationShipField(  System.String fieldName, System.Boolean useLinks );
		System.Boolean IsLinksField(  System.String fieldName );
		System.Boolean IsLinksField(  System.String fieldName, System.Boolean useLinks );
		System.Boolean IsLinkField(  System.String fieldName );
		System.Boolean IsLinkField(  System.String fieldName, System.Boolean useLinks );
		System.Object CreateLinkedObject(  SystemUnit.Utils.Mapper.Mapping mapping );
		System.String LinksTo(  System.String fieldName );
		System.Object GetObject(  );
		BizAPP.Runtime.Core.IRuntimeObject GetProcessTrace(  );
		System.Object CreateObject(  SystemUnit.Utils.Mapper.Mapping mapping );
		System.String MatchFieldName(  System.String fieldName );
		System.String GetEditableLinkFieldName(  System.String fieldName );
System.Object this[ System.String fieldName]
{
get;
set;
}
System.Object this[ System.String fieldName, System.Boolean getLinks]
{
get;}
System.String[] FieldNames
{
get;}
System.Boolean Editable
{
get;}
BizAPP.Runtime.Core.Service.Session.IRuntimeSession Session
{
get;}
BizAPP.Runtime.Core.ISoftTransaction Transaction
{
get;}
System.Collections.Hashtable LinksField
{
get;}

	}
}
namespace SystemUnit.Utils.Helpers
{
	public abstract partial class ApiEndPointHelper
	{
		public static void ClearEndPoints(  BizAPP.Runtime.Core.IRuntimeObject ro )
		{
throw new System.NotImplementedException( );
		}

		public static System.String GenerateRandomSecret(  )
		{
throw new System.NotImplementedException( );
		}

public ApiEndPointHelper( ){}
	}
}
namespace SystemUnit.Utils.Helpers
{
	public abstract partial class ClientCommerceObjectHelper
	{
		public static System.String GetIdentityToken(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, System.String currentUserEmail )
		{
throw new System.NotImplementedException( );
		}

		public static System.String ApproveCreditsTransfer(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, System.String transactTokenId )
		{
throw new System.NotImplementedException( );
		}

		public static void TransferCredits(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, System.String idToken, System.String fromEmail, System.String toEmail, System.Int32 credits, System.String emailToValidate )
		{
throw new System.NotImplementedException( );
		}

		public static void CreateCharge(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, System.String transactToken, System.String token )
		{
throw new System.NotImplementedException( );
		}

		public static void MobileNumberValidated(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, System.String validatedEmail, System.String mobileNumber, System.String idToken )
		{
throw new System.NotImplementedException( );
		}

		public static System.Int32 GetCredits(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, System.String emailId )
		{
throw new System.NotImplementedException( );
		}

		public static System.String GetTransactionToken(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, System.String jsonToken )
		{
throw new System.NotImplementedException( );
		}

		public static System.String GetTransactionToken(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, SystemUnit.Utils.Helpers.PaymentTransactionToken token )
		{
throw new System.NotImplementedException( );
		}

		public static System.String PayUsingTransactionToken(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, SystemUnit.Utils.Helpers.PaymentTransactionToken token )
		{
throw new System.NotImplementedException( );
		}

public ClientCommerceObjectHelper( ){}
	}
}
namespace SystemUnit.Utils.Helpers
{
	[System.Serializable]
public partial class CustomerDetails
	{
public System.String UserName;
public System.String Description;
public System.String EmailId;
public System.String Company;
		public CustomerDetails(  )
		{}

	}
}
namespace SystemUnit.Utils.Helpers
{
	public partial class PaymentTransactionToken
	{
public System.String CurrentUserEmail;
public System.String Name;
public System.String Description;
public SystemUnit.Utils.Helpers.CustomerDetails CustomerDetails;
public System.String TransactionKey;
public System.String SubscriptionIdBZA;
public System.String PlanLookupKey;
public System.Double Amount;
public System.Int32 Quantity;
public System.String Interval;
public System.String CurrencyISO;
public System.String ClientSolutionId;
public System.String ContextId;
public System.String ContextTypeId;
public System.String ContextTenantId;
public System.Boolean UseCredits;
public System.Int32 MaxCredits;
public System.String FromEmail;
public System.String ToEmail;
public System.Boolean IsManualRecurrence;
public System.Int32 IntervalCount;
public System.String UserOTP;
		public PaymentTransactionToken(  )
		{}

	}
}
namespace SystemUnit.Utils.Helpers
{
	public abstract partial class CurrencyHelper
	{
		public static void ClearCache(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session )
		{
throw new System.NotImplementedException( );
		}

public CurrencyHelper( ){}
	}
}
namespace SystemUnit.Utils.Helpers
{
	public abstract partial class InteractionHelper
	{
		public static void HandleWaitTimeChange(  BizAPP.Runtime.Core.IRuntimeObject thisObject, BizAPP.Runtime.Core.FieldValueChangeEventArgs args )
		{
throw new System.NotImplementedException( );
		}

public InteractionHelper( ){}
	}
}
namespace SystemUnit.Utils.Helpers
{
public enum FizzStatus
{
Created = 0,
Submitted = 1,
FizzComplete = 2,
FizzFailed = 3
}
}
namespace SystemUnit.Utils.Helpers
{
	public partial class FizzRequestHelper
	{
		public static System.String CreateVideoFizzRequest(  System.String name, System.String rsk, BizAPP.Runtime.Core.IRuntimeObject context, System.String videoURL )
		{
throw new System.NotImplementedException( );
		}

		public static System.String CreateFizzRequest(  System.String name, System.String rsk, BizAPP.Runtime.Core.IRuntimeObject context, BizAPP.Runtime.Core.IRuntimeObject attachment )
		{
throw new System.NotImplementedException( );
		}

		public static void MarkFizzRequestComplete(  BizAPP.Runtime.Core.Service.Session.ISessionService sessionSvc, System.String externalId )
		{
throw new System.NotImplementedException( );
		}

		public static void UpdateError(  BizAPP.Runtime.Core.Service.Session.ISessionService sessService, System.String requestId, System.Exception ex )
		{
throw new System.NotImplementedException( );
		}

		public static void UpdateFizzRequest(  BizAPP.Runtime.Core.Service.Session.ISessionService sessionSvc, System.String requestId, SystemUnit.Utils.Helpers.FizzStatus status, System.String externalId, System.String data = "" )
		{
throw new System.NotImplementedException( );
		}

		public FizzRequestHelper(  )
		{}

	}
}
namespace SystemUnit.Utils.Helpers
{
	public partial class FizzToken
	{
public System.String RootSecret;
public System.String ReadToken;
public System.String WriteToken;
		public FizzToken(  )
		{}

	}
}
