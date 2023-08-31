<?php

// src/Model/Table/SoftflowsTable.php

namespace App\Model\Table;
use Cake\ORM\Table;

class SoftflowsTable extends Table{
    public function initialize(array $config):void{  
        $this->addBehavior('Timestamp');       
        $this->belongsTo('DynamicClients'); 
    }     
}
