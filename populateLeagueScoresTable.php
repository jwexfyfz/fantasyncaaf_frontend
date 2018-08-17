<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$fantasyPoints = $_POST["fantasyPoints"];
	$teamID = $_POST["teamID"];
	$weekNum = $_POST["week"];

	//If you want: list of all players/teams (offense & defense) and their corresponding points per week
	//	input: <none>
	//	output: name (offense & defense), week, fantasyPoints
	//		name				week	fantasyPoints
	//		-----------------------------------------
	//		Keller Chryst		1		17.92
	//		Erik Powell			13		2.00
	//		UCLA				10		3.88
	//		Utah				13		9.00
	$sql = "select playerName name,week, fantasyPoints FROM offenseStats union select teamName name,week, fantasyPoints FROM defenseStats";
	
	//If you want: given a team ID and week, cumulative points scored for that week
	//	input: teamID, week
	//	output: total fantasy points for that week
	//		points
	//		------
	//		60.40
	$sql = "select sum(B.fantasyPoints) from teamRoster as A left join(select playerName name,week, fantasyPoints FROM offenseStats union select teamName name,week, fantasyPoints FROM defenseStats) as B on (A.playerName = B.name and A.week = B.week) where hasPlayed = 1 and A.teamID = 100 and A.week = 1";
	
	//If you want: every team's fantasy points (for the week) for every week in the season
	//	input: <none>
	//	output: week, teamID, fantasy points (cumulative for the week)
	//		teamID	week	points
	//		----------------------
	//		100		1		60.40
	//		101		1		64.06
	//		101		2		25.04
	$sql = "select A.teamID, A.week, sum(B.fantasyPoints) as fantasyPoints from teamRoster as A left join(select playerName name,week, fantasyPoints FROM offenseStats union select teamName name,week, fantasyPoints FROM defenseStats) as B on (A.playerName = B.name and A.week = B.week) where hasPlayed = 1 group by A.teamID, week";
	
	//If you want to get the total cumulative fantasy points for all teams, here's the query, which will output: teamName, fantasyPoints
	//	input: <none>
	//	output: teamID, fantasyPoints (cumulative)
	//		teamID	points
	//		--------------
	//		100		60.40
	//		101		89.10
	$sql = "select A.teamID, sum(B.fantasyPoints) as points from teamRoster as A inner join(select playerName name,week, fantasyPoints FROM offenseStats union select teamName name,week, fantasyPoints FROM defenseStats) as B on (A.playerName = B.name and A.week = B.week) where hasPlayed = 1 group by A.teamID";
	
	
	//Ignore this section, as this was originally used to populate leagueScores every time matchup.php loaded
    //Query to update timesPlayerUsed
	//$sql = "INSERT INTO leagueScores (pointsScored, teamID, week) VALUES ($fantasyPoints, $teamID, $week) ON DUPLICATE KEY UPDATE pointsScored=$fantasyPoints";
	$result = $conn->query($sql);
	
    $conn->close();
?>