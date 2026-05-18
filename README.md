<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <title>Gece Yarışı - Yeni Seviye Sistemi + Dans Dansçı + Ballon d'Or + Dinamik Araba</title>
  <style>
    body { margin:0; overflow:hidden; font-family:Arial; background:#000011;}
    #menu,#gameover,#storeMenu,#countdownScreen,#celebrationScreen{
      position:absolute; inset:0; display:flex; justify-content:center; align-items:center;
      flex-direction:column; color:white; background:rgba(0,0,0,0.90); text-align:center; z-index:10;
    }
    #storeMenu{ z-index:35; }
    #countdownScreen{ z-index:25; background:rgba(0,0,0,0.55); }
    #celebrationScreen{ z-index:30; background:rgba(0,0,0,0.75); }
    button{ padding:14px 18px; font-size:18px; margin-top:10px; cursor:pointer; border-radius:10px; border:none;}
    .row{ display:flex; gap:14px; justify-content:center; align-items:center; flex-wrap:wrap; margin-top:10px;}
    .col{ display:flex; flex-direction:column; gap:6px; align-items:center; }
    label{ font-size:14px; opacity:0.9; }
    input[type="color"]{ width:110px; height:40px; cursor:pointer; border:none; background:transparent; }
    input[type="range"]{ width:280px; }

    #hud{
      position:absolute; top:10px; left:10px; color:white; font-size:15px; z-index:5;
      background:rgba(0,0,0,0.35); padding:10px 12px; border-radius:12px;
      min-width:420px; user-select:none;
    }

    #bars{ position:absolute; bottom:18px; left:50%; transform:translateX(-50%); z-index:5; width:240px;}
    .barWrap{ width:240px; height:18px; border:2px solid rgba(255,255,255,0.9); border-radius:10px; overflow:hidden; margin-top:8px;}
    #nitroFill{ width:100%; height:100%; background:#00ffff;}
    #driftFill{ width:100%; height:100%; background:#ff00ff;}
    .small{ opacity:0.85; font-size:14px; margin-top:6px;}

    #minimapWrap{
      position:absolute; left:10px; bottom:110px; z-index:6;
      background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.18);
      border-radius:14px; padding:10px; width:230px; user-select:none;
    }
    #minimapTitle{ font-size:13px; opacity:0.9; margin-bottom:6px; }
    #minimap{ width:210px; height:210px; border-radius:12px; background:rgba(0,0,0,0.55); display:block; }

    #rearViewWrap{
      position:absolute; right:10px; top:10px; z-index:6;
      background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.18);
      border-radius:14px; padding:8px; width:250px; user-select:none;
    }
    #rearTitle{ font-size:13px; opacity:0.9; margin-bottom:6px; text-align:left; }
    #rearHint{ font-size:12px; opacity:0.75; margin-top:6px; text-align:left; }

    #hitFlash{
      position:absolute; inset:0;
      background: radial-gradient(circle at center, rgba(255,70,70,0.0) 0%, rgba(255,0,0,0.55) 70%, rgba(255,0,0,0.85) 100%);
      opacity:0; transition: opacity 220ms ease;
      pointer-events:none; z-index:40; mix-blend-mode: screen;
    }

    #storeCard{
      width:min(720px, 92vw); max-height:min(82vh, 720px);
      background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15);
      border-radius:16px; padding:16px; box-shadow:0 10px 40px rgba(0,0,0,0.45);
      display:flex; flex-direction:column; gap:12px;
    }
    #storeHeader{ display:flex; justify-content:space-between; align-items:flex-start; gap:10px; }
    #storeHeader h2{ margin:0; font-size:22px; }
    #storeHeader .meta{ font-size:14px; opacity:0.85; text-align:left; }
    #storeList{
      overflow:auto; padding:10px; border-radius:12px;
      background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.12);
      text-align:left;
    }
    .storeItem{ display:flex; justify-content:space-between; align-items:center; gap:12px; padding:10px;
      border-bottom:1px solid rgba(255,255,255,0.08); }
    .storeItem:last-child{ border-bottom:none; }
    .storeLeft{ display:flex; flex-direction:column; gap:4px; }
    .storeTitle{ font-size:15px; }
    .storeSub{ font-size:12px; opacity:0.8; }
    .pill{
      display:inline-block; padding:2px 8px; border-radius:999px; font-size:12px;
      background:rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.12); margin-left:8px;
    }

    #countText{ font-size:64px; font-weight:800; letter-spacing:2px; text-shadow:0 10px 28px rgba(0,0,0,0.6); }
    #countSub{ margin-top:10px; font-size:16px; opacity:0.85; }
    
    #danceCanvas { display:block; margin:0 auto; width:300px; height:300px; }
    #ballonDor { font-size:120px; animation:spin 2s infinite; }
    @keyframes spin { 0% { transform:rotate(0deg); } 100% { transform:rotate(360deg); } }
  </style>
</head>
<body>

<div id="menu">
  <h1>Gece Yarışı - YENI SEVIYE SİSTEMİ</h1>
  <div class="small">⬅️➡️ şerit | ↑ 120 | ↓ 80 | Shift drift | Space nitro | ALT durdur</div>
  <div class="small" style="color:#ffff00; margin-top:6px;">🎯 HER LEVELDE ŞERİT VE ARABA ARTAR!</div>

  <div class="row" style="margin-top:14px;">
    <button onclick="startGame()">Başla</button>
    <button onclick="openStore()">Market</button>
  </div>

  <div class="row" style="margin-top:14px;">
    <div class="col">
      <label>Oyuncu (fallback renk)</label>
      <input type="color" id="colorPicker" value="#00ff00" />
    </div>
    <div class="col">
      <label>Trafik (fallback renk)</label>
      <input type="color" id="oncomingColorPicker" value="#ffd000" />
    </div>
    <div class="col">
      <label>Rakip (fallback renk)</label>
      <input type="color" id="rivalColorPicker" value="#00aaff" />
    </div>
  </div>

  <div class="row" style="margin-top:12px;">
    <button onclick="toggleMuteFromMenu()" id="muteBtnMenu">Sesi Kapat</button>
  </div>

  <div class="small" style="margin-top:8px; color:#00ff88;">
    ✨ 10 SEVIYE GEÇ = FUTBOL GOLÜ | 100 SEVIYE GEÇ = BALLON D'OR ✨
  </div>
</div>

<div id="countdownScreen" style="display:none;">
  <div id="countText">3</div>
  <div id="countSub">READY</div>
</div>

