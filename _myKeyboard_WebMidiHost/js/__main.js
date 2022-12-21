//main
	/// device
	var isMobile=!!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
	let pressColor='#1BC0EA'; //color when key is pressed
	if(isMobile){var evtListener=['touchstart', 'touchend']; } else{var evtListener=['mousedown', 'mouseup']; }
	///
	function get(e){return document.getElementById(e);}
	/// debug
	var debug=unbearable=3;
	function jo(){if(!debug)return;	var line = new Error().stack.split( ':' );return line[line.length - 2 ];	}
	function wtf(is,that){if(unbearable && is>unbearable)console.log('@bitch',is,that);else return 'to sender'; }
	/// clhronometer
	var startTime = LapTime = Date.now(), Lap=endTime=timeElapsed = 0.001;
	function getTimeElapsed() {
		endTime = Date.now(); // Get current Time
		timeElapsed = (endTime-startTime)*0.001; // current time - startTime = Time Elapsed
		if(timeElapsed>0.01) Lap+=Number(timeElapsed); //filter to acchording
		Lap=Number(Lap.toFixed(4));
		startTime = Date.now();
		return [timeElapsed, Lap]; // Convert MS to S
	}	
	///  toggle DISPLAY
	function dsply_frm(id,sub){ var dsp=get(id+sub).style;
		if(dsp.display=="block"){get(id+sub).style.display ="none";return;}
		dsp.display ="block";
	}

	/// MODULE LOADER
	
	/// selection option pre-filter
	function fnFILTER(keyword,list) {//FILTER  select LIST
			var sList = get(list),k=0;
			for (var i = 0; i < sList.length; i++) {
					var txt = sList.options[i].text;
					var regex = new RegExp(keyword, 'g');
					sList.options[i].style.display = regex.test(txt) ? 'list-item':'none';
					//if(include)k++;//matched count
			}
			sList.focus();sList.click();
			//sList.size=k;
	}
	/// SETUP INSTRUMENT OPTIONS LIST...
	function setInstrumentList(_options) {var i=0;
			var myselect = get('instruments');
			myselect.onchange = function () {
						instrument[chNO]=this.selectedIndex;
						selectedPreset=INSTRUMENTvarname[this.selectedIndex];
						ChannelSet[instrument[chNO]]=selectedPreset;
						console.log('selectedPreset',instrument,selectedPreset);
						init(instrument[chNO]);
			}
			for(var name in _options) { 
					var ndx=Number(name.substring(6, 9)); //001
					var sub=Number(name.substring(9, 10))+1; if(sub==1)sub='';else sub=' ['+sub+']'; //001-[2]
					var myelement = document.createElement("option");
					myelement.textContent = midiset[ndx]+sub;// use midi names
					myelement.value = name; // no need assign values var names already in array
					myselect.appendChild(myelement);
					INSTRUMENTvarname[i]=_options[name];			///console.log("name is: "+name,'-', ndx, sub, _options[name], INSTRUMENTvarname[i], INSTRUMENTvarname[i],.zones);
					i++;
			}
	}
	var INSTRUMENTvarname=[];			/// options instruments - important
	setInstrumentList(_FluidR3_GM); /// console.log('INSTRUMENTvarname',INSTRUMENTvarname);
	
	///monitor
	function fnMonText(el,t){	var txt=get(el).value+t+"\n", rows=txt.split("\n");	//console.log(el,txt,rows);
		if(rows.length>el.rows)rows.shift();
		get(el).value=rows.join("\n");
	}
	