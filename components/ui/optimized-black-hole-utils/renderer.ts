import * as THREE from "three";

// An original, stylised accretion-disc shader, not a physical simulation.
const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);
}
float field(vec2 p) {
  float n=0., a=.5;
  for(int i=0;i<4;i++){n+=a*noise(p);p=p*2.03+7.1;a*=.5;}
  return n;
}
void main() {
  vec2 p=(vUv-.5)*vec2(resolution.x/resolution.y,1.)*2.6;
  p-=pointer*.025;
  float tilt=-.18;
  p=mat2(cos(tilt),-sin(tilt),sin(tilt),cos(tilt))*p;
  float r=length(p), horizon=.46;
  vec2 cell=floor(p*180.);
  float star=step(.9985,hash(cell))*pow(max(0.,1.-length(fract(p*180.)-.5)*2.),5.);
  vec3 color=vec3(.003)+star*.52;
  float angle=atan(p.y,p.x);
  float turbulence=field(vec2(angle*6.-time*.12,r*44.));
  float ring=exp(-abs(r-horizon)*130.);
  float corona=exp(-abs(r-horizon-.05)*22.)*(.25+.75*turbulence);
  // Light bent over the silhouette; the flattened foreground disc crosses it.
  float bent=length(vec2(p.x,p.y*1.12));
  float arc=exp(-pow((bent-.63)/.14,2.))*(.3+.7*field(vec2(angle*10.-time*.09,r*56.)));
  arc*=smoothstep(-.1,.25,p.y);
  float ellipse=length(vec2(p.x,p.y/.19));
  float disk=exp(-pow((ellipse-.92)/.42,2.));
  float streak=field(vec2(ellipse*48.-time*.22,angle*5.));
  disk*=.35+1.3*streak;
  disk*=smoothstep(.44,.56,r)+step(p.y,0.)*(1.-smoothstep(.44,.56,r));
  color*=smoothstep(horizon-.01,horizon+.02,r);
  vec3 silver=vec3(.83,.89,.94);
  vec3 aurora=mix(vec3(.58,.79,.80),vec3(.76,.69,.87),.5+.5*sin(angle*2.+time*.03));
  color+=mix(silver,aurora,.22)*(ring*.85+corona*.32+arc*.7+disk*.92);
  color*=1.-.26*smoothstep(.7,2.4,length(p));
  gl_FragColor=vec4(1.-exp(-color*1.45),1.);
}`;

export function createRenderer({ canvas }: { canvas: HTMLCanvasElement }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms: { resolution: { value: new THREE.Vector2(1, 1) }, pointer: { value: new THREE.Vector2() }, time: { value: 0 } },
    vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.); }",
    fragmentShader,
  });
  scene.add(new THREE.Mesh(geometry, material));
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0, last = 0, elapsed = 0, visible = false, paused = false, disposed = false;
  const draw = () => { if (!disposed) renderer.render(scene, camera); };
  const tick = (now: number) => {
    if (disposed || !visible || paused || motion.matches || document.hidden) { frame = 0; return; }
    if (now - last >= 1000 / 30) {
      elapsed += Math.min((now-last)/1000, .08); last = now;
      material.uniforms.time.value = elapsed; draw();
    }
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(frame); frame = 0; last = performance.now();
    if (visible && !paused && !motion.matches && !document.hidden) frame = requestAnimationFrame(tick);
    else draw();
  };
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(Math.max(1,rect.width), Math.max(1,rect.height), false);
    material.uniforms.resolution.value.set(rect.width || 1, rect.height || 1); draw();
  };
  const pointer = (event: PointerEvent) => {
    if (motion.matches || paused) return;
    const rect=canvas.getBoundingClientRect();
    material.uniforms.pointer.value.set((event.clientX-rect.left)/rect.width-.5, .5-(event.clientY-rect.top)/rect.height);
  };
  const observer = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; sync(); });
  const sizes = new ResizeObserver(resize);
  observer.observe(canvas); sizes.observe(canvas);
  canvas.addEventListener("pointermove", pointer, { passive: true });
  document.addEventListener("visibilitychange", sync);
  motion.addEventListener("change", sync);
  resize();
  return {
    ready: Promise.resolve(),
    setPaused(value: boolean) { paused=value; sync(); },
    dispose() {
      disposed=true; cancelAnimationFrame(frame); observer.disconnect(); sizes.disconnect();
      canvas.removeEventListener("pointermove",pointer); document.removeEventListener("visibilitychange",sync); motion.removeEventListener("change",sync);
      geometry.dispose(); material.dispose(); renderer.dispose();
    },
  };
}
