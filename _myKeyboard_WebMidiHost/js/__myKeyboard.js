/// KEYBOARD
	let visualKeyboard=get('divKEYBOARD'),
			sound_meter=get('v_mtr'),MusicTheory={},
			mouseIsDown=mouseIsOver=false,
			notes=notes1={
				'C':261.63,'C#':277.18,
				'D':293.66,'Eb':311.13,	'E':329.63,
				'F':349.23,'F#':369.99,
				'G':392.00,'Ab':415.30,	'A':440.00,'Bb':466.16,	'B':493.88},
			notes2={
				'C':256.9,'C#':272.1,
				'D':288.3,'Eb':305.5,		'E':323.6,
				'F':342.9,'F#':363.3,
				'G':384.9,'Ab':407.8,		'A':432,'Bb':457.7,'B':484.9};
			CHORD={ //guitar chords				
			'A': [40,45,52,57,61,64],			'A7': [40,45,52,57], 'Am':[52,57,64,69,72,76], 'Am7':[72,76],
			'B': [41,46,53,58,62,65],
			'C': [52,55,60,64,67,72,76],
			'D': [50,57,62,66],						'Dm':[50,57,62,65],
			'E': [52,59,64,68,71,76],			'Em':[40,47,52,59],
			'F': [41,48,53,57,60,65],
			'G': [55,59,62,67,71,79]
			}, ///console.log(chord.Am);'Am':[40, 45,'52','57',60,'64','69','72','76'],'C': [40, 48, '52',55, '60','64','67','72','76'],'G': [43, 47, 50,'55','59','62','67','71','79']
			song0=[
			[CHORD.Am,1],
			[['52','57','64','69','72','76'],.5],
			[['64','69'],.27],
			[['76'],.03],
			[['76'],.03],
			[['76'],.03],
			[['52','59','64','68','71','76'],1],
			[CHORD.C,1],
			[CHORD.E,2],
			[CHORD.G,1],,
			[CHORD.Am,2],
			[CHORD.Dm,1],
			[CHORD.Dm,1],
			[['64','69'],.3],
			[CHORD.E,2],
			[CHORD.G,1],
			[CHORD.Am,2]];

