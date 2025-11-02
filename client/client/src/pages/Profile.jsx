import React, { useRef, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { updateUserStart,updateUserFailure,updateUserSuccess, deleteUserStart, deleteUserFailure, deleteUserSuccess, SignOutUserStart } from '../redux/user/userSlice';
import {Link} from 'react-router-dom';
export default function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const dispatch =useDispatch();
  const [image, setImage] = useState(currentUser?.avatar || '');
  const [uploading, setUploading] = useState(false);
  const [formData,setFormData] = useState({});
  const[updateSuccess,setUpdateSuccess] = useState(false);

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
  
   const handleChange=(e)=>{
      setFormData({...formData, [e.target.id]:e.target.value})
   }
  const handleSubmit =async(e)=>{
    e.preventDefault();
  try{
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`,{
          method : 'POST',
          headers:{
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success ==false){
          dispatch(updateUserFailure(data.message));
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
  }catch(e){
      dispatch(updateUserFailure(e.message));
  }
  }
  const handleDeleteUser= async()=>{
    try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method : 'DELETE',

    });
    const data = await res.json();
    if(data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;

    }
    dispatch(deleteUserSuccess(data));
  }
  catch(error){
dispatch(deleteUserFailure(error.message));
  }
  }
  const handleSignout = async()=>{
    try{
      dispatch(SignOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success ===  false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }
    catch(error){
      dispatch(deleteUserFailure(data.message));

    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       
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
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="border p-3 rounded-lg"
          defaultValue={currentUser?.email}
                  
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}

        />

        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading?'Loading':'UPDATE'}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create/listing"}>
          Create Listing
        </Link>
      </form>

     
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error?error:''}</p>
      <p className='text-red-700 mt-5'>{updateSuccess?"Updated successfully":''}</p>
    </div>
  );
}
