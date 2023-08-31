<?php
//----------------------------------------------------------
//---- Author: Dirk van der Walt
//---- License: GPL v3
//---- Description: A component that is used to create JSON on the controller that has it included to handle the error messages for ExtJs
//---- Date: 05-05-2017
//------------------------------------------------------------

namespace App\Controller\Component;
use Cake\Controller\Component;

class JsonErrorsComponent extends Component {


	public function errorMessage($message="An error has occured",$field='message'){
		$controller = $this->getController();
		$controller->set([
        	'success'       => false,
        	"$field"   => $message,
        ]);
        $controller->viewBuilder()->setOption('serialize', true);
    }
   
    public function entityErros($entity,$message="An error has occured",$additional = []){      
            $errors     = $entity->getErrors();  
            $a          = [];
            $m_add      = '';
            foreach(array_keys($errors) as $field){
                $detail_string = '';
                $error_detail =  $errors[$field];
                foreach(array_keys($error_detail) as $error){
                    $detail_string = $detail_string." ".$error_detail[$error];   
                }

                $a[$field] = $detail_string;
                $m_add = $m_add."<br>".$detail_string;
            }

            $message = $message.$m_add;             
            $controller = $this->getController(); 
            
            $data = [
		    	'errors'    => $a,
                'success'   => false,
                'username'	=> $entity->username,
                'message'   => $message
            ];
            
            //Add the additional ones
            foreach(array_keys($additional) as $key){		    	
		    	$data[$key] = $additional[$key];
		    }
                  
			$controller->set($data);		    
			$controller->viewBuilder()->setOption('serialize', true);
    }

}
