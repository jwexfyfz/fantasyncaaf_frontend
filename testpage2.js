//jeffwang 3/14/2018: On document.ready, need to populate eligible players for user to select.
//To do this, need to send query to loadTeamRoster.php to tell the user which players they have currently chosen for the week.
//Then, need to pass this data to getDataforChoosePlayerLists(), which passes it to populateChoosePlayerLists() to set default values
//Functions being run once page is loaded: 
//1) getDataforChoosePlayerLists(), which calls populateChoosePlayerLists()
$( document ).ready(
	function sendTeamRosterToPhp() {
		//Set default week value 
		//UPDATE THIS EVERY WEEK TO SET CURRENT WEEK TODO: jeffwang to figure out how to make this change based on the current week
		var currentWeek = 1;
		$("#currentWeekNum").val(currentWeek);
		console.log("Current week is now set to "+$("#currentWeekNum").val());
		
		var urlArray = getUrlVars();
		//console.log(urlArray);
		var week	=	$("#currentWeekNum").val();
		var teamID	=	$("#teamID").val()
		console.log("teamID: "+teamID);
		//var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
		
		//var teamName=	urlArray["teamName"];
		var teamName = $("#teamName").val();
		//$('#currentTeamName').html(teamName);
		
	    loadTeamRoster(week, teamID, false);	//Populate select lists based on the week, set rosters that have already been chosen
		checkGameStarted(week, teamID);  //uncomment when ready
		
		$("#refreshPoints").click( function(event) {
		  event.preventDefault();
		  //console.log("clicked!");
		  getFantasyPoints();
		});
		
		$("#headerTableColumn1").click( function(event) {
			window.location.href = "league.php" + window.location.search;
		});
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.php" + window.location.search;
		});	
		
		
		//fadeErrorFooter("test test test test test test test test test test test test test test test ");
		
		$("#errorBannerExit").click( function(event) {
			clearTimeout(myVar);
			console.log("clearTimeout ran");
			exitErrorFooter();
		});	
});

function updatePage() {
	console.log("week changed to "+$('#currentWeekNum').val());
	var urlArray = getUrlVars();
	var week	=	$("#currentWeekNum").val();
	//var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
	var teamID	=	$("#teamID").val();
	console.log("updatePage teamID: "+teamID);
	
	//var teamName=	urlArray["teamName"];
	
	loadTeamRoster(week, teamID, true);	//Populate select lists based on the week, set rosters that have already been chosen
	checkGameStarted(week, teamID);  //Uncomment when ready
	
}

function loadTeamRoster(week, teamID, weekChanged) {
    var phpResponse;
	
	//only need week and teamID to retrieve a user's roster
	var dataString = 'weekNum='+week+'&teamIDNum='+teamID;
	
	//Send query to loadTeamRoster.php via AJAX
	//This gets the roster that was already set by the user previously
	$.ajax({
	    type: "POST",
	    url: "loadTeamRoster.php",
	    data: dataString,
	    success: function(response) {
	      //$('#result').html(response);
		  //console.log("response from loadTeamRoster.php: "+response);
		  console.log("successfully sent query to tell php to provide team roster!");	//For testing
		  phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a teamRoster, followed by the chosen positions of that roster
		  
		  //getNumTimesPlayersUsed(phpResponse);
		  
		  //Set eligible players for each select, set the current chosen player as default value
		  getDataForChoosePlayerLists("QB", phpResponse[week].QB, teamID, weekChanged);
		  getDataForChoosePlayerLists("RB1", phpResponse[week].RB1, teamID, weekChanged);
		  getDataForChoosePlayerLists("RB2", phpResponse[week].RB2, teamID, weekChanged);
		  getDataForChoosePlayerLists("WR1", phpResponse[week].WR1, teamID, weekChanged);
		  getDataForChoosePlayerLists("WR2", phpResponse[week].WR2, teamID, weekChanged);
		  getDataForChoosePlayerLists("WR3", phpResponse[week].WR3, teamID, weekChanged);
		  getDataForChoosePlayerLists("TE", phpResponse[week].TE, teamID, weekChanged);
		  getDataForChoosePlayerLists("DEF", phpResponse[week].DEF, teamID, weekChanged);
		  getDataForChoosePlayerLists("K", phpResponse[week].K, teamID, weekChanged);
		  getDataForChoosePlayerLists("FLEX", phpResponse[week].FLEX, teamID, weekChanged);
		  console.log("finished populating available players and loading roster");	//For testing
	    }
	});
}

