Ext.define('Rd.model.mAp', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id',               type: 'int'     },
         {name: 'ap_profile_id',    type: 'int'     },
         {name: 'name',             type: 'string'  },
         {name: 'description',      type: 'string'  },
         {name: 'mac',              type: 'string'  },
         {name: 'hardware',         type: 'string'  },
         {name: 'hw_human',         type: 'string'  },
         {name: 'last_contact',    	type: 'date'    },
		 {name: 'last_contact_from_ip', type: 'string' },
		 'last_contact_human',
		 'country_code',
         'country_name',
         'city',
         'postal_code',
        ]
});