<div id="celebrationScreen" style="display:none;">
  <canvas id="danceCanvas"></canvas>
  <div id="celebrationText" style="font-size:32px; margin-top:20px; color:#ffff00;"></div>
</div>

<div id="gameover" style="display:none;">
  <h1 id="gameoverTitle">Kaybettin</h1>
  <p id="finalText"></p>
  <div class="row">
    <button onclick="restartGame()">Yeniden Başla</button>
    <button onclick="openStore()">Market</button>
  </div>
</div>

<div id="storeMenu" style="display:none;">
  <div id="storeCard">
    <div id="storeHeader">
      <div style="text-align:left;">
        <h2>Market</h2>
        <div class="meta">
          Altın: <b><span id="goldText">0</span></b>
          <span class="pill">Seviye: <span id="levelText">1</span></span>
          <span class="pill">Shield: <span id="shieldInvText">0</span></span>
        </div>
      </div>
      <div class="row" style="margin:0;">
        <button onclick="closeStore()" style="margin-top:0;">Kapat</button>
      </div>
    </div>

    <div id="storeList"></div>
    <div class="small">Ödül: yüzdelik dilim + toplanan coin. Satın aldıkların kaydedilir.</div>
  </div>
</div>

<div id="hud"></div>

<div id="rearViewWrap">
  <div id="rearTitle">Arka Görüş</div>
  <div class="small" id="rearHint">Polis burada görünür.</div>
</div>

<div id="minimapWrap">
  <div id="minimapTitle">Mini Harita</div>
  <canvas id="minimap" width="210" height="210"></canvas>
</div>

<div id="hitFlash"></div>

<div id="bars">
  <div class="barWrap"><div id="nitroFill"></div></div>
  <div class="barWrap"><div id="driftFill"></div></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/three@0.128/build/three.min.js"></script>
<script>
/* ===================== LEVEL SYSTEM ===================== */
let currentLevel = 1;
const LEVEL_CONFIG = {
  1: { target: 800, baseRivals: 5, rivalsIncrease: 0 },
  2: { target: 900, baseRivals: 6, rivalsIncrease: 1 },
  3: { target: 1000, baseRivals: 6, rivalsIncrease: 1 },
  4: { target: 1100, baseRivals: 7, rivalsIncrease: 2 },
  5: { target: 1200, baseRivals: 7, rivalsIncrease: 2 },
  6: { target: 1300, baseRivals: 8, rivalsIncrease: 3 },
  7: { target: 1400, baseRivals: 8, rivalsIncrease: 3 },
  8: { target: 1500, baseRivals: 9, rivalsIncrease: 4 },
  9: { target: 1600, baseRivals: 9, rivalsIncrease: 4 },
  10: { target: 1700, baseRivals: 10, rivalsIncrease: 5 },
};

/* ===================== PROFILE SAVE ===================== */
const SAVE_KEY = "nightRace_v4_levels_celebrations";
function defaultProfile(){ return { gold:0, level:1, nitroMax:100, driftMax:100, shieldInv:0, magnetLevel:0, speedBoost:0, handlingBoost:0, fuelTankLevel:0, crashResistance:0, radiusBoost:0, trafficSlower:0, ts:Date.now() }; }
function loadProfile(){ try{ const raw=localStorage.getItem(SAVE_KEY); if(!raw) return defaultProfile(); return Object.assign(defaultProfile(), JSON.parse(raw)); }catch(e){ return defaultProfile(); } }
function saveProfile(){ try{ profile.ts=Date.now(); localStorage.setItem(SAVE_KEY, JSON.stringify(profile)); }catch(e){} }
let profile = loadProfile();

/* ===================== GLOBALS ===================== */
let scene, camera, renderer, rearCamera;
let roadMesh=null, roadTex=null;

let playerCar;
let oncomingCars=[], rivals=[], policeCar=null;
let pickups=[];

let keys={}, inputBound=false;
let animating=false, lastTime=0;

let raceState="menu";
let countdownT=0;

let levelTargetM=1000, distanceM=0;

let playerColor="#00ff00", oncomingColor="#ffd000", rivalColor="#00aaff";
let rivalsCountSetting=5;

let isMuted=false;

let speedKmh=100, targetSpeedKmh=100;
const minSpeedKmh=80, maxSpeedKmh=120, cruiseSpeedKmh=100, accelSmoothing=0.06;

let nitro=100, driftLimit=100;

const POLICE_KMH=100;
const RIVAL_KMH=110;
const DISTANCE_PER_REAL_MPS_SCALE=0.25;

let rivalProgressM=[], rivalSlowT=[], rivalAiT=[];
let rankText="1/1", percentile=100;

let shieldActive=false;
let coinCollectedThisRun=0;
let pickupSpawnT=0;

const TRAFFIC_MULTIPLIER = 2.0;
let trafficSpawnT = 0;
let maxTrafficCap = 0;

const SAFE_SPAWN = {
  minXDist: 2.6,
  maxTries: 14,
  spawnZMin: 520,
  spawnZRand: 420,
  forbidNearZBand: 120
};

const hud = document.getElementById("hud");
const mini = document.getElementById("minimap");
const miniCtx = mini.getContext("2d");
const hitFlash = document.getElementById("hitFlash");
const rearWrap = document.getElementById("rearViewWrap");
const rearTitle = document.getElementById("rearTitle");

const MAX_ROAD_WIDTH = 72;
let laneCount=0, laneSpacing=0, roadWidth=MAX_ROAD_WIDTH, playerClampX=0, carScale=1;

function rebuildLaneSystem(){
  const cfg = LEVEL_CONFIG[currentLevel] || LEVEL_CONFIG[10];
  const totalCars = cfg.baseRivals + cfg.rivalsIncrease;
  laneCount = 3*totalCars - 2;
  roadWidth = MAX_ROAD_WIDTH;
  laneSpacing = roadWidth / Math.max(1,(laneCount-1));
  playerClampX = roadWidth/2 - 3.2;
  const baseCarWidth = 3.2;
  carScale = Math.min(1, Math.max(0.55, laneSpacing / baseCarWidth));
}

function lanesX(){
  const xs=[];
  const start = -((laneCount-1)/2) * laneSpacing;
  for(let i=0;i<laneCount;i++) xs.push(start + i*laneSpacing);
  return xs;
}

function occupiedLaneIndices(){
  const idx=[];
  for(let i=0;i<laneCount;i+=3) idx.push(i);
  return idx;
}

