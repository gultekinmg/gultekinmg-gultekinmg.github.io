	//
	var midiNotes = [];
	function requestMIDIAccessFailure(e){console.log('requestMIDIAccessFailure', e);}
	function logKeys(){var s='Keys';for (var i=0;i<midiNotes.length;i++){s=s+' '+midiNotes[i].pitch;}
		evnt.innerHTML=s;
	}
	function midNoteOn(pitch,velocity){	midiNoteOff(pitch);
		//var envelope=player.queueWaveTable(audioContext,audioContext.destination,tone,0,pitch,123456789,velocity/100);
		var note={pitch:pitch,envelope:envelope};
		midiNotes.push(note);
	}
	function midiNoteOff(pitch){
		for(var i=0;i<midiNotes.length;i++){
			if(midiNotes[i].pitch==pitch){
				if(midiNotes[i].envelope){midiNotes[i].envelope.cancel();}
				midiNotes.splice(i,1);
				return;
			}
		}
	}
	function midiOnStateChange(event){console.log('midiOnStateChange',event);
		msg.innerHTML=event.port.manufacturer+' '+event.port.name+' '+event.port.state;
	}
	function midiOnMIDImessage(event) {
		var data = event.data;
		var cmd = data[0] >> 4;
		var channel = data[0] & 0xf;
		var type = data[0] & 0xf0;
		var pitch = data[1];
		var velocity = data[2];
		switch (type) {
			case 144:	midNoteOn(pitch, velocity);	logKeys();break;
			case 128:	midiNoteOff(pitch);	logKeys();break;
		}
	}
	function requestMIDIAccessSuccess(midi) {var inputs = midi.inputs.values();
		for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
			console.log('midi input', input);
			input.value.onmidimessage = midiOnMIDImessage;
		}
		midi.onstatechange = midiOnStateChange;
	}
	function CHECKMIDIDEVICE(){
		if (navigator.requestMIDIAccess){console.log('navigator.requestMIDIAccess ok '+navigator.requestMIDIAccess);
			navigator.requestMIDIAccess().then(requestMIDIAccessSuccess, requestMIDIAccessFailure);
		} else{console.log('navigator.requestMIDIAccess undefined');msg.innerHTML = 'navigator.requestMIDIAccess undefined';}
	}