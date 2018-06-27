//jeffwang 3/14/2018: On document.ready, need to populate eligible players for user to select.
//To do this, need to send query to loadTeamRoster.php to tell the user which players they have currently chosen for the week.
//Then, need to pass this data to getDataforChoosePlayerLists(), which passes it to populateChoosePlayerLists() to set default values
//Functions being run once page is loaded: 
//1) getDataforChoosePlayerLists(), which calls populateChoosePlayerLists()
$( document ).ready(
	function sendTeamRosterToPhp() {
		//Set default week value 
	    var currentWeek = document.getElementById("currentWeekNum");
		currentWeek.value = 12;	//This is hardcoded right now TODO: jeffwang to figure out how to make this change based on the current week
		
		var urlArray = getUrlVars();
		console.log(urlArray);
		var week	=	$("#currentWeekNum").val();
		var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
		
		var teamName=	urlArray["teamName"];
		$('#currentTeamName').html(teamName);
		
	    loadTeamRoster(week, teamID);	//Populate select lists based on the week, set rosters that have already been chosen
		//checkGameStarted(week, teamID);  //uncomment when ready
		
		$("#refreshPoints").click( function(event) {
		  event.preventDefault();
		  //console.log("clicked!");
		  getFantasyPoints();
		});
		
		$("#headerTableColumn1").click( function(event) {
			window.location.href = "league.html" + window.location.search;
		});
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.html" + window.location.search;
		});
		
});

function updatePage() {
	var urlArray = getUrlVars();
	var week	=	$("#currentWeekNum").val();
	var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
	var teamName=	urlArray["teamName"];
	
	loadTeamRoster(week, teamID);	//Populate select lists based on the week, set rosters that have already been chosen
	//checkGameStarted(week, teamID);  //Uncomment when ready
	
}

