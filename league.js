$( document ).ready(
	function startPage() {
		//UPDATE THIS EVERY WEEK TO SET CURRENT WEEK
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
		
		$(".test").html("Week "+currentWeek);
		console.log("Current week is now set to "+$(".test").html());
		
		var urlArray = getUrlVars();
		
		var week	=	$("#currentWeekNum").val();
		//var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
		var teamID	=	$("#teamID").val();
				
		$("#headerTableColumn2").click( function(event) {
			window.location.href = "index.php" + window.location.search;
		});
		
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.php" + window.location.search;
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
		
		checkDivisionFlag(teamID);
});

function checkDivisionFlag(teamID) {
	var useDivision = 1;
	var dataString = "";
	
	$.ajax({
	    type: "POST",
	    url: "useDivisionsFlag.php",
	    data: dataString,
	    success: function(response) {
		  useDivision = response;

		  getTeamNameFromTeamID(useDivision, teamID);
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
		  
		  //Populate two tables for the two divisions if the useDivision flag is on
		  if(useDivision) {
			  for(i = 0; i < phpResponse.length; i++) {
				  if(phpResponse[i]["division"] == 1) {
					  if(phpResponse[i]["teamID"] == teamID) {
					  	  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn currentTeam stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow currentTeam teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
					  } else {
						  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
					  }
				  }
				  else {
					  if(phpResponse[i]["teamID"] == teamID) {
					  	  $('#standingsTable2').append('<tr><td class="standingsTableRow rankColumn currentTeam stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow currentTeam teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
					  } else {
						  $('#standingsTable2').append('<tr><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
					  }
				  }
			  }
		  }
		  //Otherwise populate everyone into one table
		  else {
			  for(i = 0; i < phpResponse.length; i++) {
				  if(phpResponse[i]["teamID"] == teamID) {
				  	  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn currentTeam stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow currentTeam teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
				  } else {
					  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
				  }				  
			  }
		  }
		  
		  
		  console.log("finished populating league standings");	//For testing
	    }
	});
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function updatePage(teamID) {
	//This is a dummy function because weekSelect.js calls updatePage() when new week is selected
	console.log("updatePage() called");
}
function allMatchupsFunction() {
	//This is a dummy function because weekSelect.js calls allMatchupsFunction() when new week is selected
	console.log("allMatchupsFunction() called");
}