MusicTheory.Chords = {
	Major: [0, 4, 7],  Majb5: [0, 4, 6],  minor: [0, 3, 7],  minb5: [0, 3, 6],  sus2: [0, 2, 7],  sus4: [0, 5, 7],
	aug: [0, 4, 8],  augsus4: [0, 5, 8],  tri: [0, 3, 6, 9],
	"6th": null,  "6 ": [0, 4, 7, 9],  "6sus4": [0, 5, 7, 9],  "6add9": [0, 4, 7, 9, 14],  m6: [0, 3, 7, 9],  m6add9: [0, 3, 7, 9, 14],
	"7th": null,  "7 ": [0, 4, 7, 10],  "7sus4": [0, 5, 7, 10],  "7#5": [0, 4, 8, 10],  "7b5": [0, 4, 6, 10],  "7#9": [0, 4, 7, 10, 15],  "7b9": [0, 4, 7, 10, 13],
	"7#5#9": [0, 4, 8, 12, 14, 19],  "7#5b9": [0, 4, 8, 12, 14, 17],  "7b5b9": [0, 4, 6, 10, 12, 15],  "7add11": [0, 4, 7, 10, 17],  "7add13": [0, 4, 7, 10, 21],
	"7#11": [0, 4, 7, 10, 18],
	Maj7: [0, 4, 7, 11],  Maj7b5: [0, 4, 6, 11],  "Maj7#5": [0, 4, 8, 11],  "Maj7#11": [0, 4, 7, 11, 18],  Maj7add13: [0, 4, 7, 11, 21],
	m7: [0, 3, 7, 10],  m7b5: [0, 3, 6, 10],  m7b9: [0, 3, 7, 10, 13],  m7add11: [0, 3, 7, 10, 17],  m7add13: [0, 3, 7, 10, 21],
	"m-Maj7": [0, 3, 7, 11],  "m-Maj7add11": [0, 3, 7, 11, 17],  "m-Maj7add13": [0, 3, 7, 11, 21],
	"9th": null,  "9 ": [0, 4, 7, 10, 14],  "9sus4": [0, 5, 7, 10, 14],  add9: [0, 4, 7, 14],
	"9#5": [0, 4, 8, 10, 14],  "9b5": [0, 4, 6, 10, 14],  "9#11": [0, 4, 7, 10, 14, 18],  "9b13": [0, 4, 7, 10, 14, 20],
	Maj9: [0, 4, 7, 11, 14],  Maj9sus4: [0, 5, 7, 11, 15],  "Maj9#5": [0, 4, 8, 11, 14],
	"Maj9#11": [0,   4, 7, 11, 14, 18],
	m9: [0, 3, 7, 10, 14],  madd9: [0, 3, 7, 14],  m9b5: [0, 3, 6, 10, 14],
	"m9-Maj7": [0, 3, 7, 11, 14],  "11th": null,  "11 ": [0, 4, 7, 10, 14, 17],  "11b9": [0, 4, 7, 10, 13, 17],
	Maj11: [0, 4, 7, 11, 14, 17],  m11: [0, 3, 7, 10, 14, 17],  "m-Maj11": [0, 3, 7, 11, 14, 17],
	"13th": null,  "13 ": [0, 4, 7, 10, 14, 21],  "13#9": [0, 4, 7, 10, 15, 21],  "13b9": [0, 4, 7, 10, 13, 21],  "13b5b9": [0, 4, 6, 10, 13, 21],  Maj13: [0, 4, 7, 11, 14, 21],  m13: [0, 3, 7, 10, 14, 21],  "m-Maj13": [0, 3, 7, 11, 14, 21]
};
MusicTheory.Scales = {
 Aeolian: [0, 2, 3, 5, 7, 8, 10],
 Altered: [0, 1, 3, 4, 6, 8, 10],
 "Altered b7": [0, 1, 3, 4, 6, 8, 9],
 Arabian: [0, 2, 4, 5, 6, 8, 10],
 Augmented: [0, 3, 4, 7, 8, 11],
 Balinese: [0, 1, 3, 7, 8],
 Blues: [0, 3, 5, 6, 7, 10],
 Byzantine: [0, 1, 4, 5, 7, 8, 11],
 Chinese: [0, 4, 6, 7, 11],
 "Chinese Mongolian": [0, 2, 4, 7, 9],
 Chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
 "Diminished (H-W)": [0, 1, 3, 4, 6, 7, 9, 10],
 "Diminished (W-H)": [0, 2, 3, 5, 6, 8, 9, 11],
 Dorian: [0, 2, 3, 5, 7, 9, 10],
 "Dorian b2": [0, 1, 3, 5, 7, 9, 10],
 "Dorian #4": [0, 2, 3, 6, 7, 9, 10],
 "Double Harmonic": [0, 1, 4, 5, 7, 8, 11],
 Enigmatic: [0, 1, 4, 6, 8, 10, 11],
 Egyptian: [0, 2, 5, 7, 10],
 "Eight Tone Spanish": [0, 1, 4, 5, 6, 8, 10],
 "Harmonic Minor": [0, 2, 3, 5, 7, 8, 11],
 Hindu: [0, 2, 4, 5, 7, 8, 10],
 "Hirajoshi (Japanese)": [0, 2, 3, 7, 8],
 "Hungarian Major": [0, 3, 4, 6, 7, 9, 10],
 "Hungarian Minor": [0, 2, 3, 6, 7, 8, 11],
 Ichikosucho: [0, 2, 4, 5, 6, 7, 9, 11],
 Ionian: [0, 2, 4, 5, 7, 9, 11],
 "Ionian Aug": [0, 2, 4, 5, 8, 9, 11],
 "Iwato (Japanese)": [0, 1, 5, 6, 10],
 Kumoi: [0, 2, 3, 7, 9],
 "Leading Whole Tone": [0, 2, 4, 6, 8, 10, 11],
 Locrian: [0, 1, 3, 5, 6, 8, 10],
 "Locrian 2": [0, 2, 3, 5, 6, 8, 10],
 "Locrian 6": [0, 1, 3, 5, 6,9, 10],
 Lydian: [0, 2, 4, 6, 7, 9, 11],
 "Lydian Aug": [0, 2, 4, 6, 8, 9, 11],
 "Lydian b7": [0, 2, 4, 6, 7, 9, 10],
 "Lydian #9": [0, 3, 4, 6, 7, 9, 11],
 "Lydian Diminished": [0, 2, 3, 6, 7, 9, 11],
 "Lydian Minor": [0, 2, 4, 6, 7, 8, 10],
 "Marva (Indian)": [0, 1, 4, 6, 7, 9, 11],
 "Melodic Minor": [0, 2, 3, 5, 7, 9, 11],
 Mixolydian: [0, 2, 4, 5, 7, 9, 10],
 "Mixolydian b6": [0, 2, 4, 5, 7, 8, 10],
 Mohammedan: [0, 2, 3, 5, 7, 8, 11],
 "Neopolitan Major": [0, 1, 3, 5, 7, 9, 11],
 "Neopolitan Minor": [0, 1, 3, 5, 7, 8, 10],
 Oriental: [0, 1, 4, 5, 6, 9, 10],
 Overtone: [0, 2, 4, 6, 7, 9, 10],
 "Pelog (Balinese)": [0, 1, 3, 7, 10],
 "Pentatonic Major": [0,2, 4, 7, 9],
 "Pentatonic Minor": [0, 3, 5, 7, 10],
 Persian: [0, 1, 4, 5, 6, 8, 11],
 Phrygian: [0, 1, 3, 5, 7, 8, 10],
 Prometheus: [0, 2, 4, 6, 9, 10],
 "Prometheus Neopolitan": [0, 1, 4, 6, 9, 10],
 "Purvi Theta": [0, 1, 4, 6, 7, 8, 11],
 Romanian: [0, 2, 3, 6, 7, 9, 10],
 "Six Tone Symmetrical": [0, 1, 4, 5, 8, 9],
 "Todi (Indian)": [0, 1, 3, 6, 7, 8, 11],
 "Whole Tone": [0, 2, 4, 6, 8, 10]
};
	
	///  Generate KEYBOARD BY URL...
	function getUrlVars(){ var urlvars = {};/// get parameters ins=0&size=3
		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){urlvars[key] = value;});
		return urlvars;
	}
	var instrumentIndex=getUrlVars()["ins"], key_amount=getUrlVars()["size"];
	if(instrumentIndex){
		var t=get("instruments");
		t.selectedIndex = instrumentIndex; //preselect from parent if none 0 on index
		var instrument=t.options[t.selectedIndex].text, //our instrument
				ss=get("size");
		if(key_amount)ss.selectedIndex = key_amount;//on index
	}
	///                                             
	let accsub=qccsub='',visualCHRD=get('divQCHORDSboard'),visualACC=get('divACCOMPANYboard');
	var iKeys=iWhite=k=0,	myKeyboard=[,], // array of key divisions defined by notes
			theoryQC=theoryAC=false,lightingColor='#ff4545',lightingFix=true;
	/// SOLO MINI-KB
	for(var i=0;i<1;i++){
		for(var n in notes) {var thisKey=document.createElement('DIV');///12notes
			k++;
			if(n.length>1){thisKey.className='black key';thisKey.style.marginLeft = "-10px";}				
			else{thisKey.className='white key'; if(n=='F'||n=='C')thisKey.style.marginLeft="1px"; else thisKey.style.marginLeft="-9px";}
			var label=document.createElement('DIV'); label.className='labelDiv';
			label.innerHTML='<br>'+n.substr(0,1)+(n.substr(1,1)?n.substr(1,1):'');
				thisKey.appendChild(label);
				thisKey.setAttribute('ID', n);
				thisKey.setAttribute('onmousedown', 'quickChordPlay(this.id,'+k+');');
				visualCHRD.appendChild(thisKey);
		}k=0;
	}
	function quickChordPlay(c,t){
			if(theoryQC){
					chordOctave=Number(get('qcoctave').value); //console.log(chordOctave);
					document.keyform.CHORDMODAL.options.selectedIndex=Number(get('qcmodal').value);
					document.keyform.rootSelector.options.selectedIndex=t;
					go(++rthmNDX);
					if(fullRange)fnFullRange();else fnInverter(invertStyle);
					playchordFrml();}//use teo cords
			else {c=c+qccsub;	if(CHORD[c]){rthmSolo([CHORD[c]],0); console.log('quickChordPlay',c,[CHORD[c]]);} }
	}
	/// ACC MINI KB
	for(var i=0;i<1;i++){
		for(var n in notes) {var thisKey=document.createElement('DIV');///12notes
			k++;
			if(n.length>1){thisKey.className='black key';thisKey.style.marginLeft = "-10px";}
			else{thisKey.className='white key'; if(n=='F'||n=='C')thisKey.style.marginLeft="1px"; else thisKey.style.marginLeft="-9px";}
			var label=document.createElement('DIV'); label.className='labelDiv';
			label.innerHTML='<br>'+n.substr(0,1)+(n.substr(1,1)?n.substr(1,1):'');
				thisKey.appendChild(label);
				thisKey.setAttribute('ID', n);
				thisKey.setAttribute('onmousedown', 'fuckingAcc(this.id,'+k+');');
				visualACC.appendChild(thisKey);
		}k=0;
	}
	function fuckingAcc(c,t){
			if(theoryAC){
					chordOctave=Number(get('acoctave').value); //console.log(chordOctave);
					document.keyform.CHORDMODAL.options.selectedIndex=Number(get('acmodal').value);
					document.keyform.rootSelector.options.selectedIndex=t;
					go(++rthmNDX);
					if(fullRange)fnFullRange();else fnInverter(invertStyle);
					playMyrithmChord();}//use teo cords
			else {c=c+accsub; if(CHORD[c]){rthmChord(CHORD[c]); console.log(c,CHORD[c]);} }
	}
	/// VISUALKEYBOARD
	for(var i=0;i<=8;i++){///  octaves 9*12=108
		for(var n in notes) {var thisKey=document.createElement('DIV');///12notes
			//var lamb="background-color:yellow;margin: 4 4 0 4;border:solid 0.1px #8080801a;border-radius:22px;opacity:1;";
			if(n.length>1){//adding sharp sign makes 2 characters
						thisKey.className='black key'; //lamb="margin:3 3 0 3;border:solid 0.1px #8080801a;border-radius:22px;opacity:1;";						
						//thisKey.style.marginLeft = "-10px";	/*  thisKey.style.left=(24*(iWhite-1))+15+'px'; */ //2 classes
			}
			else{
				thisKey.className='white key';
				if(n=='F'||n=='C')thisKey.style.marginLeft="0px";/* thisKey.style.left=(24*iWhite)+'px'; */
				iWhite++;
			}
			var oSign=''; if(n=='C')oSign='<font style="COLOR:red;OPACITY:.6;POSITION:absolute;TOP:-48;LEFT:0;">'+parseInt(i)+'</font>';
			var mdNo=k+12*i;
			var label=document.createElement('DIV'); label.className='labelDiv'; 
					label.innerHTML='<span>'+mdNo+'</span><p style="opacity: 0.4;">'+n.substr(0,1)+(n.substr(1,1)?n.substr(1,1):'')+'</p>'+oSign+'<b class="keyLabel"></b>';
						thisKey.appendChild(label);
						thisKey.setAttribute('ID', n+'.'+i);
						thisKey.setAttribute('TITLE',mdNo); // important
						thisKey.setAttribute('onmouseover', "fnMouseover("+(k+12*i)+")");	
						thisKey.setAttribute('onmousedown', "fnMousedown("+(k+12*i)+")");		//thisKey.onclick = function(){FINGERSTYLEAUDIO(k+12*i)};
						thisKey.setAttribute('onmouseout', 	"fnMouseout()");
						thisKey.setAttribute('onmouseup', 	"fnMouseup()");
				myKeyboard[k+12*i]=[n+'.'+i,thisKey]; /// 48: ["C,4", dıv#C,4.white.key] midino: note,tag...
				visualKeyboard[n+'.'+i]=thisKey; // for calling div by notename need index..
				visualKeyboard.appendChild(thisKey);
			iKeys++; k++;
		}
		k=0;
	}
