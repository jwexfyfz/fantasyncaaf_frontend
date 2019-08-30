<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$fantasyID = $_POST["fantasyID"];
	$position = $_POST["position"];
	if (isset($_POST["playerName"])) {
		$playerName = urldecode($_POST["playerName"]);
	}
	else {
		$playerName = null;
	}
	if (isset($_POST["team"])) {
		$team = $_POST["team"];
	}
	else {
		$team = null;
	}
	
	//$gametimes[""] = "";
	
	$index = 0;
	if (isset($team)) {
		// Returns teamID, gametime for a given team
		// Input: week, teamID
		$sql = "SELECT abbreviations.abbreviation, roster.teamID, roster.team, gametimes.homeaway, gametimes.opponent, gametimes.gametime FROM collegeteamroster as roster left join abbreviations on roster.team = abbreviations.team left join ( select allteams.teamID as teamID, if(homeAway = \"home\", away.abbreviation, home.abbreviation) as opponent, gametime, homeaway from gametimes as allteams left join ( select gametimes.gameID, abbreviations.abbreviation from gametimes as gametimes left join abbreviations on gametimes.team = abbreviations.team where homeAway = \"home\" and week = $weekNum group by 1,2 ) as home on allteams.gameID = home.gameID inner join ( select gametimes.gameID, abbreviations.abbreviation from gametimes as gametimes left join abbreviations on gametimes.team = abbreviations.team where homeAway = \"away\" and week = $weekNum group by 1,2 ) as away on allteams.gameID = away.gameID group by 1,2,3,4 ) as gametimes on roster.teamID = gametimes.teamID left join collegeteams as collegeteams on roster.teamID = collegeteams.teamID where collegeteams.teamName = \"$team\" group by 1,2,3,4,5,6";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				$gametimes[$row["team"]]["gametime"] = $row["gametime"];
				if($row["homeaway"] == "away") {
					$gametimes[$row["team"]]["opponent"] = "@".$row["opponent"];
				}
				else {
					$gametimes[$row["team"]]["opponent"] = $row["opponent"];
				}
			}
		} 
	}
	elseif (isset($playerName)) {
		// Returns playerID, teamID, gametime for a given player
		// Input: week, playerName
		$sql = "SELECT roster.playerName, abbreviations.abbreviation, roster.teamID, roster.position, gametimes.homeaway, gametimes.opponent, gametimes.gametime FROM collegeteamroster as roster left join abbreviations on roster.team = abbreviations.team left join ( select allteams.teamID as teamID, if(homeAway = \"home\", away.abbreviation, home.abbreviation) as opponent, gametime, homeaway from gametimes as allteams left join ( select gametimes.gameID, abbreviations.abbreviation from gametimes as gametimes left join abbreviations on gametimes.team = abbreviations.team where homeAway = \"home\" and week = $weekNum group by 1,2 ) as home on allteams.gameID = home.gameID inner join ( select gametimes.gameID, abbreviations.abbreviation from gametimes as gametimes left join abbreviations on gametimes.team = abbreviations.team where homeAway = \"away\" and week = $weekNum group by 1,2 ) as away on allteams.gameID = away.gameID group by 1,2,3,4 ) as gametimes on roster.teamID = gametimes.teamID where roster.playerName = \"$playerName\" group by 1,2,3,4,5,6,7";
	
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				$gametimes[$row["playerName"]]["gametime"] = $row["gametime"];				
				if($row["homeaway"] == "away") {
					$gametimes[$row["playerName"]]["opponent"] = "@".$row["opponent"];
				}
				else {
					$gametimes[$row["playerName"]]["opponent"] = $row["opponent"];
				}
			}
		} 
	}
	
	/*
	$sql = "select distinct C.playerID, C.playerName, C.teamID, C.position, C.hasPlayed, D.gametime from (select A.playerName, B.playerID, B.teamID, A.position, A.hasPlayed from (select playerName, position, hasPlayed from teamroster where week=$weekNum and teamID=$fantasyID and position=\"$position\") as A inner join collegeteamroster as B on A.playerName=B.PlayerName or A.playerName=B.team) as C inner join gameTimes as D on C.teamID=D.teamID and week=$weekNum";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$gametimes[$row["playerName"]] = $row["gametime"];
		}
	} 
	*/
    
    //Output table to testpage2.js
	echo json_encode($gametimes);
	
    
    $conn->close();
?>