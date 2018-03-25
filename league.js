$( document ).ready(
	function startPage() {
		var urlArray = getUrlVars();
		//console.log(urlArray);
		var week	=	$("#currentWeekNum").html();
		var teamID	=	urlArray["teamID"];		//TODO: jeffwang needs to replace this with an actual login system...
		
				
		$("#headerTableColumn2").click( function(event) {
			window.location.href = "index.html" + window.location.search;
		});
		
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.html" + window.location.search;
		});	
		
		getTeamNameFromTeamID(teamID);
});

function getTeamNameFromTeamID(teamID) {
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

		  populateStandings(teamID, phpResponse);
	    }
	});
}

function populateStandings(teamID, getNameFromID) {
	console.log("getNameFromID: "+getNameFromID);
	var phpResponse;
	var dataString = "";
	
	//Send query to loadTeamRoster.php via AJAX
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
			  	  $('#standingsTable').append('<tr style="background-color: #EEEEEE"><td>'+(i+1)+'</td><td>'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td>'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'-'+phpResponse[i]["ties"]+'</td></tr>');
			  } else {
				  $('#standingsTable').append('<tr><td>'+(i+1)+'</td><td>'+getNameFromID[phpResponse[i]["teamID"]]+'</td><td>'+phpResponse[i]["wins"]+'-'+phpResponse[i]["losses"]+'-'+phpResponse[i]["ties"]+'</td></tr>');
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