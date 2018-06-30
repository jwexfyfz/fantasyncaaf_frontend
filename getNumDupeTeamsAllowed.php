<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$conference = $_POST["conference"];
	
    //Query to get number of teams in the conference
	$sql = "select COUNT(*) as numTeams from collegeteams where league=\"$conference\"";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$numTeams = $row["numTeams"];
		}
	}
	
	//Query to get number of conference teams playing in the current week
	$sql = "select COUNT(*) as numTeamsPlaying from (select team from gametimes where week=$weekNum) as A inner join (select * from collegeteams where league=\"$conference\") as B on A.team=B.teamName";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$numTeamsPlaying = $row["numTeamsPlaying"];
		}
	}
	
    //Output table to testpage2.js
	echo json_encode($numTeams-$numTeamsPlaying);
	
    
    $conn->close();
?>