window.addEventListener("load",()=>{
  let op=window.inputKnobsOptions||{};
  op.knobWidth=op.knobWidth||op.knobDiameter||64;
  op.knobHeight=op.knobHeight||op.knobDiameter||64;
  op.sliderWidth=op.sliderWidth||op.sliderDiameter||128;
  op.sliderHeight=op.sliderHeight||op.sliderDiameter||20;
  op.switchWidth=op.switchWidth||op.switchDiameter||24;
  op.switchHeight=op.switchHeight||op.switchDiameter||24;
  op.fgcolor=op.fgcolor||"#f00";
  op.bgcolor=op.bgcolor||"#000";
  op.knobMode=op.knobMode||"linear";
  op.sliderMode=op.sliderMode||"relative";
  let styles=document.createElement("style");
  styles.innerHTML=
`input[type=range].input-knob,input[type=range].input-slider{
  -webkit-appearance:none; -moz-appearance:none;
  border:none; box-sizing:border-box; overflow:hidden;
  background-repeat:no-repeat; background-size:100% 100%; background-position:0px 0%; background-color:transparent;
  touch-action:none;}
input[type=range].input-knob{ width:${op.knobWidth}px; height:${op.knobHeight}px;}
input[type=range].input-slider{ width:${op.sliderWidth}px; height:${op.sliderHeight}px;}
input[type=range].input-knob::-webkit-slider-thumb,input[type=range].input-slider::-webkit-slider-thumb{
  -webkit-appearance:none; opacity:0;}
input[type=range].input-knob::-moz-range-thumb,input[type=range].input-slider::-moz-range-thumb{
  -moz-appearance:none; height:0; border:none;}
input[type=range].input-knob::-moz-range-track,input[type=range].input-slider::-moz-range-track{
  -moz-appearance:none; height:0; border:none;}
input[type=checkbox].input-switch,input[type=radio].input-switch {
  width:${op.switchWidth}px; height:${op.switchHeight}px;
  -webkit-appearance:none; -moz-appearance:none;
  background-size:100% 200%; background-position:0% 0%; background-repeat:no-repeat;
  border:none; border-radius:0; background-color:transparent;}
input[type=checkbox].input-switch:checked,input[type=radio].input-switch:checked { background-position:0% 100%;}`;
  document.head.appendChild(styles);
  let initSwitches=(el)=>{
    let w,h,d,fg,bg;
    if(el.inputKnobs)return;
    el.inputKnobs={};
    el.refresh=()=>{
      let src=el.getAttribute("data-src");
      d=+el.getAttribute("data-diameter");
      let st=document.defaultView.getComputedStyle(el,null);
      w=parseFloat(el.getAttribute("data-width")||d||st.width);
      h=parseFloat(el.getAttribute("data-height")||d||st.height);
      bg=el.getAttribute("data-bgcolor")||op.bgcolor;
      fg=el.getAttribute("data-fgcolor")||op.fgcolor;
      el.style.width=w+"px";
      el.style.height=h+"px";
      if(src) el.style.backgroundImage="url("+src+")";
    };
    el.refresh();
  };
  let initKnobs=(el)=>{
    let w,h,d,fg,bg;
    if(el.inputKnobs){el.redraw(); return;}
    let ik=el.inputKnobs={};
    el.refresh=()=>{
      d=+el.getAttribute("data-diameter");
      let st=document.defaultView.getComputedStyle(el,null);
      w=parseFloat(el.getAttribute("data-width")||d||st.width);
      h=parseFloat(el.getAttribute("data-height")||d||st.height);
      bg=el.getAttribute("data-bgcolor")||op.bgcolor;
      fg=el.getAttribute("data-fgcolor")||op.fgcolor;
      ik.sensex=ik.sensey=200;
      if(el.className.indexOf("input-knob")>=0) ik.itype="k";
      else{
        if(w>=h){
          ik.itype="h";
          ik.sensex=w-h;
          ik.sensey=Infinity;
          el.style.backgroundSize="auto 100%";
        }
        else{
          ik.itype="v";
          ik.sensex=Infinity;
          ik.sensey=h-w;
          el.style.backgroundSize="100% auto";
        }
      }
      el.style.width=w+"px";
      el.style.height=h+"px";
      ik.frameheight=h;
      let src=el.getAttribute("data-src");
      if(src){
        el.style.backgroundImage=`url(${src})`;
        let sp=+el.getAttribute("data-sprites");
        if(sp)ik.sprites=sp;
        else ik.sprites=0;
        if(ik.sprites>=1) el.style.backgroundSize=`100% ${(ik.sprites+1)*100}%`;
        else if(ik.itype!="k"){ el.style.backgroundColor=bg; el.style.borderRadius=Math.min(w,h)*0.25+"px";}
      }
      ik.valrange={min:+el.min, max:(el.max=="")?100:+el.max, step:(el.step=="")?1:+el.step};
      el.redraw(true);
    };
    el.setValue=(v)=>{
      v=(Math.round((v-ik.valrange.min)/ik.valrange.step))*ik.valrange.step+ik.valrange.min;
      if(v<ik.valrange.min) v=ik.valrange.min;
      if(v>ik.valrange.max) v=ik.valrange.max;
      el.value=v;
      if(el.value!=ik.oldvalue){
        el.setAttribute("value",el.value);
        el.redraw();
        let event=document.createEvent("HTMLEvents");
        event.initEvent("input",false,true);
        el.dispatchEvent(event);
        ik.oldvalue=el.value;
      }
    };
    ik.pointerdown=(ev)=>{
      el.focus();
      if(ev.touches)
        ev = ev.touches[0];
      let rc=el.getBoundingClientRect();
      let cx=(rc.left+rc.right)*0.5,cy=(rc.top+rc.bottom)*0.5;
      let dx=ev.clientX,dy=ev.clientY;
      let da=Math.atan2(ev.clientX-cx,cy-ev.clientY);
      if(ik.itype=="k"&&op.knobMode=="circularabs"){
        dv=ik.valrange.min+(da/Math.PI*0.75+0.5)*(ik.valrange.max-ik.valrange.min);
        el.setValue(dv);
      }
      if(ik.itype!="k"&&op.sliderMode=="abs"){
        dv=(ik.valrange.min+ik.valrange.max)*0.5+((dx-cx)/ik.sensex-(dy-cy)/ik.sensey)*(ik.valrange.max-ik.valrange.min);
        el.setValue(dv);
      }
      ik.dragfrom={x:ev.clientX,y:ev.clientY,a:Math.atan2(ev.clientX-cx,cy-ev.clientY),v:+el.value};
      document.addEventListener("mousemove",ik.pointermove);
      document.addEventListener("mouseup",ik.pointerup);
      document.addEventListener("touchmove",ik.pointermove);
      document.addEventListener("touchend",ik.pointerup);
      document.addEventListener("touchcancel",ik.pointerup);
      document.addEventListener("touchstart",ik.preventScroll);
      ev.preventDefault();
      ev.stopPropagation();
    };
    ik.pointermove=(ev)=>{
      let dv;
      let rc=el.getBoundingClientRect();
      let cx=(rc.left+rc.right)*0.5,cy=(rc.top+rc.bottom)*0.5;
      if(ev.touches)
        ev = ev.touches[0];
      let dx=ev.clientX-ik.dragfrom.x,dy=ev.clientY-ik.dragfrom.y;
      let da=Math.atan2(ev.clientX-cx,cy-ev.clientY);
      switch(ik.itype){
      case "k":
        switch(op.knobMode){
        case "linear":
          dv=(dx/ik.sensex-dy/ik.sensey)*(ik.valrange.max-ik.valrange.min);
          if(ev.shiftKey) dv*=0.2;
          el.setValue(ik.dragfrom.v+dv);
          break;
        case "circularabs":
          if(!ev.shiftKey){ dv=ik.valrange.min+(da/Math.PI*0.75+0.5)*(ik.valrange.max-ik.valrange.min); el.setValue(dv); break;}
        case "circularrel":
          if(da>ik.dragfrom.a+Math.PI) da-=Math.PI*2;
          if(da<ik.dragfrom.a-Math.PI) da+=Math.PI*2;
          da-=ik.dragfrom.a;
          dv=da/Math.PI/1.5*(ik.valrange.max-ik.valrange.min);
          if(ev.shiftKey) dv*=0.2;
          el.setValue(ik.dragfrom.v+dv);
        }
        break;
      case "h":
      case "v":
        dv=(dx/ik.sensex-dy/ik.sensey)*(ik.valrange.max-ik.valrange.min);
        if(ev.shiftKey) dv*=0.2;
        el.setValue(ik.dragfrom.v+dv);
        break;
      }
    };
    ik.pointerup=()=>{
      document.removeEventListener("mousemove",ik.pointermove);
      document.removeEventListener("touchmove",ik.pointermove);
      document.removeEventListener("mouseup",ik.pointerup);
      document.removeEventListener("touchend",ik.pointerup);
      document.removeEventListener("touchcancel",ik.pointerup);
      document.removeEventListener("touchstart",ik.preventScroll);
      let event=document.createEvent("HTMLEvents");
      event.initEvent("change",false,true);
      el.dispatchEvent(event);
    };
    ik.preventScroll=(ev)=>{
      ev.preventDefault();
    };
    ik.keydown=()=>{
      el.redraw();
    };
    ik.wheel=(ev)=>{
      let delta=ev.deltaY>0?-ik.valrange.step:ik.valrange.step;
      if(!ev.shiftKey)
        delta*=5;
      el.setValue(+el.value+delta);
      ev.preventDefault();
      ev.stopPropagation();
    };
    el.redraw=(f)=>{
      if(f||ik.valueold!=el.value){
        let v=(el.value-ik.valrange.min)/(ik.valrange.max-ik.valrange.min);
        if(ik.sprites>=1) el.style.backgroundPosition="0px "+(-((v*ik.sprites)|0)*ik.frameheight)+"px";
        else{
          switch(ik.itype){
          case "k": el.style.transform="rotate("+(270*v-135)+"deg)"; break;
          case "h": el.style.backgroundPosition=((w-h)*v)+"px 0px"; break;
          case "v": el.style.backgroundPosition="0px "+(h-w)*(1-v)+"px"; break;
          }
        }
        ik.valueold=el.value;
      }
    };
    el.refresh();
    el.redraw(true);
    el.addEventListener("keydown",ik.keydown);
    el.addEventListener("mousedown",ik.pointerdown);
    el.addEventListener("touchstart",ik.pointerdown);
    el.addEventListener("wheel",ik.wheel);
  }
  let refreshque=()=>{
    let elem=document.querySelectorAll("input.input-knob,input.input-slider");
    for(let i=0;i<elem.length;++i)
      procque.push([initKnobs,elem[i]]);
    elem=document.querySelectorAll("input[type=checkbox].input-switch,input[type=radio].input-switch");
    for(let i=0;i<elem.length;++i){
      procque.push([initSwitches,elem[i]]);
    }
  }
  let procque=[];
  refreshque();
  setInterval(()=>{
    for(let i=0;procque.length>0&&i<8;++i){ let q=procque.shift(); q[0](q[1]);}
    if(procque.length<=0) refreshque();
  },50);
});
