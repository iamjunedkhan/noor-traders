import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import Loader from './Loader';
import AddCompany from './AddCompany';
import CompanyCard from './CompanyCard';

const appWriteConfig = new AppwriteConfig();

const Company = () => {
  const [companyData, setCompanyData] = useState(null);
  const [addCampany, setAddCampany] = useState(false)
  // const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector(state=>state.admin.is_logged_in);

  const handleAddCampany = ()=>{
    setAddCampany(!addCampany);
  }

  const addCampanyInDom = (data)=>{
    setCompanyData([...companyData,data]);
  }
  useEffect(() => {

    
    appWriteConfig.databases.listDocuments(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_COMPANIES)
    .then(res=> {
      setCompanyData(res.documents);
      setIsLoading(false);})
    .catch( (error)=> {
      console.log(error);
      // setIsError(true);
    });
  }, [companyData])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
    {addCampany&&<AddCompany handleAddCampany={handleAddCampany} addCampanyInDom={addCampanyInDom} />}
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto w-full md:w-3/4">
          <div className="flex flex-col text-center w-full  mb-10">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Our Trusted Partner Companies</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Featured Partners and Affiliates</h1>
            {isLoggedIn&&<button type="button"
              className="text-white  bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-4  w-fit " 
              onClick={handleAddCampany}>Add Company</button>}
          </div>
          <div className="flex flex-wrap  -m-4">
            {companyData?.map(cmp => {
              return <CompanyCard key={cmp.$id} id={cmp.$id} name={cmp.company_name} />
            })}

          </div>
        </div>
      </section>
    </>
  )
}

export default Company 
