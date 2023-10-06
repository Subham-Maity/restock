import React, {useContext, useState} from 'react';
import {ConfigProvider, Space, Switch, Table, Tag, theme} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {useSelector} from "react-redux";
import {selectAllProducts_} from "@/app/components/products/pages/pc-components/productListSlice";
import Context from "@/context/Context";
import {useTheme} from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {FaArrowLeft} from "react-icons/fa";
import CustomButton from "@/app/components/CustomButton/CustomButton";
import {router} from "next/client";

interface DataType {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    images: String;
    totalImage:number;
}

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.title.localeCompare(b.title),
        filters: [
            {
                text: 'iPhone 9',
                value: 'iPhone 9',
            },
            {
                text: 'iPhone X',
                value: 'iPhone X',
            },
            {
                text: 'Samsung Universe 9',
                value: 'Samsung Universe 9',
            },
            // Add more filter options as needed
        ],
        onFilter: (value, record) => record.title === value,
        filterSearch:true,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        // You can add additional configuration specific to 'description' column here.
    },
    {
        title: 'Price',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },{
        title: 'Stock',
        dataIndex: 'stock',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.stock - b.stock,
    },{
        title: 'Discount',
        dataIndex: 'discountPercentage',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.discountPercentage - b.discountPercentage,
        render:(data)=>(
            <>
            <div className="flex justify-center">
                <span>{data}%
                </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full">
                <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-lime-500"
                    style={{ width: `${data}%` }}
                >
                </div>
            </div>
            </>
        ),
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.rating - b.rating,
        filters: [
            { text: '5 or less', value: '5' },
            { text: '4 or less', value: '4' },
            { text: '3 or less', value: '3' },
            { text: '2 or less', value: '2' },
            // Add more filter options as needed
        ],
        onFilter: (value, record) => record.rating < parseInt(value, 10),
    },
    {
        title: 'Category',
        dataIndex: 'category',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.category.localeCompare(b.category),
        filterSearch:true,
        filters: [
            {
                text: 'iPhone 9',
                value: 'iPhone 9',
            },
            {
                text: 'iPhone X',
                value: 'iPhone X',
            },
            {
                text: 'Samsung Universe 9',
                value: 'Samsung Universe 9',
            },
            // Add more filter options as needed
        ],
        onFilter: (value, record) => record.title === value,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.brand.localeCompare(b.brand),
    },{
        title: 'Images',
        dataIndex: 'images',
        render: (images) => (
            <div className="flex flex-wrap w-36 space-x-1 space-y-1">
                {images.map((image:any, index:any) => (
                    <Image
                        height={50}
                        width={50}
                        key={index}
                        src={image} // Use the image URL from the array
                        alt={`Image ${index + 1}`}
                        // style={{ maxWidth: '50px', maxHeight: '50px' }}
                        className="h-10 w-10 rounded-2xl "
                    />
                ))}
            </div>
            // images.length
        ),
    },{
        title:'Total Image',
        key:'totalImage',
        render:(data)=>(
            data.images.length
        )
    },{
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },{
        title:'View',
        key:'ViewPage',
        render:(data)=>(
            // <div className="mt-6">
            //     <Link  href="/">
            //     <button
            //         className="buyNow w-full flex items-center justify-center rounded-2xl border border-transparent bg-indigo-600 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            //     >
            //         View
            //     </button>
            //     </Link>
            // </div>
            <Link href={`/admin/admin-pc-components-details/${data.id}`}>
                <CustomButton
                className="animated-btn px-4 py-2 font-bold"
                title="Details"
                animated
                icon={<FaArrowLeft />}
                />
            </Link>
        )
    }
];

let data = [];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const App: React.FC = () => {
    const data = useSelector(selectAllProducts_);
    const [fixedTop, setFixedTop] = useState(false);
    const {isDarkTheme,setIsDarkTheme} = useContext(Context);
    const {themes} = useTheme();

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const isDarkMode = isDarkTheme;
    const {defaultAlgorithm,darkAlgorithm} = theme;
    return <ConfigProvider theme={{algorithm:isDarkMode?darkAlgorithm:defaultAlgorithm}}><Table columns={columns} dataSource={data} onChange={onChange} size="large" /></ConfigProvider>;
};

export default App;