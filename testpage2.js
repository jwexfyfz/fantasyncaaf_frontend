//jeffwang 3/14/2018: On document.ready, need to populate eligible players for user to select.
//To do this, need to send query to loadTeamRoster.php to tell the user which players they have currently chosen for the week.
//Then, need to pass this data to getDataforChoosePlayerLists(), which passes it to populateChoosePlayerLists() to set default values
//Functions being run once page is loaded: 
//1) getDataforChoosePlayerLists(), which calls populateChoosePlayerLists()
$( document ).ready(
	function sendTeamRosterToPhp() {
		//Set default week value 
		//UPDATE THIS EVERY WEEK TO SET CURRENT WEEK TODO: jeffwang to figure out how to make this change based on the current week
		//cauchychoi: The code below should work.
		var currentWeek = 1;
		if (Date.now() > new Date('November 20, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 13;
		}
		else if (Date.now() > new Date('November 13, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 12;
		}
		else if (Date.now() > new Date('November 6, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 11;
		}
		else if (Date.now() > new Date('October 30, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 10;
		}
		else if (Date.now() > new Date('October 23, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 9;
		}
		else if (Date.now() > new Date('October 16, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 8;
		}
		else if (Date.now() > new Date('October 9, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 7;
		}
		else if (Date.now() > new Date('October 2, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 6;
		}
		else if (Date.now() > new Date('September 25, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 5;
		}
		else if (Date.now() > new Date('September 18, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 4;
		}
		else if (Date.now() > new Date('September 11, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 3;
		}
		else if (Date.now() > new Date('September 4, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 2;
		}
		
		$("#refreshPoints").click( function(event) {
		  event.preventDefault();
		  getFantasyPoints();
		});
		
		$("#headerTableColumn1").click( function(event) {
			window.location.href = "league.php" + window.location.search;
		});
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.php" + window.location.search;
		});	
				
		$("#errorBannerExit").click( function(event) {
			clearTimeout(myVar);
			console.log("clearTimeout ran");
			exitErrorFooter();
		});	
		
		$("#clearQB, #clearRB1, #clearRB2, #clearWR1, #clearWR2, #clearWR3, #clearTE, #clearDEF, #clearK, #clearFLEX").click( function(event) {
			console.log($(this).attr('id')+" clicked");
			var position = $(this).attr('id').replace("clear","");
			$('#input'+position).val("");
			$('#input'+position).selectpicker('refresh');
			sendToPhp(position+"tophp");
		});
		
		$("#currentWeekNum").val(currentWeek);
		console.log("Current week is now set to "+$("#currentWeekNum").val());
		
		$("#currentWeekCircle").html(currentWeek);
		console.log("setting #week"+currentWeek+"Circle to #6495ED");
		$("#week"+currentWeek+"Circle").css('background-color','#F7882F');
		console.log("#week"+currentWeek+"Circle is now "+$("#week"+currentWeek+"Circle").css('background-color'));
		
		
		var urlArray = getUrlVars();
		//console.log(urlArray);
		var week	=	$("#currentWeekNum").val();
		var teamID	=	$("#teamID").val()
		console.log("teamID: "+teamID);
		
		var teamName = $("#teamName").val();
		
	    loadTeamRoster(week, teamID, false);	//Populate select lists based on the week, set rosters that have already been chosen
		checkGameStarted(week, teamID);  //uncomment when ready
		
});

function updatePage(teamID) {
	console.log("week changed to "+$('#currentWeekNum').val());
	var urlArray = getUrlVars();
	var week	=	$("#currentWeekNum").val();
	//var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
	//var teamID	=	$("#teamID").val();
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
		  console.log("response from loadTeamRoster.php: "+response);
		  console.log("successfully sent query to tell php to provide team roster!");	//For testing
		  phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a teamRoster, followed by the chosen positions of that roster
		  
		  $('#QBgametime').html(convertToReadableDate(new Date(phpResponse["QB"]["gametime"]+ " UTC")));
		  $('#RB1gametime').html(convertToReadableDate(new Date(phpResponse["RB1"]["gametime"]+ " UTC")));
		  $('#RB2gametime').html(convertToReadableDate(new Date(phpResponse["RB2"]["gametime"]+ " UTC")));
		  $('#WR1gametime').html(convertToReadableDate(new Date(phpResponse["WR1"]["gametime"]+ " UTC")));
		  $('#WR2gametime').html(convertToReadableDate(new Date(phpResponse["WR2"]["gametime"]+ " UTC")));
		  $('#WR3gametime').html(convertToReadableDate(new Date(phpResponse["WR3"]["gametime"]+ " UTC")));
		  $('#TEgametime').html(convertToReadableDate(new Date(phpResponse["TE"]["gametime"]+ " UTC")));
		  $('#DEFgametime').html(convertToReadableDate(new Date(phpResponse["DEF"]["gametime"]+ " UTC")));
		  $('#Kgametime').html(convertToReadableDate(new Date(phpResponse["K"]["gametime"]+ " UTC")));
		  $('#FLEXgametime').html(convertToReadableDate(new Date(phpResponse["FLEX"]["gametime"]+ " UTC")));
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

function convertToReadableDate(date) {
	//If you use new Date(null + " UTC"), it should return "Invalid Date".
	//If Invalid Date, return blank date
	if(date.toString() == "Invalid Date") {
		return "";
	}

	var month = date.getMonth() + 1;	//Get month (starts from 0)
	var dayOfMonth = date.getDate();	//Get date
	var dayOfWeek = "";
	
	switch(date.getDay()) {				//Get day of week.  0 = Sunday, 6 = Saturday
		case 0:
			dayOfWeek = "Sun";
			break;
		case 1:
			dayOfWeek = "Mon";
			break;
		case 2:
			dayOfWeek = "Tues";
			break;
		case 3:
			dayOfWeek = "Wed";
			break;
		case 4:
			dayOfWeek = "Thurs";
			break;
		case 5:
			dayOfWeek = "Fri";
			break;
		case 6:
			dayOfWeek = "Sat";
			break;
		default:
			dayOfWeek = "";
	}
	
	var hour = 12;						//Hour will default to 12 for when hour = 0
	var amPM = "AM";					//Hour will default to AM for when 0 < hour < 12
	if(date.getHours() > 12) {			//Subtract 12 from hour if > 12
		hour = date.getHours() - 12;	//Set to PM
		amPM = "PM";
	}
	else if(date.getHours() == 12) {	//Hour is 12 already, means 12:00PM
		amPM = "PM";					
	}
	else if(date.getHours() == 0) {		//Hour is 0 means 12:00AM
		amPM = "AM";
	}
	else {								//Hour < 12 means stay the same
		hour = date.getHours();			//Hour stays as AM from default value
	}

	var minute = "00";					
	if(date.getMinutes() >= 10) {		//If minute value >= 10, no need to change value
		minute = date.getMinutes();
	}
	else {								//If minute vaue < 10 (including 0), need to append 0 in front.  Otherwise it becomes 12:0PM or 12:1PM
		minute = "0"+date.getMinutes();
	}

	var parenthesis = date.toString().match(/\(.+\)/g);			//Extract everything within parenthesis first from date.  Example date: Sat Sep 01 2018 16:00:00 GMT-0700 (Pacific Daylight Time)
	var timezoneArray = parenthesis.toString().match(/[A-Z]/g);	//Extract capital letters from above string.  Example input: (Pacific Daylight Time)
	var timezone = timezoneArray.join("");						//Join the array together into a string with no separator

	var output = month+"/"+dayOfMonth+" "+dayOfWeek+" "+hour+":"+minute+" "+amPM+" "+timezone;	//Put together in format: MM/DD HH:MM AM/PM [timezone] e.g. 9/1 1:00 PM PST

	return output;
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
				  //console.log("QB is disabled, so setting points to 0");
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
				  //console.log("RB1 is disabled, so setting points to 0");
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
				  //console.log("RB2 is disabled, so setting points to 0");
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
				  //console.log("WR1 is disabled, so setting points to 0");
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
				  //console.log("WR2 is disabled, so setting points to 0");
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
				  //console.log("WR3 is disabled, so setting points to 0");
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
				  //console.log("TE is disabled, so setting points to 0");
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
				  //console.log("DEF is disabled, so setting points to 0");
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
				  //console.log("K is disabled, so setting points to 0");
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
				  //console.log("FLEX is disabled, so setting points to 0");
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
	if (newPosition == "inputDEF") {
		checkPlayerStarted(week, teamID, position, $('#'+newPosition).val(), true, teamName);
	}
	else {
		checkPlayerStarted(week, teamID, position, $('#'+newPosition).val(), false, teamName);
	}
	//verifyNoDupes(position.replace("tophp",""), week, teamID, teamName);		//Check for dupes
	
	//JEFF TO CONFIRM THIS CODE: checkGameStarted returns an array of disabled newPositions. Only run the code below if a position is not disabled. This should also run checkGameStarted which is what we want.
	//if (!checkGameStarted(week, teamID).indexOf(newPosition) > -1) {
		// PUT ALL CODE BELOW IN HERE IF YOU AGREE.
	//}
	
	//If duplicate names exist, block the sql query and inform user
	
}

function makeChangesToTeamRoster(position, week, teamID, teamName) {
	//console.log("from makeChangesToTeamRoster, switchPostion1="+switchPosition1+", switchPosition2="+switchPosition2);
//	if(dupesExist) {
//		$("#errorOutput p:first").html("Can't have duplicate players!");
//	} 
	//This else condition is here because this function is called many times, so we don't want to execute a query to sql every time.  TE and FLEX happen to be the last one.  TODO: jeffwang to remove the extra query to sql from this function after two players have already been switched via addPlayerToRoster function
	//else if(	(switchPosition1 == "TE")	&&	(switchPosition2 == "FLEX")	) {		
//		$("#errorOutput p:first").html("");
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
			  //getGameTimeOfPlayer(confirmPosition);  // WHAT IS THIS??
			  getFantasyPoints();
		    }
		});
	//}
}


//jeffwang 3/14/2018: This function is currently runs whenever a player change is made.
//It will check to see that no player is used twice, return true if all players are unique. return false if there is a duplicate
function verifyNoDupes(position, week, fantasyID, teamName, playerGametimeArray) {	
    var phpResponse;
	
	//only need week and fantasyID to retrieve a user's roster
	var dataString = 'weekNum='+week+'&teamIDNum='+fantasyID;
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
		  
			comparePotentialDupes(position, phpResponse, week, fantasyID, teamName, playerGametimeArray);
	    }
	});  
}

function teamDupes(week, fantasyID, numDupeTeamsAllowed, position, teamRoster, teamName, playerGametimeArray) {
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
			console.log("Response from getPlayerSchools.php: "+JSON.stringify(phpResponse));
			
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
				
				//No need to revert back to the original player's gametime unless the change is allowed, since we never made the change to the new player's gametime
				
				//Display error message
				//"Your roster has too many players from <team>. Remove one of the <team> players and try again."
				fadeErrorFooter("Your roster has too many players from <b>" + selectedPlayerTeam + "<b>.<br/><span style='font-size:0.8em'>Remove one of the <b>" + selectedPlayerTeam + "</b> players and try again.</span>");
				loadTeamRoster(week, fantasyID, true);  // Should this be false??
				//return false;
			}
			else {  // allow the change
				console.log("CHANGE ALLOWED");
				
				//If not switching players and player is a valid change, populate gametime of new player
				var selectVal = "input"+position.replace("tophp","");
				
				$('#'+position.replace("tophp","gametime")).html(convertToReadableDate(new Date(playerGametimeArray[$('#'+selectVal).val()]+" UTC")));
				
				makeChangesToTeamRoster(position, week, fantasyID, teamName);
			}
	    }
	});  
}

function getNumDupeTeamsAllowed(week, fantasyID, position, teamRoster, teamName, playerGametimeArray) {
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
		  teamDupes(week, fantasyID, phpResponse, position, teamRoster, teamName, playerGametimeArray);
	    }
	});
	
}

