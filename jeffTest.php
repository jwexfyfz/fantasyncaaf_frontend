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
    <script type="text/javascript" src="jeffTest.js" ></script>
    <script type="text/javascript" src="header.js" ></script>
	<link rel="stylesheet" type="text/css" href="header.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="standings.css" media="screen" />
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
				<th class="headerTableColumn activeHeaderColumn" id="headerTableColumn1">
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
				<th class="headerTableColumn" id="headerTableColumn4">
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
			
			<!--<div class="noDivisionsUsed" id="standingsTableWindow">-->
				<div id="bigContainer">
					<table id="standingsTable">
						<!--Leave space for the top header-->
						<!--<tr style="height: 121px"></tr>-->
						<!--Leave space between header and first table-->
						<tr style="height: 10px"></tr>
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
								Opponent
							</th>
							<th class="standingsTableHeader otherColumn">
								Position
							</th>
							<th class="standingsTableHeader otherColumn">
								Points
							</th>
						</tr>
					</table>
				</div>
				<!--</div>-->
		
			<!--This section is for when the user clicks on the avatar icon, this is the expanded menu-->
			<div id="accountMenu">
				<div class="accountMenuRow" id="avatarRow">
					<?php 
						$string = $fgmembersite->getTeamName(); 
						echo $string;
					?>
				</div>
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