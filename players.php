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
    <script type="text/javascript" src="players.js" ></script>
    <script type="text/javascript" src="header.js" ></script>
	<link rel="stylesheet" type="text/css" href="header.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="players.css" media="screen" />
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
					</th>
				</tr>
			</table>
			<table class="headerTable">
				<th class="headerTableColumn" id="headerTableColumn1">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">Standings</div>
					<div class="arrow-up hidden-arrow"></div>
				</th>
				<th class="headerTableColumn" id="headerTableColumn3">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">Match Up</div>
					<div class="arrow-up hidden-arrow"></div>
				</th>
				<th class="headerTableColumn" id="headerTableColumn2">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">My Team</div>
					<div class="arrow-up hidden-arrow"></div>
				</th>
				<th class="headerTableColumn activeHeaderColumn" id="headerTableColumn4">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">Players</div>
					<div class="arrow-up"></div>
				</th>
			</table>
		</div>
		
		<!--<div id="content">-->
			<!--
			<div id="leaveRoomForHeader"></div>
			<table class="divFlagTable" id="aroundTheLeagueTable">
				<tr>
					<td id="aroundTheLeague" style="padding-top: 10px">Division: North</td>
				</tr>
			</table>
			<div class="flexCard divFlag">
				<div id="standingsTableWindow">
					<div id="bigContainer">
						<table id="standingsTable">
			-->
							<!--Leave space for the top header-->
							<!--<tr style="height: 121px"></tr>-->
							<!--Leave space between header and first table-->
			<!--			<tr style="height: 10px"></tr>
							<tr id="standingsTableSections">
								<th class="standingsTableHeader rankColumn" id="stickyRank" style="padding-left: 10px">
									Rank
								</th>
								<th class="standingsTableHeader teamColumn" id="sticky" style="padding-left: 10px">
									Player
								</th>
								<th class="standingsTableHeader otherColumn">
									Team
								</th>
								<th class="standingsTableHeader otherColumn">
									Position
								</th>
								<th class="standingsTableHeader otherColumn">
									Opponent
								</th>
								<th class="standingsTableHeader otherColumn">
									Total Points
								</th>
							</tr>
						</table>
					</div>
				</div>
			</div>
		-->
			<div class="skipHeader"></div>
			<div class="stickyBufferSpace"></div>
			<div class="filters">
				<table class="headerTable" id="headerTable">
					<tr>
						<td colspan="2">
							<div id="enableFilterDropdown">
								<img src="filter.png" height="30" width="30" style="margin: 0px 10px">
							</div>
							<!--This section contains some filter elements that could be useful in the future
								<div class="filterIndicator" id="QBfilterIndicator">
								<p style="float: left; width: 30px">QB</p>
								<p class="removeFilterIndicator" style="float: right">×</p>
							</div>
							<div class="filterIndicator" id="RBfilterIndicator">
								<p style="float: left; width: 30px">RB</p>
								<p class="removeFilterIndicator" style="float: right">×</p>
							</div>
							<div class="filterIndicator" id="WRfilterIndicator">
								<p style="float: left; width: 30px">WR</p>
								<p class="removeFilterIndicator" style="float: right">×</p>
							</div>
							<div class="filterIndicator" id="TEfilterIndicator">
								<p style="float: left; width: 30px">TE</p>
								<p class="removeFilterIndicator" style="float: right">×</p>
							</div>
							<div class="filterIndicator" id="DEFfilterIndicator">
								<p style="float: left; width: 30px">DEF</p>
								<p class="removeFilterIndicator" style="float: right">×</p>
							</div>
							<div class="filterIndicator" id="KfilterIndicator">
								<p style="float: left; width: 30px">K</p>
								<p class="removeFilterIndicator" style="float: right">×</p>
							</div>-->
						</td>
					</tr>
					<tr class="filterRows">
						<td id="filterSelectAll">
							<div id="filterSelectAllButton">
								<p align="left" style="margin: 0px 10px; color: #FFA500; line-height: 30px">Select All</p>
							</div>
						</td>
						<td></td>
						<td id="filterClear">
							<div id="filterClearButton">
								<p align="right" style="margin: 0px 10px; color: #FFA500; line-height: 30px">Clear All</p>
							</div>
						</td>
					</tr>
					<tr class="filterRows">
						<td class="positionFilterCell" id="QBpositionFilterCell">
							<div class="filterButton" id="QBfilter" data-enabled="true" onClick="filterClick(this.id)">QB</div>
						</td>
						<td class="positionFilterCell" id="RBpositionFilterCell">
							<div class="filterButton" id="RBfilter" data-enabled="true" onClick="filterClick(this.id)">RB</div>
						</td>
						<td class="positionFilterCell" id="WRpositionFilterCell">
							<div class="filterButton" id="WRfilter" data-enabled="true" onClick="filterClick(this.id)">WR</div>
						</td>
					</tr>
					<tr class="filterRows">
						<td class="positionFilterCell" id="TEpositionFilterCell">
							<div class="filterButton" id="TEfilter" data-enabled="true" onClick="filterClick(this.id)">TE</div>
						</td>
						<td class="positionFilterCell" id="DEFpositionFilterCell">
							<div class="filterButton" id="DEFfilter" data-enabled="true" onClick="filterClick(this.id)">DEF</div>
						</td>
						<td class="positionFilterCell" id="KpositionFilterCell">
							<div class="filterButton" id="Kfilter" data-enabled="true" onClick="filterClick(this.id)">K</div>
						</td>
					</tr>
				</table>
				<div class="screenContainer2" id="playersTableWindow">
					<div id="bigContainer2">
						<table id="standingsTable2">
							<!--Leave space between header and first table-->
							<tr style="height: 10px"></tr>
							<tr id="standingsTableSections">
								<th class="standingsTableHeader rankColumnHead" id="stickyRank" style="padding-left: 10px">
									Rank
								</th>
								<th class="standingsTableHeader playerColumnHead" id="sticky" style="padding-left: 10px">
									Player
								</th>
								<th class="standingsTableHeader teamColumn">
									Team
								</th>
								<th class="standingsTableHeader oppColumn" id="weekOpponent">
							
								</th>
								<th class="standingsTableHeader positionColumn">
									Position
								</th>
								<th class="standingsTableHeader pointsColumn">
									Points
								</th>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="screenContainer" id="playersTableWindow">
				<div id="bigContainer">
					<table id="standingsTable">
						<tr id="standingsTableSections">
							<th class="standingsTableHeader rankColumnHead" style="padding-left: 10px">
							</th>
							<th class="standingsTableHeader playerColumnHead" style="padding-left: 10px">
							</th>
							<th class="standingsTableHeader teamColumn">
							</th>
							<th class="standingsTableHeader oppColumn">
							</th>
							<th class="standingsTableHeader positionColumn">
							</th>
							<th class="standingsTableHeader pointsColumn">
							</th>
						</tr>
					</table>
				</div>
			</div>
		
			<!--This section is for when the user clicks on the avatar icon, this is the expanded menu-->
			<div id="accountMenu">
				<!--<div class="accountMenuRow" id="avatarRow">
					<?php 
						$string = $fgmembersite->getTeamName(); 
						echo "Team: ".$string;
					?>
				</div>-->
				<div class="arrow-up" id="accountArrow"></div>
				<a href="logout.php">
					<div class="accountMenuRow" id="logoutRow">
						Logout
					</div>
				</a>
			</div>
		
		
		    <!--<script type="text/javascript" src="weekSelect.js" ></script>-->
			<!--</div>-->
	</body>
</html>