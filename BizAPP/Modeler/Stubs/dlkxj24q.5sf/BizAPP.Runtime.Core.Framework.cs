namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class DbRuntimeObjectManager : BizAPP.Runtime.Core.RuntimeObjectManager,BizAPP.Runtime.Core.IRuntimeObjectManager
	{
		protected internal override BizAPP.Runtime.Core.Framework.DataSource.ObjectAdapter GetAdapter(  BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dbs = null )
		{
throw new System.NotImplementedException( );
		}

		protected internal override BizAPP.Runtime.Core.Framework.DataSource.ObjectPropertiesAdapter GetPropertiesAdapter(  BizAPP.Runtime.Core.IRuntimeObjectPropertyCollection props = null )
		{
throw new System.NotImplementedException( );
		}

		protected internal override BizAPP.Runtime.Core.Framework.DataSource.LinksCollectionDataAdapter GetLinksAdapter(  BizAPP.Runtime.Core.RuntimeObjectLinksCollection links = null )
		{
throw new System.NotImplementedException( );
		}

		public DbRuntimeObjectManager(  BizAPP.Runtime.Core.RuntimeContext context )
		{}
public DbRuntimeObjectManager( ){}
	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class ObjectWrapper : BizAPP.Runtime.Core.BaseMarshalByValueObject,BizAPP.Runtime.Core.IDisposableEx,System.Runtime.Serialization.ISerializable,BizAPP.Runtime.Core.IObjectWrapper
	{
		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		public override System.String ToString(  )
		{
throw new System.NotImplementedException( );
		}

		public BizAPP.Runtime.Core.IRuntimeObject GetObject(  )
		{
throw new System.NotImplementedException( );
		}

		public BizAPP.Runtime.Core.IRuntimeObject GetObject(  System.Boolean ignoreRedirection )
		{
throw new System.NotImplementedException( );
		}

		protected override void Dispose(  System.Boolean disposing )
		{
throw new System.NotImplementedException( );
		}

public System.Int32 Version
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ObjectType
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.IEnumerable<System.String> ObjectTypes
{
get {throw new System.NotImplementedException( );}}
public System.String UniqueId
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ObjectTypeId
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.IEnumerable<System.String> ObjectTypeIds
{
get {throw new System.NotImplementedException( );}}
public System.Int32 TenantId
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		protected ObjectWrapper(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}
public ObjectWrapper( ){}
	}
}
namespace BizAPP.Runtime.Core
{
	public partial class ExternalConnectionManager : System.IDisposable
	{
		public void Dispose(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean ExternalHasWorkflow(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean ExternalHasCompositeIds(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean ExternalHasPublicFieldQuerySupport(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean ExternalSupportsSelectQuery(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean ExternalCanCreateObject(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.String ExternalCreateObject( params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Int32 ExternalCancelEdit(  BizAPP.Runtime.Core.RuntimeObject ro )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.String ExternalCloneObject(  System.String existingObjectId )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ExternalApplyStep(  BizAPP.Runtime.Core.RuntimeObject ro, System.String stepName )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ExternalApplyPush(  BizAPP.Runtime.Core.RuntimeObject ro,params  System.Object[] args )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ExternalSaveObject(  BizAPP.Runtime.Core.RuntimeObject ro )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Int32 ExternalDeleteObject(  BizAPP.Runtime.Core.RuntimeObject ro )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.String ExternalTransformId(  System.Object valueOrDisplayValue )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean ExternalIsObject(  System.Object externalKey )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean ExternalFindObjectByUniqueIdField(  System.Object externalKey )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Int32 ExternalReload(  BizAPP.Runtime.Core.RuntimeObject ro, System.Collections.Generic.Dictionary<System.String,System.Object> recommendedValues, System.Boolean honourDownload )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Nullable<System.Int32> ExternalGetFieldBehavior(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Object[] ExternalGetAllowedValues(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.String GetExternalLinkedObjectType(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Object ExternalGetValue(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Collections.Generic.Dictionary<System.String,System.Object> ExternalGetValues(  BizAPP.Runtime.Core.RuntimeObject ro, System.Object externalKey, System.Collections.Generic.IEnumerable<System.String> fieldNames, System.Boolean refreshCache )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Object ExternalGetLinkValue(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Object ExternalGetLinksValue(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc, System.String mappedType )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ExternalSetValue(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc, System.Object value )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ExternalAddValue(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc, System.String mappedType, System.Object value )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ExternalRemoveValue(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc, System.String mappedType, System.Object value )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ExternalClearValue(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Data.DataTable ExternalExecuteQuery(  BizAPP.Common.Query.QueryObject qo, BizAPP.Common.Database.IQuery query, System.String sql = "" )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Data.DataTable ExternalExecuteQuery(  BizAPP.Common.Query.QueryObject qry, BizAPP.Common.Query.QueryObject extraFilters, BizAPP.Runtime.Core.IRuntimeObject contextObject )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Int32 ExternalSaveObject(  BizAPP.Runtime.Core.RuntimeObject ro, System.Collections.Hashtable saveState )
		{
throw new System.NotImplementedException( );
		}

		protected internal TResult GetExternalDataSourceProvider<TResult>(  BizAPP.Runtime.Core.ExternalDataSourceProviderInfo providerInfo, BizAPP.Runtime.Core.RuntimeObject ro, System.Func<BizAPP.Runtime.Core.Service.ExternalDataSource.IExternalDataSourceProvider,TResult> actionCallback )
		{
throw new System.NotImplementedException( );
		}

		public ExternalConnectionManager(  BizAPP.Runtime.Core.RuntimeObjectManager hostManager )
		{}
public ExternalConnectionManager( ){}
	}
}
namespace BizAPP.Runtime.Core
{
	public abstract partial class RuntimeObjectWCFService
	{
		protected BizAPP.Runtime.Core.RuntimeClientObject GetObject(  System.String sessionId, System.String objectName, System.String uid )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.RuntimeClientObject GetObjectWithDisplayName(  System.String sessionId, System.String objectName, System.String displayName )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.RuntimeClientObject[] GetAllObjects(  System.String sessionId, System.String objectName )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.RuntimeClientObject[] GetAllMyObjects(  System.String sessionId, System.String objectName )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.RuntimeClientObject[] UpdateObjects(  System.String sessionId, BizAPP.Runtime.Core.RuntimeClientObject[] objects, System.Boolean needSave )
		{
throw new System.NotImplementedException( );
		}

		protected System.Object InvokeMethod(  System.String sessionId, System.String contextObjectId, System.String methodName, System.Object[] args )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ThrowIfSessionCookieIsInvalid(  System.String sessionId )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.Service.Session.IRuntimeSession GetSession(  System.String sessionId, System.Boolean throwException )
		{
throw new System.NotImplementedException( );
		}

protected abstract System.String ObjectName
{
get;}
		protected RuntimeObjectWCFService(  )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public abstract partial class BaseFieldValueDecorator : BizAPP.Runtime.Core.IFieldValueDecorator,System.Runtime.Serialization.ISerializable
	{
protected const System.String CONFIG_DESCRIPTION = @"Description";
protected System.String m_description;
protected System.String m_configuration;
		public virtual void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		public abstract System.Object Decorate(  System.Globalization.CultureInfo cultureInfo, System.Object value, System.Boolean isValue );
		public override System.String ToString(  )
		{
throw new System.NotImplementedException( );
		}

		protected System.Collections.Hashtable ObjectArrayToHashtable(  System.Object[] config )
		{
throw new System.NotImplementedException( );
		}

public virtual System.String Description
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Object[] Configuration
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		protected BaseFieldValueDecorator(  )
		{}
		public BaseFieldValueDecorator(  System.Object[] configuration )
		{}
		protected BaseFieldValueDecorator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class AllUpperCaseFieldValueDecorator : BizAPP.Runtime.Core.BaseFieldValueDecorator,BizAPP.Runtime.Core.IFieldValueDecorator,System.Runtime.Serialization.ISerializable
	{
		public override System.Object Decorate(  System.Globalization.CultureInfo cultureInfo, System.Object value, System.Boolean isValue )
		{
throw new System.NotImplementedException( );
		}

public override System.String Description
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		protected AllUpperCaseFieldValueDecorator(  )
		{}
		public AllUpperCaseFieldValueDecorator(  System.Object[] configuration )
		{}
		protected AllUpperCaseFieldValueDecorator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class AllLowerCaseFieldValueDecorator : BizAPP.Runtime.Core.BaseFieldValueDecorator,BizAPP.Runtime.Core.IFieldValueDecorator,System.Runtime.Serialization.ISerializable
	{
		public override System.Object Decorate(  System.Globalization.CultureInfo cultureInfo, System.Object value, System.Boolean isValue )
		{
throw new System.NotImplementedException( );
		}

public override System.String Description
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		protected AllLowerCaseFieldValueDecorator(  )
		{}
		public AllLowerCaseFieldValueDecorator(  System.Object[] configuration )
		{}
		protected AllLowerCaseFieldValueDecorator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class InitCapsFieldValueDecorator : BizAPP.Runtime.Core.BaseFieldValueDecorator,BizAPP.Runtime.Core.IFieldValueDecorator,System.Runtime.Serialization.ISerializable
	{
		public override System.Object Decorate(  System.Globalization.CultureInfo cultureInfo, System.Object value, System.Boolean isValue )
		{
throw new System.NotImplementedException( );
		}

public override System.String Description
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		protected InitCapsFieldValueDecorator(  )
		{}
		public InitCapsFieldValueDecorator(  System.Object[] configuration )
		{}
		protected InitCapsFieldValueDecorator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public abstract partial class BaseCompareFieldValueValidator : BizAPP.Runtime.Core.BaseFieldValueValidator,BizAPP.Runtime.Core.IFieldValueValidator,System.Runtime.Serialization.ISerializable
	{
		protected System.Int32 CompareValue(  System.Object referenceValue, System.Object rightValue, System.Int32 comparionResultDefault )
		{
throw new System.NotImplementedException( );
		}

		protected internal BaseCompareFieldValueValidator(  )
		{}
		protected internal BaseCompareFieldValueValidator(  System.Object[] configuration, System.String validationError, System.String validationErrorId )
		{}
		protected internal BaseCompareFieldValueValidator(  System.Object[] configuration, System.Boolean inverseResult, System.String validationError, System.String validationErrorId )
		{}
		protected BaseCompareFieldValueValidator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public abstract partial class BaseFieldValueValidator : BizAPP.Runtime.Core.IFieldValueValidator,System.Runtime.Serialization.ISerializable
	{
protected const System.String CONFIG_DESCRIPTION = @"Description";
protected System.String m_description;
protected System.Boolean m_earlyExecution;
protected System.Boolean m_deferExecution;
protected System.String m_validationError;
protected System.String m_validationErrorId;
protected System.Boolean m_inverse;
		public virtual void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		protected System.String GetResourceItemString(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session )
		{
throw new System.NotImplementedException( );
		}

		public virtual System.String Validate(  BizAPP.Runtime.Core.IRuntimeObject currentObject, System.Object value )
		{
throw new System.NotImplementedException( );
		}

		public virtual System.String Validate(  BizAPP.Runtime.Core.IRuntimeObject currentObject, System.Object value, System.Object originalValue )
		{
throw new System.NotImplementedException( );
		}

		public override System.String ToString(  )
		{
throw new System.NotImplementedException( );
		}

		protected System.Collections.Hashtable ObjectArrayToHashtable(  System.Object[] config )
		{
throw new System.NotImplementedException( );
		}

public System.String Description
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Boolean Early
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Boolean Defer
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ValidationError
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ValidationErrorId
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Boolean Inverse
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public abstract System.Object[] Configuration
{
get;
set;
}
		protected BaseFieldValueValidator(  )
		{}
		protected BaseFieldValueValidator(  System.Object[] configuration, System.String validationError, System.String validationErrorId )
		{}
		protected BaseFieldValueValidator(  System.Object[] configuration, System.Boolean inverseResult, System.String validationError, System.String validationErrorId )
		{}
		protected BaseFieldValueValidator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
public enum ConstantValidationOperator
{
FieldValueCheck = 1,
DataTypeCheck = 2,
Equal = 4,
GreaterThan = 8,
GreaterThanOrEqual = 16,
LessThan = 32,
LessThanOrEqual = 64,
NotEqual = 128
}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class ConstantFieldValueValidator : BizAPP.Runtime.Core.BaseCompareFieldValueValidator,BizAPP.Runtime.Core.IFieldValueValidator,System.Runtime.Serialization.ISerializable
	{
		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		public override System.String Validate(  BizAPP.Runtime.Core.IRuntimeObject currentObject, System.Object value, System.Object originalValue )
		{
throw new System.NotImplementedException( );
		}

public override System.Object[] Configuration
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public BizAPP.Runtime.Core.ConstantValidationOperator Operator
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Object ValueToCompare
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Type DataTypeOfValue
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public ConstantFieldValueValidator(  )
		{}
		public ConstantFieldValueValidator(  System.Object[] configuration, System.String validationError, System.String validationErrorId )
		{}
		public ConstantFieldValueValidator(  System.Object[] configuration, System.Boolean inverseResult, System.String validationError, System.String validationErrorId )
		{}
		protected ConstantFieldValueValidator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class VisualScriptFieldValueValidator : BizAPP.Runtime.Core.BaseCompareFieldValueValidator,BizAPP.Runtime.Core.IFieldValueValidator,System.Runtime.Serialization.ISerializable
	{
		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		public override System.String Validate(  BizAPP.Runtime.Core.IRuntimeObject currentObject, System.Object value, System.Object originalValue )
		{
throw new System.NotImplementedException( );
		}

public override System.Object[] Configuration
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ValidatingExpression1
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ValidatingExpression2
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public VisualScriptFieldValueValidator(  )
		{}
		public VisualScriptFieldValueValidator(  System.Object[] configuration, System.String validationError, System.String validationErrorId )
		{}
		public VisualScriptFieldValueValidator(  System.Object[] configuration, System.Boolean inverseResult, System.String validationError, System.String validationErrorId )
		{}
		protected VisualScriptFieldValueValidator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class ExpressionFieldValueValidator : BizAPP.Runtime.Core.BaseCompareFieldValueValidator,BizAPP.Runtime.Core.IFieldValueValidator,System.Runtime.Serialization.ISerializable
	{
		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		public override System.String Validate(  BizAPP.Runtime.Core.IRuntimeObject currentObject, System.Object value, System.Object originalValue )
		{
throw new System.NotImplementedException( );
		}

public override System.Object[] Configuration
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ValidatingExpression1
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ValidatingExpression2
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public ExpressionFieldValueValidator(  )
		{}
		public ExpressionFieldValueValidator(  System.Object[] configuration, System.String validationError, System.String validationErrorId )
		{}
		public ExpressionFieldValueValidator(  System.Object[] configuration, System.Boolean inverseResult, System.String validationError, System.String validationErrorId )
		{}
		protected ExpressionFieldValueValidator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class CustomMethodFieldValueValidator : BizAPP.Runtime.Core.BaseFieldValueValidator,BizAPP.Runtime.Core.IFieldValueValidator,System.Runtime.Serialization.ISerializable
	{
		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		public override System.String Validate(  BizAPP.Runtime.Core.IRuntimeObject currentObject, System.Object value, System.Object originalValue )
		{
throw new System.NotImplementedException( );
		}

public override System.Object[] Configuration
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String MethodName
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public CustomMethodFieldValueValidator(  )
		{}
		public CustomMethodFieldValueValidator(  System.Object[] configuration, System.String validationError, System.String validationErrorId )
		{}
		public CustomMethodFieldValueValidator(  System.Object[] configuration, System.Boolean inverseResult, System.String validationError, System.String validationErrorId )
		{}
		protected CustomMethodFieldValueValidator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class RangeFieldValueValidator : BizAPP.Runtime.Core.BaseCompareFieldValueValidator,BizAPP.Runtime.Core.IFieldValueValidator,System.Runtime.Serialization.ISerializable
	{
		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		public override System.String Validate(  BizAPP.Runtime.Core.IRuntimeObject currentObject, System.Object value, System.Object originalValue )
		{
throw new System.NotImplementedException( );
		}

public override System.Object[] Configuration
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Type TypeOfvalue
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Object MinimumValue
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Boolean MinimumValueIsField
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Object MaximumValue
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Boolean MaximumValueIsField
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public RangeFieldValueValidator(  )
		{}
		public RangeFieldValueValidator(  System.Object[] configuration, System.String validationError, System.String validationErrorId )
		{}
		public RangeFieldValueValidator(  System.Object[] configuration, System.Boolean inverseResult, System.String validationError, System.String validationErrorId )
		{}
		protected RangeFieldValueValidator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class RegularExpressionFieldValueValidator : BizAPP.Runtime.Core.BaseFieldValueValidator,BizAPP.Runtime.Core.IFieldValueValidator,System.Runtime.Serialization.ISerializable
	{
		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		public override System.String Validate(  BizAPP.Runtime.Core.IRuntimeObject currentObject, System.Object value, System.Object originalValue )
		{
throw new System.NotImplementedException( );
		}

public override System.Object[] Configuration
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String ValidationExpression
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public RegularExpressionFieldValueValidator(  )
		{}
		public RegularExpressionFieldValueValidator(  System.Object[] configuration, System.String validationError, System.String validationErrorId )
		{}
		public RegularExpressionFieldValueValidator(  System.Object[] configuration, System.Boolean inverseResult, System.String validationError, System.String validationErrorId )
		{}
		protected RegularExpressionFieldValueValidator(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class RelationshipTrackingDictionary : BizAPP.Runtime.Core.TrackingDictionaryBase<System.String,BizAPP.Runtime.Core.IObjectWrapper>,System.Collections.Generic.IDictionary<System.String,BizAPP.Runtime.Core.IObjectWrapper>,System.Collections.IDictionary,System.Collections.Generic.IReadOnlyDictionary<System.String,BizAPP.Runtime.Core.IObjectWrapper>,System.Runtime.Serialization.ISerializable,System.Runtime.Serialization.IDeserializationCallback,System.IDisposable
	{
		void System.Runtime.Serialization.ISerializable.GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		protected override void TrackItemAdded(  System.String key )
		{
throw new System.NotImplementedException( );
		}

		protected override void TrackItemRemoved(  System.String key )
		{
throw new System.NotImplementedException( );
		}

		protected internal RelationshipTrackingDictionary(  )
		{}
		protected internal RelationshipTrackingDictionary(  BizAPP.Runtime.Core.RelationshipTrackingDictionary dictionary )
		{}
		protected RelationshipTrackingDictionary(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public sealed class RuntimeObjectLinksCollection : BizAPP.Runtime.Core.BaseMarshalByValueObject,BizAPP.Runtime.Core.IDisposableEx,System.Runtime.Serialization.ISerializable,BizAPP.Runtime.Core.IRuntimeObjectLinksCollection
	{
		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Add(  BizAPP.Runtime.Core.IRuntimeObject runtimeObject )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Add(  System.String childUniqueid )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Add(  System.String childUniqueid, System.Int32 version )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Add(  System.String childUniqueid, System.String childTypeId, System.Int32 childVersion )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.InsertAt(  BizAPP.Runtime.Core.IRuntimeObject runtimeObject, System.Int32 orderIndex )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.InsertAt(  System.String childUniqueid, System.Int32 orderIndex )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.InsertAt(  System.String childUniqueid, System.Int32 version, System.Int32 orderIndex )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.InsertAt(  System.String childUniqueid, System.String childTypeId, System.Int32 childVersion, System.Int32 orderIndex )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.MoveByPlaces(  System.String childUniqueid, System.Int32 places )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Set(  System.Int32 index, BizAPP.Runtime.Core.IRuntimeObject runtimeObject )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Remove(  System.String uniqueId )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.RemoveAt(  System.Int32 index )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Contains(  System.String uniqueId )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.ContainsDisplayName(  System.String childDisplayName )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Clear(  )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.DeleteAll(  )
		{
throw new System.NotImplementedException( );
		}

		System.Object[] BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.ToArray(  System.String targetObjectFieldName )
		{
throw new System.NotImplementedException( );
		}

		System.String[] BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.ToArray(  )
		{
throw new System.NotImplementedException( );
		}

		System.Double BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.DoMath(  BizAPP.Runtime.Core.MathOperation operation, System.String targetObjectFieldName )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.ToString(  System.String targetObjectFieldName )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.ToFormattedString(  System.String formatString )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject[] BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.ToRuntimeObjects(  System.Boolean excludeDeletedObjects, System.Boolean ignoreRedirection )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject[] BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.ToRuntimeObjects(  System.Boolean excludeDeletedObjects )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObjectCollection BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Find(  System.Collections.Hashtable fieldsAndValues )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObjectCollection BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.FindByFilters(  BizAPP.Common.Query.QueryExpression query )
		{
throw new System.NotImplementedException( );
		}

		System.Data.IDataReader BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetReader(  )
		{
throw new System.NotImplementedException( );
		}

		System.Data.IDataReader BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetReader(  System.Int32 pageNumber, System.Int32 pageSize )
		{
throw new System.NotImplementedException( );
		}

		System.Data.IDataReader BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetReader(  System.String queryDisplayName, System.Int32 pageNumber, System.Int32 pageSize )
		{
throw new System.NotImplementedException( );
		}

		System.Data.IDataReader BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetReader(  BizAPP.Common.Query.QueryObject queryObject, System.Int32 pageNumber, System.Int32 pageSize )
		{
throw new System.NotImplementedException( );
		}

		System.Data.IDataReader BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetReader(  System.String queryDisplayName )
		{
throw new System.NotImplementedException( );
		}

		System.Data.IDataReader BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetReader(  BizAPP.Common.Query.QueryObject queryObject )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetDataTable(  )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetDataTable(  System.Int32 pageNumber, System.Int32 pageSize )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetDataTable(  System.String queryDisplayName )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetDataTable(  BizAPP.Common.Query.QueryObject queryObject )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetDataTable(  System.String queryDisplayName, System.Int32 pageNumber, System.Int32 pageSize )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetDataTable(  BizAPP.Common.Query.QueryObject queryObject, System.Int32 pageNumber, System.Int32 pageSize )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObjectLinksCollection BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetObjectsByType(  System.String type )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObjectLinksCollection BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.GetObjectsByTypeId(  System.String typeId )
		{
throw new System.NotImplementedException( );
		}

		public void Reload(  )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.Generic.IEnumerator<BizAPP.Runtime.Core.IObjectWrapper> System.Collections.Generic.IEnumerable<BizAPP.Runtime.Core.IObjectWrapper>.GetEnumerator(  )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator(  )
		{
throw new System.NotImplementedException( );
		}

		void System.IDisposable.Dispose(  )
		{
throw new System.NotImplementedException( );
		}

System.String BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.TargetTypeId
{
get {throw new System.NotImplementedException( );}}
System.String[] BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.TargetTypeIds
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IObjectWrapper BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.this[ System.Int32 index]
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IObjectWrapper BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.this[ System.String uniqueId]
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IObjectWrapper BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.this[ System.String uniqueIdOrDisplayName, System.Boolean isDisplayName]
{
get {throw new System.NotImplementedException( );}}
System.Int32 BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Count
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.AddedItems
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.ModifiedItems
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IDictionary<System.String,BizAPP.Runtime.Core.IObjectWrapper> BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.RemovedItems
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.OrderedCollection
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.IsDirty
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.Parent
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.BizAPPDataColumn BizAPP.Runtime.Core.IRuntimeObjectLinksCollection.MetadataColumn
{
get {throw new System.NotImplementedException( );}}
		public RuntimeObjectLinksCollection(  BizAPP.Runtime.Core.RuntimeObject sourceObject, System.String tableName, System.String fieldName )
		{}
		public RuntimeObjectLinksCollection(  BizAPP.Runtime.Core.RuntimeObject sourceObject, System.String tableName, System.String fieldName, System.String childTypeId )
		{}
public RuntimeObjectLinksCollection( ){}
	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class RuntimeObjectMetadata : BizAPP.Runtime.Core.BaseMarshalByValueObject,BizAPP.Runtime.Core.IDisposableEx,System.Runtime.Serialization.ISerializable,BizAPP.Runtime.Core.IRuntimeObjectMetadata
	{
public const System.String HASJOBS = @"HASJOBS";
public const System.String HASANNOTATIONS = @"HASANNOTATIONS";
public const System.String HASPROPERTIES = @"HASPROPERTIES";
public const System.String HASMESSAGES = @"HASMESSAGES";
public const System.String ISDELEGATABLE = @"DELEGATABLE";
public const System.String ISDRAFTABLE = @"DRAFTABLE";
public const System.String EXCLUDEFROMCLEANUP = @"EXCLUDEFROMCLEANUP";
public const System.String DETECTDATATAMPERING = @"DETECTDATATAMPERING";
public const System.String ISQUERYABLE = @"ISQUERYABLE";
public const System.String DOWNLOADEXTERNALWHENNOTFOUND = @"DOWNLOADEXTERNALWHENNOTFOUND";
public const System.String REQUIRESDATASYNC = @"REQUIRESDATASYNC";
public const System.String EXTERNALPROVIDERTYPE = @"EXTERNALPROVIDERTYPE";
public const System.String ISEXTERNAL = @"ISEXTERNAL";
public const System.String ISINTERNAL = @"ISINTERNAL";
public const System.String SITEBOUNDCREATION = @"SITEBOUNDCREATION";
public const System.String ISDISPLAYNAMEUNIQUE = @"ISDISPLAYNAMEUNIQUE";
public const System.String IGNOREINMEMORYORUNSAVEDINSTANCES = @"IGNOREINMEMORYORUNSAVEDINSTANCES";
public const System.String PLURALNAME = @"PLURALNAME";
public const System.String DISPLAYNAMEERRORFORMAT = @"DISPLAYNAMEERRORFORMAT";
public const System.String DATASOURCETYPE = @"DATASOURCETYPE";
public const System.String DEFAULTMOBILEVIEW = @"DEFAULTMOBILEVIEW";
public const System.String TRUNCATEDISPLAYNAME = @"TRUNCATEDISPLAYNAME";
public const System.String EDITABILITYEXPRESSION = @"EDITABILITYEXPRESSION";
public const System.String LOCATIONEXPRESSION = @"LOCATIONEXPRESSION";
public const System.String NOLOCK = @"NOLOCK";
public const System.String OPTIMISTICLOCK = @"OPTIMISTICLOCK";
public const System.String ISVIRTUAL = @"ISVIRTUAL";
public const System.String BUSINESSMODULEID = @"BUSINESSMODULEID";
public const System.String OBJECTTYPE = @"OBJECTTYPE";
public const System.String ISSEALED = @"ISSEALED";
public const System.String MULTITENANTENABLED = @"MULTITENANTENABLED";
public const System.String MESSAGINGENABLED = @"MESSAGINGENABLED";
public const System.String ISABSTRACT = @"ISABSTRACT";
public const System.String INTERNALNAME = @"DBNAME";
public const System.String VISIBILITYFILTER = @"VISIBILITYFILTER";
public const System.String VISIBILITY = @"VISIBILITY";
public const System.String DEFAULTPROCESS = @"DEFAULTPROCESS";
public const System.String DESCRIPTIONFORMAT = @"DESCRIPTIONFORMAT";
public const System.String DISPLAYNAMEFORMAT = @"DISPLAYNAMEFORMAT";
public const System.String ISPROMOTABLE = @"PROMOTABLE";
public const System.String ISREPLICATEABLE = @"REPLICATEABLE";
public const System.String ISOWNEROWNEDATALLSITES = @"ISOWNEROWNEDATALLSITES";
public const System.String ISAUDITABLE = @"AUDITABLE";
public const System.String ISDEPRECATED = @"ISDEPRECATED";
public const System.String ISDETAILEDAUDITENABLED = @"DETAILEDAUDITENABLED";
public const System.String HASVERSIONS = @"HASVERSIONS";
public const System.String HASDYNAMICVALIDATIONS = @"HASDYNAMICVALIDATIONS";
public const System.String HASCHANGECOMMENTS = @"HASCHANGECOMMENTS";
public const System.String ALLOWPUBLICQUERIES = @"ALLOWPUBLICQUERIES";
public const System.String USESEXTERNALSYNCCOMPARER = @"USESEXTERNALSYNCCOMPARER";
public const System.String ENABLESOFTDELETE = @"ENABLESOFTDELETE";
public const System.String ENABLECONTENTSEARCH = @"ENABLECONTENTSEARCH";
public const System.String ENABLEAPPLICATIONBINDING = @"ENABLEAPPBINDING";
public const System.String ENABLECHANGECOMMENTSEXPRESSION = @"ENABLECHANGECOMMENTSEXPRESSION";
public const System.String CHANGECOMMENTSFIELD = @"CHANGECOMMENTSFIELD";
public const System.String CHANGECOMMENTSVIEWID = @"CHANGECOMMENTSVIEWID";
public const System.String DYNAMICVALIDATIONCONTEXTEXPRESSION = @"DYNAMICVALIDATIONCONTEXTEXPRESSION";
public const System.String ENABLEDYNAMICVALIDATIONSEXPRESSION = @"ENABLEDYNAMICVALIDATIONSEXPRESSION";
public const System.String DYNAMICVALIDATIONAUDITPROCESSID = @"DYNAMICVALIDATIONAUDITPROCESSID";
public const System.String EDITCHECKFAILURETYPEID = @"EDITCHECKFAILURETYPEID";
public const System.String COMPRESSIONMODE = @"COMPRESSIONMODE";
public const System.String SYSTEMKIND = @"SYSTEMKIND";
public const System.String DYNAMICVALIDATIONMANUALAUDITMAPPERID = @"DYNAMICVALIDATIONMANUALAUDITMAPPERID";
public const System.String NEWFIELDCOMMENTMAPPERENTERPRISEID = @"NEWFIELDCOMMENTMAPPERENTERPRISEID";
public const System.String TRACEABLE = @"TRACEABLE";
public const System.String IDGENERATOR = @"IDGENERATOR";
public const System.String CURRENTVERSION = @"CURRENTVERSION";
public const System.String OBJECTTYPEID = @"ID";
public const System.String NAME = @"NAME";
public const System.String TYPE = @"TYPE";
public const System.String RESOURCEID = @"RESOURCEID";
public const System.String ENTERPRISEID = @"ENTERPRISEID";
public const System.String NAMESPACE = @"NAMESPACE";
public const System.String SHOWINRECENTITEMS = @"SHOWINRECENTITEMS";
public const System.String ORDER = @"ORDER";
public const System.String COLUMN_ENTERPRISEID = @"enterpriseid";
public const System.String COLUMN_UNIQUEID = @"uniqueid";
public const System.String COLUMN_OLDUNIQUEID = @"olduniqueid";
public const System.String COLUMN_VERSION = @"version";
public const System.String COLUMN_DISPLAYNAME = @"displayname";
public const System.String COLUMN_OBJECTDESCRIPTION = @"objectdescription";
public const System.String COLUMN_STATE = @"state";
public const System.String COLUMN_OVERRIDESTATE = @"overridestate";
public const System.String COLUMN_OVERRIDESTEP = @"overridestep";
public const System.String COLUMN_STEP = @"step";
public const System.String COLUMN_PROCESSID = @"processid";
public const System.String COLUMN_PROCESSTRACEOBJECT = @"processtraceobject";
public const System.String COLUMN_OWNERROLE = @"ownerrole";
public const System.String COLUMN_OBJECTTYPEINFO = @"objecttypeinfo";
public const System.String COLUMN_ASSIGNEDTO = @"assignedto";
public const System.String COLUMN_TEMPLATE = @"objecttemplate";
public const System.String COLUMN_CREATEDON = @"createdon";
public const System.String COLUMN_CREATEDBY = @"createdby";
public const System.String COLUMN_LASTMODIFIEDON = @"lastmodifiedon";
public const System.String COLUMN_LASTMODIFIEDBY = @"lastmodifiedby";
public const System.String COLUMN_LOCKEDON = @"lockedon";
public const System.String COLUMN_VALIDTILL = @"validtill";
public const System.String COLUMN_OBJECTTYPE = @"objecttype";
public const System.String COLUMN_LOCKED = @"locked";
public const System.String COLUMN_LOCKEDBY = @"lockedby";
public const System.String COLUMN_HASH = @"hash";
public const System.String COLUMN_EXTERNALINMEMORY = @"externalinmemory";
public const System.String COLUMN_EXTERNALSYNCHRONIZE = @"externalsynchronize";
public const System.String COLUMN_OWNER = @"owner";
public const System.String COLUMN_OWNERGROUP = @"ownergroup";
public const System.String COLUMN_VIRTUALINSTANCE = @"virtualinstance";
public const System.String COLUMN_VIRTUALINSTANCESKIPBEHAVIORVALIDATIONS = @"virtualinstanceskipbehaviorvalidations";
public const System.String COLUMN_ISIMPORTTYPE = @"isimporttype";
public const System.String COLUMN_DIRTYFIELDS = @"dirtyfields";
public const System.String COLUMN_DRAFT_DIRTYFIELDS = @"draft_dirtyfields";
public const System.String COLUMN_CACHEABLE = @"cacheable";
public const System.String COLUMN_METRICSOBJECT = @"metricsobject";
public const System.String COLUMN_LASTMODIFIEDONLOCAL = @"lastmodifiedonlocal";
public const System.String COLUMN_LASTMODIFIEDONLOCALTZ = @"lastmodifiedonlocaltz";
public const System.String COLUMN_OBJECTSOURCE = @"objectsource";
public const System.String COLUMN_TRACKINGSESSIONID = @"trackingsid";
public const System.String COLUMN_APPID = @"appid";
public const System.String COLUMN_EDITED = @"edited";
public const System.String COLUMN_CURRENT_STEP = @"currentstep";
public const System.String COLUMN_ISDELETED = @"isdeleted";
public const System.String COLUMN_ISVERSION = @"isversion";
public const System.String COLUMN_TRANSIENTID = @"transientid";
public const System.String COLUMN_PROCESSSTATE = @"processstate";
public const System.String COLUMN_REDIRECTEDTO = @"redirectedto";
public const System.String COLUMN_IMPERSONATEDBY = @"impersonatedby";
public const System.String COLUMN_VERSION_PRINCIPAL = @"principal";
public const System.String COLUMN_VERSION_FROMSTATE = @"fromstate";
public const System.String COLUMN_VERSION_STEP = @"step";
public const System.String FIELD_S_ASSIGNEDTO = @"s_assignedto";
public const System.String COLUMN_TENANTID = @"tid";
internal const System.String RULE_VISIBILITYQUERY = @"VisibilityQuery";
public const System.String DB_PROCESSTRACEOBJECT = @"processid";
protected System.Collections.Generic.IDictionary<System.String,System.String> m_visibilityFilters;
protected System.Nullable<BizAPP.Runtime.Core.Service.Session.SystemKind> m_systemKind;
protected System.String m_defaultForm;
protected System.String m_defaultView;
protected System.String m_defaultMobileView;
protected System.String m_defaultQuery;
protected System.String m_defaultQuickCreateForm;
protected System.String m_rootTypeId;
protected System.String m_defaultProcess;
protected System.String m_redirectedToTypeId;
protected System.String m_label;
protected System.String m_metadefinition;
protected System.String m_extends;
protected System.String m_hierarchy;
protected System.String m_pluralName;
protected System.Int32 m_designVersion;
protected System.Func<System.String,System.Type> m_resolveTypeCallback;
protected System.Collections.Generic.IEnumerable<System.String> m_inhertingTypeIds;
protected System.Collections.Generic.IEnumerable<System.String> m_objectTypes;
protected System.Collections.Generic.IList<System.String> m_editResponsibilities;
protected System.Collections.Generic.IList<BizAPP.Runtime.Core.Category> m_categories;
protected System.Collections.Generic.IList<BizAPP.Common.Database.Query.Common.Index> m_indexes;
protected System.Collections.Generic.Dictionary<BizAPP.Runtime.Core.ImageType,System.String> m_imageResources;
protected BizAPP.Runtime.Core.BizAPPDataColumn[] m_forwardRelationships;
protected System.Type m_eventManagerType;
protected System.Type m_runtimeObjectType;
protected BizAPP.Runtime.Core.BizAPPDataColumn[] m_allFieldsArray;
protected System.Collections.Generic.Dictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> m_metadataEntIdToFields;
protected System.Collections.Generic.Dictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> m_metadataFields;
protected System.Collections.Generic.Dictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> m_metadataDBNameToFields;
protected System.Collections.Generic.Dictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> m_metadataCodeToFields;
		public void InternalDeserialize(  System.String metaDefinition, System.String customizedMetaDefinition, BizAPP.Runtime.Core.Service.Metadata.MetadataInfo baseMetadataInfo )
		{
throw new System.NotImplementedException( );
		}

		protected override void Dispose(  System.Boolean disposing )
		{
throw new System.NotImplementedException( );
		}

		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo sinfo, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		public void Initialize(  )
		{
throw new System.NotImplementedException( );
		}

		public BizAPP.Runtime.Core.RuntimeObjectMetadata CloneAsVersionedMetadata(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal void Initialize(  BizAPP.Runtime.Core.RuntimeContext context, System.Boolean diagnostics, System.Collections.Generic.IDictionary<System.String,System.String> visibilityFilters = null )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] GetForwardLinkRelationships(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual BizAPP.Runtime.Core.RuntimeObjectManager CreateNewManager(  BizAPP.Runtime.Core.RuntimeContext context )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual BizAPP.Runtime.Core.RuntimeObject CreateNewObject(  BizAPP.Runtime.Core.RuntimeObjectManager manager )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void InitializeMetadata(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal void FinalizeMetadata(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual System.String GetInternalName(  )
		{
throw new System.NotImplementedException( );
		}

		public BizAPP.Runtime.Core.BizAPPDataColumn GetFieldMetadata(  System.String field )
		{
throw new System.NotImplementedException( );
		}

		public virtual void GetObjectType(  System.Type t )
		{
throw new System.NotImplementedException( );
		}

		public virtual BizAPP.Runtime.Core.RuntimeObjectWorkflow GetObjectWorkflow(  )
		{
throw new System.NotImplementedException( );
		}

		public System.Type GetObjectType(  )
		{
throw new System.NotImplementedException( );
		}

		public System.Type GetEventType(  )
		{
throw new System.NotImplementedException( );
		}

		public System.Object InvokeMethod(  System.String methodName, System.Type[] argumentTypes, System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		public System.String GetResourceId(  BizAPP.Runtime.Core.ImageType type )
		{
throw new System.NotImplementedException( );
		}

protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] DirectFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] LinkFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] InplaceLinkFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] DisplayNameFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] AnonymizeDataFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] SearchFieldsDictionary
{
get {throw new System.NotImplementedException( );}}
protected internal System.Collections.Generic.IDictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> ExternalFieldsDictionary
{
get {throw new System.NotImplementedException( );}}
protected internal System.Collections.Generic.IDictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> ReverseLinkFields
{
get {throw new System.NotImplementedException( );}}
protected internal System.Collections.Generic.IDictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> InplaceReverseFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] ExternalDisplayNameFields
{
get {throw new System.NotImplementedException( );}}
protected internal System.Collections.Generic.HashSet<System.String> VirtualPersistFields
{
get {throw new System.NotImplementedException( );}}
protected internal System.Collections.Generic.HashSet<System.String> VirtualEditableFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] ContentSearchableFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] ObjectMessageFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] HierarchyFields
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.BizAPPDataColumn[] RollupFields
{
get {throw new System.NotImplementedException( );}}
protected internal virtual System.Boolean IsVersion
{
get {throw new System.NotImplementedException( );}}
protected internal virtual System.String DisplayNameFormat
{
get {throw new System.NotImplementedException( );}}
protected internal virtual System.Nullable<System.Boolean> TruncateDisplayName
{
get {throw new System.NotImplementedException( );}
set {;} 
}
protected internal virtual System.Boolean MultiTenantEnabled
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean MessagingEnabled
{
get {throw new System.NotImplementedException( );}}
protected internal virtual System.String DescriptionFormat
{
get {throw new System.NotImplementedException( );}}
protected internal virtual System.String EditablityExpression
{
get {throw new System.NotImplementedException( );}}
protected internal virtual System.String LocationExpression
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.Dictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> FieldsDictionary
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.Dictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> FieldsCodeDictionary
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.Dictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> FieldsDbNameDictionary
{
get {throw new System.NotImplementedException( );}}
public BizAPP.Common.Query.QueryObject SelectQuery
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public virtual BizAPP.Runtime.Core.Visibility Visibility
{
get {throw new System.NotImplementedException( );}}
public virtual System.String VisibilityFilter
{
get {throw new System.NotImplementedException( );}}
public virtual System.String QueryVisibilityFilter
{
get {throw new System.NotImplementedException( );}}
public virtual BizAPP.Common.Query.QueryObject QueryVisibility
{
get {throw new System.NotImplementedException( );}}
public virtual System.Collections.Generic.ICollection<System.String> EditResponsibilities
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.ICollection<BizAPP.Runtime.Core.Category> Categories
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.ICollection<BizAPP.Common.Database.Query.Common.Index> Indexes
{
get {throw new System.NotImplementedException( );}}
public virtual System.Collections.Generic.IDictionary<BizAPP.Runtime.Core.ImageType,System.String> ImageResources
{
get {throw new System.NotImplementedException( );}}
public virtual System.String InternalName
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsAbstract
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsSealed
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsDeprecated
{
get {throw new System.NotImplementedException( );}}
public virtual System.String ObjectType
{
get {throw new System.NotImplementedException( );}}
public virtual System.Collections.Generic.List<System.String> ObjectTypeIds
{
get {throw new System.NotImplementedException( );}}
public virtual System.String ObjectTypeId
{
get {throw new System.NotImplementedException( );}}
public virtual System.String BusinessModuleId
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsVirtual
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean OptimisticLock
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean NoLock
{
get {throw new System.NotImplementedException( );}}
public virtual System.String DisplayNameErrorFormat
{
get {throw new System.NotImplementedException( );}}
public virtual System.Nullable<BizAPP.Runtime.Core.DataSourceType> DataSourceType
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public virtual System.Boolean IsDisplayNameUnique
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IgnoreInmemoryOrUnsavedInstances
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsExternal
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsInternal
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean DownloadExternalWhenNotFound
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean RequiresExternalDataSync
{
get {throw new System.NotImplementedException( );}}
public virtual BizAPP.Runtime.Core.ExternalDataSourceProviderInfo ExternalDataSourceProviderInfo
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsQueryable
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsPromotable
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsReplicateable
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsAuditable
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsDetailAuditEnabled
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean HasVersions
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean HasChangeComments
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean AllowPublicQueries
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean UsesExternalSyncComparer
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean EnableSoftDelete
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean EnableContentSearch
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean EnableApplicationBinding
{
get {throw new System.NotImplementedException( );}}
public virtual System.String EnableChangeCommentsExpression
{
get {throw new System.NotImplementedException( );}}
public virtual System.String ChangeCommentsField
{
get {throw new System.NotImplementedException( );}}
public virtual System.String ChangeCommentsViewId
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean HasDynamicValidations
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean ShowInRecentItems
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean Traceable
{
get {throw new System.NotImplementedException( );}}
public virtual System.String IdGenerator
{
get {throw new System.NotImplementedException( );}}
public virtual System.String EnableDynamicValidationsExpression
{
get {throw new System.NotImplementedException( );}}
public virtual System.String DynamicValidationContextExpression
{
get {throw new System.NotImplementedException( );}}
public virtual System.String DynamicValidationAuditProcessId
{
get {throw new System.NotImplementedException( );}}
public virtual System.String EditCheckFailureTypeId
{
get {throw new System.NotImplementedException( );}}
public virtual System.String CreateNewManualEditCheckMapperId
{
get {throw new System.NotImplementedException( );}}
public virtual System.String CreateNewFieldCommentMapperId
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean HasProperties
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean HasMessages
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean HasJobs
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean HasAnnotations
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsDelegatable
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean IsDraftable
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean ExcludeFromCleanup
{
get {throw new System.NotImplementedException( );}}
public virtual System.Boolean DetectDataTampering
{
get {throw new System.NotImplementedException( );}}
public virtual System.Nullable<BizAPP.Common.Database.Query.CompressionMode> CompressionMode
{
get {throw new System.NotImplementedException( );}}
public BizAPP.Runtime.Core.Service.Session.SystemKind SystemKind
{
get {throw new System.NotImplementedException( );}}
public System.String DefaultForm
{
get {throw new System.NotImplementedException( );}}
public System.String DefaultView
{
get {throw new System.NotImplementedException( );}}
public System.String DefaultMobileView
{
get {throw new System.NotImplementedException( );}}
public System.String DefaultQuickCreateForm
{
get {throw new System.NotImplementedException( );}}
public System.String DefaultQuery
{
get {throw new System.NotImplementedException( );}}
public System.String DefaultProcess
{
get {throw new System.NotImplementedException( );}}
public System.String PluralName
{
get {throw new System.NotImplementedException( );}}
public System.String RedirectedToTypeId
{
get {throw new System.NotImplementedException( );}}
public System.String Label
{
get {throw new System.NotImplementedException( );}}
public System.String Extends
{
get {throw new System.NotImplementedException( );}}
public System.String Hierarchy
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.IEnumerable<System.String> ObjectTypes
{
get {throw new System.NotImplementedException( );}}
public System.Func<System.String,System.Type> ResolveTypeCallback
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.String EventMessageFormat
{
get {throw new System.NotImplementedException( );}}
protected internal System.Collections.Generic.IEnumerable<System.String> InheritingObjectTypeIds
{
get {throw new System.NotImplementedException( );}}
protected internal System.Func<BizAPP.Runtime.Core.IRuntimeObject,System.Boolean> VisibilityFilterExpression
{
get {throw new System.NotImplementedException( );}}
protected internal System.String RootTypeId
{
get {throw new System.NotImplementedException( );}}
protected internal System.String Namespace
{
get {throw new System.NotImplementedException( );}}
public System.Int32 CurrentVersion
{
get {throw new System.NotImplementedException( );}}
public System.Int32 DesignVersion
{
get {throw new System.NotImplementedException( );}}
		public static BizAPP.Runtime.Core.RuntimeObjectMetadata Deserialize(  System.String metaDefinition, System.String customizedMetaDefinition, BizAPP.Runtime.Core.Service.Metadata.MetadataInfo baseMetadataInfo )
		{
throw new System.NotImplementedException( );
		}

		public RuntimeObjectMetadata(  )
		{}
		public RuntimeObjectMetadata(  System.String objectType, System.String objectTypeId )
		{}
		protected internal RuntimeObjectMetadata(  System.Runtime.Serialization.SerializationInfo sinfo, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	public static partial class RuntimeSessionExtensionMethodsShortUrl
	{
		public static System.String GetShortUrl( this BizAPP.Runtime.Core.Service.Tenancy.ITenant tenant, System.String url )
		{
throw new System.NotImplementedException( );
		}

		public static System.String GetShortUrl( this BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, System.String url )
		{
throw new System.NotImplementedException( );
		}

		public static System.String GetShortUrl( this BizAPP.Runtime.Core.Service.Rule.IParameterCache parameterCache, System.String url )
		{
throw new System.NotImplementedException( );
		}


	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class TrackingDictionaryBase<TKey, TValue> : System.Collections.Generic.Dictionary<TKey,TValue>,System.Collections.Generic.IDictionary<TKey,TValue>,System.Collections.IDictionary,System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>,System.Runtime.Serialization.ISerializable,System.Runtime.Serialization.IDeserializationCallback,System.IDisposable
	{
protected System.Boolean m_trackItems;
protected System.Collections.Generic.List<TKey> m_itemsAdded;
protected System.Collections.Generic.List<TKey> m_itemsModified;
protected System.Collections.Generic.Dictionary<TKey,TValue> m_itemsRemoved;
protected System.UInt32 m_serializationCycles;
		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		protected void OnDeserializationComplete(  System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		void System.IDisposable.Dispose(  )
		{
throw new System.NotImplementedException( );
		}

		public void Add(  TKey key, TValue value )
		{
throw new System.NotImplementedException( );
		}

		public void Remove(  TKey key )
		{
throw new System.NotImplementedException( );
		}

		public void RemoveAt(  System.Int32 index )
		{
throw new System.NotImplementedException( );
		}

		public void InsertAt(  System.Int32 index, TKey key, TValue value )
		{
throw new System.NotImplementedException( );
		}

		public void SetAt(  System.Int32 index, TValue value )
		{
throw new System.NotImplementedException( );
		}

		public void ClearItems(  )
		{
throw new System.NotImplementedException( );
		}

		public System.Collections.Generic.IEnumerable<TKey> ToArray(  )
		{
throw new System.NotImplementedException( );
		}

		public void ClearTracking(  )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void TrackItemAdded(  TKey key )
		{
throw new System.NotImplementedException( );
		}

		protected internal void TrackItemModified(  TKey key )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void TrackItemRemoved(  TKey key )
		{
throw new System.NotImplementedException( );
		}

public TValue this[ System.Int32 index]
{
get {throw new System.NotImplementedException( );}}
public TValue this[ TKey key]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Collections.Generic.List<TKey> AddedItems
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.List<TKey> ModifiedItems
{
get {throw new System.NotImplementedException( );}}
public System.Collections.Generic.Dictionary<TKey,TValue> RemovedItems
{
get {throw new System.NotImplementedException( );}}
		protected internal TrackingDictionaryBase(  )
		{}
		protected internal TrackingDictionaryBase(  BizAPP.Runtime.Core.TrackingDictionaryBase<TKey,TValue> dictionary )
		{}
		protected TrackingDictionaryBase(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class RuntimeObject : BizAPP.Runtime.Core.BaseMarshalByValueDynamicObject,System.Dynamic.IDynamicMetaObjectProvider,System.Runtime.Serialization.ISerializable,BizAPP.Runtime.Core.IRuntimeObject,BizAPP.Runtime.Core.IIndexable
	{
internal const System.Char IDSET_SEPARATOR = ':';
internal const System.Char FIELDSEPARATOR = '.';
internal const System.Char INDEXBEGIN = '[';
internal const System.Char INDEXEND = ']';
internal const System.Char UID_SEPARATOR = ',';
internal const System.Char ACTUALFIELDTYPECASTSEPARATOR = '#';
internal const System.Char ACTUALFIELDASUNIQUEIDIDSEPARATOR = '@';
		public event BizAPP.Runtime.Core.InitializeEventHandler OnInitialize;
		public event BizAPP.Runtime.Core.ValidateEventHandler OnValidate;
		public event BizAPP.Runtime.Core.ValidateTransitionEventHandler OnValidateTransition;
		public event BizAPP.Runtime.Core.InitializeTransitionEventHandler OnInitializeTransition;
		public event BizAPP.Runtime.Core.TransitioningEventHandler OnTransitioning;
		public event BizAPP.Runtime.Core.TransitionedEventHandler OnTransitioned;
		public event BizAPP.Runtime.Core.TransitionCancelledEventHandler OnTransitionCancelled;
		public event BizAPP.Runtime.Core.PostTransitionCancelledEventHandler PostTransitionCancelled;
		public event BizAPP.Runtime.Core.NotificationEventHandler OnNotification;
		public event BizAPP.Runtime.Core.SavingEventHandler OnSaving;
		public event BizAPP.Runtime.Core.MessageEventHandler OnMessage;
		public event BizAPP.Runtime.Core.SavedEventHandler OnSaved;
		public event BizAPP.Runtime.Core.SaveDraftEventHandler OnSaveDraft;
		public event BizAPP.Runtime.Core.ExternalDataSourceChangeEventHandler OnExternalDataSourceChange;
		public event BizAPP.Runtime.Core.PossibleOperationsEventHandler OnPossibleOperations;
		public event BizAPP.Runtime.Core.LocationEventHandler OnLocation;
		public event BizAPP.Runtime.Core.ParentCollectionChangingEventHandler OnParentCollectionChanging;
		public event BizAPP.Runtime.Core.ParentCollectionChangedEventHandler OnParentCollectionChanged;
		public event BizAPP.Runtime.Core.ErrorEventHandler OnError;
		public event BizAPP.Runtime.Core.FieldValueInitializeEventHandler OnFieldValueInitialize;
		public event BizAPP.Runtime.Core.FieldValueChangingEventHandler OnFieldValueChanging;
		public event BizAPP.Runtime.Core.FieldValueChangedEventHandler OnFieldValueChanged;
		public event BizAPP.Runtime.Core.FieldValueValidateEventHandler OnFieldValueValidate;
		public event BizAPP.Runtime.Core.FieldValueBehaviorEventHandler OnFieldValueBehavior;
		public event BizAPP.Runtime.Core.FieldValueAllowedValuesEventHandler OnFieldValueAllowedValues;
		public event BizAPP.Runtime.Core.FieldValueAllowedLinkTypesEventHandler OnFieldValueAllowedLinkTypes;
		public event BizAPP.Runtime.Core.VirtualFieldGetValueEventHandler OnVirtualFieldGetValue;
		public event BizAPP.Runtime.Core.VirtualFieldSetValueEventHandler OnVirtualFieldSetValue;
		public event BizAPP.Runtime.Core.ReloadEventHandler OnReloaded;
		public event BizAPP.Runtime.Core.EditCheckStateChangingEventHandler OnEditCheckStateChanging;
		public event BizAPP.Runtime.Core.FieldCommentChangingEventHandler OnFieldCommentChanging;
		public event BizAPP.Runtime.Core.CanEditEventHandler OnCanEdit;
		protected virtual System.Int32 PreSave(  BizAPP.Runtime.Core.SoftTransactionNotificationArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual System.Int32 PostSaved(  BizAPP.Runtime.Core.SoftTransactionNotificationArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void Validate(  BizAPP.Runtime.Core.SoftTransactionNotificationArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected System.Boolean IsAccessible(  BizAPP.Runtime.Core.BizAPPDataColumn sourceColumn, System.Boolean forWrite )
		{
throw new System.NotImplementedException( );
		}

		protected System.Boolean SetLock(  System.Boolean lockValue, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dos, System.Boolean checkForLockStatus = true )
		{
throw new System.NotImplementedException( );
		}

		protected System.Boolean SetLock(  System.Boolean lockValue )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.IRuntimeObjectLinksCollection InternalGetRelationshipFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn bdc )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual void InternalSetRelationshipFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc, System.Object value, System.Boolean ignoreBehavior )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Object InternalGetFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc, BizAPP.Runtime.Core.FieldNameType fnt, BizAPP.Runtime.Core.FieldValueType fvtCopy, BizAPP.Runtime.Core.FieldValueType fvtOriginal, System.Object defaultValue = null, BizAPP.Runtime.Core.AdditionalValueInfo additionalValueInfo = null )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Object InternalGetFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.IRuntimeObjectLinksCollection InternalGetLinkFieldCollection(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.IObjectWrapper InternalGetLinkFieldValueWrapper(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Object InternalGetBaseFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc, BizAPP.Runtime.Core.FieldNameType fnt = BizAPP.Runtime.Core.FieldNameType.Name, BizAPP.Runtime.Core.FieldValueType fvtCopy = BizAPP.Runtime.Core.FieldValueType.Display, BizAPP.Runtime.Core.FieldValueType fvtOriginal = BizAPP.Runtime.Core.FieldValueType.Display, System.Object defaultValue = null, BizAPP.Runtime.Core.AdditionalValueInfo additionalValueInfo = null )
		{
throw new System.NotImplementedException( );
		}

		protected internal void InternalSetFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc, System.Object newValue )
		{
throw new System.NotImplementedException( );
		}

		protected internal void InternalSetFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc, BizAPP.Runtime.Core.FieldValueType fvt, System.Object newValue, System.Boolean ignoreBehavior = false, BizAPP.Runtime.Core.AdditionalValueInfo additionalValueInfo = null )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.IRuntimeObjectLinksCollection InternalGetInplaceRLinksFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.IRuntimeObject InternalGetLinkFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.IRuntimeObjectLinksCollection InternalGetLinksFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc )
		{
throw new System.NotImplementedException( );
		}

		protected internal void InternalSetLinkFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc, BizAPP.Runtime.Core.IRuntimeObject value )
		{
throw new System.NotImplementedException( );
		}

		protected internal void InternalSetLinkFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn adc, BizAPP.Runtime.Core.IRuntimeObject value, System.Boolean ignoreBehavior )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean InternalCanInvokeOperation(  System.String operation,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean InternalInvokeOperation(  System.String operation, BizAPP.Runtime.Core.IRuntimeObject[] objects,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.String[] InternalGetPromotableTypes(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean InternalCanApplyStep(  System.String stepName, System.Boolean throwException,out BizAPP.Runtime.Core.State targetState,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		protected System.Int32 InternalApplyStep(  System.String stepName, BizAPP.Runtime.Core.ISoftTransaction tx,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		protected internal void LoadRelationships(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual void ReloadRelationships(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ReloadProperties(  )
		{
throw new System.NotImplementedException( );
		}

		public override System.Boolean TrySetMember(  System.Dynamic.SetMemberBinder binder, System.Object value )
		{
throw new System.NotImplementedException( );
		}

		public override System.Boolean TryGetMember(  System.Dynamic.GetMemberBinder binder,out System.Object result )
		{
throw new System.NotImplementedException( );
		}

		public override System.Boolean TryConvert(  System.Dynamic.ConvertBinder binder,out System.Object result )
		{
throw new System.NotImplementedException( );
		}

		public override System.Boolean TryInvoke(  System.Dynamic.InvokeBinder binder, System.Object[] args,out System.Object result )
		{
throw new System.NotImplementedException( );
		}

		public override System.Boolean TryInvokeMember(  System.Dynamic.InvokeMemberBinder binder, System.Object[] args,out System.Object result )
		{
throw new System.NotImplementedException( );
		}

		System.Object System.ICloneable.Clone(  )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Clone( params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Clone(  BizAPP.Runtime.Core.ISoftTransaction transaction )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Clone(  BizAPP.Runtime.Core.ISoftTransaction transaction,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.CloneAsVirtual(  BizAPP.Runtime.Core.ISoftTransaction transaction,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.CloneAsVirtual(  BizAPP.Runtime.Core.ISoftTransaction transaction )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.CloneAsVirtual(  )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.CloneAsVirtual( params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		protected System.Object ParseAndGetFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn field )
		{
throw new System.NotImplementedException( );
		}

		protected System.Object[] ParseAndGetFieldValues(  System.String[] fieldNames, BizAPP.Runtime.Core.FieldNameType fieldNameType = BizAPP.Runtime.Core.FieldNameType.Name, BizAPP.Runtime.Core.FieldValueType fieldValueType = BizAPP.Runtime.Core.FieldValueType.Display, System.Object defaultValue = null, System.Boolean throwError = true )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Object ParseAndGetFieldValue(  System.String fieldName, BizAPP.Runtime.Core.FieldNameType fieldNameType = BizAPP.Runtime.Core.FieldNameType.Name, BizAPP.Runtime.Core.FieldValueType fieldValueType = BizAPP.Runtime.Core.FieldValueType.Display, System.Object defaultValue = null, System.Boolean throwError = true, System.Collections.Generic.HashSet<BizAPP.Runtime.Core.IRuntimeObject> visitedObjects = null, BizAPP.Runtime.Core.AdditionalValueInfo additionalValueInfo = null )
		{
throw new System.NotImplementedException( );
		}

		protected void ParseAndSetFieldValue(  BizAPP.Runtime.Core.BizAPPDataColumn field, System.Object value )
		{
throw new System.NotImplementedException( );
		}

		protected void ParseAndSetFieldValue(  System.String fieldName, BizAPP.Runtime.Core.FieldNameType fieldNameType = BizAPP.Runtime.Core.FieldNameType.Name, BizAPP.Runtime.Core.FieldValueType fieldValueType = BizAPP.Runtime.Core.FieldValueType.Display, System.Object value = null, System.Boolean ignoreBehavior = false, System.Boolean isOpenPicklistItem = false, BizAPP.Runtime.Core.AdditionalValueInfo additionalValueInfo = null )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Modify(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Modify(  BizAPP.Runtime.Core.ISoftTransaction tx )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Pull(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Pull(  BizAPP.Runtime.Core.ISoftTransaction tx )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Push(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Push( params  System.Object[] arugments )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Push(  BizAPP.Runtime.Core.ISoftTransaction tx )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Push(  BizAPP.Runtime.Core.ISoftTransaction tx,params  System.Object[] arugments )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Promote(  System.String objectType )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Promote(  System.String objectType, BizAPP.Runtime.Core.ISoftTransaction tx )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.UnLock(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.ModifyVersion(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.ModifyVersion(  BizAPP.Runtime.Core.ISoftTransaction tx )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Delete(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Delete(  BizAPP.Runtime.Core.ISoftTransaction tx )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Undelete(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Undelete(  BizAPP.Runtime.Core.ISoftTransaction tx )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Merge(  BizAPP.Runtime.Core.IRuntimeObject targetObject, BizAPP.Runtime.Core.ISoftTransaction transaction )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Merge(  BizAPP.Runtime.Core.IRuntimeObject targetObject )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObject.Export(  )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.ExportAndDownload(  )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.FireNotification(  System.String notificationDefIdentifier )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.FireNotification(  System.String notificationDefIdentifier, BizAPP.Runtime.Core.ISoftTransaction transaction )
		{
throw new System.NotImplementedException( );
		}

		System.Object[] BizAPP.Runtime.Core.IRuntimeObject.ExecuteMapper(  System.String mapperEIDOrName )
		{
throw new System.NotImplementedException( );
		}

		System.Object[] BizAPP.Runtime.Core.IRuntimeObject.ExecuteMapper(  System.String mapperEIDOrName, System.String targetObjectIdentifier )
		{
throw new System.NotImplementedException( );
		}

		System.Object[] BizAPP.Runtime.Core.IRuntimeObject.ExecuteMapper(  System.String mapperEIDOrName, System.String targetObjectIdentifier, BizAPP.Runtime.Core.ISoftTransaction tx )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.ExecuteProcess(  System.String processEIDOrName )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.ApplyProcessStep(  System.String processStepName )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.Step[] BizAPP.Runtime.Core.IRuntimeObject.AvailableSteps(  )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.Step[] BizAPP.Runtime.Core.IRuntimeObject.AvailableSteps( params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.CanInvokeOperation(  System.String operation )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.CanInvokeOperation(  System.String operation,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.InvokeOperation(  System.String operation )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.InvokeOperation(  System.String operation,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.InvokeOperation(  System.String operation, BizAPP.Runtime.Core.IRuntimeObject[] targetObjects,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObject.ToString(  System.String format )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.SetExtendedProperty(  System.Object key, System.Object value )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.GetExtendedProperty(  System.Object key )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.InvokeAsJob(  System.String methodName,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.InvokeAsJob(  System.String methodName, System.Boolean executeSynchronously, System.TimeSpan timeout,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.InvokeEx(  System.String methodName,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.InvokeStaticEx(  System.String methodName,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Invoke(  System.String methodName,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Invoke(  System.String methodName, System.Type[] parameterTypes,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Invoke(  System.String methodName, System.Boolean throwMethodAccessException,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Invoke(  System.String methodName, System.Boolean throwMethodAccessException,out System.Boolean invoked,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Evaluate(  System.String expression, System.Collections.Hashtable dynamicValues )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Evaluate(  BizAPP.Common.Query.QueryObject query, System.Collections.Hashtable dynamicValues )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.Compute(  System.String expression, System.Collections.Hashtable dynamicValues )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.WriteLog(  System.String format,params  System.Object[] args )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.CreateObjectTemplate(  System.Boolean deepClone )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObject.GetAllTags(  )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.AddTag(  System.String tag )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.RemoveTag(  System.String tag )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.Generic.Dictionary<System.String,System.Object> BizAPP.Runtime.Core.IRuntimeObject.AnonymizeData(  BizAPP.Runtime.Core.ISoftTransaction transaction, System.Func<System.String,System.ValueTuple<BizAPP.Runtime.Core.AnonymizeValueMask,System.Object>> valueResolver )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.Generic.Dictionary<System.String,System.Object> BizAPP.Runtime.Core.IRuntimeObject.AnonymizeData(  BizAPP.Runtime.Core.ISoftTransaction transaction, System.Collections.Generic.Dictionary<System.String,System.Object> fieldValues )
		{
throw new System.NotImplementedException( );
		}

		protected virtual System.Collections.Generic.Dictionary<System.String,System.Object> InternalAnonymizeData(  BizAPP.Runtime.Core.ISoftTransaction transaction, System.Boolean saveRequired, System.Collections.Generic.List<BizAPP.Common.Database.IQuery> queries, System.Func<System.String,System.ValueTuple<BizAPP.Runtime.Core.AnonymizeValueMask,System.Object>> valueResolver )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.SetPicklistItemValue(  System.String fieldName, System.Object value )
		{
throw new System.NotImplementedException( );
		}

		public System.Double ConvertToEnterpriseCurrencyValue(  System.String isoCurrencyName, System.Double value )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.Hashtable BizAPP.Runtime.Core.IRuntimeObject.GetFieldsMetadata(  )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.Hashtable BizAPP.Runtime.Core.IRuntimeObject.GetFieldsMetadata(  System.Boolean includeHierarchy )
		{
throw new System.NotImplementedException( );
		}

		System.String[] BizAPP.Runtime.Core.IRuntimeObject.GetAffectedFieldsForLastChange(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.BeginFieldChangeCapture(  System.String name )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.CancelFieldChangeCapture(  System.String name )
		{
throw new System.NotImplementedException( );
		}

		System.String[] BizAPP.Runtime.Core.IRuntimeObject.EndFieldChangeCapture(  System.String name )
		{
throw new System.NotImplementedException( );
		}

		System.String[] BizAPP.Runtime.Core.IRuntimeObject.GetDependentFields(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.GetSearchResults(  System.String fieldName, BizAPP.Runtime.Core.QueryOptions qryOptions )
		{
throw new System.NotImplementedException( );
		}

		System.Object[] BizAPP.Runtime.Core.IRuntimeObject.GetAllowedValues(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObject.GetPicklistItemValues(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.String[] BizAPP.Runtime.Core.IRuntimeObject.GetAllowedLinkValueTypes(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.SetFieldBehavior(  System.String fieldName, BizAPP.Runtime.Core.FieldBehaviorType ft )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.FieldBehaviorType BizAPP.Runtime.Core.IRuntimeObject.GetFieldBehavior(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObject.GetDescription(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObject.GetDescription(  System.String fieldName, System.Boolean throwsException )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.BizAPPDataColumn BizAPP.Runtime.Core.IRuntimeObject.GetFieldMetadata(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.BizAPPDataColumn BizAPP.Runtime.Core.IRuntimeObject.GetFieldMetadata(  System.String fieldName, BizAPP.Runtime.Core.FieldNameType fieldNameType )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Common.NameValue[] BizAPP.Runtime.Core.IRuntimeObject.GetFieldValues(  )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Common.NameValue[] BizAPP.Runtime.Core.IRuntimeObject.GetFilteredFieldValues(  System.Func<BizAPP.Runtime.Core.BizAPPDataColumn,System.Boolean> fieldFilterCallback )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Common.NameValue[] BizAPP.Runtime.Core.IRuntimeObject.GetFieldValues( params  System.String[] fieldNames )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.InplaceLinkWrapper BizAPP.Runtime.Core.IRuntimeObject.GetInplaceLinkFieldValueWrapper(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IObjectWrapper BizAPP.Runtime.Core.IRuntimeObject.GetLinkFieldValueWrapper(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.IDictionary BizAPP.Runtime.Core.IRuntimeObject.GetFieldValueInfo(  )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.IDictionary BizAPP.Runtime.Core.IRuntimeObject.GetFieldValueInfo( params  System.String[] fieldNames )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.IDictionary BizAPP.Runtime.Core.IRuntimeObject.GetFieldValueInfoEx(  )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.IDictionary BizAPP.Runtime.Core.IRuntimeObject.GetFieldValueInfoEx( params  System.String[] fieldNames )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.IsAutoCorrected(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.IsDirty(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.SetDirty(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasFieldComments(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasFieldComments(  System.String fieldName,out System.Int32 fieldCommentsCount )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.Generic.IEnumerable<BizAPP.Runtime.Core.Service.EditCheck.EditCheckRule> BizAPP.Runtime.Core.IRuntimeObject.GetEditChecks(  System.String fieldName, System.Nullable<System.Boolean> isManual )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObject.ValidateEditChecks(  System.String fieldName, System.Collections.Generic.IEnumerable<BizAPP.Runtime.Core.Service.EditCheck.EditCheckRule> editChecksToValidate )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasEditCheckAudits(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasEditCheckAudits(  System.String fieldName,out System.Int32 editCheckAuditsCount )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasEditCheckFailures(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasEditCheckFailures(  System.String fieldName,out System.Collections.Generic.IEnumerable<System.String> editCheckFailuresList )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasChangeComments(  )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.GetCommentViewEnableExpression(  BizAPP.Runtime.Core.Step step, System.Boolean getComputedValue )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObject.GetCommentField(  BizAPP.Runtime.Core.Step step )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObject.GetCommentsView(  BizAPP.Runtime.Core.Step step, System.Boolean getComputedValue )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.GetLastFieldValue(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Object BizAPP.Runtime.Core.IRuntimeObject.GetLastFieldSetValue(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Reload(  )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObject.GetFieldChangeHistory(  )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObject.GetFieldChangeHistory(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.CanApplyStep(  System.String stepName )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.CanApplyStep(  System.String stepName,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObject.CanPromote( params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.ApplyStep(  System.String stepName )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.ApplyStep(  System.String stepName,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.ApplyStep(  System.String stepName, BizAPP.Runtime.Core.ISoftTransaction tx )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.ApplyStep(  System.String stepName, BizAPP.Runtime.Core.ISoftTransaction tx,params  System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.CancelStep(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.SaveOffline(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.SaveDraft(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Validate(  )
		{
throw new System.NotImplementedException( );
		}

		void BizAPP.Runtime.Core.IRuntimeObject.ValidateUsingState(  System.String overrideState )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Save(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.SaveDraftVersion(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.CancelDraftVersion(  )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.CancelLastDraftChanges(  )
		{
throw new System.NotImplementedException( );
		}

		public override System.String ToString(  )
		{
throw new System.NotImplementedException( );
		}

		protected override void Dispose(  System.Boolean disposing )
		{
throw new System.NotImplementedException( );
		}

		public override void GetObjectData(  System.Runtime.Serialization.SerializationInfo sinfo, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObject.GetDraftVersion(  System.String transactionName )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.CompressedByteArray BizAPP.Runtime.Core.IRuntimeObject.GetImage(  System.Boolean largeIcon )
		{
throw new System.NotImplementedException( );
		}

		public override System.Int32 GetHashCode(  )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean System.IEquatable<BizAPP.Runtime.Core.IRuntimeObject>.Equals(  BizAPP.Runtime.Core.IRuntimeObject other )
		{
throw new System.NotImplementedException( );
		}

		public System.Boolean Equals(  BizAPP.Runtime.Core.IRuntimeObject other )
		{
throw new System.NotImplementedException( );
		}

		public override System.Boolean Equals(  System.Object obj )
		{
throw new System.NotImplementedException( );
		}

System.Int32 BizAPP.Runtime.Core.IRuntimeObject.TenantId
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.EnterpriseId
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.String BizAPP.Runtime.Core.IRuntimeObject.UniqueId
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.Identifier
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.VersionIndependentIdentifier
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.OldUniqueId
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.String BizAPP.Runtime.Core.IRuntimeObject.DisplayName
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.ObjectDescription
{
get {throw new System.NotImplementedException( );}}
System.Int32 BizAPP.Runtime.Core.IRuntimeObject.Version
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.State
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.OverrideState
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.String BizAPP.Runtime.Core.IRuntimeObject.OverrideStep
{
get {throw new System.NotImplementedException( );}
set {;} 
}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.CreatedBy
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.ProcessId
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.String BizAPP.Runtime.Core.IRuntimeObject.ProcessState
{
get {throw new System.NotImplementedException( );}
set {;} 
}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.ProcessTraceObject
{
get {throw new System.NotImplementedException( );}
set {;} 
}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.MetricsObject
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.Application
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.ObjectTemplate
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.String BizAPP.Runtime.Core.IRuntimeObject.OwnerRoleId
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.OwnerRole
{
get {throw new System.NotImplementedException( );}
set {;} 
}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.AssignedTo
{
get {throw new System.NotImplementedException( );}
set {;} 
}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.Owner
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.DateTime BizAPP.Runtime.Core.IRuntimeObject.CreatedOn
{
get {throw new System.NotImplementedException( );}}
System.DateTime BizAPP.Runtime.Core.IRuntimeObject.LastModifiedOn
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.LastModifiedBy
{
get {throw new System.NotImplementedException( );}}
System.DateTime BizAPP.Runtime.Core.IRuntimeObject.ValidTill
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasDraftChanges
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.ObjectType
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.ShortType
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObject.ObjectTypes
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.ObjectTypeId
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObject.ObjectTypeIds
{
get {throw new System.NotImplementedException( );}}
System.Byte[] BizAPP.Runtime.Core.IRuntimeObject.Hash
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.Label
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.Locked
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.LockedBy
{
get {throw new System.NotImplementedException( );}}
System.Nullable<System.DateTime> BizAPP.Runtime.Core.IRuntimeObject.LockedOn
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasJobs
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.HasAlerts
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.IsVersion
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.IsNewObject
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.IsVirtualInstance
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.SkipBehaviorValidationsVirtualInstance
{
get {throw new System.NotImplementedException( );}
set {;} 
}
BizAPP.Runtime.Core.IRuntimeObjectPropertyCollection BizAPP.Runtime.Core.IRuntimeObject.Properties
{
get {throw new System.NotImplementedException( );}}
System.String[] BizAPP.Runtime.Core.IRuntimeObject.FieldNames
{
get {throw new System.NotImplementedException( );}}
System.String[] BizAPP.Runtime.Core.IRuntimeObject.FieldCodes
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.PromotedObject
{
get {throw new System.NotImplementedException( );}}
System.Object BizAPP.Runtime.Core.IIndexable.this[ System.String fieldName]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.Object BizAPP.Runtime.Core.IRuntimeObject.this[ System.String fieldName, BizAPP.Runtime.Core.FieldNameType fieldNameType, BizAPP.Runtime.Core.FieldValueType fieldValueType, System.Object defaultValue, System.Collections.Generic.HashSet<BizAPP.Runtime.Core.IRuntimeObject> visitedObjects, BizAPP.Runtime.Core.AdditionalValueInfo additionalValueInfo]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.Object BizAPP.Runtime.Core.IRuntimeObject.this[ System.String fieldName]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.Object BizAPP.Runtime.Core.IRuntimeObject.this[ System.String fieldName, BizAPP.Runtime.Core.FieldValueType fieldValueType]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.Object BizAPP.Runtime.Core.IRuntimeObject.this[ System.String fieldName, BizAPP.Runtime.Core.FieldNameType fieldNameType, BizAPP.Runtime.Core.FieldValueType fieldValueType, System.Object defaultValue]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.Object BizAPP.Runtime.Core.IRuntimeObject.this[ System.String[] fieldNames, BizAPP.Runtime.Core.FieldNameType fieldNameType, BizAPP.Runtime.Core.FieldValueType fieldValueType, System.Object defaultValue, BizAPP.Runtime.Core.AdditionalValueInfo additionalValueInfo]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.Dirty
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObject.DirtyFields
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.ValueChangedSinceLastValidation
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.RequiresReload
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.Service.Session.IRuntimeSession BizAPP.Runtime.Core.IRuntimeObject.Session
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.State[] BizAPP.Runtime.Core.IRuntimeObject.PossibleTargetStates
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.StateCollection BizAPP.Runtime.Core.IRuntimeObject.States
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.TransitionCollection BizAPP.Runtime.Core.IRuntimeObject.StateTransition
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.CanEdit
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.Editable
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.ObjectEditable
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.SavedOnce
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.String BizAPP.Runtime.Core.IRuntimeObject.CurrentStep
{
get {throw new System.NotImplementedException( );}}
System.String[] BizAPP.Runtime.Core.IRuntimeObject.PromotableTypes
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.ISoftTransaction BizAPP.Runtime.Core.IRuntimeObject.Transaction
{
get {throw new System.NotImplementedException( );}
set {;} 
}
BizAPP.Runtime.Core.Step[] BizAPP.Runtime.Core.IRuntimeObject.PossibleSteps
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.StepCollection BizAPP.Runtime.Core.IRuntimeObject.Steps
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.Operation[] BizAPP.Runtime.Core.IRuntimeObject.PossibleOperations
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObjectVersionsCollection BizAPP.Runtime.Core.IRuntimeObject.Versions
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.ObjectDeleted
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.IsAlive
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObject.IsDelegatable
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.ValidationAuditProcessId
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.Form
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.FormEnterpriseId
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.Process
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.ProcessEnterpriseId
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.QuickCreateForm
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.QuickCreateFormEnterpriseId
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.View
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.ViewEnterpriseId
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.Query
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObject.QueryEnterpriseId
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObject.RedirectedTo
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.String BizAPP.Runtime.Core.IRuntimeObject.RedirectedToId
{
get {throw new System.NotImplementedException( );}
set {;} 
}
System.Data.PropertyCollection BizAPP.Runtime.Core.IRuntimeObject.ExtendedProperties
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean ObjectEditable
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsVersion
{
get {throw new System.NotImplementedException( );}
set {;} 
}
protected virtual System.String QuickCreateFormEnterpriseId
{
get {throw new System.NotImplementedException( );}}
protected virtual BizAPP.Runtime.Core.IRuntimeObject QuickCreateForm
{
get {throw new System.NotImplementedException( );}}
protected virtual System.String DefaultFormEnterpriseId
{
get {throw new System.NotImplementedException( );}}
protected virtual BizAPP.Runtime.Core.IRuntimeObject DefaultForm
{
get {throw new System.NotImplementedException( );}}
protected virtual System.String DefaultViewEnterpriseId
{
get {throw new System.NotImplementedException( );}}
protected virtual BizAPP.Runtime.Core.IRuntimeObject DefaultView
{
get {throw new System.NotImplementedException( );}}
protected virtual System.String DefaultQueryEnterpriseId
{
get {throw new System.NotImplementedException( );}}
protected virtual BizAPP.Runtime.Core.IRuntimeObject DefaultQuery
{
get {throw new System.NotImplementedException( );}}
protected virtual System.String DefaultProcessEnterpriseId
{
get {throw new System.NotImplementedException( );}}
protected virtual BizAPP.Runtime.Core.IRuntimeObject DefaultProcess
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.RuntimeObjectRow Row
{
get {throw new System.NotImplementedException( );}
set {;} 
}
protected internal BizAPP.Runtime.Core.RuntimeObjectManager Manager
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.RuntimeObjectMetadata Metadata
{
get {throw new System.NotImplementedException( );}}
protected System.String FIELD_ERROR
{
get {throw new System.NotImplementedException( );}}
		public static System.Int32 GetPendingJobRequestsCount(  BizAPP.Runtime.Core.Service.Session.IRuntimeSession session, System.String contextIdentier )
		{
throw new System.NotImplementedException( );
		}

		protected internal RuntimeObject(  )
		{}
		protected internal RuntimeObject(  BizAPP.Runtime.Core.RuntimeObjectManager rom )
		{}
		protected internal RuntimeObject(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
public delegate void IdChangedEventHandler(  System.Object sender, System.String tempId, System.String newId );
}
namespace BizAPP.Runtime.Core
{
public delegate void TenantIdChangedEventHandler(  System.Object sender, System.Int32 oldTenantId, System.Int32 newTenantId );
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class RuntimeObjectCollection : BizAPP.Runtime.Core.BaseMarshalByValueObject,BizAPP.Runtime.Core.IDisposableEx,System.Runtime.Serialization.ISerializable,BizAPP.Runtime.Core.IRuntimeObjectCollection
	{
		void System.IDisposable.Dispose(  )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObjectCollection.Contains(  System.String uniqueId )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObjectCollection.ContainsDisplayName(  System.String childDisplayName )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject[] BizAPP.Runtime.Core.IRuntimeObjectCollection.ToRuntimeObjects(  System.Boolean excludeDeletedObjects )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject[] BizAPP.Runtime.Core.IRuntimeObjectCollection.ToRuntimeObjects(  System.Boolean excludeDeletedObjects, System.String sortColumn )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject[] BizAPP.Runtime.Core.IRuntimeObjectCollection.ToRuntimeObjects(  System.Boolean excludeDeletedObjects, System.String sortColumn, System.Boolean ignoreRedirection )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator(  )
		{
throw new System.NotImplementedException( );
		}

		public System.Collections.Generic.IEnumerator<BizAPP.Runtime.Core.IObjectWrapper> GetEnumerator(  )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.IObjectWrapper GetRuntimeWrapper(  System.String uid )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.IObjectWrapper GetRuntimeWrapperByDisplayName(  System.String displayName )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.IObjectWrapper[] GetRuntimeWrappers(  )
		{
throw new System.NotImplementedException( );
		}

BizAPP.Runtime.Core.IObjectWrapper BizAPP.Runtime.Core.IRuntimeObjectCollection.this[ System.Int32 index]
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IObjectWrapper BizAPP.Runtime.Core.IRuntimeObjectCollection.this[ System.String uniqueId]
{
get {throw new System.NotImplementedException( );}}
BizAPP.Runtime.Core.IObjectWrapper BizAPP.Runtime.Core.IRuntimeObjectCollection.this[ System.String uniqueIdOrDisplayName, System.Boolean isDisplayName]
{
get {throw new System.NotImplementedException( );}}
System.Int32 BizAPP.Runtime.Core.IRuntimeObjectCollection.Count
{
get {throw new System.NotImplementedException( );}}
		public RuntimeObjectCollection(  BizAPP.Runtime.Core.RuntimeContext runtimeContext, System.Int32 version, System.Collections.Generic.List<System.String> uniqueIds, System.Collections.Generic.List<System.String> displayNames, System.Collections.Generic.List<System.String> objectTypeIds, System.Collections.Generic.List<System.Int32> versions )
		{}
public RuntimeObjectCollection( ){}
	}
}
namespace BizAPP.Runtime.Core
{
	public abstract partial class RuntimeObjectEventManager
	{
		protected internal virtual BizAPP.Runtime.Core.RuntimeObjectTypeEventHandler CreateTypeEvent(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual BizAPP.Runtime.Core.RuntimeObjectEventHandler CreateEvent(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual BizAPP.Runtime.Core.RuntimeObjectOperationsHandler CreateOperations(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual BizAPP.Runtime.Core.RuntimeObjectMessagesHandler CreateMessages(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal RuntimeObjectEventManager(  )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	public abstract partial class RuntimeObjectTypeEventHandler
	{
protected System.Boolean m_useAvailableEvents;
protected System.Collections.BitArray m_availableEvents;
		protected internal void BindToObjectManager(  BizAPP.Runtime.Core.IRuntimeObjectManager rom, BizAPP.Runtime.Core.ObjectManagerEventIndex eventIndex )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnCreating(  System.Object sender, BizAPP.Runtime.Core.ObjectCreatingEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnCreated(  System.Object sender, BizAPP.Runtime.Core.ObjectCreatedEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnCloned(  System.Object sender, BizAPP.Runtime.Core.ObjectClonedEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnAccessed(  System.Object sender, BizAPP.Runtime.Core.ObjectAccessedEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnCreateNewId(  System.Object sender, BizAPP.Runtime.Core.CreateNewIdEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void ExtConnectionHandler(  System.Object sender, BizAPP.Runtime.Core.ExternalDataSourceChangeEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnCanCreate(  System.Object sender, BizAPP.Runtime.Core.ObjectCanCreateEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void InitializeAvailableEvents(  )
		{
throw new System.NotImplementedException( );
		}

protected internal System.Boolean UseAvailableEvents
{
get {throw new System.NotImplementedException( );}
set {;} 
}
protected internal System.Collections.BitArray AvailableEvents
{
get {throw new System.NotImplementedException( );}}
		protected internal RuntimeObjectTypeEventHandler(  )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	public abstract partial class RuntimeObjectEventHandler
	{
protected System.Boolean m_useAvailableEvents;
protected System.Collections.BitArray m_availableEvents;
		protected internal void BindToObject(  BizAPP.Runtime.Core.IRuntimeObject ro, BizAPP.Runtime.Core.ObjectEventIndex eventIndex )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnValidateTransition(  System.Object sender, BizAPP.Runtime.Core.ValidateTransitionEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnInitializeTransition(  System.Object sender, BizAPP.Runtime.Core.InitializeTransitionEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnTransitioning(  System.Object sender, BizAPP.Runtime.Core.TransitioningEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnTransitioned(  System.Object sender, BizAPP.Runtime.Core.TransitionedEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnTransitionCancelled(  System.Object sender, BizAPP.Runtime.Core.TransitionCancelledEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void PostTransitionCancelled(  System.Object sender, System.EventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnNotification(  System.Object sender, BizAPP.Runtime.Core.NotificationEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnInitialize(  System.Object sender, BizAPP.Runtime.Core.InitializeEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnValidate(  System.Object sender, BizAPP.Runtime.Core.ValidateEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnParentCollectionChanging(  System.Object sender, BizAPP.Runtime.Core.ParentCollectionChangingEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnParentCollectionChanged(  System.Object sender, BizAPP.Runtime.Core.ParentCollectionChangedEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnError(  System.Object sender, BizAPP.Runtime.Core.ErrorEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnReload(  System.Object sender, BizAPP.Runtime.Core.ReloadEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnEditCheckStateChanging(  System.Object sender, BizAPP.Runtime.Core.EditCheckStateChangingEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnFieldCommentChanging(  System.Object sender, BizAPP.Runtime.Core.FieldCommentChangingEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnCanEdit(  System.Object sender, BizAPP.Runtime.Core.CanEditEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnSaved(  System.Object sender, BizAPP.Runtime.Core.SavedEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnSaveDraft(  System.Object sender, BizAPP.Runtime.Core.SaveDraftEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnExternalDataSourceChange(  System.Object sender, BizAPP.Runtime.Core.ExternalDataSourceChangeEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnPossibleOperations(  System.Object sender, BizAPP.Runtime.Core.PossibleOperationsEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnLocation(  System.Object sender, BizAPP.Runtime.Core.LocationEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnSaving(  System.Object sender, BizAPP.Runtime.Core.SavingEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnGenericFieldValueInitializeEventHandler(  System.Object sender, BizAPP.Runtime.Core.FieldValueInitializeEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnGenericFieldValueChangingEventHandler(  System.Object sender, BizAPP.Runtime.Core.FieldValueChangeEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnGenericFieldValueChangedEventHandler(  System.Object sender, BizAPP.Runtime.Core.FieldValueChangeEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnGenericFieldValueValidateEventHandler(  System.Object sender, BizAPP.Runtime.Core.FieldValueValidateEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnGenericFieldValueBehaviorEventHandler(  System.Object sender, BizAPP.Runtime.Core.FieldValueBehaviorEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnGenericFieldValueAllowedValuesEventHandler(  System.Object sender, BizAPP.Runtime.Core.FieldValueAllowedValuesEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnGenericFieldValueAllowedLinkTypesEventHandler(  System.Object sender, BizAPP.Runtime.Core.FieldValueAllowedLinkTypesEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnGenericVirtualFieldSetValue(  System.Object sender, BizAPP.Runtime.Core.VirtualFieldSetValueEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnMessage(  System.Object sender, BizAPP.Runtime.Core.ObjectMessageEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void OnGenericVirtualFieldGetValue(  System.Object sender, BizAPP.Runtime.Core.VirtualFieldGetValueEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected virtual void InitializeAvailableEvents(  )
		{
throw new System.NotImplementedException( );
		}

protected internal System.Boolean UseAvailableEvents
{
get {throw new System.NotImplementedException( );}
set {;} 
}
protected internal System.Collections.BitArray AvailableEvents
{
get {throw new System.NotImplementedException( );}}
		protected internal RuntimeObjectEventHandler(  )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	public abstract partial class RuntimeObjectOperationsHandler
	{
		public virtual System.Object OnGenericOperation(  System.Object sender, System.String operation,params  System.Object[] args )
		{
throw new System.NotImplementedException( );
		}

		protected internal RuntimeObjectOperationsHandler(  )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	public abstract partial class RuntimeObjectMessagesHandler
	{
		public virtual void ProcessGenericMessage(  System.Object sender, BizAPP.Runtime.Core.MessageEventArgs args )
		{
throw new System.NotImplementedException( );
		}

		protected internal RuntimeObjectMessagesHandler(  )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public partial class RuntimeObjectLinksDataTable
	{
public const System.String COLUMN_ORDER = @"order";
public const System.String COLUMN_CHILD = @"child";
public const System.String COLUMN_PARENT = @"parent";
public const System.String COLUMN_CHILDVERSION = @"childversion";
public const System.String COLUMN_PARENTVERSION = @"parentversion";
public const System.String COLUMN_PARENTTYPEID = @"parenttypeid";
public const System.String COLUMN_CHILDTYPEID = @"childtypeid";
public const System.String COLUMN_CHILDOLDID = @"childoldid";
public const System.String COLUMN_RELATIONSHIP = @"relationship";
public const System.String COLUMN_PARENTDISPLAYNAME = @"parentdisplayname";
public const System.String COLUMN_CHILDDISPLAYNAME = @"childdisplayname";
public const System.String COLUMN_ISVIRTUAL = @"isvirtual";
public const System.String COLUMN_PARENTTABLE = @"parenttable";
public const System.String COLUMN_CHILDTABLE = @"childtable";
public const System.String COLUMN_TIMESTAMP = @"timestamp";
public const System.String COLUMN_OPERATION = @"operation";
public const System.String COLUMN_CURRENTSTATE = @"currentstate";
public const System.String COLUMN_ANCHORVERSION = @"anchorversion";
public const System.String COLUMN_TENANTID = @"tid";
		public RuntimeObjectLinksDataTable(  )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public abstract partial class RuntimeObjectManager : BizAPP.Runtime.Core.IRuntimeObjectManager
	{
protected const System.Data.DataViewRowState VIEWFILTER_ALL_RELATIONSHIPS = System.Data.DataViewRowState.Deleted|System.Data.DataViewRowState. CurrentRows;
internal const System.String ENTERPRISEID_PREFIX = @"E";
protected BizAPP.Runtime.Core.RuntimeObjectEventHandler m_runtimeObjectEvent;
protected BizAPP.Runtime.Core.RuntimeObjectTypeEventHandler m_runtimeManagerEvent;
protected BizAPP.Runtime.Core.RuntimeObjectOperationsHandler m_runtimeOperations;
protected BizAPP.Runtime.Core.RuntimeObjectEventManager m_eventManager;
protected System.Nullable<System.Boolean> m_isCacheable;
protected BizAPP.Runtime.Core.RuntimeContext m_context;
		public event BizAPP.Runtime.Core.ObjectCanCreateEventHandler ObjectCanCreate;
		public event BizAPP.Runtime.Core.ObjectCreatingEventHandler ObjectCreating;
		public event BizAPP.Runtime.Core.ObjectCreatedEventHandler ObjectCreated;
		public event BizAPP.Runtime.Core.ExternalConnectionHandler ExtConnectionHandler;
		public event BizAPP.Runtime.Core.ObjectClonedEventHandler ObjectCloned;
		public event BizAPP.Runtime.Core.ObjectAccessedEventHandler ObjectAccessed;
		public event BizAPP.Runtime.Core.ObjectNotFoundEventHandler ObjectNotFound;
		public event BizAPP.Runtime.Core.CreateNewIdEventHandler CreateNewId;
		public System.Type GetObjectType(  )
		{
throw new System.NotImplementedException( );
		}

		protected virtual System.String GetObjectTypeId(  )
		{
throw new System.NotImplementedException( );
		}

		protected System.String GetBusinessModuleId(  )
		{
throw new System.NotImplementedException( );
		}

		protected void FillByPublicFieldsFromDb(  System.Object filterFields, System.Int32 version, System.Collections.Generic.List<System.String> objectIds, System.Collections.Generic.List<System.String> displayNames, System.Collections.Generic.List<System.String> objectTypeIds, System.Collections.Generic.List<System.Int32> versions, BizAPP.Runtime.Core.IRuntimeObject contextObject, BizAPP.Runtime.Core.ISoftTransaction trans )
		{
throw new System.NotImplementedException( );
		}

		protected System.Collections.Generic.IDictionary<System.String,System.Object> FillByUniqueIdFromDb(  BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dos, System.String uniqueId, System.Boolean isDeleted )
		{
throw new System.NotImplementedException( );
		}

		protected System.Collections.Generic.IDictionary<System.String,System.Object> FillByUniqueIdAndVersionFromDb(  BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dos, System.String uniqueId, System.Int32 version )
		{
throw new System.NotImplementedException( );
		}

		public BizAPP.Runtime.Core.IRuntimeObject GetRuntimeObjectByDisplayname(  System.String objectId, System.String displayname )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.IRuntimeObject GetRuntimeObject(  System.String objectId, System.String uniqueId )
		{
throw new System.NotImplementedException( );
		}

		protected virtual System.Collections.Generic.List<System.String> GetObjectTypeIds(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal abstract BizAPP.Runtime.Core.Framework.DataSource.ObjectAdapter GetAdapter(  BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dbs = null );
		protected internal abstract BizAPP.Runtime.Core.Framework.DataSource.ObjectPropertiesAdapter GetPropertiesAdapter(  BizAPP.Runtime.Core.IRuntimeObjectPropertyCollection props = null );
		protected internal abstract BizAPP.Runtime.Core.Framework.DataSource.LinksCollectionDataAdapter GetLinksAdapter(  BizAPP.Runtime.Core.RuntimeObjectLinksCollection links = null );
		protected internal virtual void CanCreateObjects(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Int32 BeginSave(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dbs, System.Collections.Hashtable saveState )
		{
throw new System.NotImplementedException( );
		}

		protected internal void EndSave(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dbs, System.Collections.Hashtable saveState )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Int32 SaveObject(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dbs, System.Collections.Hashtable saveState )
		{
throw new System.NotImplementedException( );
		}

		protected internal void SaveRelated(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dbs, System.Collections.Hashtable saveState )
		{
throw new System.NotImplementedException( );
		}

		protected internal void FireContentIndex(  BizAPP.Runtime.Core.RuntimeObject ro, System.Collections.Hashtable saveState )
		{
throw new System.NotImplementedException( );
		}

		protected internal void FireObjectMessage(  BizAPP.Runtime.Core.RuntimeObject ro, System.Collections.Hashtable saveState )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Int32 SaveSingleObjectProperties(  BizAPP.Runtime.Core.RuntimeObject ro )
		{
throw new System.NotImplementedException( );
		}

		protected internal void SaveComplete(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dos, System.Collections.Hashtable savedState )
		{
throw new System.NotImplementedException( );
		}

		protected internal void AbortSave(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dos, System.Collections.Hashtable saveState )
		{
throw new System.NotImplementedException( );
		}

		protected internal void CancelAllEdit(  BizAPP.Runtime.Core.RuntimeObject ro, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dos, System.Boolean tobeDeleted )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.RuntimeObjectEventManager InitializeEventManager(  )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.RuntimeObjectEventHandler InitializeEventHandler(  )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.RuntimeObjectTypeEventHandler InitializeManagerEventHandler(  )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.RuntimeObjectOperationsHandler InitializeOperationsEventHandler(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean GetLockStatus(  BizAPP.Runtime.Core.RuntimeObject ro,out System.String lockedBy,out System.Nullable<System.DateTime> lastLockedOn,out System.Boolean isVirtual )
		{
throw new System.NotImplementedException( );
		}

		protected internal void LockObject(  BizAPP.Runtime.Core.RuntimeObject ro, System.Boolean locked, System.Int32 lookupVersion )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Boolean LockObject(  BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dos, BizAPP.Runtime.Core.RuntimeObject ro, System.Boolean locked, System.Int32 lookupVersion, System.Boolean checkForLockStatus = true )
		{
throw new System.NotImplementedException( );
		}

		protected internal void IsObjectUnique(  BizAPP.Runtime.Core.RuntimeObject ro, System.String txId, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dos )
		{
throw new System.NotImplementedException( );
		}

		System.Data.IDataReader BizAPP.Runtime.Core.IRuntimeObjectManager.GetSearchLinksReader(  BizAPP.Runtime.Core.BizAPPDataColumn adc, BizAPP.Runtime.Core.QueryOptions qryOptions )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObjectManager.GetLinksReader(  System.String fieldName, System.String runtimeObjectId, System.String queryDisplayName, System.Int32 version )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Data.DataTable InternalGetLinksReader(  System.String runtimeObjectId, BizAPP.Runtime.Core.BizAPPDataColumn linkField, System.String queryDisplayName, System.Int32 version, System.Array linkFieldUniqueIds )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Data.DataTable InternalGetLinksReader(  System.String runtimeObjectId, BizAPP.Runtime.Core.BizAPPDataColumn linkField, BizAPP.Common.Query.QueryObject linkedObjQuery, System.Int32 version, System.Array linkFieldUniqueIds )
		{
throw new System.NotImplementedException( );
		}

		public System.Data.IDataReader GetVersionsReader(  System.String runtimeObjectId )
		{
throw new System.NotImplementedException( );
		}

		protected internal System.Data.IDataReader InternalGetVersionsReader(  System.String runtimeObjectId )
		{
throw new System.NotImplementedException( );
		}

		protected virtual BizAPP.Runtime.Core.RuntimeObjectWorkflow GetObjectWorkflow(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.RuntimeObjectWorkflow GetWorkflow(  )
		{
throw new System.NotImplementedException( );
		}

		System.Collections.Generic.IDictionary<System.String,BizAPP.Runtime.Core.BizAPPDataColumn> BizAPP.Runtime.Core.IRuntimeObjectManager.GetFieldsMetadata(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual BizAPP.Runtime.Core.RuntimeObject NewObjectFromDataRow(  System.Data.DataRow dr )
		{
throw new System.NotImplementedException( );
		}

		void System.IDisposable.Dispose(  )
		{
throw new System.NotImplementedException( );
		}

		protected internal void Initialize(  BizAPP.Runtime.Core.Service.Metadata.MetadataInfo minfo )
		{
throw new System.NotImplementedException( );
		}

		protected internal void Initialize(  BizAPP.Runtime.Core.RuntimeObject ro )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.CanCreate(  BizAPP.Runtime.Core.IRuntimeObject contextObject, System.String contextTypeId, System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.CanCreate(  BizAPP.Runtime.Core.IRuntimeObject contextObject, System.String contextTypeId,out System.String disallowReason, System.Object[] arguments )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObjectManager.GetNewObjectsTable(  BizAPP.Common.Query.QueryObject qryObject )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectManager.GetObject(  System.String uniqueId, System.Boolean isDeleted, System.Boolean ignoreRedirection )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectManager.LoadFromDraft(  System.String uniqueId, System.Int32 version, System.String scope )
		{
throw new System.NotImplementedException( );
		}

		System.Int32 BizAPP.Runtime.Core.IRuntimeObjectManager.GetDraftVersion(  System.String uniqueId, System.String scope, System.String transactionName, BizAPP.Runtime.Core.ISoftTransaction transaction )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectManager.GetObjectVersion(  System.String uniqueId, System.Int32 version )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectManager.GetObjectVersion(  System.String uniqueId, System.String tag )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectManager.CreateObjectUsingProcess(  BizAPP.Runtime.Core.IRuntimeObject processTrace, System.Boolean virtualInstance, System.Boolean forimport, BizAPP.Runtime.Core.ISoftTransaction tx, BizAPP.Runtime.Core.IRuntimeObject contextObject, System.String contextTypeId,params  System.Object[] idparameters )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectManager.CreateObject(  System.Boolean virtualInstance, System.Boolean forimport, BizAPP.Runtime.Core.ISoftTransaction tx, System.String startState, BizAPP.Runtime.Core.IRuntimeObject contextObject, System.String contextTypeId,params  System.Object[] idparameters )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject[] BizAPP.Runtime.Core.IRuntimeObjectManager.CreateObjects(  System.Boolean virtualInstance, System.Boolean forimport, System.Int32 objectCount, BizAPP.Runtime.Core.ISoftTransaction tx, BizAPP.Runtime.Core.IRuntimeObject contextObject, System.String contextTypeId,params  System.Object[] idparameters )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObjectCollection BizAPP.Runtime.Core.IRuntimeObjectManager.GetObjectsByPublicFields(  System.Object publicFieldsAndValues, System.Int32 version, BizAPP.Runtime.Core.IRuntimeObject contextObject, System.Boolean returnFirstObject )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectManager.GetObjectByDisplayName(  System.String displayName, System.Int32 version )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectManager.GetObjectByDisplayName(  System.String displayName, System.Int32 version, BizAPP.Runtime.Core.ISoftTransaction trans )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.IRuntimeObject BizAPP.Runtime.Core.IRuntimeObjectManager.GetObjectByEnterpriseId(  System.String enterpriseId, System.Int32 version, System.Boolean ignoreRedirection )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.RuntimeObjectWorkflow BizAPP.Runtime.Core.IRuntimeObjectManager.GetWorkflow(  )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.BizAPPDataColumn[] BizAPP.Runtime.Core.IRuntimeObjectManager.GetFieldMetadata(  System.String[] fieldNames )
		{
throw new System.NotImplementedException( );
		}

		BizAPP.Runtime.Core.BizAPPDataColumn BizAPP.Runtime.Core.IRuntimeObjectManager.GetFieldMetadata(  System.String fieldName )
		{
throw new System.NotImplementedException( );
		}

		public BizAPP.Runtime.Core.CompressedByteArray GetImage(  BizAPP.Runtime.Core.ImageType imageType )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObjectManager.GetResourceId(  BizAPP.Runtime.Core.ImageType imageType )
		{
throw new System.NotImplementedException( );
		}

		System.String BizAPP.Runtime.Core.IRuntimeObjectManager.GenerateDiff(  System.String uniqueId, System.Int32 sourceVersion, System.Int32 targetVersion )
		{
throw new System.NotImplementedException( );
		}

		System.Data.DataTable BizAPP.Runtime.Core.IRuntimeObjectManager.GenerateDiff(  System.String uniqueId, System.Int32 sourceVersion, System.Int32 targetVersion, System.String field, BizAPP.Common.Query.QueryObject fieldQuery )
		{
throw new System.NotImplementedException( );
		}

		public System.Int32 Upload(  BizAPP.Runtime.Core.RuntimeObject attachment, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dbs, System.IO.Stream inStream )
		{
throw new System.NotImplementedException( );
		}

		public System.Int32 Upload(  BizAPP.Runtime.Core.RuntimeObject attachment, BizAPP.Runtime.Core.Service.Database.IDatabaseOperationSet dbs, System.Boolean useFileStream, System.IO.Stream inStream )
		{
throw new System.NotImplementedException( );
		}

		public System.Int32 Download(  System.String blobId, System.IO.Stream output )
		{
throw new System.NotImplementedException( );
		}

		public System.Int32 Download(  System.String blobId, System.Boolean useFileStream, System.IO.Stream output )
		{
throw new System.NotImplementedException( );
		}

		protected internal virtual System.Boolean InternalCanCreate(  BizAPP.Runtime.Core.IRuntimeObject contextObject, System.String contextTypeId, System.Object[] arguments, System.Collections.Generic.IList<System.String> overriddenRequiredResponsibilities, System.Boolean throwException,out System.String disallowReason )
		{
throw new System.NotImplementedException( );
		}

System.String BizAPP.Runtime.Core.IRuntimeObjectManager.ObjectType
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObjectManager.ObjectTypes
{
get {throw new System.NotImplementedException( );}}
System.String[] BizAPP.Runtime.Core.IRuntimeObjectManager.FieldCodes
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.ObjectTypeId
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObjectManager.ObjectTypeIds
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObjectManager.InheritingObjectTypeIds
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.InternalName
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.IsCodeLibrary
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.DefaultView
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.DefaultMobileView
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.DefaultForm
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.DefaultQuickCreateForm
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.DefaultQuery
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.DefaultProcess
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.PluralName
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.RedirectedToTypeId
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.Label
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.Extends
{
get {throw new System.NotImplementedException( );}}
System.String BizAPP.Runtime.Core.IRuntimeObjectManager.Hierarchy
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.IsVirtual
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.IsExternal
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.IsAbstract
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.IsAuditable
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.IsQueryable
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.HasProperties
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.HasMessages
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.ExcludeFromCleanup
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.ShowInRecentItems
{
get {throw new System.NotImplementedException( );}}
System.Nullable<BizAPP.Common.Database.Query.CompressionMode> BizAPP.Runtime.Core.IRuntimeObjectManager.CompressionMode
{
get {throw new System.NotImplementedException( );}}
System.Collections.Generic.IEnumerable<System.String> BizAPP.Runtime.Core.IRuntimeObjectManager.EditResponsibilities
{
get {throw new System.NotImplementedException( );}}
System.Boolean BizAPP.Runtime.Core.IRuntimeObjectManager.HasVersions
{
get {throw new System.NotImplementedException( );}}
protected virtual System.String IdGeneratorProvider
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.ExternalDataSourceProviderInfo ExternalDataSourceProviderInfo
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsVirtual
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsExternal
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsInternal
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean CreateWhenNotFound
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean DownloadExternalWhenNotFound
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsAuditable
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsDetailAuditEnabled
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsQueryable
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsDelegatable
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsDraftable
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean PostStepsAsMessage
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsPromotable
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean HasProperties
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean HasMessages
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean ExcludeFromCleanup
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean ShowInRecentItems
{
get {throw new System.NotImplementedException( );}}
protected internal System.Nullable<BizAPP.Common.Database.Query.CompressionMode> CompressionMode
{
get {throw new System.NotImplementedException( );}}
protected internal System.Collections.Generic.ICollection<System.String> EditResponsibilities
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean HasVersions
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean HasChangeComments
{
get {throw new System.NotImplementedException( );}}
protected internal System.String EnableChangeCommentsExpression
{
get {throw new System.NotImplementedException( );}}
protected internal System.String ChangeCommentsField
{
get {throw new System.NotImplementedException( );}}
protected internal System.String ChangeCommentsViewId
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean HasDynamicValidations
{
get {throw new System.NotImplementedException( );}}
protected internal System.String EnableDynamicValidationsExpression
{
get {throw new System.NotImplementedException( );}}
protected internal System.String DynamicValidationContextExpression
{
get {throw new System.NotImplementedException( );}}
protected internal System.String CreateNewManualEditCheckMapperId
{
get {throw new System.NotImplementedException( );}}
protected internal System.String DynamicValidationAuditProcessId
{
get {throw new System.NotImplementedException( );}}
protected internal System.String EditCheckFailureTypeId
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsDisplayNameUnique
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean TruncateDisplayName
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IgnoreInmemoryOrUnsavedInstances
{
get {throw new System.NotImplementedException( );}}
protected internal System.String DisplayNameErrorFormat
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean HasGlobalLinks
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean OptimisticLock
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean NoLock
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsAbstract
{
get {throw new System.NotImplementedException( );}}
protected internal System.Boolean IsSealed
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.RuntimeContext Context
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.RuntimeObjectMetadata PrimaryMetadata
{
get {throw new System.NotImplementedException( );}}
protected internal BizAPP.Runtime.Core.RuntimeObjectMetadata PrimaryVersionMetadata
{
get {throw new System.NotImplementedException( );}}
		protected RuntimeObjectManager(  BizAPP.Runtime.Core.RuntimeContext context )
		{}
public RuntimeObjectManager( ){}
	}
}
namespace BizAPP.Runtime.Core
{
public delegate void DelayLoad(  System.String uniqueId, System.Int32 version );
}
namespace BizAPP.Runtime.Core
{
public delegate System.Collections.Generic.IDictionary<System.String,System.Collections.Generic.IList<BizAPP.Runtime.Core.IRuntimeObjectProperty>> PropertyLoad(  BizAPP.Runtime.Core.RuntimeObject ro );
}
namespace BizAPP.Runtime.Core
{
	public abstract partial class RuntimeObjectWebService : System.Web.Services.WebService,System.ComponentModel.IComponent,System.IServiceProvider
	{
public BizAPP.Runtime.Core.SessionCookieHeader SessionCookie;
		public event System.EventHandler Disposed;
		protected internal BizAPP.Runtime.Core.RuntimeClientObject[] GetAllObjects(  System.String objectName )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.RuntimeClientObject[] GetAllMyObjects(  System.String objectName )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.RuntimeClientObject GetObject(  System.String objectName, System.String uid )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.RuntimeClientObject GetObjectWithDisplayName(  System.String objectName, System.String displayName )
		{
throw new System.NotImplementedException( );
		}

		protected internal BizAPP.Runtime.Core.RuntimeClientObject[] UpdateObjects(  BizAPP.Runtime.Core.RuntimeClientObject[] objects, System.Boolean needSave )
		{
throw new System.NotImplementedException( );
		}

		protected internal void ThrowIfSessionCookieIsInvalid(  )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.Service.Session.IRuntimeSession GetSession(  BizAPP.Runtime.Core.SessionCookieHeader cookieHeader, System.Boolean throwException )
		{
throw new System.NotImplementedException( );
		}

		protected BizAPP.Runtime.Core.Service.Session.IRuntimeSession GetSession(  System.String cookie, System.Boolean throwException )
		{
throw new System.NotImplementedException( );
		}

protected internal BizAPP.Runtime.Core.Service.Session.IRuntimeSession RuntimeSession
{
get {throw new System.NotImplementedException( );}}
protected abstract System.String ObjectName
{
get;}
		protected RuntimeObjectWebService(  )
		{}

	}
}
namespace BizAPP.Runtime.Core
{
	[System.Serializable]
public sealed class RuntimeObjectRow : BizAPP.Runtime.Core.BaseMarshalByValueObject,BizAPP.Runtime.Core.IDisposableEx,System.Runtime.Serialization.ISerializable,BizAPP.Runtime.Core.IRuntimeObjectRow
	{
		void System.Runtime.Serialization.ISerializable.GetObjectData(  System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context )
		{
throw new System.NotImplementedException( );
		}

		protected override void Dispose(  System.Boolean disposing )
		{
throw new System.NotImplementedException( );
		}

		public T Get<T>(  System.String dbColumnName )
		{
throw new System.NotImplementedException( );
		}

		public System.Boolean HasVersion(  System.Data.DataRowVersion dataRowVersion )
		{
throw new System.NotImplementedException( );
		}

		public System.Boolean HasVersion(  System.String dbColumnName, System.Data.DataRowVersion dataRowVersion )
		{
throw new System.NotImplementedException( );
		}

		public System.Boolean IsNull(  System.String dbColumnName )
		{
throw new System.NotImplementedException( );
		}

		public void AcceptChanges(  )
		{
throw new System.NotImplementedException( );
		}

		public void Delete(  )
		{
throw new System.NotImplementedException( );
		}

		public void RejectChanges(  )
		{
throw new System.NotImplementedException( );
		}

		public System.Boolean HasValue(  System.String dbColumnName )
		{
throw new System.NotImplementedException( );
		}

		public System.Byte[] GetRowHash(  )
		{
throw new System.NotImplementedException( );
		}

		public System.Byte[] GetRowHash(  System.Boolean useCurrentValues )
		{
throw new System.NotImplementedException( );
		}

public System.Object this[ System.String dbColumnName]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Object this[ BizAPP.Runtime.Core.BizAPPDataColumn bdc]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Object this[ System.String dbColumnName, System.Data.DataRowVersion dataRowVersion]
{
get {throw new System.NotImplementedException( );}}
public System.Object this[ System.String dbColumnName, BizAPP.Runtime.Core.DataRowVersionEx dataRowVersionEx]
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public System.Data.DataRowState RowState
{
get {throw new System.NotImplementedException( );}
set {;} 
}
public BizAPP.Runtime.Core.RuntimeObjectRow DraftableRuntimeObjectRow
{
get {throw new System.NotImplementedException( );}}
public System.Int32 Version
{
get {throw new System.NotImplementedException( );}}
public System.Boolean HasVirtualEditedFieldsInNonEditableMode
{
get {throw new System.NotImplementedException( );}
set {;} 
}
		public RuntimeObjectRow(  )
		{}
		public RuntimeObjectRow(  BizAPP.Runtime.Core.RuntimeObjectManager rom, BizAPP.Runtime.Core.RuntimeObjectMetadata metadata, System.Collections.Generic.IDictionary<System.String,System.Object> fieldValues, System.Boolean isNew )
		{}
		public RuntimeObjectRow(  BizAPP.Runtime.Core.RuntimeObjectManager rom, BizAPP.Runtime.Core.RuntimeObjectMetadata metadata, System.Collections.Generic.IDictionary<System.String,System.Object> fieldValues )
		{}

	}
}
