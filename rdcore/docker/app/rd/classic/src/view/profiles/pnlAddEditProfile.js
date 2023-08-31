Ext.define('Rd.view.profiles.pnlAddEditProfile', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.pnlAddEditProfile',
    title       : 'Edit Profile',
    autoScroll	: true,
    plain       : true,
    layout      : 'vbox',
    //Some defaults
	profileId   : 0,
	hide_owner  : true,
    defaults    : {
            border: false
    },
    fieldDefaults: {
        msgTarget       : 'under',
        labelAlign      : 'left',
        labelSeparator  : '',
        labelWidth      : Rd.config.labelWidth,
        margin          : Rd.config.fieldMargin,
        labelClsExtra   : 'lblRdReq'
    },
    requires: [
        'Ext.form.field.Text',
        'Rd.view.profiles.vcProfileGeneric',
        'Rd.view.profiles.pnlDataLimit',
        'Rd.view.profiles.pnlTimeLimit',
        'Rd.view.profiles.pnlLogintime',
        'Rd.view.profiles.pnlSessionLimit',
        'Rd.view.profiles.pnlAdvDataLimit',
        'Rd.view.profiles.pnlAdvTimeLimit',
        'Rd.view.profiles.pnlSpeedLimit',
    ],
    controller  : 'vcProfileGeneric',
    listeners       : {
        show : 'loadProfileContent' //Trigger a load of the settings (This is only on the initial load)
    },
    initComponent: function() {
         var me 	        = this; 
         var w_prim         = 550;
         var w_sec          = 350;
         var hide_multiple  = true;
         var gen_height     = 150; 
         
        var hide_system = true;
        if(me.root){
            hide_system = false;
        }        
           
		// Are we creating a new one or editing an existing one?
		var saveItemId = (me.profileId == 0) ? 'addsave' : 'editsave';

		if(saveItemId == 'addsave'){
		    me.glyph        = Rd.config.icnAdd;
		    hide_multiple   = false;
		    gen_height      = 250; // Make it a bit higher
		}
		
		if(saveItemId == 'editsave'){
		    me.glyph = Rd.config.icnEdit
		}
		
		me.buttons = [
            {
                itemId  : saveItemId,
                text    : 'SAVE',
                scale   : 'large',
                formBind: true,
                glyph   : Rd.config.icnYes,
                margin  : Rd.config.buttonMargin,
                ui      : 'button-teal'
            }
        ];
        
        var pnlGenItems =  [{
                xtype       : 'container',
                layout      : {
                    type    : 'hbox',
                    pack    : 'center',
                    align   : 'stretchmax'
                },
                items       : [
                    {
                        itemId      : 'pnlDataLimit',
                        hidden      : false,
                        flex        : 1,
                        ui          : 'panel-green',
                        xtype       : 'pnlDataLimit'
                    },
                    {
                        itemId      : 'pnlTimeLimit',
                        hidden      : false,
                        flex        : 1,
                        ui          : 'panel-blue',
                        xtype       : 'pnlTimeLimit'
                    }
                ]
            },
            {
                xtype       : 'container',
                layout      : 'hbox',
                items       : [
                    {
                        itemId      : 'pnlSpeedLimit',
                        hidden      : false,
                        flex        : 1,
                        ui          : 'panel-green',
                        xtype       : 'pnlSpeedLimit'
                    }
                ]
            },
            {
                xtype       : 'container',
                layout      : {
                    type    : 'hbox',
                    pack    : 'center',
                    align   : 'stretchmax'
                },
                items       : [
                    {
                        itemId      : 'pnlLogintime',
                        hidden      : false,
                        flex        : 1,
                        ui          : 'panel-blue',
                        xtype       : 'pnlLogintime'
                    },
                    {
                        itemId      : 'pnlSessionLimit',
                        hidden      : false,
                        flex        : 1,
                        ui          : 'panel-blue',
                        xtype       : 'pnlSessionLimit'
                    }
                ]
            }
        ];       
        var pnlAdv =  [{
                xtype       : 'container',
                layout      : {
                    type    : 'hbox',
                    pack    : 'center',
                    align   : 'stretchmax'
                },
                items       : [
                    {
                        itemId      : 'pnlAdvDataLimit',
                        hidden      : false,
                        flex        : 1,
                        ui          : 'panel-green',
                        xtype       : 'pnlAdvDataLimit'
                    },
                    {
                        itemId      : 'pnlAdvTimeLimit',
                        hidden      : false,
                        flex        : 1,
                        ui          : 'panel-blue',
                        xtype       : 'pnlAdvTimeLimit'
                    }
                ]
            }
        ];
			              
		me.items = [
            {
                xtype       : 'panel',
                bodyStyle   : 'background: #f0f0f5',
                bodyPadding : 10,
                items       : [              
                    {
						xtype       : 'checkbox',      
						fieldLabel  : 'Add Multiple',
						itemId      : 'chkMultiple',
						hidden      : hide_multiple
					},
					{
                        xtype       : 'checkbox',      
                        fieldLabel  : 'System Wide',
                        name        : 'for_system',
                        hidden      : hide_system,
                        disabled    : hide_system
                    },
                    {

                        xtype       : 'textfield',
                        name        : "id",
                        itemId      : 'hiddenUser',
                        hidden      : true
                    },   
                    {
					    xtype       : 'textfield',
					    fieldLabel  : i18n("sName"),
					    name        : "name",
					    allowBlank  : false,
					    blankText   : i18n("sSupply_a_value"),
					    width       : w_prim
				    }
                ],
                height      : gen_height
            },         
            {
                xtype       : 'panel',
                width       : '100%',
                layout: {
                    type            : 'accordion',
                    titleCollapse   : false,
                    animate         : true,
                    activeOnTop     : false
                },
                items: [
                    {
                        title   : 'BASIC',
                        bodyStyle   : 'background:#f6f6ee',
                        layout  : {
                                type    : 'vbox',
                                pack    : 'start',
                                align   : 'middle'
                        },
                        bodyPadding : 10,
                        items   : pnlGenItems
                    },
                    {
                        title   : 'ADVANCED',
                        bodyStyle   : 'background:#f6f6ee',
                        layout  : {
                                type    : 'vbox',
                                pack    : 'start',
                                align   : 'middle'
                        },
                        bodyPadding : 10,
                        items   : pnlAdv
                    }
                ]                                      
            }
        ];
     
        me.callParent(arguments);
    }
});
