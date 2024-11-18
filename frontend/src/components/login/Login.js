import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoginThunk } from '../../redux/slice/userslice';
import './Login.css';
import nutri from './nutrition.jpg';

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const { loginUserStatus, currentUser, errorOccurred, errMsg } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (loginCred) => {
    dispatch(userLoginThunk(loginCred));
  };

  useEffect(() => {
    if (loginUserStatus) {
      navigate('/');
    }
  }, [loginUserStatus, navigate]);

  return (
    <form className="form" onSubmit={handleSubmit(login)}>
      <img src={nutri} alt="Nutrition" className="form__image" />
      <div className="form__inputFields">
        <span className="form__logo">NUTRI-NEST</span>
        <h1 className="form__heading">Login</h1>

        <input
          className="form__input"
          type="text"
          placeholder="Name"
          autoComplete="off"
          {...register('name', { required: true })}
        />

        <input
          className="form__input"
          type="password"
          placeholder="Password"
          autoComplete="off"
          {...register('password', { required: true })}
        />

        <button className="form__button" type="submit">
          Login
        </button>
      </div>
      {/* <img src={nutri} alt="Nutrition" className="form__image" /> */}
      {errorOccurred && <div className="error-message">{errMsg}</div>}
    </form>
  );
}

export default LoginForm;
