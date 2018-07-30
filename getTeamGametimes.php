



<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];

	$sql = "select A.teamID as teamid, B.team as team, B.gametime as gametime from collegeteams as A inner join (select teamID, team, gametime from gametimes where week=$weekNum) as B on (A.teamID = B.teamID)";
	$result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $team = $row["team"];
			$teamID = $row["teamID"];
			$gametime = $row["gametime"];

            
            //Assign rows from table to gametimes array
			$gametimes[$index] = array(
				"team"=>$team,
				"teamID"=>$teamID,
				"gametime"=>$gametime);

            $index++;
        }
    } else {
        //Set everything to null so at least you return something
		$gametimes[0] = array(
			"team"=>null,
			"teamID"=>null,
			"gametime"=>null);
    }
    //Output table to testpage2.js
	echo json_encode($gametimes);
	
    
    $conn->close();
?>