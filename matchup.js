$( document ).ready(
	function startPage() {
		//Set default week value 
		//UPDATE THIS EVERY WEEK TO SET CURRENT WEEK TODO: jeffwang to figure out how to make this change based on the current week
		var currentWeek = 1;
		$("#currentWeekNum").val(currentWeek);
		console.log("Current week is now set to "+$("#currentWeekNum").val());
		
		$("#currentWeekCircle").html(currentWeek);
		console.log("setting #week"+currentWeek+"Circle to #6495ED");
		$("#week"+currentWeek+"Circle").css('background-color','#6495ED');
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
		
		/*
		$("#allMatchupsButton").click( function(event) {
		  event.preventDefault();
		  console.log('clicked allMatchupsButton');
		  console.log('matchupsTable currently set to: '+  $('#myTeamMatchupTable').css('display'));
		  
		  $('#myTeamMatchupTable').hide();
		  console.log('matchupsTable currently set to: '+  $('#myTeamMatchupTable').css('display'));
		  
		  allMatchupsFunction();
		  
		  //createMatchupTable("dummyTable1", 1, "dummyTeamName1", "dummyTeamName2", "dummyScore1", "dummyScore2");  
		});
		*/
		var urlArray = getUrlVars();
		//console.log(urlArray);
		//var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
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
			//console.log("getMatchups printed: "+phpResponse[0]["homeTeam"] + " " + phpResponse[0]["awayTeam"]);
		  
			//Iterate through list of matchups, create table structure, get the fantasy points of both home and away teams
			
			/** <table id="hiddenMatchupsTable">
					<tr>
						<td id="row0col0">
							<table>
								<tr>
									<td id="table0homeTeamName" />
									<td id="table0homeTeamScore" />
								</tr>
								<tr>
									<td id="table0awayTeamName" />
									<td id="table0awayTeamScore" />
								</tr>
							</table>
						</td>
						<td id="row0col1">
							<table>
								<tr>
									<td id="table1homeTeamName" />
									<td id="table1homeTeamScore" />
								</tr>
								<tr>
									<td id="table1awayTeamName" />
									<td id="table1awayTeamScore" />
								</tr>
							</table>
						</td>
					</tr>
				</table> etc
			
			**/
			
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
				createMatchupTable("table"+i, i, phpResponse[i]["homeTeam"], phpResponse[i]["awayTeam"], "dummyScore1", "dummyScore2", rowNum-1, maxNumColumn, convertTeam);
			  
				// Calculate scores
				getTeamTotalPoints(week, phpResponse[i]["homeTeam"], "home", i);
				getTeamTotalPoints(week, phpResponse[i]["awayTeam"], "away", i);
			}
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

	console.log("printMatchupListFantasyPoints dataString: "+dataString);

	$.ajax({
	    type: "POST",
	    url: "getFantasyPoints.php",
	    data: dataString,
	    success: function(response) {
	      //$('#result2').html(response);
		  playerPoints = JSON.parse(response);
		  console.log(playerPoints);
	  
		  var totalPlayerPoints = 0;
		  for (var key in playerPoints) {
		      console.log(playerPoints[key]);
			  if(playerPoints[key] == "--") {
				  totalPlayerPoints += 0;
			  } else {
				  totalPlayerPoints += +playerPoints[key];
			  }
		  }
	  
		  totalPlayerPoints = Math.round(totalPlayerPoints*100)/100;
		  
		 $('#table'+tableIndex+homeOrAway+'TeamScore').html(totalPlayerPoints);	  
	    }
	});
}

function updatePage() {	
	var week	=	$("#currentWeekNum").val();
	var teamID	=	$("#teamID").val();
	var phpResponse;
	
	//only need week and teamID to retrieve a user's roster
	var dataString = 'weekNum='+week+'&teamIDNum='+teamID;
	console.log("updatePage: "+dataString);
	$.ajax({
	    type: "POST",
	    url: "getMatchup.php",
	    data: dataString,
	    success: function(response) {
		  phpResponse = JSON.parse(response);
		  console.log(phpResponse);
		  //console.log("matchup: "+phpResponse["homeTeam"]+" vs "+phpResponse["awayTeam"]);	//For testing
		  
		  //Set eligible players for each select, set the current chosen player as default value
		  getTeamRoster(week, phpResponse[0]["homeTeam"], "home");
		  getTeamRoster(week, phpResponse[0]["awayTeam"], "away");
	    }
	});	
}

function getTeamRoster(week, teamID, homeOrAway) {
	
	var dataString = 'weekNum='+week+'&teamIDNum='+teamID;
	//console.log("dataString from getTeamRoster: "+dataString);
	//Send query to loadTeamRoster.php via AJAX
	//This gets the roster that was already set by the user previously
	$.ajax({
	    type: "POST",
	    url: "loadTeamRoster.php",
	    data: dataString,
	    success: function(response) {
		  console.log("successfully sent query to tell php to provide team roster!");	//For testing
		  phpResponse = JSON.parse(response);	//Note: phpResponse is an array of arrays, where each row is a teamRoster, followed by the chosen positions of that roster
		  console.log(phpResponse);
		  console.log("id: "+'#'+homeOrAway+'TeamName'+" teamName: "+phpResponse[week]["teamName"]);
		  
		  $('#'+homeOrAway+'TeamName').html(phpResponse[week]["teamName"]);
		  
		  populateMatchupTable(week, homeOrAway, phpResponse[week]);	
		  console.log("finished populating " + homeOrAway + " roster");	//For testing
	    }
	});
}