function createRoadTextureDynamic(lc){
  const c=document.createElement("canvas"); c.width=1024; c.height=2048;
  const ctx=c.getContext("2d");
  ctx.fillStyle="#15161a"; ctx.fillRect(0,0,c.width,c.height);

  for(let i=0;i<120000;i++){
    const x=Math.random()*c.width, y=Math.random()*c.height;
    const v=18+Math.random()*35, a=0.03+Math.random()*0.09;
    ctx.fillStyle=`rgba(${v},${v},${v+5},${a})`;
    ctx.fillRect(x,y,1,1);
  }
  for(let i=0;i<2200;i++){
    const x=Math.random()*c.width, y=Math.random()*c.height;
    const w=10+Math.random()*90, h=6+Math.random()*45;
    const a=0.03+Math.random()*0.08;
    ctx.fillStyle=`rgba(0,0,0,${a})`;
    ctx.fillRect(x,y,w,h);
  }

  const marginPx=Math.floor(c.width*0.10);
  const usableW=c.width - marginPx*2;

  ctx.fillStyle="rgba(235,235,235,0.75)";
  ctx.fillRect(marginPx-4,0,8,c.height);
  ctx.fillRect(marginPx+usableW-4,0,8,c.height);

  const laneWpx = usableW/lc;
  function drawDashedVertical(x, color, dashH=92, gap=68, lineW=6, alpha=0.55){
    for(let y=0;y<c.height;y+=(dashH+gap)){
      ctx.globalAlpha=alpha;
      ctx.fillStyle=color;
      ctx.fillRect(x-lineW/2,y,lineW,dashH);
    }
    ctx.globalAlpha=1;
  }
  for(let i=1;i<lc;i++){
    const x=marginPx+i*laneWpx;
    const isCenter=(i===Math.floor(lc/2));
    if(isCenter) drawDashedVertical(x,"rgba(255,230,120,1)",95,65,7,0.75);
    else drawDashedVertical(x,"rgba(235,235,235,1)",90,70,6,0.55);
  }

  ctx.fillStyle="rgba(255,255,255,0.25)";
  for(let y=0;y<c.height;y+=85){
    ctx.fillRect(marginPx+30,y+20,4,4);
    ctx.fillRect(marginPx+usableW-34,y+60,4,4);
  }

  const tex=new THREE.CanvasTexture(c);
  tex.wrapS=THREE.RepeatWrapping;
  tex.wrapT=THREE.RepeatWrapping;
  tex.repeat.set(1,18);
  tex.anisotropy=8;
  tex.needsUpdate=true;
  return tex;
}

const textureUrls = {
  player: "player.png",
  rival: "rival.png",
  traffic: "traffic.png",
  police: "police.png"
};
let textures = { player:null, rival:null, traffic:null, police:null };
let texturesReady = false;

function loadCarTextures(){
  return new Promise((resolve)=>{
    const loader = new THREE.TextureLoader();
    let remaining = 4;

    function done(){ remaining--; if(remaining<=0){ texturesReady=true; resolve(true); } }

    for(const k of ["player","rival","traffic","police"]){
      loader.load(textureUrls[k],
        (tex)=>{ tex.anisotropy=8; textures[k]=tex; done(); },
        undefined,
        ()=>{ textures[k]=null; done(); }
      );
    }
  });
}

function createCarSprite(kind, fallbackColor){
  if (textures[kind] && textures[kind].image){
    const tex = textures[kind];
    const imgW = tex.image.width || 256;
    const imgH = tex.image.height || 256;
    const aspect = imgW / imgH;

    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent:true });
    const spr = new THREE.Sprite(spriteMat);

    const baseH = 2.1 * carScale;
    const baseW = baseH * aspect;

    spr.scale.set(baseW, baseH, 1);
    spr.position.y = 1.15;

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2*carScale, 6.0*carScale),
      new THREE.MeshBasicMaterial({ color:0x000000, transparent:true, opacity:0.25 })
    );
    shadow.rotation.x = -Math.PI/2;
    shadow.position.y = 0.02;

    const g = new THREE.Group();
    g.add(shadow);
    g.add(spr);
    return g;
  }
  return createFallbackCar(fallbackColor);
}

function createFallbackCar(colorHex){
  const car = new THREE.Group();
  const paint = new THREE.MeshPhongMaterial({ color: colorHex, shininess: 140, specular:0x555555 });
  const black = new THREE.MeshPhongMaterial({ color:0x111111, shininess:35 });
  const glass = new THREE.MeshPhongMaterial({ color:0xffffff, transparent:true, opacity:0.5 });

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.45, 5.6), paint);
  base.position.y = 0.34; car.add(base);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.55, 2.0), glass);
  cabin.position.set(0,0.95,0.2); car.add(cabin);
  const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.7,0.18,0.8), black);
  bumper.position.set(0,0.24,2.45); car.add(bumper);

  function wheel(x,z){
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.32, 18), black);
    w.rotation.z = Math.PI/2;
    w.position.set(x, 0.22, z);
    return w;
  }
  car.add(wheel(1.05, 1.75));
  car.add(wheel(-1.05, 1.75));
  car.add(wheel(1.05, -1.85));
  car.add(wheel(-1.05, -1.85));

  car.scale.set(carScale,carScale,carScale);
  return car;
}

const rivalCountRange=document.getElementById("rivalCountRange");
const rivalCountLabel=document.getElementById("rivalCountLabel");

if(rivalCountRange){
  rivalCountRange.addEventListener("input", e=>{
    rivalsCountSetting = Math.max(5, parseInt(e.target.value,10));
    rivalCountLabel.textContent = rivalsCountSetting;
  });
}

document.getElementById("colorPicker").addEventListener("change", e=> playerColor=e.target.value);
document.getElementById("oncomingColorPicker").addEventListener("change", e=> oncomingColor=e.target.value);
document.getElementById("rivalColorPicker").addEventListener("change", e=> rivalColor=e.target.value);

window.addEventListener("load", ()=>{
  updateMuteButtons();
  renderStoreList();
});

let motorAudio, driftAudio;
try{ motorAudio=new Audio('motor.mp3'); motorAudio.loop=true; motorAudio.volume=0.18;
     driftAudio=new Audio('drift.mp3'); driftAudio.loop=true; driftAudio.volume=0.22; }catch(e){}
function toggleMuteFromMenu(){ toggleMute(); }
function toggleMute(){
  isMuted=!isMuted;
  if(motorAudio) motorAudio.muted=isMuted;
  if(driftAudio) driftAudio.muted=isMuted;
  updateMuteButtons();
}
function updateMuteButtons(){
  const text=isMuted ? "Sesi Aç" : "Sesi Kapat";
  const btn=document.getElementById("muteBtnMenu");
  if(btn) btn.textContent=text;
}

