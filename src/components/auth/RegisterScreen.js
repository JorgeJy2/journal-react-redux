import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form>
                <input
                    className="auth__input"
                    autoComplete="off"
                    type="text"
                    placeholder="Name"
                    name="name"
                />
                <input
                    className="auth__input"
                    autoComplete="off"
                    type="text"
                    placeholder="Email"
                    name="email"
                />

                <input
                    className="auth__input"
                    autoComplete="off"
                    type="password"
                    placeholder="Password"
                    name="password"
                />

                <input
                    className="auth__input"
                    autoComplete="off"
                    type="password"
                    placeholder="Confirm password"
                    name="confirm-password"
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
