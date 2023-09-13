/*This file will show the product based on the company when user click the perticular company */
import {  Query } from 'appwrite';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import Loader from './Loader';
import ShowProducts from './ShowProducts';

const appWriteConfig = new AppwriteConfig();


const FilteredProducts = () => {
  const params = useParams();

  const [productData, setProductData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // const databases = new Databases(appWriteConfig.client);
    const promise =appWriteConfig.databases.listDocuments(
      process.env.REACT_APP_DBKEY,
      process.env.REACT_APP_COLLECTION_ID_PRODUCTDB,
      [Query.equal('product_category', params.campany_name)]
    );
    promise.then(function (response) {
      console.log('success');
      console.log(response); // Success
      setProductData(response.documents);
      setIsLoading(false);
    }, function (error) {
      console.log('error');
      console.log(error); // Failure
      setIsError(true);
    });
  }, [params.campany_name])

  if (isLoading) {
    return <Loader />
  }
  return (
    <section class="text-gray-600 body-font w-full">
      <div class="flex flex-col text-center w-full mt-10">
        <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Our Products From Trusted Partner Companies</h2>
        <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">All Our Featured Products</h1>
      </div>
      {/* <div class="container px-5 py-16 mx-auto">
        <div class="flex flex-wrap -m-4 justify-center">
          {!isError && productData?.map(product => {
            return <ProductCard
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
      <ShowProducts isError={isError} productData={productData} />
    </section>

  )
}

export default FilteredProducts