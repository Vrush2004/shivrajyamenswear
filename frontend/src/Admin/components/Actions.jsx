import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Actions = () => {
    const navigate = useNavigate();
    return (
        <>
        <h2 className='mt-4 mx-4 cursor-pointer' onClick={()=>navigate(-1)}>👈 Go back</h2>
            <div className='flex justify-around my-5 mx-4 gap-4'>
                <Link to="/admin/product-form" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Add Product
                </Link>
                <Link to="/adminPanel/featuredProduct" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-indigo-700 rounded">
                    Featured Product
                </Link>
                <Link to="/adminPanel/orders" class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-700 rounded">
                    Orders
                </Link>
            </div>
        </>
    )
}

export default Actions