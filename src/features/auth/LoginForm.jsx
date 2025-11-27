import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from 'src/hooks/useAuth';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
