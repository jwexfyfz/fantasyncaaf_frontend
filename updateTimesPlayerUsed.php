<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$playerID = $_POST["playerID"];
	$fantasyID = $_POST["fantasyID"];
	$weekNum = $_POST["weekNum"];
	$position = $_POST["position"];
    //Query to update timesPlayerUsed
	$sql = "INSERT INTO timesplayerused (playerID, teamID, timesUsed) VALUES ($playerID, $fantasyID, 1) ON DUPLICATE KEY UPDATE timesUsed=timesUsed+1";
	$result = $conn->query($sql);
	
	$sql = "UPDATE teamroster set hasPlayed = 1 where week = $weekNum and teamID = $fantasyID and position = \"$position\"";
	$result = $conn->query($sql);
    
	$sql = "select B.PlayerName, A.timesUsed from (select playerID, timesUsed from timesplayerused where playerID=$playerID and teamID=$fantasyID) as A inner join collegeteamroster as B on A.playerID=B.playerID";
	$result = $conn->query($sql);
	
	if ($result->num_rows > 0) {
		// output data of each row
        $index = 0;
		while($row = $result->fetch_assoc()) {
			if ($row["timesUsed" >= 5) {
				$usedUpPlayers[$index] = $row["PlayerName"];
				$index++;
			}
			else {
				$usedUpPlayers = null;
			}
		}	
	}
	else {
		$usedUpPlayers = null;
	}
	
	echo json_encode($usedUpPlayers);
	
    $conn->close();
?>