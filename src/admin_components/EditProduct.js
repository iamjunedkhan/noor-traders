import { ID } from 'appwrite';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import Loader from '../Components/Loader';
import { AppContext } from '../context/appContext';

const appObj = new AppwriteConfig();

const EditProduct = () => {

    const params = useParams();
    const product_id = params.product_id;
    const [imageCheckBox, setImageCheckBox] = useState(false);

    const [image_file, setImage_file] = useState(null);
    const { showToast } = useContext(AppContext);
    const [categoreis, setCategoreis] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            product_name: '',
            product_desc: '',
            product_mrp: '',
            product_category: '',
        },
        onSubmit: values => {
            if (!imageCheckBox) {
                appObj.databases.updateDocument(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_PRODUCTDB, product_id,
                    {
                        product_name: values.product_name,
                        product_desc: values.product_desc,
                        product_mrp: values.product_mrp,
                        product_category: values.product_category
                    })
                    .then(res => {
                        console.log('success|updatedoc');
                        console.log(res); // Success
                        showToast('Product Updated Successfully!');
                        setTimeout(() => {
                            navigate('/shop');
                        }, 1500);
                    }).catch(err => {
                        console.log(err);
                        showToast('Some Error Occured!', true);
                    })
            } else {
                appObj.storage.createFile(process.env.REACT_APP_PRODUCT_IMAGE_BUCKET, ID.unique(), image_file)
                    .then(res => {
                        appObj.databases.updateDocument(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_PRODUCTDB, product_id,
                            {
                                product_name: values.product_name,
                                product_desc: values.product_desc,
                                product_mrp: values.product_mrp,
                                product_category: values.product_category,
                                product_img_url: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.REACT_APP_PRODUCT_IMAGE_BUCKET}/files/${res.$id}/view?project=${process.env.REACT_APP_PROJECTID}&mode=admin`,
                                img_id: res.$id
                            })
                            .then(res => {
                                console.log('success|updatedoc');
                                console.log(res); // Success
                                showToast('Product Updated Successfully!');
                                setTimeout(() => {
                                    navigate(   -1);
                                }, 1500);
                            }).catch(err => {
                                console.log(err);
                                showToast('product update createdocuemtn |Some Error Occured!', true);
                            })
                    }).catch(err => {
                        console.log('product update fileCreate|the error is:' + err);
                    })
            }


        },
    });

    useEffect(() => {
        console.log('inside edit product page');
        setIsLoading(true);
        // fetching product details 
        appObj.databases.getDocument(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_PRODUCTDB, product_id)
            .then((res) => {
                console.log('inside edit/get  product');
                console.log('res is ', res);
                formik.values.product_name = res.product_name;
                formik.values.product_desc = res.product_desc;
                formik.values.product_mrp = res.product_mrp;
                formik.values.product_category = res.product_category;
                setIsLoading(false);

            }).catch(err => {
                console.log('inside edit/get  product');
                console.log('err is ', err);
                setIsLoading(false);
            });

        // fetching the categoies also 
        appObj.databases.listDocuments(process.env.REACT_APP_DBKEY, process.env.REACT_APP_COLLECTION_ID_CATEGORY)
            .then((response) => {
                console.log('success from get Categories');
                console.log(response); // Success
                setCategoreis(response.documents);
            }).catch(err => {
                console.log('error from get Categories');
                console.log(err);
            });
    }, [])

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='pp-12 w-full  md:w-1/2 mx-auto' >

            <p className='text-center text-2xl md:text-4xl font-bold mt-6 md:mt-12 '>Edit Product Here</p>

            <form className='border-2 border-dark m-6 md:m-12 p-12 rounded-xl' onSubmit={formik.handleSubmit} >
                <div class="mb-6">
                    <label for="product_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input type="text" onChange={formik.handleChange} value={formik.values.product_name} id="product_name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                </div>
                <div class="mb-6">
                    <label for="product_desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                    <input type="text" onChange={formik.handleChange} value={formik.values.product_desc} id="product_desc" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                </div>
                <div class="mb-6">
                    <label for="product_mrp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your MRP</label>
                    <input type="number" onChange={formik.handleChange} value={formik.values.product_mrp} id="product_mrp" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div class="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" checked={imageCheckBox} onChange={() => setImageCheckBox(!imageCheckBox)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Want to update image also</label>
                </div>
                {imageCheckBox && <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                    <input onChange={(e) => setImage_file(e.target.files[0])} id="image_file" accept=".jpg, .jpeg, .png" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" />
                </div>}

                <div className='mb-6'>
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Company</label>
                    <select onChange={formik.handleChange} id='product_category' name='product_category' value={formik.values.product_category} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose Category</option>
                        {categoreis?.map(cmp => <option value={cmp.category_name}>{cmp.category_name}</option>)}
                    </select>
                </div>

                <button type="submit" class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save Changes</button>
            </form>


        </div>
    )
}

export default EditProduct