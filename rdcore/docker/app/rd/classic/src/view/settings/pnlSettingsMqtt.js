Ext.define('Rd.view.settings.pnlSettingsMqtt', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.pnlSettingsMqtt',
    autoScroll	: true,
    plain       : true,
    frame       : false,
    layout      : {
        type    : 'vbox',
        pack    : 'start',
        align   : 'stretch'
    },
    margin      : 5,  
    fieldDefaults: {
        msgTarget       : 'under',
        labelAlign      : 'left',
        labelSeparator  : '',
        labelWidth      : Rd.config.labelWidth+20,
        margin          : Rd.config.fieldMargin,
        labelClsExtra   : 'lblRdReq'
    },
    buttons : [
        {
            itemId  : 'save',
            text    : 'SAVE',
            scale   : 'large',
            formBind: true,
            glyph   : Rd.config.icnYes,
            margin  : Rd.config.buttonMargin,
            ui      : 'button-teal'
        }
    ],
    requires: [
        'Rd.view.settings.vcSettingsMqtt'
    ],
    controller  : 'vcSettingsMqtt',
    listeners       : {
        activate  : 'onViewActivate'
    },
    initComponent: function(){
        var me      = this;
        var w_prim  = 550;
             
        var cntMqtt  = {
            xtype       : 'container',
            width       : w_prim,
            layout      : 'anchor',
            defaults    : {
                anchor  : '100%'
            },
            defaultType : 'textfield',
            items       : [
                { 
                    fieldLabel      : 'Enable', 
                    name            : 'mqtt_enabled', 
                    itemId          : 'chkMqttEnabled',
                    labelClsExtra   : 'lblRdReq',
                    checked         : false, 
                    xtype           : 'checkbox'
                },
                {
                    fieldLabel      : 'User',
                    name            : 'mqtt_user',
                    itemId          : 'txtMqttUser',
                    allowBlank      : false,
                    blankText       : i18n('sSupply_a_value'),
                    labelClsExtra   : 'lblRdReq',
                    disabled        : true
                },
                {
                    xtype           : 'rdPasswordfield',
                    rdName          : 'mqtt_password',
                    itemId          : 'txtMqttPassword',
                    rdLabel         : 'Password',
                    disabled        : true
                },              
                {
                    fieldLabel      : 'Server URL',
                    name            : 'mqtt_server_url',
                    itemId          : 'txtMqttServerUrl',
                    allowBlank      : false,
                    blankText       : i18n('sSupply_a_value'),
                    labelClsExtra   : 'lblRdReq',
                    disabled        : true
                },
                {
                    fieldLabel      : 'Command Topic',
                    name            : 'mqtt_command_topic',
                    itemId          : 'txtMqttCommandTopic',
                    allowBlank      : false,
                    blankText       : i18n('sSupply_a_value'),
                    labelClsExtra   : 'lblRdReq',
                    disabled        : true
                }
            ]
        }
         
        var cntApi  = {
            xtype       : 'container',
            width       : w_prim,
            layout      : 'anchor',
            defaults    : {
                anchor  : '100%'
            },
            items       : [
                 { 
                    fieldLabel      : 'Enable', 
                    name            : 'api_mqtt_enabled', 
                    inputValue      : '1',
                    itemId          : 'chkApiMqttEnabled',
                    labelClsExtra   : 'lblRdReq',
                    checked         : false, 
                    xtype           : 'checkbox'
                },
                {
                    xtype           : 'textfield',
                    fieldLabel      : 'API Gateway URL',
                    name            : 'api_mqtt_gateway_url',
                    itemId          : 'txtApiMqttGatewayUrl',
                    allowBlank      : false,
                    blankText       : i18n('sSupply_a_value'),
                    labelClsExtra   : 'lblRdReq',
                    disabled        : true
                },
                {
                    xtype           : 'button',
                    text            : 'Test API Gateway',
                    ui              : 'button-teal',
                    itemId          : 'btnApiTest',
                    scale           : 'large',
                    padding         : 5,
                    margin          : 5,
                    disabled        : true,
                    listeners   : {
                        click     : 'onApiTestClick'
                    }    
                }        
            ]
        }    
                      
        me.items = [
            {
                xtype       : 'panel',
                title       : "MQTT Setting (MESHdesk & APdesk)",
                glyph       : Rd.config.icnGears, 
                ui          : 'panel-blue',
                layout      : {
                  type  : 'vbox',
                  align : 'start',
                  pack  : 'start'
                },
                bodyPadding : 10,
                items       : cntMqtt				
            },
            {
                xtype       : 'panel',
                title       : 'MQTT API Gateway',
                glyph       : Rd.config.icnGlobe, 
                ui          : 'panel-green',
                layout      : {
                  type  : 'vbox',
                  align : 'start',
                  pack  : 'start'
                },
                bodyPadding : 10,
                items       : cntApi				
            }
        ];    
        me.callParent(arguments);
    }
});
