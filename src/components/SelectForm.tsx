import React, { useState } from 'react'
import Button from './secondary/Button'
import RegisterUser from './RegisterUser'
import RegisterCompany from './RegisterCompany'

const SelectForm: React.FC = () => {
    const [selectForm, setSelectForm]= useState<'user'| 'company' | null> (null)

    const handleBackToSelection = () => {
        setSelectForm(null);
      };
  return (
    <div>
      {!selectForm && (
        <div className='m-16 grid grid-cols-1 lg:grid-cols-2 gap-10 '>
            <div className='bg-white p-12 rounded-lg  text-center shadow-lg flex flex-col items-center'> 
              <h1 className="text-primary text-4xl font-bold ">PERSONA</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="#CB1B1A" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 
            4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 
            1.413T18 20H6q-.825 0-1.412-.587T4 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15t-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6-8q.825 0 1.413-.587T14 
            8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0 8"/></svg>  
            
            <Button onClick={()=> setSelectForm('user')} className='m-8 mt-16'>Registrarse como persona</Button>
            </div>
            <div className='bg-white p-12 rounded-lg text-center shadow-lg flex flex-col items-center'>
              <h1  className="text-primary text-4xl font-bold ">EMPRESA</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" ><path fill="#CB1B1A" d="M4 21q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 
            6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v11q0 .825-.587 1.413T20 21zm6-15h4V4h-4zm2 9.5q.825 0 1.413-.587T14 13.5t-.587-1.412T12 
            11.5t-1.412.588T10 13.5t.588 1.413T12 15.5"/></svg>
                
            <Button onClick={()=>setSelectForm('company')} className='m-8 mt-16'>Registrarse como empresa </Button>
            </div>
            <div className='text-3xl m-10 text-center bg-white p-10 rounded-lg shadow-lg col-span-1 lg:col-span-2'> 
              <span className='m-5'>Ya tienes cuenta?<a href='/auth/login' className='text-primary font-bold'> Inicia sesión</a></span></div>
          </div>
      )}
      {selectForm === 'user' && <RegisterUser handleBackToSelection={handleBackToSelection} />}
      {selectForm === 'company' && <RegisterCompany handleBackToSelection={handleBackToSelection}/>}
            
            </div>
    
  )
}

export default SelectForm