function loadTeamRoster(week, teamID) {
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
		  getDataForChoosePlayerLists("QB", phpResponse[week].QB, teamID);
		  getDataForChoosePlayerLists("RB1", phpResponse[week].RB1, teamID);
		  getDataForChoosePlayerLists("RB2", phpResponse[week].RB2, teamID);
		  getDataForChoosePlayerLists("WR1", phpResponse[week].WR1, teamID);
		  getDataForChoosePlayerLists("WR2", phpResponse[week].WR2, teamID);
		  getDataForChoosePlayerLists("WR3", phpResponse[week].WR3, teamID);
		  getDataForChoosePlayerLists("TE", phpResponse[week].TE, teamID);
		  getDataForChoosePlayerLists("DEF", phpResponse[week].DEF, teamID);
		  getDataForChoosePlayerLists("K", phpResponse[week].K, teamID);
		  getDataForChoosePlayerLists("FLEX", phpResponse[week].FLEX, teamID);
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
	  
		  if(	playerPoints[$('#inputQB').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputQB').val()]);
			  $('#qbPoints').html(playerPoints[$('#inputQB').val()]);
		  }
		  else {
			  $('#qbPoints').html("0");
		  }
		  if(	playerPoints[$('#inputRB1').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputRB1').val()]);
			  $('#rb1Points').html(playerPoints[$('#inputRB1').val()]);
		  }
		  else {
			  $('#rb1Points').html("0");
		  }
		  if(	playerPoints[$('#inputRB2').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputRB2').val()]);
			  $('#rb2Points').html(playerPoints[$('#inputRB2').val()]);
		  }
		  else {
			  $('#rb2Points').html("0");
		  }
		  if(	playerPoints[$('#inputWR1').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputWR1').val()]);
			  $('#wr1Points').html(playerPoints[$('#inputWR1').val()]);
		  }
		  else {
			  $('#wr1Points').html("0");
		  }
		  if(	playerPoints[$('#inputWR2').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputWR2').val()]);
			  $('#wr2Points').html(playerPoints[$('#inputWR2').val()]);
		  }
		  else {
			  $('#wr2Points').html("0");
		  }
		  if(	playerPoints[$('#inputWR3').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputWR3').val()]);
			  $('#wr3Points').html(playerPoints[$('#inputWR3').val()]);
		  }
		  else {
			  $('#wr3Points').html("0");
		  }
		  if(	playerPoints[$('#inputTE').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputTE').val()]);
			  $('#tePoints').html(playerPoints[$('#inputTE').val()]);
		  }
		  else {
			  $('#tePoints').html("0");
		  }
		  if(	playerPoints[$('#inputDEF').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputDEF').val()]);
			  $('#defPoints').html(playerPoints[$('#inputDEF').val()]);
		  }
		  else {
			  $('#defPoints').html("0");
		  }
		  if(	playerPoints[$('#inputK').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputK').val()]);
			  $('#kPoints').html(playerPoints[$('#inputK').val()]);
		  }
		  else {
			  $('#kPoints').html("0");
		  }
		  if(	playerPoints[$('#inputFLEX').val()] != undefined	) {
			  //console.log(playerPoints[$('#inputFLEX').val()]);
			  $('#flexPoints').html(playerPoints[$('#inputFLEX').val()]);
		  }
		  else {
			  $('#flexPoints').html("0");
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
	var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
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
	verifyNoDupes(position, week, teamID);		//Check for dupes
	
	//JEFF TO CONFIRM THIS CODE: checkGameStarted returns an array of disabled newPositions. Only run the code below if a position is not disabled. This should also run checkGameStarted which is what we want.
	//if (!checkGameStarted(week, teamID).indexOf(newPosition) > -1) {
		// PUT ALL CODE BELOW IN HERE IF YOU AGREE.
	//}
	
	//If duplicate names exist, block the sql query and inform user
	
}

function makeChangesToTeamRoster(position, week, teamID, dupesExist) {
	if(dupesExist) {
		$("#errorOutput p:first").html("Can't have duplicate players!");
	} else {
		$("#errorOutput p:first").html("");
		switch(position) {
		    case "QBtophp":
		        dataString = 'QBtophp='+$('#inputQB').val()+'&weekNum='+week+'&teamIDNum='+teamID;
				confirmPosition = "qb";
		        break;
		    case "RB1tophp":
		        dataString = 'RB1tophp='+$('#inputRB1').val()+'&weekNum='+week+'&teamIDNum='+teamID;
				confirmPosition = "rb1";
		        break;
			case "RB2tophp":
		        dataString = 'RB2tophp='+$('#inputRB2').val()+'&weekNum='+week+'&teamIDNum='+teamID;
				confirmPosition = "rb2";
		        break;
		    case "WR1tophp":
		        dataString = 'WR1tophp='+$('#inputWR1').val()+'&weekNum='+week+'&teamIDNum='+teamID;
				confirmPosition = "wr1";
		        break;
			case "WR2tophp":
		        dataString = 'WR2tophp='+$('#inputWR2').val()+'&weekNum='+week+'&teamIDNum='+teamID;
				confirmPosition = "wr2";
		        break;
			case "WR3tophp":
		        dataString = 'WR3tophp='+$('#inputWR3').val()+'&weekNum='+week+'&teamIDNum='+teamID;
				confirmPosition = "wr3";
		        break;
			case "TEtophp":
		        dataString = 'TEtophp='+$('#inputTE').val()+'&weekNum='+week+'&teamIDNum='+teamID;
				confirmPosition = "te";
		        break;
			case "Ktophp":
		        dataString = 'Ktophp='+$('#inputK').val()+'&weekNum='+week+'&teamIDNum='+teamID;
				confirmPosition = "k";
		        break;
			case "DEFtophp":
		        dataString = 'DEFtophp='+$('#inputDEF').val()+'&weekNum='+week+'&teamIDNum='+teamID;
				confirmPosition = "def";
		        break;
			case "FLEXtophp":
		        dataString = 'FLEXtophp='+$('#inputFLEX').val()+'&weekNum='+week+'&teamIDNum='+teamID;
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
			  console.log("ran confirmPlayer function");
			  getFantasyPoints();
		    }
		});
	}
}

//jeffwang 3/14/2018: This function is currently runs whenever a player change is made.
//It will check to see that no player is used twice, return true if all players are unique. return false if there is a duplicate
function verifyNoDupes(position, week, teamID) {
    /*
	if(		(	($('#inputRB1').val() == $('#inputRB2').val()) 	&& ($('#inputRB1').val() != null)		) ||
			(	($('#inputWR1').val() == $('#inputWR2').val()) 	&& ($('#inputWR1').val() != null)		) ||
			(	($('#inputWR2').val() == $('#inputWR3').val()) 	&& ($('#inputWR2').val() != null)		) ||
			(	($('#inputWR1').val() == $('#inputWR3').val()) 	&& ($('#inputWR3').val() != null)		) ||
			(	($('#inputFLEX').val() == $('#inputRB1').val())	&& ($('#inputRB1').val() != null)		) ||
			(	($('#inputFLEX').val() == $('#inputRB2').val())	&& ($('#inputRB2').val() != null)		) ||
			(	($('#inputFLEX').val() == $('#inputWR1').val()) && ($('#inputWR1').val() != null)		) ||
			(	($('#inputFLEX').val() == $('#inputWR2').val()) && ($('#inputWR2').val() != null)		) ||
			(	($('#inputFLEX').val() == $('#inputWR3').val()) && ($('#inputWR3').val() != null)		) ||
			(	($('#inputFLEX').val() == $('#inputTE').val()) 	&& ($('#inputTE').val() != null)		)
	) {
		
		return true;
	} else {
		return false;
	}
    */
	
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
		  console.log("rb1="+$('#inputRB1').val()+", teamRoster's RB2="+phpResponse[week]["RB2"]);
		  //TODO: jeffwang to add cases for any other dupe
		  //Player changes RB1 to equal the same value as teamRoster's RB2
	      if(	( 
			  		//($('#inputRB1').val().localeCompare(phpResponse[week]["RB2"]) == 0) 	||
			  		//($('#inputRB2').val().localeCompare(phpResponse[week]["RB1"]) == 0)
			  
			  		($('#inputRB1').val() == phpResponse[week]["RB2"]) 	||
			  		($('#inputRB2').val() == phpResponse[week]["RB1"])
		  		)
		  	  	&& 	
				(
				  	($('#inputRB1').val() != null)	&&
			  		($('#inputRB2').val() != null)
		  		)	
		  ) {
			  console.log("values were the same!");

				$('#inputRB1').val(phpResponse[week]["RB2"]);
				$('#inputRB2').val(phpResponse[week]["RB1"]);

				switchPlayerUpdateRoster("RB1", "RB2", week, teamID);
				makeChangesToTeamRoster(position, week, teamID, true);			  
	  	  } else {
			  makeChangesToTeamRoster(position, week, teamID, false);			  
	  	  }
	    }
	});  
}

function addPlayerToRoster(dataString) {
	$.ajax({
		type: "POST",
		url: "testpage2.php",
		data: dataString,
		success: function(response) {
			console.log("switch players: "+response);

			getFantasyPoints();
		}
	});
}

function switchPlayerUpdateRoster(position1, position2, week, teamID) {
  	dataString = position1+'tophp='+$('#input'+position1).val()+'&weekNum='+week+'&teamIDNum='+teamID;
	addPlayerToRoster(dataString);

  	dataString = position2+'tophp='+$('#input'+position2).val()+'&weekNum='+week+'&teamIDNum='+teamID;
	addPlayerToRoster(dataString);
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
		  }
		  console.log("finished checking if games are started");	//For testing
	    }
	});
	return disabledPositions;
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

//cauchychoi 6/26/18: Checks to see if a player has hit its use limit and disables the <option> in the <select>
function disablePlayer() {
	
}

//jeffwang 3/14/2018: This function is currently run on document.ready for each position. It will:
//1) Send query to getAvailablePlayers.php to query collegeTeamRoster table to figure out which players you can choose
//2) Run populateChoosePlayerLists(), which populates the select options for each position
//TODO: jeffwang to add case "DEF" to the switch statement
function getDataForChoosePlayerLists(position,currentSelectedPlayer,teamID) {
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
		  populateChoosePlayerLists("input"+position, playerList, currentSelectedPlayer);		
		  
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
//TODO: jeffwang to think through use case where defensive players are being used on offense (e.g. Myles Jack)
function populateChoosePlayerLists(inputPosition, positionList, currentSelectedPlayer) {
    var select = document.getElementById(inputPosition);
    //for(var index in positionList) {
    //    select.options[select.options.length] = new Option(positionList[index], index);
    //}
	if (inputPosition == "inputDEF") {
		for(i = 0; i < positionList.length; i++) {
			select.options[select.options.length] = new Option(positionList[i]["playerName"] + " (" + positionList[i]["timesUsed"] + ")", positionList[i]["playerName"]);
		}
	}
	else {
		for(i = 0; i < positionList.length; i++) {
			select.options[select.options.length] = new Option(positionList[i]["playerName"] + " (" + positionList[i]["position"] + ", " + positionList[i]["team"] + ") (" + positionList[i]["timesUsed"] + ")", positionList[i]["playerName"]);
		}
	}
	select.value = currentSelectedPlayer;
};

//jeffwang 3/24/2018: This function will unhide the hidden checkmarks to tell user that the player change was successfully made.  It will then quickly re-hide it.
function confirmPlayer(position) {
	console.log("player confirmed: "+position);
	$('#'+position+'Confirm').fadeIn("fast");
	$('#'+position+'Confirm').delay(300).fadeOut("slow");
}