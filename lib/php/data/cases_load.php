<?php 
session_start();
require('../auth/session_check.php');
include '../../../db.php';
include '../utilities/convert_times.php';
include '../utilities/names.php';

	$user = $_SESSION['login'];

	//Get the columns from _CONFIG.php, excluding any hidden fields
	
	$get_columns = $dbh->prepare('SELECT * from cm_columns');
	$get_columns->execute();
	$col_result = $get_columns->fetchAll();
	
	foreach ($col_result as $val)
	{
		if ($val[3] == "true")
			{@$col_vals_raw .= "cm." . $val[1] . ", ";}		
	}
	
	//trim trailing comma
	$col_vals = substr($col_vals_raw,0,-2);
	
	if ($_SESSION['permissions']['view_all_cases'] == "0")
	
		{
			$sql = "SELECT $col_vals, cm_case_assignees.case_id, cm_case_assignees.username FROM cm, cm_case_assignees WHERE cm.id = cm_case_assignees.case_id AND cm_case_assignees.username =  :username AND cm_case_assignees.status =  'active'";
								
		}
		
	elseif ($_SESSION['permissions']['view_all_cases'] == "1")
		
		{
			//admin or super user type query - Users who can access all cases and "work" on all cases.
			$sql = "SELECT $col_vals FROM cm";
			
		}
		
	else
	
		{
			echo "There is configuration error in your groups."; die;
		}
	
		$case_query = $dbh->prepare($sql);
		$case_query->bindParam(':username',$user);
		$case_query->execute();

	//Create array of column names for json output		
	foreach ($col_result as $value)
	{
		if ($value[3] == "true")
			{$cols[] = $value[1];}		
	}
	
		while ($result = $case_query->fetch(PDO::FETCH_ASSOC))
			{
				
				$rows = array();
				
			//perform some formatting to make the data more user-friendly
				
				//Convert dates
				if (!empty($result['date_open']));
					{
						$result['date_open'] = sql_date_to_us_date($result['date_open']);
					}
			
				if (!empty($result['date_close']))
					{			
						$result['date_close'] = sql_date_to_us_date($result['date_close']);
					}
			
				//Convert username into last name
			//	if (!empty($result['professor']))
				//	{
					//	$profs = explode(",",$result['professor']);
						//array_pop($profs);
						//$lnames = array_walk($profs,'username_to_lastname',$dbh);
						//$result['professor'] = implode(", ",$lnames);
					//}
					
					
			//loop through results, create array, convert to json	
				foreach ($cols as $col)
					{
						
						$rows[] = $result[$col];
					}	
				
				$output['aaData'][] = $rows;

			}

	
	$json = json_encode($output);
	echo $json;