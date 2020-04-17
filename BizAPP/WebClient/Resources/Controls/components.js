let vueGrid = Vue.component('vueGrid', {
  template: `
    <span class="span60">
      <div class="input-group theme1">
        <span v-if="!editing" class="text_node" @click="enableEditing">
          <span style="width:80%">{{field.data.text}}</span>
          <span class="pull-right"><a class="i_edit" @click="enableEditing">&nbsp;<i class="fa fa-pencil"></i>&nbsp;</a></span>
        </span>
        <div v-else> 
          <input v-model="tempValue" class="input" autofocus="true" v-on:keyup.enter="saveEdit()" style="width:80%;"/>
          <span class="ibtn_container right">
            <a class="i_ok" @click="saveEdit"><span><i class="fa fa-check"></i></span></a>
            <a class="i_cancel" @click="disableEditing"><span><i class="fa fa-times"></i></span></a>
          </span>
        </div>
      </div>
    </span>`,
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tempValue: null,
      editing: false
    }
  },
  methods: {  
    enableEditing: function(){
      this.tempValue = this.field.data.text;
      this.editing = true;
    },
    disableEditing: function(){
      this.tempValue = null;
      this.editing = false;
    },
    saveEdit: function(){
      this.field.data.text = this.tempValue;
      this.disableEditing();
    }
  }
});

let EditableText = Vue.component('editableText', {
  template: `
    <span class="span60">
      <div class="input-group theme1">
        <span v-if="!editing" class="text_node" @click="enableEditing">
          <span style="width:80%">{{field.data.text}}</span>
          <span class="pull-right"><a class="i_edit" @click="enableEditing">&nbsp;<i class="fa fa-pencil"></i>&nbsp;</a></span>
        </span>
        <div v-else> 
          <input v-model="tempValue" class="input" autofocus="true" v-on:keyup.enter="saveEdit()" style="width:80%;"/>
          <span class="ibtn_container right">
            <a class="i_ok" @click="saveEdit"><span><i class="fa fa-check"></i></span></a>
            <a class="i_cancel" @click="disableEditing"><span><i class="fa fa-times"></i></span></a>
          </span>
        </div>
      </div>
    </span>`,
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tempValue: null,
      editing: false
    }
  },
  methods: {  
    enableEditing: function(){
      this.tempValue = this.field.data.text;
      this.editing = true;
    },
    disableEditing: function(){
      this.tempValue = null;
      this.editing = false;
    },
    saveEdit: function(){
      this.field.data.text = this.tempValue;
      this.disableEditing();
    }
  }
});

let filterTypeMaster = {
  contains: {text: 'Contains', className: 'fa fa-plus-square', operatorValue: 'Contains', needsInput: true},
  doesNotContain: {text: 'Does not contain', className: 'fa fa-square', needsInput: true},
  isNull: {text: 'Is Null', className: 'fa fa-ban', operatorValue: 'ISNULL', needsInput: false},
  isNotNull: {text: 'Is Not Null', className: 'fa fa-check-circle', needsInput: false},
  startsWith: {text: 'Starts With', className: 'fa fa-arrow-right', operatorValue: 'StartsWith', needsInput: true},
  endsWith: {text: 'Ends With', className: 'fa fa-arrow-left', operatorValue: 'EndsWith', needsInput: true},
	equals: {text: 'Equals', className: 'fas fa-equals', operatorValue: '=', needsInput: true},
	notEqualTo: {text: 'Not Equal To', className: 'fas fa-not-equal', operatorValue: '!', needsInput: true},
  greaterThan: {text: 'Greater Than', className: 'fas fa-greater-than', operatorValue: '>', needsInput: true},
	lessThan: {text: 'Less Than', className: 'fas fa-less-than', operatorValue: '<', needsInput: true},
	greaterThanOrEqual: {text: 'Greater Than', className: 'fas fa-greater-than', operatorValue: '>=', needsInput: true},
	lessThanOrEqual: {text: 'Less Than', className: 'fas fa-less-than', operatorValue: '<=', needsInput: true},
  isTrue: {text: 'Is True', className: 'fa fa-plus-square', needsInput: false},
  isFalse: {text: 'Is False', className: 'fa fa-plus-square', needsInput: false},
  before: {text: 'Before', className: 'fa fa-plus-square', operatorValue: '<', needsInput: true},
  after: {text: 'After', className: 'fa fa-plus-square', operatorValue: '>', needsInput: true},
  beforeOrEqual: {text: 'Before', className: 'fa fa-plus-square', operatorValue: '<=', needsInput: true},
  afterOrEqual: {text: 'After', className: 'fa fa-plus-square', operatorValue: '>=', needsInput: true},
  today: {text: 'Today', className: 'fa fa-plus-square', needsInput: false},
  last30Days: {text: 'Last 30 Days', className: 'fa fa-plus-square', needsInput: false},
  lastWeek: {text: 'Last Week', className: 'fa fa-plus-square', needsInput: false},
  lastQuarter: {text: 'Quarter To Date', className: 'fa fa-plus-square', needsInput: false},
  lastYear: {text: 'Year To Date', className: 'fa fa-plus-square', needsInput: false},
  customDateRange: 'Custom'
};

