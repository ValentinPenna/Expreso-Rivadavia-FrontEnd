import React, { useEffect, useState, useRef } from 'react';
import { useUserStore } from '../store/userStore';
import { toast } from 'react-toastify';

const ProfilePhoto = () => {
  const user = useUserStore((state) => state.user);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  useEffect(() => {

    if (user?.profilePicture) {
      
        setProfilePicture(JSON.parse(localStorage.getItem('user')!).profilePicture!);
    } 
  }, [user.profilePicture]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      // console.log(file)
      try {
        // console.log('Subiendo archivo...');
        const url = await useUserStore.getState().uploadImage(file, user.id);
        // console.log('Archivo subido con éxito:', url);
        setProfilePicture(url);
       
        toast.success('Foto de perfil actualizada con éxito');
      } catch (error) {
        console.error(error);
        toast.error( `Hubo un error al actualizar la foto de perfil`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

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
        <button
          onClick={handleClick}
          className="border border-primary rounded w-full py-2 px-3 text-gray-700"
        >
          Cambiar foto de perfil
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
        />
        {loading && <p className="text-sm text-gray-600 mt-2">Cargando...</p>}
      </div>
    </div>
  );
};

export default ProfilePhoto;
