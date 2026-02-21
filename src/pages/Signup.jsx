import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Signup = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [data, setData] = useState({
    name: { val: '', err: '' },
    email: { val: '', err: '' },
    pass: { val: '', err: '' },
    confirmPass: { val: '', err: '' },
  });

  useEffect(() => {
    if (authContext.isLoggedIn) {
      navigate('/dashboard');
    }
  }, []);

  const changeHandler = (e) => {
    const type = e.target.name;
    const val = e.target.value;

    switch (type) {
      case 'name':
        if (val.length <= 0) {
          setError(type, 'Please enter name');
        } else {
          setError(type, '');
        }
        break;

      case 'email':
        if (val.includes('@') && val.includes('.co')) {
          setError(type, '');
        } else if (!val.length) {
          setError(type, 'Please enter email');
        } else {
          setError(type, 'Invalid email');
        }
        break;

      case 'pass':
        if (!val.length) {
          setError(type, 'Please enter password');
        } else if (
          val !== data.confirmPass.val &&
          data.confirmPass.val.length
        ) {
          setError('confirmPass', 'Password not matching');
          setError(type, '');
        } else {
          setError(type, '');
          setError('confirmPass', '');
        }
        break;

      case 'confirmPass':
        if (!val.length) {
          setError(type, 'Please enter password');
        } else if (val !== data.pass.val) {
          setError(type, 'Password not matching');
        } else {
          setError(type, '');
        }
        break;
    }

    setData((prevData) => ({
      ...prevData,
      [e.target.name]: { ...prevData[e.target.name], val: e.target.value },
    }));
  };

  const setError = (type, err) => {
    setData((prev) => ({ ...prev, [type]: { ...prev[type], err } }));
  };

  const isDisabled =
    !data.name.val ||
    !data.email.val ||
    !data.pass.val ||
    !data.confirmPass.val ||
    data.name.err ||
    data.email.err ||
    data.pass.err ||
    data.confirmPass.err;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    authContext.login();
    navigate('/dashboard');
  };

  return (
    <>
      <form
        className="flex flex-col items-center gap-5 mt-10"
        onSubmit={submitHandler}
      >
        <h2 className="text-xl">Signup</h2>
        <div className="flex flex-col items-start gap-2">
          <input
            className="p-1 rounded border-1"
            type="text"
            placeholder="Name..."
            value={data.name.val}
            onChange={changeHandler}
            name="name"
          />
          {data.name.err && <p className="text-red-700">{data.name.err}</p>}
        </div>
        <div className="flex flex-col items-start gap-2">
          <input
            className="p-1 rounded border-1"
            type="text"
            placeholder="Email..."
            value={data.email.val}
            onChange={changeHandler}
            name="email"
          />
          {data.email.err && <p className="text-red-700">{data.email.err}</p>}
        </div>
        <div className="flex flex-col items-start gap-2">
          <input
            className="p-1 rounded border-1"
            type="text"
            placeholder="Password..."
            value={data.pass.val}
            onChange={changeHandler}
            name="pass"
          />
          {data.pass.err && <p className="text-red-700">{data.pass.err}</p>}
        </div>
        <div className="flex flex-col items-start gap-2">
          <input
            className="p-1 rounded border-1"
            type="text"
            placeholder="Re-type Password..."
            value={data.confirmPass.val}
            onChange={changeHandler}
            name="confirmPass"
          />
          {data.confirmPass.err && (
            <p className="text-red-700">{data.confirmPass.err}</p>
          )}
        </div>
        <input
          className={`rounded-md p-1 w-25 text-white ${
            isDisabled
              ? 'bg-indigo-300'
              : 'bg-indigo-500 hover:cursor-pointer hover:bg-indigo-400'
          }`}
          type="submit"
          name="Submit"
          disabled={isDisabled}
        />
      </form>
      <button
        onClick={() => {
          navigate('/');
        }}
        className="text-black hover:cursor-pointer mt-5"
      >
        Already registered? Login
      </button>
    </>
  );
};
