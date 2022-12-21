	var mod = document.head, c = mod.children;
	var src=["colors.js",
			"../_FullMidiSet_sf2/_FluidR3_GM_sf2.js",
			"../_FullMidiSet_sf2/_GeneralUserGS_sf2.js",
			"../_FullMidiSet_sf2/_Aspirin_sf2.js",
			"../_FullMidiSet_sf2/_Chaos_sf2.js",
			"../_FullMidiSet_sf2/_JCLive_sf2.js",
			"../_FullMidiSet_sf2/_SBLive_sf2.js",
			"../_FullMidiSet_sf2/_SoundBlasterOld_sf2.js"]
			
	function loadScript(url, callback){
			// Adding the script tag to the MODULES as suggested before
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;
			// Then bind the event to the callback function. // There are several events for cross browser compatibility.
			script.onreadystatechange = callback;
			script.onload = callback;
			// Fire the loading
			mod.appendChild(script);
			return true;
	}	
	//loadScript(",,,main.js", loadScript(",,,main.js",loadScript(",,,myKeyboard.js", mycallbackCode(",,,myKeyboard.js") )) );
	//loadScript(",,,myKeyboard.js", mycallbackCode(",,,myKeyboard.js") );
/* 	function mycallbackCode(e){console.log('callback;',e,c);};
	function mycallback1(){loadScript(src[0], mycallback2 )}
	function mycallback2(){loadScript(",,,main.js",mycallback2)}
	function mycallback3(){loadScript(",,,myKeyboard.js", mycallbackCode(",,,myKeyboard.js") )}
	
	loadScript(src[1], mycallbackCode(loadScript(",,,main.js",mycallback1)) );
	 */
	function mycallbackCode(e){console.log('callback;',_tone_0000_FluidR3_GM);}
	loadScript(src[1],mycallbackCode);