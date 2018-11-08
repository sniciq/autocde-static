AjaxSubGrid = function(config, previewURL) {
	AjaxSubGrid.superclass.constructor.call(this, config, previewURL);
	this.previewURL = previewURL;
	this.enableCaching = false;
}

Ext.extend(AjaxSubGrid, Ext.grid.RowExpander, {
	getBodyContent: function(record, index) {
		var body = '<div id="gridRowDiv_' + record.id + '">Loading...</div>';
		Ext.Ajax.request({
			url: this.previewURL + record.id,
			disableCaching: true,
			success: function(response, options) {
				Ext.getDom('gridRowDiv_' + options.objId).innerHTML = '';
				
				var retobj=Ext.util.JSON.decode(response.responseText);
				
				retobj.dsName = new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({url: '../basic/ResourcesAction/search.action'}),
					remoteSort: false,
					reader: new Ext.data.JsonReader(
						{
							totalProperty: 'total',
							idProperty:'id',
							root: 'data'
						},
						[
							{name: 'id'},
							{name: 'nodeId'},
							{name: 'menuName'},
							{name: 'parantNodeID'},
							{name: 'icon'},
							{name: 'openIcon'},
							{name: 'actionPath'},
							{name: 'jsClassFile'},
							{name: 'menuOrder'},
							{name: 'isValiDate'},
							{name: 'description'}
						]
					)
				});
				
				retobj.cmName = new Ext.grid.ColumnModel([
					{header:'节点ID', dataIndex:'nodeId', sortable:true},
					{header:'菜单名称', dataIndex:'menuName', sortable:true},
					{header:'父节点ID', dataIndex:'parantNodeID', sortable:true},
					{header:'图标', dataIndex:'icon', sortable:true},
					{header:'路径', dataIndex:'actionPath', sortable:true},
					{header:'jsClassFile', dataIndex:'jsClassFile', sortable:true},
					{header:'排序号', dataIndex:'menuOrder', sortable:true},
					{header:'是否可用', dataIndex:'isValiDate', sortable:true},
					{header:'描述', dataIndex:'description', sortable:true}
				]);
				
				retobj.gridName = new Ext.grid.GridPanel({
					height: 200,
					ds: retobj.dsName,
					cm: retobj.cmName
				});
				
				retobj.dsName.load();
				retobj.gridName.render('gridRowDiv_' + options.objId);
				
				//Ext.getDom('gridRowDiv_' + options.objId).innerHTML = response.responseText;
			},
			failure: function(error) {
            },
            objId: record.id
		});
		return body;
	},
	beforeExpand : function(record, body, rowIndex){
		if(this.fireEvent('beforeexpand', this, record, body, rowIndex) !== false){
            body.innerHTML = this.getBodyContent(record, rowIndex);
            return true;
        } else{
            return false;
        }
	}
});