export const UseFetchData = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/applications");
        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        throw new Error("Failed to fetch names"); // Throw an error if something goes wrong
    }
};
