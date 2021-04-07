import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginWithEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading, messageError } = useSelector(state => state.ui);
    const [formValues, handleInputChange] = useForm({
        email: 'jorge@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid())
            dispatch(startLoginWithEmailPassword(email, password));
        else
            console.error('formilario inválido');

    };

    const handleGoogleSingin = (e) => {
        dispatch(startGoogleLogin());
    };

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(setError('email is not valid'));
            return false;
        } else if (password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and eacht other'));
            return false;
        }
        dispatch(removeError());

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}>
                {(messageError) &&
                    <div className="auth__alert-error" >
                        {messageError}
                    </div>
                }
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
                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={loading}
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleSingin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register"
                    className="link">
                    Create new account
                </Link>
            </form>
        </>
    )
}
