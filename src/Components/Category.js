import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AddCategory from '../admin_components/AddCategory';
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import CategoryCard from './CategoryCard'
import Loader from './Loader';

const appWriteConfig = new AppwriteConfig();

const Category = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [addCatergory, setAddCatergory] = useState(false)
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector(state=>state.admin.is_logged_in);

  const handleAddCategory = ()=>{
    setAddCatergory(!addCatergory);
  }

  useEffect(() => {

    
    appWriteConfig.databases.listDocuments(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_CATEGORY)
    .then(res=> {
      setCategoryData(res.documents);
      setIsLoading(false);})
    .catch( (error)=> {
      console.log(error);
      setIsError(true);
    });
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
    {addCatergory&&<AddCategory handleAddCategory={handleAddCategory} />}
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto w-full md:w-3/4">
          <div className="flex flex-col text-center w-full  mb-10">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Our Trusted Partner Companies</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Featured Partners and Affiliates</h1>
            {isLoggedIn&&<button type="button"
              className="text-white  bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-4  w-fit " 
              onClick={handleAddCategory}>Add Category</button>}
          </div>
          <div className="flex flex-wrap  -m-4">
            {categoryData?.map(cmp => {
              return <CategoryCard key={cmp.$id} id={cmp.$id} name={cmp.category_name} />
            })}

          </div>
        </div>
      </section>
    </>
  )
}

export default Category