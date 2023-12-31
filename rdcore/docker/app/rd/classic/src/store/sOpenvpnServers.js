Ext.define('Rd.store.sOpenvpnServers', {
    extend      : 'Ext.data.Store',
    model       : 'Rd.model.mOpenvpnServer',
    //To make it load AJAXly from the server specify the follown 3 attributes
    buffered    : true,
    leadingBufferZone: 150, 
    pageSize    : 50,
    //To force server side sorting:
    remoteSort  : true,
    remoteFilter: true,
    proxy       : {
            type    : 'ajax',
            format  : 'json',
            batchActions: true, 
            url     : '/cake4/rd_cake/openvpn-servers/index.json',
            reader: {
                type            : 'json',
                rootProperty    : 'items',
                messageProperty : 'message',
                totalProperty   : 'totalCount' //Required for dynamic paging
            },
            api: {
                destroy  : '/cake4/rd_cake/openvpn-servers/delete.json'
            },
            simpleSortMode: true //This will only sort on one column (sort) and a direction(dir) value ASC or DESC
    },
    autoLoad    : true
});
