Ext.define('Rd.view.schedules.vcPnlSchedules', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcPnlSchedules',
    init    : function() { 
    	var me = this;   
    	var dd = Rd.getApplication().getDashboardData();
    	//Set root to use later in the app in order to set 'for_system' (root)
        me.root    = false;
        if(dd.isRootUser){
            me.root = true;   
        }
    },
    config: {
        urlAdd          : '/cake4/rd_cake/schedules/add.json',
        urlDelete       : '/cake4/rd_cake/schedules/delete.json',
		urlEdit         : '/cake4/rd_cake/schedules/edit.json',
		urlAddEntry     : '/cake4/rd_cake/schedules/add-schedule-entry.json',
		urlViewEntry    : '/cake4/rd_cake/schedules/view-schedule-entry.json',
		urlEditEntry    : '/cake4/rd_cake/schedules/edit-schedule-entry.json',
		urlDeleteEntry  : '/cake4/rd_cake/schedules/delete-schedule-entry.json'
    },
    control: {
    	'pnlSchedules #reload': {
            click   : 'reload'
        },
        'pnlSchedules #add': {
             click: 'add'
        },
        'pnlSchedules #edit': {
            click: 'edit'
        },       
        'pnlSchedules #delete': {
            click   : 'del'
        },
        'pnlSchedules cmbSchedule': {
           change   : 'cmbScheduleChange'
        },
        'pnlSchedules #dvSchedules' : {
        	//select		: 'itemSelected',
        	itemclick	: 'itemSelected'
        },
        'winScheduleAdd #btnDataNext' : {
            click   : 'btnDataNext'
        },
        'winScheduleEdit #save': {
            click   : 'btnEditSave'
        },
        'winScheduleEntryAdd #save': {
            click   : 'btnEntryAddSave'
        }, 
        'winScheduleEntryEdit': {
            show   : 'winScheduleEntryEditShow'
        },
        'winScheduleEntryEdit #save': {
            click   : 'btnEntryEditSave'
        }                 
    },
    itemSelected: function(dv,record){
    	var me = this;
    	//--Add Schedule Component--
    	if(record.get('type') == 'add'){    	
    		if(!me.rightsCheck(record)){
	    		return;
	    	}  	  	  	
		    if(!Ext.WindowManager.get('winScheduleEntryAddId')){	    	    
                var w = Ext.widget('winScheduleEntryAdd',{id:'winScheduleEntryAddId','schedule_id' : record.get('schedule_id'),'schedule_name' : record.get('schedule_name')});
                me.getView().add(w); 
                let appBody = Ext.getBody();
                w.showBy(appBody);             
            } 
    	} 	
    },
    reload: function(){
        var me = this;
        me.getView().down('#dvSchedules').getStore().reload();
    },
    add: function(button) {	
        var me      = this;
        var c_name 	= Rd.getApplication().getCloudName();
        var c_id	= Rd.getApplication().getCloudId() ;
        var dd      = Rd.getApplication().getDashboardData();
        if(!Ext.WindowManager.get('winScheduleAddId')){
            var w = Ext.widget('winScheduleAdd',{id:'winScheduleAddId',cloudId: c_id, cloudName: c_name, root: me.root});
            this.getView().add(w);
            let appBody = Ext.getBody();
            w.showBy(appBody);        
        }
    },
    btnDataNext:  function(button){
        var me      = this;
        var win     = button.up('window');
        var form    = win.down('form');
        form.submit({
            clientValidation: true,
            url: me.getUrlAdd(),
            success: function(form, action) {
                win.close();
                me.reload();
                me.reloadComboBox();
                Ext.ux.Toaster.msg(
                    i18n('sNew_item_created'),
                    i18n('sItem_created_fine'),
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
            },
            failure: Ext.ux.formFail
        });
    },
    edit: function(button) {
        var me      = this;
        //Find out if there was something selected
        if(me.getView().down('#dvSchedules').getSelectionModel().getCount() == 0){
             Ext.ux.Toaster.msg(
                        i18n('sSelect_an_item'),
                        i18n('sFirst_select_an_item_to_edit'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{
		    var sr   =  me.getView().down('#dvSchedules').getSelectionModel().getLastSelected();
		    if(!me.rightsCheck(sr)){
	    		return;
	    	}
		    
		    if(sr.get('type') == 'schedule'){
				if(!Ext.WindowManager.get('winScheduleEditId')){
		            var w = Ext.widget('winScheduleEdit',{id:'winScheduleEditId',record: sr, schedule_id: sr.get('schedule_id'), root: me.root});
		            this.getView().add(w);
		            let appBody = Ext.getBody();
		            w.showBy(appBody);            
		        }
		  	}
		  	
		  	if(sr.get('type') == 'schedule_entry'){		  			  	
				if(!Ext.WindowManager.get('winScheduleEntryEditId')){
			        let appBody = Ext.getBody();
                    var w = Ext.widget('winScheduleEntryEdit',{id:'winScheduleEntryEditId',record: sr, schedule_entry_id: sr.get('id')});
                    this.getView().add(w);
                    w.showBy(appBody);     
                }  
		  	}	  			  		  	  
        }     
    },
    btnEditSave:function(button){
        var me      = this;
        var win     = button.up('window');
        var form    = win.down('form');
        //Checks passed fine...      
        form.submit({
            clientValidation    : true,
            url                 : me.getUrlEdit(),
            success             : function(form, action) {
                me.reload();
                 win.close();
                Ext.ux.Toaster.msg(
                    i18n('sItems_modified'),
                    i18n('sItems_modified_fine'),
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
            },
            failure             : Ext.ux.formFail
        });
    },  
    del: function(button) {
        var me      = this;
        
        if(me.getView().down('#dvSchedules').getSelectionModel().getCount() == 0){
            Ext.ux.Toaster.msg(
                        i18n('sSelect_an_item'),
                        i18n('sFirst_select_an_item_to_delete'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{
        	var sr   =  me.getView().down('#dvSchedules').getSelectionModel().getLastSelected();
        	
        	if(!me.rightsCheck(sr)){
	    		return;
	    	}
	    		
		    if(sr.get('type') == 'schedule'){ 	    		    
		    	me.delSchedule();
		    }
		    
		    if(sr.get('type') == 'schedule_entry'){	    
		        me.delScheduleEntry();            
		    }            
        }      
    },           
    delSchedule:   function(){
        var me      = this;     
        Ext.MessageBox.confirm(i18n('sConfirm'), 'This will DELETE the Schedule and ALL its Schedule Entries' , function(val){
            if(val== 'yes'){
                var selected    = me.getView().down('#dvSchedules').getSelectionModel().getSelection();
                var list        = [];
                Ext.Array.forEach(selected,function(item){
                    var id = item.get('schedule_id');
                    Ext.Array.push(list,{'id' : id});
                });
                Ext.Ajax.request({
                    url: me.getUrlDelete(),
                    method: 'POST',          
                    jsonData: list,
                    success: function(response){
				        var jsonData    = Ext.JSON.decode(response.responseText);
				        if(jsonData.success){
				            Ext.ux.Toaster.msg(
		                        i18n('sItem_deleted'),
		                        i18n('sItem_deleted_fine'),
		                        Ext.ux.Constants.clsInfo,
		                        Ext.ux.Constants.msgInfo
		                    );
		                    me.reload(); //Reload from server
		                    me.reloadComboBox();
				        }else{
				        	Ext.ux.Toaster.msg(
		                        i18n('sProblems_deleting_item'),
		                        jsonData.message,
		                        Ext.ux.Constants.clsWarn,
		                        Ext.ux.Constants.msgWarn
		                    );			        
				        }                         
                    },                                    
                    failure: function(batch,options){
                        Ext.ux.Toaster.msg(
                            i18n('sProblems_deleting_item'),
                            batch.proxy.getReader().rawData.message.message,
                            Ext.ux.Constants.clsWarn,
                            Ext.ux.Constants.msgWarn
                        );
                        me.reload(); //Reload from server
                    }
                });
            }
        });
    },
    btnEntryAddSave : function(button){
        var me      = this;
        var form    = button.up('form');
        var win     = button.up('winScheduleEntryAdd');
        //Checks passed fine...      
        form.submit({
            clientValidation    : true,
            url                 : me.getUrlAddEntry(),
            success             : function(form, action) {
                Ext.ux.Toaster.msg(
                    'Item added Fine',
                    'Item added Fine',
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
                me.reload();
                win.close();
            },
            failure             : Ext.ux.formFail
        }); 
    },
    winScheduleEntryEditShow : function(win){
        var me      = this; 
        var form    = win.down('form');
        var entryId = win.schedule_entry_id;     
        form.load({
            url         :me.getUrlViewEntry(), 
            method      :'GET',
            params      :{schedule_entry_id:entryId},
            success     : function(a,b,c){
                form.down('#slideTime').setValue(b.result.data.event_time);       
                if(b.result.data.type == 'predefined_command'){
                    var cmb    = form.down("cmbPredefinedCommand");
                    var rec    = Ext.create('Rd.model.mAp', {name: b.result.data.predefined_command_name, id: b.result.data.predefined_command_id});
                    cmb.getStore().loadData([rec],false);
                    cmb.setValue(b.result.data.predefined_command_id);
                }                          
            }
        });        
    },
    btnEntryEditSave : function(button){
        var me      = this;
        var form    = button.up('form');
        var win     = button.up('winScheduleEntryEdit');
        //Checks passed fine...      
        form.submit({
            clientValidation    : true,
            url                 : me.getUrlEditEntry(),
            success             : function(form, action) {
                Ext.ux.Toaster.msg(
                    i18n('sItems_modified'),
                    i18n('sItems_modified_fine'),
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
                me.reload();
                win.close();
            },
            failure             : Ext.ux.formFail
        }); 
    },
    delScheduleEntry:   function(){
        var me      = this;     
        //Find out if there was something selected
        Ext.MessageBox.confirm(i18n('sConfirm'), 'This will DELETE the selected Schedule Entries' , function(val){
            if(val== 'yes'){
                var selected    = me.getView().down('#dvSchedules').getSelectionModel().getSelection();
                var list        = [];
                Ext.Array.forEach(selected,function(item){
                    var id = item.getId();
                    Ext.Array.push(list,{'id' : id});
                });
                Ext.Ajax.request({
                    url: me.getUrlDeleteEntry(),
                    method: 'POST',          
                    jsonData: list,
                    success: function(batch,options){
                        Ext.ux.Toaster.msg(
                            i18n('sItem_deleted'),
                            i18n('sItem_deleted_fine'),
                            Ext.ux.Constants.clsInfo,
                            Ext.ux.Constants.msgInfo
                        );
                        me.reload(); //Reload from server
                    },                                    
                    failure: function(batch,options){
                        Ext.ux.Toaster.msg(
                            i18n('sProblems_deleting_item'),
                            batch.proxy.getReader().rawData.message.message,
                            Ext.ux.Constants.clsWarn,
                            Ext.ux.Constants.msgWarn
                        );
                        me.reload(); //Reload from server
                    }
                });
            }
        });
    },
    cmbScheduleChange: function(cmb,new_value){
    	var me = this;
    	me.getView().down('#dvSchedules').getStore().getProxy().setExtraParams({id:new_value});
 		me.reload();
    },
    reloadComboBox: function(){  
    	var me = this;
    	me.getView().down('cmbSchedule').getStore().reload();
    },
    rightsCheck: function(record){
    	var me = this;
    	if(record.get('for_system') && (!me.root)){
			Ext.ux.Toaster.msg(
                'No Rights',
                'No Rights For This Action',
                Ext.ux.Constants.clsWarn,
                Ext.ux.Constants.msgWarn
        	);
			return false; //has no rights
		}
    	return true; //has rights    
    }   
});
