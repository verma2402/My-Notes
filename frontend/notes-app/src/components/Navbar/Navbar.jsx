import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo"
import { Navigate, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Load Bootstrap first
import '../../index.css'; // Then load your Tailwind CSS


const Navbar =({ userInfo ,onSearchNote , handleClearSearch}) =>{
    const [searchQuery , setSearchQuery] = useState(""); 

    const navigate = useNavigate();
    const onLogout =() => {
        localStorage.clear(); 
        navigate("/login");
    }


    
    const handleSearch = () => {
        if(searchQuery){
            onSearchNote(searchQuery);
        }
    } ;

    const onClearSearch =() => {
        setSearchQuery("");
        handleClearSearch()
    };

    

    return( 
    <>
   <div className="fixed top-0 left-0 right-0 bg-[#E2BFD9] flex items-center justify-between px-6 py-2 drop-shadow z-50 ">
    <div className=" navbar flex items-center w-full md:w-auto"> <h2 className="text-xl  font-medium text-[#674188]  py-2">MyNotes</h2></div>
      
    <SearchBar
        value = {searchQuery}
        onChange={({target}) => {
            setSearchQuery(target.value); 
        }}  
        handleSearch={handleSearch} 
        onClearSearch={onClearSearch}
    />

    <ProfileInfo  userInfo ={userInfo} onLogout={onLogout} />
    
   </div>
    </>
    )
};


export default Navbar