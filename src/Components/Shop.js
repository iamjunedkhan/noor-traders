import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Databases,Query } from "appwrite";
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
  const navigate = useNavigate();

  useEffect(() => {
    // const databases = new Databases(appWriteConfig.client);
    const promise = appWriteConfig.databases.listDocuments(PUBLIC_DBKEY, PUBLIC_COLLECTION_ID_PRODUCTDB,[Query.limit(100)]);
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
  }, [])

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
      <ShowProducts productData={productData} isError={isError} />
    </section>
  )
}

export default Shop