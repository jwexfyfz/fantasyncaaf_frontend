$( document ).ready(
	function startPage() {
		//UPDATE THIS EVERY WEEK TO SET CURRENT WEEK
		var currentWeek = 1;
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
		    if (distanceFromLeft >= rankWidth.replace(/px/,'')) {
				console.log('went sticky @ '+rankWidth);
		        $('#sticky').addClass('fixed');
		        $('#sticky').css('top',$('#sticky').css('top'));
				
		        $('#sticky2').addClass('fixed');
		        $('#sticky2').css('top',$('#sticky2').css('top'));
				
		        $('.stickyColumn').addClass('fixed');
		        $('.stickyColumn').css('top',$('#sticky2').css('top'));
		    } else {
		        $('#sticky').removeClass('fixed');
		        $('#sticky2').removeClass('fixed');
		        $('.stickyColumn').removeClass('fixed');
		    }
		});
		
		getTeamNameFromTeamID(teamID);
});

function getTeamNameFromTeamID(teamID) {
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

		  populateStandings(teamID, phpResponse);
	    }
	});
}

function populateStandings(teamID, getNameFromID) {
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
		  
		  for(i = 0; i < phpResponse.length; i++) {
			  if(phpResponse[i]["teamID"] == teamID) {
			  	  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn currentTeam" style="padding-left: 20px">'+(i+1)+'</td><td class="standingsTableRow currentTeam teamColumn stickyColumn" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn currentTeam">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
			  } else {
				  $('#standingsTable').append('<tr><td class="standingsTableRow rankColumn" style="padding-left: 20px">'+(i+1)+'</td><td class="standingsTableRow teamColumn stickyColumn" id="sticky2">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["divisionWins"]+'-'+phpResponse[i]["divisionLosses"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsFor"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["pointsAgainst"]+'</td></tr>');
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

function updatePage() {
	//This is a dummy function because weekSelect.js calls updatePage() when new week is selected
	console.log("updatePage() called");
}
function allMatchupsFunction() {
	//This is a dummy function because weekSelect.js calls allMatchupsFunction() when new week is selected
	console.log("allMatchupsFunction() called");
}