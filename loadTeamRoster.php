<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_GET["weekNum"];
	$teamID = $_GET["teamIDNum"];

	$sql = "select distinct C.teamName, C.playerName, C.week, C.position, D.gametime, C.fantasyID as teamID from (select A.playerName, B.playerID, B.teamID, A.position, A.week, A.teamName, A.teamID as fantasyID from (select playerName, position, teamID, week, teamName from teamroster where week=$weekNum and teamID=$teamID) as A inner join collegeteamroster as B on A.playerName=B.PlayerName or A.playerName=B.team) as C inner join gameTimes as D on C.teamID=D.teamID and D.week=$weekNum;";
	
    //Query to get team rosters
    //$sql = "SELECT * FROM teamRoster where teamID in ($teamID) and week in ($weekNum);";
	//$sql = "SELECT week, teamName, teamID, playerName, position FROM teamRoster where teamID in ($teamID);";
    //$result = $conn->query($sql);

//    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {

			$position = $row["position"];
			$teamRoster[$row["week"]]["$position"] = $row["playerName"];
			$teamRoster["$position"]["gametime"] = $row["gametime"];
			$teamRoster[$row["week"]]["week"] = $row["week"];
			$teamRoster[$row["week"]]["teamID"] = $row["teamID"];
			$teamRoster[$row["week"]]["teamName"] = $row["teamName"];
        }
    } else {
        //Set everything to null so at least you return something
        $teamRoster[$weekNum] = array(
            "week"=>$weekNum, 
            "teamID"=>$teamID, 
			"teamName"=>null,
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
		$teamRoster["$position"]["gametime"] = null;
    }
    //Output table to readTeamRoster.js
    echo json_encode($teamRoster);
	
    
    $conn->close();
?>