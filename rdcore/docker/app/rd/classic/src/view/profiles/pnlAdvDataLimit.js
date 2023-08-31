Ext.define('Rd.view.profiles.pnlAdvDataLimit', {
    extend      : 'Ext.panel.Panel',
    glyph       : Rd.config.icnData,
    alias       : 'widget.pnlAdvDataLimit',
    requires    : [
        'Rd.view.profiles.vcAdvDataLimit',
        'Rd.view.components.rdSliderData'
    ],
    controller  : 'vcAdvDataLimit',
    layout      : 'vbox',
    title       : "ADVANCED DATA LIMIT",
    initComponent: function(){
        var me      = this;
        var w_sec   = 350;
        var w_rd    = 68;
        me.width    = 550;
        me.padding  = 5;
        me.items    = [
			{
			    xtype       : 'sldrToggle',
			    fieldLabel  : 'Enabled',
			    userCls     : 'sldrDark',
			    name        : 'adv_data_limit_enabled',
			    itemId      : 'adv_data_limit_enabled',
			    value       : 1,
			    listeners   : {
					change  : 'sldrToggleChange'
				}
			},
			{ 
			    xtype       : 'container',
			    itemId      : 'cntDetail',
			    items       : [
			        
                    {
			            xtype       : 'rdSliderData',
			            sliderName  : 'adv_data',
			            minValue    : 1,
                        maxValue    : 999
			        },
                    {
			            xtype       : 'rdSlider',
			            itemId      : 'sldrDataPerDay',
			            sliderName  : 'adv_data_per_day',
			            fieldLabel  : "Sessions/Day",
			            minValue    : 1,
                        maxValue    : 10
			        },
			        {
			            xtype       : 'rdSlider',
			            itemId      : 'sldrDataPerMonth',
			            sliderName  : 'adv_data_per_month',
			            fieldLabel  : "Sessions/Month",
			            minValue    : 1,
                        maxValue    : 120
			        }
                ]
            }
        ];       
        this.callParent(arguments);
    }
});
