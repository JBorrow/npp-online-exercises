function sliderVals() {
	// Find out the current values of each of the sliders
	return { 
		na: $('#na').val(),
		la: $('#la').val(),
		lb: $('#lb').val(),
		lc: $('#lc').val(),
	}
}

function timeEvo(params, tmax=10., n=1000) {
	// params is object array defined in sliderVals
	// tmax = max time evolution
	// n = number of timesteps

	var dt = tmax/n;
	var times = numeric.linspace(0, tmax, n);
	var Na = [params.na];
	var Nb = [0.];
	var Nc = [0.];

	for (i=1; i < n; i++) {
		var time = times[i];
		Na[i] = Na[i-1] - params.la*dt*Na[i-1]; // A->B
		Nb[i] = Nb[i-1] + params.la*Na[i-1]*dt - params.lb*Nb[i-1]*dt; // B->C
		Nc[i] = Nc[i-1] + params.lb*Nb[i-1]*dt - params.lc*Nc[i-1]*dt; // C->na
	}

	return {
		times, Na, Nb, Nc,
	}
}

function makePlot(data) {
	var c = data.times.map(function (e, i) {
    	return [[data.times[i], data.Na[i]],[data.times[i], data.Nb[i]],[data.times[i], data.Nc[i]]];
	});
	var options = {
		legend: {
			show: true,
		},
	}
	
	c = numeric.transpose(c);  // sorry this is lazy...  that map function is v. complicated!

	var plottingData = [
		{label:"Number of A atoms", data:c[0]},
		{label:"Number of B atoms", data:c[1]},
		{label:"Number of C atoms", data:c[2]},
	];
	console.log(plottingData);
	$.plot("#placeholder", plottingData);
}

// Actual script

var params;
var data;

$(document).ready(function() {
	$("#submit").click(function() {
		params = sliderVals();
		data = timeEvo(params);
		makePlot(data);
	});
});