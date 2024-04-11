import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DataFilter from '@/types/searchbox';
import { useEffect } from 'react';


const Searchbox = ({data,filter}:{data:Array<DataFilter>,filter:Function}) => {
    useEffect(()=>{
        filter(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])
    // state variables
    const [searchQuery, setSearchQuery] = useState('');
    // function to handle search query changes
    const handleSearchQueryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const query = event.target.value;
        setSearchQuery(query);
        // filter restaurants based on search query
        const filtered = data.filter((subdata) =>
            subdata.name.toLowerCase().includes(query.toLowerCase())
        );
        filter(filtered)
        console.log(filtered)
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
            
        </div>
    );
};

export default Searchbox;
