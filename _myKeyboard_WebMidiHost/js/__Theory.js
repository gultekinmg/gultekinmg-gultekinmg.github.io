/// DISPLAY CHORD FORMULAS
var fullRange=false, myInvert=myvarb="", ips=incr2=rthmNDX=0,
		chordArr=[['Root-Sub','dstrng','keynumbers']], chordOctave=24, //CHORD SELECTOR..
		dispstring,arrNotes=keynoArr=[],invertStyle=null;
function go(n) {ips=0; ///	1-SELECT MODE
		if (document.keyform.cordscal[0].checked==1) { //CHORD SELECTED
							x=document.keyform.CHORDMODAL.options.selectedIndex;
			chordcode=document.keyform.CHORDMODAL.options[x].value;
						sub=document.keyform.CHORDMODAL.options[x].text;
			myInvert=myvarb=chordcode; 
			if(fullRange)fnFullRange(); else dispch(chordcode,sub,n);
		}
		else if (document.keyform.cordscal[1].checked==1) { scalecalc();}// SCALE SELECTED
		else if (document.keyform.cordscal[2].checked==1) {// formula
			if (document.keyform.notesnum[2].checked==1) { scalecalc(); }/// scale4formula
			else {///chord4formula
			x=document.keyform.CHORDMODAL.options.selectedIndex; sub=document.keyform.CHORDMODAL.options[x].text;
			ConvertInput();
			dispch(chordcode,sub,n); myInvert=myvarb=chordcode;}
		}
}
function dispch(formulatext,dSub,n) {///	2- setup formulaString
			 z=document.keyform.rootSelector.options.selectedIndex;
		root=document.keyform.rootSelector.options[z].value;
	rootId=document.keyform.rootSelector.options[z].text;
	if (document.keyform.notesnum[2].checked != 1) { //if chord
		if (formulatext.charAt(0) != "1") {	userinput=document.keyform.forminput.value;
			if (document.keyform.cordscal[2].checked==1) { if (userinput.charAt(0) != "1") { a=Number.NaN;}}
			else { a=parseFloat(root)+chordOctave; }
		}else {a=Number.NaN;}
	}
	forStrng="";
	displayNote(a);
	if (document.keyform.cordscal[2].checked==1) {
			if (document.keyform.notesnum[1].checked != 1) { a=parseFloat(root)+chordOctave; } else { a=13; }
	}
	else{a=parseFloat(root)+chordOctave;}
	b=0;d=formulatext.length/2;
	for(var i=0;i<d;i++){ // place chord  or scale..
		b=formulatext.indexOf(",")
		myvar=parseFloat(formulatext.substring(0,b))+a-1
		displayNote(myvar);
		formulatext=formulatext.substring(b+1,formulatext.length)
	}
	dispstring=forStrng.substring(0,(forStrng.length-1));//from play
	document.keyform.formdisp.value=dispstring;
	/// record
	if(n&&document.keyform.recordrithm.checked==1){//if recording
		arrNotes=dispstring.split(',');
		for(var kk in arrNotes){
			console.log('dispstringarr',kk,arrNotes[kk],visualKeyboard[arrNotes[kk]]);
			keynoArr[kk]=visualKeyboard[arrNotes[kk]].title; /// important
		}
		chordArr.push([/*root,*/rootId+dSub,arrNotes,keynoArr]);
		addText(log1, /*n+'.'+*/rootId+dSub+'['+dispstring+']\n');//bean
	}
}
function displayNoteSil(note){///	2a-formstring scores
	if (note== 1){forStrng +=  'C.2,';	}
	if (note== 2){forStrng += 'C#.2,';	}
	if (note== 3){forStrng +=  'D.2,';	}
	if (note== 4){forStrng += 'Eb.2,';	}
	if (note== 5){forStrng +=  'E.2,';	}
	if (note== 6){forStrng +=  'F.2,';	}
	if (note== 7){forStrng += 'F#.2,';	}
	if (note== 8){forStrng +=  'G.2,';	}
	if (note== 9){forStrng += 'Ab.2,';	}
	if (note==10){forStrng +=  'A.2,';	}
	if (note==11){forStrng += 'Bb.2,';	}
	if (note==12){forStrng +=  'B.2,';	}
	if (note==13){forStrng +=  'C.3,';	}
	if (note==14){forStrng += 'C#.3,';	}
	if (note==15){forStrng +=  'D.3,';	}
	if (note==16){forStrng += 'Eb.3,';	}
	if (note==17){forStrng +=  'E.3,';	}
	if (note==18){forStrng +=  'F.3,';	}
	if (note==19){forStrng += 'F#.3,';	}
	if (note==20){forStrng +=  'G.3,';	}
	if (note==21){forStrng += 'Ab.3,';	}
	if (note==22){forStrng +=  'A.3,';	}
	if (note==23){forStrng += 'Bb.3,';	}
	if (note==24){forStrng +=  'B.3,';	}
	if (note==25){forStrng +=  'C.4,';	}
	if (note==26){forStrng += 'C#.4,';	}
	if (note==27){forStrng +=  'D.4,';	}
	if (note==28){forStrng += 'Eb.4,';	}
	if (note==29){forStrng +=  'E.4,';	}
	if (note==30){forStrng +=  'F.4,';	}
	if (note==31){forStrng += 'F#.4,';	}
	if (note==32){forStrng +=  'G.4,';	}
	if (note==33){forStrng += 'Ab.4,';	}
	if (note==34){forStrng +=  'A.4,';	}
	if (note==35){forStrng += 'Bb.4,';	}
	if (note==36){forStrng +=  'B.4,';	}
	if (note==37){forStrng +=  'C.5,';	}
	if (note==38){forStrng += 'C#.5,';	}
	if (note==39){forStrng +=  'D.5,';	}
	if (note==40){forStrng += 'Eb.5,';	}
	if (note==41){forStrng +=  'E.5,';	}
	if (note==42){forStrng +=  'F.5,';	}
	if (note==43){forStrng += 'F#.5,';	}
	if (note==44){forStrng +=  'G.5,';	}
	if (note==45){forStrng += 'Ab.5,';	}
	if (note==46){forStrng +=  'A.5,';	}
	if (note==47){forStrng += 'Bb.5,';	}
	if (note==48){forStrng +=  'B.5';		}
	if (note==49){forStrng +=  'C.6,';	}
	if (note==50){forStrng += 'C#.6,';	}
	if (note==51){forStrng +=  'D.6,';	}
	if (note==52){forStrng += 'Eb.6,';	}
	if (note==53){forStrng +=  'E.6,';	}
	if (note==54){forStrng +=  'F.6,';	}
	if (note==55){forStrng += 'F#.6,';	}
	if (note==56){forStrng +=  'G.6,';	}
	if (note==57){forStrng += 'Ab.6,';	}
	if (note==58){forStrng +=  'A.6,';	}
	if (note==59){forStrng += 'Bb.6,';	}
	if (note==60){forStrng +=  'B.6';		}
}
function displayNote(note){///	2a-formstring scores
	for(var oct=1;oct<=6;oct++){
		if (note==(oct-1)*12+ 1){forStrng +=  'C.'+oct+',';	}
		if (note==(oct-1)*12+ 2){forStrng += 'C#.'+oct+',';	}
		if (note==(oct-1)*12+ 3){forStrng +=  'D.'+oct+',';	}
		if (note==(oct-1)*12+ 4){forStrng += 'Eb.'+oct+',';	}
		if (note==(oct-1)*12+ 5){forStrng +=  'E.'+oct+',';	}
		if (note==(oct-1)*12+ 6){forStrng +=  'F.'+oct+',';	}
		if (note==(oct-1)*12+ 7){forStrng += 'F#.'+oct+',';	}
		if (note==(oct-1)*12+ 8){forStrng +=  'G.'+oct+',';	}
		if (note==(oct-1)*12+ 9){forStrng += 'Ab.'+oct+',';	}
		if (note==(oct-1)*12+10){forStrng +=  'A.'+oct+',';	}
		if (note==(oct-1)*12+11){forStrng += 'Bb.'+oct+',';	}
		if (note==(oct-1)*12+12){forStrng +=  'B.'+oct+',';	}
	}
	///console.log('fu',note,forStrng);
}
/// scale
function scalecalc(){scaletext=scaletext1=scaletext2=scaletext3=""; u=1; t=0; i=0;
	if(document.keyform.cordscal[1].checked==1){
		x=document.keyform.scale.options.selectedIndex;
		scalevalue=document.keyform.scale.options[x].value.toUpperCase()
	}
	else if(document.keyform.cordscal[2].checked==1){
		if (document.keyform.notesnum[2].checked==1){scalevalue=document.keyform.forminput.value.toUpperCase();}
		else{scalevalue=document.keyform.forminput.value.toUpperCase();}
	}
	var check;
	for(var y=0; y<scalevalue.length; y++){
		check=0;
				 if(scalevalue.charAt(y)=="1"){t=1+u; check=1;}
		else if(scalevalue.charAt(y)=="2"){t=2+u; check=1;}
		else if(scalevalue.charAt(y)=="3"){t=3+u; check=1;}
		else if(scalevalue.charAt(y)=="4"){t=4+u; check=1;}
		else if(scalevalue.charAt(y)=="5"){t=5+u; check=1;}
		else if(scalevalue.charAt(y)=="6"){t=6+u; check=1;}
		else if(scalevalue.charAt(y)=="7"){t=7+u; check=1;}
		else if(scalevalue.charAt(y)=="8"){t=8+u; check=1;}
		else if(scalevalue.charAt(y)=="9"){t=9+u; check=1;}
		if (check==1){ scaletext=scaletext+ t+",";
			scaletext1=scaletext1+(t-chordOctave)+",";
			scaletext2=scaletext2+(t+chordOctave)+",";
			scaletext3=scaletext3+(t-(12+chordOctave))+",";
		}
		u=t
	}
	if (document.keyform.lingerscal.checked==1) {	totalscale= scaletext+scaletext1+scaletext3+scaletext2;}
	else {totalscale=scaletext;}
	dispch(totalscale);
}
/// invertor
function fnInverter(n) {/// chord finger variations
	if(n)ips=n;
	var ndums=(ips*2)+incr2;
	if(ndums>=myvarb.length){ndums=0;ips=-1;myInvert=myvarb;incr2=0;}
	else{
			if(myvarb.charAt(ndums+1)!=","){chartf=myvarb.substring(ndums,(myvarb.indexOf(",")+ndums+1));incr=2;incr2=1;}
			else{chartf=myvarb.substring(ndums,(myvarb.indexOf(",")+ndums));incr=1;incr2=0;}
			tochange=parseFloat(chartf)
			myInvert=myvarb.substring(0,ndums)+(tochange-12)+myvarb.substring((ndums+incr),myvarb.length)
	}
	chordArr.pop(); // edit last row
	dispch(myInvert,sub,rthmNDX);
	ips ++;
	console.log('myvarb',ips,myvarb,myInvert,sub,rthmNDX);
}
function fnFullRange(){/// full chord invert
	for(var i=1;i<3;i++){ // 3 times invertions added.
		var ndums=(ips*2)+incr2;
		if(ndums>=myvarb.length){ndums=0;ips=-1;myInvert=myvarb;incr2=0;}
		else{
				if(myvarb.charAt(ndums+1)!=","){chartf=myvarb.substring(ndums,(myvarb.indexOf(",")+ndums+1));incr=2;incr2=1;}
				else{chartf=myvarb.substring(ndums,(myvarb.indexOf(",")+ndums));incr=1;incr2=0;}
				tochange=parseFloat(chartf)
				myInvert+=myvarb.substring(0,ndums)+(tochange-12)+myvarb.substring((ndums+incr),myvarb.length)
		}
		ips ++;
	}
	//console.log('once',myInvert);
	myInvert=myInvert.split(',');
	myInvert= [...new Set([...myInvert])].join(',');
	//console.log('sonra',myInvert);
	chordArr.pop(); // edit last row
	dispch(myInvert,sub,rthmNDX);
	///
	//console.log('myvarb',myvarb,'myInvert'+myInvert,sub,rthmNDX);
}
/// formula
function error(){alert("You did not enter the formula correctly");}
function changeValue(value) {
	if (value.length != 1) {
		if (value.indexOf("b", 0) != -1) {comp=-1;} else if (value.indexOf("#", 0) != -1) {comp=1;}
	}else {comp=0;}
	if (document.keyform.notesnum[0].checked==1) {
		if (value.length <= 2) {
			if (value.indexOf("1", 0)!=-1) {
						 if (value.indexOf("10",0)!=-1){keypress=17+comp;formulastring=formulastring+keypress+",";}
				else if (value.indexOf("11",0)!=-1){keypress=18+comp;formulastring=formulastring+keypress+",";}
				else if (value.indexOf("12",0)!=-1){keypress=20+comp;formulastring=formulastring+keypress+",";}
				else if (value.indexOf("13",0)!=-1){keypress=21+comp;formulastring=formulastring+keypress+",";}
				else {keypress=1+comp;formulastring=formulastring+keypress+",";}
			}
			else if (value.indexOf("2",0)!=-1){keypress=3+comp;formulastring=formulastring+keypress+",";}
			else if (value.indexOf("3",0)!=-1){keypress=5+comp;formulastring=formulastring+keypress+",";}
			else if (value.indexOf("4",0)!=-1){keypress=6+comp;formulastring=formulastring+keypress+",";}
			else if (value.indexOf("5",0)!=-1){keypress=8+comp;formulastring=formulastring+keypress+",";}
			else if (value.indexOf("6",0)!=-1){keypress=10+comp;formulastring=formulastring+keypress+",";}
			else if (value.indexOf("7",0)!=-1){keypress=12+comp;formulastring=formulastring+keypress+",";}
			else if (value.indexOf("8",0)!=-1){keypress=13+comp;formulastring=formulastring+keypress+",";}
			else if (value.indexOf("9",0)!=-1){keypress=15+comp;formulastring=formulastring+keypress+",";}
		}
	}
	else { a=0;
				 if (value.indexOf("1",0)!=-1){a=a-12;}
		else if (value.indexOf("3",0)!=-1){a=a+12;}
		comp= comp+a;
				 if (value.indexOf("C",0)!=-1){keypress=1+comp;formulastring=formulastring+keypress+",";}
		else if (value.indexOf("D",0)!=-1){keypress=3+comp;formulastring=formulastring+keypress+",";}
		else if (value.indexOf("E",0)!=-1){keypress=5+comp;formulastring=formulastring+keypress+",";}
		else if (value.indexOf("F",0)!=-1){keypress=6+comp;formulastring=formulastring+keypress+",";}
		else if (value.indexOf("G",0)!=-1){keypress=8+comp;formulastring=formulastring+keypress+",";}
		else if (value.indexOf("A",0)!=-1){keypress=10+comp;formulastring=formulastring+keypress+",";}
		else if (value.indexOf("B",0)!=-1){keypress=12+comp;formulastring=formulastring+keypress+",";}
		comp=0
	}
}
function getValue(inputvar) {
		if (inputvar.indexOf(",", 0) != -1) {
				value=inputvar.substring(0, inputvar.indexOf(",", 0));
				valueb=inputvar.substring((inputvar.indexOf(",", 0)+1), inputvar.length);
				changeValue(value);
				getValue(valueb);
		}
}
function ConvertInput() {formulastring=""; userinput=document.keyform.forminput.value; //format input
		if (userinput.indexOf(",", 0) != -1) {
			if (userinput.charAt(userinput.length - 1) != ",") {userinput=userinput+",";}
			getValue(userinput);
		}else {error();}
		chordcode=formulastring+",";
		dispch(chordcode);
}
///
function openhelp(){remote=window.open("help.html","remotewin","top=200,width=600,height=400,titlebar=no,menubar=no");}

