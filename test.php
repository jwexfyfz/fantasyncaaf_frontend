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
	$weekNum = 1;
	
	//Get team ID from POST
	$team = 101;
		
	//Read timesPlayerUsed table to extract how many times specific players have been used. Output into array (usedPlayerTable) keyed on player ID.
    $sql = "SELECT playerID, timesUsed FROM timesPlayerUsed where teamID = $team";
    $result = $conn->query($sql);
	if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $usedPlayerTable[$row["playerID"]] = $row["timesUsed"];
        }
    }
	
	$qPosition = "RB";
	
	if(isset($_GET['QBtophp'])) {
		$qPosition = $_GET["QBtophp"];
		//echo "received QB: $position";
	} 
	else if(isset($_GET['RBtophp'])) {
		$qPosition = $_GET["RBtophp"];
		//echo "received RB: $position";
	} 
	else if(isset($_GET['WRtophp'])) {
		$qPosition = $_GET["WRtophp"];
	} 
	else if(isset($_GET['TEtophp'])) {
		$qPosition = $_GET["TEtophp"];
	} 
	else if(isset($_GET['DEFtophp'])) {
		$qPosition = $_GET["DEFtophp"];
		$defSelected = true;
	} 
	else if(isset($_GET['Ktophp'])) {
		$qPosition = $_GET["Ktophp"];
	} 
	
	//FLEX:	Allow RB, FB, WR, and TE positions 
	if(isset($_GET['FLEXtophp'])) {
	    //$sql = "SELECT playerName, playerID, team, teamID, position, PlayerAbbr FROM collegeTeamRoster where position in ('RB','FB','WR','TE') order by team, PlayerName;";
		$sql = "SELECT C.playerName, C.playerID, C.team, C.teamID, C.position, C.PlayerAbbr, D.gametime FROM collegeTeamRoster as C
inner join (SELECT A.teamID as teamid, B.team as team, B.gametime as gametime from collegeteams as A inner join (select teamID, team, gametime from gametimes where week=$weekNum) as B on (A.teamID = B.teamID)) as D on (C.teamID = D.teamid) where position in ('RB','FB','WR','TE') order by team, PlayerName;";
	} 
	//TE:	Allow TE and WR positions
	else if(isset($_GET['TEtophp'])) {
	    //$sql = "SELECT playerName, playerID, team, teamID, position, PlayerAbbr FROM collegeTeamRoster where position in ('WR','TE') order by team, PlayerName;";
		$sql = "SELECT C.playerName, C.playerID, C.team, C.teamID, C.position, C.PlayerAbbr, D.gametime FROM collegeTeamRoster as C
inner join (SELECT A.teamID as teamid, B.team as team, B.gametime as gametime from collegeteams as A inner join (select teamID, team, gametime from gametimes where week=$weekNum) as B on (A.teamID = B.teamID)) as D on (C.teamID = D.teamid) where position in ('WR','TE') order by team, PlayerName;";
	} 
	//RB1:	Allow RB and FB positions
	else if(isset($_GET['RBtophp'])) {
	    //$sql = "SELECT playerName, playerID, team, teamID, position, PlayerAbbr FROM collegeTeamRoster where position in ('RB','FB') order by team, PlayerName;";
		$sql = "SELECT C.playerName, C.playerID, C.team, C.teamID, C.position, C.PlayerAbbr, D.gametime FROM collegeTeamRoster as C
inner join (SELECT A.teamID as teamid, B.team as team, B.gametime as gametime from collegeteams as A inner join (select teamID, team, gametime from gametimes where week=$weekNum) as B on (A.teamID = B.teamID)) as D on (C.teamID = D.teamid) where position in ('RB','FB') order by team, PlayerName;";
	} 
	//DEF:	Select from collegeTeams table
	else if(isset($_GET['DEFtophp'])) {
	    //$sql = "SELECT teamName, teamID FROM collegeTeams order by teamName;";
		$sql = "SELECT C.teamName as teamName, C.teamID as teamID, D.gametime as gametime FROM collegeTeams as C
inner join (SELECT A.teamID as teamid, B.team as team, B.gametime as gametime from collegeteams as A inner join (select teamID, team, gametime from gametimes where week=$weekNum) as B on (A.teamID = B.teamID)) as D on (C.teamID = D.teamid) order by teamName;";
	} else {
    	//Query to get team rosters
    	//$sql = "SELECT playerName, playerID, team, teamID, position, PlayerAbbr FROM collegeTeamRoster where position='$qPosition' order by team, PlayerName;";
    	$sql = "SELECT C.playerName, C.playerID, C.team, C.teamID, C.position, C.PlayerAbbr, D.gametime as gametime FROM collegeTeamRoster as C
inner join (SELECT A.teamID as teamid, B.team as team, B.gametime as gametime from collegeteams as A inner join (select teamID, team, gametime from gametimes where week=$weekNum) as B on (A.teamID = B.teamID)) as D on (C.teamID = D.teamid) where position='$qPosition' order by team, PlayerName;";
	}
	echo $sql;
    $result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
			if ($defSelected) {
				if(isset($usedPlayerTable[$row["teamID"]])) {
					$playerArray[$index] = array(
						"playerName"=>$row["teamName"],
						"teamID"=>$row["teamID"],
						"timesUsed"=>$usedPlayerTable[$row["teamID"]],
						"gametime"=>$row["gametime"]
					);
				}
				else {
					$playerArray[$index] = array(
						"playerName"=>$row["teamName"],
						"teamID"=>$row["teamID"],
						"timesUsed"=>0,
						"gametime"=>$row["gametime"]
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
						"teamID"=>$row["teamID"],
						"timesUsed"=>$usedPlayerTable[$row["playerID"]],
						"gametime"=>$row["gametime"]
					);
				}
				else {
					$playerArray[$index] = array(
						"playerName"=>$row["playerName"],
						"playerAbbr"=>$row["PlayerAbbr"],
						"position"=>$row["position"],
						"team"=>$row["team"],
						"teamID"=>$row["teamID"],
						"timesUsed"=>0,
						"gametime"=>$row["gametime"]
					);
				}
			}
			$index++;
        }
    } else {
        echo "0 results";
    }
    //Output table to readTeamRoster.js
    echo json_encode($playerArray);
	
    
    $conn->close();
?>