import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';
const OAuth = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      
      const result = await signInWithPopup(auth, provider);

      
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      
      dispatch(signInSuccess(data));
      navigate('/');

      console.log('Google sign-in successful:', data);
    } catch (error) {
      console.error('Could not sign in with Google:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg uppercase w-full transition-all duration-200"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