wtf(jo(),{'myKeyboard!!':myKeyboard});
wtf(jo(),{'visualKeyboard!!':visualKeyboard});
	//visualKeyboard.style.width=iWhite*20+'px';
	///	zooom-size
	function fnZOOMSLIDER(z){var zmy=get("zoomSlider");
		zmy.max=z;
		zmy.value=z;
		visualKeyboard.style.zoom=z+'%';
	}
	var lower,upper, bindSTART=36;
	function setSize(n) {exta.checked = false;
		if(n==1){lower=0;upper=108; bindSTART=48; fnZOOMSLIDER(96.2);}
		if(n==2){lower=12;upper=96; bindSTART=48; fnZOOMSLIDER(119.5);}
		if(n==3){lower=24;upper=96; bindSTART=48; fnZOOMSLIDER(138);} 
		if(n==4){lower=24;upper=84; bindSTART=48; fnZOOMSLIDER(163);}
		if(n==5){lower=36;upper=72; bindSTART=36; fnZOOMSLIDER(258);} 
		if(n==6){lower=36;upper=60; bindSTART=36; fnZOOMSLIDER(364);} 
		if(n==7){lower=36;upper=48; bindSTART=36; fnZOOMSLIDER(606);} 
		sizingKeys();
	}
	function slide(n) {
		if(n<0 && lower-n<=0)return;
		if(n>0 && upper+n>108)return;
		lower+=n;upper+=n;
		sizingKeys();
	}
	function sizingKeys() {
		for(var i=0;i<108;i++){ if(i>=lower&&i<upper) myKeyboard[i][1].style.display=''; else myKeyboard[i][1].style.display='none';}	
	}
	setSize(1); //fill all
	
	///    BINDINGS                                                                                           
	var LetterBindings={	// Key label bindings, notes to keyCodes. 2 octave fingering
		1 :  ['q',  81], // keyboard assigned
		2 :  ['1',  49],
		3 :  ['w',  87],
		4 :  ['2',  50],
		5 :  ['e',  69],
		6 :  ['r',  82],
		7 :  ['4',  52],
		8 :  ['t',  84],
		9 :  ['5',  53],
		10:  ['y',  89],
		11:  ['6',  54],
		12:  ['u',  85],
		13:  ['z',  90],
		14:  ['s',  83],
		15:  ['x',  88],
		16:  ['d',  68],
		17:  ['c',  67],
		18:  ['v',  86],
		19:  ['g', 188],
		20:  ['b',  66],
		21:  ['h',  72],
		22:  ['n',  78],
		23:  ['j',  74],
		24:  ['m',  77],
	};
	var keyCodebindings={
		32:  ['space','.'],
		37:  ['left', '.'],
		38:  ['up', 	'.'],
		39:  ['right','.'],
		40:  ['down',	'.'],
		49:  ['1', 'C#'],
		50:  ['2', 'D#'],
		52:  ['4', 'F#'],
		53:  ['5', 'G#'],
		54:  ['6', 'A#'],
		66:  ['b', 'G'],
		67:  ['c', 'E'],
		68:  ['d', 'D#'],
		69:  ['e', 'E'],
		72:  ['h', 'G#'],
		74:  ['j', 'A#'],
		77:  ['m', 'B'],
		78:  ['n', 'A'],
		81:  ['q', 'C'],
		82:  ['r', 'F'],
		83:  ['s', 'C#'],
		84:  ['t', 'G'],
		85:  ['u', 'B'],
		86:  ['v', 'F'],
		87:  ['w', 'D'],
		88:  ['x', 'D'],
		89:  ['y', 'A'],
		90:  ['z', 'C'],
	 188:  ['g', 'F#'],
	};
