<?php

namespace App\Controller;
use App\Controller\AppController;

use Cake\Core\Configure;
use Cake\Core\Configure\Engine\PhpConfig;

use Cake\Utility\Inflector;

class IspSpecificsController extends AppController{
  
    public $base         = "Access Providers/Controllers/IspSpecifics/";   
    protected $owner_tree   = array();
    protected $main_model   = 'IspSpecifics';
  
    public function initialize():void{  
        parent::initialize();
        $this->loadModel('IspSpecifics'); 
          
        $this->loadComponent('Aa');
        $this->loadComponent('GridButtonsFlat');
        $this->loadComponent('CommonQueryFlat', [ //Very important to specify the Model
            'model'                     => 'IspSpecifics',
            'no_available_to_siblings'  => true,
            'sort_by'                   => 'name'
        ]); 
             
        $this->loadComponent('JsonErrors'); 
        $this->loadComponent('TimeCalculations');  
        $this->loadComponent('Formatter');         
    }
    
    public function index(){
    
    	$req_q    	= $this->request->getQuery(); 
        $cloud_id 	= $req_q['cloud_id'];             
        $query 		= $this->{$this->main_model}->find();
        
        $this->CommonQueryFlat->build_cloud_query($query,$cloud_id,['PermanentUsers']);
 
        $limit  = 50;
        $page   = 1;
        $offset = 0;
        if(isset($req_q['limit'])){
            $limit  = $req_q['limit'];
            $page   = $req_q['page'];
            $offset = $req_q['start'];
        }
        
        $query->page($page);
        $query->limit($limit);
        $query->offset($offset);

        $total  = $query->count();       
        $q_r    = $query->all();
        $items  = [];

        foreach($q_r as $i){

        	$username = "Unknown";
        	if($i->permanent_user){
        		$username = $i->permanent_user->username;
        	}
                       
            $row       = [];
            $fields    = $this->{$this->main_model}->getSchema()->columns();
            foreach($fields as $field){
                $row["$field"]= $i->{"$field"};
                
                if($field == 'created'){
                    $row['created_in_words'] = $this->TimeCalculations->time_elapsed_string($i->{"$field"});
                }
                if($field == 'modified'){
                    $row['modified_in_words'] = $this->TimeCalculations->time_elapsed_string($i->{"$field"});
                }
            }        
			$row['update']			= true;
			$row['delete']			= true; 
			$row['permanent_user']	= $username;
            array_push($items,$row);      
        }
       
        $this->set(array(
            'items'         => $items,
            'success'       => true,
            'totalCount'    => $total
        ));
        $this->viewBuilder()->setOption('serialize', true); 
    }
   
    public function add(){
    
    	$this->set([
            'success'       => true
        ]);
        $this->viewBuilder()->setOption('serialize', true); 
        $this->_addOrEdit('add');          
    }
    
    public function edit(){ 
        $this->_addOrEdit('edit'); 
    }
     
    private function _addOrEdit($type= 'add') {
    
    	$req_d			= $this->request->getData();  	
    	

        //====Check what type it is====
        //---Data---
        if($req_d['type'] == 'data'){
            $multiplier = 1;
            if(isset($req_d['data_unit'])){
                if($req_d['data_unit'] == 'mb'){
                    $multiplier = 1048576; //(1024*1024)
                }
                if($req_d['data_unit'] == 'gb'){
                    $multiplier = 1073741824; //(1024*1024*1024)
                }            
            }
            $req_d['data'] = $req_d['value'] * $multiplier;
        }

        //---Time---
        if($req_d['type'] == 'time'){
            $multiplier = 1;
            if(isset($req_d['time_unit'])){
                if($req_d['time_unit'] == 'minutes'){
                    $multiplier = 60; //(60 seconds = minute)
                }
                if($req_d['time_unit'] == 'hours'){
                    $multiplier = 3600; //(60 seconds * 60 minutes)
                } 
                if($req_d['time_unit'] == 'days'){
                    $multiplier = 86400; //(60 seconds * 60 minutes * 24 Hours)
                }             
            }
            $req_d['time'] = $req_d['value'] * $multiplier;
        }

        //---Days To Use---
        if($req_d['type'] == 'days_to_use'){
            $req_d['days_to_use'] = $req_d['value'];
        }
        //====END Check what type it is====
       
        if($type == 'add'){ 
            //Unset the ID in the request data (if the call has it though it should not include an ID) 02-Jun-2022
            $add_data = $req_d;
            unset($add_data['id']);  
            $entity = $this->{$this->main_model}->newEntity($add_data);
        }
       
        if($type == 'edit'){
            $entity = $this->{$this->main_model}->get($req_d['id']);
            $this->{$this->main_model}->patchEntity($entity, $req_d);
        }
              
        if ($this->{$this->main_model}->save($entity)) {
        
        	//Check if we need to zero the accounting (New feature Nov 2022)
        	if(isset($req_d['accounting_zero'])){
    			$e_pu = $this->{'PermanentUsers'}->find()->where(['PermanentUsers.id' => $entity->permanent_user_id])->first();
    			if($e_pu){
    				$username 	= $e_pu->username;
    				$realm		= $e_pu->realm;
    				$this->{'Radaccts'}->deleteAll(['Radaccts.username' => $username,'Radaccts.realm' => $realm]);
    			}
    		}
    		      
            $this->set(array(
                'success' => true
            ));
            $this->viewBuilder()->setOption('serialize', true); 
        } else {
        
            $message = __('Could not create item');
            $this->JsonErrors->entityErros($entity,$message);
        }
	}
	
    public function menuForGrid(){
      
        $menu = $this->GridButtonsFlat->returnButtons(false,'top_ups'); 
        $this->set(array(
            'items'         => $menu,
            'success'       => true
        ));
        $this->viewBuilder()->setOption('serialize', true); 
    }
    
    public function delete() {
		if (!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		}

        //__ Authentication + Authorization __
        $user = $this->_ap_right_check();
        if(!$user){
            return;
        }
        $req_d		= $this->request->getData();

        $user_id   = $user['id'];
        $fail_flag = false;

	    if(isset($req_d['id'])){   //Single item delete     
            $entity     = $this->{$this->main_model}->get($req_d['id']);              
           	$this->{$this->main_model}->delete($entity);
        }else{                          //Assume multiple item delete
            foreach($req_d as $d){
                $entity     = $this->{$this->main_model}->get($d['id']);                
              	$this->{$this->main_model}->delete($entity);
            }
        }

        if($fail_flag == true){
            $this->set(array(
                'success'   => false,
                'message'   => __('Could not delete some items'),
            ));
            $this->viewBuilder()->setOption('serialize', true); 
        }else{
            $this->set(array(
                'success' => true
            ));
            $this->viewBuilder()->setOption('serialize', true); 
        }
	}
}