function getNumTimesPlayersUsed(teamRoster){
	var playersUsedCount;
	
	for (var key in teamRoster) {
	    console.log("iterating through week "+teamRoster[key]);
		
		playersUsedCount[teamRoster[key]["QB"]] += 1;
		playersUsedCount[teamRoster[key]["RB1"]] += 1;
		playersUsedCount[teamRoster[key]["RB2"]] += 1;
		playersUsedCount[teamRoster[key]["WR1"]] += 1;
		playersUsedCount[teamRoster[key]["WR2"]] += 1;
		playersUsedCount[teamRoster[key]["WR3"]] += 1;
		playersUsedCount[teamRoster[key]["TE"]] += 1;
		playersUsedCount[teamRoster[key]["DEF"]] += 1;
		playersUsedCount[teamRoster[key]["K"]] += 1;
		playersUsedCount[teamRoster[key]["FLEX"]] += 1;
	}
	//$('#result2').html(playersUsedCount);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


function getFantasyPoints() {
	var week=$("#currentWeekNum").val();
	var dataString="";
	
	if($('#inputQB').val() != null) {
		dataString += "&qb="+$('#inputQB').val();
	}
	if($('#inputRB1').val() != null) {
		dataString += "&rb1="+$('#inputRB1').val();
	}
	if($('#inputRB2').val() != null) {
		dataString += "&rb2="+$('#inputRB2').val();
	}
	if($('#inputWR1').val() != null) {
		dataString += "&wr1="+$('#inputWR1').val();
	}
	if($('#inputWR2').val() != null) {
		dataString += "&wr2="+$('#inputWR2').val();
	}
	if($('#inputWR3').val() != null) {
		dataString += "&wr3="+$('#inputWR3').val();
	}
	if($('#inputTE').val() != null) {
		dataString += "&te="+$('#inputTE').val();
	}
	if($('#inputDEF').val() != null) {
		dataString += "&def="+$('#inputDEF').val();
	}
	if($('#inputK').val() != null) {
		dataString += "&k="+$('#inputK').val();
	}
	if($('#inputFLEX').val() != null) {
		dataString += "&flex="+$('#inputFLEX').val();
	}
	dataString += "&week="+week;
	dataString = dataString.trim().replace(/ /g, '%20');
	dataString = dataString.substr(1);

	console.log("getFantasyPoints dataString: "+dataString);

	$.ajax({
	    type: "POST",
	    url: "getFantasyPoints.php",
	    data: dataString,
	    success: function(response) {
			//console.log("response from getFantasyPoints.php: "+response);
	      if(response == "0 results") {
			  console.log("returned 0 results from getFantasyPoints.php");
	      }
		  //$('#result2').html(response);
		  playerPoints = JSON.parse(response);
		  //console.log("successfully got fantasyPoints from php!");
	  
		  if($('#inputQB').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputQB').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#qbPoints').html(playerPoints[$('#inputQB').val()]);
			  }
			  else {
				  console.log("QB is disabled, so setting points to 0");
				  $('#qbPoints').html("0");
			  }
		  } else {
			  //console.log("QB is not disabled, so setting points to --");
			  $('#qbPoints').html("--");
		  }
		  
		  
		  if($('#inputRB1').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputRB1').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#rb1Points').html(playerPoints[$('#inputRB1').val()]);
			  }
			  else {
				  console.log("RB1 is disabled, so setting points to 0");
				  $('#rb1Points').html("0");
			  }
		  } else {
			  //console.log("RB1 is not disabled, so setting points to --");
			  $('#rb1Points').html("--");
		  }
		  
		  if($('#inputRB2').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputRB2').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#rb2Points').html(playerPoints[$('#inputRB2').val()]);
			  }
			  else {
				  console.log("RB2 is disabled, so setting points to 0");
				  $('#rb2Points').html("0");
			  }
		  } else {
			  //console.log("RB2 is not disabled, so setting points to --");
			  $('#rb2Points').html("--");
		  }
		  
		  
		  if($('#inputWR1').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputWR1').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#wr1Points').html(playerPoints[$('#inputWR1').val()]);
			  }
			  else {
				  console.log("WR1 is disabled, so setting points to 0");
				  $('#wr1Points').html("0");
			  }
		  } else {
			  //console.log("WR1 is not disabled, so setting points to --");
			  $('#wr1Points').html("--");
		  }
		  
		  if($('#inputWR2').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputWR2').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#wr2Points').html(playerPoints[$('#inputWR2').val()]);
			  }
			  else {
				  console.log("WR2 is disabled, so setting points to 0");
				  $('#wr2Points').html("0");
			  }
		  } else {
			  //console.log("WR2 is not disabled, so setting points to --");
			  $('#wr2Points').html("--");
		  }
		  
		  if($('#inputWR3').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputWR3').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#wr3Points').html(playerPoints[$('#inputWR3').val()]);
			  }
			  else {
				  console.log("WR3 is disabled, so setting points to 0");
				  $('#wr3Points').html("0");
			  }
		  } else {
			  //console.log("WR3 is not disabled, so setting points to --");
			  $('#wr3Points').html("--");
		  }
		  
		  if($('#inputTE').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputTE').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#tePoints').html(playerPoints[$('#inputTE').val()]);
			  }
			  else {
				  console.log("TE is disabled, so setting points to 0");
				  $('#tePoints').html("0");
			  }
		  } else {
			  //console.log("TE is not disabled, so setting points to --");
			  $('#tePoints').html("--");
		  }
		  
		  if($('#inputDEF').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputDEF').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#defPoints').html(playerPoints[$('#inputDEF').val()]);
			  }
			  else {
				  console.log("DEF is disabled, so setting points to 0");
				  $('#defPoints').html("0");
			  }
		  } else {
			  //console.log("DEF is not disabled, so setting points to --");
			  $('#defPoints').html("--");
		  }
		  
		  if($('#inputK').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputK').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#kPoints').html(playerPoints[$('#inputK').val()]);
			  }
			  else {
				  console.log("K is disabled, so setting points to 0");
				  $('#kPoints').html("0");
			  }
		  } else {
			  //console.log("K is not disabled, so setting points to --");
			  $('#kPoints').html("--");
		  }
		  
		  if($('#inputFLEX').attr('disabled') == 'disabled') {
			  if(	playerPoints[$('#inputFLEX').val()] != undefined	) {
				  //console.log(playerPoints[$('#inputQB').val()]);
				  $('#flexPoints').html(playerPoints[$('#inputFLEX').val()]);
			  }
			  else {
				  console.log("FLEX is disabled, so setting points to 0");
				  $('#flexPoints').html("0");
			  }
		  } else {
			  //console.log("FLEX is not disabled, so setting points to --");
			  $('#flexPoints').html("--");
		  }
	    }
	});
};

