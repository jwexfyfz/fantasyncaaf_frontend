<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_POST["weekNum"];
	$teamID = $_POST["teamIDNum"];

	//$sql = "select distinct C.teamName, C.playerName, C.week, C.position, D.gametime, C.fantasyID as teamID from (select A.playerName, B.playerID, B.teamID, A.position, A.week, A.teamName, A.teamID as fantasyID from (select playerName, position, teamID, week, teamName from teamroster where week=$weekNum and teamID=$teamID) as A inner join collegeteamroster as B on A.playerName=B.PlayerName or A.playerName=B.team) as C inner join gameTimes as D on C.teamID=D.teamID and D.week=$weekNum;";
	$sql = "select 
	distinct C.teamName, 
	C.playerName, 
	C.week, 
	C.position, 
	D.gametime, 
	D.abbreviation,
	D.homeaway,
	D.opponent,
	C.fantasyID as teamID 
from (
	select 
		A.playerName, 
		B.playerID, 
		B.teamID, 
		A.position, 
		A.week, 
		A.teamName, 
		A.teamID as fantasyID 
	from (
		select 
			playerName, 
			position, 
			teamID, 
			week, 
			teamName 
		from teamroster 
		where 
			week=$weekNum
			and teamID=$teamID
	) as A 
	inner join collegeteamroster as B on A.playerName=B.PlayerName or A.playerName=B.team
) as C 
inner join (
	SELECT 
		roster.playerName, 
		abbreviations.abbreviation, 
		roster.teamID, 
		roster.position, 
		gametimes.homeaway, 
		gametimes.opponent, 
		gametimes.gametime
	FROM collegeteamroster as roster 
	left join abbreviations on roster.team = abbreviations.team 
	left join (
		select 
			allteams.teamID as teamID, 
			if(homeAway = \"home\", away.abbreviation, home.abbreviation) as opponent, 
			gametime, 
			homeaway 
		from gametimes as allteams 
		left join (
			select 
				gametimes.gameID, 
				abbreviations.abbreviation 
			from gametimes as gametimes 
			left join abbreviations on gametimes.team = abbreviations.team 
			where 
				homeAway = \"home\" 
				and week = $weekNum
			group by 1,2
		) as home on allteams.gameID = home.gameID 
		inner join (
			select 
				gametimes.gameID, 
				abbreviations.abbreviation 
			from gametimes as gametimes 
			left join abbreviations on gametimes.team = abbreviations.team 
			where
				homeAway = \"away\" 
				and week = $weekNum 
			group by 1,2
		) as away on allteams.gameID = away.gameID 
		group by 1,2,3,4
	) as gametimes on roster.teamID = gametimes.teamID 
	group by 1,2,3,4,5,6,7
) as D on C.teamID=D.teamID";
    $result = $conn->query($sql);
	
    //Query to get team rosters
    //$sql = "SELECT * FROM teamRoster where teamID in ($teamID) and week in ($weekNum);";
	//$sql = "SELECT week, teamName, teamID, playerName, position FROM teamRoster where teamID in ($teamID);";
    //$result = $conn->query($sql);

	//Preset gametime values to null so you never get an undefined value
	$teamRoster["QB"]["gametime"] = "";
	$teamRoster["RB1"]["gametime"] = "";
	$teamRoster["RB2"]["gametime"] = "";
	$teamRoster["WR1"]["gametime"] = "";
	$teamRoster["WR2"]["gametime"] = "";
	$teamRoster["WR3"]["gametime"] = "";
	$teamRoster["TE"]["gametime"] = "";
	$teamRoster["DEF"]["gametime"] = "";
	$teamRoster["K"]["gametime"] = "";
	$teamRoster["FLEX"]["gametime"] = "";
	//Preset opponent values to null so you never get an undefined value
	$teamRoster["QB"]["opponent"] = "";
	$teamRoster["RB1"]["opponent"] = "";
	$teamRoster["RB2"]["opponent"] = "";
	$teamRoster["WR1"]["opponent"] = "";
	$teamRoster["WR2"]["opponent"] = "";
	$teamRoster["WR3"]["opponent"] = "";
	$teamRoster["TE"]["opponent"] = "";
	$teamRoster["DEF"]["opponent"] = "";
	$teamRoster["K"]["opponent"] = "";
	$teamRoster["FLEX"]["opponent"] = "";
	//Preset homeaway values to null so you never get an undefined value
	$teamRoster["QB"]["homeaway"] = "";
	$teamRoster["RB1"]["homeaway"] = "";
	$teamRoster["RB2"]["homeaway"] = "";
	$teamRoster["WR1"]["homeaway"] = "";
	$teamRoster["WR2"]["homeaway"] = "";
	$teamRoster["WR3"]["homeaway"] = "";
	$teamRoster["TE"]["homeaway"] = "";
	$teamRoster["DEF"]["homeaway"] = "";
	$teamRoster["K"]["homeaway"] = "";
	$teamRoster["FLEX"]["homeaway"] = "";

//    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {

			$position = $row["position"];
			$teamRoster[$row["week"]]["$position"] = $row["playerName"];
			$teamRoster[$row["week"]]["week"] = $row["week"];
			$teamRoster[$row["week"]]["teamID"] = $row["teamID"];
			$teamRoster[$row["week"]]["teamName"] = $row["teamName"];
			
			$teamRoster["$position"]["gametime"] = $row["gametime"];
			if($row["opponent"] = null) {
				$teamRoster["$position"]["opponent"] = "BYE"
			}
			else {
				if($row["homeaway"] = "away") {
					$teamRoster["$position"]["opponent"] = "@"+$row["opponent"];
				}
				else {
					$teamRoster["$position"]["opponent"] = $row["opponent"];
				}
			}			
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
    }
    //Output table to readTeamRoster.js
    echo json_encode($teamRoster);
	
    
    $conn->close();
?>