import { ID } from 'appwrite';
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppwriteConfig } from '../appwrite/appWriteConfig'
import { AppContext } from '../context/appContext';

const appWriteObj = new AppwriteConfig();
const AddCompany = ({ handleAddCampany,addCampanyInDom }) => {
    const isLoggedIn = useSelector(state=>state.admin.is_logged_in);
    const navigate  = useNavigate();
    const [image_file, setImage_file] = useState(null);
    if(!isLoggedIn)
        navigate('/');
    const [company, setCompany] = useState('');
    const { showToast } = useContext(AppContext);
    const handleSaveCompany = () => {

        
        appWriteObj.storage.createFile(process.env.REACT_APP_PRODUCT_IMAGE_BUCKET, ID.unique(), image_file)
        .then(res=>{

            // creating the document 
            appWriteObj.databases.createDocument(process.env.REACT_APP_DBKEY ,process.env.REACT_APP_COLLECTION_ID_COMPANIES,ID.unique(),{
                company_name:company,
                img_id:res.$id,
                img_url:`https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_PRODUCT_IMAGE_BUCKET}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECTID}&mode=admin`
            })
            .then(res=>{
                console.log('addCompany res:'+res);
                showToast('company added Successfully.');
                handleAddCampany();
                addCampanyInDom({$id:ID.unique(),company_name:company})
                navigate('/company');
            })
            .catch(err=>{
                console.log('addCompany err '+err);
                showToast('company not added. Some error occured',true);
                handleAddCampany()
            })

        })

        
    }
    return (
        <div className="w-full  z-50   h-full fixed  bg-black/70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex justify-center items-center ">
            <div className="flex rounded-lg w-full m-3  md:w-1/3   bg-dark  shadow-lg text-white py-4 px-6 flex-col z-40">
                <h1 className='text-2xl font-semibold text-white my-2 '>Add Company</h1>
                <div className='flex items-center mb-3'>
                    <input type="text"
                        onChange={(e) => setCompany(e.target.value)}
                        value={company}
                        id="company"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="" />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-md font-medium text-white " htmlFor="file_input">Upload Image</label>
                    <input onChange={(e) => {
                        console.log('event for file is:');
                        console.log(e.target);
                        setImage_file(e.target.files[0])
                    }} id="image_file" accept=".jpg, .jpeg, .png" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" />
                </div>

                <div className='mt-2 flex justify-end gap-5'>
                    <button type="button" className="text-white  bg-red-700  hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 md:w-fit " onClick={handleAddCampany}>Cancle</button>
                    <button type="button" className="text-white  bg-indigo-600  hover:bg-indigo-700  focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 md:w-fit " onClick={handleSaveCompany} >Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddCompany