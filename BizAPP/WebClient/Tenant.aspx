<%@ page language="C#" %>

<!DOCTYPE html>

<script runat="server">
    protected void Page_Load( object sender, EventArgs e )
    {
        BizAPP.Web.UI.Pages.AuthEx.ResolveTenant( this );
    }
</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
</head>
<body>
    <form id="form1" runat="server">
        <div>
            Tenant
        </div>
    </form>
</body>
</html>
