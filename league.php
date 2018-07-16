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
    <script type="text/javascript" src="league.js" ></script>
	<link rel="stylesheet" type="text/css" href="header.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="weekSelect.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="standings.css" media="screen" />
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
				<th class="headerTableColumn activeHeaderColumn" id="headerTableColumn1">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">Standings</div>
					<div class="arrow-up"></div>
				</th>
				<th class="headerTableColumn" id="headerTableColumn3">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">Match Up</div>
					<div class="arrow-up hidden-arrow"></div>
				</th>
				<th class="headerTableColumn" id="headerTableColumn2">
					<div style="height: 36px; vertical-align: middle; line-height: 45px">My Team</div>
					<div class="arrow-up hidden-arrow"></div>
				</th>
			</table>
		</div>
		
		<!--Have a blank row so that content at top gets pushed underneath header-->
		<table id="standingsTable">
			<!--Leave space for the top header-->
			<tr style="height: 114px"></tr>
			<!--Leave space between header and first table-->
			<tr style="height: 10px"></tr>
			<tr>
				<th class="standingsTableHeader">
					Rank
				</th>
				<th class="standingsTableHeader">
					Team Name
				</th>
				<th class="standingsTableHeader">
					Record
				</th>
			</tr>
		</table>
		
		
	    <script type="text/javascript" src="weekSelect.js" ></script>
	</body>
</html>