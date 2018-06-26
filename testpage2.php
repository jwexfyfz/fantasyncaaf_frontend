<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);
	
	$input = "";

	if (isset($_POST["weekNum"]) && isset($_POST["teamIDNum"])) {
		$week = $_POST["weekNum"];
		$teamID = $_POST["teamIDNum"];
		
		if (isset($_POST["QBtophp"])) {
			$input = $_POST["QBtophp"];
			$position = "QB";
		}
		elseif (isset($_POST["RB1tophp"])) {
			$input = $_POST["RB1tophp"];
			$position = "RB1";
		}
		elseif (isset($_POST["RB2tophp"])) {
			$input = $_POST["RB2tophp"];
			$position = "RB2";
		}
		elseif (isset($_POST["WR1tophp"])) {
			$input = $_POST["WR1tophp"];
			$position = "WR1";
		}
		elseif (isset($_POST["WR2tophp"])) {
			$input = $_POST["WR2tophp"];
			$position = "WR2";
		}
		elseif (isset($_POST["WR3tophp"])) {
			$input = $_POST["WR3tophp"];
			$position = "WR3";
		}
		elseif (isset($_POST["TEtophp"])) {
			$input = $_POST["TEtophp"];
			$position = "TE";
		}
		elseif (isset($_POST["Ktophp"])) {
			$input = $_POST["Ktophp"];
			$position = "K";
		}
		elseif (isset($_POST["DEFtophp"])) {
			$input = $_POST["DEFtophp"];
			$position = "DEF";
		}
		elseif (isset($_POST["FLEXtophp"])) {
			$input = $_POST["FLEXtophp"];
			$position = "UTIL";
		}
		else {
			echo "Error: Something went wrong when passing info to PHP.  Please contact Jeff about this";
		}
			$sql = "UPDATE teamRoster set $position = \"$input\" where teamID = $teamID and week = $week;";
			echo $sql;
			$result = $conn->query($sql);
	}
	else {
		echo "Error: Something went wrong when passing info to PHP.  Please contact Jeff about this";
	}
	
    
	
	
    
    $conn->close();
?>