wtf(jo(),{'LetterBindings':LetterBindings,'keyCodebindings':keyCodebindings}); ///       3     ignore     
	var lettON=false, labelArr=document.getElementsByClassName("keyLabel");
	function keyLETTERS(lbd){// place&toggle keyLETTERS
		if(lbd){
			bindSTART+=lbd;
			if(bindSTART>upper-24)bindSTART=upper-24;
			if(bindSTART<=lower){bindSTART=lower;}
			wtf(jo(),{'bindSTART':bindSTART,'lower':lower,'lbd':lbd,'upper':upper});
		}
		var keyindex=0;
		for(var i=0;i<108;i++){
			labelArr[i].innerHTML=''; labelArr[i].style.display='none';/// CLOSE LETTERS 108keys
			if(lettON){
				if(i>=bindSTART && i<bindSTART+24){ keyindex++;
					keyCodebindings[LetterBindings[keyindex][1]][2]=keyindex-1+bindSTART; //keycode note
					labelArr[i].innerHTML=LetterBindings[keyindex][0];			//labelArr[i].id=LetterBindings[keyindex][1];///       ignore     id             
					labelArr[i].style.display='block';	wtf(jo(),{'larr':[i, labelArr[i]]});///         3        
				}
			}
		}
		FINGERSTYLEAUDIO(bindSTART,0.03,999);/// TO BLINK
		wtf(jo(),{'keyCodebindingspushed':keyCodebindings}); ///       3     ignore     
	}
	/// KEYBOARD-keys EVENTS
	var keysPressed=[];	// Keys you have pressed down.
	var deTOUCH=	function(e){keysPressed=[];}//remove keypresses
	var keyTOUCH=	function(e){	 // Detect keypresses, play notes.
		var i=keysPressed.length;
		while(i--){if(keysPressed[i]==e.keyCode) {		wtf(jo(),'fu');return false;}}
		keysPressed.push(e.keyCode);/// record krypresses...
		switch(e.keyCode) {
			case 37:keyLETTERS(-24); return;break;/// left
			case 39:keyLETTERS(24); return;break;/// right
			case 38:get('tremoloInput').value++;myPressStyle++;if(myPressStyle>4)myPressStyle=4; return;break;/// up
			case 40:get('tremoloInput').value--;myPressStyle--;if(myPressStyle<1)myPressStyle=1; return;break;/// dn
			case 32:song_rthm(RECORD); return;break;// space play this song once cus its a variable; 
		}
		// check relative key
		if(!keyCodebindings[e.keyCode])return;
		var pitch=keyCodebindings[e.keyCode][2]; wtf(jo(),{'pitch':pitch,'e.key':e.key});
		PLAYandRECORD_KEY(pitch);
	}
	document.addEventListener('keydown', keyTOUCH);// needed for song	&
	document.addEventListener('keyup', deTOUCH);
	/// then resize wtf u want..
	setSize(4);
	
	/// no right clicks...
	tremoloInput.addEventListener('contextmenu', function (e){e.preventDefault();}, false);
	pedalInput.addEventListener('contextmenu', function (e){e.preventDefault();}, false);
	ahsdrinput.addEventListener('contextmenu', function (e){e.preventDefault();}, false);
	