//jeffwang 3/14/2018: This function will do the following every time a roster edit is made (i.e. user selects different player for any position):
//1) Run verifyNoDupes(), which will check if two of the same player is selected. If false,
//2) send the playerName, week, and teamID to testpage2.php to update the week's roster
//TODO: jeffwang to add in defense after list of defenses table is created
function sendToPhp(position) {
	console.log('------position set: ' + position);
	var week=$("#currentWeekNum").val();	//Get week # from page	TODO: jeffwang to figure out how to dynamically change week	
	var urlArray = getUrlVars();
	//var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
	var teamID	=	$("#teamID").val();
	//var teamName = urlArray["teamName"];
	var teamName = $("#teamName").val();
	
	var confirmPosition = "";
	var temp;								//Temporarily hold the duplicate player to switch
	
	switch(position) {
	    case "QBtophp":
	        newPosition = "inputQB";
	        break;
	    case "RB1tophp":
	        newPosition = "inputRB1";
	        break;
	    case "RB2tophp":
	        newPosition = "inputRB2";
	        break;
	    case "WR1tophp":
	        newPosition = "inputWR1";
	        break;
	    case "WR2tophp":
	        newPosition = "inputWR2";
	        break;
	    case "WR3tophp":
	        newPosition = "inputWR3";
	        break;
	    case "TEtophp":
	        newPosition = "inputTE";
	        break;
	    case "DEFtophp":
	        newPosition = "inputDEF";
	        break;
	    case "Ktophp":
	        newPosition = "inputK";
	        break;
	    case "FLEXtophp":
	        newPosition = "inputFLEX";
	        break;
	    default:
	        newPosition = "";
	}
	
	//var dupesExist = false;
	verifyNoDupes(position, week, teamID, teamName);		//Check for dupes
	
	//JEFF TO CONFIRM THIS CODE: checkGameStarted returns an array of disabled newPositions. Only run the code below if a position is not disabled. This should also run checkGameStarted which is what we want.
	//if (!checkGameStarted(week, teamID).indexOf(newPosition) > -1) {
		// PUT ALL CODE BELOW IN HERE IF YOU AGREE.
	//}
	
	//If duplicate names exist, block the sql query and inform user
	
}

