<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$defSelected = false;
	
	if(isset($_POST['QBtophp'])) {
		$qPosition = $_POST["QBtophp"];
		//echo "received QB: $position";
	} 
	else if(isset($_POST['RBtophp'])) {
		$qPosition = $_POST["RBtophp"];
		//echo "received RB: $position";
	} 
	else if(isset($_POST['WRtophp'])) {
		$qPosition = $_POST["WRtophp"];
	} 
	else if(isset($_POST['TEtophp'])) {
		$qPosition = $_POST["TEtophp"];
	} 
	else if(isset($_POST['DEFtophp'])) {
		$qPosition = $_POST["DEFtophp"];
		$defSelected = true;
	} 
	else if(isset($_POST['Ktophp'])) {
		$qPosition = $_POST["Ktophp"];
	} 
	
	if(isset($_POST['FLEXtophp'])) {
	    $sql = "SELECT playerName, team, position FROM collegeTeamRoster where position in ('RB','WR','TE');";
	} else if(isset($_POST['DEFtophp'])) {
	    $sql = "SELECT teamName FROM collegeTeams;";
	} else {
    	//Query to get team rosters
    	$sql = "SELECT playerName, team, position FROM collegeTeamRoster where position='$qPosition';";
	}
	//echo $sql;
    $result = $conn->query($sql);

    //$index = 0;
	//var $playerArray = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            if($defSelected) {
            	$playerArray[$row["teamName"]] = $row["teamName"];
            } else {
				$playerArray[$row["playerName"]] = $row["playerName"]." (".$row["position"].", ".$row["team"].")";
				//echo $playerArray[$row["playerName"]];
	            //$index++;
            }
        }
    } else {
        echo "0 results";
    }
    //Output table to readTeamRoster.js
    echo json_encode($playerArray);
	
    
    $conn->close();
?>