$( document ).ready(
	function startPage() {
		//UPDATE THIS EVERY WEEK TO SET CURRENT WEEK
		var currentWeek = 1;
		if (Date.now() > new Date('November 19, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 13;
		}
		else if (Date.now() > new Date('November 12, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 12;
		}
		else if (Date.now() > new Date('November 5, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 11;
		}
		else if (Date.now() > new Date('October 29, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 10;
		}
		else if (Date.now() > new Date('October 22, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 9;
		}
		else if (Date.now() > new Date('October 15, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 8;
		}
		else if (Date.now() > new Date('October 8, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 7;
		}
		else if (Date.now() > new Date('October 1, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 6;
		}
		else if (Date.now() > new Date('September 24, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 5;
		}
		else if (Date.now() > new Date('September 17, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 4;
		}
		else if (Date.now() > new Date('September 10, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 3;
		}
		else if (Date.now() > new Date('September 3, 2018 07:00:00 UTC').getTime()) {
			currentWeek = 2;
		}
		
		$(".test").html("Week "+currentWeek);
		console.log("Current week is now set to "+$(".test").html());
		
		var week	=	$("#currentWeekNum").val();
		var teamID	=	$("#teamID").val();
				
		$("#headerTableColumn1").click( function(event) {
			window.location.href = "league.php" + window.location.search;
		});
		
		$("#headerTableColumn2").click( function(event) {
			window.location.href = "index.php" + window.location.search;
		});
		
		$("#headerTableColumn3").click( function(event) {
			window.location.href = "matchup.php" + window.location.search;
		});	
		
		$("#headerTableColumn4").click( function(event) {
			window.location.href = "jeffTest.php" + window.location.search;
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
		
		populatePlayers(currentWeek);
});

function populatePlayers(currentWeek) {
	var phpResponse;
	var dataString = 'weekNum='+currentWeek;
	
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
			  if(phpResponse[i]["homeaway"]=="home") {
			  	$('#standingsTable').append('<tr><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+phpResponse[i]["playerName"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["team"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["position"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["opponent"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["fantasyPoints"]+'</td></tr>');			  
			  }
			  //Add @ if team is player is not at home
			  else {
			  	$('#standingsTable').append('<tr><td class="standingsTableRow rankColumn stickyColumnRank" style="padding-left: 20px" id="sticky2Rank">'+(i+1)+'</td><td class="standingsTableRow teamColumn stickyColumn" style="padding-left: 20px" id="sticky2">'+phpResponse[i]["playerName"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["team"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["position"]+'</td><td class="standingsTableRow otherColumn">@'+phpResponse[i]["opponent"]+'</td><td class="standingsTableRow otherColumn">'+phpResponse[i]["fantasyPoints"]+'</td></tr>');			  
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