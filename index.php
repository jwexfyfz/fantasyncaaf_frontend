<?php 
require_once("./include/membersite_config.php");

if(!$fgmembersite->CheckLogin())
{
    $fgmembersite->RedirectToURL("login.php");
    exit;
}
echo json_encode($fgmembersite->getFantasyID());
header( 'Location: /index.html' ) ;  

    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	echo "Connected successfully\n\n";
	
	    //Queries to alter table	
		/*
		$sql = "ALTER TABLE kickerStats ADD playerID INT NULL;";
		$result = $conn->query($sql);
		
	    $sql = "ALTER TABLE kickerStats ADD playerAbbr VARCHAR(255) NULL;";
		$result = $conn->query($sql);
		*/
		//$sql = "ALTER TABLE offenseStats drop key `entryID`, add primary key(`playerID`, `week`);";
		$sql = "ALTER TABLE `offenseStats` ADD UNIQUE `unique_index`(`week`, `playerID`);";
		$result = $conn->query($sql);
		/*
		$sql = "ALTER TABLE kickerStats add primary key(playerID, week);";
		$result = $conn->query($sql);
		*/
		
		//Query to get team rosters
		//$sql = "SHOW KEYS FROM offenseStats WHERE Key_name = 'PRIMARY';";
		$sql = "describe offenseStats;";
		$result = $conn->query($sql);
		
		
	    if ($result->num_rows > 0) {
	        // output data of each row
	        while($row = $result->fetch_assoc()) {
				echo json_encode($row);
				echo "<br>";
			}
		}
		echo "End of results<br>";
	$conn->close();

?>



