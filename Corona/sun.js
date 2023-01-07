var 	WX=window.innerWidth,WY=Math.max(600, window.innerHeight);
var 	body=document.body, RENDERER_container=document.getElementById("OrbitWrapper"); 
		body.classList.add("color");
var 	audio, ANALYSER, ANALYSER_L, ANALYSER_R, 
		freQuencyAvg=0, freQuency_R, freQuency_L
		,Three_canvas, SCENE, GROUP_SUN, WEBGL,  RENDERER, VIEWS, stats, BG_Mesh,BG_uniforms
		, CAM_POS, cX=0,cY=0,cZ=1000,FIELDOFVIEW=45, ASPECTRATIO=WX / WY /*16/9*/, _near=0.1, _far=10000
		, IMAX=400,		LASTTIME=ONCE=new Date() * 0.0001,	LASTFRAME=500, RADIUS=100, THETA= 0,_layerno=0 ;
var  monitor_stats='position:absolute; top:70px; right:160px; opacity:0.5; backgroundColor:#00011;';		
if ( WEBGL.isWebGLAvailable() === false ) {body.appendChild( WEBGL.getWebGLErrorMessage() );}
 //var file="./Shoulder_Closures.mp3"; ///*Copyright (c) 2017 - Misaki Nakano - https://codepen.io/mnmxmx/pen/mmZbPK/*/  Audio Visualizer2
 var samplefiles=["","Shoulder_Closures.mp3","Sample.m4a", "sample_etsitune.mp3"]; 
 
 var AudioSources = [], aux=0;
