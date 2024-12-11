export const LOGOUT_EVENT_KEY = "multi-tab-logout";

export const triggerLogout = () => {
    localStorage.setItem(LOGOUT_EVENT_KEY, JSON.stringify({ logout: true, timestamp: Date.now() }));
};

export const clearLogout = () => {
    localStorage.removeItem(LOGOUT_EVENT_KEY);
};

export const listenForLogout = (onLogout) => {
    const handleStorageEvent = (event) => {
        if (event.key === LOGOUT_EVENT_KEY) {
            const data = JSON.parse(event.newValue || "{}");
            if (data.logout) {
                onLogout();
            }
        }
    };

    window.addEventListener("storage", handleStorageEvent);

    return () => {
        window.removeEventListener("storage", handleStorageEvent);
    };
};
