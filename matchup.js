$( document ).ready(
	function startPage() {
		//Set default week value 
		var mondayAfterWeek1 = new Date('September 6, 2021 07:00:00 UTC').getTime();
		var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

		var currentWeek = 1;
		if (Date.now() > mondayAfterWeek1 + (14 * weekInMilliseconds)) {
			currentWeek = 16;
		}
		else if (Date.now() > mondayAfterWeek1 + (13 * weekInMilliseconds)) {
			currentWeek = 15;
		}
		else if (Date.now() > mondayAfterWeek1 + (12 * weekInMilliseconds)) {
			currentWeek = 14;
		}
		else if (Date.now() > mondayAfterWeek1 + (11 * weekInMilliseconds)) {
			currentWeek = 13;
		}
		else if (Date.now() > mondayAfterWeek1 + (10 * weekInMilliseconds)) {
			currentWeek = 12;
		}
		else if (Date.now() > mondayAfterWeek1 + (9 * weekInMilliseconds)) {
			currentWeek = 11;
		}
		else if (Date.now() > mondayAfterWeek1 + (8 * weekInMilliseconds)) {
			currentWeek = 10;
		}
		else if (Date.now() > mondayAfterWeek1 + (7 * weekInMilliseconds)) {
			currentWeek = 9;
		}
		else if (Date.now() > mondayAfterWeek1 + (6 * weekInMilliseconds)) {
			currentWeek = 8;
		}
		else if (Date.now() > mondayAfterWeek1 + (5 * weekInMilliseconds)) {
			currentWeek = 7;
		}
		else if (Date.now() > mondayAfterWeek1 + (4 * weekInMilliseconds)) {
			currentWeek = 6;
		}
		else if (Date.now() > mondayAfterWeek1 + (3 * weekInMilliseconds)) {
			currentWeek = 5;
		}
		else if (Date.now() > mondayAfterWeek1 + (2 * weekInMilliseconds)) {
			currentWeek = 4;
		}
		else if (Date.now() > mondayAfterWeek1 + weekInMilliseconds) {
			currentWeek = 3;
		}
		else if (Date.now() > mondayAfterWeek1) {
			currentWeek = 2;
		}
		
		$("#currentWeekNum").val(currentWeek);
		console.log("Current week is now set to "+$("#currentWeekNum").val());
		
		$("#currentWeekCircle").html(currentWeek);
		console.log("setting #week"+currentWeek+"Circle to #6495ED");
		$("#week"+currentWeek+"Circle").css('background-color','#F7882F');
		console.log("#week"+currentWeek+"Circle is now "+$("#week"+currentWeek+"Circle").css('background-color'));
	    
		//var currentWeek = document.getElementById("currentWeekNum");
		//currentWeek.value = 12;	//This is hardcoded right now TODO: jeffwang to figure out how to make this change based on the current week

		$("#headerTableColumn1").click( function(event) {
			window.location.href = "league.php" + window.location.search;
		});
		
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.php" + window.location.search;
		});
		
		$("#headerTableColumn2").click( function(event) {
			window.location.href = "index.php" + window.location.search;
		});	
		
		$("#headerTableColumn4").click( function(event) {
			window.location.href = "players.php" + window.location.search;
		});	
		
		var teamID	=	$("#teamID").val()
		updatePage(teamID);	
		allMatchupsFunction();
});

function allMatchupsFunction() {
	$('#hiddenMatchupsTable').empty();
	var phpResponse;
	var dataString = "";
	
	//Send query to loadTeamRoster.php via AJAX
	//This gets the roster that was already set by the user previously
	$.ajax({
	    type: "POST",
	    url: "convertTeamIDToName.php",
	    data: dataString,
	    success: function(response) {
		  phpResponse = JSON.parse(response);
		  
		  getMatchups(phpResponse);
	    }
	});
}