function stopAll() {  for(let i = 0; i < 8; i++) if (AudioSources[i])AudioSources[i].close(0); if(aux==3) aux=0;}
 
 
class Audio {
  constructor() { AudioSources[aux++]=this.ACTx=window.AudioContext ? new AudioContext() : new webkitAudioContext();
    this.source=null;   
    this.fileReader=new FileReader();
    this.init();
    this.isReady=false;
    this.count=0;
    this.process();
  }
  init() { // make a stereo Web Audio ACTx
		this.splitter=this.ACTx.createChannelSplitter();
		ANALYSER_L=this.ACTx.createAnalyser();	ANALYSER_L .fftSize=8192;
		ANALYSER_L.minDecibels=-70;  ANALYSER_L.maxDecibels=10;  ANALYSER_L.smoothingTimeConstant=.75;
		ANALYSER = ANALYSER_R = this.ACTx.createAnalyser(); ANALYSER_R.fftSize=2048;
		ANALYSER_R.minDecibels=-70;  ANALYSER_R.maxDecibels=10;  ANALYSER_R.smoothingTimeConstant=.75;
document.getElementById('uri').addEventListener('change', function (e) { this.fileReader.readAsArrayBuffer(e.target.files[0]);
console.log('song',e.target.files[0]); }.bind(this));
    var here=this;   
    this.fileReader.onload=function () {	
       here.ACTx.decodeAudioData(here.fileReader.result, function (buffer) {
        if (here.source) {here.source.stop();}
        here.source= here.ACTx.createBufferSource(); here.source.buffer=buffer; here.source.loop=true;
				//
        here.source.connect(here.splitter); here.splitter.connect(ANALYSER_L, 0, 0); here.splitter.connect(ANALYSER_R, 1, 0);
				//
        here.gainNode= here.ACTx.createGain();
        here.source.connect(here.gainNode); here.gainNode.connect( here.ACTx.destination);
				//
        here.source.start(0);
        here.frequencyArray=WEBGL.sphere_BG.attributes.aFrequency.array;
        here.indexPosArray=WEBGL.indexPosArray;
        here.indexPosLength=WEBGL.indexPosArray.length;
        here.isReady=true;///
				/// Make a buffer to receive the audio data
				freQuency_R=new Uint8Array(ANALYSER_R.frequencyBinCount); 
				freQuency_L=new Uint8Array(ANALYSER_L.frequencyBinCount);  
      });
				createBackGround.animate();
    };
fetch(samplefiles[aux]).then(r=>r.blob()).then(blob=>this.fileReader.readAsArrayBuffer(blob)); /// auto load ***************************************
//noneed this.fileReader.readAsArrayBuffer(file); 

	}
  Visualizer() {if (!this.isReady) return;//renders mesh
    this.count++;
   ANALYSER_R.getByteFrequencyData(freQuency_R); ANALYSER_L.getByteFrequencyData(freQuency_L);	/// receive the audio data to buffer
    var num,mult,maxNum=255;
		freQuencyAvg=0;
    for (var i=0; i < this.indexPosLength; i++) {mult=Math.floor(i / maxNum);
      if (mult % 2 === 0) {num=i - maxNum * mult;} else {num=maxNum - (i - maxNum * mult);}
      var spectrum=num > 150 ? 0 : freQuency_R[num + 20];
      freQuencyAvg += spectrum * 1.2;
      var indexPos=this.indexPosArray[i];
      spectrum=Math.max(0, spectrum - i / 80);
      for (var j=0, len=indexPos.length; j < len; j++) {var vectorNum=indexPos[j];this.frequencyArray[vectorNum]=spectrum;}
    }
    freQuencyAvg /= this.indexPosLength;
    freQuencyAvg *= 1.7;
		this.SunfreqRender() ;
  }
  SunfreqRender() { 
    WEBGL.sphere_SM_C.uniforms["uScale"].value =WEBGL.sphere_SM_R.uniforms["uScale"].value=WEBGL.sphere_SM_L.uniforms["uScale"].value=freQuencyAvg;
    WEBGL.sphere_SM_C.uniforms["uTime"].value += 0.015;
    WEBGL.mesh_C.scale.x=WEBGL.mesh_C.scale.y=WEBGL.mesh_C.scale.z=1 + freQuencyAvg / 290;
    WEBGL.mesh_R.scale.x=WEBGL.mesh_R.scale.y=WEBGL.mesh_R.scale.z=1 + freQuencyAvg / 290;
    WEBGL.mesh_L.scale.x=WEBGL.mesh_L.scale.y=WEBGL.mesh_L.scale.z=1 + freQuencyAvg / 290;
	}	
  process() { this.Visualizer(); 	WEBGL.animateCamera(); 	requestAnimationFrame(this.process.bind(this));}
}
class Webgl {
  constructor() {this.clock=new THREE.Clock();
    /// In order to see anything first we need a RENDERER to use with scene, and camera
    RENDERER=new THREE.WebGLRenderer({ antialias: true, alpha: true });
		RENDERER.setPixelRatio( window.devicePixelRatio );   //RENDERER.setPixelRatio(1.5);
    //RENDERER.setClearColor(0x220088, 0.1);
    RENDERER.setSize(WX, WY);
    // I must append the dom element used by the RENDERER to the html that I am using.
    RENDERER_container.appendChild(RENDERER.domElement);
    RENDERER_container.style.width=WX + "px";   RENDERER_container.style.height=window.innerHeight + "px";
    RENDERER.domElement.style.width=WX + "px";   RENDERER.domElement.style.height=WY + "px";
    /// Then a scene is needed to place objects in	
   SCENE= new THREE.Scene();	SCENE.position.set(0 , 0, 0  );///
	GROUP_SUN=new THREE.Group();	SCENE.add( GROUP_SUN );
		/// for scene use lights
		this.createLight();
	/// use multi view camera
		CAM_POS=[[0,0,1000],[0,1000,0]];
		VIEWS=[
				{left: 0,top: 0, width: 1.0, height: 1.0, eye: CAM_POS[ 0 ], up: [ 0, 1, 0 ], fov: 30, background: 0x220088, 
					updateCamera: function ( cam, scn, pos ) {
					  if(pos[0]){cam.position.x -= pos[0] * 0.05;  cam.position.x=Math.max( Math.min( cam.position.x, 1000 ), - 1000 );}
					  if(pos[1]){cam.position.y -= pos[1] * 0.05;  cam.position.y=Math.max( Math.min( cam.position.y, 1000 ), - 1000 );}
					  if(pos[2]){cam.position.z -= pos[2] * 0.05;  cam.position.z=Math.max( Math.min( cam.position.z, 1000 ), - 100 );}
					  cam.lookAt( scn.position );}
				},
				{left: 0.75, top: 0.75, width: 0.2, height: 0.2, eye: CAM_POS[ 1 ], up: [ 0, 0, 1 ], fov: 75,	background: 0x220088, //new THREE.Color( 0.7, 0.5, 0.5 ),
					updateCamera: function ( cam, scn, pos) {
					  if(pos[0]){cam.position.x -= pos[0] * 0.05;  cam.position.x=Math.max( Math.min( cam.position.x, 2000 ), - 1000 );}
					 // if(pos[1]){cam.position.x -= pos[1] * 0.05;  cam.position.y=Math.max( Math.min( cam.position.y, 2000 ), - 2000 );}
					 // if(pos[2]){cam.position.x -= pos[2] * 0.05;  cam.position.z=Math.max( Math.min( cam.position.z, 2000 ), - 2000 );}
					  cam.lookAt( cam.position.clone().setY( 0 ) );}
				}
		];	
    /// setting the initial values of the perspective camera
		for ( var n=0; n < VIEWS.length; ++ n ) {	
			var view=VIEWS[ n ];
			var cam=new THREE.PerspectiveCamera( view.fov, ASPECTRATIO , _near ,  _far );
			cam.position.fromArray( view.eye );/// initial array VIEWS[ 0 ].camera.position.set(CAM_POS[ 0 ][ 0 ], CAM_POS[ 0 ][ 1], CAM_POS[ 0 ][ 2 ]);
			cam.up.fromArray( view.up );///
			view.camera=cam; /// VIEWS[0].camera ;
		}		//   console.log(VIEWS);
				//   VIEWS[ 0 ].camera=new THREE.PerspectiveCamera(FIELDOFVIEW, ASPECTRATIO , _near ,  _far );
				//	 VIEWS[ 0 ].camera.layers.enable( 0 );	VIEWS[ 0 ].camera.layers.enable( 1 );	VIEWS[ 0 ].camera.layers.enable( 2 );
				//   VIEWS[ 0 ].camera.position.set(cX, cY, cZ); ///SCENE.add( VIEWS[ 0 ].camera );
				//   VIEWS[ 0 ].camera.lookAt(SCENE.position);
		///Initial and final quaternions
/* 		VIEWS[ 0 ].camera.useQuaternion=true;
		var startQ=new THREE.Quaternion(0,0,0,1), endQ=new THREE.Quaternion(0,1,0,0);
		var animFrames=100, deltaT=1;		//Pause between two consecutive animation frames
		function goSlerping(acc,mesh) {if(acc>=1) return;
			THREE.Quaternion.slerp(startQ, endQ, mesh , acc); //Let's assume that you want to rotate a 3D object named 'mesh'. So:
			setTimeout(function() {goSlerping(acc + (1/ animFrames));}, deltaT);
		}
		goSlerping(1/ this.animFrames,this.mesh_C.quaternion);		 */
		
		
    var orbit=new THREE.OrbitControls(VIEWS[ 0 ].camera, RENDERER.domElement); /// route with cursor......
/*     this.WX=WX;  this.WY=window.innerHeight;
    this.mouse={ x: 0, y: 0, old_x: 0, old_y: 0 };
        document.addEventListener( 'mousemove', function(event){
          this.mouse.old_x=this.mouse.x;this.mouse.x=event.clientX - this.WX / 2;
          this.mouse.old_y=this.mouse.y;this.mouse.y=event.clientY - this.WY / 2;
        }.bind(this), false ); */

    window.onresize=function () { /// resize container
      RENDERER_container.style.width=WX + "px";
      RENDERER_container.style.height=WY + "px";
			this.render() ;
    }.bind(this);
	//
	stats=new Stats();
	stats.domElement.style.cssText=monitor_stats;
	RENDERER_container.appendChild( stats.dom );
	//
	plug_init(this);	/// animations
  }
  createSphere() {
    this.createShader();
    this.sphere_BG=new THREE.IcosahedronBufferGeometry(40, 4);
    this.sphere_SM_C=new THREE.ShaderMaterial({
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
      uniforms: { uTime: { type: "f", value: 0 }, uScale: { type: "f", value: 0 }, isBlack: { type: "i", value: 1 } },
      wireframe: true,
      transparent: true });
    this.detectIndex();
    this.sphere_BG.addAttribute("aFrequency", new THREE.BufferAttribute(new Float32Array(this.indexArray.length), 1));
    this.mesh_C=new THREE.Mesh(this.sphere_BG, this.sphere_SM_C);
    this.mesh_C.layers.set( 0);    GROUP_SUN.add(this.mesh_C);
		//
    this.createSphere_R();    GROUP_SUN.add(this.mesh_R);
    this.createSphere_L();    GROUP_SUN.add(this.mesh_L);
  }
  createSphere_R() {
    this.sphere_BG_R=new THREE.IcosahedronBufferGeometry(20, 2);
    this.sphere_BG_R.addAttribute("aFrequency", new THREE.BufferAttribute(new Float32Array(this.indexArray.length), 1));
    this.sphere_SM_R=new THREE.ShaderMaterial({
      vertexShader: this.vertex_R,
      fragmentShader: this.fragment_R,
      uniforms: { uScale: { type: "f", value: 0 }, isBlack: { type: "i", value: 1 } },
      wireframe: true,
      shading: THREE.FlatShading
			});
    this.mesh_R=new THREE.Mesh(this.sphere_BG_R, this.sphere_SM_R);
    this.mesh_R.layers.set( 1);
  }
  createSphere_L() {
    this.sphere_BG_L=new THREE.IcosahedronBufferGeometry(45, 4);
    this.sphere_BG_L.addAttribute("aFrequency", new THREE.BufferAttribute(new Float32Array(this.indexArray.length), 1));
    this.sphere_SM_L=new THREE.ShaderMaterial({
      vertexShader: this.vertex_L,
      fragmentShader: this.fragment_L,
      uniforms: { uScale: { type: "f", value: 0 }, isBlack: { type: "i", value: 1 } },
      //shading: THREE.FlatShading,
      wireframe: true,
      transparent: true 
			});
    this.mesh_L=new THREE.Mesh(this.sphere_BG_L, this.sphere_SM_L);
    this.mesh_L.layers.set( 2);
  }
  detectIndex() {
    this.verticesArray=this.sphere_BG.attributes.position.array;
    var arrayLength=this.verticesArray.length;
    this.vecCount=0;
    this.indexCount=0;
    this.vec3Array=[];
    this.allVec3Array=[];
    this.indexArray=[];
    this.indexPosArray=[];
    this.frequencyNumArray=[];
    for (var i=0; i < arrayLength; i += 3) {
      var vec3={};
      vec3.x=this.verticesArray[i];
      vec3.y=this.verticesArray[i + 1];
      vec3.z=this.verticesArray[i + 2];
      var detect=this.detectVec(vec3);
      this.allVec3Array.push(vec3);
      if (detect === 0 || detect > 0) {
        this.indexArray[this.indexCount]=detect;
        this.indexPosArray[detect].push(this.indexCount);
      } else {
        this.vec3Array[this.vecCount]=vec3;
        this.indexArray[this.indexCount]=this.vecCount;
        this.indexPosArray[this.vecCount]=[];
        this.indexPosArray[this.vecCount].push(this.indexCount);
        this.vecCount++;
      }
      this.indexCount++;
    }
  }
  detectVec(vec3) {
    if (this.vecCount === 0) return false;
    for (var i=0, len=this.vec3Array.length; i < len; i++) {
      var _vec3=this.vec3Array[i];
      var isExisted=vec3.x === _vec3.x && vec3.y === _vec3.y && vec3.z === _vec3.z;
      if (isExisted) {return i;}
    }
    return false;
  }
  createShader() {
    this.vertex=[
    "uniform float uTime;",
    "uniform float uScale;",
    "attribute float aFrequency;",
    "varying float vFrequency;",
    "varying float vPos;",
    "const float frequencyNum=256.0;",
    "const float radius=40.0;",
    "const float PI=3.14159265;",
    "const float _sin15=sin(PI / 10.0);",
    "const float _cos15=cos(PI / 10.0);",
    "void main(){",
    "float frequency;",
    "float SquareF=aFrequency * aFrequency;",
    "frequency=smoothstep(16.0, 7200.0, SquareF) * SquareF / (frequencyNum * frequencyNum);",
    "vFrequency=frequency;",
    "float _uScale=(1.0 - uScale * 0.5 / frequencyNum) * 3.0;",
    "float _sin=sin(uTime * .5);",
    "float _cos=cos(uTime * .5);",
    "mat2 rot=mat2(_cos, -_sin, _sin, _cos);",
    "mat2 rot15=mat2(_cos15, -_sin15, _sin15, _cos15);",
    "vec2 _pos=rot * position.xz;",
    "vec3 newPos=vec3(_pos.x, position.y, _pos.y);",
    "newPos.xy=rot15 * newPos.xy;",
    "newPos=(1.0 + uScale / (frequencyNum * 2.0) ) * newPos;",
    "vPos=(newPos.x + newPos.y + newPos.z) / (3.0 * 120.0);",
    "gl_Position=projectionMatrix * modelViewMatrix * vec4(newPos + vFrequency * newPos * _uScale, 1.0);",
    "}"].join("\n");
    this.fragment=[
    "uniform float uTime;",
    "uniform float uScale;",
    "uniform int isBlack;",
    "varying float vFrequency;",
    "varying float vPos;",
    "const float frequencyNum=256.0;",
    "const vec3 baseColor=vec3(0.95, 0.25, 0.3);",
    // "const vec3 baseColor=vec3(0.0, 0.65, 0.7);",
    "void main(){",
    "float f=smoothstep(0.0, 0.00002, vFrequency * vFrequency) * vFrequency;",
    "float red=min(1.0, baseColor.r + f * 1.9);",
    "float green=min(1.0, baseColor.g + f * 3.6);",
    "float blue=min(1.0, baseColor.b + f* 0.01);",
    "float sum=red + blue + green;",
    "blue=min(1.0, blue + 0.3);",
    "green=max(0.0, green - 0.1);",
    "float offsetSum=(sum - (red + blue + green) / 3.0) / 3.0;",
    "blue += offsetSum + min(vPos * 2.0, -0.2);",
    "red += offsetSum + min(vPos * 0.5, 0.2);",
    "green += offsetSum - vPos * max(0.3, vFrequency * 2.0);",
    "vec3 color;",
    "color=vec3(red, green, blue);",
    "gl_FragColor=vec4(color, 1.0);",
    "}"].join("\n");
    //color: 0xff6673,
    this.vertex_R=this.vertex_L=[
    "varying vec3 vPosition;",
    "void main(){",
    "vPosition=position;",
    "gl_Position =projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
    "}"].join("\n");
    this.fragment_R= [
    "uniform float uScale;", "uniform int isBlack;","varying vec3 vPosition;",
    "const float frequencyNum=256.0;", "const float radius=40.0;", "const vec3 baseColor=vec3(1.0, 102.0 / 255.0, 115.0 / 255.0);", //red
    "void main(){","vec3 pos=vec3(vPosition.x, -vPosition.y, vPosition.z) / (radius * 10.0) + 0.05;",
    "vec3 _color;","_color=baseColor + pos;", // "float _uScale=uScale / (frequencyNum * 5.0);",
    "gl_FragColor=vec4(_color, 1.0);","}"].join("\n");
		this.fragment_L=[
    "uniform float uScale;", "uniform int isBlack;", "varying vec3 vPosition;",
    "const float frequencyNum=256.0;","const float radius=80.0;","const vec3 baseColor=vec3(0.8, 0.5, 0.5);",     // "const vec3 baseColor=vec3(0.1, 0.8, 0.9);", // blue
    "void main(){","vec3 pos=vec3(vPosition.x, -vPosition.y, vPosition.z) / (radius * 20.0) + 0.05;",
    "vec3 _color;","_color=baseColor + pos;",  // "float _uScale=uScale / (frequencyNum * 5.0);",
    "gl_FragColor=vec4(_color, 1.0);","}"].join("\n");
  }
  createLight() {var gltch=true, SpotLight,SpotLightcolors=[ 0xff0000, 0x00ff00, 0x0000ff ];
		SCENE.add(new THREE.AmbientLight( 0x2c3e50 ));
		SpotLight=new THREE.PointLight( 0xff0040, 2, 50 );	
		SpotLight.add( new THREE.Mesh( new THREE.TorusBufferGeometry(2, 1, 4, 2 ), new THREE.MeshBasicMaterial( { color: 'yellow' } ) ) );
		SpotLight.layers.enable( 0 ); SpotLight.layers.enable( 1 );	SpotLight.layers.enable( 2 );	
		SpotLight.position.set( 1000, 1000, 2000 );	
		SCENE.add( SpotLight ); //VIEWS[ 0 ].camera.add( SpotLight );
		
		var dirlight= new THREE.DirectionalLight( 0xffffff );	dirlight.position.set( 0, 0, 0 );	SCENE.add( dirlight );
		SCENE.add(new THREE.Mesh(new THREE.SphereBufferGeometry( 12, 44, 44 ), new THREE.MeshBasicMaterial( { color: 0xFFFF00 } )) );
		// postprocessing
		if(gltch){
		//this.composer=new THREE.EffectComposer( RENDERER );
		//this.composer.addPass( new THREE.RenderPass( SCENE, VIEWS[ 0 ].camera ) );
		this.glitchPass=new THREE.GlitchPass();
		this.glitchPass.renderToScreen=true;
		//this.composer.addPass( this.glitchPass );
		}		
///		
	}
	updateSize() {	if ( WX != window.innerWidth || WY != window.innerHeight ) {
		WX=window.innerWidth;	WY=window.innerHeight;	
		RENDERER.setSize( WX, WY );	}
	}
	render() {/// from animate /// updateCameras
			//this.updateSize();
			for ( var n=0; n < VIEWS.length; ++ n ) {
				var view=VIEWS[ n ]; var cam=view.camera;	view.updateCamera( cam, SCENE, CAM_POS[n] );///
				var LEFT=Math.floor( WX * view.left ), TOP=Math.floor( WY * view.top ),
							WIDTH=Math.floor( WX * view.width ), HEIGHT=Math.floor( WY * view.height );
				RENDERER.setViewport( LEFT, TOP, WIDTH, HEIGHT );
				RENDERER.setScissor( LEFT, TOP, WIDTH, HEIGHT );	RENDERER.setScissorTest( true );
				if(n==0)RENDERER.setClearColor( view.background, 0.3 );else RENDERER.setClearColor( view.background, 1 );
				cam.aspect=WIDTH / HEIGHT;	cam.updateProjectionMatrix();
				RENDERER.render( SCENE, cam );
				//this.composer.render();
			}
		}
  animateCamera() {
    this.sphere_BG.attributes.aFrequency.needsUpdate=true;
    this.sphere_BG_L.attributes.aFrequency.needsUpdate=true;
    this.sphere_BG_R.attributes.aFrequency.needsUpdate=true;    // update method
/*
		var d=this.mouse.x - this.mouse.old_x, theta=d * 0.1;
		var sin=Math.sin(theta), cos=Math.cos(theta);
		var x =VIEWS[ 0 ].camera.position.x, z =VIEWS[ 0 ].camera.position.z;
		VIEWS[ 0 ].camera.position.x=x * cos - z * sin; VIEWS[ 0 ].camera.position.z=x * sin + z * cos;
		VIEWS[ 0 ].camera.lookAt( SCENE.position ); 
*/
		var now=new Date() * 0.0001,  delta=this.clock.getDelta(), per=THETA/IMAX, bias=1 - Math.abs(.5 - per) / .5, 
					elapsed1=(now - LASTTIME) % 60, elapsed2=(now - ONCE) % 60;
		if (elapsed1 <=LASTFRAME) { THETA+= 1; THETA= THETA%IMAX;  LASTTIME=now; 
				var x=RADIUS * Math.sin( THREE.Math.degToRad( THETA) );
				var y=RADIUS * Math.sin( THREE.Math.degToRad( THETA) );
				var z=RADIUS * Math.cos( THREE.Math.degToRad( THETA) );
				//SCENE.position.set(cX+THETA, cY+THETA, cZ-THETA );
				/* changing aspect, and field of view  */     // VIEWS[ 0 ].camera.aspect=.5 + 1.5 * bias; 
				//VIEWS[ 0 ].camera.fov=FIELDOFVIEW + 25 * bias;	VIEWS[ 0 ].camera.updateProjectionMatrix(); // I must call this to get it to work
				//VIEWS[ 0 ].camera.position.set(cX+x, cY+2*y, cZ-3*z ); 		//	VIEWS[ 0 ].camera.position.set(cX+50 * bias, cY+55 * bias , cZ-55 * bias );
		var oldPos=CAM_POS[0], a2=[x, y , oldPos[2]* bias*-0.8];	
		CAM_POS[0]=oldPos.map((a, i) => a + a2[i]); ///console.log('sum',CAM_POS[0]);
		//VIEWS[ 0 ].camera.position.set(cX+x, cY+y , cZ-cZ* bias*0.8);
		//VIEWS[ 0 ].camera.lookAt( SCENE.position );VIEWS[ 0 ].camera.updateMatrixWorld();
		} // console.log('cam',oldPos, CAM_POS[0]);
		//if(freQuencyAvg>=77){_layerno+=1; if(_layerno>=3)_layerno=0;	VIEWS[ 0 ].camera.layers.toggle( _layerno );ONCE= now;	console.log(freQuencyAvg,elapsed2,_layerno);}
		//if(_layerno!=0&&elapsed2 >=2){_layerno=0;VIEWS[ 0 ].camera.layers.toggle( _layerno );ONCE= now;}
		//VIEWS[ 0 ].camera.layers.toggle( 2 );
		//console.log(freQuencyAvg,elapsed2);
/// plugins
	//updateGlitch(check) {	this.glitchPass.goWild=check;}
		PLUG_PLAY(now);
		//stats.begin();
		this.render() ;
	///RENDERER.render(SCENE,VIEWS[ 0 ].camera);
		//stats.end();
		stats.update();
}
}
/// start Main;
window.onload=function () { WEBGL=new Webgl();  audio=new Audio();};

