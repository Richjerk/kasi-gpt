import{h as e,P as f}from"./preact.module.a2a4e031.js";const r=({value:t,name:n})=>t?e("astro-slot",{name:n,dangerouslySetInnerHTML:{__html:t}}):null;r.shouldComponentUpdate=()=>!1;const m=t=>(n,s,{default:o,...l})=>{if(t.hasAttribute("ssr")){for(const[a,u]of Object.entries(l))s[a]=e(r,{value:u,name:a});f(e(n,s,o!=null?e(r,{value:o}):o),t)}};export{m as default};
