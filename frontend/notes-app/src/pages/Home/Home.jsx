import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import moment from "moment"
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/add-notes.svg"




const Home =() =>{

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
        });
        
    const [showToastMsg , setShowToastMsg] = useState({
        isShown : false, 
        message :"", 
        type : "add", 
    });
    

    const [allNotes , setAllNotes] = useState([]); 
    const [userInfo , setUserInfo] = useState(null);
    const [isSearch , setIsSearch] = useState(false);


    const navigate = useNavigate(); 

    // handle note edit 
    const handleEdit= (noteDetails) => {
        setOpenAddEditModal({isShown : true , data : noteDetails , type: "edit"}); 
      } 
     
    //  handle toast 
    const showToastMessage= (message, type) => {
        setShowToastMsg({
            isShown: true, 
            message: message,
            type :""
        });
     };

     const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false, 
            message: ""
        });
     }


    //  Get User Info 
    const getUserInfo = async () => {
        try{
            const response = await axiosInstance.get("/get-user"); 
            if(response.data && response.data.user){
                setUserInfo(response.data.user); 
            }
        }
        catch(error){
            console.error("you made a mistake " , error);
            if(error.response.status === 401){
                localStorage.clear(); 
                navigate("/login");
            }
        }
    };

    // get all notes
    const getAllNotes = async () => {
        try{
            const response = await axiosInstance.get("/get-all-notes"); 
            if(response.data && response.data.notes){
                setAllNotes(response.data.notes);
            }
        }
        catch(error){
            console.log("An unexpected error occured. Please try again later. ")

        }
    }

    // delete notes
    const deleteNote = async (data) => {
        const noteId = data._id ;
        try{
            const response = await axiosInstance.delete("/delete-note/" + noteId); 
            
            if (response.data && !response.data.error){
                showToastMessage("Note Deleted Successfully", 'delete')
                getAllNotes() 
            }
        }
        catch(error){
            if(error.response && error.response.data && error.response.data.message)
                {
                console.log("An unexpected error occured. Please try again later. ")
            }
        }
    }

    // search notes
    const onSearchNote = async (query) => {
        try {
          const response = await axiosInstance.get("/search-notes", {
            params: { query },
          });
      
          if (response.data && response.data.notes) {
            setIsSearch(true);
            setAllNotes(response.data.notes);
          }
        } catch (error) {
          console.log(error);
        }
    };

    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id ;
        try{
            const response = await axiosInstance.put("/update-note-pinned/" + noteId,{isPinned : !noteData.isPinned });
            if(response.data && response.data.note){
                showToastMessage("Note updated Successfully")
                getAllNotes(); 
            }
        }
        catch(error){
            console.log(error); 
        }
    };



    const handleClearSearch =() => {
        setIsSearch(false);
        getAllNotes(); 
      };


    useEffect(() => {
        getAllNotes()
        getUserInfo(); 
        return () => {} ;
    } , []); 

    return (
       <>
       <Navbar userInfo = {userInfo}  onSearchNote={onSearchNote}  handleClearSearch={handleClearSearch}/>
        <div className="notecard mt-20 ">
            <div className="container mx-auto px-8">
            {allNotes.length > 0 ?   (<div className="grid grid-cols-3 note-grid gap-4 mt-8">
                {allNotes.map((item,index) => (
                    <NoteCard 
                    key = {item._id}
                    title ={item.title}
                    date = {item.createdOn}
                    content ={item.content}
                    tags = {item.tags}
                    isPinned={item.isPinned}
                    onEdit={ () => handleEdit(item) }
                    onDelete={ () =>deleteNote(item)}
                    onPinNote={ () =>updateIsPinned(item)}
                /> 
                ))}
                
            </div>) : (<EmptyCard imgSrc={AddNotesImg} /> )}
            </div>
        </div>
        <button className="add-note-button fixed  right-10 bottom-10 w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-[#795C34]  " 
            onClick={() => { 
                setOpenAddEditModal({ isShown: true, type: "add" , data: null }) ;
            }}>
            <MdAdd className="text-[32px] text-white"/>
        </button>
        
        <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            style={{
                overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
                },
            }}
            contentLabel=""
            className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll "
        >
            <AddEditNotes 
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
                setOpenAddEditModal({ isShown: false , type: "add" , data:null});
            }}
            getAllNotes = {getAllNotes}
            showToastMessage ={showToastMessage}
            />
        </Modal>
        
        <Toast 
            isShown = { showToastMsg.isShown}
            message ={showToastMsg.message}
            type ={showToastMsg.type}
            onClose = {handleCloseToast}
        />

       </>
    )
}


export default Home