/// plugins ==============================================================================================================
var	createBackGround= (function() {
			function init() {	//camera=new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
				var geometry=new THREE.PlaneBufferGeometry( 2, 3 );
				BG_uniforms={time: { value: 1.0 }};
				var material=new THREE.ShaderMaterial( {
					uniforms: BG_uniforms,
					transparent: true,
					vertexShader: document.getElementById( 'vertexShader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentShader' ).textContent
				} );
				BG_Mesh=new THREE.Mesh( geometry, material );
				SCENE.add( BG_Mesh ); 
			}
			//
			function animate( timestamp ) {
			//	$BG_Mesh.material.transparent=true; $BG_Mesh.material.opacity=0.2// + 0.5*Math.sin(new Date().getTime() * .0025);
				requestAnimationFrame( animate );
				BG_uniforms.time.value=timestamp / 4000;
				//RENDERER.render( SCENE, camera );
			}
	return {init:init,animate:animate};
	}());

var	FakeSun= (function() {///ugh
			var 
				mycamera, materialDepth,
				bgColor=0x000511, sunColor=0xffee00,
				sunPos=new THREE.Vector3( 0, 0, 0 ), 
				scrSpacePos=new THREE.Vector3(),
				PostPRO={ enabled: false };
			function init() {
				mycamera=VIEWS[ 0 ].camera;
				materialDepth=new THREE.MeshDepthMaterial();
				//
				PostPRO={ enabled: true };
				initPostprocessing();
			}
			function initPostprocessing() {
				var x1=WX / - 2,x2=WX / 2,y1=WY / 2,y2=WY / - 2,z1=- 10000,z2=10000;
				PostPRO.scr=new THREE.Scene();
				PostPRO.cam=new THREE.OrthographicCamera( x1,x2 ,y1 ,y2 ,z1 ,z2  );//mycamera;//
				PostPRO.cam.position.z=1000;
				PostPRO.scr.add( PostPRO.cam );
				var pars={ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
				PostPRO.rtTextureColors=new THREE.WebGLRenderTarget( WX, WY, pars );
				// Switching the depth formats to luminance from rgb doesn't seem to work. I didn't investigate further for now.	// pars.format=THREE.LuminanceFormat;
				// I would have this quarter size and use it as one of the ping-pong render targets but the aliasing causes some temporal flickering
				PostPRO.rtTextureDepth=new THREE.WebGLRenderTarget( WX, WY, pars );
				PostPRO.rtTextureDepthMask=new THREE.WebGLRenderTarget( WX, WY, pars );
				var w=WX / 4.0, h=WY / 4.0;				// Aggressive downsize god-ray ping-pong render targets to minimize cost
				PostPRO.rtTextureGodRays1=new THREE.WebGLRenderTarget( w, h, pars );
				PostPRO.rtTextureGodRays2=new THREE.WebGLRenderTarget( w, h, pars );
				// god-ray shaders
				var godraysMaskShader=THREE.ShaderGodRays[ "godrays_depthMask" ];
				PostPRO.godrayMaskUniforms=THREE.UniformsUtils.clone( godraysMaskShader.uniforms );
				PostPRO.materialGodraysDepthMask=new THREE.ShaderMaterial( {
					uniforms: PostPRO.godrayMaskUniforms,
					vertexShader: godraysMaskShader.vertexShader,
					fragmentShader: godraysMaskShader.fragmentShader
				} );
				var godraysGenShader=THREE.ShaderGodRays[ "godrays_generate" ];
				PostPRO.godrayGenUniforms=THREE.UniformsUtils.clone( godraysGenShader.uniforms );
				PostPRO.materialGodraysGenerate=new THREE.ShaderMaterial( {
					uniforms: PostPRO.godrayGenUniforms,
					vertexShader: godraysGenShader.vertexShader,
					fragmentShader: godraysGenShader.fragmentShader
				} );
				var godraysCombineShader=THREE.ShaderGodRays[ "godrays_combine" ];
				PostPRO.godrayCombineUniforms=THREE.UniformsUtils.clone( godraysCombineShader.uniforms );
				PostPRO.materialGodraysCombine=new THREE.ShaderMaterial( {
					uniforms: PostPRO.godrayCombineUniforms,
					vertexShader: godraysCombineShader.vertexShader,
					fragmentShader: godraysCombineShader.fragmentShader
				} );
				var godraysFakeSunShader=THREE.ShaderGodRays[ "godrays_fake_sun" ];
				PostPRO.godraysFakeSunUniforms=THREE.UniformsUtils.clone( godraysFakeSunShader.uniforms );
				PostPRO.materialGodraysFakeSun=new THREE.ShaderMaterial( {
					uniforms: PostPRO.godraysFakeSunUniforms,
					vertexShader: godraysFakeSunShader.vertexShader,
					fragmentShader: godraysFakeSunShader.fragmentShader
				} );
				PostPRO.godraysFakeSunUniforms.bgColor.value.setHex( bgColor );
				PostPRO.godraysFakeSunUniforms.sunColor.value.setHex( sunColor );
				PostPRO.godrayCombineUniforms.fGodRayIntensity.value=0.75;
				PostPRO.quad=new THREE.Mesh(new THREE.PlaneBufferGeometry( WX, WY ), PostPRO.materialGodraysGenerate);
				PostPRO.quad.position.z=- 9000;
				PostPRO.scr.add( PostPRO.quad );
			}
			function update() {
				if ( PostPRO.enabled ) {
					// Find the screenspace position of the sun
					scrSpacePos.copy( sunPos ).project( mycamera );
					scrSpacePos.x=( scrSpacePos.x + 1 ) / 2;	scrSpacePos.y=( scrSpacePos.y + 1 ) / 2;
					// Give it to the god-ray and sun shaders
					PostPRO.godrayGenUniforms[ "vSunPositionScreenSpace" ].value.x=scrSpacePos.x;
					PostPRO.godrayGenUniforms[ "vSunPositionScreenSpace" ].value.y=scrSpacePos.y;
					PostPRO.godraysFakeSunUniforms[ "vSunPositionScreenSpace" ].value.x=scrSpacePos.x;
					PostPRO.godraysFakeSunUniforms[ "vSunPositionScreenSpace" ].value.y=scrSpacePos.y;
					// -- Draw sky and sun --
					// Clear colors and depths, will clear to sky color
					RENDERER.setRenderTarget( PostPRO.rtTextureColors );
					RENDERER.clear( true, true, false );
					// Sun render. Runs a shader that gives a brightness based on the screen space distance to the sun. 
					// Not very efficient, so i make a scissor rectangle around the suns position to avoid rendering surrounding pixels.
					var sunsqH=0.74 * WY; // 0.74 depends on extent of sun from shader
					var sunsqW=0.74 * WY; // both depend on height because sun is aspect-corrected
					scrSpacePos.x *= WX;	scrSpacePos.y *= WY;
					RENDERER.setScissor( scrSpacePos.x - sunsqW / 2, scrSpacePos.y - sunsqH / 2, sunsqW, sunsqH );	RENDERER.setScissorTest( true );
					PostPRO.godraysFakeSunUniforms[ "fAspect" ].value=WX / WY;
					PostPRO.scr.overrideMaterial=PostPRO.materialGodraysFakeSun;
					RENDERER.render( PostPRO.scr, PostPRO.cam, PostPRO.rtTextureColors );	RENDERER.setScissorTest( false );
					// -- Draw SCENE objects --
					// Colors
					///SCENE.overrideMaterial=null;
					RENDERER.render( SCENE, mycamera, PostPRO.rtTextureColors );
					// Depth
					SCENE.overrideMaterial=materialDepth;
					RENDERER.render( SCENE, mycamera, PostPRO.rtTextureDepth, true );
					//
					PostPRO.godrayMaskUniforms[ "tInput" ].value=PostPRO.rtTextureDepth.texture;
					PostPRO.scr.overrideMaterial=PostPRO.materialGodraysDepthMask;
					RENDERER.render( PostPRO.scr, PostPRO.cam, PostPRO.rtTextureDepthMask );
					// -- Render god-rays --
					// Maximum length of god-rays (in texture space [0,1]X[0,1])
					var filterLen=1.0;
					// Samples taken by filter
					var TAPS_PER_PASS=6.0;
					// Pass order could equivalently be 3,2,1 (instead of 1,2,3), which would start with a small filter support and grow to large. however
					// the large-to-small order produces less objectionable aliasing artifacts that appear as a glimmer along the length of the beams
					// pass 1 - render into first ping-pong target
					var pass=1.0;
					var stepLen=filterLen * Math.pow( TAPS_PER_PASS, - pass );
					PostPRO.godrayGenUniforms[ "fStepSize" ].value=stepLen;
					PostPRO.godrayGenUniforms[ "tInput" ].value=PostPRO.rtTextureDepthMask.texture;
					PostPRO.scr.overrideMaterial=PostPRO.materialGodraysGenerate;
					RENDERER.render( PostPRO.scr, PostPRO.cam, PostPRO.rtTextureGodRays2 );
					// pass 2 - render into second ping-pong target
					pass=2.0;
					stepLen=filterLen * Math.pow( TAPS_PER_PASS, - pass );
					PostPRO.godrayGenUniforms[ "fStepSize" ].value=stepLen;
					PostPRO.godrayGenUniforms[ "tInput" ].value=PostPRO.rtTextureGodRays2.texture;
					RENDERER.render( PostPRO.scr, PostPRO.cam, PostPRO.rtTextureGodRays1 );
					// pass 3 - 1st RT
					pass=3.0;
					stepLen=filterLen * Math.pow( TAPS_PER_PASS, - pass );
					PostPRO.godrayGenUniforms[ "fStepSize" ].value=stepLen;
					PostPRO.godrayGenUniforms[ "tInput" ].value=PostPRO.rtTextureGodRays1.texture;
					RENDERER.render( PostPRO.scr, PostPRO.cam, PostPRO.rtTextureGodRays2 );
					// final pass - composite god-rays onto colors
					PostPRO.godrayCombineUniforms[ "tColors" ].value=PostPRO.rtTextureColors.texture;
					PostPRO.godrayCombineUniforms[ "tGodRays" ].value=PostPRO.rtTextureGodRays2.texture;
					PostPRO.scr.overrideMaterial=PostPRO.materialGodraysCombine;
					RENDERER.render( PostPRO.scr, PostPRO.cam );
					PostPRO.scr.overrideMaterial=null;
				} 
				else {RENDERER.clear();	RENDERER.render( SCENE, mycamera );}
			}
	return {init:init,	update:update,	run:true	};
}());	
var ImprovedNoise=function () {// http://mrl.nyu.edu/~perlin/noise/   for radiate..
	var p=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
		 23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
		 174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
		 133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
		 89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
		 202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
		 248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
		 178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
		 14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
		 93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
	for (var i=0; i < 256 ; i++) {	p[256+i]=p[i];}
	function fade(t) {	return t * t * t * (t * (t * 6 - 15) + 10);}
	function lerp(t, a, b) {	return a + t * (b - a);}
	function grad(hash, x, y, z) { var h=hash & 15,  u=h < 8 ? x : y, v=h < 4 ? y : h == 12 || h == 14 ? x : z; return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);}
	return {	noise: function (x, y, z) { var floorX=~~x, floorY=~~y, floorZ=~~z;
			var X=floorX & 255, Y=floorY & 255, Z=floorZ & 255; x -= floorX; y -= floorY; z -= floorZ;
			var xMinus1=x -1, yMinus1=y - 1, zMinus1=z - 1;
			var u=fade(x), v=fade(y), w=fade(z);
			var A=p[X]+Y, AA=p[A]+Z, AB=p[A+1]+Z, B=p[X+1]+Y, BA=p[B]+Z, BB=p[B+1]+Z;
			return lerp( w,
				lerp(v, lerp(u, grad(p[AA], x, y, z),  grad(p[BA], xMinus1, y, z)),lerp(u, grad(p[AB], x, yMinus1, z),grad(p[BB], xMinus1, yMinus1, z))),
				lerp(v, lerp(u, grad(p[AA+1], x, y, zMinus1),grad(p[BA+1], xMinus1, y, z-1)), lerp(u, grad(p[AB+1], x, yMinus1, zMinus1), grad(p[BB+1], xMinus1, yMinus1, zMinus1)))
			);
		}
	}
};
var Radiate=(function() {
	var RINGCOUNT=60, SEPARATION=50, INIT_RADIUS=40, SEGMENTS=512, VOL_SENS=2, BIN_COUNT=512
				, rings=[],materials=[], levels=[], colors=[];	//var waves=[];	//var geoms=[];
	var loopHolder=new THREE.Object3D();
	var perlin=new ImprovedNoise(), noisePos=0, freqByteData, timeByteData, loopGeom;//one geom for all rings
	function init() {
		rings=[];		geoms=[];		materials=[];		levels=[];	colors=[],	scale=1.5;//waves=[];
		freqByteData=new Uint8Array(BIN_COUNT);		timeByteData=new Uint8Array(BIN_COUNT);//INIT audio in
		GROUP_SUN.add(loopHolder);
		var circleShape=new THREE.Shape();		circleShape.absarc( 0, 0, INIT_RADIUS, 0, Math.PI*2, false );
		loopGeom=circleShape.createPointsGeometry(SEGMENTS/2);  loopGeom.dynamic=true;		//createPointsGeometry returns (SEGMENTS * 2 )+ 1 points
		for(var i=0; i < RINGCOUNT; i++) {///create rings
			var m=new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 ,opacity : Rnd_opacity,blending : THREE.AdditiveBlending, //depthTest : false,
				transparent : true});
			var line=new THREE.Line( loopGeom, m);
			rings.push(line);
			//geoms.push(geom);
			materials.push(m);
			scale *= 1.04;		line.scale.x=scale;		line.scale.y=scale;
			loopHolder.add(line);
			levels.push(0);
			//waves.push(emptyBinData);
			colors.push(0);
			//rings
			//if (Math.floor(i /20) % 2 == 0 ){line.visible=false;}
		}
	}
	function remove() {if (loopHolder){for(var i=0; i < RINGCOUNT; i++) {loopHolder.remove(rings[i]);}}}
	function update() {
		//analyser.smoothingTimeConstant=0.1;
		ANALYSER.getByteFrequencyData(freqByteData);	ANALYSER.getByteTimeDomainData(timeByteData);
		//get average level
		///var sum=0;	for(var i=0; i < BIN_COUNT; i++) {sum += freqByteData[i];		}
		///var aveLevel=sum / BIN_COUNT;
		var scaled_average=(freQuencyAvg / 256) * VOL_SENS; //256 is the highest a level can be
		levels.push(scaled_average);
		//read waveform into timeByteData	//waves.push(timeByteData);
		//get noise color posn
		noisePos += 0.005;
		var n=Math.abs(perlin.noise(noisePos, 0, 0)); colors.push(n);
		levels.shift(1);
		//waves.shift(1);
		colors.shift(1);
		//write current waveform into all rings
		for(var j=0; j < SEGMENTS; j++) {loopGeom.vertices[j].z=(timeByteData[j]- 128);	}//stretch by 2
		// link up last segment
		loopGeom.vertices[SEGMENTS].z=loopGeom.vertices[0].z;	loopGeom.verticesNeedUpdate=true;
		//for( i=RINGCOUNT-1; i > 0 ; i--) {
		for( i=0; i < RINGCOUNT ; i++) {
			var ringId=RINGCOUNT - i - 1;
			var normLevel=levels[ringId] + 0.1; //avoid scaling by 0
			var hue=colors[i];
			materials[i].color.setHSL(hue, 1, normLevel);
			materials[i].linewidth=normLevel*6;//3
			materials[i].opacity=0.1+normLevel; //fadeout 0.2
			rings[i].scale.z=normLevel/2;
		}
		///auto tilt
		 loopHolder.rotation.x=perlin.noise(noisePos * .5, 0,0) * Math.PI*.6;
		 loopHolder.rotation.y=perlin.noise(noisePos * .5,10,0) * Math.PI*.6;
		//
		loopHolder.rotation.x += (- loopHolder.rotation.x) * 0.2;
		loopHolder.rotation.y += (loopHolder.rotation.y) * 0.2;
	}
	return {init:init,	update:update,	remove:remove,	loopHolder:loopHolder	,run:true	};
	}());