function getMatchups(convertTeam) {
	var week	=	$("#currentWeekNum").val();
	console.log("According to getMatchups(), current week is: "+week);
	var teamID	=	"allTeams";
	
	var phpResponse;
	var maxNumColumn = 2;
	
	//only need week and teamID to retrieve a user's roster
	var dataString = 'weekNum='+week+'&teamIDNum='+teamID;
	console.log(dataString);
	$.ajax({
	    type: "POST",
	    url: "getMatchup.php",
	    data: dataString,
	    success: function(response) {
			var rowNum = 0;
			
			phpResponse = JSON.parse(response);	//This should output a list of matchups (3d array)
			
			// Create table structure
			for(i = 0; i < phpResponse.length; i++) {
				if (i % maxNumColumn == 0) {
					var tableStructure = "<tr>";
					for (var colNum = 0; colNum < maxNumColumn; colNum++) {
						tableStructure += "<td id='row"+rowNum+"col"+colNum+"' style='width: 50%'></td>";
					}
					tableStructure +="</tr>";
					rowNum++;
					$('#hiddenMatchupsTable').append(tableStructure);
				}
			
				// Add matchup to table
				createMatchupTable("table"+i, i, phpResponse[i]["homeTeam"], phpResponse[i]["awayTeam"], "0", "0", rowNum-1, maxNumColumn, convertTeam);
			  
				// Calculate scores
				getTeamTotalPoints(week, phpResponse[i]["homeTeam"], "home", i);
				getTeamTotalPoints(week, phpResponse[i]["awayTeam"], "away", i);
			}
			//Add padding at the bottom so that you can click the bottom right card
			$('#hiddenMatchupsTable').append("<div style='height: 80px; width: 100%'></div>");
	    }
	});	
}

function getTeamTotalPoints(week, teamID, homeOrAway, tableIndex) {
	var dataString = 'weekNum='+week+'&teamIDNum='+teamID;


	$.ajax({
	    type: "POST",
	    url: "loadTeamRoster.php",
	    data: dataString,
	    success: function(response) {
		  console.log("successfully called loadTeamRoster.php from getTeamTotalPoints()");	//For testing
		  phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a teamRoster, followed by the chosen positions of that roster
		  console.log(phpResponse);
		  		  
		  printMatchupListFantasyPoints(week, homeOrAway, phpResponse[week], tableIndex, teamID);
	    }
	});
}