function showCountdown(){
  raceState="countdown"; countdownT=0;
  document.getElementById("countdownScreen").style.display="flex";
  setCountdownText("3","READY");
}
function setCountdownText(main,sub){
  document.getElementById("countText").textContent=main;
  document.getElementById("countSub").textContent=sub;
}
function hideCountdown(){ document.getElementById("countdownScreen").style.display="none"; }

function openStore(){ raceState="store"; document.getElementById("storeMenu").style.display="flex"; renderStoreList(); }
function closeStore(){ document.getElementById("storeMenu").style.display="none"; if(document.getElementById("menu").style.display!=="none") raceState="menu"; }

/* ===================== DANCE ANIMATIONS (10 DANSA) ===================== */
const dances = [
  { name: "Fortnite Emote", draw: drawFortniteDance },
  { name: "Robot Hareket", draw: drawRobotDance },
  { name: "Ruh Ayrılma", draw: drawSpiritDance },
  { name: "Beyaz Hareket", draw: drawWhiteDance },
  { name: "Kıızırma", draw: drawSpinDance },
  { name: "Sallama", draw: drawWaveDance },
  { name: "Oturma Yükseliş", draw: drawJacksonDance },
  { name: "Floss Dans", draw: drawFlossDance },
  { name: "Yıl Sonu Kutlaması", draw: drawCelebrationDance },
  { name: "Futbol Sevinç", draw: drawFootballCelebration }
];

function drawFortniteDance(ctx, x, y, t){
  ctx.fillStyle="rgba(50,200,255,0.8)"; ctx.fillRect(x-25,y-60,50,120);
  ctx.fillStyle="rgba(200,50,255,0.8)"; ctx.fillRect(x-15,y-40+Math.sin(t*6)*10,30,80);
  ctx.fillStyle="rgba(255,150,0,1)"; ctx.beginPath(); ctx.arc(x,y-70,15,0,Math.PI*2); ctx.fill();
}

function drawRobotDance(ctx, x, y, t){
  const bx = Math.sin(t*8)*8;
  ctx.strokeStyle="rgba(150,150,150,0.9)"; ctx.lineWidth=6;
  ctx.beginPath(); ctx.moveTo(x-30+bx,y-60); ctx.lineTo(x-20,y+40); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x+30-bx,y-60); ctx.lineTo(x+20,y+40); ctx.stroke();
  ctx.fillStyle="rgba(200,200,0,0.9)"; ctx.fillRect(x-20,y-70,40,15);
}

function drawRuhAyrılma(ctx, x, y, t){
  const a = Math.sin(t*4)*0.3;
  ctx.globalAlpha=0.6+Math.cos(t*5)*0.4;
  ctx.fillStyle="rgba(200,100,255,0.8)"; ctx.fillRect(x-25+Math.sin(t*6)*15,y-60,50,100);
  ctx.globalAlpha=1;
}

function drawSpiritDance(ctx, x, y, t){
  ctx.fillStyle="rgba(100,255,100,0.7)";
  for(let i=0;i<4;i++){
    const angle = (t*4 + i*Math.PI/2);
    const px = x + Math.cos(angle)*30;
    const py = y - 40 + Math.sin(angle)*20;
    ctx.beginPath(); ctx.arc(px,py,10,0,Math.PI*2); ctx.fill();
  }
}

function drawWhiteDance(ctx, x, y, t){
  ctx.fillStyle="rgba(255,255,255,0.8)"; ctx.fillRect(x-20,y-60,40,120);
  ctx.fillStyle="rgba(0,0,0,0.9)"; ctx.fillRect(x-5,y-50+Math.cos(t*5)*5,10,10);
  ctx.fillRect(x-5,y+20+Math.cos(t*5)*5,10,10);
}

function drawSpinDance(ctx, x, y, t){
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(t*8);
  ctx.fillStyle="rgba(255,100,50,0.8)"; ctx.fillRect(-25,-60,50,120);
  ctx.restore();
}

function drawWaveDance(ctx, x, y, t){
  ctx.fillStyle="rgba(50,150,255,0.8)";
  for(let i=0;i<5;i++){
    const yOffset = Math.sin(t*4 - i*0.5)*15;
    ctx.fillRect(x-20+i*10,y-50+yOffset,8,80);
  }
}

function drawJacksonDance(ctx, x, y, t){
  const lean = Math.sin(t*3)*15;
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(lean*Math.PI/180);
  ctx.fillStyle="rgba(0,0,0,0.8)"; ctx.fillRect(-25,-60,50,120);
  ctx.fillStyle="rgba(255,255,255,0.8)"; ctx.fillRect(-5,-55,10,15);
  ctx.restore();
}

function drawFlossDance(ctx, x, y, t){
  const armL = Math.cos(t*6)*30;
  const armR = Math.cos(t*6+Math.PI)*30;
  ctx.strokeStyle="rgba(150,100,255,0.8)"; ctx.lineWidth=8;
  ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-20+armL,y-30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+20+armR,y-30); ctx.stroke();
  ctx.fillStyle="rgba(255,200,0,0.8)"; ctx.fillRect(x-25,y+20,50,30);
}

function drawCelebrationDance(ctx, x, y, t){
  ctx.fillStyle="rgba(0,255,0,0.8)"; ctx.fillRect(x-25,y-60,50,120);
  ctx.fillStyle="rgba(255,0,0,0.8)"; ctx.fillRect(x-15,y-40+Math.sin(t*5)*10,30,80);
  for(let i=0;i<8;i++){
    const a = (i/8)*Math.PI*2 + t*4;
    const px = x + Math.cos(a)*40;
    const py = y - 30 + Math.sin(a)*30;
    ctx.fillStyle=`rgba(${Math.sin(t+i)*128+128},${Math.cos(t+i)*128+128},255,0.6)`;
    ctx.beginPath(); ctx.arc(px,py,5,0,Math.PI*2); ctx.fill();
  }
}

function drawFootballCelebration(ctx, x, y, t){
  ctx.fillStyle="rgba(255,200,0,0.9)";
  ctx.beginPath(); ctx.arc(x,y-70,20,0,Math.PI*2); ctx.fill(); // ball
  ctx.fillStyle="rgba(255,0,0,0.8)"; ctx.fillRect(x-25,y-40+Math.sin(t*6)*15,50,100);
  ctx.fillStyle="rgba(255,255,255,0.8)"; ctx.beginPath(); ctx.arc(x-5,y-30,8,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+5,y-30,8,0,Math.PI*2); ctx.fill();
}

