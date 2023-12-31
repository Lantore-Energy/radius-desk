Ext.define('Rd.view.components.ajaxToolbar', {
    extend:'Ext.toolbar.Toolbar',
    alias :'widget.ajaxToolbar',
    url: null,
    extra_text: null,
    initComponent: function(){
        var me = this;
        Ext.Ajax.request({
            url: me.url,
            method: 'GET',
            success: me.buildToolbar,
            failure: function (response, options) {
                var jsonData = Ext.JSON.decode(response.responseText);
                Ext.Msg.show({
                    title       : "Error",
                    msg         : response.request.url + '<br>' + response.status + ' ' + response.statusText+"<br>"+jsonData.message,
                    modal       : true,
                    buttons     : Ext.Msg.OK,
                    icon        : Ext.Msg.ERROR,
                    closeAction : 'destroy'
                });
            },
            scope: me
        });
        me.callParent(arguments);
    },
    buildToolbar: function(response){
        var me          = this;
        var jsonData    = Ext.JSON.decode(response.responseText);
        if(jsonData.success){
            Ext.each(jsonData.items,function(i){
                me.add(i);
            });
            if(me.extra_text != null){
                me.add({ xtype: 'tbtext', html: me.extra_text});
            }        
        }
    }
});

