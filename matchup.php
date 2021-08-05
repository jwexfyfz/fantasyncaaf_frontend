<?php 
require_once("./include/membersite_config.php");

if(!$fgmembersite->CheckLogin())
{
    $fgmembersite->RedirectToURL("login.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>
	
	<!--These are for the custom select styling taken from GitHub for the team roster-->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
	<link rel="stylesheet" href="dist/css/bootstrap-select.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.js" defer></script>
	<script src="dist/js/bootstrap-select.js" defer></script>
	
	<input type="hidden" id="teamName" value="<?php echo $fgmembersite->getTeamName() ?>" />
	<input type="hidden" id="teamID" value="<?php echo $fgmembersite->getFantasyID() ?>" />
    <script type="text/javascript" src="matchup.js" ></script>
    <script type="text/javascript" src="header.js" ></script>
	<link rel="stylesheet" type="text/css" href="header.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="matchup.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="weekSelect.css" media="screen" />
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
</head>
	<body>
		<div id="unclickable"></div>
		<div id="headerWrapper">
			<table class="headerTable" id="currentWeekDisplayTable">
				<tr style="height:20px">
				</tr>
				<tr>
					<th class="headerTableColumn"></th>
					<th class="headerTableColumn" id="gameLogoBox"></th>
					<th class="headerTableColumn" id="currentWeekBox">
						<div id="accountAvatar">
							<?php 
								$string = $fgmembersite->getTeamName(); 
								preg_match('/(^\w)/', $string, $match);
								$output = strtolower($match[1][0]);
								echo $output;
							?>
						</div>
						<div class="custom-select" style="width:160px; position:absolute; right:0; top:0; float:right; display:none;">
							<select id="currentWeekNum">
								<option value="1">Week 1</option>
								<option value="2">Week 2</option>
								<option value="3">Week 3</option>
								<option value="4">Week 4</option>
								<option value="5">Week 5</option>
								<option value="6">Week 6</option>
								<option value="7">Week 7</option>
								<option value="8">Week 8</option>
								<option value="9">Week 9</option>
								<option value="10">Week 10</option>
								<option value="11">Week 11</option>
								<option value="12">Week 12</option>
								<option value="13">Week 13</option>
								<option value="14">Week 14</option>
								<option value="15">Week 15</option>
								<option value="16">Week 16</option>
							</select>
						</div>
					</th>
				</tr>
			</table>
			<table class="headerTable">
				<th class="headerTableColumn" id="headerTableColumn1">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">Standings</div>
					<div class="arrow-up hidden-arrow"></div>
				</th>
				<th class="headerTableColumn activeHeaderColumn" id="headerTableColumn3">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">Match Up</div>
					<div class="arrow-up"></div>
				</th>
				<th class="headerTableColumn" id="headerTableColumn2">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">My Team</div>
					<div class="arrow-up hidden-arrow"></div>
				</th>
				<th class="headerTableColumn" id="headerTableColumn4">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">Players</div>
					<div class="arrow-up hidden-arrow"></div>
				</th>
			</table>
		</div>
		<!--Have a blank row so that content at top gets pushed underneath header-->
		
		<!--<div id="content">-->
<!--			<table class="headerTable">
				<tr style="height: 121px"></tr>
-->	<!--
				<tr>
					<td class="leftAlignTableCell">
					</td>
					<td class="rightAlignTableCell">
						<button id="allMatchupsButton">All Matchups</button>
					</td>
				</tr>
	-->
<!--				<tr style="height:25px"></tr>
			</table>
-->	
			<div id="flexCardContainer" style="margin-top: 131px">
				<div class="flexCard" id="matchupCard">
					<table id="myTeamMatchupTable">
						<tr>
							<th class="matchupTotalScore matchupHeading home" id="homeTeamScore" colspan="5"></th>
							<th class="matchupTotalScore matchupHeading away" id="awayTeamScore" colspan="5"></th>
						</tr>
						<tr>
							<th class="matchupHeadingTeamName matchupHeading home" id="homeTeamName" colspan="5" style="font-size: 1.1em"></th>
							<th class="matchupHeadingTeamName matchupHeading away" id="awayTeamName" colspan="5" style="font-size: 1.1em"></th>
						</tr>
						<tr class="playerRowOneToNine">
							<td class="chosenQB homeSide chosenPosition home smallerSize" id="homeQB" colspan="2"></td>
							<td class="chosenQBPoints chosenPositionPoints homeSide home smallerSize" id="homeQBPoints" colspan="2"></td>
							<td class="position" colspan="2">QB</td>
							<td class="chosenQBPoints chosenPositionPoints away smallerSize" id="awayQBPoints" colspan="2"></td>
							<td class="chosenQB chosenPosition away smallerSize" id="awayQB" colspan="2"></td>
						</tr>
						<tr class="playerRowOneToNine">
							<td class="chosenRB1 homeSide chosenPosition home smallerSize" id="homeRB1" colspan="2"></td>
							<td class="chosenRB1Points chosenPositionPoints homeSide home smallerSize" id="homeRB1Points" colspan="2"></td>
							<td class="position" colspan="2">RB1</td>
							<td class="chosenRB1Points chosenPositionPoints away smallerSize" id="awayRB1Points" colspan="2"></td>
							<td class="chosenRB1 chosenPosition away smallerSize" id="awayRB1" colspan="2"></td>
						</tr>
						<tr class="playerRowOneToNine">
							<td class="chosenRB2 homeSide chosenPosition home smallerSize" id="homeRB2" colspan="2"></td>
							<td class="chosenRB2Points chosenPositionPoints homeSide home smallerSize" id="homeRB2Points" colspan="2"></td>
							<td class="position" colspan="2">RB2</td>
							<td class="chosenRB2Points chosenPositionPoints away smallerSize" id="awayRB2Points" colspan="2"></td>
							<td class="chosenRB2 chosenPosition away smallerSize" id="awayRB2" colspan="2"></td>
						</tr>
						<tr class="playerRowOneToNine">
							<td class="chosenWR1 homeSide chosenPosition home smallerSize" id="homeWR1" colspan="2"></td>
							<td class="chosenWR1Points chosenPositionPoints homeSide home smallerSize" id="homeWR1Points" colspan="2"></td>
							<td class="position" colspan="2">WR1</td>
							<td class="chosenWR1Points chosenPositionPoints away smallerSize" id="awayWR1Points" colspan="2"></td>
							<td class="chosenWR1 chosenPosition away smallerSize" id="awayWR1" colspan="2"></td>
						</tr>
						<tr class="playerRowOneToNine">
							<td class="chosenWR2 homeSide chosenPosition home smallerSize" id="homeWR2" colspan="2"></td>
							<td class="chosenWR2Points chosenPositionPoints homeSide home smallerSize" id="homeWR2Points" colspan="2"></td>
							<td class="position" colspan="2">WR2</td>
							<td class="chosenWR2Points chosenPositionPoints away smallerSize" id="awayWR2Points" colspan="2"></td>
							<td class="chosenWR2 chosenPosition away smallerSize" id="awayWR2" colspan="2"></td>
						</tr>
						<tr class="playerRowOneToNine">
							<td class="chosenWR3 homeSide chosenPosition home smallerSize" id="homeWR3" colspan="2"></td>
							<td class="chosenWR3Points chosenPositionPoints homeSide home smallerSize" id="homeWR3Points" colspan="2"></td>
							<td class="position" colspan="2">WR3</td>
							<td class="chosenWR3Points chosenPositionPoints away smallerSize" id="awayWR3Points" colspan="2"></td>
							<td class="chosenWR3 chosenPosition away smallerSize" id="awayWR3" colspan="2"></td>
						</tr>
						<tr class="playerRowOneToNine">
							<td class="chosenTE homeSide chosenPosition home smallerSize" id="homeTE" colspan="2"></td>
							<td class="chosenTEPoints chosenPositionPoints homeSide home smallerSize" id="homeTEPoints" colspan="2"></td>
							<td class="position" colspan="2">WR/TE</td>
							<td class="chosenTEPoints chosenPositionPoints away smallerSize" id="awayTEPoints" colspan="2"></td>
							<td class="chosenTE chosenPosition away smallerSize" id="awayTE" colspan="2"></td>
						</tr>
						<tr class="playerRowOneToNine">
							<td class="chosenDEF homeSide chosenPosition home smallerSize" id="homeDEF" colspan="2"></td>
							<td class="chosenDEFPoints chosenPositionPoints homeSide home smallerSize" id="homeDEFPoints" colspan="2"></td>
							<td class="position" colspan="2">DEF</td>
							<td class="chosenDEFPoints chosenPositionPoints away smallerSize" id="awayDEFPoints" colspan="2"></td>
							<td class="chosenDEF chosenPosition away smallerSize" id="awayDEF" colspan="2"></td>
						</tr>
						<tr class="playerRowOneToNine">
							<td class="chosenK homeSide chosenPosition home smallerSize" id="homeK" colspan="2"></td>
							<td class="chosenKPoints chosenPositionPoints homeSide home smallerSize" id="homeKPoints" colspan="2"></td>
							<td class="position" colspan="2">K</td>
							<td class="chosenKPoints chosenPositionPoints away smallerSize" id="awayKPoints" colspan="2"></td>
							<td class="chosenK chosenPosition away smallerSize" id="awayK" colspan="2"></td>
						</tr>
						<tr>
							<td class="chosenFLEX homeSide chosenPosition home smallerSize" id="homeFLEX" colspan="2"></td>
							<td class="chosenFLEXPoints chosenPositionPoints homeSide home smallerSize" id="homeFLEXPoints" colspan="2"></td>
							<td class="position" colspan="2">FLEX</td>
							<td class="chosenFLEXPoints chosenPositionPoints away smallerSize" id="awayFLEXPoints" colspan="2"></td>
							<td class="chosenFLEX chosenPosition away smallerSize" id="awayFLEX" colspan="2"></td>
						</tr>
					</table>
				</div>
			</div>
			<table id="aroundTheLeagueTable">
				<tr>
					<td id="aroundTheLeague">Around The League</td>
				</tr>
			</table>
			<table id="hiddenMatchupsTable"></table>
		
			<!--This section is to show the week dropdown-->
			<div class="fixedPosition" id="weekScrollContainer">
				<div id="weekSelectBackground"></div>
			  <div class="circle" style="position: absolute; top:0;"></div>
			  <div class="circle" style="position: absolute; bottom:0; 	box-shadow: 2px 2px 4px -4px rgba(0, 0, 0, 0.2);"></div>
		
	  		<div id="scrollable">
	  			<div class="circle weekSelectCircle" id="week16Circle">16</div>
	  			<div class="circle weekSelectCircle" id="week15Circle">15</div>
	  			<div class="circle weekSelectCircle" id="week14Circle">14</div>
	  			<div class="circle weekSelectCircle" id="week13Circle">13</div>
	  			<div class="circle weekSelectCircle" id="week12Circle">12</div>
	  			<div class="circle weekSelectCircle" id="week11Circle">11</div>
	  			<div class="circle weekSelectCircle" id="week10Circle">10</div>
	  			<!--<div class="circle weekSelectCircle" id="week9Circle">9</div>
	  			<div class="circle weekSelectCircle" id="week8Circle">8</div>
	  			<div class="circle weekSelectCircle" id="week7Circle">7</div>
	  			<div class="circle weekSelectCircle" id="week6Circle">6</div>
	  			<div class="circle weekSelectCircle" id="week5Circle">5</div>
	  			<div class="circle weekSelectCircle" id="week4Circle">4</div>
	  			<div class="circle weekSelectCircle" id="week3Circle">3</div>
	  			<div class="circle weekSelectCircle" id="week2Circle">2</div>
	  			<div class="circle weekSelectCircle" id="week1Circle">1</div>-->
	  		</div>

			</div>

			<a href="#">
				<p id="weekLabel">WEEK</p>
				<div class="fixedPosition circle" id ="currentWeekCircle"></div>
			</a>
		
			<!--This section is for when the user clicks on the avatar icon, this is the expanded menu-->
			<div id="accountMenu">
				<div class="arrow-up" id="accountArrow"></div>
				<a href="change-pwd.php">
					<div class="accountMenuRowTop">
						Change Password
					</div>
				</a>
				<a href="logout.php">
					<div class="accountMenuRowBottom">
						Logout
					</div>
				</a>
			</div>
		
		    <script type="text/javascript" src="weekSelect.js" ></script>
			<!--</div>-->
	</body>
</html>