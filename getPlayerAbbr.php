<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$qQb=$_POST["qb"];
	$qRb1=$_POST["rb1"];
	$qRb2=$_POST["rb2"];
	$qWr1=$_POST["wr1"];
	$qWr2=$_POST["wr2"];
	$qWr3=$_POST["wr3"];
	$qTe=$_POST["te"];
	$qDef=$_POST["def"];
	$qK=$_POST["k"];
	$qFlex=$_POST["flex"];
	
    //Query to get team rosters
    $sql = "SELECT playerName, playerAbbr FROM collegeTeamRoster where playerName in ('$qQb', '$qRb1', '$qRb2', '$qWr1', '$qWr2', '$qWr3', '$qTe', '$qFlex');";
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

	
    //Output table to readTeamRoster.js
    echo json_encode($output);
	
    
    $conn->close();
?>