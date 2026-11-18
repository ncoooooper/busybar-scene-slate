import {desk} from "@shared/desk";
import {wrap} from "@shared/surface";
type S={scene:number;shot:number;take:number;mode:number;saved:string[];cursor:number};
const modes=["Take","Scene","Shot","Keepers"];
function slate(s:S){return s.scene+"."+s.shot+" / "+s.take;}
desk<S>({name:"Scene Slate",accent:"#6DA9E9",motion:{"motif":"folio","color":"#6DA9E9","shine":"#E2F4FF"},initial:()=>({scene:1,shot:1,take:1,mode:0,saved:[],cursor:0}),render:s=>{
 const mark=slate(s);return {title:modes[s.mode],value:s.mode===3?(s.saved[s.cursor]||"None"):s.mode===1?"S"+s.scene:s.mode===2?"Shot "+s.shot:"T"+s.take,
 lines:["Scene "+s.scene+" / shot "+s.shot,"Take "+s.take+(s.saved.includes(mark)?" * keeper":""),"Keepers "+s.saved.length,
 "Wheel: select mode","Click: advance / browse","Start: toggle keeper"]};},
 action:(s,k)=>{if(k==="up"||k==="down")s.mode=wrap(s.mode+(k==="up"?1:-1),4);if(k==="hold-ok")s.mode=0;
 if(k==="ok"){if(s.mode===0)s.take++;else if(s.mode===1){s.scene++;s.shot=1;s.take=1;}else if(s.mode===2){s.shot++;s.take=1;}else if(s.saved.length)s.cursor=wrap(s.cursor+1,s.saved.length);}
 if(k==="start"){const key=slate(s),n=s.saved.indexOf(key);if(n>=0)s.saved.splice(n,1);else s.saved=s.saved.concat([key]).slice(-50);s.cursor=Math.max(0,s.saved.length-1);}}});
