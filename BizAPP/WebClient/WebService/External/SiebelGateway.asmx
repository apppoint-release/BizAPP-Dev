<%@ WebService Language="C#" Class="BizAPP.Runtime.WebService.SiebelGateway" %>

namespace BizAPP.Runtime.WebService
{
	using System;
	using System.Web;
	using System.Web.Services;
	using System.Web.Services.Protocols;

	[WebService( Namespace="http://apppoint.com/BizAPP/" )]
	[WebServiceBinding( ConformsTo=WsiProfiles.BasicProfile1_1 )]
	public class SiebelGateway : ExternalGateway
	{
	}
}