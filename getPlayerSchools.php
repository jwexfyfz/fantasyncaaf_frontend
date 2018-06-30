<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$fantasyID = $_POST["fantasyID"];
    //Query to get playerNames and teams for each person on the roster in a given week including defense
	$sql = "select C.team, count(*) as teamCount from (select distinct A.playerName, B.team from (select playerName from teamroster where teamID=$fantasyID and week=$weekNum) as A inner join collegeTeamRoster as B on A.playerName=B.PlayerName or A.PlayerName = B.team) as C group by team;";
	
	$result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $teamName = $row["team"];
			$teamCount = $row["teamCount"];
            
            //Assign rows from table to teamCounts array
			$teamCounts[$index] = array(
				"teamName"=>$teamName,
				"teamCount"=>$teamCount
			);

            $index++;
        }
    } else {
        //Set everything to null so at least you return something
		$teamCounts[0] = array(
			"teamName"=>null,
			"teamCount"=>null
		);
    }
    //Output table to testpage2.js
	echo json_encode($teamCounts);
	
    
    $conn->close();
?>