Ext.define('Rd.view.bans.winAddBan', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.winAddBan',
    closable    : true,
    draggable   : true,
    resizable   : true,
    title       : 'Add Block Or Speed Limit',
    width       : 550,
    height      : 500,
    plain       : true,
    border      : false,
    layout      : 'fit',
    glyph       : Rd.config.icnAdd,
    autoShow    :   false,
    defaults: {
            border: false
    },
    requires: [
    ],
    initComponent: function() {
        var me      = this;
        
        var cmbApProfile = Ext.create('Rd.view.components.cmbApProfile',{
		    itemId      : 'ap_profile_id',
		    hidden		: true,
		    disabled	: true
	    });
	    
	    var cmbMesh = Ext.create('Rd.view.components.cmbMesh',{
		    itemId      : 'mesh_id',
		    hidden		: true,
		    disabled	: true
	    });
               
        var frmData = Ext.create('Ext.form.Panel',{
            border:     false,
            layout:     'anchor',
            autoScroll: true,
            defaults: {
                anchor: '100%'
            },
            fieldDefaults: {
                msgTarget       : 'under',
                labelClsExtra   : 'lblRd',
                labelAlign      : 'left',
                labelSeparator  : '',
                labelClsExtra   : 'lblRd',
                margin          : Rd.config.fieldMargin,
                labelWidth		: 150
            },
            defaultType: 'textfield',
            buttons: [
                {
                    itemId      : 'save',
                    formBind    : true,
                    text        : 'SAVE',
                    scale       : 'large',
                    glyph       : Rd.config.icnYes,
                    margin      : Rd.config.buttonMargin,
                    ui          : 'button-teal'
                }
            ],
            items: [
            	
				{
                    name        : 'mac',
                    fieldLabel  : 'MAC',
                    allowBlank  : false,
                    blankText   : 'Specify A MAC Address',
					vtype       : 'MacColon',
					fieldStyle  : 'text-transform:uppercase',
                    itemId      : 'txtMac',
                    margin      : Rd.config.fieldMargin +5,
                    labelClsExtra   : 'lblRdReq'
                },
				{
                    name        : 'alias',
                    fieldLabel  : 'Alias',
                    allowBlank  : true,
                    blankText   : 'Specify An Unique Alias',
                    itemId      : 'txtAlias',
                    margin      : Rd.config.fieldMargin +5
                },
                {
					xtype		: 'radiogroup',
					columns		: 3,
					vertical	: false,
					items		: [
						{ boxLabel: 'Cloud Wide', 	name: 'scope', inputValue: 'cloud_wide', checked: true,margin: 2 },
						{ boxLabel: 'Mesk Network', name: 'scope', inputValue: 'mesh_only',margin: 2},
						{ boxLabel: 'AP Profile',  	name: 'scope', inputValue: 'ap_profile_only',margin	: 2}
					],
					listeners   : {
				        change  : 'rgrpScopeChange'
			        }
				},
				cmbApProfile,
				cmbMesh,
                {
					xtype		: 'radiogroup',
					columns		: 3,
					vertical	: false,
					items		: [
						{ boxLabel: 'Block', 	   name: 'action', inputValue: 'block', checked: true ,margin: 2 },
						{ boxLabel: 'Speed Limit', name: 'action', inputValue: 'limit',margin: 2 },
						{ boxLabel: 'Firewall Profile', name: 'action', inputValue: 'firewall', margin: 2 }
					],
					listeners   : {
				        change  : 'rgrpActionChange'
			        }
				},
				{
		            xtype       : 'rdSliderSpeed',
		            sliderName  : 'limit_upload',
		            itemId		: 'bw_up',
		            fieldLabel  : "<i class='fa fa-arrow-up'></i> Up",
		            hidden		: true,
		            disabled	: true
		        },
                {
		            xtype       : 'rdSliderSpeed',
		            sliderName  : 'limit_download',
		            itemId		: 'bw_down',
		            fieldLabel  : "<i class='fa fa-arrow-down'></i> Down",
		            hidden		: true,
		            disabled	: true
		        },
		        {
                	xtype		: 'cmbFirewallProfile',
                	fieldLabel	: 'Firewall Profile',
                	include_all_option : false,
                	disabled	: true,
                	hidden		: true,
                	labelClsExtra: 'lblRdReq'                             	
                }                
            ]
        });
        me.items = frmData; 
        me.callParent(arguments);
    }
});
