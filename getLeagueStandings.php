<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

    //Query to get team rosters
    $sql = "SELECT * FROM leagueStandings order by wins DESC, ties DESC";
    $result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $output[$index] = array("teamID"=>$row["teamID"], "wins"=>$row["wins"], "losses"=>$row["losses"], "ties"=>$row["ties"]);
			$index++;
        }
    } else {
        echo "0 results";
    }
    //Output table to readTeamRoster.js
    echo json_encode($output);
	
    
    $conn->close();
?>