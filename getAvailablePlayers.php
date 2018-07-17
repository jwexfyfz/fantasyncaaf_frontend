<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	//Default value for defSelected variable (used to figure out if the function from JS is for offense or for defense)
	$defSelected = false;
	
	//Get week # from POST
	$weekNum = $_POST["weekNum"];
	
	//Get team ID from POST
	if(isset($_POST['teamID'])) {
		$team = $_POST["teamID"];
	} 
		
	//Read timesPlayerUsed table to extract how many times specific players have been used. Output into array (usedPlayerTable) keyed on player ID.
    $sql = "SELECT playerID, timesUsed FROM timesPlayerUsed where teamID = $team";
    $result = $conn->query($sql);
	if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $usedPlayerTable[$row["playerID"]] = $row["timesUsed"];
        }
    }
	
	
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
	
	//FLEX:	Allow RB, FB, WR, and TE positions 
	if(isset($_POST['FLEXtophp'])) {
	    $sql = "SELECT playerName, playerID, team, position, PlayerAbbr FROM collegeTeamRoster where position in ('RB','FB','WR','TE') order by team, PlayerName;";
	} 
	//TE:	Allow TE and WR positions
	else if(isset($_POST['TEtophp'])) {
	    $sql = "SELECT playerName, playerID, team, position, PlayerAbbr FROM collegeTeamRoster where position in ('WR','TE') order by team, PlayerName;";
	} 
	//RB1:	Allow RB and FB positions
	else if(isset($_POST['RBtophp'])) {
	    $sql = "SELECT playerName, playerID, team, position, PlayerAbbr FROM collegeTeamRoster where position in ('RB','FB') order by team, PlayerName;";
	} 
	//DEF:	Select from collegeTeams table
	else if(isset($_POST['DEFtophp'])) {
	    $sql = "SELECT teamName, teamID FROM collegeTeams order by teamName;";
	} else {
    	//Query to get team rosters
    	$sql = "SELECT playerName, playerID, team, position, PlayerAbbr FROM collegeTeamRoster where position='$qPosition' order by team, PlayerName;";
	}
	//echo $sql;
    $result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
			if ($defSelected) {
				if(isset($usedPlayerTable[$row["teamID"]])) {
					$playerArray[$index] = array(
						"playerName"=>$row["teamName"],
						"timesUsed"=>$usedPlayerTable[$row["teamID"]]
					);
				}
				else {
					$playerArray[$index] = array(
						"playerName"=>$row["teamName"],
						"timesUsed"=>0
					);
				}
			}
			else {
				if(isset($usedPlayerTable[$row["playerID"]])) {
					$playerArray[$index] = array(
						"playerName"=>$row["playerName"],
						"playerAbbr"=>$row["PlayerAbbr"],
						"position"=>$row["position"],
						"team"=>$row["team"],
						"timesUsed"=>$usedPlayerTable[$row["playerID"]]
					);
				}
				else {
					$playerArray[$index] = array(
						"playerName"=>$row["playerName"],
						"playerAbbr"=>$row["PlayerAbbr"],
						"position"=>$row["position"],
						"team"=>$row["team"],
						"timesUsed"=>0
					);
				}
			}
			$index++;
			
            /*if($defSelected) {
            	$playerArray[$row["teamName"]] = $row["teamName"];
            } else {
				if(isset($usedPlayerTable[$row["playerID"]])) {
					$playerArray[$row["playerName"]] = $row["playerName"]." (".$row["position"].", ".$row["team"].") (".$usedPlayerTable[$row["playerID"]].")";
					//echo $playerArray[$row["playerName"]];
		            //$index++;
				} else {
					$playerArray[$row["playerName"]] = $row["playerName"]." (".$row["position"].", ".$row["team"].") (0)";
					//echo $playerArray[$row["playerName"]];
		            //$index++;
				}
            }*/
        }
    } else {
        echo "0 results";
    }
    //Output table to readTeamRoster.js
    echo json_encode($playerArray);
	
    
    $conn->close();
?>