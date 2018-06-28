<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$teamID = $_POST["teamIDNum"];
    //Query to get team rosters
    $sql = "SELECT * FROM teamRoster where teamID in ($teamID) and week in ($weekNum);";
	//$sql = "SELECT week, teamName, teamID, playerName, position FROM teamRoster where teamID in ($teamID);";
    $result = $conn->query($sql);

//    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            /*$week = $row["week"];
            $teamName = $row["teamName"];
            $teamID = $row["teamID"];
            $QB = $row["QB"];
            $RB1 = $row["RB1"];
            $RB2 = $row["RB2"];
            $WR1 = $row["WR1"];
            $WR2 = $row["WR2"];
            $WR3 = $row["WR3"];
            $TE = $row["TE"];
            $K = $row["K"];
            $DEF = $row["DEF"];
            $FLEX = $row["FLEX"];
            */
			$position = $row["position"];
			$teamRoster[$row["week"]]["$position"] = $row["playerName"];
			$teamRoster[$row["week"]]["week"] = $row["week"];
			$teamRoster[$row["week"]]["teamName"] = $row["teamName"];
			$teamRoster[$row["week"]]["teamID"] = $row["teamID"];
			
            //echo "Finished reading row ".$index."<br>";
            
            //Assign rows from table to team roster array
            /*$teamRoster[$week] = array(
                "week"=>$week, 
                "teamName"=>$teamName, 
                "teamID"=>$teamID, 
                "QB"=>$QB,
                "RB1"=>$RB1, 
                "RB2"=>$RB2, 
                "WR1"=>$WR1, 
                "WR2"=>$WR2, 
                "WR3"=>$WR3, 
                "TE"=>$TE, 
                "K"=>$K, 
                "DEF"=>$DEF, 
                "FLEX"=>$FLEX);
*/
/*
            //Print team roster
            foreach($teamRoster as $key => $value) {
                echo $key.": ".$value."<br>";
            }
*/
//            $index++;
        }
    } else {
        //Set everything to null so at least you return something
        $teamRoster[$weekNum] = array(
            "week"=>$weekNum, 
			"teamName"=>null,
            "teamID"=>$teamID, 
            "QB"=>null,
            "RB1"=>null, 
            "RB2"=>null, 
            "WR1"=>null, 
            "WR2"=>null, 
            "WR3"=>null, 
            "TE"=>null, 
            "K"=>null, 
            "DEF"=>null, 
            "FLEX"=>null);
    }
    //Output table to readTeamRoster.js
    echo json_encode($teamRoster);
	
    
    $conn->close();
?>