// PLAY                                                                                                                                                                                                                                                                                          //

/// global vars...
	var myPressStyle=1, pedalFade=0,_NoteOnKeyPressure=_PlayBack=false;
	var RECORD=[[],[],[],[],[],[],[],[]],recordNO=0,loop=[false,false,false,false,false,false,false,false];
	var looptimer=recPlayTimer=[];
	//
/// rithms
	function SONG_RTHMCHORD(s){var dly=0; for(var i in s){ rthmChord(s[i][0], dly); dly=dly+Number(s[i][1]); wtf(jo(),['song',s[i],dly]);} }
	function rthmChord(chord,delay,duration){ setTimeout(function(){CHORDSSTYLEAUDIO(chord);}, delay*1000);wtf(jo(),{'chord':chord});} //same
	// those can accompany different presets
	function SONG_RTHMSOLO(s){var dly=0; for(var i in s){ rthmSolo([s[i][0]], dly); dly=dly+Number(s[i][1]); wtf(jo(),['song',s[i],dly]);} }
	function rthmSolo(chord,delay){ for(var x in chord){setTimeout(function(){plyNote(chord[x]);}, delay*1000);wtf(jo(),chord[x]);}}
	function plyNote(pitch){ wtf(jo(),pitch); for(var x in pitch){ PLAYandRECORD_KEY(pitch[x],'quick'); wtf(jo(),pitch[x]);}}//plays whole chord.
/// record play stop
	function COUNTDOWN(n){ var bipPreset=INSTRUMENTvarname[0];
		get('msg').innerHTML='RECORDING.'; get('evnt').innerHTML='countdown...';
		for(var i=1;i<=n;i++){PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, bipPreset, AC.currentTime + i, 97, 2);}
		setTimeout(function(){get('evnt').innerHTML='countdown...3'},1000);
		setTimeout(function(){get('evnt').innerHTML='countdown...2'},2000);
		setTimeout(function(){get('evnt').innerHTML='countdown...1'},3000);
		setTimeout(function(){get('evnt').innerHTML='start!!...';startTime=Date.now();Lap=endTime=timeElapsed=0;},n*1000);
	}
	function PLAYandRECORD_KEY(pitch,quick){ // PLAYS KEY & RECORDS IT TO ARRAY
		if(pitch){
			if(get('recordsong').checked){/// if record.
				var clock=getTimeElapsed();//if(RECORD.length==0)clock[0]=clock[1]=Lap=0;
				RECORD[recordNO].push([pitch,clock[0],clock[1]]);
				wtf(jo(),{'RECORD':RECORD[recordNO],'keysPressed':keysPressed});
			}
			//if(pitch.length>1)CHORDSSTYLEAUDIO(pitch); else 
			if(quick)FINGERSTYLEAUDIO(pitch,null,null,quick); else FINGERSTYLEAUDIO(pitch);
		} else return false;
	}
	function playRECORD(c,recno){ // plays single note or multiple key or chord.
		var last=c.slice(-1)[0]; //check record duration. 
		var	loopdelay=(last[2]+last[1])*1000; //extra blanktime
		function play(){ wtf(jo(),{'play RECORD':c});	
			for(var x in c){
				if(Array.isArray(c[x][0])){//check chord or not.
						 setTimeout(function(x){CHORDSSTYLEAUDIO( c[x][0],c[x][1])}, c[x][2]*1000,x);}// chord style play for strumps
				else{setTimeout(function(x){FINGERSTYLEAUDIO( c[x][0],c[x][1])}, c[x][2]*1000,x);}// finger sense style for tense timing
				wtf(jo(),{'pitch/s':c[x][0],'duration':c[x][1],'delay':c[x][2]});
			}
		}
		play();//works wo parameter also.
		if(loop[recno]){ looptimer[recno]=setInterval(play,loopdelay);
			wtf(jo(),{'record duration':loopdelay,'loopno':recno,'loop':loop[recno]} );
		}
	}
	function stopRecordPLAYER(recno){
		//if(PLAYER[recno])PLAYER[recno].cancelQueue(AC);
		clearInterval(looptimer[recno]); //clearTimeout(myVar);
		loop[recno]=false;
	}
	
