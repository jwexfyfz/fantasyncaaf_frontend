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
    
	if($teamID == "allTeams") {
		$sql = "SELECT homeTeamID, awayTeamID FROM matchupSchedule where week=$weekNum;";
	}
	else {
		$sql = "SELECT homeTeamID, awayTeamID FROM matchupSchedule where (homeTeamID in ($teamID) or awayTeamID in ($teamID)) and week=$weekNum;";
	}
	
    $result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            if($teamID == $row["homeTeamID"]) {
				$output[$index]["homeTeam"] = $row["homeTeamID"];
				$output[$index]["awayTeam"] = $row["awayTeamID"];
            } else {
				$output[$index]["homeTeam"] = $row["awayTeamID"];
				$output[$index]["awayTeam"] = $row["homeTeamID"];
            }
			$index++;
        }
    } else {
		$output[$index]["homeTeam"] = null;
		$output[$index]["awayTeam"] = null;
    }
    //Output table to readTeamRoster.js
    echo json_encode($output);
	
    
    $conn->close();
?>