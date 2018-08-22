<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$homeQB=$_POST["homeQB"];
	$homeRB1=$_POST["homeRB1"];
	$homeRB2=$_POST["homeRB2"];
	$homeWR1=$_POST["homeWR1"];
	$homeWR2=$_POST["homeWR2"];
	$homeWR3=$_POST["homeWR3"];
	$homeTE=$_POST["homeTE"];
	$homeDEF=$_POST["homeDEF"];
	$homeK=$_POST["homeK"];
	$homeFLEX=$_POST["homeFLEX"];
	
	$awayQB=$_POST["awayQB"];
	$awayRB1=$_POST["awayRB1"];
	$awayRB2=$_POST["awayRB2"];
	$awayWR1=$_POST["awayWR1"];
	$awayWR2=$_POST["awayWR2"];
	$awayWR3=$_POST["awayWR3"];
	$awayTE=$_POST["awayTE"];
	$awayDEF=$_POST["awayDEF"];
	$awayK=$_POST["awayK"];
	$awayFLEX=$_POST["awayFLEX"];
	
    //Query to get team rosters
    $sql = "SELECT playerName, playerAbbr FROM collegeTeamRoster where playerName in ('$homeQB', '$homeRB1', '$homeRB2', '$homeWR1', '$homeWR2', '$homeWR3', '$homeTE', '$homeK', '$homeFLEX', '$awayQB', '$awayRB1', '$awayRB2', '$awayWR1', '$awayWR2', '$awayWR3', '$awayTE', '$awayK', '$awayFLEX');";
    $result = $conn->query($sql);
	//echo $sql;
	
	//$playersAndPoints = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $output[$row["playerName"]] = $row["playerAbbr"];
        }
	}
	$output[""] = "";
	$output["Arizona"] = "Arizona";
	$output["Arizona State"] = "Arizona State";
	$output["California"] = "California";
	$output["Colorado"] = "Colorado";
	$output["Oregon"] = "Oregon";
	$output["Oregon State"] = "Oregon State";
	$output["Stanford"] = "Stanford";
	$output["UCLA"] = "UCLA";
	$output["USC"] = "USC";
	$output["Utah"] = "Utah";
	$output["Washington"] = "Washington";
	$output["Washington State"] = "Washington State";
	

	
    //Output table to readTeamRoster.js
    echo json_encode($output);
	
    
    $conn->close();
?>