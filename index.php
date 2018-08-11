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
	<link rel="stylesheet" type="text/css" href="header.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="myTeam.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="weekSelect.css" media="screen" />
</head>
<body>
	<div id="headerWrapper">
		<table class="headerTable" id="currentWeekDisplayTable">
			<tr style="height:10px">
			</tr>
			<tr>
				<!--<th class="headerTableColumn" id="avatarBox"></th>-->
				<th class="headerTableColumn" id="avatarBox">
					<!--<div id="welcomeBox">
						<span style="font-size: 0.8em">Team: </span>
						<?php echo $fgmembersite->getTeamName() ?>
					</div>-->
				</th>
				<th class="headerTableColumn" style="text-align: left" id="currentWeekBox">
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
	<table>
		<tr style="height: 111px"></tr>
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
	                <label class="positionLabel">TE</label>
	            </td>
	            <td class="myTeamTableRowLong">
	                <select class="selectpicker" id="inputTE" name="TEtophp" data-live-search="true" data-width="100%" data-show-subtext="true" onchange="sendToPhp(this.name)"></select>
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
	
	<button id="refreshPoints">Refresh</button>
	
	
		<a href='logout.php'>
			<div id="logout">
				Logout
			</div>
		</a>
	</div>
	Query sent to testpage2.php: <br/>
	<div id="result"></div><br/>
	Results from loadTeamRoster.php: <br/>
	<div id="result2"></div><br/>
	<div id="errorOutput">
		<p></p>
	</div>  
	
	<div class="bottomErrorBanner" style="display:none">
		<div id="errorBannerContent"></div>
		<div id="errorBannerExit"></div>
	</div>
	
    <script type="text/javascript" src="weekSelect.js" ></script>
	
</body>
</html>