/// initial 6 ChannelSets    in 6 PLAYERs                 
	var mainVolume=0.66,subVolume=0.6,RithmVolume=0.4,bpm=120,N=4*60/bpm,pieceLen=4*N,beatLen=1/16*N,InstVol=[];
	var ACF,AC,PLAYER=[],CHANNELMASTER, ChannelSet=Channel=reverberator=[];
	var chNO=0, instrument=[];
			instrument[chNO]=29; //org
			instrument[5]=10; 
			instrument[4]=20; 
			instrument[3]=31; //bass
			instrument[2]=32; //guitar
			instrument[1]=0; //piano		
	var selectedPreset=INSTRUMENTvarname[0];
	var	rithmPreset=ChannelSet[instrument[0]]=INSTRUMENTvarname[instrument[0]];
									ChannelSet[instrument[5]]=INSTRUMENTvarname[instrument[5]];
									ChannelSet[instrument[4]]=INSTRUMENTvarname[instrument[4]];
									ChannelSet[instrument[3]]=INSTRUMENTvarname[instrument[3]];
									ChannelSet[instrument[2]]=INSTRUMENTvarname[instrument[2]];
									ChannelSet[instrument[1]]=selectedPreset;
	///
	function init(n) { /// n PLAYERs for n channel instruments
		ACF = window.AudioContext || window.webkitAudioContext;
		AC=audioContext = new ACF();
			PLAYER[n]=new WebAudioFontPlayer();
			PLAYER[n].adjustPreset(AC,ChannelSet[n]); /*  one PLAYER can have multi-presets for each channel*/
		CHANNELMASTER = 	PLAYER[n].createChannel(AC);		
		//reverberator[n]=PLAYER[n].createReverberator(AC);
		//CHANNELMASTER.output.connect(reverberator[n].input);
		//reverberator[n].output.connect(AC.destination);
			InstVol[n]=AC.createGain();	InstVol[n].connect(AC.destination); InstVol[n].gain.value=1; //  instrument volumes
		console.log(n,'initialize ',colors[n],COLORNAMES[n],'zones',ChannelSet[n].zones,InstVol[n],AC);
			
		///Channel[n]= 			PLAYER[n].createChannel(AC); /// DISTINCT Channel FOR EACH INSTRUMENT
		///Channel[n].output.connect(CHANNELMASTER.input);	
		//get("divKEYBOARD").style.backgroundColor=COLORNAMES[n];
	}
	init(instrument[5]);init(instrument[4]);init(instrument[3]);init(instrument[2]);init(instrument[1]);init(instrument[chNO]);//0 INITIAL
	///
	function fnSETUPPRESETS(C){ chNO=C; var No=instrument[chNO];
		selectedPreset=ChannelSet[No];	if(!selectedPreset)init(No);/// IMPORTANT
		///get('divKEYBOARD').style.borderColor=COLORNAMES[No];
		get('instruments').style.backgroundColor=COLORNAMES[No];
		get('instruments').options.selectedIndex=No;
		if(!lightingFix)lightingColor=colors[No];
		if(C==0){get('racc').innerHTML='&nbsp&nbsp Chord Style Accompany:&nbsp&nbsp'
							+get('instruments').options[No].text;
							rithmPreset=ChannelSet[No];dsply_frm('RITHMDEMO','');}
		get("mainvolumeInput").value=InstVol[instrument[chNO]].gain.value*100;
	}							

