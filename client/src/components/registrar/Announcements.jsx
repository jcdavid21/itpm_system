import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';
import ApiConfig from '../../Config/localconfigapi';
import SidebarFcms from './SidebarFcms';
import { IoIosAddCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoTrash } from "react-icons/io5";

function Announcements() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [ancId, setAncId] = useState('');
    const [imgAnc, setImgAnc] = useState('');
    const [desc, setDesc] = useState('');
    const [addAnc, setAddAnc] = useState({
        anc_title: '',
        anc_desc: '',
        anc_img: null  // Updated to store the file object
    });

    const columns1 = [
        {
            name: "ID",
            selector: row => row.anc_id,
            sortable: true
        },
        {
            name: "Title",
            selector: row => row.anc_title,
            sortable: true
        },
        {
            name: "Actions",
            selector: row => <div className='flex items-center gap-1'>
                <FaRegEdit className='text-2xl text-blue-500 cursor-pointer' onClick={() => handleShowModal(row)} />
                <IoTrash className='text-2xl text-red-700 cursor-pointer'
                onClick={()=>handleDelete(row)}/>
            </div>
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiConfig.apiURL}getAnc`);
                setRecords(response.data);
                setFilteredRecords(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(desc && ancId){
                const response = await axios.put(`${ApiConfig.apiURL}updateAnc`, {desc, ancId})

                if(response.status === 200){
                    Swal.fire({
                        title: "Submitted Successfully!",
                        text: "Click OK to refresh the page",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/announcements";
                        }
                    });
                }
            }
        }catch(err){
            console.error("Err: ", err);
        }
    }

    const handleShowModal = (row) => {
        const index = records.findIndex(record => record.anc_id === row.anc_id);
        if (index !== -1) {
            setAncId(records[index].anc_id);
            setImgAnc(records[index].anc_img);
            setDesc(records[index].anc_desc);
            setShowModal(true);
        } else {
            console.error("Row index not found");
        }
    };

    const handleFilter = (value) => {
        const newData = records.filter(row => {
            return row.anc_id.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilteredRecords(newData);
    };

    const handleAddAnc = async (e) => {
        e.preventDefault();
        try {
            if (addAnc.anc_desc && addAnc.anc_img && addAnc.anc_title) {
                const formData = new FormData();
                formData.append('file', addAnc.anc_img); // Append the file to FormData with the correct field name
                formData.append('anc_title', addAnc.anc_title); // Append other form data as needed
                formData.append('anc_desc', addAnc.anc_desc);

                const response = await axios.post(`${ApiConfig.apiURL}addAnc`, formData);

                if (response.status === 200) {
                    Swal.fire({
                        title: "Submitted Successfully!",
                        text: "Click OK to refresh the page",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/announcements";
                        }
                    });
                }
            } else {
                Swal.fire({
                    title: "Empty Field!",
                    text: "Make sure all fields are filled!",
                    icon: "warning"
                });
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const handleDelete = (row)=>{
        try{
            const index = records.findIndex(record => record.anc_id === row.anc_id);
            const anc_id = records[index].anc_id;
            if (index !== -1) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const deleteData = async ()=>{
                        const response = await axios.delete(`${ApiConfig.apiURL}delAnc`, {params: {anc_id}});

                        if(response.status === 200){
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your announcement has been deleted.",
                                icon: "success"
                              }).then((result)=>{
                                if(result.isConfirmed){
                                    window.location.href = "/announcements"
                                }
                              })
                        }
                      }
                      deleteData();
                    }
                  });
            } else {
                console.error("Row index not found");
            }
        }catch(err){
            console.err("Error: ", err);
        }
    }

    const handleChange = (e) => {
        if (e.target.id === 'anc_img') {
            // Update anc_img with the selected file
            setAddAnc({ ...addAnc, [e.target.id]: e.target.files[0] });
        } else {
            setAddAnc({ ...addAnc, [e.target.id]: e.target.value });
        }
    };

    return (
        <div className='xl:ml-64'>
            <SidebarFcms />
            <div className='flex items-center justify-center mt-10 p-4'>
                <div className='max-w-screen-lg w-full'>
                    <div className='text-start text-2xl pb-2 font-medium border-b border-b-300 mb-5'>Announcements Post</div>
                    <div className='flex items-center justify-end'>
                        <button onClick={() => setAddModal(true)} className='flex items-center gap-1 bg-red-700 pt-3 pb-3 pl-6 pr-6 mb-5 rounded-md text-white font-semibold hover:bg-red-600'>
                            <IoIosAddCircle />ADD
                        </button>
                    </div>
                    <div className='flex items-center justify-between bg-red-700 p-4 pb-2 rounded-t-md'>
                        <div className='text-white font-medium tracking-wider'>All Announcements</div>
                        <input type="text" placeholder='Search Reference Number...' onChange={(e) => handleFilter(e.target.value)}
                            className='w-52 p-2 mb-3 border border-gray-300 rounded-md text-xs' />
                    </div>
                    <DataTable columns={columns1} data={filteredRecords} fixedHeader pagination />
                </div>
            </div>

            <>
                {showModal && (
                    <>
                        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center">
                            <div className="relative p-4 w-full max-w-md">
                                <div className="relative bg-white rounded-lg shadow">
                                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                                        <h3 className="text-lg font-semibold text-gray-900">Details</h3>
                                        <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                            <IoClose className='text-2xl' />
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <form className="p-4" onSubmit={handleSubmit}>
                                        <div className="mb-4 flex flex-col gap-4">
                                            <div className='text-red-700 text-sm font-medium text-start pb-2 border-b border-b-red-700 w-max'>
                                                Announcement ID: {ancId}
                                            </div>

                                            <div className='max-h-52 overflow-auto'>
                                                <div className='text-sm font-light mt-2 mb-2 text-start'>Announcement Description</div>
                                                <textarea name="desc" id="desc" cols="10" rows="5"
                                                    className='text-xs w-full border border-gray-500 p-2'
                                                    defaultValue={desc}
                                                    value={desc}
                                                    onChange={(e) => setDesc(e.target.value)}></textarea>
                                            </div>

                                            <div className='max-h-64 overflow-auto'>
                                                <div className='text-start mb-2 text-sm font-light border-b border-b-gray-400'>Thumbnail</div>
                                                <img src={require(`../../../../backend/anc_imgs/${imgAnc}`)} alt="" />
                                            </div>

                                            <div>
                                                <button className='bg-red-700 text-white tracking-wider font-semibold p-2 pl-6 pr-6 rounded-md hover:bg-red-600'>SUBMIT</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
            </>

            <>
                {addModal && (
                    <>
                        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center">
                            <div className="relative p-4 w-full max-w-md">
                                <div className="relative bg-white rounded-lg shadow">
                                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                                        <h3 className="text-lg font-semibold text-gray-900">Upload Details</h3>
                                        <button type="button" onClick={() => setAddModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                            <IoClose className='text-2xl' />
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <form className="p-4" onSubmit={handleAddAnc}>
                                        <div className="mb-4 flex flex-col gap-4">
                                            <div className='text-red-700 text-sm font-medium text-start pb-2 border-b border-b-red-700 w-max'>
                                                Add Announcement
                                            </div>

                                            <div className="col-span-2 flex-grow">
                                                <label htmlFor="anc_title" className="block mb-2 text-sm font-medium text-start text-gray-900">Title</label>
                                                <input type="text" id="anc_title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type your Title"
                                                    value={addAnc.anc_title}
                                                    onChange={handleChange} />
                                            </div>

                                            <div className="col-span-2 flex-grow">
                                                <label htmlFor="anc_desc" className="block mb-2 text-sm font-medium text-start text-gray-900">Description</label>
                                                <textarea name="anc_desc" id="anc_desc" cols="10" rows="5"
                                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                                    value={addAnc.anc_desc}
                                                    onChange={handleChange}></textarea>
                                            </div>

                                            <div className='col-span-2 flex-grow'>
                                                <label htmlFor="file" className="block mb-2 text-sm font-medium text-start text-gray-900">Upload Thumbnail</label>
                                                <input type="file" id='anc_img'
                                                    className='w-full mb-4 text-xs'
                                                    onChange={handleChange} />
                                            </div>
                                            <div>
                                                <button className='bg-red-700 text-white tracking-wider font-semibold p-2 pl-6 pr-6 rounded-md hover:bg-red-600'>SUBMIT</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
            </>
        </div>
    );
}

export default Announcements;
