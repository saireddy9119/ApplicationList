import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseFetchData } from "../hooks/UseFetchData";

const ApplicationScreen = () => {
    const navigate = useNavigate()
    const TAB_KEY = 'ApplicationId';
    const { appId } = useParams();

    const [logout, setLogout] = useState(false)
    const [names, setNames] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
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

    useEffect(() => {
        // Check if there's an active tab
        if (localStorage.getItem(TAB_KEY) === appId) {
            showMultiTabAlert()
        } else {
            // Set current tab as active
            localStorage.setItem(TAB_KEY, appId);

            // Clean up on component unmount or tab close
            window.addEventListener('beforeunload', handleTabClose);

            const fetchData = async () => {
                try {
                    // Replace with your actual API URL
                    debugger
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

            return () => {
                handleTabClose();
                window.removeEventListener('beforeunload', handleTabClose);
            };
        }

        // Listen for changes to localStorage
        window.addEventListener('storage', (event) => {
            // if (event.key === TAB_KEY && event.newValue === appId) {
            //     alert('Another tab has opened this application.');
            // }
        });
    }, [appId]);

    const handleTabClose = () => {
        // Remove the flag indicating this tab is active
        localStorage.removeItem(TAB_KEY);
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    const application = Array.isArray(names) ? names.filter((app) => app.id === appId.toString()) : [];
    console.log(application)



    return (
        <div>
            {(!logout) ? (<div className="flex flex-col items-center py-8">
                <h1 className="text-2xl font-bold mb-4">App Screen</h1>
                <p className="text-lg text-gray-700">
                    You are currently in <span className="font-semibold">{application[0].app_name}</span>, with ID: <span className="font-semibold">{appId}</span>.
                </p>
            </div>) :
                (<div>This is a multi Tab</div>)
            }</div>
    );
};

export default ApplicationScreen;