let filterOptions = {
  'text' : ['contains',/*'doesNotContain',*/'isNull', /*'isNotNull',*/ 'startsWith', 'endsWith','equals', 'notEqualTo'],
  'number' : ['equals', 'notEqualTo',  'greaterThan', 'lessThan'],
  'boolean' : [/*'isTrue', 'isFalse',*/ 'equals', 'notEqualTo'],
  'date' : ['before', 'after', 'today', 'last30Days', 'lastWeek', 'lastQuarter', 'lastYear', 'customDateRange']
};

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

var BizappComponents = BizappComponents || {};
// Common Functions
var BizappComponentsCommon = BizappComponents.Common || {};

BizappComponentsCommon.copyMissingProperties = function (targetObject, referenceObject) {
	if (!targetObject) {
		targetObject = {};
	}

	if (referenceObject) {
		for (var key in referenceObject) {
			if (!targetObject.hasOwnProperty(key)) {
				var propValue = referenceObject[key];
				if (!Array.isArray(propValue)) {
					targetObject[key] = propValue;
				}
				else {
					targetObject[key] = propValue.slice();
				}
			}
		}
	}
	return targetObject;
};

// Design
BizappComponentsCommon.getMergedDataModal = function (customProps, defaultProps) {
	BizappComponentsCommon.copyMissingProperties(customProps, defaultProps);
	return customProps;
}

var BizappTree = BizappComponents.Tree || {};
var BizappGridFilter = BizappComponents.BizappGridFilter || {};
BizappTree.DEFAULT_PROPS = {
  treeData: [],
  treeFilter: '',
  fetchUrl: '',
  rootObjectId: '',
  systemFields: [],
  selectedNodes: [],
  showSystemFields: false,
  treeOptions: {
    multiple: true,
    checkbox: true,
    checkOnSelect: false,
    parentSelect: true,
    autoCheckChildren: false
  }
};

BizappGridFilter.DEFAULT_PROPS = {
  filterTypeMaster: filterTypeMaster,
  filterOptions: filterOptions
};

