<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_GET["weekNum"];
	
    //Query to get team rosters
    $sql = "SELECT roster.playerName, roster.team, roster.teamID, roster.position, gametimes.homeaway, gametimes.opponent, gametimes.gametime, sum(stats.gamesPlayed) as gamesPlayed, sum(stats.fantasyPoints) as fantasyPoints FROM collegeteamroster as roster left join (SELECT playerID, count(*) as gamesPlayed, sum(fantasyPoints) as fantasyPoints from offensestats group by 1) as stats on roster.playerID = stats.playerID left join (select allteams.teamID as teamID, if(homeAway = \"home\", away.team, home.team) as opponent, gametime, homeaway from gametimes as allteams left join (select gameID, team from gametimes where homeAway = \"home\" and week = $weekNum group by 1,2) as home on allteams.gameID = home.gameID inner join (select gameID, team from gametimes where homeAway = \"away\" and week = $weekNum  group by 1,2) as away on allteams.gameID = away.gameID group by 1,2,3,4) as gametimes on roster.teamID = gametimes.teamID group by 1,2,3,4,5,6,7 order by stats.fantasyPoints desc limit 100";
    $result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $output[$index] = array(
				"playerName"=>$row["playerName"], 
				"team"=>$row["team"], 
				"position"=>$row["position"], 
				"homeaway"=>$row["homeaway"],
				"opponent"=>$row["opponent"],
				"gametime"=>$row["gametime"],
				"fantasyPoints"=>$row["fantasyPoints"]
			);
			$index++;
        }
    } else {
        echo "0 results";
    }
    //Output table to readTeamRoster.js
    echo json_encode($output);
	
    
    $conn->close();
?>