var particles=(function() {
	function init() {
		var i, line, material, p, parameters=[
					[ 0.5, 		0xffaa00, 	0.21 ,				4], 
					[ 0.75, 0xffcc00, 	0.5,	3], 
					[ 1, 			0xffff00, 		0.5,		2], 
					[ 1.25, 0x000833, 0.8 ,		1],
					[ 3.0, 		0xaaaaaa, 0.55,	1], 
					[ 3.5, 		0xffffff,				0.35 ,		1], 
					[ 4.5, 		0xfffddd, 	0.2 ,	1], 
					[ 5.5, 		0xfffaaa, 	0.12, 0.5]
			];
		var geometry=createGeometry();
		for ( i=0; i < parameters.length; ++ i ) {	p=parameters[ i ];
			material=new THREE.LineBasicMaterial( { linewidth: p[ 3 ], color: p[ 1 ], opacity: p[ 2 ] } );
			line=new THREE.LineSegments( geometry, material );
			 line.userData.originalScale=p[3 ];
			line.scale.x=line.scale.y =line.scale.z=p[ 0 ];
			line.rotation.y=Math.random() * Math.PI;
			line.updateMatrix();
			SCENE.add( line );
		}
	}
	function createGeometry() {
		var geometry=new THREE.BufferGeometry();
		var vertices=[];
		var vertex=new THREE.Vector3();
		for ( var i=0; i < 500; i ++ ) {
			vertex.x=Math.random() * 2 - 1;
			vertex.y=Math.random() * 2 - 1;
			vertex.z=Math.random() * 2 - 1;
			vertex.normalize();
			vertex.multiplyScalar( 150 );
			vertices.push( vertex.x, vertex.y, vertex.z );
			vertex.multiplyScalar( Math.random() * 0.09 + 1 );
			vertices.push( vertex.x, vertex.y, vertex.z );
		}
		geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
		return geometry;
	}
	function animate(now) {	var max=SCENE.children.length; //console.log('did',SCENE.children);
		var howmuch=freQuencyAvg<88? (now+freQuencyAvg/20):freQuencyAvg;
		for ( var i=0; i < max; i ++ ) { var object=SCENE.children[ i ];
			if ( object.isLine ) { object.rotation.y=howmuch * (  i < 4 ? ( i + 1 ) : - ( i + 1 )  );
				if ( i < max ) {var scale=object.userData.originalScale * ( i / 5 + 1 ) * ( 1 + 0.5 * Math.sin( howmuch ) ); //now
					object.scale.x=object.scale.y=object.scale.z=scale;	}
			}
		}
	}	
	return {init:init, animate:animate,run:true	};
	}());

