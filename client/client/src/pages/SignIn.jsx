import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message || 'Invalid credentials'));
        return;
      }

      dispatch(signInSuccess(data)); 
      navigate('/');
      console.log('User signed in:', data);
    } catch (err) {
      dispatch(signInFailure(err.message)); 
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-sm"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-sm"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center my-4">
        <OAuth />
      </div>

      <div className="flex flex-row gap-3 mt-2">
        <p>Dont have an account?</p>
        <Link to="/signup">
          <span className="text-blue-600">Sign Up</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
