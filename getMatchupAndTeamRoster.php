<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$teamID = $_POST["teamIDNum"];
    //Query to get team rosters
    
	//Get the matchup schedule team IDs
	$sql = "SELECT homeTeamID, awayTeamID FROM matchupSchedule where (homeTeamID = $teamID or awayTeamID = $teamID) and week=$weekNum;";
    $result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            if($teamID == $row["homeTeamID"]) {
				$matchup["homeTeam"] = $row["homeTeamID"];
				$matchup["awayTeam"] = $row["awayTeamID"];
            } else {
				$matchup["homeTeam"] = $row["awayTeamID"];
				$matchup["awayTeam"] = $row["homeTeamID"];
            }
        }
    } else {
		$matchup["homeTeam"] = null;
		$matchup["awayTeam"] = null;
    }
	
	//Select teamRoster data for the home team
	$sql="SELECT teamID, position, playerName, teamName FROM teamRoster where teamID = $matchup['homeTeam'] and week in ($weekNum);"
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
			$teamRoster["homeTeam"][$row["position"]] = $row["playerName"];
			$teamRoster["homeTeam"]["week"] = $weekNum;
			$teamRoster["homeTeam"]["teamID"] = $row["teamID"];
			$teamRoster["homeTeam"]["teamName"] = $row["teamName"];
        }
    } else {
        //Set everything to null so at least you return something
        $teamRoster["homeTeam"] = array(
            "week"=>$weekNum, 
            "teamID"=>$teamID, 
			"teamName"=>null,
            "QB"=>null,
            "RB1"=>null, 
            "RB2"=>null, 
            "WR1"=>null, 
            "WR2"=>null, 
            "WR3"=>null, 
            "TE"=>null, 
            "K"=>null, 
            "DEF"=>null, 
            "FLEX"=>null);
    }
	
	//Do the same thing for the away team
	$sql="SELECT teamID, position, playerName, teamName FROM teamRoster where teamID = $matchup['awayTeam'] and week in ($weekNum);"
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
			$teamRoster["awayTeam"][$row["position"]] = $row["playerName"];
			$teamRoster["awayTeam"]["week"] = $weekNum;
			$teamRoster["awayTeam"]["teamID"] = $row["teamID"];
			$teamRoster["awayTeam"]["teamName"] = $row["teamName"];
        }
    } else {
        //Set everything to null so at least you return something
        $teamRoster["awayTeam"] = array(
            "week"=>$weekNum, 
            "teamID"=>$teamID, 
			"teamName"=>null,
            "QB"=>null,
            "RB1"=>null, 
            "RB2"=>null, 
            "WR1"=>null, 
            "WR2"=>null, 
            "WR3"=>null, 
            "TE"=>null, 
            "K"=>null, 
            "DEF"=>null, 
            "FLEX"=>null);
    }
    //Output table to readTeamRoster.js
    echo json_encode($teamRoster);
    
    $conn->close();
?>