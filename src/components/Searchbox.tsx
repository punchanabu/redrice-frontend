import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DataFilter from '@/types/searchbox';

interface SearchboxProps {
    data: DataFilter[];
    filter: Function;
}

const Searchbox = ({ data, filter }: SearchboxProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Filter data based on search query
        const filtered = data.filter((subdata) => {
            const itemName = subdata.name ? subdata.name.toLowerCase() : ''; // Check if name exists
            return itemName.includes(query.toLowerCase());
        });

        // Update the filter state in the parent component
        filter(filtered);
    };

    return (
        <div className="flex flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-slate-50 text-slate-500">
            <FaSearch className="mr-2" />
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className="w-full outline-none border-none bg-slate-50"
            />
        </div>
    );
};

export default Searchbox;

// import { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import DataFilter from '@/types/searchbox';
// import { useEffect } from 'react';


// const Searchbox = ({data,filter}:{data:Array<DataFilter>,filter:Function}) => {
//     useEffect(()=>{
//         filter(data)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[data])
//     // state variables
//     const [searchQuery, setSearchQuery] = useState('');
//     // function to handle search query changes
//     const handleSearchQueryChange = (
//         event: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         const query = event.target.value;
//         setSearchQuery(query);
//         // filter restaurants based on search query
//         const filtered = data.filter((subdata) =>
//             subdata.name.toLowerCase().includes(query.toLowerCase())
//         );
//         filter(filtered)
//         console.log(filtered)
//     };

//     return (
//         <div className="flex flex-row items-center border border-gray-300 rounded-lg px-4 py-3 bg-slate-50 text-slate-500">
//             {/* Search box */}
           
//             <FaSearch />
            
            
//             <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={handleSearchQueryChange}
//                 className="w-full outline-none border-none ml-3 bg-slate-50"
//             />
            
//         </div>
//     );
// };

// export default Searchbox;