/// SIMULATE CLICKS & CREATE SYNTH AUDIO PLAY
var synthVolume=0.6, container=[];
function playchordFrml(chordFrml){// SIMULATES KEYclick CAN PLAY all division scale.
	if(!chordFrml)chordFrml=document.keyform.formdisp.value; ///////// good outcomes
	if(chordFrml){
		var arrNotes=chordFrml.split(',');//chord formula into array	//arrNotes[i]=arrNotes[i].replace('.',','); 
		simMOUSEdown(arrNotes);
		evnt.innerHTML='Chord(<b>'+rootId+'</b>) =><b>'+chordFrml+'</b>';
	}
}
function simMOUSEdown(arrNotes){///  each chord elmnts.note
	if(arrNotes){
		for(i=0;i<arrNotes.length;i++){//play note..both AudioSynthjs and WebAudiojs
			var soundplus=get('sound').value;
			if(soundplus>=0){// PLAY NOTE..triggering load AUDIOSYNTHJS
				var arrAudioNote=arrNotes[i].split('.');//define each [note/chordOctave]
				var __audioSynth=new AudioSynth();__audioSynth.setVolume(synthVolume);
				src=__audioSynth.generate(soundplus, arrAudioNote[0],arrAudioNote[1], 2);
					container[i]=new Audio(src);
					container[i].addEventListener('ended', function(){container[i]=null; });
					container[i].addEventListener('loadeddata', function(e){e.target.play(); });
					container[i].autoplay=false;
					container[i].setAttribute('type', 'audio/wav');
				if(document.keyform.cordscal[1].checked==1){ /// solo scale sucks
						setTimeout(function(){container[i].load();},i*1000,container[i]);
				}else container[i].load();
				console.log('chord:',arrAudioNote,'i'+i,arrNotes[i]);
			}
			//PLAY NOTE..WEBAUDIOJS BY DEFINING mouse down DIV EVENT.
			console.log('=>visualKeyboard:',visualKeyboard[arrNotes[i]].id);mouseIsOver=true;
			visualKeyboard[arrNotes[i]].dispatchEvent(new Event('mousedown')); mouseIsOver=false;mouseIsDown=false;
		}
	}
}
///  RITHM EDITOR                                                                             
function addText(el,txt){
	el.value='';
	if(txt=='clean'){return;}
		//txt=el.value+txt; 
		//let rows=txt.split("\n");
		////if(rows.length>el.rows)rows.shift();
		//el.value=rows.join("\n");
	for(var i=1;i<chordArr.length;i++){
		console.log('chordArr',chordArr[i],chordArr[i][1]);
		el.value+=chordArr[i][1]+"\n"; // refresh by update
	}
	el.scrollTop=el.scrollHeight;
}
/// var d;
function playMyrithm() { /// fking MOUSE EVENT - PLAYS SOLO
	console.log('playMyrithm chordArr;',chordArr);
	if(chordArr.length>=1)
		for(j=1;j<chordArr.length;j++){
			d=chordArr[j][1];// chord notes
			setTimeout(	function(d){simMOUSEdown(d);}, (j-1)*2000,d); // for each chord
			///console.log('d',d,'chordArr[j][1]',chordArr[j][1]);
		}
}	
function playMyrithmSolo() { //notused!
	var newsong=[,];
	if(chordArr.length>=1)
		for(j=1;j<chordArr.length;j++){
			newsong[j-1]=[chordArr[j][2], 1];// chord midinumbers
		}
	console.log('newsong',newsong);
	SONG_RTHMSOLO(newsong);
}
function playMyrithmChord() {/// create new song array
	var newsong=[,];
	if(theoryAC){// from mini ackb
		var arrNotes=dispstring.split(',');
		var _keynoArr=[];
		for(var kk in arrNotes){_keynoArr[kk]=visualKeyboard[arrNotes[kk]].title;}/// important
		console.log('fuckingAcc playMyrithmChord: arrNotes',arrNotes,'to _keynoArr',_keynoArr);
		SONG_RTHMCHORD([[_keynoArr]],1);
	}
	else 
	if(chordArr.length>=1){
		for(j=1;j<chordArr.length;j++){newsong[j-1]=[chordArr[j][2], 1];/*chord midinumbers*/};
		console.log('playMyrithmChord newsong recorded',newsong);
		SONG_RTHMCHORD(newsong);
	}
}		
