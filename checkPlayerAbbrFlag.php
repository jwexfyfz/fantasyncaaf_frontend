<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	
    //Query to get team rosters
    $sql = "select val from flags where flag='playerAbbr';";
    $result = $conn->query($sql);
	//echo $sql;
	
	//$playersAndPoints = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $output = $row["val"];
        }
	}

    //Output table to readTeamRoster.js
    echo $output;
	
    
    $conn->close();
?>