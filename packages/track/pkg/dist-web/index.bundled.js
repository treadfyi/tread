export default t=>{const e={id:Math.random().toString(36).substring(2,15),clientID:t,path:window.location.pathname,timestamp:Date.now(),type:"SESSION",userAgent:window.navigator.userAgent,url:window.location.origin};fetch("https://track.tread.fyi/",{body:JSON.stringify(e),method:"POST"}),["click"].map(n=>window.addEventListener(n,n=>{if("HTML"===n.target.nodeName)return;const a={clientID:t,path:window.location.pathname,sessionID:e.id,target:{nodeName:n.target.nodeName,id:n.target.id,className:n.target.className,textContent:n.target.textContent},timestamp:Date.now(),type:n.type,url:window.location.origin};fetch("https://track.tread.fyi/",{body:JSON.stringify(a),method:"POST"})}))};
