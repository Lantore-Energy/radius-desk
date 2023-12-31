Ext.define('Rd.store.sSoftflows', {
    extend      : 'Ext.data.Store',
    model       : 'Rd.model.mSoftflow',
    buffered    : true,
    leadingBufferZone: 150, 
    pageSize    : 50,
    remoteSort  : true,
    remoteFilter: true,
    proxy: {
            type    : 'ajax',
            format  : 'json',
            batchActions: true, 
            url     : '/cake4/rd_cake/softflows/index.json',
            reader: {
                type            : 'json',
                rootProperty    : 'items',
                messageProperty : 'message',
                totalProperty   : 'totalCount' //Required for dynamic paging
            },
            simpleSortMode: true //This will only sort on one column (sort) and a direction(dir) value ASC or DESC
    },
    autoLoad: true
});
