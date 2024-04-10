import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

// Sample data for restaurants
const restaurantsData:Array<{id:number,name:string}> = [
    { id: 1, name: 'Restaurant A' },
    { id: 2, name: 'Restaurant B' },
    { id: 3, name: 'Pizza Huz' },
    // Add more restaurant objects as needed
];

const Searchbox = () => {
    // State variables
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRestaurants, setFilteredRestaurants] = useState<{ id: number; name: string; }[]>([]); // Initialize as an empty array


    // Function to handle search query changes
    const handleSearchQueryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Filter restaurants based on search query
        const filtered = restaurantsData.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredRestaurants(filtered);
    };

    return (
        <div className="flex flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-slate-50 text-slate-500">
            {/* Search box */}
            <FaSearch />
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className="w-full outline-none border-none ml-3 bg-slate-50"
            />

            {/* Display filtered results (optional) */}
            {filteredRestaurants.length > 0 && (
                <div className="mt-2 ">
                    {/* <ul>
                        {filteredRestaurants.map((restaurant) => (
                            <li key={restaurant.id}>{restaurant.name}</li>
                        ))}
                    </ul> */}
                </div>
            )}
        </div>
    );
};

export default Searchbox;
