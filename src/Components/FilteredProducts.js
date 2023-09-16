/*This file will show the product based on the company when user click the perticular company */
import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import Loader from './Loader';
import ShowProducts from './ShowProducts';

const appWriteConfig = new AppwriteConfig();


const FilteredProducts = ({ queryParameter }) => {
  const params = useParams();

  const [productData, setProductData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0)

  useEffect(() => {
    // const databases = new Databases(appWriteConfig.client);
    setIsLoading(true);
    const promise = appWriteConfig.databases.listDocuments(
      process.env.REACT_APP_DBKEY,
      process.env.REACT_APP_COLLECTION_ID_PRODUCTDB,
      [Query.equal(queryParameter, params.campany_name), Query.limit(24), Query.offset(page *24)]
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
  }, [params.campany_name, queryParameter, page])

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
      {/* {productData.length !== 0 && <ShowProducts isError={isError} productData={productData} />} */}
      {productData.length === 0 && <h1 className='text-center text-xl mb-24'>You have vivwed all the products</h1>}
      <div className='flex justify-center mb-12'>
        <ul class="inline-flex -space-x-px text-sm ">
          <li className='cursor-pointer'>
            <p class={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-white bg-indigo-600   rounded-l-lg ${page === 0 ? 'bg-blue-300' : 'hover:bg-indigo-700'}`} onClick={() => {
              if (page === 0)
                return;
              setPage(pre => pre - 1)
            }} >Previous</p>
          </li>
          <li>
            <p href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-white bg-indigo-600 hover:bg-indigo-700">{page + 1}</p>
          </li>
          <li className='cursor-pointer'>
            <p class={`flex items-center justify-center px-3 h-8 leading-tight text-white rounded-r-lg bg-indigo-600  ${productData.length === 0 ? 'bg-blue-300' : 'hover:bg-indigo-700'}`} onClick={() => {
              if (productData.length === 0)
                return;
              setPage(pre => pre + 1)
            }}>Next</p>
          </li>
        </ul>
      </div>
    </section>

  )
}

export default FilteredProducts