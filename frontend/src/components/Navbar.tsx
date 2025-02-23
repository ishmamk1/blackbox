import { AppContext } from "@/store/appContext";
import React, { useContext } from "react";
import "./Navbar.css";


export default function Navbar() {
    const { state, actions } = useContext(AppContext);

    const logout = () => {
        actions.logout();
    };

    return (
        <main className="flex flex-col">
        <header className="flex items-center justify-between px-4 py-3 bg-gray-950">
            {/* Left: Logo and About Us Button */}
            <div className="navbar-left flex items-center gap-4">

                {/* About Us Button */}
                {state.token != null ? (
                    <>
                        <button className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2">
                            <a href='/upload'>upload</a>
                        </button>
                        <button className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2">
                            <a href="#">alerts</a>
                        </button>
                    </>
                ) : (
                    <div>
                        <a><button className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2">about us</button></a>
                    </div>
                )}
            </div>

            {/* Center: Echo Text */}
            <div className="text-center flex items-center justify-center gap-2 flex-grow">
                    <a href="/" className="flex items-center gap-2">
                        <img src="/HexagonLogo.png" alt="Logo" className="h-8 w-8" />
                        <span className="text-white text-2xl transition-all duration-300 hover:scale-105">BlackBox</span>
                    </a>
                </div>

            {/* Right: Login/Logout and GitHub Icon */}
            {state.token == null ? (
                <>
                    <button className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2">
                        <a href='/login'>login</a>
                    </button>
                    <button className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2">
                        <a href="/register">register</a>
                    </button>
                </>
            ) : (
                <div>
                    <a><button className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2" onClick={logout}>logout</button></a>
                </div>
            )}

            {/* Right: GitHub Icon Button */}
            <a href="https://github.com/ishmamk1/blackbox">
                <button className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2">
                    <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                </button>
            </a>
        </header>
        </main>
    );
}