function printMatchupListFantasyPoints(week, homeOrAway, roster, tableIndex, teamID) {
	dataString = 	"qb="+roster["QB"] +
					"&rb1="+roster["RB1"] +
					"&rb2="+roster["RB2"] +
					"&wr1="+roster["WR1"] +
					"&wr2="+roster["WR2"] +
					"&wr3="+roster["WR3"] +
					"&te="+roster["TE"] +
					"&def="+roster["DEF"] +
					"&k="+roster["K"] +
					"&flex="+roster["FLEX"] +
					"&week="+week;
	dataString = dataString.trim().replace(/ /g, '%20');
	dataString = dataString.replace(/'/g, '%5C%27');

	console.log("printMatchupListFantasyPoints dataString: "+dataString);

	$.ajax({
	    type: "POST",
	    url: "getFantasyPoints.php",
	    data: dataString,
	    success: function(response) {
	      //$('#result2').html(response);
		  playerPoints = JSON.parse(response);
		  //console.log(playerPoints);
	  
		  var totalPlayerPoints = 0;
		  for (var key in playerPoints) {
		      //console.log(playerPoints[key]);
			  if(playerPoints[key] == "--") {
				  totalPlayerPoints += 0;
			  } else {
				  totalPlayerPoints += +playerPoints[key];
			  }
		  }
	  
		  totalPlayerPoints = Math.round(totalPlayerPoints*10)/10;
		  
		 $('#table'+tableIndex+homeOrAway+'TeamScore').html(totalPlayerPoints);	  
	    }
	});
}

function setColorOfUserTeam(userTeam, notUserTeam) {
	var list = document.getElementsByClassName(userTeam);
	for(var i = 0; i < list.length; i++) {
      list[i].classList.add('currentPlayerColor');
	}
	
	var list = document.getElementsByClassName(notUserTeam);
	for(var i = 0; i < list.length; i++) {
      list[i].classList.add('notCurrentPlayerColor');
	}
}

function updatePage(teamID) {	
	var week	=	$("#currentWeekNum").val();
	var phpResponse;
	
	clearMatchupCard();
	
	//only need week and teamID to retrieve a user's roster
	var dataString = 'weekNum='+week+'&teamIDNum='+teamID;
	console.log("updatePage: "+dataString);
	$.ajax({
	    type: "POST",
	    url: "getMatchupAndTeamRoster.php",
	    data: dataString,
	    success: function(response) {
		  phpResponse = JSON.parse(response);
		  console.log(phpResponse);	
		  
			if(phpResponse["homeTeam"]["teamID"] == teamID) {
				setColorOfUserTeam("home", "away");
			} else {
				setColorOfUserTeam("away", "home");
			}
			
			//Set the team names for home and away team
			$('#homeTeamName').html(phpResponse["homeTeam"]["teamName"]);
			$('#awayTeamName').html(phpResponse["awayTeam"]["teamName"]);
			
			populateMatchupTable(week, phpResponse);	
			
			//Set eligible players for each select, set the current chosen player as default value
			//getTeamRoster(week, phpResponse[0]["homeTeam"], "home");
			//getTeamRoster(week, phpResponse[0]["awayTeam"], "away");
	    }
	});	
}

function clearMatchupCard() {
	$('#homeQB', '#awayQB', '#homeRB1', '#awayRB1', '#homeRB2', '#awayRB2', '#homeWR1', '#awayWR1', '#homeWR2', '#awayWR2', '#homeWR3', '#awayWR3', '#homeTE', '#awayTE', '#homeDEF', '#awayDEF', '#homeK', '#awayK', '#homeFLEX', '#awayFLEX').empty();
}

function populateMatchupTable(week, roster) {	
	var usePlayerAbbr = 0;
	
	$.ajax({
	    type: "POST",
	    url: "checkPlayerAbbrFlag.php",
	    success: function(response) {
			console.log("response = "+response);
			if(response == "1") {
				usePlayerAbbr = 1;
			}
			else {
				usePlayerAbbr = 0;
			}
	
		
			console.log("usePlayerAbbr="+usePlayerAbbr);
			if(usePlayerAbbr) {
				var getPlayerAbbr ="";

				dataString = 	"homeQB="+roster["homeTeam"]["QB"] +
								"&homeRB1="+roster["homeTeam"]["RB1"] +
								"&homeRB2="+roster["homeTeam"]["RB2"] +
								"&homeWR1="+roster["homeTeam"]["WR1"] +
								"&homeWR2="+roster["homeTeam"]["WR2"] +
								"&homeWR3="+roster["homeTeam"]["WR3"] +
								"&homeTE="+roster["homeTeam"]["TE"] +
								"&homeDEF="+roster["homeTeam"]["DEF"] +
								"&homeK="+roster["homeTeam"]["K"] +
								"&homeFLEX="+roster["homeTeam"]["FLEX"] +
								"&awayQB="+roster["awayTeam"]["QB"] +
								"&awayRB1="+roster["awayTeam"]["RB1"] +
								"&awayRB2="+roster["awayTeam"]["RB2"] +
								"&awayWR1="+roster["awayTeam"]["WR1"] +
								"&awayWR2="+roster["awayTeam"]["WR2"] +
								"&awayWR3="+roster["awayTeam"]["WR3"] +
								"&awayTE="+roster["awayTeam"]["TE"] +
								"&awayDEF="+roster["awayTeam"]["DEF"] +
								"&awayK="+roster["awayTeam"]["K"] +
								"&awayFLEX="+roster["awayTeam"]["FLEX"];	
				dataString = dataString.trim().replace(/ /g, '%20');
				dataString = dataString.replace(/'/g, '%5C%27');
				
				console.log("datastring = "+dataString);

				$.ajax({
				    type: "POST",
				    url: "getPlayerAbbr.php",
				    data: dataString,
				    success: function(response) {
						getPlayerAbbr = JSON.parse(response);	//response should look like: getPlayerAbbr["Josh Rosen"] = "J. Rosen"
						console.log(getPlayerAbbr);

						console.log("roster[homeTeam][QB] is "+roster["homeTeam"]["QB"]);
						console.log("roster[awayTeam][QB] is "+roster["awayTeam"]["QB"]);


						setPlayerNameInMatchup(getPlayerAbbr, roster, "home", true);
						setPlayerNameInMatchup(getPlayerAbbr, roster, "away", true);
					}
				});
			}
			else {
				setPlayerNameInMatchup(getPlayerAbbr, roster, "home", false);
				setPlayerNameInMatchup(getPlayerAbbr, roster, "away", false);
			}
			getFantasyPoints(week, "home", roster);
			getFantasyPoints(week, "away", roster);
			
	    }
	});
}

function setPlayerNameInMatchup(getPlayerAbbr, roster, homeOrAway, useAbbr) {
	if(useAbbr) {
		console.log(homeOrAway+"Team");
		console.log("roster[homeOrAwayTeam][QB]="+roster[homeOrAway+"Team"]["QB"]);
		console.log("getPlayerAbbr[Khalil Tate]="+getPlayerAbbr["Khalil Tate"]);
		console.log("getPlayerAbbr[roster[homeOrAwayTeam][QB]]="+getPlayerAbbr[roster[homeOrAway+"Team"]["QB"]]);
		$("#"+homeOrAway+"QB").html(getPlayerAbbr[roster[homeOrAway+"Team"]["QB"]]);
		$("#"+homeOrAway+"RB1").html(getPlayerAbbr[roster[homeOrAway+"Team"]["RB1"]]);
		$("#"+homeOrAway+"RB2").html(getPlayerAbbr[roster[homeOrAway+"Team"]["RB2"]]);
		$("#"+homeOrAway+"WR1").html(getPlayerAbbr[roster[homeOrAway+"Team"]["WR1"]]);
		$("#"+homeOrAway+"WR2").html(getPlayerAbbr[roster[homeOrAway+"Team"]["WR2"]]);
		$("#"+homeOrAway+"WR3").html(getPlayerAbbr[roster[homeOrAway+"Team"]["WR3"]]);
		$("#"+homeOrAway+"TE").html(getPlayerAbbr[roster[homeOrAway+"Team"]["TE"]]);
		$("#"+homeOrAway+"DEF").html(getPlayerAbbr[roster[homeOrAway+"Team"]["DEF"]]);
		$("#"+homeOrAway+"K").html(getPlayerAbbr[roster[homeOrAway+"Team"]["K"]]);
		$("#"+homeOrAway+"FLEX").html(getPlayerAbbr[roster[homeOrAway+"Team"]["FLEX"]]);
	}
	else {
		$("#"+homeOrAway+"QB").html(roster[homeOrAway+"Team"]["QB"]);
		$("#"+homeOrAway+"RB1").html(roster[homeOrAway+"Team"]["RB1"]);
		$("#"+homeOrAway+"RB2").html(roster[homeOrAway+"Team"]["RB2"]);
		$("#"+homeOrAway+"WR1").html(roster[homeOrAway+"Team"]["WR1"]);
		$("#"+homeOrAway+"WR2").html(roster[homeOrAway+"Team"]["WR2"]);
		$("#"+homeOrAway+"WR3").html(roster[homeOrAway+"Team"]["WR3"]);
		$("#"+homeOrAway+"TE").html(roster[homeOrAway+"Team"]["TE"]);
		$("#"+homeOrAway+"DEF").html(roster[homeOrAway+"Team"]["DEF"]);
		$("#"+homeOrAway+"K").html(roster[homeOrAway+"Team"]["K"]);
		$("#"+homeOrAway+"FLEX").html(roster[homeOrAway+"Team"]["FLEX"]);
	}
}


function getFantasyPoints(week, homeOrAway, roster) {
	dataString = 	"qb="+roster[homeOrAway+"Team"]["QB"] +
					"&rb1="+roster[homeOrAway+"Team"]["RB1"] +
					"&rb2="+roster[homeOrAway+"Team"]["RB2"] +
					"&wr1="+roster[homeOrAway+"Team"]["WR1"] +
					"&wr2="+roster[homeOrAway+"Team"]["WR2"] +
					"&wr3="+roster[homeOrAway+"Team"]["WR3"] +
					"&te="+roster[homeOrAway+"Team"]["TE"] +
					"&def="+roster[homeOrAway+"Team"]["DEF"] +
					"&k="+roster[homeOrAway+"Team"]["K"] +
					"&flex="+roster[homeOrAway+"Team"]["FLEX"] +
					"&week="+week;
	dataString = dataString.trim().replace(/ /g, '%20');
	dataString = dataString.replace(/'/g, '%5C%27');

	console.log("getFantasyPoints dataString: "+dataString);
	
	$.ajax({
	    type: "POST",
	    url: "getFantasyPoints.php",
	    data: dataString,
	    success: function(response) {
	      //$('#result2').html(response);
		  playerPoints = JSON.parse(response);
		  console.log(playerPoints);
		  //console.log("successfully got fantasyPoints from php!");
		  
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["QB"], "QB");
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["RB1"], "RB1");
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["RB2"], "RB2");
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["WR1"], "WR1");
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["WR2"], "WR2");
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["WR3"], "WR3");
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["TE"], "TE");
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["DEF"], "DEF");
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["K"], "K");
		  populatePoints(homeOrAway, playerPoints, roster[homeOrAway+"Team"]["FLEX"], "FLEX");
		  
		  var totalPlayerPoints = 0;
		  for (var key in playerPoints) {
		      //console.log(playerPoints[key]);
			  if(playerPoints[key] == "--" || key == "") {
				  totalPlayerPoints += 0;
			  } else {
				  totalPlayerPoints += +playerPoints[key];
			  }
		  }
		  
		  totalPlayerPoints = Math.round(totalPlayerPoints*10)/10;
		  console.log("totalPlayerPoints: "+totalPlayerPoints);
		  $('#'+homeOrAway+"TeamScore").html(totalPlayerPoints);
	    }
	});
};

