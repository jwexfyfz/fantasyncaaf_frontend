<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$fantasyID = $_POST["fantasyID"];
    //Query to get playerID, fantasyID, position, hasPlayed, gametime for each player on a given (week, team)
    //$sql = "select distinct C.playerID, C.teamID, C.selector, D.gametime from (select A.player, B.playerID, B.teamID, A.selector from (select QB as player, 'inputQB' as selector from teamRoster where week=$weekNum and teamID=$fantasyID union select RB1 as player, 'inputRB1' as selector from teamRoster where week=$weekNum and teamID=$fantasyID union select RB2 as player, 'inputRB2' as selector from teamRoster where week=$weekNum and teamID=$fantasyID union select WR1 as player, 'inputWR1' as selector from teamRoster where week=$weekNum and teamID=$fantasyID union select WR2 as player, 'inputWR2' as selector from teamRoster where week=$weekNum and teamID=$fantasyID union select WR3 as player, 'inputWR3' as selector from teamRoster where week=$weekNum and teamID=$fantasyID union select TE as player, 'inputTE' as selector from teamRoster where week=$weekNum and teamID=$fantasyID union select K as player, 'inputK' as selector from teamRoster where week=$weekNum and teamID=$fantasyID union select DEF as player, 'inputDEF' as selector from teamRoster where week=$weekNum and teamID=$fantasyID union select UTIL as player, 'inputFLEX' as selector from teamRoster where week=$weekNum and teamID=$fantasyID) as A inner join collegeTeamRoster as B on A.player=B.PlayerName or A.player=B.team) as C inner join gameTimes as D on C.teamID=D.teamID and week=$weekNum";
	$sql = "select distinct C.playerID, C.teamID, C.position, C.hasPlayed, D.gametime from (select A.playerName, B.playerID, B.teamID, A.position, A.hasPlayed from (select playerName, position, hasPlayed from teamroster where week=$weekNum and teamID=$fantasyID) as A inner join collegeteamroster as B on A.playerName=B.PlayerName or A.playerName=B.team) as C inner join gameTimes as D on C.teamID=D.teamID and week=$weekNum";
	$result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $playerID = $row["playerID"];
			$teamID = $row["teamID"];
			//$selector = $row["selector"];
			$position = $row["position"];
			$hasPlayed = $row["hasPlayed"];
			$gametime = $row["gametime"];

            
            //Assign rows from table to gametimes array
			$gametimes[$index] = array(
				"playerID"=>$playerID,
				"teamID"=>$teamID,
				//"selector"=>$selector,
				"position"=>$position,
				"hasPlayed"=>$hasPlayed,
				"gametime"=>$gametime);

            $index++;
        }
    } else {
        //Set everything to null so at least you return something
		$gametimes[0] = array(
			"playerID"=>null,
			"teamID"=>null,
			//"selector"=>null,
			"position"=>null,
			"hasPlayed"=>null,
			"gametime"=>null);
    }
    //Output table to testpage2.js
	echo json_encode($gametimes);
	
    
    $conn->close();
?>