function makeChangesToTeamRoster(switchPosition1, switchPosition2, position, week, teamID, teamName, dupesExist) {
	console.log("from makeChangesToTeamRoster, switchPostion1="+switchPosition1+", switchPosition2="+switchPosition2);
	if(dupesExist) {
		$("#errorOutput p:first").html("Can't have duplicate players!");
	} 
	//This else condition is here because this function is called many times, so we don't want to execute a query to sql every time.  TE and FLEX happen to be the last one.  TODO: jeffwang to remove the extra query to sql from this function after two players have already been switched via addPlayerToRoster function
	else if(	(switchPosition1 == "TE")	&&	(switchPosition2 == "FLEX")	) {		
		$("#errorOutput p:first").html("");
		switch(position) {
		    case "QBtophp":
		        dataString = 'QBtophp='+$('#inputQB').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "qb";
		        break;
		    case "RB1tophp":
		        dataString = 'RB1tophp='+$('#inputRB1').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "rb1";
		        break;
			case "RB2tophp":
		        dataString = 'RB2tophp='+$('#inputRB2').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "rb2";
		        break;
		    case "WR1tophp":
		        dataString = 'WR1tophp='+$('#inputWR1').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "wr1";
		        break;
			case "WR2tophp":
		        dataString = 'WR2tophp='+$('#inputWR2').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "wr2";
		        break;
			case "WR3tophp":
		        dataString = 'WR3tophp='+$('#inputWR3').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "wr3";
		        break;
			case "TEtophp":
		        dataString = 'TEtophp='+$('#inputTE').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "te";
		        break;
			case "Ktophp":
		        dataString = 'Ktophp='+$('#inputK').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "k";
		        break;
			case "DEFtophp":
		        dataString = 'DEFtophp='+$('#inputDEF').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "def";
		        break;
			case "FLEXtophp":
		        dataString = 'FLEXtophp='+$('#inputFLEX').val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
				confirmPosition = "flex";
		        break;
		    //Empty data string will return error message from php because it can't find parameters that are set
			default:
		        dataString = "";
				positionHash = "";
		}
		//Replace <space> with %20.  This might not be required because we're using POST method (rather than GET), but leaving this here for now.
		dataString = dataString.trim().replace(/ /g, '%20');

		//console.log(dataString);	//For testing
	
		//Send query to testpage2.php via AJAX
		//For testing: fill #result div with the query that was sent
		$.ajax({
		    type: "POST",
		    url: "testpage2.php",
		    data: dataString,
		    success: function(response) {
		      $('#result').html(response);
			  console.log("successfully sent selected position that changed! "+position);	//For testing
			  confirmPlayer(confirmPosition);
			  getFantasyPoints();
		    }
		});
	}
}

//jeffwang 3/14/2018: This function is currently runs whenever a player change is made.
//It will check to see that no player is used twice, return true if all players are unique. return false if there is a duplicate
function verifyNoDupes(position, week, teamID, teamName) {	
    var phpResponse;
	
	//only need week and teamID to retrieve a user's roster
	var dataString = 'weekNum='+week+'&teamIDNum='+teamID;
	var temp;
	
	//Send query to loadTeamRoster.php via AJAX
	//This gets the roster that was already set by the user previously
	$.ajax({
	    type: "POST",
	    url: "loadTeamRoster.php",
	    data: dataString,
	    success: function(response) {
		  console.log("successfully sent query to tell php to provide team roster!");	//For testing
		  phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a teamRoster, followed by the chosen positions of that roster
		  
		  getNumDupeTeamsAllowed(week, teamID, position, phpResponse, teamName);
		  //console.log("VALID CHANGE: "+valid);
		  /*if (valid) {
			  //Player changes RB1 to equal the same value as teamRoster's RB2
			  comparePotentialDupes("RB1", "RB2", position, phpResponse, week, teamID, teamName);
			  comparePotentialDupes("RB1", "FLEX", position, phpResponse, week, teamID, teamName);
			  comparePotentialDupes("RB2", "FLEX", position, phpResponse, week, teamID, teamName);
			  comparePotentialDupes("WR1", "WR2", position, phpResponse, week, teamID, teamName);
			  comparePotentialDupes("WR2", "WR3", position, phpResponse, week, teamID, teamName);
			  comparePotentialDupes("WR1", "WR3", position, phpResponse, week, teamID, teamName);
			  comparePotentialDupes("WR1", "FLEX", position, phpResponse, week, teamID, teamName);
			  comparePotentialDupes("WR2", "FLEX", position, phpResponse, week, teamID, teamName);
			  comparePotentialDupes("WR3", "FLEX", position, phpResponse, week, teamID, teamName);
			  comparePotentialDupes("TE", "FLEX", position, phpResponse, week, teamID, teamName);
		  }*/
	    }
	});  
}

