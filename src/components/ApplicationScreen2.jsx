import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseFetchData } from "../hooks/UseFetchData";

const ApplicationScreen = () => {
    const TAB_KEY = 'ApplicationId';
    const { appId } = useParams();
    const navigate = useNavigate();

    const [logout, setLogout] = useState(false);
    const [names, setNames] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Function to handle tab close or unload
    const handleTabClose = () => {
        localStorage.removeItem(TAB_KEY);
    };

    useEffect(() => {
        // Check if there's an active tab
        const currentTab = localStorage.getItem(TAB_KEY);

        if (currentTab === appId) {
            setLogout(true); // Already logged in another tab
        } else {
            // Set current tab as active
            localStorage.setItem(TAB_KEY, appId);

            const fetchData = async () => {
                try {
                    const data = await UseFetchData();
                    setNames(data);  // Set the fetched data in the state
                    setLoading(false);  // Set loading to false after the data is fetched
                } catch (err) {
                    console.error("Error fetching data:", err);
                    setError('Error fetching data');  // Set error if the fetch fails
                    setLoading(false);  // Stop loading in case of error
                }
            };

            fetchData();

            // Listen for changes to localStorage in other tabs
            const handleStorageChange = (event) => {
                if (event.key === TAB_KEY && event.newValue === appId) {
                    showMultiTabAlert();
                }
            };

            window.addEventListener('storage', handleStorageChange);

            return () => {
                window.removeEventListener('storage', handleStorageChange);
                handleTabClose();
            };
        }
    }, [appId]);

    const showMultiTabAlert = () => {
        // Show alert for multiple tab scenario
        const result = window.confirm("You are already logged into another tab. Do you want to log out from the other tab?");

        if (result) {
            // Log out the other tab (remove the ApplicationId from localStorage)
            localStorage.removeItem(TAB_KEY);
            // Redirect the current tab to Home Screen
            navigate('/');
        } else {
            // Redirect the current tab to Home Screen
            navigate('/');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const application = Array.isArray(names) ? names.filter((app) => app.id === appId.toString()) : [];

    return (
        <div>
            {!logout ? (
                <div className="flex flex-col items-center py-8">
                    <h1 className="text-2xl font-bold mb-4">App Screen</h1>
                    {application.length > 0 ? (
                        <p className="text-lg text-gray-700">
                            You are currently in <span className="font-semibold">{application[0].app_name}</span>, with ID: <span className="font-semibold">{appId}</span>.
                        </p>
                    ) : (
                        <p>No application data available.</p>
                    )}
                </div>
            ) : (
                <div>This is a multi Tab</div>
            )}
        </div>
    );
};

export default ApplicationScreen;
