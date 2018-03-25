//jeffwang 3/14/2018: On document.ready, need to populate eligible players for user to select.
//To do this, need to send query to loadTeamRoster.php to tell the user which players they have currently chosen for the week.
//Then, need to pass this data to getDataforChoosePlayerLists(), which passes it to populateChoosePlayerLists() to set default values
//Functions being run once page is loaded: 
//1) getDataforChoosePlayerLists(), which calls populateChoosePlayerLists()
$( document ).ready(
	function getTeams() {
		dataString = "";
		$.ajax({
		    type: "POST",
		    url: "getTeams.php",
		    data: dataString,
		    success: function(response) {
				//console.log(response);
				console.log("successfully sent query to tell php to provide list of teams!");	//For testing
				listOfTeams = JSON.parse(response);

				populateListOfTeams("inputTeamName", listOfTeams);		  
				console.log("finished populating list of teams!");	//For testing
		    }
		});
		
		$("#loginButton").click( function(event) {
			event.preventDefault();
			dataString = "teamName="+$('#inputTeamName').val() + "&teamPassword="+$('#inputTeamPassword').val();
			console.log(dataString);
			$.ajax({
			    type: "POST",
			    url: "login.php",
			    data: dataString,
			    success: function(response) {
					console.log(response);
					phpResponse = JSON.parse(response);
					
					if(phpResponse["id"] == "incorrectPassword") {
						alert('Incorrect password! Please try again.');
					}
					else {
						window.location.href = 'index.html?teamID='+phpResponse["id"]+'&teamName='+phpResponse["name"];
					}
			    }
			});
		});
});


function populateListOfTeams(inputPosition, positionList) {
    var select = document.getElementById(inputPosition);
    for(var index in positionList) {
        select.options[select.options.length] = new Option(positionList[index], index);
    }
};