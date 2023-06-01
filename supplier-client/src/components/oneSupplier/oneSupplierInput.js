import { useState } from "react";
import { OneSupplier } from "./oneSupplierSubmit";
import { FaSearch } from "react-icons/fa";


export const OneSupplierInput =()=>{

    const [getOneSupplierInput, setGetOneSupplierInput] = useState();
    const [searchOne, setSearchOne] = useState();
  
    const handleGetOne = (search) => {
        setGetOneSupplierInput(search);
      };
    
    const handleGetOneSubmit = (e) => {
        e.preventDefault();
        handleGetOne(searchOne);
      };
    
    return(
        <form onSubmit={handleGetOneSubmit}>
          <input
            type="text"
            onChange={(e) => {
              setSearchOne(e.target.value);
            }}
          />
          <button onClick={handleGetOneSubmit}>
            <FaSearch />
          </button>
          <OneSupplier getOneSupplierInput={getOneSupplierInput} />
        </form>
    )
}