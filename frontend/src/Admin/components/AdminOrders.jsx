import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllOrdersAsync,
    selectOrders,
    selectTotalOrders,
    updateOrderAsync,
} from '../../Features/orders/orderSlice';
import {
    PencilIcon,
    EyeIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Chip
} from "@material-tailwind/react";

import Pagination from './Pagination';
import FilterOrders from './FilterOrders';

const TableRow = ({ order, index, editableOrderId, handleEdit, handleUpdate }) => {

    //   ---------- modal -------------
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const chooseColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-purple-200 text-purple-600';
            case 'dispatched':
                return 'bg-yellow-200 text-yellow-600';
            case 'delivered':
                return 'bg-green-200 text-green-600';
            case 'cancelled':
                return 'bg-red-200 text-red-600';
            default:
                return 'bg-purple-200 text-purple-600';
        }
    };

    const backgroundColor =
        index % 2 === 0
            ? "bg-white dark:bg-gray-800"
            : "bg-orange-50 dark:bg-gray-700";

    return (
        <tr className={backgroundColor}>
            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">{index + 1}</td>
            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">{order.id}</td>
            <td className="hidden md:block w-24 p-2">
                <img src={order.currentBuyNowProduct.thumbnail} alt={order.currentBuyNowProduct.title} />
            </td>
            <td className="px-2 py-4 font-semibold text-gray-900 dark:text-white">
                {order.currentBuyNowProduct.title}
            </td>
            <td className="px-3 py-4">
                <Chip color={`${order.paymentMethod == "CASH" ? 'amber' : 'green'}`} className='mx-auto w-full md:w-1/2 text-center' value={order.paymentMethod} />
            </td>
            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                ₹ {order.currentBuyNowProduct.price}
            </td>
            {/* ###### address ###### */}
            <td className="px-3 py-4 text-blue-400 cursor-pointer hover:text-orange-400" onClick={handleOpen}>
                <span >
                    Open Dialog
                </span>
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Delivery Details</DialogHeader>
                    <DialogBody divider>
                        <div >
                            <Typography
                                variant="small"
                                color="red"
                                className="font-semibold opacity-70"
                            >
                                Product Detail
                            </Typography>
                            <div className='flex justify-between py-2'>
                                {order.currentBuyNowProduct.title} 👉  ₹{order.currentBuyNowProduct.price} 👉 {order.paymentMethod}
                            </div>
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="red"
                                className="font-semibold opacity-70"
                            >
                                Address
                            </Typography>
                            <ul className='list-none my-2'>
                                <li className='mb-2'><b className='font-bold'>Email: </b>{order.address.email}</li>
                                <li className='mb-2'><b className='font-bold'>Phone: </b>{order.address.phone}</li>
                                <li className='mb-2'><b className='font-bold'>FullName: </b>{order.address.fullName}</li>
                                <li className='mb-2'><b className='font-bold'>Address: </b>{order.address.address}</li>
                                <li className='mb-2'><b className='font-bold'>Landmark: </b>{order.address.landmark}</li>
                                <li className='mb-2'><b className='font-bold'>City: </b>{order.address.city}</li>
                                <li className='mb-2'><b className='font-bold'>District: </b>{order.address.district}</li>
                                <li className='mb-2'><b className='font-bold'>Pincode: </b>{order.address.pincode}</li>
                            </ul>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="gradient" color="green" onClick={handleOpen}>
                            <span>Close</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </td>
            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                {order.currentBuyNowProduct.selectedSize} - {order.currentBuyNowProduct.quantity}
            </td>
            <td className="px-3 py-4">
                {order.id === editableOrderId ? (
                    <select onChange={(e) => handleUpdate(e, order)}>
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                ) : (
                    <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                        {order.status}
                    </span>
                )}
            </td>
            <td className="px-3 py-4">
                <div className="flex item-center justify-center">
                    <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                        <PencilIcon className="w-6 h-6" onClick={() => handleEdit(order)} />
                    </div>
                </div>
            </td>
        </tr>
    );
};

const AdminOrders = () => {
    const ITEMS_PER_PAGE = 10;
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const [sort, setSort] = useState({});

    const handleEdit = (order) => {
        setEditableOrderId(order.id);
    };

    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value };
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);
    };

    const handlePage = (page) => {
        setPage(page);
    };

    const handleSort = (sortOption) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        console.log({ sort });
        setSort(sort);
    };

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync({ sort, pagination }));
    }, [dispatch, sort, page]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg md-0 md:mx-6 mb-32 md:mb-0 my-10">
            <FilterOrders/>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-orange-500 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-3 py-3 border">
                            <span className="">Sr.No</span>
                        </th>
                        <th scope="col" className="px-3 py-3 border">
                            <span className="">Order Id</span>
                        </th>
                        <th scope="col" className="hidden md:block px-3 py-3 border">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-3 py-3 border">
                            Product
                        </th>
                        <th scope="col" className="px-3 py-3 border">
                            Payment Method
                        </th>
                        <th scope="col" className="px-3 py-3 border">
                            Price
                        </th>
                        <th scope="col" className="px-3 py-3 border">
                            Address
                        </th>
                        <th scope="col" className="px-3 py-3 border">
                            Size & Quantity
                        </th>
                        <th scope="col" className="px-3 py-3 border">
                            Status
                        </th>
                        <th scope="col" className="px-3 py-3 border">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <TableRow
                            key={order.id}
                            order={order}
                            index={index}
                            editableOrderId={editableOrderId}
                            handleEdit={handleEdit}
                            handleUpdate={handleUpdate}
                        />
                    ))}
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders} />

        </div>
    );
};

export default AdminOrders;
