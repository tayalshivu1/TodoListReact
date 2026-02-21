import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [data, setData] = useState({
    email: { val: '', err: '' },
    pass: { val: '', err: '' },
  });

  useEffect(() => {
    if (authContext.isLoggedIn) {
      navigate('/dashboard');
    }
  }, []);

  const formDataHandler = (event) => {
    const type = event.target.name;
    const value = event.target.value;

    switch (type) {
      case 'email':
        if (!value.length) {
          setFormData(type, data.email.val, 'Please enter email');
        } else if (!value.includes('@') || !value.includes('.co')) {
          setFormData(type, data.email.val, 'Invalid email');
        } else {
          setFormData(type, data.email.val, '');
        }
        break;
      case 'pass':
        if (!value.length) {
          setFormData(type, data.pass.val, 'Please enter password');
        } else {
          setFormData(type, data.pass.val, '');
        }
        break;
    }

    setData((prev) => ({
      ...prev,
      [event.target.name]: {
        ...prev[event.target.name],
        val: event.target.value,
      },
    }));
  };

  const setFormData = (type, val, err) => {
    setData((prev) => ({
      ...prev,
      [type]: {
        val,
        err,
      },
    }));
  };

  const isSubmitEnabled =
    data.email.err || data.pass.err || !data.email.val || !data.pass.val;

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.login();
    navigate('/dashboard');
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-5 mt-10"
      >
        <h2 className="text-black-900">Login</h2>
        <div className="flex flex-col items-start">
          <input
            className="p-1 rounded border-1"
            type="text"
            name="email"
            placeholder="Email"
            value={data.email.val}
            onChange={formDataHandler}
          />
          {data.email.err && <p className="text-red-800">{data.email.err}</p>}
        </div>
        <div className="flex flex-col items-start">
          <input
            className="p-1 rounded border-1"
            type="password"
            name="pass"
            placeholder="Password"
            value={data.pass.val}
            onChange={formDataHandler}
          />
          {data.pass.err && <p className="text-red-800">{data.pass.err}</p>}
        </div>
        <input
          type="submit"
          className={`rounded-md p-1 w-25 text-white ${
            isSubmitEnabled
              ? 'bg-indigo-300'
              : 'bg-indigo-500 hover:cursor-pointer hover:bg-indigo-400'
          }`}
          disabled={isSubmitEnabled}
        />
      </form>
      <button
        onClick={() => {
          navigate('/signup');
        }}
        className="mt-5 text-black hover:cursor-pointer"
      >
        New User? Register
      </button>
    </>
  );
};
