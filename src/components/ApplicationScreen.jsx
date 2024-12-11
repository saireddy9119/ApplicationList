import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseFetchData } from "../hooks/UseFetchData";

const ApplicationScreen = () => {
    const TAB_KEY = 'ApplicationId';
    const { appId } = useParams();

    const [logout, setLogout] = useState(false);
    const [names, setNames] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to handle tab close or unloading
        const handleTabClose = () => {
            localStorage.removeItem(TAB_KEY);
        };

        // Function to fetch data
        const fetchData = async () => {
            try {
                const data = await UseFetchData();
                setNames(data);  // Set the fetched data in the state
                setLoading(false);  // Set loading to false after the data is fetched
            } catch (err) {
                console.error("Error fetching data:", err);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        // Listen for changes in `localStorage` (from other tabs)
        const handleStorageChange = (event) => {
            if (event.key === TAB_KEY && event.newValue === appId) {
                setLogout(true); // Set logout if the appId is the same as the one stored in localStorage
            }
        };

        // Check if there's already an active tab
        if (localStorage.getItem(TAB_KEY) === appId) {
            setLogout(true); // Mark as logged out in another tab
        } else {
            localStorage.setItem(TAB_KEY, appId); // Mark current tab as active
            fetchData(); // Fetch the data if this is the first tab
        }

        // Add event listeners for tab close and storage change
        window.addEventListener('beforeunload', handleTabClose);
        window.addEventListener('storage', handleStorageChange);

        // Clean up on component unmount
        return () => {
            handleTabClose();
            window.removeEventListener('beforeunload', handleTabClose);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [appId]);

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
