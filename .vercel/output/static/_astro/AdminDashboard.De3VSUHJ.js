import{j as s}from"./jsx-runtime.D5qyYPMi.js";import{r as t}from"./index.CZlPm10g.js";import{u as r}from"./ordersStore.DGUKYUHB.js";import"./userStore.C_79YqMW.js";import"./_astro-entry_react-toastify.CX4FvO7v.js";function m(){const[a,l]=t.useState([]),o=r(e=>e.getOrders);return t.useEffect(()=>{o().then(l).catch(console.log)},[]),s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"flex flex-row justify-between px-6",children:[s.jsx("h3",{className:"font-bold",children:"Fecha"}),s.jsx("h3",{className:"font-bold",children:"Usuario"}),s.jsx("h3",{className:"font-bold",children:"Precio"}),s.jsx("h3",{className:"font-bold",children:"Estado"})]}),a?.map(e=>s.jsxs("div",{className:"flex flex-row bg-white justify-between p-6 shadow-lg rounded-lg",children:[s.jsx("h3",{className:"font-bold",children:new Date(e.date).toLocaleDateString()}),s.jsxs("h3",{className:"font-bold",children:[e.user.lastName,", ",e.user.name]}),s.jsx("h3",{className:"font-bold",children:e.final_price}),s.jsx("h3",{className:"font-bold",children:e.status})]},e.id))]})}export{m as default};
