<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$fantasyID = $_POST["fantasyID"];
	$weekNum = $_POST["weekNum"];
	$playerName = $_POST["playerName"];

    //Query to update teamRoster
	$sql = "UPDATE teamroster set playerName = "" where week = $weekNum and teamID = $fantasyID and playerName = \"$playerName\"";
	$result = $conn->query($sql);
	
    $conn->close();
?>