function showCelebration(isFootballGoal){
  raceState="celebration";
  const celScreen = document.getElementById("celebrationScreen");
  celScreen.style.display="flex";
  
  const canvas = document.getElementById("danceCanvas");
  const ctx = canvas.getContext("2d");
  const text = document.getElementById("celebrationText");
  
  let celebT=0;
  const danceIdx = isFootballGoal ? 9 : Math.floor(Math.random()*10);
  const dance = dances[danceIdx];
  
  const celebAnimate = () => {
    celebT+=0.016;
    ctx.fillStyle="rgba(0,0,0,0.2)"; ctx.fillRect(0,0,300,300);
    dance.draw(ctx, 150, 150, celebT);
    text.textContent = dance.name;
    
    if(celebT<2.5) requestAnimationFrame(celebAnimate);
    else {
      celScreen.style.display="none";
      if(!isFootballGoal) startNextLevel();
      else handleFootballGoal();
    }
  };
  celebAnimate();
}

function handleFootballGoal(){
  alert("⚽ FUTBOL GOLÜ! 10. SEVİYEYE ULAŞTIN! ⚽");
  startNextLevel();
}

function startNextLevel(){
  currentLevel++;
  profile.level = currentLevel;
  saveProfile();
  
  if(currentLevel===100){
    showBallonDor();
  } else {
    init();
  }
}

function showBallonDor(){
  alert("🏆 BALLON D'OR ÖDÜLÜ KAZANDIN! 100. SEVIYEYE ULAŞTINIZ! 🏆\n\nTebrikler!!");
  currentLevel = 1;
  profile.level = 1;
  profile.gold += 10000;
  saveProfile();
  location.reload();
}

function renderStoreList(){
  profile=loadProfile();
  currentLevel = profile.level;
  document.getElementById("goldText").textContent=profile.gold;
  document.getElementById("levelText").textContent=profile.level;
  document.getElementById("shieldInvText").textContent=profile.shieldInv;

  const list=document.getElementById("storeList");
  list.innerHTML="";

  const items=[
    { title:"Kalkan (1 kullanım)", sub:"Yarışta 1 çarpışmayı emer.", price:30,
      canBuy:()=>true, buy:()=>{ profile.shieldInv+=1; } },
    { title:"Hız Artışı +15 km/h", sub:"En yüksek hız artar. (max 180)", price:75,
      canBuy:()=>profile.speedBoost<80, buy:()=>{ profile.speedBoost=Math.min(80, profile.speedBoost+15); } },
    { title:"Nitro Tank +20", sub:"Nitro maksimumu artar. (max 200)", price:65,
      canBuy:()=>profile.nitroMax<200, buy:()=>{ profile.nitroMax=Math.min(200, profile.nitroMax+20); } },
    { title:"Drift Limit +20", sub:"Drift maksimumu artar. (max 200)", price:65,
      canBuy:()=>profile.driftMax<200, buy:()=>{ profile.driftMax=Math.min(200, profile.driftMax+20); } },
    { title:"Mıknatıs Seviye +1", sub:"Coin çekme mesafesi artar. (max 5)", price:90,
      canBuy:()=>profile.magnetLevel<5, buy:()=>{ profile.magnetLevel+=1; } },
    { title:"Handling Upgrade", sub:"Daha iyi oto dönüş. (max 5)", price:80,
      canBuy:()=>profile.handlingBoost<5, buy:()=>{ profile.handlingBoost+=1; } },
    { title:"Yakıt Deposu +1", sub:"Daha uzun mesafeye çık. (max 5)", price:85,
      canBuy:()=>profile.fuelTankLevel<5, buy:()=>{ profile.fuelTankLevel+=1; } },
    { title:"Çarpışma Direnci", sub:"Hasar daha az. (max 3)", price:95,
      canBuy:()=>profile.crashResistance<3, buy:()=>{ profile.crashResistance+=1; } },
    { title:"Çekim Yarıçapı Genişlet", sub:"Coin çekim alanı büyüyor. (max 4)", price:70,
      canBuy:()=>profile.radiusBoost<4, buy:()=>{ profile.radiusBoost+=1; } },
    { title:"Trafik Yavaşlat", sub:"Trafikler daha yavaş hareket eder. (max 3)", price:100,
      canBuy:()=>profile.trafficSlower<3, buy:()=>{ profile.trafficSlower+=1; } },
  ];

  for(const it of items){
    const row=document.createElement("div"); row.className="storeItem";
    const left=document.createElement("div"); left.className="storeLeft";
    const t=document.createElement("div"); t.className="storeTitle"; t.textContent=it.title;
    const s=document.createElement("div"); s.className="storeSub"; s.textContent=`${it.sub}  Fiyat: ${it.price} altın`;
    left.appendChild(t); left.appendChild(s);

    const btn=document.createElement("button"); btn.textContent="Satın Al"; btn.style.marginTop="0";
    btn.disabled = !it.canBuy() || profile.gold < it.price;
    btn.onclick=()=>{
      profile=loadProfile();
      if(profile.gold<it.price) return;
      if(!it.canBuy()) return;
      profile.gold -= it.price;
      it.buy();
      saveProfile();
      renderStoreList();
    };

    row.appendChild(left); row.appendChild(btn); list.appendChild(row);
  }
}

function startGame(){
  document.getElementById("menu").style.display="none";
  init();
  if(motorAudio && !isMuted) motorAudio.play().catch(()=>{});
  if(!animating){
    animating=true;
    lastTime=performance.now();
    requestAnimationFrame(animate);
  }
}

