import React, { useContext } from 'react';
import { AppContext } from '../store/appContext';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    const { state } = useContext(AppContext);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            {/* Large logo placed behind the content */}
            <div className="logo-background-container"></div>

            {/* Content */}
            {state.token != null ? (
                <div className="text-center max-w-md mx-auto relative z-10">
                    <h1 className="text-2xl font-semibold text-white">Hello {state.username}</h1>
                    <h1 className="text-lg text-gray-300 mt-2">{state.email}</h1>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-200 mb-4">
                        Welcome to BlackBox!
                    </h1>
                    <p className="text-lg text-slate-500 mb-8">
                        Log in or create an account to start sharing your thoughts.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a href="/login">
                            <button className="bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-all">
                                Login
                            </button>
                        </a>
                        <a href="/register">
                            <button className="bg-blue-500 font-bold py-3 px-8 rounded-lg border text-white hover:text-white transition-all">
                                Register
                            </button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
