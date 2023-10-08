import React, { useState } from 'react'
import { AppwriteConfig } from '../appwrite/appWriteConfig'
import { Query } from 'appwrite';

const appWriteObj = new AppwriteConfig();
const BulkDelete = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [offset, setOffset] = useState(0)
    const handleGetProducts = () => {
        appWriteObj.databases.listDocuments(process.env.REACT_APP_DBKEY,
            process.env.REACT_APP_COLLECTION_ID_PRODUCTDB,
            [Query.limit(100), Query.offset(offset)]).then(
                res => {
                    console.log(res);
                    setOffset(pre => pre + 100);
                    console.log('the offset is ' + offset)
                    allProducts.push(...res.documents)
                }
            )
    }

    const showProduct = () => {
        console.log('all the products are ');
        console.log(allProducts);
    }
    const deleteProducts = () => {

        let i = -1;
        let myInterVal = setInterval(() => {
            i++;
            appWriteObj.databases.deleteDocument(process.env.REACT_APP_DBKEY,
                process.env.REACT_APP_COLLECTION_ID_PRODUCTDB,
                allProducts[i].$id
            ).then(res => {
                console.log('i =>' + i + ' product deleted');
            }).catch(err => {
                console.log(err);
            })

            if (i === allProducts.length)
                clearInterval(myInterVal);
        }, 2000);


    }
    return (
        <div>
            <div>
                <button type="button" onClick={handleGetProducts} class="  m-12    text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get Products</button>
                <button type="button" onClick={showProduct} class="  m-12    text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">show Products</button>
                <button type="button" onClick={deleteProducts} class="  m-12    text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">delete Products</button>
            </div>
            <h1>The Product count is:{allProducts.length}</h1>
        </div>
    )
}

export default BulkDelete