async function init(){
  profile=loadProfile();
  currentLevel = profile.level;
  rebuildLaneSystem();

  const cfg = LEVEL_CONFIG[currentLevel] || LEVEL_CONFIG[10];
  levelTargetM = cfg.target;
  rivalsCountSetting = cfg.baseRivals + cfg.rivalsIncrease;

  maxTrafficCap = Math.floor(Math.max(24, laneCount * 3.2 * TRAFFIC_MULTIPLIER));
  trafficSpawnT = 0.4;

  if(!scene){
    scene=new THREE.Scene();
    scene.background=new THREE.Color(0x000011);

    camera=new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 3000);
    camera.position.set(0, 8.5, 38);

    rearCamera=new THREE.PerspectiveCamera(75, 230/150, 0.1, 3000);

    renderer=new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio||1));
    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.DirectionalLight(0xffffff, 1.25));
    scene.add(new THREE.AmbientLight(0x202020));

    window.addEventListener("resize", ()=>{
      camera.aspect=window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    if(!inputBound){
      document.addEventListener("keydown", e=> keys[e.key]=true);
      document.addEventListener("keyup", e=> keys[e.key]=false);
      inputBound=true;
    }
  }

  clearAll();

  if(!texturesReady){
    await loadCarTextures();
  }

  if(roadMesh) scene.remove(roadMesh);
  roadTex = createRoadTextureDynamic(laneCount);
  const roadMat=new THREE.MeshPhongMaterial({ map:roadTex, shininess:12, specular:0x222222 });
  roadMesh=new THREE.Mesh(new THREE.PlaneGeometry(MAX_ROAD_WIDTH, 3000), roadMat);
  roadMesh.rotation.x=-Math.PI/2;
  roadMesh.position.z=-1400;
  scene.add(roadMesh);

  nitro=profile.nitroMax;
  driftLimit=profile.driftMax;
  coinCollectedThisRun=0;
  shieldActive=false;

  if(profile.shieldInv>0){
    profile.shieldInv-=1; shieldActive=true; saveProfile();
  }

  const xs=lanesX();
  const occ=occupiedLaneIndices();
  const playerOccIndex=Math.floor(occ.length/2);
  const playerLaneIndex=occ[playerOccIndex];

  playerCar = createCarSprite("player", playerColor);
  playerCar.position.set(xs[playerLaneIndex], 0, 20);
  scene.add(playerCar);

  spawnActors(playerLaneIndex);
  showCountdown();
}

function clearAll(){
  oncomingCars.forEach(c=>scene.remove(c));
  rivals.forEach(r=>scene.remove(r));
  pickups.forEach(p=>scene.remove(p.mesh));
  if(policeCar) scene.remove(policeCar);

  oncomingCars=[]; rivals=[]; pickups=[]; policeCar=null;
  rivalProgressM=[]; rivalSlowT=[]; rivalAiT=[];
  distanceM=0; speedKmh=100; targetSpeedKmh=100;
  pickupSpawnT=0;
  trafficSpawnT=0.4;
  if(hitFlash) hitFlash.style.opacity="0";
}

function pickSafeTrafficX(){
  const xs = lanesX();
  const playerX = playerCar ? playerCar.position.x : 0;

  let chosen = xs[Math.floor(Math.random()*laneCount)];
  let ok = false;

  for(let k=0;k<SAFE_SPAWN.maxTries;k++){
    const laneIdx = Math.floor(Math.random()*laneCount);
    const x = xs[laneIdx] + (Math.random()-0.5)*0.6;

    const minDist = SAFE_SPAWN.minXDist * carScale;
    if(Math.abs(x - playerX) >= minDist){
      chosen = x;
      ok = true;
      break;
    }
  }

  if(!ok){
    let bestX = xs[0], bestD = -1;
    for(let i=0;i<xs.length;i++){
      const d = Math.abs(xs[i] - playerX);
      if(d > bestD){ bestD = d; bestX = xs[i]; }
    }
    chosen = bestX;
  }

  return chosen;
}

function pickSafeSpawnZ(){
  const far = SAFE_SPAWN.spawnZMin + Math.random()*SAFE_SPAWN.spawnZRand;
  return -far;
}

function applySafeRespawn(obj){
  obj.position.x = pickSafeTrafficX();
  obj.position.z = pickSafeSpawnZ();

  if(playerCar){
    const dz = Math.abs(obj.position.z - playerCar.position.z);
    if(dz < SAFE_SPAWN.forbidNearZBand){
      obj.position.z = pickSafeSpawnZ();
    }
  }
}

function spawnTrafficCar(){
  const t = createCarSprite("traffic", oncomingColor);
  t.userData.type="traffic";

  applySafeRespawn(t);

  scene.add(t);
  oncomingCars.push(t);
}

function spawnActors(playerLaneIndex){
  const xs=lanesX();
  const occ=occupiedLaneIndices();

  const trafficCount = Math.max(22, Math.floor(laneCount*1.25*TRAFFIC_MULTIPLIER));
  for(let i=0;i<trafficCount;i++){
    spawnTrafficCar();
  }

  let rivalPlaced=0;
  for(let j=0;j<occ.length;j++){
    const laneIdx=occ[j];
    if(laneIdx===playerLaneIndex) continue;
    if(rivalPlaced>=rivalsCountSetting) break;

    const r = createCarSprite("rival", rivalColor);
    r.userData.type="rival";
    r.position.x = xs[laneIdx] + (Math.random()-0.5)*0.25;
    r.position.z = 12;
    scene.add(r);
    rivals.push(r);

    rivalProgressM.push(0);
    rivalSlowT.push(0);
    rivalAiT.push(Math.random()*10);
    rivalPlaced++;
  }

  const p = createCarSprite("police", 0xffffff);
  p.userData.type="police";
  p.position.x = playerCar.position.x;
  p.position.z = 135;
  scene.add(p);
  policeCar=p;

  for(let i=0;i<Math.max(8, Math.floor(laneCount*0.30));i++){
    spawnPickup(Math.random()<0.75 ? "coin" : "shield");
  }
}

function createPickupMesh(type){
  let geom, mat;
  if(type==="coin"){
    geom=new THREE.TorusGeometry(0.55,0.20,12,18);
    mat=new THREE.MeshPhongMaterial({ color:0xffd34d, emissive:0x332200, shininess:120 });
  }else{
    geom=new THREE.IcosahedronGeometry(0.55,0);
    mat=new THREE.MeshPhongMaterial({ color:0x55ddff, emissive:0x001a22, shininess:140, transparent:true, opacity:0.9 });
  }
  const m=new THREE.Mesh(geom, mat);
  m.scale.set(carScale,carScale,carScale);
  return m;
}

function spawnPickup(type){
  const mesh=createPickupMesh(type);
  mesh.userData.type="pickup";
  mesh.userData.pickType=type;

  const xs=lanesX();
  const laneIdx=Math.floor(Math.random()*laneCount);
  mesh.position.x=xs[laneIdx] + (Math.random()-0.5)*0.6;
  mesh.position.y=0.8;
  mesh.position.z=-Math.random()*650 - 200;

  scene.add(mesh);
  pickups.push({mesh,type});
}

function boxHit(a,b,zx=2.0,zz=3.0){
  return Math.abs(a.position.x-b.position.x) < zx*carScale && Math.abs(a.position.z-b.position.z) < zz*carScale;
}

function flashHit(){
  hitFlash.style.opacity="0.75";
  setTimeout(()=> hitFlash.style.opacity="0", 80);
}

