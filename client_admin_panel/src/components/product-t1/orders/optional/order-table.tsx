"use client";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

import {
  selectOrders,
  selectTotalOrders,
} from "@/lib/features/order/order-slice";
import { AppDispatch } from "@/store/redux/store";
import { discountedPrice, ITEMS_PER_PAGE } from "@/constant/constants";
import Image from "next/image";
import { Order } from "@/types/redux-slice/order/order.slice.type";
import {
  fetchAllOrdersAsync,
  updateOrderAsync,
} from "@/lib/features/order/order-async-thunk";
import { SortOption } from "@/types/utility/core/sort/sort.type";
import { useAppSelector } from "@/store/redux/useSelector";
import { OrderPaginationPage } from "@/components/product-t1/core/pagination/order-pagination";

function OrderTable() {
  const [page, setPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const orders: Order[] = useAppSelector(selectOrders);
  const totalOrders = useAppSelector(selectTotalOrders);
  console.log(orders + " totalOrders: " + totalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState<SortOption>({
    _sort: "rating",
    _order: "desc",
  } as SortOption);

  const handleEdit = (order: Order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {};

  const handleUpdate = (e: ChangeEvent<HTMLSelectElement>, order: Order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page: SetStateAction<number>) => {
    setPage(page);
  };

  const handleSort = (sortOption: { sort: any; order: any }) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  const chooseColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order#
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order?.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item: any, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2">
                            <Image
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              width={50}
                              height={50}
                            />
                          </div>
                          <span>
                            {item.product.title} - #{item.product.quantity}- ₹
                            {discountedPrice(item.product)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        ₹{order?.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="">
                        <div>
                          <strong>{order?.selectedAddress?.name}</strong>,
                        </div>
                        <div>{order?.selectedAddress?.street},</div>
                        <div>{order?.selectedAddress?.city},</div>
                        <div>{order?.selectedAddress?.state},</div>
                        <div>{order?.selectedAddress?.pinCode},</div>
                        <div>{order?.selectedAddress?.phone},</div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order?.status,
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order?.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-8 h-8"
                            onClick={(e) => handleShow()}
                          ></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <OrderPaginationPage
        page={page}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></OrderPaginationPage>
    </div>
  );
}

export default OrderTable;
