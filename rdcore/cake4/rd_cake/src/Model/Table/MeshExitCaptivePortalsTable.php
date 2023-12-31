<?php

namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\Validation\Validator;

class MeshExitCaptivePortalsTable extends Table {

    public function initialize(array $config):void{
        $this->addBehavior('Timestamp');
        $this->belongsTo('MeshExit', [
            'className' => 'MeshExits',
            'foreignKey' => 'mesh_exit_id'
        ]);   
    }

    public function validationDefault(Validator $validator):Validator
    {
        $validator = new Validator();
        $validator
            ->notBlank('radius_nasid','Value is required')
            ->add('radius_nasid', [
                'nameUnique' => [
                    'message' => 'This value is already taken',
                    'rule' => 'validateUnique',
                    'provider' => 'table'
                ]
            ])
            ->notBlank('radius1','Value is required')
            ->notBlank('secret','Value is required')
            ->notBlank('uam_url','Value is required');
        return $validator;
    }
}
