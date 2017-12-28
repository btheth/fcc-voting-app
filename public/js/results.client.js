$(document).ready(function() {
	var appUrl = window.location.origin;
	var poll = $("#poll").text();
	var getPollUrl = appUrl + '/pollsearch?poll=' + encodeURI(poll) + "!end";

	function getPoll() {
		$.getJSON(getPollUrl, function(json) {
			var optArray = json.polls.options;
			var optNames = [];
			var optVals = [];
			var cInd = 0;
			var bcArr = [];
			var bcColors = [
				'rgb(255, 99, 132)',
				'rgb(54, 162, 235)',
				'rgb(255, 206, 86)',
				'rgb(75, 192, 192)',
				'rgb(153, 102, 255)',
				'rgb(255, 159, 64)'];
				
			var bbArr = [];
			var bbColors = [
				'rgb(255,99,132)',
				'rgb(54, 162, 235)',
				'rgb(255, 206, 86)',
				'rgb(75, 192, 192)',
				'rgb(153, 102, 255)',
				'rgb(255, 159, 64)'];
			
			for (var i = 0; i < optArray.length; i++) {
				optNames.push(optArray[i].optionName);
				optVals.push(optArray[i].optionVotes);
				cInd++;
				if (cInd === 5) {
					cInd = 0;
				}
				bcArr.push(bcColors[cInd]);
				bbArr.push(bcColors[cInd]);
			}
			
			var ctx = document.getElementById("result-chart").getContext('2d');
			var chart = new Chart(ctx, {
    			type: 'bar',
    			data: {
    	    		labels: optNames,
    	    		datasets: [{
    	    		    label: '# of Votes',
    	    		    data: optVals,
    	    		    backgroundColor: bcArr,
    	    		    borderColor: bbArr,
    	    		    borderWidth: 1
    	    		}]
    			},
    			options: {
    			    scales: {
    			        yAxes: [{
    			            ticks: {
    			                beginAtZero:true,
    			                fixedStepSize: 1
    			            }
    			        }],
    			        xAxes: [{
                			display: false
            			}]
    			    },
    			    responsive: false,
    			    legend: {
        				display: false
    				}
    			},
			});
		});
	}

	getPoll();
});