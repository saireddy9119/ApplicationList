
import { useState, useEffect } from "react";
import ApplicationListScreen from "./ApplicationListScreen";
import { UseFetchData } from "../hooks/UseFetchData";

const Home = () => {
    const [search, setSearch] = useState("");
    const [names, setNames] = useState([]);
    const [filteredNames, setFilteredNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Handle search input changes
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);

        // Filter applications based on the search term
        const filtered = names.filter((application) =>
            application.app_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNames(filtered);
    };

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const data = await UseFetchData();
                setNames(data);
                setFilteredNames(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch names");
                setLoading(false);
            }
        };

        fetchNames();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <form className="max-w-md mx-auto mt-12">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        onChange={handleSearchChange}
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Applications..."
                        required
                        value={search}
                    />
                    <button
                        type="button"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            <ApplicationListScreen applications={filteredNames} />
        </div>
    );
};

export default Home;