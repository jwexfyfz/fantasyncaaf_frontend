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
	
		<table id="myTeamMatchupTable">
			<tr>
				<th></td>
				<th class="matchupTotalScore" id="homeTeamScore" colspan="2"></th>
				<th class="matchupTotalScore" id="awayTeamScore" colspan="2"></th>
			</tr>
			<tr>
				<th></td>
				<th id="homeTeamName" colspan="2"></th>
				<th id="awayTeamName" colspan="2"></th>
			</tr>
			<tr>
				<td class="chosenQBPoints" id="homeQBPoints"></td>
				<td class="chosenQB" id="homeQB"></td>
				<td class="position">QB</td>
				<td class="chosenQB" id="awayQB"></td>
				<td class="chosenQBPoints" id="awayQBPoints"></td>
			</tr>
			<tr>
				<td class="chosenRB1Points" id="homeRB1Points"></td>
				<td class="chosenRB1" id="homeRB1"></td>
				<td class="position">RB1</td>
				<td class="chosenRB1" id="awayRB1"></td>
				<td class="chosenRB1Points" id="awayRB1Points"></td>
			</tr>
			<tr>
				<td class="chosenRB2Points" id="homeRB2Points"></td>
				<td class="chosenRB2" id="homeRB2"></td>
				<td class="position">RB2</td>
				<td class="chosenRB2" id="awayRB2"></td>
				<td class="chosenRB2Points" id="awayRB2Points"></td>
			</tr>
			<tr>
				<td class="chosenWR1Points" id="homeWR1Points"></td>
				<td class="chosenWR1" id="homeWR1"></td>
				<td class="position">WR1</td>
				<td class="chosenWR1" id="awayWR1"></td>
				<td class="chosenWR1Points" id="awayWR1Points"></td>
			</tr>
			<tr>
				<td class="chosenWR2Points" id="homeWR2Points"></td>
				<td class="chosenWR2" id="homeWR2"></td>
				<td class="position">WR2</td>
				<td class="chosenWR2" id="awayWR2"></td>
				<td class="chosenWR2Points" id="awayWR2Points"></td>
			</tr>
			<tr>
				<td class="chosenWR3Points" id="homeWR3Points"></td>
				<td class="chosenWR3" id="homeWR3"></td>
				<td class="position">WR3</td>
				<td class="chosenWR3" id="awayWR3"></td>
				<td class="chosenWR3Points" id="awayWR3Points"></td>
			</tr>
			<tr>
				<td class="chosenTEPoints" id="homeTEPoints"></td>
				<td class="chosenTE" id="homeTE"></td>
				<td class="position">TE</td>
				<td class="chosenTE" id="awayTE"></td>
				<td class="chosenTEPoints" id="awayTEPoints"></td>
			</tr>
			<tr>
				<td class="chosenDEFPoints" id="homeDEFPoints"></td>
				<td class="chosenDEF" id="homeDEF"></td>
				<td class="position">DEF</td>
				<td class="chosenDEF" id="awayDEF"></td>
				<td class="chosenDEFPoints" id="awayDEFPoints"></td>
			</tr>
			<tr>
				<td class="chosenKPoints" id="homeKPoints"></td>
				<td class="chosenK" id="homeK"></td>
				<td class="position">K</td>
				<td class="chosenK" id="awayK"></td>
				<td class="chosenKPoints" id="awayKPoints"></td>
			</tr>
			<tr>
				<td class="chosenFLEXPoints" id="homeFLEXPoints"></td>
				<td class="chosenFLEX" id="homeFLEX"></td>
				<td class="position">FLEX</td>
				<td class="chosenFLEX" id="awayFLEX"></td>
				<td class="chosenFLEXPoints" id="awayFLEXPoints"></td>
			</tr>
		</table>
		<table id="hiddenMatchupsTable"></table>
		
	    <script type="text/javascript" src="weekSelect.js" ></script>
	</body>
</html>