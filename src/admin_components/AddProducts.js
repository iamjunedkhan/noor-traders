import { Databases, ID } from 'appwrite';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import Loader from '../Components/Loader';
import { AppContext } from '../context/appContext';

const appObj = new AppwriteConfig();

const AddProducts = () => {
    const [image_file, setImage_file] = useState(null);
    const { showToast } = useContext(AppContext);
    const [categoreis, setCategoreis] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const formik = useFormik({
        initialValues: {
            product_name: '',
            product_desc: '',
            product_mrp: '',
            product_category: '',
        },
        onSubmit: values => {

            // appObj.createProduct(values.product_name,
            //     values.product_desc,
            //     values.product_mrp,
            //     image_file,
            //     values.product_category)
            //     .then(res => {
            //         showToast('Product Successfully Added!');
            //         formik.values.product_name='';
            //         formik.values.product_desc='';
            //         formik.values.product_mrp='';
            //         formik.values.product_category='';
            //     })
            //     .catch(err=>{
            //         console.log('error inside add product ',err);                    
            //         showToast('Product Not Added. Please Contact Admin.',true);
            //     })
            // if image is present 
            console.log('image fiel is '+image_file);
            console.log('product mrp is '+values.product_mrp);
            if (image_file != null) {
                appObj.storage.createFile(process.env.REACT_APP_PRODUCT_IMAGE_BUCKET, ID.unique(), image_file)
                    .then(res => {
                        console.log('inside create file | the res is :' + res);
                        appObj.databases.createDocument(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_PRODUCTDB, ID.unique(), {
                            product_name: values.product_name,
                            product_desc: values.product_desc,
                            product_mrp: values.product_mrp,
                            product_category: values.product_category,
                            product_img_url: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_PRODUCT_IMAGE_BUCKET}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECTID}&mode=admin`,
                            img_id: res.$id
                        }).then(res => {
                            console.log('insdie create  doc| the res is:' + res);
                            showToast('Product Successfully Added!');
                            window.location.reload();
                        }).catch(err => {
                            console.log('inside create  doc| the error is :' + err);
                            showToast('Some Error Occured While Creating product.');
                        })
                    }).catch(err => {
                        console.log('inside create file| the error is :' + err);
                    })
            }
            else {  // if image is not present 
                appObj.databases.createDocument(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_PRODUCTDB, ID.unique(), {
                    product_name: values.product_name,
                    product_desc: values.product_desc,
                    product_mrp: values.product_mrp,
                    product_category: values.product_category,
                    // product_img_url: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_PRODUCT_IMAGE_BUCKET}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECTID}&mode=admin`,
                    img_id: ''
                }).then(res => {
                    console.log('insdie create  doc| the res is:' + res);
                    showToast('Product Successfully Added!');
                    window.location.reload();
                }).catch(err => {
                    console.log('inside create  doc| the error is :' + err);
                    showToast('Some Error Occured While Creating product.');
                })
            }


        },
    });

    useEffect(() => {
        const databases = new Databases(appObj.client);
        databases.listDocuments(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_CATEGORY)
            .then((response) => {
                console.log('success from getCompanies');
                console.log(response); // Success
                setCategoreis(response.documents);
                setIsLoading(false);
            }).catch(err => {
                console.log('error from getCompanies');
                setIsLoading(false);
                console.log(err);
            });
    }, [])
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='pp-12 w-full  md:w-1/2 mx-auto' >

            <p className='text-center text-2xl md:text-4xl font-bold mt-6 md:mt-12 '>Add Product Here</p>

            <form className='border-2 border-dark m-6 md:m-12 p-12 rounded-xl' onSubmit={formik.handleSubmit} >
                <div className="mb-6">
                    <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input type="text" onChange={formik.handleChange} value={formik.values.product_name} id="product_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="product_desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                    <input type="text" onChange={formik.handleChange} value={formik.values.product_desc} id="product_desc" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="product_mrp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your MRP</label>
                    <input type="number" onChange={formik.handleChange} value={formik.values.product_mrp} id="product_mrp" min={0} max={100000} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                    <input onChange={(e) => setImage_file(e.target.files[0])} id="image_file" accept=".jpg, .jpeg, .png" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" />
                </div>
                <div className='mb-6'>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                    <select onChange={formik.handleChange} required value={formik.values.product_category} id="product_category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue={true}>Choose Company</option>
                        {categoreis?.map(cmp => <option key={cmp.category_name} value={cmp.category_name}>{cmp.category_name}</option>)}
                    </select>
                </div>

                <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Add Product</button>
            </form>


        </div>
    )
}

export default AddProducts