function computeRanking(){
  const total=rivals.length+1;
  let ahead=0;
  for(let i=0;i<rivalProgressM.length;i++){
    if(rivalProgressM[i] > distanceM) ahead++;
  }
  const rank=1+ahead;
  rankText=`${rank}/${total}`;
  percentile = (total<=1) ? 100 : Math.round(100*(1-(rank-1)/(total-1)));
  return {rank,total,percentile};
}

function rewardGoldOnFinish(){
  profile=loadProfile();
  const {rank,total,percentile:pct}=computeRanking();
  const base=5+Math.round((pct/100)*25);
  const coinReward=Math.round(coinCollectedThisRun * 1.0);
  const totalReward=base+coinReward;
  profile.gold += totalReward;
  profile.level = currentLevel;
  saveProfile();
  return {rank,total,pct,base,coinReward,totalReward};
}

function drawMiniMap(){
  const ctx=miniCtx, w=mini.width, h=mini.height;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="rgba(0,0,0,0.45)"; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle="rgba(255,255,255,0.18)"; ctx.lineWidth=2;
  ctx.strokeRect(12,12,w-24,h-24);

  function yOf(progress){
    const t=Math.max(0,Math.min(1,progress/levelTargetM));
    return (h-18) - t*(h-36);
  }

  const py=yOf(distanceM);
  ctx.fillStyle="rgba(0,255,170,0.95)";
  ctx.beginPath(); ctx.arc(w/2,py,6,0,Math.PI*2); ctx.fill();

  for(let i=0;i<rivalProgressM.length;i++){
    const ry=yOf(rivalProgressM[i]);
    ctx.fillStyle="rgba(0,170,255,0.9)";
    ctx.fillRect(w/2-30+(i%7)*10, ry-4, 7, 7);
  }

  if(policeCar){
    const gap=policeCar.position.z - playerCar.position.z;
    const normalized=Math.max(0,Math.min(1,(gap-20)/220));
    const by=py + 12 + normalized*24;
    ctx.fillStyle="rgba(255,80,80,0.95)";
    ctx.beginPath(); ctx.arc(w/2, Math.min(h-18,by), 5,0,Math.PI*2); ctx.fill();
  }

  ctx.fillStyle="rgba(255,255,255,0.7)";
  ctx.font="12px Arial";
  ctx.fillText(`L${currentLevel} Sıra ${rankText} (%${percentile})`, 18, 26);
  ctx.fillText(`Şerit: ${laneCount}`, 18, 44);
  ctx.fillText(`Yol: MAX ${MAX_ROAD_WIDTH}`, 18, 62);
}

function gameOver(title,text){
  raceState="gameover";
  if(motorAudio) motorAudio.pause();
  if(driftAudio){ driftAudio.pause(); driftAudio.currentTime=0; }
  document.getElementById("gameoverTitle").textContent=title;
  document.getElementById("finalText").textContent=text;
  document.getElementById("gameover").style.display="flex";
}

function restartGame(){ location.reload(); }

