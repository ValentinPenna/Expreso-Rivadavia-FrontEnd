import{j as e}from"./jsx-runtime.D5qyYPMi.js";import{r as t}from"./index.CZlPm10g.js";import{F as d,a as x,b as i}from"./formik.esm.C2D3lyQ3.js";import{B as h}from"./Button.T5o0TRFc.js";import{u as r}from"./ordersStore.DGUKYUHB.js";import"./userStore.C_79YqMW.js";import"./_astro-entry_react-toastify.CX4FvO7v.js";function w(){const[p,m]=t.useState(!1),[a,n]=t.useState([]),o=r(s=>s.quotation),c=r(s=>s.getLocalities);return t.useEffect(()=>{async function s(){const l=await c();n(l)}s()},[]),e.jsx("div",{className:"px-4 md:px-8 z-50",children:e.jsx(d,{initialValues:{origin:"0",destination:"0",size:""},onSubmit:s=>{o({size:s.size,locality_origin:Number(s.origin),locality_destination:Number(s.destination)}).then(l=>alert("El envio costaria: "+l)),m(!0)},children:e.jsxs(x,{className:"max-w-4xl mx-auto bg-white p-4 my-4 rounded-lg  shadow-lg",children:[e.jsx("div",{children:e.jsx("h1",{className:"text-primary font-bold lg:text-5xl md:text-4xl text-2xl text-center",children:"Cotizar envío"})}),e.jsxs("div",{className:"text-xl lg:text-2xl m-10",children:[e.jsxs("div",{className:"flex flex-col lg:flex-row items-center justify-between",children:[e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"origin",className:"flex items-center space-x-2 text-primary",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"30",viewBox:"0 0 304 432",className:"mr-2",children:e.jsx("path",{fill:"#CB1B1A",d:"M149 3q62 0 106 43.5T299 152q0 31-15.5 71.5t-37.5 75t-44 65t-37 48.5l-16 17q-6-6-16-18t-35.5-46.5t-45.5-67T16 224T0 152Q0 90 43.5 46.5T149 3m0 202q22 0 38-15.5t16-37.5t-16-37.5T149 99t-37.5 15.5T96 152t15.5 37.5T149 205"})}),"Ciudad de origen:"]}),e.jsxs(i,{as:"select",id:"origin",name:"origin",className:"p-1 focus:border focus:rounded-lg focus:outline-none focus:border-primary hover:border-primary w-56",children:[e.jsx("option",{value:0,children:"Seleccionar"}),a?.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"destination",className:"flex items-center space-x-2 text-primary",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"35",viewBox:"0 0 24 24",className:"mr-2",children:e.jsx("path",{fill:"#CB1B1A",d:"M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75"})}),"Ciudad de destino:"]}),e.jsxs(i,{as:"select",id:"destination",name:"destination",className:"p-1 focus:border focus:rounded-lg focus:outline-none focus:border-primary hover:border-primary w-56",children:[e.jsx("option",{value:0,children:"Seleccionar"}),a?.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]})]})]}),e.jsxs("div",{className:"flex flex-col items-center mt-5",children:[e.jsxs("label",{htmlFor:"size",className:"flex items-center space-x-2 text-primary",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"50",viewBox:"0 0 24 24",className:"mr-2",children:e.jsx("path",{fill:"none",stroke:"#CB1B1A",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m12 3l8 4.5v9L12 21l-8-4.5v-9zm0 9l8-4.5M12 12v9m0-9L4 7.5m12-2.25l-8 4.5"})}),"Selecciona un tamaño:"]}),e.jsxs("div",{role:"group","aria-labelledby":"size",className:"flex flex-col lg:flex-row",children:[e.jsxs("label",{htmlFor:"size-sobre",className:"flex items-center space-x-2 mb-2 md:mb-0 ml-5",children:[e.jsx(i,{type:"radio",id:"size-sobre",name:"size",value:"envelop"}),e.jsxs("div",{className:"flex  flex-col items-center space-x-2",children:[e.jsx("span",{className:"ml-2 mr-6 ",children:"Sobre"}),e.jsx("span",{className:"text-sm md:ml-0 text-primary",children:"Máximo formato A4 "})]})]}),e.jsxs("label",{htmlFor:"size-pequeño",className:"flex items-center space-x-2 mb-2 md:mb-0 ml-5",children:[e.jsx(i,{type:"radio",id:"size-pequeño",name:"size",value:"small"}),e.jsxs("div",{className:"flex  flex-col items-center space-x-2",children:[e.jsx("span",{className:"ml-2 mr-6 ",children:"Pequeño"}),e.jsx("span",{className:"text-sm md:ml-0 text-primary",children:"Máximo de 150cm / 10000 grs"})]})]}),e.jsxs("label",{htmlFor:"size-mediano",className:"flex items-center space-x-2 mb-2 md:mb-0 ml-5",children:[e.jsx(i,{type:"radio",id:"size-mediano",name:"size",value:"medium"}),e.jsxs("div",{className:"flex  flex-col items-center space-x-2",children:[e.jsx("span",{className:"ml-2 mr-6 ",children:"Mediano"}),e.jsx("span",{className:"text-sm md:ml-0 text-primary",children:"Máximo de 300cm / 25000 grs"})]})]}),e.jsxs("label",{htmlFor:"size-grande",className:"flex items-center space-x-2 mb-2 md:mb-0 ml-5",children:[e.jsx(i,{type:"radio",id:"size-grande",name:"size",value:"large"}),e.jsxs("div",{className:"flex  flex-col items-center space-x-2",children:[e.jsx("span",{className:"ml-2 mr-6 ",children:"Grande"}),e.jsx("span",{className:"text-sm md:ml-0 text-primary",children:"Máximo de 495cm / 50000 grs"})]})]})]})]}),e.jsx("div",{className:"mt-10 mb-5 flex justify-center",children:e.jsx(h,{type:"submit",children:"COTIZAR"})})]})]})})})}export{w as default};