function populateMatchupTable(week, homeOrAway, roster) {
	$("#"+homeOrAway+"QB").html(roster["QB"]);
	$("#"+homeOrAway+"RB1").html(roster["RB1"]);
	$("#"+homeOrAway+"RB2").html(roster["RB2"]);
	$("#"+homeOrAway+"WR1").html(roster["WR1"]);
	$("#"+homeOrAway+"WR2").html(roster["WR2"]);
	$("#"+homeOrAway+"WR3").html(roster["WR3"]);
	$("#"+homeOrAway+"TE").html(roster["TE"]);
	$("#"+homeOrAway+"DEF").html(roster["DEF"]);
	$("#"+homeOrAway+"K").html(roster["K"]);
	$("#"+homeOrAway+"FLEX").html(roster["FLEX"]);
	
	getFantasyPoints(week, homeOrAway, roster);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}




function getFantasyPoints(week, homeOrAway, roster) {
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

	console.log("getFantasyPoints dataString: "+dataString);
	
	$.ajax({
	    type: "POST",
	    url: "getFantasyPoints.php",
	    data: dataString,
	    success: function(response) {
	      //$('#result2').html(response);
		  playerPoints = JSON.parse(response);
		  //console.log(playerPoints);
		  //console.log("successfully got fantasyPoints from php!");
		  
		  populatePoints(homeOrAway, playerPoints, roster["QB"], "QB");
		  populatePoints(homeOrAway, playerPoints, roster["RB1"], "RB1");
		  populatePoints(homeOrAway, playerPoints, roster["RB2"], "RB2");
		  populatePoints(homeOrAway, playerPoints, roster["WR1"], "WR1");
		  populatePoints(homeOrAway, playerPoints, roster["WR2"], "WR2");
		  populatePoints(homeOrAway, playerPoints, roster["WR3"], "WR3");
		  populatePoints(homeOrAway, playerPoints, roster["TE"], "TE");
		  populatePoints(homeOrAway, playerPoints, roster["DEF"], "DEF");
		  populatePoints(homeOrAway, playerPoints, roster["K"], "K");
		  populatePoints(homeOrAway, playerPoints, roster["FLEX"], "FLEX");
		  
		  var totalPlayerPoints = 0;
		  for (var key in playerPoints) {
		      //console.log(playerPoints[key]);
			  if(playerPoints[key] == "--") {
				  totalPlayerPoints += 0;
			  } else {
				  totalPlayerPoints += +playerPoints[key];
			  }
		  }
		  
		  totalPlayerPoints = Math.round(totalPlayerPoints*100)/100;
		  
		  $('#'+homeOrAway+"TeamScore").html(totalPlayerPoints);
	    }
	});
};

function populatePoints(homeOrAway, playerPoints, playerName, position) {
  if(	playerPoints[playerName] != undefined	) {
	  $('#'+homeOrAway+position+"Points").html(playerPoints[playerName]);
  }
  else {
	  $('#'+homeOrAway+position+"Points").html("0");
  }
}

function createMatchupTable(idName, matchupIteration, homeTeam1, awayTeam1, homeTeamScore1, awayTeamScore1, rowNum, maxNumColumn, convertTeam) {
  //var createdTable = "<table class='matchupTableList' id='"+idName+"'> <tr><td id='"+idName+"homeTeamName'>"+homeTeam1+"</td><td id='"+idName+"homeTeamScore'>"+homeTeamScore1+"</td></tr>  <tr><td id='"+idName+"awayTeamName'>"+awayTeam1+"</td><td id='"+idName+"awayTeamScore'>"+awayTeamScore1+"</td></tr></table>";
	var createdRow = "<div class='flexCard'><button class='centerTable fullWidth noStyle' onClick=updatePage("+homeTeam1+")><table class='fullWidth'><tr><td style='text-align: left; width: 70%;' id='"+idName+"homeTeamName'>"+convertTeam[homeTeam1]+"</td><td style='text-align: left; width: 30%;' id='"+idName+"homeTeamScore'>"+homeTeamScore1+"</td></tr>  <tr><td style='text-align: left; width: 70%;' id='"+idName+"awayTeamName'>"+convertTeam[awayTeam1]+"</td><td style='text-align: left; width: 30%;' id='"+idName+"awayTeamScore'>"+awayTeamScore1+"</td></tr></table></button></div>";
  //var createdRow = "<tr><table><tr><td id='"+idName+"homeTeamName'>"+homeTeam1+"</td><td id='"+idName+"homeTeamScore'>"+homeTeamScore1+"</td></tr>  <tr><td id='"+idName+"awayTeamName'>"+awayTeam1+"</td><td id='"+idName+"awayTeamScore'>"+awayTeamScore1+"</td></tr></table></tr>";
  //console.log(createdTable);
  //$('#hiddenMatchupsTable').append(createdRow);
	$('#row'+rowNum+'col'+(matchupIteration%maxNumColumn)).append(createdRow);
  //document.body.innerHTML += createdTable;
	//return createdRow	
}