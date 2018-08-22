<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_GET["weekNum"];
	$homeQB=$_GET["homeQB"];
	$homeRB1=$_GET["homeRB1"];
	$homeRB2=$_GET["homeRB2"];
	$homeWR1=$_GET["homeWR1"];
	$homeWR2=$_GET["homeWR2"];
	$homeWR3=$_GET["homeWR3"];
	$homeTE=$_GET["homeTE"];
	$homeDEF=$_GET["homeDEF"];
	$homeK=$_GET["homeK"];
	$homeFLEX=$_GET["homeFLEX"];
	
	$awayQB=$_GET["awayQB"];
	$awayRB1=$_GET["awayRB1"];
	$awayRB2=$_GET["awayRB2"];
	$awayWR1=$_GET["awayWR1"];
	$awayWR2=$_GET["awayWR2"];
	$awayWR3=$_GET["awayWR3"];
	$awayTE=$_GET["awayTE"];
	$awayDEF=$_GET["awayDEF"];
	$awayK=$_GET["awayK"];
	$awayFLEX=$_GET["awayFLEX"];
	
    //Query to get team rosters
    $sql = "SELECT playerName, playerAbbr FROM collegeTeamRoster where playerName in ('$homeQB', '$homeRB1', '$homeRB2', '$homeWR1', '$homeWR2', '$homeWR3', '$homeTE', '$homeK', '$homeFLEX', '$awayQB', '$awayRB1', '$awayRB2', '$awayWR1', '$awayWR2', '$awayWR3', '$awayTE', '$awayK', '$awayFLEX');";
    $result = $conn->query($sql);
	echo $sql;
	
	echo "<br><br>"
	
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