///
/**   @PLAYER[instrument[chNO]].queueWaveTable(  Audiocontext, Target, Preset, When, Pitch, Duration, Volume, Slides )  */		
function CHORDSSTYLEAUDIO(Chord,duration,style) { var key, lng=1, model=myPressStyle;//chord to play same but extras
	model=1;	console.log(Chord);
	if(get('recordsong').checked){ // record acc also...
		var clock=getTimeElapsed();
		RECORD[recordNO].push([Chord,clock[0],clock[1]]);
	}
	if(style)model=style; ///                                                                                                                                               default 1
	if(model==1){
		PLAYER[instrument[chNO]].queueChord(AC, AC.destination, rithmPreset, AC.currentTime + 0, Chord, 1+pedalFade,RithmVolume);
	}
	if(model==2){lng=4;
		PLAYER[instrument[chNO]].queueStrumDown(AC, AC.destination, rithmPreset, AC.currentTime + 0, Chord, 0.9+pedalFade,RithmVolume-0.3,33);
		PLAYER[instrument[chNO]].queueStrumUp(AC, AC.destination, rithmPreset, AC.currentTime + 1, Chord, 4+pedalFade,RithmVolume,0.5);
	}
	if(model==3){lng=4;
		PLAYER[instrument[chNO]].queueChord(AC, AC.destination, rithmPreset, AC.currentTime + 0, Chord, 0.6+pedalFade,RithmVolume);
		PLAYER[instrument[chNO]].queueChord(AC, AC.destination, rithmPreset, AC.currentTime + 0.6, Chord, 0.2+pedalFade,RithmVolume);
		PLAYER[instrument[chNO]].queueChord(AC, AC.destination, rithmPreset, AC.currentTime + 0.8, Chord, 4+pedalFade,RithmVolume);
	}
	if(model==4){lng=4;
		PLAYER[instrument[chNO]].queueChord(AC, AC.destination, rithmPreset, AC.currentTime + 0, Chord, 0.4+pedalFade,RithmVolume);
		PLAYER[instrument[chNO]].queueChord(AC, AC.destination, rithmPreset, AC.currentTime + 0.4, Chord, 0.2+pedalFade,RithmVolume);
		PLAYER[instrument[chNO]].queueChord(AC, AC.destination, rithmPreset, AC.currentTime + 0.6, Chord, 0.2+pedalFade,RithmVolume);
		PLAYER[instrument[chNO]].queueChord(AC, AC.destination, rithmPreset, AC.currentTime + 0.8, Chord, 4+pedalFade,RithmVolume-0.4);
	}
	if(model==5){
		PLAYER[instrument[chNO]].queueChord(AC, AC.destination, rithmPreset, AC.currentTime + 0, Chord, 1+pedalFade,RithmVolume,0.9);
	}

	for(var x in Chord){sound_meter=RithmVolume*100; simKeyDown(myKeyboard[Chord[x]][1],lng);}
}	
function FINGERSTYLEAUDIO(pitch,duration,style,quick) { var key=myKeyboard[pitch][1], model=myPressStyle;//pitch to play
	//wtf(jo(),{'pedal':pedalFade});/// 3 
	if(quick)var vol=subVolume; else var vol=InstVol[instrument[chNO]].gain.value;//mainVolume;
	sound_meter.value=vol*100;
	if(style)model=style; /// default 1
	///
	if(model==1){	simKeyDown(key,1); // STD. PLAYING..
		if(_NoteOnKeyPressure){ /// key note on /// LONG PRESS
			_NoteOnEnvelope=PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, 0, pitch, 999+pedalFade,vol,true);	//console.log('pitch.envelop',_NoteOnEnvelope);
		}
		else if(_PlayBack){///ringing
			//PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0, pitch, 1+pedalFade);
			playback(_playbackratio, pitch,1+pedalFade); /// AHDSR..
			//PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0, pitch, 1+pedalFade, vol,[0.3,0.9,0.5,1,4]);			
		}
		else PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0, pitch, 1+pedalFade, vol); /// std might asdr
	}
	if(model==2){	simKeyDown(key,4); // 4 tempo no fadeshow
		PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0, 	pitch, 0.3+pedalFade, vol-0.3,5);
		PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0.4, pitch, 4+pedalFade, 	vol);
	}
	if(model==3){	simKeyDown(key,4);
		PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0, 	pitch, 0.6+pedalFade, vol);
		PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0.6, pitch, 0.2+pedalFade, vol);
		PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0.8, pitch, 4+pedalFade, 	vol);
	}
	if(model==4){	simKeyDown(key,4);
		PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0, 	pitch, 0.4+pedalFade, vol);
		PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0.4, pitch, 0.2+pedalFade, vol);
		PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0.6, pitch, 0.2+pedalFade, vol);
		PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, AC.currentTime + 0.8, pitch, 4+pedalFade, 	vol-0.4);
	}
	if(model==5){
		simKeyDown(key,1); ///wtf
		if(t=='chords')	PLAYER.queueChord			(AC, AC.destination, selectedPreset, 0, el, 1.5);
		if(t=='snap')		PLAYER.queueSnap			(AC, AC.destination, selectedPreset, 0, el, 3);
		if(t=='strumpD')PLAYER.queueStrumDown	(AC, AC.destination, selectedPreset, 0, el, 1.5);
		if(t=='StrumUp')PLAYER.queueStrumUp		(AC, AC.destination, selectedPreset, 0, el, 1.5);
		}
	if(model==999){simKeyDown(key,0.2,1);}; /// no soundjust TO BLINK keybinding// fkin 0  workybuggy
	}	

/// DISPLAY KEY STROKES
	function simKeyDown(thatKEY,dur,dly){ if(!dly)dly=dur*400; //dur-=pedalFade;box-shadow: 0px -5px 1px rgba(179, 170, 170, 0.2), #d5d6b79e 0px 0px 4px 0.4px inset;}
		thatKEY.style.backgroundColor=lightingColor+88;//light
		thatKEY.childNodes[0].childNodes[0].style.opacity=1;//span
		thatKEY.childNodes[0].childNodes[0].style.marginTop='-3px';
		thatKEY.childNodes[0].childNodes[1].style.boxShadow=''+lightingColor+66+' 0 0 9px 3px;';//console.log(thatKEY.childNodes[0].childNodes[1]);=><p>
		thatKEY.childNodes[0].childNodes[1].style.opacity=1;//p
		thatKEY.style.marginTop='5px';
		thatKEY.style.boxShadow='0px -3px 1px rgba(221, 230, 173, 0.8), #d5d6b79e 0px 0px 4px 1px inset';
		//thatKEY.childNodes[0].childNodes[1].style.boxShadow=''+lightingColor+66+' 0 0 3px 3px inset;'; ///sucks
		setTimeout(function(){simKeyUp1(thatKEY, dur-dur*.8); },dly);}//added to present mousedown
	function simKeyUp1(thatKEY,dur){
		thatKEY.style.backgroundColor=lightingColor+44;//palest
		thatKEY.style.marginTop='';
		thatKEY.style.boxShadow='';
		thatKEY.childNodes[0].childNodes[0].style.opacity=.5;//span
		thatKEY.childNodes[0].childNodes[0].style.marginTop='';
	sound_meter.value-=20;
		setTimeout(function(){simKeyUp2(thatKEY); },dur*1000);}
	function simKeyUp2(thatKEY){
		thatKEY.style.backgroundColor='';
		thatKEY.childNodes[0].childNodes[1].style.opacity=0.4;//p
		thatKEY.childNodes[0].childNodes[1].style.boxShadow='';
	sound_meter.value=0.1;
	}
/* 		
	function simKeyDown(thatKEY,dur,dly){ if(!dly)dly=dur*400; //dur-=pedalFade;box-shadow: 0px -5px 1px rgba(179, 170, 170, 0.2), #d5d6b79e 0px 0px 4px 0.4px inset;}
		thatKEY.style.opacity='0.8';thatKEY.style.marginTop='4px';
		thatKEY.style.boxShadow='0px -3px 1px rgba(221, 230, 173, 0.8), #d5d6b79e 0px 0px 4px 1px inset';
		setTimeout(function(){simKeyUp1(thatKEY, dur-dur*.8); },dly);}//added to present mousedown
	function simKeyUp1(thatKEY,dur){thatKEY.style.opacity='0.9';setTimeout(function(){simKeyUp2(thatKEY); },dur*1000);}
	function simKeyUp2(thatKEY){thatKEY.style.opacity='1';thatKEY.style.marginTop='';thatKEY.style.boxShadow='';} */