function populatePoints(homeOrAway, playerPoints, playerName, position) {
  console.log("playerPoints: "+playerName+" "+playerPoints[playerName]);
  if(	playerPoints[playerName] != undefined	&& playerName != "" && playerName != undefined && playerName != null) {
	  $('#'+homeOrAway+position+"Points").html(playerPoints[playerName]);
  }
  else {
	  $('#'+homeOrAway+position+"Points").html("0");
  }
}

function createMatchupTable(idName, matchupIteration, homeTeam1, awayTeam1, homeTeamScore1, awayTeamScore1, rowNum, maxNumColumn, convertTeam) {
  //var createdTable = "<table class='matchupTableList' id='"+idName+"'> <tr><td id='"+idName+"homeTeamName'>"+homeTeam1+"</td><td id='"+idName+"homeTeamScore'>"+homeTeamScore1+"</td></tr>  <tr><td id='"+idName+"awayTeamName'>"+awayTeam1+"</td><td id='"+idName+"awayTeamScore'>"+awayTeamScore1+"</td></tr></table>";
	var createdRow = "<div class='flexCard'><button class='centerTable fullWidth noStyle' onClick=updatePage("+homeTeam1+")><table class='fullWidth'><tr><td style='text-align: left; width: 70%;' class='smallerText topMatchup' id='"+idName+"homeTeamName'>"+convertTeam[homeTeam1]+"</td><td style='text-align: left; width: 30%;' class='smallerText topMatchup' id='"+idName+"homeTeamScore'>"+homeTeamScore1+"</td></tr>  <tr><td style='text-align: left; width: 70%;' class='smallerText bottomMatchup' id='"+idName+"awayTeamName'>"+convertTeam[awayTeam1]+"</td><td style='text-align: left; width: 30%;' class='smallerText bottomMatchup' id='"+idName+"awayTeamScore'>"+awayTeamScore1+"</td></tr></table></button></div>";
  //var createdRow = "<tr><table><tr><td id='"+idName+"homeTeamName'>"+homeTeam1+"</td><td id='"+idName+"homeTeamScore'>"+homeTeamScore1+"</td></tr>  <tr><td id='"+idName+"awayTeamName'>"+awayTeam1+"</td><td id='"+idName+"awayTeamScore'>"+awayTeamScore1+"</td></tr></table></tr>";
  //console.log(createdTable);
  //$('#hiddenMatchupsTable').append(createdRow);
	$('#row'+rowNum+'col'+(matchupIteration%maxNumColumn)).append(createdRow);
  //document.body.innerHTML += createdTable;
	//return createdRow	
}