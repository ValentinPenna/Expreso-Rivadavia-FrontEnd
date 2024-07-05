import React, { useEffect, useState, type ChangeEvent } from 'react'
import { useUserStore } from '../store/userStore'
import { toast } from 'react-toastify';


const ProfilePhoto = () => {
    const user = useUserStore ((state)=> state.user);
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
    const [loading, setLoading] = useState(false);
    const [editionPicture, setEditionPicture] = useState(false);

    useEffect(()=>{
        if (user?.profilePicture) {
            setProfilePicture(user.profilePicture);
        }
    }, [user]);

    const handleUpload = async (event: ChangeEvent<HTMLInputElement>)=> {
        const file = event.target.files?.[0];
        if (file){
            setLoading(true);
            try {
                const url = await useUserStore.getState().uploadImage(file, user.id);
                setProfilePicture(url);
                toast.success('Foto de perfil actualizada con éxito')
            } catch (error) {
                console.error(error);
                toast.error('Hubo un error al actualizar la foto de perfil')
            }
        
        }
    }

  return (
    <div className="max-w-md mx-auto px-8 pt-8 pb-4 mb-4">
      <div className="mb-4">
        <div className="flex justify-center">
          <img
            src={profilePicture}
            alt="Profile"
            className="rounded-full h-32 w-32 object-cover"
          />
        </div>
      </div>
      <div className="mb-4">
      {editionPicture ? (
         <button onClick={() => setEditionPicture(!editionPicture)}>
        <input
          type="file"
          onChange={handleUpload}
          accept="image/*"
          className="border border-primary rounded w-full py-2 px-3 text-gray-700"
        />
        </button>
      ): (
        <button onClick={() => setEditionPicture(!editionPicture)}>
        <label className="block text-primary text-md font-bold mb-2 text-center">
          Cambiar foto de perfil
        </label>
        </button>
       
    )}
    {loading && <p className="text-sm text-gray-600 mt-2">Cargando...</p>}
      </div>
    </div>
  )
}

export default ProfilePhoto