function comparePotentialDupes (position, phpResponse, week, teamID, teamName, playerGametimeArray){
    console.log("639: position: "+position);
    console.log("640: position: "+position.replace("tophp","gametime"));
	
	var selectVal = "input"+position.replace("tophp","");
	console.log("current position value: "+$('#'+selectVal).val());
	console.log("gametime of current position value: " + playerGametimeArray[	$('#'+selectVal).val()	]	);
	console.log("name of div setting html in: "+'#'+position.replace("tophp","gametime"));
	
	//If position doesn't have a gametime yet, set it.  If it already has one, populate it after switch logic.
	//if($('#'+position.replace("tophp","gametime")).html() == "") {
	//	$('#'+position.replace("tophp","gametime")).html(playerGametimeArray[$('#'+selectVal).val()]);
	//}
	
	
	var switchedPlayers = false;
	var switchPosition1 = ["RB1","RB1","RB2","WR1","WR2","WR1","WR1","WR2","WR3","TE"];
	var switchPosition2 = ["RB2","FLEX","FLEX","WR2","WR3","WR3","FLEX","FLEX","FLEX","FLEX"];
	
	for (var i = 0; i < switchPosition1.length; i++) {
		//Cycle through all the potential positions that can be duped
		//If the current selected player is the same as teamRoster's player for that position and NOT blank:
		if(	(	($('#input'+switchPosition1[i]).val() == phpResponse[week][switchPosition2[i]]) 	||
		  		($('#input'+switchPosition2[i]).val() == phpResponse[week][switchPosition1[i]])		)	&& 	
			(	($('#input'+switchPosition1[i]).val() != "")	&&
			(	$('#input'+switchPosition2[i]).val() != "")		)												) 
		{
			//Switch the players in the select dropdown on the page
			console.log("values were the same!");
			
			var temp = $('#'+switchPosition1[i]+"gametime").html();
			
			console.log("temp: "+temp);
			console.log('#'+switchPosition1[i]+"gametime: "+$('#'+switchPosition1[i]+"gametime").html());
			console.log('#'+switchPosition2[i]+"gametime: "+$('#'+switchPosition2[i]+"gametime").html());
			

			$('#'+switchPosition1[i]+"gametime").html($('#'+switchPosition2[i]+"gametime").html());
			$('#'+switchPosition2[i]+"gametime").html(temp);
			
			
			
			$('#input'+switchPosition1[i]).val(phpResponse[week][switchPosition2[i]]);
			$('#input'+switchPosition2[i]).val(phpResponse[week][switchPosition1[i]]);
			
			
			
			console.log("after switch");
			console.log('#'+switchPosition1[i]+"gametime: "+$('#'+switchPosition1[i]+"gametime").html());
			console.log('#'+switchPosition1[i]+"gametime: "+$('#'+switchPosition2[i]+"gametime").html());
		
			//Refresh the select dropdown so the UI reflects the select values' states
			$('#input'+switchPosition1[i]).selectpicker('refresh');
			$('#input'+switchPosition2[i]).selectpicker('refresh');

			//Make updates to teamRoster
			switchedPlayers = true;
			switchPlayerUpdateRoster(switchPosition1[i], switchPosition2[i], week, teamID, teamName);
			//makeChangesToTeamRoster(position, week, teamID, true);			  
		} 
	}
	if (!switchedPlayers) {
		//If not switching, populate gametime of new player
		//TODO: jeffwang to remove this after moving this into the following functions
		//$('#'+position.replace("tophp","gametime")).html(playerGametimeArray[$('#'+selectVal).val()]);
		getNumDupeTeamsAllowed(week, teamID, position, phpResponse, teamName, playerGametimeArray);		//Check for dupes
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

//cauchychoi 8/19/18: When a player gets changed, this function checks to see if both the player prior to the change and the newly selected player's games have begun.
//The switch is not allowed if either player's game has started
function checkPlayerStarted(week, fantasyID, position, playerOrTeamName, defSelected, teamName) {
	var phpResponse;
	//only need week and fantasyID to retrieve a user's roster
	var dataString = ""
	if (defSelected) {
		dataString = 'weekNum='+week+'&fantasyID='+fantasyID+'&position='+position.replace("tophp","")+'&team='+playerOrTeamName;
	}
	else {
		dataString = 'weekNum='+week+'&fantasyID='+fantasyID+'&position='+position.replace("tophp","")+'&playerName='+playerOrTeamName.trim().replace(/ /g, '%20');
	}
	console.log("checkPlayerStarted dataString: "+dataString);
	
	$.ajax({
	    type: "POST",
	    url: "checkPlayerStarted.php",
	    data: dataString,
	    success: function(response) {
			phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a [playerID, teamID, position, hasPlayed, gametime]
			console.log("checkPlayerStarted results: "+JSON.stringify(phpResponse));
			//Iterate through game times and don't allow change if the game has started
			var playerGameStarted = false;

			for (var key in phpResponse) {
				var gametime = new Date(phpResponse[key] + " UTC");
				if (Date.now() > gametime.getTime()) {
					fadeErrorFooter("The selected player's game has already begun!<br/>");
					loadTeamRoster(week, fantasyID, true);  // Should this be false??
					playerGameStarted = true;
				}
			}

			if (!playerGameStarted) {
				verifyNoDupes(position, week, fantasyID, teamName, phpResponse);		//Check for dupes
				checkGameStarted(week, fantasyID);
			}
		}
	});
}

//cauchychoi 4/4/2018: This function runs on page load or whenever a player change is made.
//It will check to see if a player's gametime has started and disable that 'select'. It will also update timesPlayerUsed
//TODO: Add to both page load and when a player selects something. (Is that the sendtophp function?)
function checkGameStarted(week, fantasyID, playerGametimeArray) {
	 
	var phpResponse;
	var disabledPositions = [];
	//only need week and fantasyID to retrieve a user's roster
	var dataString = 'weekNum='+week+'&fantasyID='+fantasyID;
	
	$.ajax({
	    type: "POST",
	    url: "checkGameStarted.php",
	    data: dataString,
	    success: function(response) {
			phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a [playerID, teamID, position, hasPlayed, gametime]
			console.log("checkGameStarted response: "+JSON.stringify(phpResponse));
			//Iterate through game times and disable selector for players whose games have started
		  
			//Re-enable all positions
			document.getElementById("inputQB").disabled = false;
			document.getElementById("inputRB1").disabled = false;
			document.getElementById("inputRB2").disabled = false;
			document.getElementById("inputWR1").disabled = false;
			document.getElementById("inputWR2").disabled = false;
			document.getElementById("inputWR3").disabled = false;
			document.getElementById("inputTE").disabled = false;
			document.getElementById("inputDEF").disabled = false;
			document.getElementById("inputK").disabled = false;
			document.getElementById("inputFLEX").disabled = false;
		  
			var i;
			for (i = 0; i < phpResponse.length; i++) {
				if (phpResponse[i]["gametime"] != null) {
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
					}
				}
			}
			console.log("finished checking if games are started");	//For testing
		}
	});
	return disabledPositions;
}

//This function is taken from somewhere else, but should take in an array and output the unique values in the array
function getUnique(inputArray)
{
    var outputArray = [];
    
    for (var i = 0; i < inputArray.length; i++)
    {
        if ((jQuery.inArray(inputArray[i], outputArray)) == -1)
        {
            outputArray.push(inputArray[i]);
        }
    }
   
    return outputArray;
}


//Disable players from schools that have already played
function disablePlayers(position, teamsPlayed) {
	console.log('teamsPlayed length: '+teamsPlayed.length);
	$('#input'+position+' option').each(function(i){
	    for (j = 0; j < teamsPlayed.length; j++) {
			console.log("option's data-teamid: "+this.dataset.teamid+", teamsPlayed: "+teamsPlayed[j]);
			if(this.dataset.teamid == teamsPlayed[j]) {
				console.log("team has played: "+this.dataset.teamid);
				this.setAttribute('disabled', 'true');
			}
		}
	});
	console.log("finished going through for loop");
}

//cauchychoi 6/12/18: Update timesplayerused table
function updateTimesPlayerUsed(playerID, fantasyID, week, position) {
	var phpResponse;
	
	var dataString = 'playerID='+playerID+'&fantasyID='+fantasyID+'&weekNum='+week+'&position='+position;
	console.log("updateTimesPlayerUsed dataString: "+dataString);
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
		  var playerList=JSON.parse(response);
		  
		  //Parameters are 1) ID of select, 2) array of eligible players, 3) player currently on the roster
		  //TODO: jeffwang to figure out edge case when no players are chosen yet
		  populateChoosePlayerLists("input"+position, playerList, currentSelectedPlayer, weekChanged);		
		  
		  	if(position="FLEX") {
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
				
		//This adds a blank option
		currentOption = new Option("-- Clear Selection --","");
		select.options[select.options.length] = currentOption;
		
		//Make the empty option show as "clear selection" in dropdown
		currentOption.setAttribute("title", "");
		currentOption.setAttribute("data-tokens", "clear selection");
		
		
		if (inputPosition == "inputDEF") {
			for(i = 0; i < positionList.length; i++) {
				//Convert positionList's gametime to UTC time format
				var gametime = new Date(positionList[i]["gametime"] + " UTC");
				

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
				currentOption.setAttribute("data-teamID",positionList[i]["teamID"]);
								
				if (	(positionList[i]["timesUsed"] >= 5)	||	(Date.now() > gametime.getTime())	) {   // disables the selector for the player just created if timesUsed >= 5. TODO: Remove all future uses
					select.options[select.options.length-1].disabled = true;
					select.options[select.options.length-1].style.color="#D3D3D3";
					console.log("disabled "+positionList[i]["playerName"]+"because used 5 times or game is already done. gametime: "+positionList[i]["gametime"]);
				}
				else if (positionList[i]["timesUsed"] == 4) {
					select.options[select.options.length-1].style.color="#FFA500";
					console.log("didn't disable "+positionList[i]["playerName"]);
				}
			}
		}
		else {
			for(i = 0; i < positionList.length; i++) {	
				//Convert positionList's gametime to UTC time format
				var gametime = new Date(positionList[i]["gametime"] + " UTC");
						
				//Set attributes:
				//currentOption: set text and value of option
				//currentSubtext: show metadata of player: "<position>, <school> (<number of uses>)" e.g. QB, UCLA (0)
				//currentMetadata: searchable key words: "<player first name> <player last name> <school>" e.g. Josh Rosen UCLA
				currentOption = new Option(positionList[i]["playerName"], positionList[i]["playerName"]);
				currentSubtext = positionList[i]["position"]+", "+positionList[i]["team"]+" ("+positionList[i]["timesUsed"]+")";
				currentMetadata = positionList[i]["playerName"] + " " + positionList[i]["team"];
				
				//Set the option text and value
				select.options[select.options.length] = currentOption;

				currentOption.setAttribute("data-subtext",currentSubtext);
				currentOption.setAttribute("title",positionList[i]["playerAbbr"]+' '+'<small class="text-muted" style="font-weight:100">' + currentSubtext + '</small>');
				currentOption.setAttribute("data-tokens",currentMetadata);
				currentOption.setAttribute("data-position",positionList[i]["position"]);
				currentOption.setAttribute("data-school",positionList[i]["team"]);
				currentOption.setAttribute("data-timesUsed",positionList[i]["timesUsed"]);
				currentOption.setAttribute("data-teamID",positionList[i]["teamID"]);

				if (	(positionList[i]["timesUsed"] >= 5)		||	(Date.now() > gametime.getTime())	) {
					select.options[select.options.length-1].disabled = true;
					select.options[select.options.length-1].style.color="#D3D3D3";
					console.log("disabled "+positionList[i]["playerName"]+"because used 5 times or game is already done. gametime: "+positionList[i]["gametime"]);
				}
				else if (positionList[i]["timesUsed"] == 4) {
					select.options[select.options.length-1].style.color="#FFA500";
					console.log("didn't disable "+positionList[i]["playerName"]);
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