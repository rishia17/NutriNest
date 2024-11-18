import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Ensure to import your CSS styles
import nutri from './nutrition.jpg';


const Register = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  let [err, setErr] = useState('');

  const registerUser = async (data) => {
    console.log(data);
    try {
      const res = await axios.post('http://localhost:4000/user-api/user', data);
      console.log(res);

      if (res.data.message === 'User created') {
        navigate('/login');
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErr('An error occurred. Please try again later.');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(registerUser)}>
      <img src={nutri} alt="Nutrition" className="form__image" />
      <div className="form__inputFields">
        <span className="form__logo">NUTRI-NEXT</span>
        <h1 className="form__heading">Register</h1>

        <input
          className="form__input"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          autoComplete="off"
          {...register('name', { required: true })}
        />

        <input
          className="form__input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          autoComplete="off"
          {...register('password', { required: true })}
        />

        <input
          className="form__input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          {...register('email', { required: true })}
        />

        <select 
          className="form__input" 
          name="gender" 
          id="gender"
          {...register('gender', { required: true })}
        >
          <option value="" disabled selected>
            Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          className="form__input"
          type="number"
          name="height"
          id="height"
          placeholder="Height (cm)"
          autoComplete="off"
          {...register('height', { required: true })}
        />

        <input
          className="form__input"
          type="number"
          name="weight"
          id="weight"
          placeholder="Weight (kg)"
          autoComplete="off"
          {...register('weight', { required: true })}
        />

        {err && <div className="error-message">{err}</div>}

        <button className="form__button" type="submit">
          Submit
        </button>
      </div>
    
    </form>
  );
};

export default Register;
