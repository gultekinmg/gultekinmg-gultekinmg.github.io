/* (function(w) {
	var originalSetTimeout = w.setTimeout;
	var originalSetTimeout = w.setInterval;
	var originalClearInterval = w.clearInterval;
	var timers = [];
	w.timers = timers;
	w.setTimeout = function(fn, delay) {
			var id = originalSetTimeout(function(){fn && fn();removeTimer(id);}, delay);
			timers.push(id);
			return id;
	};
	w.setInterval = function(fn, delay) {
			var id = originalSetTimeout(fn, delay);
			timers.push(id);
			return id;
	};
	w.clearInterval = function(id) {
			originalClearInterval(id);
			removeTimer(id);
	};
	w.clearTimeout = w.clearInterval;

	function removeTimer(id) {
			var index = timers.indexOf(id);
			if (index >= 0)timers.splice(index, 1);
	}
}(window)); */
 
window.activeTimers = 0;
window.originalSetTimeout = window.setTimeout;
window.originalClearTimeout = window.clearTimeout;
window.originalSetInterval = window.setInterval;
window.originalClearInterval = window.clearInterval;
//
window.setTimeout = function(fn, delay,x){window.activeTimers++; /* console.log('to',fn,delay,x); */ return window.originalSetTimeout(fn, delay,x);};
window.clearTimeout = function(timerID){	window.activeTimers--;	window.originalClearTimeout(timerID);};
//
window.setInterval = function(fn, delay){	window.activeTimers++;	return window.originalSetInterval(fn, delay);};
window.clearInterval = function(timerID){	window.activeTimers--;	window.originalClearInterval(timerID);};
//
function killtime(){for(var i=0;i<20;i++){window.clearTimeout(i);window.clearInterval(i);}}