function teamDupes(week, fantasyID, numDupeTeamsAllowed, position, teamRoster, teamName) {
	var dupeTeams = 0;
	
	var phpResponse;
	var dataString = 'weekNum='+week+'&fantasyID='+fantasyID;
	
	console.log("numDupeTeamsAllowed: "+numDupeTeamsAllowed);	//For testing
	
	$.ajax({
	    type: "POST",
	    url: "getPlayerSchools.php",
	    data: dataString,
	    success: function(response) {
			
			$('#result2').html(response);
			console.log("successfully sent query to tell php to provide list of schools");	//For testing
			phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a [position, playerName, team] array
			//console.log("Response from getPlayerSchools.php: "+phpResponse);
			
			var counts = {};
			var positionToTeam = {};
			for (var i = 0; i < phpResponse.length; i++) {
				counts[phpResponse[i]["teamName"]] = 1 + (counts[phpResponse[i]["teamName"]] || 0);
				//console.log("Response from getPlayerSchools.php: "+counts[i]);
				positionToTeam[phpResponse[i]["position"]] = phpResponse[i]["teamName"];
			}
			console.log("Counts array: "+JSON.stringify(counts));
			console.log("positionToTeam: "+JSON.stringify(positionToTeam));
			
			for (var key in counts) {
				//dupeTeams += (phpResponse[i]["teamCount"] - 1);
				if (counts[key] >= 2) {
					dupeTeams++;
				}
				console.log("dupeTeams: "+dupeTeams);
			}
			
			var newPosition = position.replace("tophp","");
			var selectedPlayerTeam = $('#input'+newPosition).find('option:selected').attr('data-school');
			console.log("selectedPlayerTeam: "+selectedPlayerTeam);
			
			if (selectedPlayerTeam != positionToTeam[newPosition] && counts[selectedPlayerTeam] >= 1 && dupeTeams >= numDupeTeamsAllowed) {  // If selected team is >= 1 use and we've hit the limit of dupe teams
				console.log("CHANGE NOT ALLOWED FOR " + selectedPlayerTeam);
				
				//Display error message
				fadeErrorFooter("Too many players from the same team!<br/><span style='font-size:0.8em'>Try removing one or more <b>" + selectedPlayerTeam + "</b> players.</span>");
				loadTeamRoster(week, fantasyID, true);
				//return false;
			}
			else {  // allow the change
				console.log("CHANGE ALLOWED");
				
				comparePotentialDupes("RB1", "RB2", position, teamRoster, week, fantasyID, teamName);
				comparePotentialDupes("RB1", "FLEX", position, teamRoster, week, fantasyID, teamName);
				comparePotentialDupes("RB2", "FLEX", position, teamRoster, week, fantasyID, teamName);
				comparePotentialDupes("WR1", "WR2", position, teamRoster, week, fantasyID, teamName);
				comparePotentialDupes("WR2", "WR3", position, teamRoster, week, fantasyID, teamName);
				comparePotentialDupes("WR1", "WR3", position, teamRoster, week, fantasyID, teamName);
				comparePotentialDupes("WR1", "FLEX", position, teamRoster, week, fantasyID, teamName);
				comparePotentialDupes("WR2", "FLEX", position, teamRoster, week, fantasyID, teamName);
				comparePotentialDupes("WR3", "FLEX", position, teamRoster, week, fantasyID, teamName);
				comparePotentialDupes("TE", "FLEX", position, teamRoster, week, fantasyID, teamName);
				//return true;
			}
	    }
	});  
}

function getNumDupeTeamsAllowed(week, fantasyID, position, teamRoster, teamName) {
	var phpResponse;
	var dataString = 'weekNum='+week;
	
	$.ajax({
	    type: "POST",
	    url: "getNumDupeTeamsAllowed.php",
	    data: dataString,
	    success: function(response) {
		  phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a (playerName, team) pair
		  if (phpResponse < 0) {
			phpResponse = 0;
		  }
		  teamDupes(week, fantasyID, phpResponse, position, teamRoster, teamName);
	    }
	});
	
}

function comparePotentialDupes (switchPosition1, switchPosition2, position, phpResponse, week, teamID, teamName){
    if(	(	($('#input'+switchPosition1).val() == phpResponse[week][switchPosition2]) 	||
	  		($('#input'+switchPosition2).val() == phpResponse[week][switchPosition1])		)	&& 	
		(	($('#input'+switchPosition1).val() != "")	&&
		(	$('#input'+switchPosition2).val() != "")		)												) 
	{
			console.log("values were the same!");
			$('#input'+switchPosition1).val(phpResponse[week][switchPosition2]);
			$('#input'+switchPosition2).val(phpResponse[week][switchPosition1]);
			
			$('#input'+switchPosition1).selectpicker('refresh');
			$('#input'+switchPosition2).selectpicker('refresh');

			switchPlayerUpdateRoster(switchPosition1, switchPosition2, week, teamID, teamName);
			//makeChangesToTeamRoster(position, week, teamID, true);			  
	} else {
			makeChangesToTeamRoster(switchPosition1, switchPosition2, position, week, teamID, teamName, false);		
	}
}

