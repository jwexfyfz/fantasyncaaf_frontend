<?php    
    $host		= "us-cdbr-iron-east-05.cleardb.net"; // Use Local Host Only      
    $username	= "b4078336a46f7e"; //DB User
    $password	= "10f5241c";  //Password
    $db_name	= "heroku_28ca4c386152c4f";  //DB Name
    
    //Connect to database
    $conn=mysqli_connect($host, $username, $password, $db_name);

	$weekNum = $_GET["weekNum"];
	$filteredPositions = $_GET["filteredPositions"];
	
    //Query to get team rosters
    $sql = "SELECT roster.playerName, abbreviations.abbreviation, roster.teamID, roster.position, gametimes.homeaway, gametimes.opponent, gametimes.gametime, sum(stats.gamesPlayed) as gamesPlayed, sum(stats.fantasyPoints) as fantasyPoints FROM collegeteamroster as roster left join abbreviations on roster.team = abbreviations.team left join (SELECT playerID, count(*) as gamesPlayed, sum(fantasyPoints) as fantasyPoints from offensestats group by 1) as stats on roster.playerID = stats.playerID left join (select allteams.teamID as teamID, if(homeAway = \"home\", away.abbreviation, home.abbreviation) as opponent, gametime, homeaway from gametimes as allteams left join (select gametimes.gameID, abbreviations.abbreviation from gametimes as gametimes left join abbreviations on gametimes.team = abbreviations.team where homeAway = \"home\" and week = $weekNum group by 1,2) as home on allteams.gameID = home.gameID inner join (select gametimes.gameID, abbreviations.abbreviation from gametimes as gametimes left join abbreviations on gametimes.team = abbreviations.team  where homeAway = \"away\" and week = $weekNum  group by 1,2) as away on allteams.gameID = away.gameID group by 1,2,3,4) as gametimes on roster.teamID = gametimes.teamID where roster.position in ('', $filteredPositions) group by 1,2,3,4,5,6,7 union (SELECT * FROM (SELECT roster.teamName, abbreviations.abbreviation, roster.teamID, \'DEF\' as position, gametimes.homeaway, gametimes.opponent, gametimes.gametime, sum(stats.gamesPlayed) as gamesPlayed, sum(stats.fantasyPoints) as fantasyPoints FROM collegeteams as roster left join abbreviations on roster.teamName = abbreviations.team left join (select teamID, count(teamName) as gamesPlayed, sum(fantasypoints) as fantasypoints from defensestats group by 1) as stats on roster.teamID = stats.teamID left join (select allteams.teamID as teamID, if(homeAway = \"home\", away.abbreviation, home.abbreviation) as opponent, gametime, homeaway from gametimes as allteams left join (select gametimes.gameID, abbreviations.abbreviation from gametimes as gametimes left join abbreviations on gametimes.team = abbreviations.team where homeAway = \"home\" and week = $weekNum group by 1,2) as home on allteams.gameID = home.gameID inner join (select gametimes.gameID, abbreviations.abbreviation from gametimes as gametimes left join abbreviations on gametimes.team = abbreviations.team  where homeAway = \"away\" and week = $weekNum  group by 1,2) as away on allteams.gameID = away.gameID group by 1,2,3,4) as gametimes on roster.teamID = gametimes.teamID group by 1,2,3,4,5,6,7) as B where position in ('', $filteredPositions)) order by fantasyPoints desc limit 100";
    $result = $conn->query($sql);

    $index = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $output[$index] = array(
				"playerName"=>$row["playerName"], 
				"team"=>$row["abbreviation"], 
				"position"=>$row["position"], 
				"homeaway"=>$row["homeaway"],
				"opponent"=>$row["opponent"],
				"gametime"=>$row["gametime"],
				"fantasyPoints"=>$row["fantasyPoints"]
			);
			$index++;
        }
    } else {
        echo "$sql";
    }
    //Output table to readTeamRoster.js
    echo json_encode($output);
	
    
    $conn->close();
?>