// Templates - Designer and Viewer
var BizappComponents = {
  vueCustomTree: null,
  vueCustomGridFilter: null,

	initComponents: function () {
		BizappComponents.vueCustomTree = Vue.extend({
			template: `<div><div class="navigation-filter" style="width: 100%; position: absolute;padding: 10px;">
        <input type="text" v-model="treeFilter" placeholder="Type to search..." v-on:keyup="matchNodesInTree()" style="height: 35px; padding: 3px 6px; width: 100%;" >
      </div>
      <div class="navigation-tree" v-if="!_.isEmpty(treeData)" style="top: 60px;position: absolute; height: calc(100% - 110px);overflow: auto;width: 100%;border-top: 1px solid #ccc;padding: 10px;border-bottom: 1px solid rgb(204, 204, 204);">
        <tree :data="treeData" :options="treeOptions" @node:expanded="onNodeExpanded" ref="fieldPicker">
          <div class="tree-scope" slot-scope="{ node }">
            <template>
              <span class="text_node" v-if="!node.checked()" :class="{disabled: node.data.isSystemField}">
                {{ node.text }} 
              </span>
              <editable-text :field="node" v-else></editable-text>
            </template>
          </div>
        </tree>
      </div>
      <div class="navigation-filter" style="width: 100%; position: absolute;bottom:0;height:50px;">
      <div class="row" style="display: table;margin: 0 auto;margin-top: 10px;">
      <div class="col-md-6"><a class="btn btn-secondary" role="button" @click="onCompleteSrc(true)">Cancel</a></div>
      <div class="col-md-6"><a class="btn btn-primary" role="button" @click="onCompleteSrc()">Apply</a></div></div></div></div>`,
      mounted: function () {
        var self = this;
        // Remove later
        //this.fetchUrl = 'http://www.mocky.io/v2/5bd04a1f3100005c00afcced'
        this.fetchUrl = 'testData.json'
        this.getTreeData(this.rootObjectId, function(data) {
          self.treeData = self.parseJSONResponse(data);
          //self.setCheckedNodes();
        });
      },

      methods: {
        getTreeData(objectId, cb) {
          var self = this
          if(this.dataSrc) {
            this.dataSrc(objectId, function(data) {
              if (cb) cb(data)
            })
          } else if (this.fetchUrl !== '' && _.isEmpty(this.treeData)) {
            /*fetch(this.fetchUrl)
              .then(tData => tData.json())
              .then(data => {
                console.log('333333333')
                if (cb) cb(data)
              })
              .catch(e => console.log(e))*/
          }
        },

        _isIgnoredField(obj) {
          var ignoredFields = ['IsVirtual', "IsDeprecated"];
          var isIgnored = false
          _.each(ignoredFields, function(field) {
            if(obj[field] === true || obj[field] === 'true') {
              isIgnored = true
              return false
            }
          })
          return isIgnored
        },

        parseJSONResponse(treeJSON, parentNode) {
          var treeObj = [];
          var self = this
          var treeNodeKeys = _.sortBy(_.keys(treeJSON), function(item) {
            return String(item).toLowerCase();
          });
          // console.log('Tree json', treeNodeKeys)
          _.each(treeNodeKeys, function(key) {
            var obj = treeJSON[key]
            if (obj) {
              var nodeObj = {};
              if (!self._isIgnoredField(obj)) {
                var evaluatedKey = key
                if (parentNode) {
                  evaluatedKey = parentNode.data.key + '.' + key
                }
                if (obj.LinksTo === null || obj.LinksTo === 'null') {
                  if (obj.ColumnLabel === null || obj.ColumnLabel === 'null') {
                    nodeObj = {data: {key:evaluatedKey, isLeaf: true, isSystemField: obj.IsSystem}, text: key, state: obj.state ?? {}}
                  } else {
                    nodeObj = {data: {key:evaluatedKey, isLeaf: true, isSystemField: obj.IsSystem}, text: obj.ColumnLabel, state: obj.state ?? {}}
                  }
                } else {
                  nodeObj = {data: {key:evaluatedKey, isLeaf: false, typeId: obj.LinksTo, isSystemField: obj.IsSystem}, text: key, state: { expanded: false }, children: [{text: 'Loading...'}]}
                }
                nodeObj.data.dataType = obj.DataType;
                if(self.selectedNodes.length && self.selectedNodes.find(n => n.key == evaluatedKey)) {
                }
                else if (self.selectedNodes[nodeObj.key] || self.selectedNodes[nodeObj.text]) {
                }
                else
                  treeObj.push(nodeObj);
              } else {
                // console.log('Ignored Field', key)
              }
            }
          })
          
          if(self.selectedNodes.length){
            $.each(self.selectedNodes,function(i,n){
              treeObj.unshift({data:n, state:{checked:true}})
            })
          }

          return treeObj
        },

        onNodeExpanded(node, cb) {
          var self = this
          // console.log('Expanded', node.data);
          if (node.expanded() === false) {
            node.expand()
          }
          if (node.data.isLeaf === false && !node.data.childrenLoaded) {
            this.getTreeData(node.data.typeId, function(data) {
              node.data.childrenLoaded = true
              var childNodes = self.parseJSONResponse(data, node)
              node.children = []
              _.each(childNodes, function(child, idx) {
                node.append(child)
              })
              if (cb) cb()
            });
          } else {
            console.log('Data was loaded previously')
            // if (cb) cb()
          }
        },

        getCheckedNodes() {
          var checkedNodes = {}
          if(this.$refs.fieldPicker) {
            _.each(this.$refs.fieldPicker.tree.checkedNodes, function(node) { 
              //console.log('Selected Node', node.data.key, node.data.text, node.states.checked)
              // checkedNodes[node.data.key] = node.data.text
              checkedNodes[node.data.key] = node;
            });
          }
          //return this.$refs.fieldPicker.tree.checkedNodes;
          return checkedNodes;
        },

        setCheckedNodes() {
          var self = this;
          if(!_.isEmpty(this.selectedNodes)) {
            _.each(this.selectedNodes, function(nodeName) { 
              self.matchNodeRecursive(nodeName.split('.'))
            });
          }
        },

        matchNodeRecursive(nodeNames, parentNode, parentId) {
          var self = this
          var matchedNode = null
          var treeNodesToMatch = []
          var nodeSearchStr = nodeNames[0]

          if (parentId) {
            treeNodesToMatch = parentNode.children
          } else {
            treeNodesToMatch = this.$refs.fieldPicker.tree.model
          }
          _.each(treeNodesToMatch, function(node) { 
            var isMatch = new RegExp(nodeSearchStr, 'i').test(node.data.text)
            if (isMatch === false) {
              isMatch = new RegExp(nodeSearchStr, 'i').test(node.data.key)
            }
            if (isMatch === true) {
              matchedNode = node
              return false
            }
          });
          // console.log('Find Node name', nodeSearchStr, matchedNode)
          if(matchedNode) {
            if(matchedNode.data.isLeaf === true) {
              self.handleMatchBehavior(nodeSearchStr, matchedNode)
            } else {
              if (nodeNames.length > 1) {
                if (matchedNode.expanded() === false) {
                  self.onNodeExpanded(matchedNode, self.matchNodesInTree);
                } else {
                  nodeNames.shift()
                  self.matchNodeRecursive(nodeNames, matchedNode, matchedNode.id)
                }
              } else {
                self.handleMatchBehavior(nodeSearchStr, matchedNode)
              }
            }
          } else {
            // need to handle on non match?
          }
        },

        _scrollTo(element, to, duration) {
          var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
            
          var animateScroll = function(){        
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
              setTimeout(animateScroll, increment);
            }
          };
          animateScroll();
        },
    
        handleMatchBehavior(nodeSearchStr, matchedNode) {
          // Is absolute match?
          if(matchedNode.data.key.toLowerCase() === nodeSearchStr.toLowerCase() || matchedNode.data.text.toLowerCase() === nodeSearchStr.toLowerCase()) {
            matchedNode.check()
          } else {
            matchedNode.select()
          }
          var topPos = $(matchedNode.vm.$el)[0].offsetTop
          this._scrollTo($('.navigation-tree')[0], topPos-30, 600);  
        },

        matchNodesInTree() {
          var self = this
          if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
          }
          this.timer = setTimeout(() => {
            if(this.treeFilter.length > 0) {
              var nodeNames = this.treeFilter.split('.')
              self.matchNodeRecursive(nodeNames);  
            }
          }, 1000);
        }
		  }
    });

    BizappComponents.vueCustomGridFilter = Vue.extend({
      template: `<div style="position:relative">
        <span class="tableHeader"> {{columnName}} </span>
        <div class="fiterContainer">
          <button type="button" @click="toggleFilterView()" :style="[isFilterValid ? {'background-color' : '#00b400'} : {'background-color' : 'transparent'}]">
            <!--span class="bza-filter-icon filter-icon-visible filter-icon-fa" v-if="selectedFilter == ''"></span>
            <span :class="filterTypeMaster[selectedFilter].className" v-else></span-->
            <span class="bza-filter-icon filter-icon-visible filter-icon-fa"></span>
          </button>
        </div>
        <div class="popUp" v-if="showFilter == true">
          <div class="sortBy" style="z-index:1050">
            <div class="input-group" v-if="dataType != 'date'">
              <div class="input-group-btn dropdown">
                <button type="button" class="btn btn-default filterBtn dropdown-toggle" @click="toggleFilterOptions()" :style="[isFilterValid ? {'background-color' : '#00b400'} : {'background-color' : '#aaa'}]">
                  <span class="glyphicon glyphicon-filter filterIcn" v-if="selectedFilter == ''"></span>
                  <span :class="filterTypeMaster[selectedFilter].className" v-else style="border-color' : '#00b400"></span>
                </button>
                <ul class="filterDD dropdown-menu show" v-if="showFilterOptions == true">
                  <li v-if="selectedFilter != ''"><a @click="clearFilter()"><span class="filterIcn glyphicon glyphicon-trash"></span>Clear Filter</a></li>
                  <li v-for="(item,idx) in filterOptions[dataType]" :key="idx">
                    <a @click="selectFilterType(item)"><span class="filterIcn" :class="filterTypeMaster[item].className"></span>{{filterTypeMaster[item].text}}</a>
                  </li>
                </ul>
              </div>
              <input type="search" style="padding: 6px 6px;" class="searchinput form-control" v-model.trim="filterValue"  
                :placeholder="selectedFilter ? filterTypeMaster[selectedFilter].text : ''" v-on:keyup.enter="setFilter()" :disabled="selectedFilter == '' || showInput == false">
            </div>
            <div v-else>
              <div :id="getIdForControl()" style="display:inline-block;"></div>
              <a v-if="isFilterValid == true" @click="clearFilter()"><span class="filterIcn glyphicon glyphicon-trash" style="right:-10px;"></span></a>
            </div>
          </div>
          <div class="bza-caret bottom"><i></i></div>
          <div class="clearfix"></div>
        </div>
      </div>`,
      data () {
        return {
          isFilterValid: false,
          isFilterSelected: false,
          selectedFilter: '',
          filterValue: '',
          columnName: '',
          showInput: false,
          showFilter: false,
          dateInit: false,
          showFilterOptions: false
        }
      },
      mounted: function () {
        if (this.dataType === 'date') {
          this.showDatePicker()
        }
      },

      methods: {
        toggleFilterView() {
          this.showFilter = !this.showFilter
        },
        toggleFilterOptions() {
          this.showFilterOptions = !this.showFilterOptions;
        },
        selectFilterType(filterObj) {
          this.selectedFilter = filterObj;
          this.showFilterOptions = false;

          if(this.dataType === 'text' || this.dataType === 'number') {
            if (filterObj === 'isNull' || filterObj === 'isNotNull') {
              this.showInput = false;
              this.isFilterValid = true;
              this.onCompleteSrc(this.columnName, filterObj);
            } else {
              this.showInput = true;
            }
          } else if(this.dataType === 'boolean') {
            this.showInput = true;
            // this.onCompleteSrc(this.columnName, filterObj);
          }
        },
        clearFilter() {
          this.isFilterValid = false;
          this.filterValue = '';
          this.selectedFilter = '';
          this.showFilterOptions = false;
          $('#' + this.getIdForControl() + ' span').html('');
          this.onCompleteSrc(this.columnName, null, true);
        },
        setFilter() {
          if (this.filterValue !== '') {
            this.isFilterValid = true;
            this.showFilter = false
            this.onCompleteSrc(this.columnName, filterTypeMaster[this.selectedFilter].operatorValue + ' ' + this.filterValue);
          } else {
            // this.isFilterValid = false;
            this.clearFilter();
          }
        },

        getIdForControl() {
          return 'ctrl' + this.columnName.replace(/\s/g, '');
        },

        setDateFilter(obj) {
          if (this.dateInit === true) {
            this.isFilterValid = true;
            this.onCompleteSrc(this.columnName, obj.startDate + '-' + obj.endDate);
          }
          else {
            this.dateInit = true;
            $('#' + this.getIdForControl() + ' span').html('');
          }
        },

        showDatePicker() {
          var self = this;
          setTimeout(BootstrapV3.DRP.Init({
            control: '#' + self.getIdForControl(),
            callback: self.setDateFilter,
            dtpOptions: { opens: 'left', singleDatePicker: false, startDate: null, endDate: null},
            ignoreRangeAll: true
          }), 100)
        },
      } 
    });
  },
  
};

