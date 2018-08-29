$( document ).ready(
	function addWeekBubble() {
		//TODO: jeffwang to add section on how to scroll to the bottom on click
		
		//When user clicks the current week number, show the week drop-up
		$( "#currentWeekCircle" ).click(function() {					
			console.log("clicked to display");
			$("#weekScrollContainer").css('display','block');
			$("#currentWeekCircle").css('display','none');
			$("#unclickable").css('display','block');
			
			switch($('#currentWeekNum').val()) {
			    case "1":
			        $('#scrollable').scrollTop(420);
			        break;
			    case "2":
			        $('#scrollable').scrollTop(350);
			        break;
			    case "3":
			        $('#scrollable').scrollTop(280);
			        break;
			    case "4":
			        $('#scrollable').scrollTop(210);
			        break;
			    case "5":
			        $('#scrollable').scrollTop(140);
			        break;
			    case "6":
			        $('#scrollable').scrollTop(70);
			        break;
			    default:
			        $('#scrollable').scrollTop(0);
			}
		});
		
		//When user selects a week number, hide the week drop-up
		$( "#week13Circle" ).click(function() {
			selectWeek(13);
		});
		$( "#week12Circle" ).click(function() {
			selectWeek(12);
		});
		$( "#week11Circle" ).click(function() {
			selectWeek(11);
		});
		$( "#week10Circle" ).click(function() {
			selectWeek(10);
		});
		$( "#week9Circle" ).click(function() {
			selectWeek(9);
		});
		$( "#week8Circle" ).click(function() {
			selectWeek(8);
		});
		$( "#week7Circle" ).click(function() {
			selectWeek(7);
		});
		$( "#week6Circle" ).click(function() {
			selectWeek(6);
		});
		$( "#week5Circle" ).click(function() {
			selectWeek(5);
		});
		$( "#week4Circle" ).click(function() {
			selectWeek(4);
		});
		$( "#week3Circle" ).click(function() {
			selectWeek(3);
		});
		$( "#week2Circle" ).click(function() {
			selectWeek(2);
		});
		$( "#week1Circle" ).click(function() {
			selectWeek(1);
		});
	
	$("#unclickable").mouseup(function(e)
    {
        var subject = $("#weekScrollContainer"); 

        if(e.target.id != subject.attr('id'))
        {
            subject.css('display','none');
			$( "#currentWeekCircle" ).css('display','block');
			$( "#unclickable" ).css('display','none');
        }
    });
});

function selectWeek(weekNum) {
	console.log("clicked to hide");
	$("#weekScrollContainer").css('display','none');
	$( "#unclickable" ).css('display','none');
	console.log($('#week'+weekNum+'Circle').html());
	
	var prevWeek = $('#currentWeekNum option:selected').val();
	$("#week"+prevWeek+"Circle").css('background-color','transparent');
	console.log("setting previous week, "+prevWeek+", to "+$("#week"+prevWeek+"Circle").css('background-color'));
	
	$("#currentWeekNum option[value="+prevWeek+"]").removeAttr("selected");			
	$('#currentWeekNum option[value='+weekNum+']').attr('selected','selected');
	console.log("new select value chosen, "+$('#currentWeekNum option:selected').val()+", calling updatePage()");
	
	$("#currentWeekCircle").html(weekNum);
	$("#currentWeekCircle").css('display','block');
	$("#week"+weekNum+"Circle").css('background-color','#F7882F');
	
	updatePage($("#teamID").val());
	allMatchupsFunction();
}


var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  b.setAttribute("id", "weekBlock");
  var height = screen.height-185;
  var string = "overflow-y:scroll; height:"+height+"px; max-height:663px; z-index:999";
  console.log(string);
  b.setAttribute("style", string)
  for (j = 0; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
		console.log("new select value chosen, calling updatePage()");
		updatePage($("#teamID").val());
		allMatchupsFunction();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}


/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);