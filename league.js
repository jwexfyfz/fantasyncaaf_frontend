$( document ).ready(
	function startPage() {
		//UPDATE THIS EVERY WEEK TO SET CURRENT WEEK
		var currentWeek = 1;
		$("#currentWeekNum").val(currentWeek);
		console.log("Current week is now set to "+$("#currentWeekNum").val());
		
		var urlArray = getUrlVars();
		
		var week	=	$("#currentWeekNum").val();
		var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
		
				
		$("#headerTableColumn2").click( function(event) {
			window.location.href = "index.html" + window.location.search;
		});
		
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.php" + window.location.search;
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
			  	  $('#standingsTable').append('<tr><td class="standingsTableRow currentTeam">'+(i+1)+'</td><td class="standingsTableRow currentTeam">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow currentTeam">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'-'+phpResponse[i]["ties"]+'</td></tr>');
			  } else {
				  $('#standingsTable').append('<tr><td class="standingsTableRow">'+(i+1)+'</td><td class="standingsTableRow">'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td class="standingsTableRow">'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'-'+phpResponse[i]["ties"]+'</td></tr>');
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