// Instance - Viewer
var CustomTreeViewer = function CustomTreeViewer(argmap) {
	var containerElementId;
	containerElementId = argmap.containerElementId;

  var model = {}
  model.selectedNodes = argmap.selectedNodes;
  model.dataSrc = argmap.dataSrc;
  model.onCompleteSrc = argmap.onCompleteSrc;
  model.rootObjectId = argmap.rootObjectId;

	if (containerElementId == null || containerElementId == '') {
		throw 'containerElementId has not been specified or is empty';
	}

	var that = this;
	this.containerElementId = containerElementId;
	this.vueCustomTreeViewer = null;
	this.customTreeObj = BizappComponentsCommon.getMergedDataModal(model, BizappTree.DEFAULT_PROPS);

	this.save = function () {
		return that.vueCustomTreeViewer.getCheckedNodes();
  }
  
  this.hide = function () {
    $(containerElementId).hide()
  },

	this.show = function () {
		$(containerElementId).empty();
		var mountPoint = $('<div id="treeContainer" />').appendTo(that.containerElementId)[0];

		that.vueCustomTreeViewer = new BizappComponents.vueCustomTree({
			data: that.customTreeObj,
		}).$mount(mountPoint);
	}

	this.destroy = function () {
		if (that.vueCustomTreeViewer) {
			that.vueCustomTreeViewer.$destroy();
			that.vueCustomTreeViewer = null;
		}
	}
};

var CustomGridFilter = function CustomGridFilter(argmap) {
	var contextObj;
	contextObj = argmap.contextObj;

  var model = {}
  model.dataType = argmap.dataType;
  model.columnName = argmap.columnName;
  //model.selectedFilter = argmap.selectedFilter ? argmap.selectedFilter: {};
  //model.filterValue = argmap.filterValue ? argmap.filterValue: {};
  model.onCompleteSrc = argmap.onCompleteSrc;

	if (!contextObj) {
		throw 'Context Obj has not been specified or is empty';
	}

	var that = this;
	this.contextObj = contextObj;
	this.vueCustomGridFilter = null;
	this.customFilterObj = BizappComponentsCommon.getMergedDataModal(model, BizappGridFilter.DEFAULT_PROPS);

	this.save = function () {
		return that.vueCustomGridFilter.getFilterState();
  }
  
	this.show = function () {
		contextObj.empty();
		var mountPoint = $('<div/>').appendTo(contextObj)[0];

		that.vueCustomGridFilter = new BizappComponents.vueCustomGridFilter({
			data: that.customFilterObj,
		}).$mount(mountPoint);
	}
};

BizappComponents.initComponents();