///

/// MANUPLATE SOUND    
	// sucks
  function LRUp(d){var vol=InstVol[instrument[chNO]]; vol.gain.value = 1.0;	vol.gain.linearRampToValueAtTime(1.0, AC.currentTime + d);}
  function LRDn(d){var vol=InstVol[instrument[chNO]]; vol.gain.value = 0.01;		vol.gain.linearRampToValueAtTime(0, AC.currentTime + d);}
  function fadeIN(d){var vol=InstVol[instrument[chNO]]; vol.gain.value = 1.0;	vol.gain.setTargetAtTime(1.0, AC.currentTime + d, 0.5);}
  function fadeOut(d){var vol=InstVol[instrument[chNO]]; vol.gain.value = 0.01;	vol.gain.setTargetAtTime(0, AC.currentTime + d, 0.5);}
	///panic
	function stopPLAYER(){PLAYER[instrument[chNO]].cancelQueue(AC);
		//killtime();
	}	//PLAYER[instrument[chNO]].cancelQueue(AC);
	///WahWah
	var _AHDSR=[];
	_AHDSR[0]=false;
	_AHDSR[1]=[
						{duration:0	 , volume:0.1},
						{duration:0.2, volume:0.9},
						{duration:0.3, volume:0.5},
						{duration:0.4, volume:0.9},
						{duration:0.2, volume:0.4},
						{duration:0.5, volume:0.01}
	]; // marginal sum..
	_AHDSR[2]=[
						{duration:0	, volume:0.01},
						{duration:0.2, volume:0.2},
						{duration:0.2, volume:0.95},
						{duration:0.2, volume:0.2},
						{duration:0.2, volume:0.8},
						{duration:0.2, volume:0.2},
						{duration:0.2, volume:0.6},
						{duration:0.2, volume:0.2},
						{duration:0.2, volume:0.9},
						{duration:0.4, volume:0.1},
						{duration:0.6, volume:0.01}
					];
	function CustomAHDSR(n){
		if(n==0)_AHDSR[0]=false; else{_AHDSR[0]=true;} console.log('CustomAHDSR',n,_AHDSR[n]);
		for(var i=0;i<selectedPreset.zones.length;i++){if(n==0)selectedPreset.zones[i].ahdsr=false; else selectedPreset.zones[i].ahdsr=_AHDSR[n];}
	}	

	///PLAYBACK
	var _initialRatio=_playbackratio=0, _NoteOnEnvelope=_PLAYBACKenvelope=null;
	function startCar(pitch,dure){
		//for(var i=0;i<selectedPreset.zones.length;i++){selectedPreset.zones[i].ahdsr=false;}
		_PLAYBACKenvelope=PLAYER[instrument[chNO]].queueWaveTable(AC, AC.destination, selectedPreset, 0, pitch, dure);
		_initialRatio=_PLAYBACKenvelope.audioBufferSourceNode.playbackRate.value-0.3;
	}
	function applyNewRatio(_newratio,d){var endy=d/100;
		_PLAYBACKenvelope.audioBufferSourceNode.playbackRate.cancelScheduledValues(AC.currentTime);
		_PLAYBACKenvelope.audioBufferSourceNode.playbackRate.setValueAtTime(_PLAYBACKenvelope.audioBufferSourceNode.playbackRate.value, AC.currentTime+0.001);
		_PLAYBACKenvelope.audioBufferSourceNode.playbackRate.linearRampToValueAtTime(_initialRatio*_newratio, AC.currentTime+endy);
	}
	function playback(_playbackratio,pitch,dure){
		if(_playbackratio>0){_PlayBack=true;}else _PlayBack=false;
		var p=pitch?pitch:48, d=dure?dure:1;
		console.log('_playbackratio',_playbackratio,p,d);
		startCar(p,d);
		if(_playbackratio<=5&&_playbackratio>=1)applyNewRatio(_playbackratio,d);
	}

///important
	/// SLIDING if mouseIsOver&mouseIsDown
	function fnMouseover(note){mouseIsOver=true; fnPOINTER_ACTION(note);}
	function fnMouseout(note) {mouseIsOver=false;fnPOINTER_ACTION(note);}
	function fnMousedown(note){mouseIsDown=true; fnPOINTER_ACTION(note);}
	function fnMouseup(note)  {mouseIsDown=false;fnPOINTER_ACTION(note);}
	function fnPOINTER_ACTION(note){
		if(note){
			if(mouseIsOver&&mouseIsDown){PLAYandRECORD_KEY(note);}
			//
			if(_NoteOnKeyPressure){
				if(mouseIsOver==false||mouseIsDown==false){
					if(_NoteOnEnvelope){
						//fadeOut(0.1);	//LRDn(0.1);
						setTimeout(function(){
							_NoteOnEnvelope.cancel(AC); _NoteOnEnvelope=null;
							///PLAYER[instrument[chNO]].cancelQueue(AC);
							//LRUp(0.01);//fadeIN(0.01); 
							///console.log('_NoteOnEnvelope',_NoteOnKeyPressure,_NoteOnEnvelope);
						},222);
						//for(var i=0;i<selectedPreset.zones.length;i++){selectedPreset.zones[i].ahdsr=false;};
					}
				}
			}
		}
	}  /* console.log('pitch',pitch); */
	
	
	