function switchPlayerUpdateRoster(position1, position2, week, teamID, teamName) {
  	dataString = position1+'tophp='+$('#input'+position1).val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
	$.ajax({
		type: "POST",
		url: "testpage2.php",
		data: dataString,
		success: function(response) {
			console.log("switch players: "+response);
			confirmPlayer(position1.toLowerCase());
			
		  	dataString = position2+'tophp='+$('#input'+position2).val()+'&weekNum='+week+'&teamIDNum='+teamID+'&teamName='+teamName;
			$.ajax({
				type: "POST",
				url: "testpage2.php",
				data: dataString,
				success: function(response) {
					console.log("switch players: "+response);
					console.log("lastConfirm");
					confirmPlayer(position2.toLowerCase());
					getFantasyPoints();
				}
			});
		}
	});	
}

//cauchychoi 4/4/2018: This function runs on page load or whenever a player change is made.
//It will check to see if a player's gametime has passed and disable that 'select'
//TODO: Add to both page load and when a player selects something. (Is that the sendtophp function?)
function checkGameStarted(week, fantasyID) {
	 
	var phpResponse;
	var disabledPositions = [];
	//only need week and fantasyID to retrieve a user's roster
	var dataString = 'weekNum='+week+'&fantasyID='+fantasyID;
	
	$.ajax({
	    type: "POST",
	    url: "checkGameStarted.php",
	    data: dataString,
	    success: function(response) {
	      //$('#result3').html(response);
		  //console.log("response from checkGameStarted.php: "+response);
		  console.log("successfully sent query to tell php to provide game times!");	//For testing
		  phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a [playerID, teamID, position, hasPlayed, gametime]
		  
		  //Iterate through game times and disable selector for players whose games have started
		  
		  var i;
		  for (i = 0; i < phpResponse.length; i++) {
			  var gametime = new Date(phpResponse[i]["gametime"] + " UTC");
			  if (Date.now() > gametime.getTime()) {
				  if (!document.getElementById("input"+phpResponse[i]["position"]).disabled) {
					//document.getElementById(phpResponse[i]["selector"]).setAttribute('disabled',true);
					document.getElementById("input"+phpResponse[i]["position"]).disabled = true;
					disabledPositions.push("input"+phpResponse[i]["position"]);
					if (phpResponse[i]["hasPlayed"] == 0) {
						if (phpResponse[i]["position"].localeCompare("DEF") == 0) {  // if DEF, grab teamID
							updateTimesPlayerUsed(phpResponse[i]["teamID"], fantasyID, week, phpResponse[i]["position"]);
						}
						else {  // else grab playerID
							updateTimesPlayerUsed(phpResponse[i]["playerID"], fantasyID, week, phpResponse[i]["position"]);
						}
					}
				  }
				//$('#checkGameStartedLength').html(phpResponse[i]["gametime"]);
			  }
			  else {
				  if (!document.getElementById("input"+phpResponse[i]["position"]).disabled) {
					document.getElementById("input"+phpResponse[i]["position"]).disabled = false;
				  }
			  }
		  }
		  console.log("finished checking if games are started");	//For testing
		  
		  //Call function to disable all players that have already played
		  disableAlreadyPlayedPlayers(phpResponse);
	    }
	});
	return disabledPositions;
}

//Disable all players from select dropdown for teams that have already played
function disableAlreadyPlayedPlayers(playerArray) {
	console.log("called disableAlreadyPlayedPlayers");
  var nonUniqueSchools = new Array();
  var uniqueSchools = new Array();
  
  //Iterate through playerArray to extract teams that have already played
  for (i = 0; i < playerArray.length; i++) {
	  var gametime = new Date(playerArray[i]["gametime"] + " UTC");
	  
	  //Check if current time > when the team played. If yes, add to array.
	  if (Date.now() > gametime.getTime()) {
		  nonUniqueSchools.push(playerArray[i]["teamID"]);
		  console.log("added "+playerArray[i]["teamID"]+" to nonUniqueSchools");
	  }
	  else {
		  console.log("now: "+Date.now()+", gametime of "+playerArray[i]+ ": "+gametime.getTime());
	  }
  }
  
  //Uniquify school names into array (uniqueSchools)
  for (i = 0; i < nonUniqueSchools.length; i++) {
	  for (j = 0; j < uniqueSchools.length; j++) {
		  if(nonUniqueSchools[i] != uniqueSchools[j]) {
			  uniqueSchools.push(nonUniqueSchools[i]);
			  console.log("added "+nonUniqueSchools[i]+" to uniqueSchools array");
		  }
		  else {
		  	console.log(nonUniqueSchools[i]+" already exists in uniqueSchools array");
		  }
	  }
  }
  
  for (j = 0; j < uniqueSchools.length; j++) {
	  console.log("uniqueSchools["+j+"] = "+uniqueSchools[j]);
  }
  
  //Disable players on teams that have already played
  //disablePlayers("QB",uniqueSchools);
  
}


