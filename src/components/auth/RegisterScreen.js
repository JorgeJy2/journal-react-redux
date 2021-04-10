import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const {messageError} = useSelector(state => state.ui);

    const [valuesForm, handleInputChange, reset] = useForm({
        name: 'Jorge',
        email: 'jorgeo@gmail.com',
        password: '123456',
        confirmPassword: '123456'
    });

    const { name, email, password, confirmPassword } = valuesForm;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPassword(email, password, name));
        }
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('email is not valid'));
            return false;
        } else if (password !== confirmPassword || (password.length < 5)) {
            dispatch(setError('Password should be at least 6 characters and eacht other'));
            return false;
        }
        dispatch(removeError());
        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form  
                onSubmit={handleSubmit}
                className="animate__animated animate__fadeIn animate__faster" >
                {(messageError) && <div className="auth__alert-error" >
                    {messageError}
                </div>}
                <input
                    className="auth__input"
                    autoComplete="off"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    className="auth__input"
                    autoComplete="off"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className="auth__input"
                    autoComplete="off"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    className="auth__input"
                    autoComplete="off"
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                />
                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit">
                    Register
            </button>
                <Link to="/auth/login"
                    className="link">
                    Already registered?
            </Link>
            </form>
        </>
    )
}
