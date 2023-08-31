Ext.define('Rd.controller.cMainRadius', {
    extend  : 'Ext.app.Controller',
    config: {
        urlGetContent : '/cake4/rd_cake/dashboard/items-for.json'
    },
    control : {
        '#tabMainRadius #cDynamicClients' : {
		    afterrender	: function(pnl){
		        Ext.getApplication().runAction('cDynamicClients','Index',pnl);
		    }
	    },
        '#tabMainRadius #cNas' : {
		    afterrender	: function(pnl){
		        Ext.getApplication().runAction('cNas','Index',pnl);
		    }
	    },
        '#tabMainRadius #cProfiles' : {
		    afterrender	: function(pnl){
		        Ext.getApplication().runAction('cProfiles','Index',pnl);
		    }
	    },
        '#tabMainRadius #cRealms' : {
		    afterrender	: function(pnl){
		        Ext.getApplication().runAction('cRealms','Index',pnl);
		    }
	    },
	    '#tabMainRadius #cIspSpecifics' : {
		    afterrender	: function(pnl){
		        Ext.getApplication().runAction('cIspSpecifics','Index',pnl);
		    }
	    },
    },
    actionIndex: function(pnl,itemId){
        var me      = this;
        var item    = pnl.down('#'+itemId);
        var added   = false;
        if(!item){
            var tp = Ext.create('Ext.tab.Panel',
            	{          
	            	border  : false,
	                itemId  : itemId,
	                plain	: true,
	                cls     : 'subSubTab', //Make darker
	            });      
            pnl.add(tp);
            Ext.Ajax.request({
                url     : me.getUrlGetContent(),
                method  : 'GET',
                params  : { item_id : itemId },
                success : function (response) {
                    var jsonData = Ext.JSON.decode(response.responseText);
                    if (jsonData.success) {
                        var items = jsonData.items;
                        tp.add(items);
                    }
                },
                scope: me
            });
            added = true;
        }
        return added;      
    }
});
