<?php

namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\Validation\Validator;

class PermanentUsersTable extends Table
{
    public function initialize(array $config):void{
        $this->addBehavior('Timestamp');
        $this->addBehavior('FreeRadius',
            [
                'for_model' => 'PermanentUsers'
            ]
        );
          
        $this->belongsTo('Clouds');      
        $this->belongsTo('Countries');
        $this->belongsTo('Languages');
        $this->belongsTo('Profiles',['propertyName'  => 'real_profile']);
        $this->belongsTo('Realms',['propertyName'  => 'real_realm']);
           
        //It is very impartant that we specify 'cascadeCallbacks' in order for the devices to also be taken for the system
        $this->hasMany('Devices',['dependent' => true,'cascadeCallbacks' =>true]);      
        $this->hasMany('TopUps',['dependent' => true,'cascadeCallbacks' =>true]);
        $this->hasMany('Radchecks',[
            'dependent' => true,
            'cascadeCallbacks' =>true,
            'foreignKey' => 'username',
            'bindingKey' => 'username'
        ]);
        
        $this->hasMany('Radreplies',[
            'dependent' => true,
            'cascadeCallbacks' =>true,
            'foreignKey' => 'username',
            'bindingKey' => 'username'
        ]);
               
        $this->hasOne('PermanentUserOtps', [ 'dependent' => true]);       
    }
    
    public function validationDefault(Validator $validator): Validator{
        $validator = new Validator();
        $validator
            ->notEmpty('username', 'A name is required')
            ->add('username', [ 
                'nameUnique' => [
                    'message' => 'The username you provided is already taken. Please provide another one.',
                    'rule' => 'validateUnique', 
                    'provider' => 'table'
                ]
            ])
            ->allowEmpty('static_ip')
            ->add('static_ip', [
                'nameUnique' => [
                    'message' => 'The Static IP Address is already taken',
                    'rule' => 'validateUnique', 
                    'provider' => 'table'
                ]
            ]);
        return $validator;
    }
       
}
