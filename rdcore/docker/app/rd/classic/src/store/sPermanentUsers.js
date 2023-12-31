Ext.define('Rd.store.sPermanentUsers', {
    extend      : 'Ext.data.Store',
    model       : 'Rd.model.mPermanentUser',
    pageSize    : 100,
    remoteSort  : true,
    remoteFilter: true,
    proxy: {
            type    : 'ajax',
            format  : 'json',
            batchActions: true, 
            url     : '/cake4/rd_cake/permanent-users/index.json',
            reader: {
                type            : 'json',
                rootProperty    : 'items',
                messageProperty : 'message',
                totalProperty   : 'totalCount' //Required for dynamic paging
            },
            simpleSortMode: true //This will only sort on one column (sort) and a direction(dir) value ASC or DESC
    },
    listeners: {
        load: function(store, records, successful, operation) {
            if(!successful){ 
                var error = operation.getError();
                Ext.ux.Toaster.msg(
                    'Warning',
                    error,
                    Ext.ux.Constants.clsWarn,
                    Ext.ux.Constants.msgWarn
                );
            }
        }
    },
    autoLoad: false
});
