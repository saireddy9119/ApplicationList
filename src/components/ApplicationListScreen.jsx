import React from "react";
import { useNavigate } from "react-router-dom";

const ApplicationListScreen = ({ applications }) => {
    const navigate = useNavigate();

    const handleAppClick = (id) => {
        navigate(`/app/${id}`);
    };

    return (
        <div className="flex flex-col items-center py-8">
            <h1 className="text-2xl font-bold mb-6">Application List</h1>
            <ul className="w-full max-w-md">
                {applications.map((app) => (
                    <li
                        key={app.id}
                        className="bg-gray-100 hover:bg-gray-200 border rounded-md p-4 mb-4 cursor-pointer shadow-sm transition-all duration-200"
                        onClick={() => handleAppClick(app.id)}
                    >
                        {app.app_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApplicationListScreen;
