$( document ).ready(
	function showMenu() {
		$( "#accountAvatar" ).click(function() {					
			console.log("clicked to display accountAvatar menu");
			$("#accountMenu").css('display','block');
			$("#accountAvatar").css('display','none');
		});
		
		$("#myTeamTable").mouseup(function(e)
	    {
	        var subject = $("#accountMenu"); 

	        if(e.target.id != subject.attr('id'))
	        {
	            subject.css('display','none');
				$( "#accountAvatar" ).css('display','block');
	        }
	    });
		
		$("#headerWrapper").mouseup(function(e)
	    {
	        var subject = $("#accountMenu"); 

	        if(e.target.id != subject.attr('id'))
	        {
	            subject.css('display','none');
				$( "#accountAvatar" ).css('display','block');
	        }
	    });
});