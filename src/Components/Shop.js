import React, { useEffect, useState } from 'react'
import { Databases, Query } from "appwrite";
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import Loader from './Loader';
import ShowProducts from './ShowProducts';
import { PUBLIC_COLLECTION_ID_PRODUCTDB, PUBLIC_DBKEY } from '../contastans/constant';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const appWriteConfig = new AppwriteConfig();
const Shop = () => {

  const [productData, setProductData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.admin.is_logged_in);
  const [page, setPage] = useState(0)
  const navigate = useNavigate();


  useEffect(() => {
    // const databases = new Databases(appWriteConfig.client);
    setIsLoading(true);
    const promise = appWriteConfig.databases.listDocuments(PUBLIC_DBKEY, PUBLIC_COLLECTION_ID_PRODUCTDB, [Query.limit(25),Query.offset(page*25)]);
    promise.then(function (response) {
      console.log('success inside shop');
      console.log(response); // Success
      setProductData(response.documents);
      setIsLoading(false);
      
    }, function (error) {
      console.log('error');
      console.log(error); // Failure
      setIsError(true);
    });
  }, [page])

  const handleAddProduct = () => {
    navigate('/admin/add-product');
  }


  if (isLoading) {

    return <Loader />
  }

  return (
    <section className="text-gray-600 body-font min-h-91 w-full  mx-auto">
      <div className="flex flex-col text-center  mt-10 w-full mx-auto md:w-3/4">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Our Products From Trusted Partner Companies</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">All Our Featured Products</h1>
        {isLoggedIn && <div className='mt-4 px-4 flex justify-start w-full'>
          <button type="button" onClick={handleAddProduct}
            className="text-white  bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5   w-fit " >Add Product</button>
        </div>}
      </div>
      {/* <div className="container w-full md:w-3/4  px-5 py-16 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {!isError && productData?.map(product => {
            return <ProductCard key={product.$id}
              productName={product.product_name}
              desc={product.product_desc}
              company={product.product_company}
              mrp={product.product_mrp}
              img={product.product_img_url}
              id={product.$id}
              
            />
          })}
          {isError && <p>Please Contact admim. Some Error occurred  </p>}

        </div>
      </div> */}
      {productData.length ===0&& <h1 className='text-center text-xl mt-24'>You have vivwed all the products</h1>}
      <ShowProducts productData={productData} isError={isError} />
      <div className='flex justify-center mb-12'>
        <ul class="inline-flex -space-x-px text-sm ">
          <li>
            <p class={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-white bg-indigo-600   rounded-l-lg ${page==0?'bg-blue-300':'hover:bg-indigo-700'}`} onClick={()=>{
              if(page===0)
              return ;
              setPage(pre=>pre-1)}} >Previous</p>
          </li>
          <li>
      <p href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-white bg-indigo-600 hover:bg-indigo-700">{page+1}</p>
    </li>
          <li>
            <p class={`flex items-center justify-center px-3 h-8 leading-tight text-white rounded-r-lg bg-indigo-600  ${productData.length===0?'bg-blue-300':'hover:bg-indigo-700'}`} onClick={()=>{
                  if(productData.length===0)
                  return ;
              setPage(pre=>pre+1)}}>Next</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Shop