//Disable players from schools that have already played
function disablePlayers(position, teamsPlayed) {
	$('#input'+position+' option').each(function(i){
	    for (j = 0; j < teamsPlayed.length; j++) {
			if(this.getAttribute('data-school') == teamsPlayed[j]) {
				this.setAttribute('disabled', 'disabled');
			}
		}
	});
}

//cauchychoi 6/12/18: Update timesplayerused table
function updateTimesPlayerUsed(playerID, fantasyID, week, position) {
	var phpResponse;
	
	var dataString = 'playerID='+playerID+'&fantasyID='+fantasyID+'&weekNum='+week+'&position='+position;
	
	$.ajax({
		type: "POST",
		url: "updateTimesPlayerUsed.php",
		data: dataString,
		success: function(response) {
			console.log("timesplayerused updated");
		}
	});
}

//jeffwang 3/14/2018: This function is currently run on document.ready for each position. It will:
//1) Send query to getAvailablePlayers.php to query collegeTeamRoster table to figure out which players you can choose
//2) Run populateChoosePlayerLists(), which populates the select options for each position
//TODO: jeffwang to add case "DEF" to the switch statement
function getDataForChoosePlayerLists(position,currentSelectedPlayer,teamID, weekChanged) {
	var dataString="";
	var positionHash="";
	var week=$("#currentWeekNum").val();		//TODO: jeffwang to pass week # as a parameter into this function
	switch(position) {
	    case "QB":
	        dataString = 'QBtophp='+'QB'+'&weekNum='+week+'&teamID='+teamID;
			positionHash="QB";
	        break;
	    case "RB1":
		case "RB2":
	        dataString = 'RBtophp='+'RB'+'&weekNum='+week;+'&teamID='+teamID
			positionHash="RB";
	        break;
	    case "WR1":
		case "WR2":
		case "WR3":
	        dataString = 'WRtophp='+'WR'+'&weekNum='+week+'&teamID='+teamID;
			positionHash="WR";
	        break;
		case "TE":
			dataString = 'TEtophp='+'TE'+'&weekNum='+week+'&teamID='+teamID;
			positionHash="TE";
			break;
		case "DEF":
			dataString = 'DEFtophp='+'DEF'+'&weekNum='+week+'&teamID='+teamID;
			positionHash="DEF";
			break;
		case "K":
			dataString = 'Ktophp='+'PK'+'&weekNum='+week+'&teamID='+teamID;
			positionHash="PK";
			break;
		case "FLEX":
			dataString = 'FLEXtophp='+'FLEX'+'&weekNum='+week+'&teamID='+teamID;
			positionHash="FLEX";
			break;
	    default:
	        dataString = "";
			positionHash="";
	}
	
	//Replace <space> with %20.  This might not be required because we're using POST method (rather than GET), but leaving this here for now.
	dataString = dataString.trim().replace(/ /g, '%20');
	console.log("getPlayers function's dataString: "+dataString);
	
	//Send query to getAvailablePlayers.php via AJAX
	//For testing: fill #result2 div with the query that was sent
	$.ajax({
	    type: "POST",
	    url: "getAvailablePlayers.php",
	    data: dataString,
	    success: function(response) {
	      //$('#result2').html(response);
		  //console.log("successfully queried for eligible player names!");
		  var playerList=JSON.parse(response);
		  
		  //Parameters are 1) ID of select, 2) array of eligible players, 3) player currently on the roster
		  //TODO: jeffwang to figure out edge case when no players are chosen yet
		  populateChoosePlayerLists("input"+position, playerList, currentSelectedPlayer, weekChanged);		
		  
		  	if(position="FLEX") {
		  		//console.log("time to populate inputFLEX. inputPosition= "+inputPosition);
		  		getFantasyPoints();
		  	}  
	    }
	});
}

