import * as THREE from 'three';
import {CONFIG,rand,choose} from './core.js';
const B={grass:0x5d7547,dirt:0x79583d,stone:0x686d70,wood:0x78543a,leaf:0x2e6337,water:0x3d7fa8,ore:0xa6a8ad,glow:0xffb347};
export class VoxelWorld{constructor(THREE,scene,seed){this.T=THREE;this.scene=scene;this.seed=seed;this.size=CONFIG.world.size;this.block=CONFIG.world.block;this.map=new Map();this.meshes=[];this.materials=new Map();this.rng=seed%2147483647||1}noise(x,z){let n=(x*374761393+z*668265263+this.seed*69069)|0;n=(n^(n>>13))*1274126177;return ((n^(n>>16))>>>0)/4294967295}key(x,y,z){return `${x}|${y}|${z}`}set(x,y,z,type){this.map.set(this.key(x,y,z),type)}get(x,y,z){return this.map.get(this.key(x,y,z))||null}material(type){if(!this.materials.has(type))this.materials.set(type,new this.T.MeshLambertMaterial({color:B[type]??0xffffff}));return this.materials.get(type)}blockMesh(x,y,z,type){const s=this.block;const m=new this.T.Mesh(new this.T.BoxGeometry(s,s,s),this.material(type));m.position.set(x*s+s/2,y*s+s/2,z*s+s/2);m.castShadow=type!=='water';m.receiveShadow=true;m.userData={voxel:{x,y,z,type}};this.scene.add(m);this.meshes.push(m);return m}}
export class World extends VoxelWorld{constructor(T,scene,seed){super(T,scene,seed);this.spawn=new THREE.Vector3(0,4,0);this.trees=[];this.crystals=[]}
build(){this.makeTerrain();this.makeWater();this.makeTrees();this.makeStructures();this.addLights();return this}
makeTerrain(){const half=this.size/2;for(let x=-half;x<half;x++)for(let z=-half;z<half;z++){const n=this.noise(x,z);const h=2+Math.floor(n*4);for(let y=0;y<=h;y++)this.set(x,y,z,y===h?'grass':y>h-2?'dirt':'stone');for(let y=0;y<=h;y++)this.blockMesh(x,y,z,this.get(x,y,z));if(x===0&&z===0)this.spawn.set(0,(h+2)*this.block,0)}}
makeWater(){for(let x=-24;x<24;x++)for(let z=-24;z<24;z++){if(this.noise(x+31,z-17)>.88&&Math.abs(x)>6&&Math.abs(z)>6){const y=1;this.set(x,y,z,'water');const m=this.blockMesh(x,y,z,'water');m.material.transparent=true;m.material.opacity=.65}}}
makeTrees(){for(let x=-22;x<22;x+=4)for(let z=-22;z<22;z+=4){if(Math.abs(x)<7&&Math.abs(z)<7)continue;if(this.noise(x+100,z+20)>.57)this.tree(x,3,z)}}
tree(x,y,z){const trunk=3+Math.floor(this.noise(x*3,z*7)*2);for(let i=0;i<trunk;i++){this.set(x,y+i,z,'wood');this.blockMesh(x,y+i,z,'wood')}for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++)for(let dy=0;dy<2;dy++){if(Math.abs(dx)+Math.abs(dz)>3)continue;this.set(x+dx,y+trunk+dy,z+dz,'leaf');this.blockMesh(x+dx,y+trunk+dy,z+dz,'leaf')}this.trees.push({x,z})}
makeStructures(){for(let i=0;i<7;i++){const x=Math.floor(rand(-18,19));const z=Math.floor(rand(-18,19));if(Math.hypot(x,z)<9)continue;this.house(x,z)}}
house(x,z){const w=4,d=4,h=3;for(let ix=-w;ix<=w;ix++)for(let iz=-d;iz<=d;iz++)for(let y=0;y<h;y++){if(ix!==-w&&ix!==w&&iz!==-d&&iz!==d)continue;if(y===0&&Math.abs(ix)<2)continue;this.set(x+ix,3+y,z+iz,'stone');this.blockMesh(x+ix,3+y,z+iz,'stone')}for(let ix=-w;ix<=w;ix++)for(let iz=-d;iz<=d;iz++){this.set(x+ix,6,z+iz,'wood');this.blockMesh(x+ix,6,z+iz,'wood')}}
addLights(){for(let i=0;i<10;i++){const l=new THREE.PointLight(B.glow,1.2,10);l.position.set(rand(-20,20),5,rand(-20,20));this.scene.add(l)}}
raycastMeshes(){return this.meshes}
heightAt(x,z){const gx=Math.floor(x/this.block);const gz=Math.floor(z/this.block);for(let y=CONFIG.world.height;y>=0;y--)if(this.get(gx,y,gz)&&this.get(gx,y,gz)!=='water')return (y+1)*this.block;return 0}
canMoveTo(p,r=.7){const ground=this.heightAt(p.x,p.z);if(ground<=0||p.y<ground-.2)return false;return true}
update(){}
saveData(){return{seed:this.seed}}
loadData(data){if(data?.seed&&data.seed!==this.seed){}}
}
