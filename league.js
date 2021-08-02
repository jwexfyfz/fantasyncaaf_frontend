$( document ).ready(
	function startPage() {
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
		
		$(".test").html("Week "+currentWeek);
		console.log("Current week is now set to "+$(".test").html());
		
		var week	=	$("#currentWeekNum").val();
		var teamID	=	$("#teamID").val();
				
		$("#headerTableColumn2").click( function(event) {
			window.location.href = "index.php" + window.location.search;
		});
		
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.php" + window.location.search;
		});	
		
		$("#headerTableColumn4").click( function(event) {
			window.location.href = "players.php" + window.location.search;
		});	

		$('#standingsTableWindow').scroll(function() {
		    var distanceFromLeft = $(this).scrollLeft();
			console.log("scroll @ "+$(this).scrollLeft());
			
			var rankWidth = $('#standingsTableSections th:first-child').css('width');
		    //if (distanceFromLeft >= rankWidth.replace(/px/,'')) {
			if (distanceFromLeft > 0) {
				console.log('went sticky @ '+distanceFromLeft);
		        $('#stickyRank').addClass('fixed');
		        $('#stickyRank').css('top',$('#stickyRank').css('top'));
				
		        $('#sticky').addClass('fixed');
		        $('#sticky').css('top',$('#sticky').css('top'));
				
		        $('#sticky2Rank').addClass('fixed');
		        $('#sticky2Rank').css('top',$('#sticky2Rank').css('top'));
								
		        $('#sticky2').addClass('fixed');
		        $('#sticky2').css('top',$('#sticky2').css('top'));
								
		        $('.stickyColumn').addClass('fixed');
		        $('.stickyColumn').css('top',$('#sticky2').css('top'));
								
		        $('.stickyColumnRank').addClass('fixed');
		        $('.stickyColumnRank').css('top',$('#sticky2').css('top'));
		    } else {
		        $('#stickyRank').removeClass('fixed');
		        $('#sticky').removeClass('fixed');
		        $('#sticky2Rank').removeClass('fixed');
		        $('#sticky2').removeClass('fixed');
		        $('.stickyColumn').removeClass('fixed');
		    }
		});
		
		$('#standingsTableWindow2').scroll(function() {
		    var distanceFromLeft2 = $(this).scrollLeft();
			console.log("scroll @ "+$(this).scrollLeft());
			
			var rankWidth = $('#standingsTableSections2 th:first-child').css('width');
		    //if (distanceFromLeft >= rankWidth.replace(/px/,'')) {
			if (distanceFromLeft2 > 0) {
				console.log('went sticky @ '+distanceFromLeft2);
		        $('#stickyDivision2Rank').addClass('fixed');
		        $('#stickyDivision2Rank').css('top',$('#stickyDivision2Rank').css('top'));
				
		        $('#stickyDivision2').addClass('fixed');
		        $('#stickyDivision2').css('top',$('#stickyDivision2').css('top'));
				
		        $('#sticky2Division2Rank').addClass('fixed');
		        $('#sticky2Division2Rank').css('top',$('#sticky2Division2Rank').css('top'));
								
		        $('#sticky2Division2').addClass('fixed');
		        $('#sticky2Division2').css('top',$('#sticky2Division2').css('top'));
								
		        $('.stickyColumnDivision2').addClass('fixed');
		        $('.stickyColumnDivision2').css('top',$('#sticky2Division2').css('top'));
								
		        $('.stickyColumnDivision2Rank').addClass('fixed');
		        $('.stickyColumnDivision2Rank').css('top',$('#sticky2Division2').css('top'));
		    } else {
		        $('#stickyDivision2Rank').removeClass('fixed');
		        $('#stickyDivision2').removeClass('fixed');
		        $('#sticky2Division2Rank').removeClass('fixed');
		        $('#sticky2Division2').removeClass('fixed');
		        $('.stickyColumnDivision2').removeClass('fixed');
		        $('.stickyColumnDivision2Rank').removeClass('fixed');
		    }
		});
		
		checkDivisionFlag(teamID);
});

