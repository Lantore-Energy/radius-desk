Ext.define('Rd.view.dynamicDetails.gridDynamicDetails' ,{
    extend      :'Ext.grid.Panel',
    alias       : 'widget.gridDynamicDetails',
    multiSelect : true,
    store       : 'sDynamicDetails',
    stateful    : true,
    stateId     : 'StateGridDynamicDetails',
    stateEvents :['groupclick','columnhide'],
    border      : false,
    requires    : [
        'Rd.view.components.ajaxToolbar',
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
    ],
    plugins     : 'gridfilters',  //*We specify this
    urlMenu     : '/cake4/rd_cake/dynamic-details/menu-for-grid.json',
   
    initComponent: function(){
        var me  = this;
        me.bbar = [{
            xtype       : 'pagingtoolbar',
            store       : me.store,
            displayInfo : true,
            plugins     : {
                'ux-progressbarpager': true
            }
        }];
        me.tbar     = Ext.create('Rd.view.components.ajaxToolbar',{'url': me.urlMenu});

        me.columns  = [
          /*  {xtype: 'rownumberer',stateId: 'StateGridDynamicDetails1'},*/
            { text: 'Item ID',    dataIndex: 'id',     tdCls: 'gridTree', width: 80, filter: {type: 'string'},stateId: 'StateGridDynamicDetails1',
                hidden: true
            },
            { text: i18n('sName'),     dataIndex: 'name',      tdCls: 'gridMain', flex: 1, filter: {type: 'string'},stateId: 'StateGridDynamicDetails3'},
            { text: i18n('sPhone'),    dataIndex: 'phone',     tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridDynamicDetails4'},
            { text: i18n('sFax'),      dataIndex: 'fax',       tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridDynamicDetails5'},
            { text: i18n('sCell'),     dataIndex: 'cell',      tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridDynamicDetails6'},
            { text: i18n('s_email'),   dataIndex: 'email',     tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridDynamicDetails7'},
            { text: i18n('sURL'),      dataIndex: 'url',       tdCls: 'gridTree', flex: 1, filter: {type: 'string'},   hidden: true,stateId: 'StateGridDynamicDetails8'},
			{ text: 'Theme',           dataIndex: 'theme',     tdCls: 'gridTree', flex: 1, filter: {type: 'string'},stateId: 'StateGridDynamicDetails8a'},
            {
                xtype       : 'actioncolumn',
                text        : 'Actions',
                width       : 80,
                stateId     : 'StateGridDynamicDetails11',
                items       : [				
					 { 
						iconCls : 'txtRed x-fa fa-trash',
						tooltip : 'Delete',
						isDisabled: function (grid, rowIndex, colIndex, items, record) {
                                if (record.get('delete') == true) {
                                     return false;
                                } else {
                                    return true;
                                }
                        },
                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                            this.fireEvent('itemClick', view, rowIndex, colIndex, item, e, record, row, 'delete');
                        }
                    },
                    {  
                        iconCls : 'txtBlue x-fa fa-pen',
                        tooltip : 'Edit',
                        isDisabled: function (grid, rowIndex, colIndex, items, record) {
                                if (record.get('update') == true) {
                                     return false;
                                } else {
                                    return true;
                                }
                        },
						handler: function(view, rowIndex, colIndex, item, e, record, row) {
                            this.fireEvent('itemClick', view, rowIndex, colIndex, item, e, record, row, 'update');
                        }
					},
					{  
                        iconCls : 'txtGreen x-fa fa-tablet',
                        tooltip : 'Preview',
						handler: function(view, rowIndex, colIndex, item, e, record, row) {
                            this.fireEvent('itemClick', view, rowIndex, colIndex, item, e, record, row, 'preview');
                        }
					}
				]
            }         
        ];
        me.callParent(arguments);
    }
});
