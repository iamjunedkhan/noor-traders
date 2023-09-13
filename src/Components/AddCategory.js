import { ID } from 'appwrite';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppwriteConfig } from '../appwrite/appWriteConfig'
import { AppContext } from '../context/appContext';

const appWriteObj = new AppwriteConfig();
const AddCategory = ({ handleAddCategory,addCategoryInDom }) => {
    const [category, setCategory] = useState('');
    const { showToast } = useContext(AppContext);
    const navigate  = useNavigate();
    const handleSaveCategory = () => {
        appWriteObj.databases.createDocument(process.env.REACT_APP_DBKEY ,process.env.REACT_APP_COLLECTION_ID_CATEGORY,ID.unique(),{
            category_name:category
        })
        .then(res=>{
            console.log('addCategory res:'+res);
            showToast('Category added Successfully.');
            handleAddCategory();
            addCategoryInDom({$id:ID.unique(),category_name:category})
            navigate('/category');
        })
        .catch(err=>{
            console.log('addCategory err '+err);
            showToast('Category not added. Some error occured',true);
            handleAddCategory()
        })
    }
    return (
        <div className="w-full   h-full fixed  bg-black/70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex justify-center items-center ">
            <div className="flex rounded-lg w-full m-3  md:w-1/3   bg-dark  shadow-lg text-white py-4 px-6 flex-col z-40">
                <h1 className='text-2xl font-semibold text-white my-2 '>Add Category</h1>
                <div className='flex items-center mb-3'>
                    <input type="text"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        id="category"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="" />
                </div>

                <div className='mt-2 flex justify-end gap-5'>
                    <button type="button" className="text-white  bg-red-700  hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 md:w-fit " onClick={handleAddCategory}>Cancle</button>
                    <button type="button" className="text-white  bg-indigo-600  hover:bg-indigo-700  focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 md:w-fit " onClick={handleSaveCategory} >Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddCategory