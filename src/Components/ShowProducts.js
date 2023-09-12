import React from 'react'
import ProductCard from './ProductCard'

const ShowProducts = ({productData,isError}) => {
  console.log('====================================');
  console.log('insdie show products ');
  console.log({productData});
  console.log('====================================');
return (
<div class="container w-full md:w-3/4  px-5 py-16 mx-auto  ">
        <div class="flex flex-wrap -m-4 justify-center">
          {!isError && productData?.map(product => {
            return <ProductCard key={product.$id}
              productName={product.product_name}
              desc={product.product_desc}
              company={product.product_company}
              category={product.product_category}
              mrp={product.product_mrp}
              img={product.product_img_url}
              img_id={product.img_id}
              id={product.$id}
              
            />
          })}
          {isError && <p>Please Contact admim. Some Error occurred  </p>}

        </div>
      </div>  )
}

export default ShowProducts