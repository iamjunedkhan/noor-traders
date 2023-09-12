import React, { useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AppwriteConfig } from '../appwrite/appWriteConfig';
import { AppContext } from '../context/appContext';
import { addProduct } from '../features/cart/cartSlice';


const appwrite = new AppwriteConfig();
const ProductCard = ({ productName, desc, company, mrp, img, img_id, id, category }) => {
    const dispatch = useDispatch();
    const parentRef = useRef();
    const isLoggedIn = useSelector(state => state.admin.is_logged_in);
    const { showToast } = useContext(AppContext);
    const navigate= useNavigate();

    console.log('image id in product card is:', img_id);
    
    const handleDelete = (id, imgId) => {
        console.log('insdie handldelte');
        console.log('the id is ', { id });
        appwrite.deleteProduct(id, imgId)
            .then(res => {
                console.log(res);
                parentRef.current.remove();
            })
            .catch(err => { console.log(err); })
    }
    const handleEdit = (id)=>{
        navigate('/admin/edit-product/'+id);
    }
    return (
        <div class="p-4 md:w-1/3 sm:w-1/2 " ref={parentRef}>
            <div class="flex-col justify-between h-full border-2 productCard_shadow  border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img class="lg:h-48 md:h-36 w-full object-cover object-center" src={img} alt="blog" />
                <div class="p-6">
                    <div>
                        <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb">{category}</h2>
                        <h1 class="title-font text-base md:text-lg font-medium text-gray-900 mb-1">{productName} ({desc})</h1>
                        <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">MRP:{mrp}Rs</span>
                    </div>
                    <div class="flex   items-center justify-between flex-wrap my-2 ">
                        <button type="button" class="text-white  bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 w-full md:w-fit "
                            onClick={() => {
                                showToast('Product Added To cart!');
                                dispatch(addProduct({ product_name: productName, quantity: 1, id: id }))
                            }
                            }
                        >Add To Cart</button>
                        {isLoggedIn && <button type="button" class="text-white  bg-green-700  hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  w-full md:w-fit flex-1" onClick={()=>handleEdit(id)}>Edit</button>}
                        {isLoggedIn && <button type="button" onClick={() => handleDelete(id, img_id)} class="text-white  bg-red-700  hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  w-full md:w-fit flex-1">Delete</button>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard