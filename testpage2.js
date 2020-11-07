//jeffwang 3/14/2018: On document.ready, need to populate eligible players for user to select.
//To do this, need to send query to loadTeamRoster.php to tell the user which players they have currently chosen for the week.
//Then, need to pass this data to getDataforChoosePlayerLists(), which passes it to populateChoosePlayerLists() to set default values
//Functions being run once page is loaded: 
//1) getDataforChoosePlayerLists(), which calls populateChoosePlayerLists()
$( document ).ready(
	function sendTeamRosterToPhp() {
		//Set default week value.  Currently hardcoded for the 2019 season
		var currentWeek = 1;
		if (Date.now() > new Date('December 14, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 16;
		}
		else if (Date.now() > new Date('December 7, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 15;
		}
		else if (Date.now() > new Date('November 30, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 14;
		}
		else if (Date.now() > new Date('November 23, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 13;
		}
		else if (Date.now() > new Date('November 16, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 12;
		}
		else if (Date.now() > new Date('November 9, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 11;
		}
		else if (Date.now() > new Date('November 2, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 10;
		}
		else if (Date.now() > new Date('October 26, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 9;
		}
		else if (Date.now() > new Date('October 19, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 8;
		}
		else if (Date.now() > new Date('October 12, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 7;
		}
		else if (Date.now() > new Date('October 5, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 6;
		}
		else if (Date.now() > new Date('September 28, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 5;
		}
		else if (Date.now() > new Date('September 21, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 4;
		}
		else if (Date.now() > new Date('September 14, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 3;
		}
		else if (Date.now() > new Date('September 7, 2020 07:00:00 UTC').getTime()) {
			currentWeek = 2;
		}
		console.log("currentWeek: "+currentWeek)

		//Navigation to other tabs on the page
		$("#headerTableColumn1").click( function(event) {
			window.location.href = "league.php" + window.location.search;
		});
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.php" + window.location.search;
		});		
		
		$("#headerTableColumn4").click( function(event) {
			window.location.href = "players.php" + window.location.search;
		});	
				
		//Clear the error message if the user clicks the X
		$("#errorBannerExit").click( function(event) {
			clearTimeout(myVar);
			console.log("clearTimeout ran");
			exitErrorFooter();
		});	
		
		//Clear the currently selected player from the roster when "clear player" button is clicked.  Do this for all positions.
		$("#clearQB, #clearRB1, #clearRB2, #clearWR1, #clearWR2, #clearWR3, #clearTE, #clearDEF, #clearK, #clearFLEX").click( function(event) {
			console.log($(this).attr('id')+" clicked");
			var position = $(this).attr('id').replace("clear","");
			console.log(position);
			var week		=	$("#currentWeekNum").val();	//Get week # from page
			var fantasyID	=	$("#teamID").val();
			var teamName 	= 	$("#teamName").val();
			var phpResponse;
			//only need week and fantasyID to retrieve a user's roster
			var dataString = ""
			if (position == "DEF") {
				dataString = 'weekNum='+week+'&fantasyID='+fantasyID+'&position='+position+'&team='+document.getElementById('input'+position).value;
			}
			else {
				dataString = 'weekNum='+week+'&fantasyID='+fantasyID+'&position='+position+'&playerName='+document.getElementById('input'+position).value.trim().replace(/ /g, '%20');
			}
			console.log("checkPlayerStarted dataString: "+dataString);
	
			$.ajax({
			    type: "POST",
			    url: "checkPlayerStarted.php",
			    data: dataString,
			    success: function(response) {
					phpResponse = JSON.parse(response);	//Note: phpResponse is a hash of playerName:gametime of both players that have just been selected and the player that was being changed
					console.log("checkPlayerStarted results: "+JSON.stringify(phpResponse));

					for (var key in phpResponse) {
					    console.log(key+" (gametime): "+phpResponse[key]["gametime"]);
					    console.log(key+" (opponent): "+phpResponse[key]["opponent"]);
					}
					//Iterate through game times and don't allow change if the game has started
					var playerGameStarted = false;

					for (var key in phpResponse) {
						var gametime = new Date(phpResponse[key]["gametime"].replace(' ','T')+"+00:00");
						if (Date.now() > gametime.getTime()) {  // If the current time is past the player's gametime, don't allow the change and display an error
							fadeErrorFooter("The selected player's game has already begun!<br/>");
							//loadTeamRoster(week, fantasyID, true);  // Refresh the roster - Should this be false??
							playerGameStarted = true;
						}
					}
					if(!playerGameStarted) {
						console.log("playerGameStarted is "+playerGameStarted);
						$('#input'+position).val("");
						$('#input'+position).selectpicker('refresh');
						sendToPhp(position+"tophp");
					}
				}
			});
		});
		
		//Set the current week for other functions to read from this value
		$("#currentWeekNum").val(currentWeek);
		console.log("Current week is now set to "+$("#currentWeekNum").val());
		
		//Set the current week circle (non-list) to the current week.  Then, set the current week circle (list) to a different color.
		$("#currentWeekCircle").html(currentWeek);
		$("#week"+currentWeek+"Circle").css('background-color','#F7882F');
		
		//Get week and current Fantasy team ID to pass to rest of page
		var week	=	$("#currentWeekNum").val();
		var teamID	=	$("#teamID").val()
		//console.log("Current teamID: "+teamID);
		
		
	    loadTeamRoster(week, teamID, false);	//Populate select lists based on the week, set rosters that have already been chosen
		checkGameStarted(week, teamID);  		//On page load, disable selects where the player has already played
		
});

//This function acts as a page "refresh", as it calls the same two functions on page load
function updatePage(teamID) {
	//Get current week
	var week = $("#currentWeekNum").val();
	//console.log("week changed to "+$('#currentWeekNum').val());
		
	loadTeamRoster(week, teamID, true);	//Populate select lists based on the week, set rosters that have already been chosen
	checkGameStarted(week, teamID);  	//On page refresh, disable selects where the player has already played
	
}

//This function will populate the select dropdowns with the set rosters that have already been chosen, then set the selected option to the players that are chosen
function loadTeamRoster(week, teamID, weekChanged) {
	console.log("entered loadTeamRoster");

    var phpResponse;										//Output of PHP file will be stored here
	var dataString = 'weekNum='+week+'&teamIDNum='+teamID;	//Parameters to pass to PHP. Only need week and teamID to retrieve a user's roster
	
	//Send query to loadTeamRoster.php via AJAX
	//This gets the roster that was already set by the user previously. Will return 
	//Columns:	response[week]:	week	playerName	teamID	teamName	QB	RB1	RB2	WR1	...
	//			response[QB]:	gametime
	//			response[RB1]:	gametime
	//			...
	$.ajax({
	    type: "POST",
	    url: "loadTeamRoster.php",
	    data: dataString,
	    success: function(response) {
		  //console.log("response from loadTeamRoster.php: "+response);
		  phpResponse = JSON.parse(response);
		  console.log("response: "+JSON.stringify(phpResponse));
		  
		  
		  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
		  
		  //Populate the gametime for the already chosen players.  convertToReadableDate() will take a Date format and convert to MM/DD DayOfWeek HH:MM AM/PM timezone
		  console.log("time conversion: " + phpResponse["QB"]["gametime"].replace(' ','T')+ "+00:00");
		  console.log("opponent: " + phpResponse["QB"]["opponent"]);
		  //if (iOS) {
			  if(phpResponse["QB"]["opponent"] == null) {
				  $('#QBgametime').html("BYE");
			  }
			  else {
				  $('#QBgametime').html(phpResponse["QB"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["QB"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			  if(phpResponse["RB1"]["opponent"] == null) {
				  $('#RB1gametime').html("BYE");
			  }
			  else {
	  			$('#RB1gametime').html(phpResponse["RB1"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["RB1"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			  if(phpResponse["RB2"]["opponent"] == null) {
				  $('#RB2gametime').html("BYE");
			  }
			  else {
				  $('#RB2gametime').html(phpResponse["RB2"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["RB2"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			  if(phpResponse["WR1"]["opponent"] == null) {
				  $('#WR1gametime').html("BYE");
			  }
			  else {
				  $('#WR1gametime').html(phpResponse["WR1"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["WR1"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			  if(phpResponse["WR2"]["opponent"] == null) {
				  $('#WR2gametime').html("BYE");
			  }
			  else {
				  $('#WR2gametime').html(phpResponse["WR2"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["WR2"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			  if(phpResponse["WR3"]["opponent"] == null) {
				  $('#WR3gametime').html("BYE");
			  }
			  else {
				  $('#WR3gametime').html(phpResponse["WR3"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["WR3"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			  if(phpResponse["TE"]["opponent"] == null) {
				  $('#TEgametime').html("BYE");
			  }
			  else {
				  $('#TEgametime').html(phpResponse["TE"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["TE"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			  if(phpResponse["DEF"]["opponent"] == null) {
				  $('#DEFgametime').html("BYE");
			  }
			  else {
				  $('#DEFgametime').html(phpResponse["DEF"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["DEF"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			  if(phpResponse["K"]["opponent"] == null) {
				  $('#Kgametime').html("BYE");
			  }
			  else {
				  $('#Kgametime').html(phpResponse["K"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["K"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			  if(phpResponse["FLEX"]["opponent"] == null) {
				  $('#FLEXgametime').html("BYE");
			  }
			  else {
				  $('#FLEXgametime').html(phpResponse["FLEX"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["FLEX"]["gametime"].replace(' ','T')+"+00:00")));
			  }
			
			console.log($('#QBgametime').html());
			console.log(phpResponse["QB"]["opponent"] + " " + convertToReadableDate(new Date(phpResponse["QB"]["gametime"].replace(' ','T')+"+00:00")));
		  //}
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
	    }
	});
}

//This function is called whenever you want to convert a Date object into the following format:
//	MM/DD DayOfWeek HH:MM AM/PM timezone (e.g. 9/1 Thurs 1:00 PM PST)
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

//This function will populate the fantasy points of the selected players.
//For players who've already started playing, start at 0.
//For players who have yet to play, set to "--" so user doesn't think we've already started scoring for that player.
function getFantasyPoints() {
	var week = $("#currentWeekNum").val();	//Get the current week
	var dataString = "";					//Initialize parameters to go into PHP
	
	//If the position is empty, don't get the player's fantasy points (since we know it will be 0 or "not started")
	//If the position is filled, add the players we need to get points for
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
	dataString += "&teamID="+$("#teamID").val();
	dataString += "&week="+week;
	
	//URL encode spaces
	dataString = dataString.trim().replace(/ /g, '%20');
	dataString = dataString.substr(1);		//not sure what this does
	console.log("getFantasyPoints dataString: "+dataString);

	$.ajax({
	    type: "POST",
	    url: "getFantasyPoints.php",
	    data: dataString,
	    success: function(response) {
	      if(response == "0 results") {
			  console.log("returned 0 results from getFantasyPoints.php");
	      }
		  playerPoints = JSON.parse(response);
		  console.log("getFantasyPoints: " + JSON.stringify(playerPoints));
		  
		  //If the position has already been disabled (due to selected player already started playing), set to player's points from stats tables.  
		  //If player doesn't exist in stats table, set points to 0.
		  if($('#inputQB').attr('disabled') == 'disabled') {
			  console.log("playerPoints[QB] = "+playerPoints["QB"]);
			  if(	playerPoints["QB"] != undefined	) {
				  $('#qbPoints').html(playerPoints[playerPoints["QB"]]);
			  }
			  else {
				  $('#qbPoints').html("0");
			  }
		  } else {
			  $('#qbPoints').html("--");	//For players who haven't played yet, set their points to "--" to indicate that points haven't started counting yet
		  }
		  
		  
		  if($('#inputRB1').attr('disabled') == 'disabled') {
			  console.log("playerPoints[RB1] = "+playerPoints["RB1"]);
			  if(	playerPoints["RB1"] != undefined	) {
				  $('#rb1Points').html(playerPoints[playerPoints["RB1"]]);
			  }
			  else {
				  $('#rb1Points').html("0");
			  }
		  } else {
			  $('#rb1Points').html("--");
		  }
		  
		  if($('#inputRB2').attr('disabled') == 'disabled') {
			  console.log("playerPoints[RB2] = "+playerPoints["RB2"]);
			  if(	playerPoints["RB2"] != undefined	) {
				  $('#rb2Points').html(playerPoints[playerPoints["RB2"]]);
			  }
			  else {
				  $('#rb2Points').html("0");
			  }
		  } else {
			  $('#rb2Points').html("--");
		  }
		  
		  
		  if($('#inputWR1').attr('disabled') == 'disabled') {
			  console.log("playerPoints[WR1] = "+playerPoints["WR1"]);
			  if(	playerPoints["WR1"] != undefined	) {
				  $('#wr1Points').html(playerPoints[playerPoints["WR1"]]);
			  }
			  else {
				  $('#wr1Points').html("0");
			  }
		  } else {
			  $('#wr1Points').html("--");
		  }
		  
		  if($('#inputWR2').attr('disabled') == 'disabled') {
			  console.log("playerPoints[WR2] = "+playerPoints["WR2"]);
			  if(	playerPoints["WR2"] != undefined	) {
				  $('#wr2Points').html(playerPoints[playerPoints["WR2"]]);
			  }
			  else {
				  $('#wr2Points').html("0");
			  }
		  } else {
			  $('#wr2Points').html("--");
		  }
		  
		  if($('#inputWR3').attr('disabled') == 'disabled') {
			  console.log("playerPoints[WR3] = "+playerPoints["WR3"]);
			  if(	playerPoints["WR3"] != undefined	) {
				  $('#wr3Points').html(playerPoints[playerPoints["WR3"]]);
			  }
			  else {
				  $('#wr3Points').html("0");
			  }
		  } else {
			  $('#wr3Points').html("--");
		  }
		  
		  if($('#inputTE').attr('disabled') == 'disabled') {
			  console.log("playerPoints[TE] = "+playerPoints["TE"]);
			  if(	playerPoints["TE"] != undefined	) {
				  $('#tePoints').html(playerPoints[playerPoints["TE"]]);
			  }
			  else {
				  $('#tePoints').html("0");
			  }
		  } else {
			  $('#tePoints').html("--");
		  }
		  
		  if($('#inputDEF').attr('disabled') == 'disabled') {
			  console.log("playerPoints[DEF] = "+playerPoints["DEF"]);
			  if(	playerPoints["DEF"] != undefined	) {
				  $('#defPoints').html(playerPoints[playerPoints["DEF"]]);
			  }
			  else {
				  $('#defPoints').html("0");
			  }
		  } else {
			  $('#defPoints').html("--");
		  }
		  
		  if($('#inputK').attr('disabled') == 'disabled') {
			  console.log("playerPoints[K] = "+playerPoints["K"]);
			  if(	playerPoints["K"] != undefined	) {
				  $('#kPoints').html(playerPoints[playerPoints["K"]]);
			  }
			  else {
				  $('#kPoints').html("0");
			  }
		  } else {
			  $('#kPoints').html("--");
		  }
		  
		  if($('#inputFLEX').attr('disabled') == 'disabled') {
			  console.log("playerPoints[FLEX] = "+playerPoints["FLEX"]);
			  if(	playerPoints["FLEX"] != undefined	) {
				  $('#flexPoints').html(playerPoints[playerPoints["FLEX"]]);
			  }
			  else {
				  $('#flexPoints').html("0");
			  }
		  } else {
			  $('#flexPoints').html("--");
		  }
	    }
	});
};

//jeffwang 3/14/2018: This function will do the following every time a roster edit is made (i.e. user selects different player for any position):
//1) Run verifyNoDupes(), which will check if two of the same player is selected. If false,
//2) send the playerName, week, and teamID to testpage2.php to update the week's roster
//TODO: jeffwang to add in defense after list of defenses table is created
function sendToPhp(position) {//, clearPlayer) {
	console.log('------position set: ' + position);
	var week=$("#currentWeekNum").val();	//Get week # from page
	var teamID	=	$("#teamID").val();
	var teamName = $("#teamName").val();
	//var playerGameStarted = false;
	
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
	
	// For when sendToPhp is called as a result of changing a player, first check to see if the newly selected player or the player that was changed has started playing
	if (newPosition == "inputDEF") {
		checkPlayerStarted(week, teamID, position, $('#'+newPosition).val(), true, teamName);
	}
	else {
		checkPlayerStarted(week, teamID, position, $('#'+newPosition).val(), false, teamName);
	}
	//verifyNoDupes(position.replace("tophp",""), week, teamID, teamName);		//Check for dupes
	
	//If duplicate names exist, block the sql query and inform user
}

//cauchychoi 8/19/18: When a player gets changed, this function checks to see if both the player prior to the change and the newly selected player's games have begun.
//The switch is not allowed if either player's game has started
function checkPlayerStarted(week, fantasyID, position, playerOrTeamName, defSelected, teamName) {
	console.log("entered checkPlayerStarted");
	
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
			phpResponse = JSON.parse(response);	//Note: phpResponse is a hash of playerName:gametime of both players that have just been selected and the player that was being changed
			console.log("checkPlayerStarted results: "+JSON.stringify(phpResponse));

			for (var key in phpResponse) {
			    console.log(key+" (gametime): "+phpResponse[key]["gametime"]);
			    console.log(key+" (opponent): "+phpResponse[key]["opponent"]);
			}
			//Iterate through game times and don't allow change if the game has started
			var playerGameStarted = false;

			for (var key in phpResponse) {
				var gametime = new Date(phpResponse[key]["gametime"].replace(' ','T')+"+00:00");
				if (Date.now() > gametime.getTime()) {  // If the current time is past the player's gametime, don't allow the change and display an error
					fadeErrorFooter("The selected player's game has already begun!<br/>");
					loadTeamRoster(week, fantasyID, true);  // Refresh the roster - Should this be false??
					playerGameStarted = true;
				}
			}

			if (!playerGameStarted) {  // If neither the newly selected player or the changed player has started playing, move on to verifyNoDupes and checkGameStarted
				verifyNoDupes(position, week, fantasyID, teamName, phpResponse);		//Check for dupes
				checkGameStarted(week, fantasyID);
			}
		}
	});
}

//jeffwang 3/14/2018: This function is currently runs whenever a player change is made.
//It loads the teamRoster from the database and kicks off the dupe flow by calling comparePotentialDupes
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

//jeffwang: This function checks to see if players can be switched. If they can, switchPlayerUpdateRoster is called. If not, the logic continues to getNumDupeTeamsAllowed
function comparePotentialDupes (position, phpResponse, week, teamID, teamName, playerGametimeArray){
    console.log("639: position: "+position);
    console.log("640: position: "+position.replace("tophp","gametime"));
	
	var selectVal = "input"+position.replace("tophp","");
	if($('#'+selectVal).val() != "") {
		console.log("current position value: "+$('#'+selectVal).val());
		console.log("gametime of current position value: " + playerGametimeArray[	$('#'+selectVal).val()	]["gametime"]	);
		console.log("opponent of current position value: " + playerGametimeArray[	$('#'+selectVal).val()	]["opponent"]	);
		console.log("name of div setting html in: "+'#'+position.replace("tophp","gametime"));
	}
	else {
		console.log("selectVal is null");
	}
	
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
			(	$('#input'+switchPosition2[i]).val() != "")		)	&&
			(	($('#input'+switchPosition1[i]).val() != null)	&&
			(	$('#input'+switchPosition2[i]).val() != null)		)		) 
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
			console.log('#'+switchPosition2[i]+"gametime: "+$('#'+switchPosition2[i]+"gametime").html());
		
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

//cauchychoi: This function returns the number of dupe teams allowed and passes it to teamDupes
function getNumDupeTeamsAllowed(week, fantasyID, position, teamRoster, teamName, playerGametimeArray) {
	var phpResponse;
	var dataString = 'weekNum='+week;
	
	$.ajax({
	    type: "POST",
	    url: "getNumDupeTeamsAllowed.php",
	    data: dataString,
	    success: function(response) {
		  phpResponse = JSON.parse(response);	//Note: phpResponse is 10 (the number of positions on a fantasy team) minus the number of teams playing that week = numDupeTeamsAllowed
		  if (phpResponse < 0) {
			phpResponse = 0;
		  }
		  teamDupes(week, fantasyID, phpResponse, position, teamRoster, teamName, playerGametimeArray);
	    }
	});
}

//cauchychoi: This function counts the number of dupe teams and compares it with numDupeTeamsAllowed
function teamDupes(week, fantasyID, numDupeTeamsAllowed, position, teamRoster, teamName, playerGametimeArray) {
	var dupeTeams = 0;
	var moreThanTwoDupeTeams = 0;
	var phpResponse;
	
	
	var dataString = 'weekNum='+week+'&fantasyID='+fantasyID;
	console.log("numDupeTeamsAllowed: "+numDupeTeamsAllowed);	//For testing
	$.ajax({
	    type: "POST",
	    url: "getPlayerSchools.php",
	    data: dataString,
	    success: function(response) {
			
			phpResponse = JSON.parse(response);	//Note: phpResponse is teamRoster as an array of hashes, where each index is [position:position, playerName:playerName, teamName:teamName]
			console.log("Response from getPlayerSchools.php: "+JSON.stringify(phpResponse));
			
			var counts = {};
			var positionToTeam = {};
			for (var i = 0; i < phpResponse.length; i++) {
				counts[phpResponse[i]["teamName"]] = 1 + (counts[phpResponse[i]["teamName"]] || 0); // counts the number of times a particular team shows up in teamRoster
				//console.log("Response from getPlayerSchools.php: "+counts[i]);
				positionToTeam[phpResponse[i]["position"]] = phpResponse[i]["teamName"]; // maps the position to the teamName of the player
			}
			console.log("Counts array: "+JSON.stringify(counts));
			console.log("positionToTeam: "+JSON.stringify(positionToTeam));
			
			for (var key in counts) {
				//dupeTeams += (phpResponse[i]["teamCount"] - 1);
				if (counts[key] >= 2) {  // If the number of times a team shows up is >= 2, that team is duped
					dupeTeams++;
				}
				if (counts[key] > 2) {  // If the number of times a team shows up is >= 2, that team is duped
					moreThanTwoDupeTeams = 1;
				}
				console.log("dupeTeams: "+dupeTeams);
				console.log("moreThanTwoDupeTeams: "+moreThanTwoDupeTeams);
			}
			var newPosition = position.replace("tophp","");
			var selectedPlayerTeam = $('#input'+newPosition).find('option:selected').attr('data-school'); // Get the teamName of the selected player
			console.log("selectedPlayerTeam: "+selectedPlayerTeam);
			console.log("newPosition: "+newPosition);
			var newPlayerCount = (parseInt(counts[selectedPlayerTeam],10)+1);
			console.log("newPlayerCount: "+newPlayerCount);

			if ((selectedPlayerTeam != positionToTeam[newPosition] && selectedPlayerTeam != undefined && (counts[positionToTeam[newPosition]] <= 1 && dupeTeams >= numDupeTeamsAllowed)) || newPlayerCount > 2/* || moreThanTwoDupeTeams*/) {  // If selected team has >= 1 use and we've hit the limit of dupe teams
				console.log("CHANGE NOT ALLOWED FOR " + selectedPlayerTeam);
				
				//No need to revert back to the original player's gametime unless the change is allowed, since we never made the change to the new player's gametime
				
				//Display error message
				//"Your roster has too many players from <team>. Remove one of the <team> players and try again."
				fadeErrorFooter("Your roster has too many players from <b>" + selectedPlayerTeam + "<b>.<br/><span style='font-size:0.8em'>Remove one of the <b>" + selectedPlayerTeam + "</b> players and try again.</span>");
				loadTeamRoster(week, fantasyID, true);  // Should this be false??
			}
			else {  // allow the change
				console.log("CHANGE ALLOWED");
				
				//If not switching players and player is a valid change, populate gametime of new player
				var selectVal = "input"+position.replace("tophp","");
				
				console.log(selectVal);
				console.log($('#'+selectVal).val());
				if($('#'+selectVal).val() != "") {
					console.log($('#'+selectVal).val()+" (gametime): "+playerGametimeArray[$('#'+selectVal).val()]["gametime"]);
					console.log($('#'+selectVal).val()+" (opponent): "+playerGametimeArray[$('#'+selectVal).val()]["opponent"]);
					console.log("w/ replace: "+playerGametimeArray[$('#'+selectVal).val()]["gametime"].replace(' ','T')+"+00:00");
					console.log('#'+position.replace("tophp","gametime"));
					console.log(convertToReadableDate(new Date(playerGametimeArray[$('#'+selectVal).val()]["gametime"].replace(' ','T')+"+00:00")));
				}
				else {
					console.log("selectVal is empty")
				}
				
				
				if($('#'+selectVal).val() == "") {
					$('#'+position.replace("tophp","gametime")).html("");
				}
				else if(playerGametimeArray[$('#'+selectVal).val()]["opponent"] == null) {
					$('#'+position.replace("tophp","gametime")).html("BYE");
				}
				else {
					$('#'+position.replace("tophp","gametime")).html(playerGametimeArray[$('#'+selectVal).val()]["opponent"] + " " + convertToReadableDate(new Date(playerGametimeArray[$('#'+selectVal).val()]["gametime"].replace(' ','T')+"+00:00")));
				}
				
				makeChangesToTeamRoster(position, week, fantasyID, teamName);
			}
	    }
	});  
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
//It will check to see if a player's gametime has started and disable that 'select'. It will also update timesPlayerUsed
//TODO: Add to both page load and when a player selects something. (Is that the sendtophp function?)
function checkGameStarted(week, fantasyID) {
	console.log("entered checkGameStarted");
	 
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
					var gametime = new Date(phpResponse[i]["gametime"].replace(" ","T") + "+00:00");
					if (Date.now() > gametime.getTime()) {
						if (!document.getElementById("input"+phpResponse[i]["position"]).disabled) {
							//document.getElementById(phpResponse[i]["selector"]).setAttribute('disabled',true);
							document.getElementById("input"+phpResponse[i]["position"]).disabled = true;
							document.getElementById("clear"+phpResponse[i]["position"]).disabled = true;
							disabledPositions.push("input"+phpResponse[i]["position"]);
							/*if (phpResponse[i]["hasPlayed"] == 0) {
								if (phpResponse[i]["position"].localeCompare("DEF") == 0) {  // if DEF, grab teamID
									updateTimesPlayerUsed(phpResponse[i]["teamID"], fantasyID, week, phpResponse[i]["position"]);
								}
								else {  // else grab playerID
									updateTimesPlayerUsed(phpResponse[i]["playerID"], fantasyID, week, phpResponse[i]["position"]);
								}
							}*/
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
//Is this function even used??
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

/*
//cauchychoi 6/12/18: Update timesplayerused table
//cauchychoi 8/30/18: Moved this to ruby so it's not dependent on page load
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
*/

//jeffwang 3/14/2018: This function is currently run on document.ready for each position. It will:
//1) Send query to getAvailablePlayers.php to query collegeTeamRoster table to figure out which players you can choose
//2) Run populateChoosePlayerLists(), which populates the select options for each position
//TODO: jeffwang to add case "DEF" to the switch statement
function getDataForChoosePlayerLists(position,currentSelectedPlayer,teamID, weekChanged) {
	console.log("entered getDataForChoosePlayerLists");
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
	        console.log('entered RB, position is '+position);
			dataString = 'RBtophp='+'RB'+'&weekNum='+week+'&teamID='+teamID
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
		  //console.log("getAvailablePlayers response: "+response);
		  var playerList=JSON.parse(response);
		  //console.log("playerList: "+JSON.stringify(playerList));
		  
		  //Parameters are 1) ID of select, 2) array of eligible players, 3) player currently on the roster
		  //TODO: jeffwang to figure out edge case when no players are chosen yet
		  populateChoosePlayerLists("input"+position, playerList, currentSelectedPlayer, weekChanged);		
		  
		  	if(position=="FLEX") {
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
	console.log("entered populateChoosePlayerLists");
    var select = document.getElementById(inputPosition);
	var currentOption;
	var currentSubtext;
	var currentMetadata;
	var dataString = "";
	var maxPlayerUses = 5;

	$.ajax({
	    type: "POST",
	    url: "getMaxPlayerUseFlag.php",
	    data: dataString,
	    success: function(response) {
		  console.log("response from getMaxPlayerUseFlag(): "+response);
		  
		  if(response != "0 results") {
			  maxPlayerUses = response;
			  console.log("maxPlayerUses: " + maxPlayerUses);
		  }
		  else {
			  console.log("maxPlayerUses: " + maxPlayerUses);
		  }
		  
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
	  				var gametime = new Date(positionList[i]["gametime"].replace(" ","T") + "+00:00");
				

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
								
	  				if (	(positionList[i]["timesUsed"] >= maxPlayerUses)	||	(Date.now() > gametime.getTime())	) {   // disables the selector for the player just created if timesUsed >= maxPlayerUses flag. TODO: Remove all future uses
	  					select.options[select.options.length-1].disabled = true;
	  					select.options[select.options.length-1].style.color="#D3D3D3";
	  					console.log("disabled "+positionList[i]["playerName"]+"because used 5 times or game is already done. gametime: "+positionList[i]["gametime"]);
	  				}
	  				else if (positionList[i]["timesUsed"] == maxPlayerUses - 1) {
	  					select.options[select.options.length-1].style.color="#FFA500";
	  					console.log("didn't disable "+positionList[i]["playerName"]);
	  				}
	  			}
	  		}
	  		else {
	  			for(i = 0; i < positionList.length; i++) {	
	  				//Convert positionList's gametime to UTC time format
	  				var gametime = new Date(positionList[i]["gametime"].replace(" ","T") + "+00:00");
						
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

	  				if (	(positionList[i]["timesUsed"] >= maxPlayerUses)		||	(Date.now() > gametime.getTime())	) {
	  					select.options[select.options.length-1].disabled = true;
	  					select.options[select.options.length-1].style.color="#D3D3D3";
	  					console.log("disabled "+positionList[i]["playerName"]+"because used 5 times or game is already done. gametime: "+positionList[i]["gametime"]);
	  				}
	  				else if (positionList[i]["timesUsed"] == maxPlayerUses - 1) {
	  					select.options[select.options.length-1].style.color="#FFA500";
	  					console.log("didn't disable "+positionList[i]["playerName"]);
	  				}
	  			}
	  		}
	  	}
	  	else {
	  		console.log("positionList.length = "+positionList.length);
	  		for (i = 0; i < positionList.length; i++) {  // i = 1 to ignore --Clear Selection--
	  			//console.log("i="+i);
	  			var gametime = new Date(positionList[i]["gametime"].replace(" ","T") + "+00:00");
	  			if (	(positionList[i]["timesUsed"] >= maxPlayerUses)	||	(Date.now() > gametime.getTime())	) {
	  				select.options[i+1].disabled = true;	// i+1 to ignore --Clear Selection--
	  				select.options[i+1].style.color="#D3D3D3";
	  			}
	  			else {
	  				select.options[i+1].disabled = false;
	  				select.options[i+1].style.color="#000000";
	  			}
	  			if (positionList[i]["timesUsed"] == maxPlayerUses - 1) {
	  				select.options[i+1].style.color="#FFA500";
	  			}
	  		}
	  	}
	  	select.value = currentSelectedPlayer;
	  	$('#'+inputPosition).selectpicker('refresh');
	  	console.log("done populating "+inputPosition);
	    }
	});
}

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