import{c as l}from"./userStore.C_79YqMW.js";const a="http://localhost:3000",h=l((d,c)=>({quotation:async({size:t,locality_origin:e,locality_destination:o})=>{try{return await(await fetch(`${a}/orders/quoter`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({packages:{size:t},shipment:{locality_origin:{id:e},locality_destination:{id:o}}})})).json()}catch(r){console.log(r)}},getLocalities:async()=>{try{return await(await fetch(`${a}/localities`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}})).json()}catch(t){console.log(t)}},getUser:async t=>{try{const o=await(await fetch(`${a}/users/${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}})).json();localStorage.setItem("user",JSON.stringify(o))}catch(e){console.log(e)}},createOrder:async({size:t,locality_origin:e,locality_destination:o,address_origin:r,address_destination:n})=>{const i=JSON.parse(localStorage.getItem("user")).id;try{const s=await fetch(`${a}/orders/new/${i}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({packages:{size:t},shipment:{locality_origin:{id:e},locality_destination:{id:o},address_origin:r,address_destination:n}})});return await c().getUser(i),await s.json()}catch(s){console.log(s)}},getOrders:async()=>{try{return await(await fetch(`${a}/orders`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}})).json()}catch(t){console.log(t)}}}));export{h as u};
