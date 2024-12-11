import React, { useEffect, useState } from "react";

const TabRedirector = () => {
    const [tabId, setTabId] = useState(null);

    useEffect(() => {
        // Generate a unique ID for this tab
        const id = `tab-${Date.now()}-${Math.random()}`;
        setTabId(id);

        const channel = new BroadcastChannel("tab-redirect-channel");

        // Listen for redirect messages
        channel.onmessage = (event) => {
            const { type, url, targetId } = event.data;
            if (type === "REDIRECT" && targetId === id) {
                window.location.href = url;
            }
        };

        return () => {
            channel.close();
        };
    }, []);

    const handleRedirect = (specificTabId) => {
        const channel = new BroadcastChannel("tab-redirect-channel");

        // Send redirect message to the specific tab
        channel.postMessage({
            type: "REDIRECT",
            url: "http://localhost:8080/api/applications", // Target URL for the specific tab
            targetId: specificTabId,
        });

        channel.close();
    };

    return (
        <div>
            <h1>Tab Redirector</h1>
            <p>Current Tab ID: {tabId}</p>

            {/* Example usage: Replace 'targetTabId' with the actual tab ID */}
            <button
                onClick={() =>
                    handleRedirect("example-target-tab-id") // Replace with the actual tab ID
                }
            >
                Redirect Specific Tab
            </button>
        </div>
    );
};

export default TabRedirector;
