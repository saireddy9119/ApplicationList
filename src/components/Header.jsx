import React from "react";

const Header = ({ showLogout, onLogout }) => {
    return (
        <header className="flex justify-between items-center bg-blue-500 p-4 shadow-md">
            <div className="text-white text-xl font-semibold">
                Application Finder
            </div>

            {showLogout && (
                <button
                    onClick={onLogout}
                    className="bg-white text-blue-500 font-semibold px-4 py-2 rounded shadow hover:bg-gray-200 transition duration-200"
                >
                    Logout
                </button>
            )}
        </header>
    );
};

export default Header;