//jeffwang 3/14/2018: This function is currently called by function getDataForChoosePlayerLists(), which is run on document.ready
//It takes the following inputs: 1) ID of select, 2) array of eligible players, 3) player currently on the roster
//It populates the selects, and sets the current selected player to show the user what their roster is currently
//cauchychoi 6/26/2018: Refactored where the array of eligible players is (playerName, position, team, timesUsed) or (playerName, timesUsed) for defense
//Also added select option disabled for players with 5+ uses
//TODO: jeffwang to think through use case where defensive players are being used on offense (e.g. Myles Jack)
function populateChoosePlayerLists(inputPosition, positionList, currentSelectedPlayer, weekChanged) {
    var select = document.getElementById(inputPosition);
	var currentOption;
	var currentSubtext;
	var currentMetadata;
    //for(var index in positionList) {
    //    select.options[select.options.length] = new Option(positionList[index], index);
    //}
	
	//If we just changed the week, then we don't want to re-populate the rosters
	if(!weekChanged) {
		select.options[select.options.length] = new Option("");
		if (inputPosition == "inputDEF") {
			for(i = 0; i < positionList.length; i++) {
				//Set attributes:
				//currentOption: set text and value of option
				//currentSubtext: show metadata of team: "(<number of uses>)" e.g. (0)
				currentOption = new Option(positionList[i]["playerName"], positionList[i]["playerName"]);
				currentSubtext = "<span style='font-weight:100'>("+positionList[i]["timesUsed"]+")</span>";
				
				//Set the option text and value
				select.options[select.options.length] = currentOption;
				
				//data-subtext = Subtext
				currentOption.setAttribute("data-subtext",currentSubtext);
				currentOption.setAttribute("data-position","DEF");
				currentOption.setAttribute("data-school",positionList[i]["playerName"]);
				currentOption.setAttribute("data-timesUsed",positionList[i]["timesUsed"]);
								
				if (positionList[i]["timesUsed"] >= 5) {   // disables the selector for the player just created if timesUsed >= 5. TODO: Remove all future uses
					select.options[select.options.length-1].disabled = true;
					select.options[select.options.length-1].style.color="red";
				}
				else if (positionList[i]["timesUsed"] == 4) {
					select.options[select.options.length-1].style.color="#FFA500";
				}
			}
		}
		else {
			for(i = 0; i < positionList.length; i++) {			
				//Set attributes:
				//currentOption: set text and value of option
				//currentSubtext: show metadata of player: "<position>, <school> (<number of uses>)" e.g. QB, UCLA (0)
				//currentMetadata: searchable key words: "<player first name> <player last name> <school>" e.g. Josh Rosen UCLA
				currentOption = new Option(positionList[i]["playerName"], positionList[i]["playerName"]);
				currentSubtext = positionList[i]["position"]+", "+positionList[i]["team"]+" ("+positionList[i]["timesUsed"]+")";
				currentMetadata = positionList[i]["playerName"] + " " + positionList[i]["team"];
				
				//Set the option text and value
				select.options[select.options.length] = currentOption;
				
				//data-subtext = Subtext
				//title = playerAbbr + currentSubtext
				//data-tokens = currentMetadata
				currentOption.setAttribute("data-subtext",currentSubtext);
				currentOption.setAttribute("title",positionList[i]["playerAbbr"]+' '+'<small class="text-muted" style="font-weight:100">' + currentSubtext + '</small>');
				currentOption.setAttribute("data-tokens",currentMetadata);
				currentOption.setAttribute("data-position",positionList[i]["position"]);
				currentOption.setAttribute("data-school",positionList[i]["team"]);
				currentOption.setAttribute("data-timesUsed",positionList[i]["timesUsed"]);

				if (positionList[i]["timesUsed"] >= 5) {
					select.options[select.options.length-1].disabled = true;
					select.options[select.options.length-1].style.color="red";
				}
				else if (positionList[i]["timesUsed"] == 4) {
					select.options[select.options.length-1].style.color="#FFA500";
				}
			}
		}
	}
	select.value = currentSelectedPlayer;
	$('#'+inputPosition).selectpicker('refresh');
	console.log("done populating "+inputPosition);
};

//jeffwang 3/24/2018: This function will unhide the hidden checkmarks to tell user that the player change was successfully made.  It will then quickly re-hide it.
function confirmPlayer(position) {
	console.log("player confirmed: "+position);
	$('#'+position+'Confirm').fadeIn("fast");
	$('#'+position+'Confirm').delay(300).fadeOut("slow");
}
function allMatchupsFunction() {
	//This is a dummy function because weekSelect.js calls allMatchupsFunction() when new week is selected
	console.log("allMatchupsFunction() called");
}

function fadeErrorFooter(text) {
	$('#errorBannerContent').html(text);
	console.log("error found");
	$('.bottomErrorBanner').fadeIn("fast");
	
	setTimeout(myVar = exitErrorFooter,6000);
	//$('.bottomErrorBanner').delay(3000);
	//exitErrorFooter();
}

function exitErrorFooter() {
	$('.bottomErrorBanner').fadeOut("slow");
}