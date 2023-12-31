<?php

namespace App\Model\Table;

use Cake\ORM\Table;

class ApProfileSettingsTable extends Table {

    public function initialize(array $config):void{
    
        $this->addBehavior('Timestamp'); 
        $this->belongsTo('ApProfiles',[
            'className' => 'ApProfiles',
            'foreignKey' => 'ap_profile_id'
        ]);
        $this->belongsTo('Schedules');
    }
}
