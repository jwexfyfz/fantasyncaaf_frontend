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
	
	<input type="hidden" id="teamID" value="<?php echo $fgmembersite->getFantasyID() ?>" />
    <script type="text/javascript" src="matchup.js" ></script>
	<link rel="stylesheet" type="text/css" href="header.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="weekSelect.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="matchup.css" media="screen" />
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
</head>
	<body>
		<div id="headerWrapper">
			<table class="headerTable" id="currentWeekDisplayTable">
				<tr style="height:10px">
				</tr>
				<tr>
					<th class="headerTableColumn" id="avatarBox"></th>
					<th class="headerTableColumn" id="currentWeekBox">
					<div class="custom-select" style="width:160px; position:absolute; right:0; top:0; float:right">
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
			</table>
		</div>
		<!--Have a blank row so that content at top gets pushed underneath header-->

		<table class="headerTable">
			<tr style="height: 114px"></tr>
<!--
			<tr>
				<td class="leftAlignTableCell">
				</td>
				<td class="rightAlignTableCell">
					<button id="allMatchupsButton">All Matchups</button>
				</td>
			</tr>
-->
			<tr style="height:25px"></tr>
		</table>
	
		<div class="flexCard" id="matchupCard">
			<table id="myTeamMatchupTable">
			<tr>
				<th class="matchupTotalScore matchupHeading" id="homeTeamScore" colspan="5"></th>
				<th class="matchupTotalScore matchupHeading" id="awayTeamScore" colspan="5"></th>
			</tr>
			<tr>
				<th class="matchupHeadingTeamName matchupHeading" id="homeTeamName" colspan="5"></th>
				<th class="matchupHeadingTeamName matchupHeading" id="awayTeamName" colspan="5"></th>
			</tr>
			<tr>
				<td class="chosenQB homeSide chosenPosition" id="homeQB" colspan="2"></td>
				<td class="chosenQBPoints homeSide" id="homeQBPoints" colspan="2"></td>
				<td class="position" colspan="2">QB</td>
				<td class="chosenQBPoints" id="awayQBPoints" colspan="2"></td>
				<td class="chosenQB chosenPosition" id="awayQB" colspan="2"></td>
			</tr>
			<tr>
				<td class="chosenRB1 homeSide chosenPosition" id="homeRB1" colspan="2"></td>
				<td class="chosenRB1Points homeSide" id="homeRB1Points" colspan="2"></td>
				<td class="position" colspan="2">RB1</td>
				<td class="chosenRB1Points" id="awayRB1Points" colspan="2"></td>
				<td class="chosenRB1 chosenPosition" id="awayRB1" colspan="2"></td>
			</tr>
			<tr>
				<td class="chosenRB2 homeSide chosenPosition" id="homeRB2" colspan="2"></td>
				<td class="chosenRB2Points homeSide" id="homeRB2Points" colspan="2"></td>
				<td class="position" colspan="2">RB2</td>
				<td class="chosenRB2Points" id="awayRB2Points" colspan="2"></td>
				<td class="chosenRB2 chosenPosition" id="awayRB2" colspan="2"></td>
			</tr>
			<tr>
				<td class="chosenWR1 homeSide chosenPosition" id="homeWR1" colspan="2"></td>
				<td class="chosenWR1Points homeSide" id="homeWR1Points" colspan="2"></td>
				<td class="position" colspan="2">WR1</td>
				<td class="chosenWR1Points" id="awayWR1Points" colspan="2"></td>
				<td class="chosenWR1 chosenPosition" id="awayWR1" colspan="2"></td>
			</tr>
			<tr>
				<td class="chosenWR2 homeSide chosenPosition" id="homeWR2" colspan="2"></td>
				<td class="chosenWR2Points homeSide" id="homeWR2Points" colspan="2"></td>
				<td class="position" colspan="2">WR2</td>
				<td class="chosenWR2Points" id="awayWR2Points" colspan="2"></td>
				<td class="chosenWR2 chosenPosition" id="awayWR2" colspan="2"></td>
			</tr>
			<tr>
				<td class="chosenWR3 homeSide chosenPosition" id="homeWR3" colspan="2"></td>
				<td class="chosenWR3Points homeSide" id="homeWR3Points" colspan="2"></td>
				<td class="position" colspan="2">WR3</td>
				<td class="chosenWR3Points" id="awayWR3Points" colspan="2"></td>
				<td class="chosenWR3 chosenPosition" id="awayWR3" colspan="2"></td>
			</tr>
			<tr>
				<td class="chosenTE homeSide chosenPosition" id="homeTE" colspan="2"></td>
				<td class="chosenTEPoints homeSide" id="homeTEPoints" colspan="2"></td>
				<td class="position" colspan="2">TE</td>
				<td class="chosenTEPoints" id="awayTEPoints" colspan="2"></td>
				<td class="chosenTE chosenPosition" id="awayTE" colspan="2"></td>
			</tr>
			<tr>
				<td class="chosenDEF homeSide chosenPosition" id="homeDEF" colspan="2"></td>
				<td class="chosenDEFPoints homeSide" id="homeDEFPoints" colspan="2"></td>
				<td class="position" colspan="2">DEF</td>
				<td class="chosenDEFPoints" id="awayDEFPoints" colspan="2"></td>
				<td class="chosenDEF chosenPosition" id="awayDEF" colspan="2"></td>
			</tr>
			<tr>
				<td class="chosenK homeSide chosenPosition" id="homeK" colspan="2"></td>
				<td class="chosenKPoints homeSide" id="homeKPoints" colspan="2"></td>
				<td class="position" colspan="2">K</td>
				<td class="chosenKPoints" id="awayKPoints" colspan="2"></td>
				<td class="chosenK chosenPosition" id="awayK" colspan="2"></td>
			</tr>
			<tr>
				<td class="chosenFLEX homeSide chosenPosition" id="homeFLEX" colspan="2"></td>
				<td class="chosenFLEXPoints homeSide" id="homeFLEXPoints" colspan="2"></td>
				<td class="position" colspan="2">FLEX</td>
				<td class="chosenFLEXPoints" id="awayFLEXPoints" colspan="2"></td>
				<td class="chosenFLEX chosenPosition" id="awayFLEX" colspan="2"></td>
			</tr>
		</table>
	</div>
		<table id="hiddenMatchupsTable"></table>
		
	    <script type="text/javascript" src="weekSelect.js" ></script>
	</body>
</html>