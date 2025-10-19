import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  
  const [image, setImage] = useState(currentUser?.avatar || '');
  const [uploading, setUploading] = useState(false);

  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'profile_images'); // Your Cloudinary preset name
    formData.append('cloud_name', 'dzapw0oie');   // Replace with your Cloudinary cloud name

    try {
      setUploading(true);
      const res = await fetch(`https://api.cloudinary.com/v1_1/dzapw0oie/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setImage(data.secure_url); 
      setUploading(false);
    } catch (err) {
      console.error('Upload failed:', err);
      setUploading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
       
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />

       
        <div className="self-center relative">
          <img
            onClick={() => fileRef.current.click()}
            src={image || 'https://via.placeholder.com/100'}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2"
          />
          {uploading && (
            <p className="text-blue-500 text-sm text-center mt-1">Uploading...</p>
          )}
        </div>

      
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser?.username}
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser?.email}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          disabled={uploading}
        >
          update
        </button>
      </form>

     
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
