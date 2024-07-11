import{j as t}from"./jsx-runtime.D5qyYPMi.js";import{F as M,a as S}from"./formik.esm.C2D3lyQ3.js";import{r as g}from"./index.CZlPm10g.js";import{I as m}from"./Input.BieRLi0Z.js";import{B as j}from"./Button.T5o0TRFc.js";import{B as p}from"./_astro-entry_react-toastify.CX4FvO7v.js";import{u as f}from"./userStore.C_79YqMW.js";function x(){const r=Math.floor(Math.random()*7)+8,o="abcdefghijklmnopqrstuvwxyz",n="ABCDEFGHIJKLMNOPQRSTUVWXYZ",a="0123456789",l="!@#$%^&*";let s=[o[Math.floor(Math.random()*o.length)],n[Math.floor(Math.random()*n.length)],a[Math.floor(Math.random()*a.length)],l[Math.floor(Math.random()*l.length)]];const i=o+n+a+l;for(let c=s.length;c<r;c++)s.push(i[Math.floor(Math.random()*i.length)]);return s=s.sort(()=>Math.random()-.5),s.join("")}x();function I(r){const o={};return r.dni||(o.dni="Por favor ingrese un número de DNI"),r.address?r.address.length>50&&(o.address="El correo no puede tener más de 50 caracteres"):o.address="Por favor ingrese una dirección",r.locality?r.locality.length>50&&(o.locality="El correo no puede tener más de 50 caracteres"):o.locality="Por favor ingrese una localidad",o}const v=()=>{const[r,o]=g.useState(),[n,a]=g.useState(!1),[l,s]=g.useState(!1),i=f(e=>e.userRegister),c=f(e=>e.getUser),w=f(e=>e.googleLogin);return g.useEffect(()=>{const e=localStorage.getItem("infoGoogle");if(e){const d=JSON.parse(e);o(d)}},[]),t.jsx("div",{children:t.jsx(M,{initialValues:{dni:"",address:"",locality:""},validate:I,onSubmit:async e=>{const d=x(),y={...r,...e,...{password:d,confirmPassword:d}};try{if(await i(y)){a(!0),p.success("Se registró y se inició sesión con Google"),localStorage.removeItem("infoGoogle");const u=await w(r.email);localStorage.setItem("token",u.token),await c(u.userId),s(!0),setTimeout(()=>{window.location.href="/"},2e3)}else throw new Error("El registro no fue exitoso")}catch(h){console.log(h),p.error("Hubo un error en el registro o inicio de sesión")}},children:({errors:e})=>t.jsxs(S,{className:"w-lg flex flex-col bg-white p-6 items-center rounded-lg shadow-lg my-20",children:[t.jsx("div",{children:t.jsx("h1",{className:"text-primary text-xl font-bold text-center",children:"Completa los siguientes campos"})}),t.jsx(m,{label:"DNI",name:"dni",placeholder:"44444444",error:e.dni}),t.jsx(m,{label:"Dirección",name:"address",placeholder:"calle 123",error:e.address}),t.jsx(m,{label:"Localidad",name:"locality",placeholder:"Springfield",error:e.locality}),t.jsx(j,{type:"submit",className:"p-0.5 w-fit mt-4",children:"Terminar"})]})})})};export{v as default};