function checkDivisionFlag(teamID) {
	var dataString = "";
	var useDivisions = 2;
	
	$.ajax({
	    type: "POST",
	    url: "useDivisionsFlag.php",
	    data: dataString,
	    success: function(response) {
		  console.log("response from checkDivisionFlag(): "+response);
		  
		  if(response == "1") {
			  useDivisions = 1;
			  console.log(useDivisions);
		  }
		  else {
			  useDivisions = 0;
			  console.log(useDivisions);
		  }
		  
		  if(useDivisions == 0) {
			  console.log("hiding #standingsTableWindow2 and .divisionHeader");
			  $('.divFlag').each(function(){
				  console.log('went through .divFlag function');
				  $(this).empty();
			  });
			  
			  $('#standingsTableWindow2').hide();
			  $('.divisionHeader').hide();
			  $('.divFlag').hide();
			  $('.divFlagTable').hide();
			  $('.divFlagTableCell').hide();
			  $('#bigContainer').css('width','445px');
			  console.log("#standingsTableWindow2: "+$('#standingsTableWindow2').css('display')+", .divisionHeader: "+$('.divisionHeader').css('display'));
			  $('.noDivisionsUsed').css('display','block');
			  
			  
		  }
		  else {
			  console.log("showing #standingsTableWindow2 and .divisionHeader");
			  $('#standingsTableWindow2').css('display','block');
			  $('.divisionHeader').css('display','block');
			  $('.divFlag').css('display','block');
			  $('.divFlagTable').css('display','table');
			  $('.divFlagTableCell').css('display','table-cell');
			  $('#bigContainer').css('width','550px');
			  $('#bigContainer2').css('width','550px');
			  $('.noDivisionsUsed').hide();
		  }

		  getTeamNameFromTeamID(useDivisions, teamID);
	    }
	});
}

function getTeamNameFromTeamID(useDivision, teamID) {
	var phpResponse;
	var dataString = "";
	
	//Send query to convertTeamIDToName.php via AJAX
	//This gets the roster that was already set by the user previously
	$.ajax({
	    type: "POST",
	    url: "convertTeamIDToName.php",
	    data: dataString,
	    success: function(response) {
		  phpResponse = JSON.parse(response);

		  populateStandings(useDivision, teamID, phpResponse);
	    }
	});
}

function populateStandings(useDivision, teamID, getNameFromID) {
	console.log("getNameFromID: "+getNameFromID);
	var phpResponse;
	var dataString = "";
	
	//Send query to getLeagueStandings.php via AJAX
	//This gets the roster that was already set by the user previously
	$.ajax({
	    type: "POST",
	    url: "getLeagueStandings.php",
	    data: dataString,
	    success: function(response) {
		  console.log("successfully sent query to get league standings!");	//For testing
		  phpResponse = JSON.parse(response);
		  
		  console.log("useDivision = "+useDivision);
		  
		  //Populate two tables for the two divisions if the useDivision flag is on
		  if(useDivision) {
			  console.log("197: useDivision is set to 1");
			  var division1Marker = 0;
			  var division2Marker = 0;
			  
			  for(i = 0; i < phpResponse.length; i++) {
				  if(phpResponse[i]["division"] == 1) {
					  if(phpResponse[i]["teamID"] == teamID) {
					  	  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn currentTeam stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(division1Marker+1)+'</td><td class="standingsTableRow currentTeam teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
					  } else {
						  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(division1Marker+1)+'</td><td class="standingsTableRow teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
					  }
					  division1Marker++;
				  }
				  else {
					  if(phpResponse[i]["teamID"] == teamID) {
					  	  $('#standingsTable2').append('<tr><td class="standingsTableRow rankColumn currentTeam stickyColumnDivision2Rank" style="padding-left: 20px" id="sticky2Division2Rank">'+(division2Marker+1)+'</td><td class="standingsTableRow currentTeam teamColumn stickyColumnDivision2" style="padding-left: 20px" id="sticky2Division2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
					  } else {
						  $('#standingsTable2').append('<tr><td class="standingsTableRow rankColumn stickyColumnDivision2Rank" style="padding-left: 20px" id="sticky2Division2Rank">'+(division2Marker+1)+'</td><td class="standingsTableRow teamColumn stickyColumnDivision2" style="padding-left: 20px" id="sticky2Division2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
					  }
					  division2Marker++;
				  }
			  }
		  }
		  //Otherwise populate everyone into one table
		  else {
			  console.log("222: useDivision is set to 0");
			  for(i = 0; i < phpResponse.length; i++) {
				  if(phpResponse[i]["teamID"] == teamID) {
				  	  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn currentTeam stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow currentTeam teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
				  } else {
					  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
				  }				  
			  }
		  }
		  
		  
		  console.log("finished populating league standings");	//For testing
	    }
	});
}

function updatePage(teamID) {
	//This is a dummy function because weekSelect.js calls updatePage() when new week is selected
	console.log("updatePage() called");
}
function allMatchupsFunction() {
	//This is a dummy function because weekSelect.js calls allMatchupsFunction() when new week is selected
	console.log("allMatchupsFunction() called");
}