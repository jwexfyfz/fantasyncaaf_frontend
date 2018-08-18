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
    <script type="text/javascript" src="testpage2.js" ></script>
    <script type="text/javascript" src="header.js" ></script>
	<link rel="stylesheet" type="text/css" href="header.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="myTeam.css" media="screen" />
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
				<!--<th class="headerTableColumn" id="avatarBox"></th>-->
				<th class="headerTableColumn"></th>
				<th class="headerTableColumn" id="gameLogoBox"></th>
				<th class="headerTableColumn" id="currentWeekBox">
					<a href="#">
						<div id="accountAvatar">
							<?php 
								$string = $fgmembersite->getTeamName(); 
								preg_match('/(^\w)/', $string, $match);
								$output = strtolower($match[1][0]);
								echo $output;
							?>
						</div>
					</a>
					<div class="custom-select" style="width:160px; position:absolute; right:0; top:0; float:right; display: none;">
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
			<th class="headerTableColumn" id="headerTableColumn3">
				<div style="height: 36px; vertical-align: middle; line-height: 45px">Match Up</div>
				<div class="arrow-up hidden-arrow"></div>
			</th>
			<th class="headerTableColumn activeHeaderColumn" id="headerTableColumn2">
				<div style="height: 36px; vertical-align: middle; line-height: 45px">My Team</div>
				<div class="arrow-up"></div>
			</th>
		</table>
	</div>
	<!--Have a blank row so that content at top gets pushed underneath header-->
	
	<div id="content">
		<table>
			<tr style="height: 121px"></tr>
				<!--Leave space between header and first table-->
				<tr style="height: 10px"></tr>
		</table>
	
		<form method="POST">	
		    <table id="myTeamTable">
				<tr id="test1">
					<th class="myTeamTableHeader" style="width: 60px"> <!--Try width:30 for "Pos"-->
						Position
					</th>
					<th class="myTeamTableHeader">
						Player
					</th>
					<th class="myTeamTableHeader" style="width: 10px; padding-left:0px">
						<div style="width:10px; height:1em;"> </div>
					</th>
					<th class="myTeamTableHeader" style="width: 50px">
						Points
					</th>
				</tr>
		        <tr id="test2">
		            <td class="myTeamTableRow">
		                <label class="positionLabel">QB</label>
		            </td>
		            <td class="myTeamTableRowLong" id="test3">
		                <select class="selectpicker" id="inputQB" name="QBtophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)" style="position: relative;">
		                </select>
						<div class="gameTimeBox" id="QBgametime"></div>
						<div class="clearPlayerButton" id="clearQB">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="qbConfirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="qbPoints">--</p>
		            </td>
		        </tr>
		        <tr>
		            <td class="myTeamTableRow">
		                <label class="positionLabel">RB1</label>
		            </td>
		            <td class="myTeamTableRowLong">
		                <select class="selectpicker" id="inputRB1" name="RB1tophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
						<div class="gameTimeBox" id="RB1gametime"></div>
						<div class="clearPlayerButton" id="clearRB1">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="rb1Confirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="rb1Points">--</p>
		            </td>
		        </tr>
		        <tr>
		            <td class="myTeamTableRow">
		                <label class="positionLabel">RB2</label>
		            </td>
		            <td class="myTeamTableRowLong">
		                <select class="selectpicker" id="inputRB2" name="RB2tophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
						<div class="gameTimeBox" id="RB2gametime"></div>
						<div class="clearPlayerButton" id="clearRB2">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="rb2Confirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="rb2Points">--</p>
		            </td>
		        </tr>
		        <tr>
		            <td class="myTeamTableRow">
		                <label class="positionLabel">WR1</label>
		            </td>
		            <td class="myTeamTableRowLong">
		                <select class="selectpicker" id="inputWR1" name="WR1tophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
						<div class="gameTimeBox" id="WR1gametime"></div>
						<div class="clearPlayerButton" id="clearWR1">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="wr1Confirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="wr1Points">--</p>
		            </td>
		        </tr>
		        <tr>
		            <td class="myTeamTableRow">
		                <label class="positionLabel">WR2</label>
		            </td>
		            <td class="myTeamTableRowLong">
		                <select class="selectpicker" id="inputWR2" name="WR2tophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
						<div class="gameTimeBox" id="WR2gametime"></div>
						<div class="clearPlayerButton" id="clearWR2">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="wr2Confirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="wr2Points">--</p>
		            </td>
		        </tr>
		        <tr>
		            <td class="myTeamTableRow">
		                <label class="positionLabel">WR3</label>
		            </td>
		            <td class="myTeamTableRowLong">
		                <select class="selectpicker" id="inputWR3" name="WR3tophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
						<div class="gameTimeBox" id="WR3gametime"></div>
						<div class="clearPlayerButton" id="clearWR3">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="wr3Confirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="wr3Points">--</p>
		            </td>
		        </tr>
		        <tr>
		            <td class="myTeamTableRow">
		                <label class="positionLabel">WR/TE</label>
		            </td>
		            <td class="myTeamTableRowLong">
		                <select class="selectpicker" id="inputTE" name="TEtophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
						<div class="gameTimeBox" id="TEgametime"></div>
						<div class="clearPlayerButton" id="clearTE">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="teConfirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="tePoints">--</p>
		            </td>
		        </tr>
		        <tr>
		            <td class="myTeamTableRow">
		                <label class="positionLabel">DEF</label>
		            </td>
		            <td class="myTeamTableRowLong">
		                <select class="selectpicker" id="inputDEF" name="DEFtophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
						<div class="gameTimeBox" id="DEFgametime"></div>
						<div class="clearPlayerButton" id="clearDEF">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="defConfirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="defPoints">--</p>
		            </td>
		        </tr>
		        <tr>
		            <td class="myTeamTableRow">
		                <label class="positionLabel">K</label>
		            </td>
		            <td class="myTeamTableRowLong">
		                <select class="selectpicker" id="inputK" name="Ktophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
						<div class="gameTimeBox" id="Kgametime"></div>
						<div class="clearPlayerButton" id="clearK">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="kConfirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="kPoints">--</p>
		            </td>
		        </tr>
		        <tr>
		            <td class="myTeamTableRow">
		                <label class="positionLabel">FLEX</label>
		            </td>
		            <td class="myTeamTableRowLong">
		                <select class="selectpicker" id="inputFLEX" name="FLEXtophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
						<div class="gameTimeBox" id="FLEXgametime"></div>
						<div class="clearPlayerButton" id="clearFLEX">clear</div>
		            </td>
					<td class="myTeamTableRow">
						<img id="flexConfirm" src="checkmark.png" style="width:10px; height:10px; display:none;">
					</td>
		            <td class="myTeamTableRow">
		                <p id="flexPoints">--</p>
		            </td>
		        </tr>
		    </table>
		</form>
	
		<!--This section is to show the week dropdown-->
		<div class="fixedPosition" id="weekScrollContainer">
			<div id="weekSelectBackground"></div>
			<div class="circle" style="position: absolute; top:0;"></div>
			<div class="circle" style="position: absolute; bottom:0; 	box-shadow: 2px 2px 4px -4px rgba(0, 0, 0, 0.2);"></div>

			<div id="scrollable">
				<div class="circle weekSelectCircle" id="week13Circle">13</div>
				<div class="circle weekSelectCircle" id="week12Circle">12</div>
				<div class="circle weekSelectCircle" id="week11Circle">11</div>
				<div class="circle weekSelectCircle" id="week10Circle">10</div>
				<div class="circle weekSelectCircle" id="week9Circle">9</div>
				<div class="circle weekSelectCircle" id="week8Circle">8</div>
				<div class="circle weekSelectCircle" id="week7Circle">7</div>
				<div class="circle weekSelectCircle" id="week6Circle">6</div>
				<div class="circle weekSelectCircle" id="week5Circle">5</div>
				<div class="circle weekSelectCircle" id="week4Circle">4</div>
				<div class="circle weekSelectCircle" id="week3Circle">3</div>
				<div class="circle weekSelectCircle" id="week2Circle">2</div>
				<div class="circle weekSelectCircle" id="week1Circle">1</div>
			</div>
		</div>

		<a href="#">
			<p id="weekLabel">WEEK</p>
			<div class="fixedPosition circle" id ="currentWeekCircle"></div>
		</a>
	
	
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
	
		<div class="bottomErrorBanner" style="display:none">
			<div id="errorBannerContent"></div>
			<div id="errorBannerExit"></div>
		</div>
	
	    <script type="text/javascript" src="weekSelect.js" ></script>
	</div>
</body>
</html>