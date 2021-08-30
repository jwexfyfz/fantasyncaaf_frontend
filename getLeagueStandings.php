<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

    //Get the rotiserrie league flag for if statement to change query if roto league
    $sql = "SELECT val FROM flags WHERE flag = 'isRotoLeague'";
    $result = $conn->query($sql);
	
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $rotoFlag = $row["val"];
        }
    } else {
        $rotoFlag = 0;
    }

	if($rotoFlag) {
	    //Query to get team rosters
	    $sql = "SELECT LS.*, D.division FROM leagueStandings as LS left join divisions as D on LS.teamID = D.teamID order by pointsFor DESC, wins DESC, losses ASC, divisionWins DESC, divisionLosses ASC, pointsAgainst ASC";
	}
	else {
	    //Query to get team rosters
	    $sql = "SELECT LS.*, D.division FROM leagueStandings as LS left join divisions as D on LS.teamID = D.teamID order by wins DESC, losses ASC, divisionWins DESC, divisionLosses ASC, pointsFor DESC, pointsAgainst ASC";
	}
    
    $result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $output[$index] = array(
				"teamID"=>$row["teamID"], 
				"wins"=>$row["wins"], 
				"losses"=>$row["losses"], 
				"divisionWins"=>$row["divisionWins"],
				"divisionLosses"=>$row["divisionLosses"],
				"pointsFor"=>$row["pointsFor"],
				"pointsAgainst"=>$row["pointsAgainst"],
				"division"=>$row["division"]
			);
			$index++;
        }
    } else {
        echo "0 results";
    }
    //Output table to readTeamRoster.js
    echo json_encode($output);
	
    
    $conn->close();
?>