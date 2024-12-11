import React from "react";
import { triggerLogout } from "../utils/logoutManager";

const LogoutButton = () => {
    const handleLogout = () => {
        triggerLogout();
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
