function getCurrentWeek() {
	var currentWeek = 1;
	if (Date.now() > new Date('November 30, 2020 07:00:00 UTC').getTime()) {
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
	
	return currentWeek;
}

$( document ).ready(
	function startPage() {	
		$("#weekOpponent").html("Wk " + getCurrentWeek() + " Opp");
				
		$("#headerTableColumn1").click( function(event) {
			window.location.href = "league.php" + window.location.search;
		});
		
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
		
		$("#enableFilterDropdown").click( function(event) {
			if($("#enableFilterDropdown").hasClass("rotated")) {
				$("#enableFilterDropdown").removeClass("rotated");
			}
			else {
				$("#enableFilterDropdown").addClass("rotated");
			}
			
			if($('.filterRows').is(":visible") == false) {
				$(".filterRows").show();
				$("#standingsTableSections").css("top", "calc(var(--headerHeight) + 170px)");
			}
			else {
				$(".filterRows").hide();
				$("#standingsTableSections").css("top", "calc(var(--headerHeight) + 40px)");
			}
		});	
		
		$("#filterClearButton").click( function(event) {			
			$(".filterButton").each(function( index ) {
				$( this ).attr("data-enabled","false");
				$( this ).css("background-color","#FFFFFF");
				console.log( index + ": " + $( this ).text() + " " + $( this ).attr("data-enabled"));
			});
			console.log("ended loop");	
			
	
			$(".filteredResults").each(function( index ) {
				$( this ).remove();
			});
	  
			populatePlayers(getCurrentWeek());
		});	
		
		$("#filterSelectAllButton").click( function(event) {			
			$(".filterButton").each(function( index ) {
				$( this ).attr("data-enabled","true");
				$( this ).css("background-color","#B8FEBF");
				console.log( index + ": " + $( this ).text() + " " + $( this ).attr("data-enabled"));
			});
			console.log("ended loop");	
			
	
			$(".filteredResults").each(function( index ) {
				$( this ).remove();
			});
	  
			populatePlayers(getCurrentWeek());
		});	
		
		$(".screenContainer").on( 'scroll', function(){
		   console.log($( ".screenContainer").scrollLeft());
		   $( ".screenContainer2").scrollLeft($( ".screenContainer").scrollLeft());
		});
		
		
		
		populatePlayers(getCurrentWeek());
});

//This function changes the color of the div that represents filters by position. If it's enabled (green) and clicked, set it to disabled (white), and vice versa
function filterClick(clicked_id)
  {
	  if($("#"+clicked_id).attr("data-enabled") == "true") {
		  $("#"+clicked_id).attr("data-enabled","false");
		  $("#"+clicked_id).css("background-color","#FFFFFF");
	  }
	  else {
		  $("#"+clicked_id).attr("data-enabled","true");
		  $("#"+clicked_id).css("background-color","#B8FEBF");
	  }
	
	  $(".filteredResults").each(function( index ) {
		  $( this ).remove();
	  });
	  
	  populatePlayers(getCurrentWeek());
  }

function populatePlayers(currentWeek) {
	var phpResponse;
	var dataString = 'weekNum='+currentWeek+'&filteredPositions=';
	var numFilters = 0;
	var currentPosition;
	$(".filterButton").each(function( index ) {
		if($( this ).attr("data-enabled") == "true") {
			switch($(this).text()) {
				case 'QB': currentPosition = 'QB';
					break;
				case 'RB': currentPosition = 'RB';
					break;
				case 'WR': currentPosition = 'WR';
					break;
				case 'TE': currentPosition = 'TE';
					break;
				case 'DEF': currentPosition = 'DEF';
					break;
				case 'K': currentPosition = 'PK';
					break;
				
				default: currentPosition = '';
			};
			
			if(numFilters == 0) {
				dataString += '\''+currentPosition+'\'';
			}
			else {
				dataString += ',\''+currentPosition+'\'';
			}
			numFilters++;
		}
	});
	console.log(dataString);
	
	//Send query to getLeagueStandings.php via AJAX
	//This gets the roster that was already set by the user previously
	$.ajax({
	    type: "POST",
	    url: "allPlayersList.php",
	    data: dataString,
	    success: function(response) {
		  console.log("successfully sent query to get allplayerslist.php!");	//For testing
		  phpResponse = JSON.parse(response);
		  console.log(phpResponse[0]);
		  for(i = 0; i < phpResponse.length; i++) {
			  console.log("i="+i);
			  console.log("length="+phpResponse.length);
			  console.log("player="+phpResponse[i]["playerName"]);
			  console.log("homeaway="+phpResponse[i]["homeaway"]);
			  if(phpResponse[i]["homeaway"]=="home") {
				  console.log("if entered");
			  	if(phpResponse[i]["fantasyPoints"] == null) {
			  		$('#standingsTable').append('<tr class="filteredResults"><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow playerColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+phpResponse[i]["playerName"]+'</td><td class="standingsTableRow teamColumn">'+phpResponse[i]["team"]+'</td><td class="standingsTableRow oppColumn">'+phpResponse[i]["opponent"]+'</td><td class="standingsTableRow positionColumn">'+phpResponse[i]["position"]+'</td><td class="standingsTableRow pointsColumn">'+'0</td></tr>');			  
			  	}
				else {
					$('#standingsTable').append('<tr class="filteredResults"><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow playerColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+phpResponse[i]["playerName"]+'</td><td class="standingsTableRow teamColumn">'+phpResponse[i]["team"]+'</td><td class="standingsTableRow oppColumn">'+phpResponse[i]["opponent"]+'</td><td class="standingsTableRow positionColumn">'+phpResponse[i]["position"]+'</td><td class="standingsTableRow pointsColumn">'+phpResponse[i]["fantasyPoints"]+'</td></tr>');			  
				}
			  }
			  //Add @ if team is player is not at home
			  else {
				  console.log("else entered");
				if(phpResponse[i]["fantasyPoints"] == null) {
					$('#standingsTable').append('<tr class="filteredResults"><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow playerColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+phpResponse[i]["playerName"]+'</td><td class="standingsTableRow teamColumn">'+phpResponse[i]["team"]+'</td><td class="standingsTableRow oppColumn">@'+phpResponse[i]["opponent"]+'</td><td class="standingsTableRow positionColumn">'+phpResponse[i]["position"]+'</td><td class="standingsTableRow pointsColumn">'+'0</td></tr>');
				}
				else {
					$('#standingsTable').append('<tr class="filteredResults"><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow playerColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+phpResponse[i]["playerName"]+'</td><td class="standingsTableRow teamColumn">'+phpResponse[i]["team"]+'</td><td class="standingsTableRow oppColumn">@'+phpResponse[i]["opponent"]+'</td><td class="standingsTableRow positionColumn">'+phpResponse[i]["position"]+'</td><td class="standingsTableRow pointsColumn">'+phpResponse[i]["fantasyPoints"]+'</td></tr>');			  
				}
			  }
		  } 
		  console.log("finished populating league standings! weekNum="+currentWeek);	//For testing
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