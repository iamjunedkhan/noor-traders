import React, { useContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import { AppContext } from '../context/appContext';

const appwrite = new AppwriteConfig();
const CompanyCard = ({ name, id }) => {
  const currentCard = useRef();
  const [company, setCompany] = useState(name);
  const [isEditMode, setIsEditMode] = useState(false)
  const { showToast } = useContext(AppContext);

  const isLoggedIn = useSelector(state => state.admin.is_logged_in);
  const handleDelete = () => {
    if (!window.confirm('Are you sure, you want to delete this company?'))
      return;

    appwrite.databases.deleteDocument(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_COMPANIES, id)
      .then(res => {
        showToast('Products deleted successfully.');
        // currentCard.current.remove();
        console.log(currentCard.current);
      }).catch(err => {
        showToast('Sorry,Product not deleted. Some error occured.', true);
      })
  }

  const handleEditSave = () => {
    if (isEditMode) {
      appwrite.databases.updateDocument(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_COMPANIES, id, {
        company_name: company
      }).then(res => {
        console.log(res);
        showToast('Company Updated Successfully.')
      }).catch(err => {
        console.log('Company update err ' + err);
        showToast('Company Not Updated. Some Error Occured', true)
      })
    }

    setIsEditMode(!isEditMode);
  }

  return (
    <div className="p-4 md:w-1/3 w-full" ref={currentCard}>
      <div className="flex rounded-lg h-full bg-dark text-white py-4 px-6 flex-col">

        {isEditMode ? <div className='flex items-center mb-3'>
          <input type="text"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            id="company"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="" />
        </div> : <h2 className="text-white text-lg title-font font-medium ">{company}</h2>}
        <div className="flex-grow">
          <Link to={`/company/${name}`} className="mt-1 text-white inline-flex items-center hover:underline underline-offset-2">View All Products
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <div className='mt-2'>
          {isLoggedIn && <button type="button" onClick={() => handleEditSave()} className="text-black  bg-white  hover:bg-gray-200  focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  w-full md:w-fit flex-1">{isEditMode ? 'Save' : 'Edit'}</button>}
          {isLoggedIn && <button type="button" onClick={() => handleDelete()} className="text-white  bg-red-700  hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  w-full md:w-fit flex-1">Delete</button>}
        </div>
      </div>
    </div>
  )
}

export default CompanyCard