import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseFetchData } from "../hooks/UseFetchData";
import Header from "./Header";

const ApplicationScreen = () => {
    const navigate = useNavigate()
    const TAB_KEY = 'ApplicationId';
    const { appId } = useParams();
    const logOut = true;

    const [logout, setLogout] = useState(false)
    const [names, setNames] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const showMultiTabAlert = () => {
        const result = window.confirm("You are already logged into another tab. Do you want to log out from the other tab?");

        if (result) {
            localStorage.removeItem(TAB_KEY);
            navigate('/');
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        if (localStorage.getItem(TAB_KEY) === appId) {
            showMultiTabAlert()
        } else {
            localStorage.setItem(TAB_KEY, appId);
            window.addEventListener('beforeunload', handleTabClose);

            const fetchData = async () => {
                try {
                    const data = await UseFetchData();
                    setNames(data);
                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching data:", err);
                    setError('Error fetching data');
                    setLoading(false);
                }
            };

            fetchData();

            return () => {
                handleTabClose();
                window.removeEventListener('beforeunload', handleTabClose);
            };
        }

        // window.addEventListener('storage', (event) => {
        //     if (event.key === TAB_KEY && event.newValue === appId) {
        //         alert('Another tab has opened this application.');
        //     }
        // });
    }, [appId]);

    const handleTabClose = () => {
        localStorage.removeItem(TAB_KEY);
    };
    const handleLogOut = () => {
        navigate("/")
    }


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    const application = Array.isArray(names) ? names.filter((app) => app.id === appId.toString()) : [];
    console.log(application)



    return (
        <div>
            <Header showLogout={logOut} onLogout={handleLogOut} />
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