function renderTwoViews(){
  renderer.setScissorTest(false);
  renderer.setViewport(0,0, window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  const rect=rearWrap.getBoundingClientRect();
  const pad=8;
  const w=Math.max(120, Math.floor(rect.width - pad*2));
  const h=Math.max(90, Math.floor(rect.width*0.62));
  rearWrap.style.height = (h+44)+"px";

  rearCamera.aspect=w/h;
  rearCamera.updateProjectionMatrix();
  rearCamera.position.set(playerCar.position.x, 7.0, 28);
  rearCamera.lookAt(new THREE.Vector3(playerCar.position.x, 1.2, playerCar.position.z + 180));

  const x=Math.floor(window.innerWidth - rect.width + pad);
  const y=Math.floor(window.innerHeight - rect.bottom + pad);

  renderer.setScissorTest(true);
  renderer.setScissor(x,y,w,h);
  renderer.setViewport(x,y,w,h);
  renderer.render(scene, rearCamera);
  renderer.setScissorTest(false);

  rearTitle.textContent="Arka Görüş";
}

function animate(t){
  requestAnimationFrame(animate);
  const dt=Math.min(0.05,(t-lastTime)/1000);
  lastTime=t;

  if(!renderer||!scene||!camera) return;

  if(raceState==="countdown"){
    countdownT+=dt;
    if(countdownT<1.0) setCountdownText("3","READY");
    else if(countdownT<2.0) setCountdownText("2","READY");
    else if(countdownT<3.0) setCountdownText("1","READY");
    else if(countdownT<3.8) setCountdownText("READY","GO");
    else { hideCountdown(); raceState="running"; }
  }

  if(raceState!=="running"){
    renderTwoViews();
    drawMiniMap();
    return;
  }

  if(keys["ArrowUp"]) targetSpeedKmh=maxSpeedKmh;
  else if(keys["ArrowDown"]) targetSpeedKmh=minSpeedKmh;
  else targetSpeedKmh=cruiseSpeedKmh;

  speedKmh += (targetSpeedKmh-speedKmh)*accelSmoothing;
  speedKmh = Math.max(minSpeedKmh, Math.min(maxSpeedKmh, speedKmh));

  const drifting = keys["Shift"] && driftLimit>0;
  const nitroActive = keys[" "] && nitro>0;

  const nitroMax=profile.nitroMax;
  const driftMax=profile.driftMax;

  if(drifting) driftLimit=Math.max(0, driftLimit-22*dt);
  else driftLimit=Math.min(driftMax, driftLimit+12*dt);

  if(nitroActive) nitro=Math.max(0, nitro-28*dt);
  else nitro=Math.min(nitroMax, nitro+10*dt);

  const steer=10*dt;
  if(keys["ArrowLeft"]) playerCar.position.x -= steer;
  if(keys["ArrowRight"]) playerCar.position.x += steer;
  playerCar.position.x = Math.max(-playerClampX, Math.min(playerClampX, playerCar.position.x));

  let worldSpeed=(speedKmh/200);
  if(drifting) worldSpeed*=1.25;
  if(nitroActive) worldSpeed*=1.9;

  let effectiveKmh=speedKmh;
  if(drifting) effectiveKmh*=1.15;
  if(nitroActive) effectiveKmh*=1.5;

  const mps=(effectiveKmh/3.6)*DISTANCE_PER_REAL_MPS_SCALE;
  distanceM += mps*dt;

  if(roadTex) roadTex.offset.y -= (worldSpeed*0.18)*dt;

  trafficSpawnT -= dt;
  if(trafficSpawnT <= 0){
    if(oncomingCars.length < maxTrafficCap){
      spawnTrafficCar();
      if(oncomingCars.length < maxTrafficCap && Math.random() < 0.55) spawnTrafficCar();
    }
    trafficSpawnT = 0.65 + Math.random()*0.85;
  }

  for(const c of oncomingCars){
    c.position.z += worldSpeed*120*dt * (1 - profile.trafficSlower*0.1);

    if(boxHit(c,playerCar,2.0,3.0)){
      if(shieldActive){
        shieldActive=false;
        flashHit();
        applySafeRespawn(c);
      } else {
        const {rank,total,percentile:pct}=computeRanking();
        flashHit();
        gameOver("Kaza Yaptın", `Trafiğe çarptın! L${currentLevel} | Sıra: ${rank}/${total} (%${pct}) | Coin: ${coinCollectedThisRun}`);
        return;
      }
    }

    if(c.position.z > 150){
      applySafeRespawn(c);
    }
  }

  pickupSpawnT -= dt;
  if(pickupSpawnT<=0){
    spawnPickup(Math.random()<0.75 ? "coin" : "shield");
    pickupSpawnT = 1.6 + Math.random()*1.9;
  }
  const magnetRadius = (2.2 + profile.magnetLevel*1.3 + profile.radiusBoost*0.8) * (carScale<0.75 ? 1.2 : 1.0);

  for(let i=pickups.length-1;i>=0;i--){
    const p=pickups[i];
    p.mesh.rotation.y += dt*2.2;
    p.mesh.position.z += worldSpeed*120*dt;

    if(p.type==="coin"){
      const dx=playerCar.position.x - p.mesh.position.x;
      const dz=playerCar.position.z - p.mesh.position.z;
      const d=Math.sqrt(dx*dx + dz*dz);
      if(d<magnetRadius) p.mesh.position.x += dx*dt*2.6;
    }

    if(boxHit(p.mesh,playerCar,1.7,2.6)){
      if(p.type==="coin") coinCollectedThisRun += 1;
      else shieldActive = true;
      scene.remove(p.mesh);
      pickups.splice(i,1);
      continue;
    }

    if(p.mesh.position.z > 180){
      scene.remove(p.mesh);
      pickups.splice(i,1);
    }
  }

  for(let i=0;i<rivals.length;i++){
    const r=rivals[i];
    rivalAiT[i]+=dt;

    let rk=RIVAL_KMH;
    if(rivalSlowT[i]>0){ rivalSlowT[i]-=dt; rk*=0.72; }
    rk *= (0.98 + 0.04*Math.sin(rivalAiT[i]*0.9 + i));

    const rivalMps=(rk/3.6)*DISTANCE_PER_REAL_MPS_SCALE;
    rivalProgressM[i] += rivalMps*dt;

    const dzMeters=(rivalProgressM[i]-distanceM);
    const zTarget=20 - dzMeters*0.35;
    r.position.z += (zTarget-r.position.z)*0.06;

    for(const tcar of oncomingCars){
      if(boxHit(r,tcar,2.0,3.0)){
        rivalSlowT[i]=Math.max(rivalSlowT[i],1.1);
        r.position.x += (Math.random()<0.5?-1:1)*laneSpacing*1.2;
        applySafeRespawn(tcar);
        break;
      }
    }

    if(boxHit(r,playerCar,2.1,3.2)){
      if(shieldActive){
        shieldActive=false;
        flashHit();
        r.position.z -= 10;
        r.position.x += (Math.random()<0.5?-1:1)*laneSpacing*1.6;
      } else {
        const {rank,total,percentile:pct}=computeRanking();
        flashHit();
        gameOver("Kaza Yaptın", `Rakibe çarptın! L${currentLevel} | Sıra: ${rank}/${total} (%${pct}) | Coin: ${coinCollectedThisRun}`);
        return;
      }
    }
  }

  if(policeCar){
    policeCar.position.x += (playerCar.position.x - policeCar.position.x)*0.04;

    const playerWorld=(effectiveKmh/200);
    const policeWorld=(POLICE_KMH/200);
    const rel=(policeWorld - playerWorld)*120*dt;
    policeCar.position.z -= rel;
    policeCar.position.z = Math.max(28, Math.min(220, policeCar.position.z));

    if(policeCar.position.z < 34){
      if(shieldActive){
        shieldActive=false; policeCar.position.z=90; flashHit();
      }else{
        const {rank,total,percentile:pct}=computeRanking();
        gameOver("Polis Yakaladı", `L${currentLevel} | Sıra: ${rank}/${total} (%${pct}) | Coin: ${coinCollectedThisRun}`);
        return;
      }
    }
  }

  computeRanking();

  if(distanceM >= levelTargetM){
    const reward=rewardGoldOnFinish();
    
    if(currentLevel===10 || currentLevel===100){
      showCelebration(currentLevel===10);
      return;
    }
    
    currentLevel++;
    document.getElementById("menu").style.display="flex";
    openStore();
    alert(
      `Seviye ${currentLevel-1} Tamamlandı!\nSıra: ${reward.rank}/${reward.total} (%${reward.pct})\n`+
      `Ödül: ${reward.base} + Coin: ${reward.coinReward} = ${reward.totalReward} altın\n`+
      `Şerit: ${laneCount} | Araba: ${rivalsCountSetting}`
    );
    raceState="menu";
    return;
  }

  camera.position.x = playerCar.position.x;
  camera.position.y = 8.5;
  camera.position.z = 38;
  camera.lookAt(new THREE.Vector3(playerCar.position.x, 1.2, playerCar.position.z - 110));

  hud.innerHTML =
    `<span style="color:#ffff00;">SEVIYE ${currentLevel}</span><br>`+
    `Mesafe: ${Math.floor(distanceM)} / ${levelTargetM} m<br>`+
    `Hız: ${Math.floor(speedKmh)} km/h<br>`+
    `Nitro: ${Math.floor(nitro)} / ${profile.nitroMax}<br>`+
    `Drift: ${Math.floor(driftLimit)} / ${profile.driftMax}<br>`+
    `Trafik: ${oncomingCars.length} / ${maxTrafficCap}<br>`+
    `Rakip: ${rivals.length} | Şerit: ${laneCount}<br>`+
    `Sıra: ${rankText} (%${percentile})<br>`+
    `Coin: ${coinCollectedThisRun} | Altın: ${profile.gold}<br>`+
    `Kalkan: ${shieldActive ? "✅ Aktif" : "❌ Yok"}`;

  document.getElementById("nitroFill").style.width = ((nitro/profile.nitroMax)*240)+"px";
  document.getElementById("driftFill").style.width = ((driftLimit/profile.driftMax)*240)+"px";

  renderTwoViews();
  drawMiniMap();
}

</script>
</body>
</html>