var	spots= (function() {	var ambient,spotLight1,spotLight2,spotLight3;	 var lightHelper1, lightHelper2, lightHelper3, hlp=true;
			function init( ) {
				ambient=new THREE.AmbientLight( 0x111111 );
				spotLight1=createSpotlight( 0xFF7F00 );	spotLight1.position.set( -1111, 200, 45 );
				spotLight2=createSpotlight( 0x00FF7F );	spotLight2.position.set( 0, 400, 350 );
				spotLight3=createSpotlight( 0x7F00FF );	spotLight3.position.set( 555, 100, -450 );
				SCENE.add( spotLight1, spotLight2, spotLight3 );
				if(hlp){
					lightHelper1=new THREE.SpotLightHelper( spotLight1 );
					lightHelper2=new THREE.SpotLightHelper( spotLight2 );
					lightHelper3=new THREE.SpotLightHelper( spotLight3 );
					SCENE.add( lightHelper1, lightHelper2, lightHelper3 );
				}
			render();
			animate();	
			animatecam();						
			}
			function createSpotlight( color ) {
				var newObj=new THREE.SpotLight( color, 2 );
				newObj.castShadow=true;
				newObj.angle=0.3;
				newObj.penumbra=0.2;
				newObj.decay=2;
				newObj.distance=50;
				newObj.shadow.mapSize.width=1024;
				newObj.shadow.mapSize.height=1024;
				return newObj;
			}
			function tween( lght ) { //console.log('tweensux',lght.position)
				new TWEEN.Tween( lght )
				.to( {angle: ( Math.random() * 0.7 ) + 0.1,penumbra: Math.random() + 1}, Math.random() * 3000 + 2000 )
					.easing( TWEEN.Easing.Quadratic.Out ).start();
				new TWEEN.Tween( lght.position )
				.to( {x: ( Math.random() * 300 ) - 15,	y: ( Math.random() * 310 ) + 15,	z: ( Math.random() * 300 ) - 15}, Math.random() * 3000 + 2000 )
					.easing( TWEEN.Easing.Quadratic.Out ).start();
			}
			function animate() { tween( spotLight1 ); tween( spotLight2 );	tween( spotLight3 );	tween( VIEWS[ 1 ].camera );
				setTimeout( animate, 15000 );
			}
			function animatecam() {	tween( VIEWS[ 0 ].camera );	setTimeout( animatecam, 5000 );	}
			function render() {
				TWEEN.update();
				if ( hlp){ lightHelper1.update(); lightHelper2.update();  lightHelper3.update();} 
				//RENDERER.render( SCENE, VIEWS[ 0 ].camera );//requestAnimationFrame( render );
			}
	return {init:init, tween:tween,	render:render,	animate:animate,run:true	};
	}());

///
function Rnd_opacity(){return 0.5+ 0.5*Math.sin(new Date().getTime() * .0025);	}
function plug_init(here){ Three_canvas=RENDERER.domElement; //console.log(Three_canvas);
		particles.init(); // linear spheres
    here.createSphere(); // sun core spheres
		Radiate.init(); // satell
		createBackGround.init(); //live background
		//FakeSun.init();
		spots.init();
}
///
function PLUG_PLAY(now){
	if(WEBGL.light){	//if ( this.planet ) this.planet.rotation.y -= 0.5 * delta;
				WEBGL.light.position.x=Math.sin( now * 0.7 ) * 30;
				WEBGL.light.position.y=Math.cos( now * 0.5 ) * 40;
				WEBGL.light.position.z=Math.cos( now * 0.3 ) * 30;
	}
	if(Radiate.run)		Radiate.update();
	if(particles.run)	particles.animate(now);
	if(spots.run)			spots.render();
	//if(FakeSun.run)	FakeSun.update();
}
	
	
	
	