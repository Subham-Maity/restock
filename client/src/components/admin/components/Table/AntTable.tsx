"use client";
import React, { useContext, useState } from "react";
import { ConfigProvider, Space, Table, theme } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useSelector } from "react-redux";
import { selectAllProducts_ } from "@/lib/features/Product/fetchProductsByFiltersAsync";
import Context from "@/lib/context/Context";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "@/components/CustomButton/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import BgAdminTailwindWrapper from "@/lib/wrapper/AdminPannel/BgTailwindWrapper";
import { Switch } from "antd";
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
  totalImage: number;
}

const AntTable: React.FC = () => {
  const data = useSelector(selectAllProducts_);
  const { isDarkTheme, setIsDarkTheme } = useContext(Context);
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.title.localeCompare(b.title),

      filters: [
        {
          text: "iPhone 9",
          value: "iPhone 9",
        },
        {
          text: "iPhone X",
          value: "iPhone X",
        },
        {
          text: "Samsung Universe 9",
          value: "Samsung Universe 9",
        },
      ],
      onFilter: (value, record) => record.title === value,
      filterSearch: true,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      defaultSortOrder: "descend",
      render: (data) => (
        <>
          <div className="flex justify-center">
            <span>{data}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-lime-500"
              style={{ width: `${data}%` }}
            ></div>
          </div>
        </>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: (
        <span
        // style={{
        //   color: isDarkTheme ? "black" : "white",
        //   fontSize: "1.2rem",
        // }}
        >
          Rating
        </span>
      ),
      dataIndex: "rating",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        { text: "5 or less", value: "5" },
        { text: "4 or less", value: "4" },
        { text: "3 or less", value: "3" },
        { text: "2 or less", value: "2" },
        // Add more filter options as needed
      ],
      //@ts-ignore
      onFilter: (value, record) => record.rating < parseInt(value, 10),
      // render: (text) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.category.localeCompare(b.category),
      filterSearch: true,
      filters: [
        {
          text: "iPhone 9",
          value: "iPhone 9",
        },
        {
          text: "iPhone X",
          value: "iPhone X",
        },
        {
          text: "Samsung Universe 9",
          value: "Samsung Universe 9",
        },
      ],
      onFilter: (value, record) => record.title === value,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Images",
      dataIndex: "images",
      render: (images) => (
        <div className="flex flex-wrap w-36 space-x-1 space-y-1">
          {images.map((image: any, index: any) => (
            <Image
              height={50}
              width={50}
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="h-10 w-10 rounded-2xl "
            />
          ))}
        </div>
      ),
    },
    {
      title: "Total Image",
      key: "totalImage",
      render: (data) => data.images.length,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
    {
      title: "View",
      key: "ViewPage",
      render: (data) => (
        <Link href={`/admin/admin-pc-components-details/${data.id}`}>
          <CustomButton
            className="animated-btn px-4 py-2 font-bold"
            title="Details"
            animated
            icon={<FaArrowLeft />}
          />
        </Link>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const isDarkMode = isDarkTheme;
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const mobileColumns = columns.map((column) => ({
    ...column,
    ellipsis: true, // Show ellipsis for truncated text
    responsive: ["md"], // Make columns responsive for mobile devices (using medium size as an example)
  }));
  const [fixedTop, setFixedTop] = useState(false);
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        hashed: true,
        inherit: true,
        token: {
          colorPrimary: isDarkMode ? "#fff" : "#3f3f3f",
          borderRadius: 2,
          colorBgContainer: isDarkMode ? "#2b3039" : "#ceccce",
          colorBorder: isDarkMode ? "#2b3039" : "#fff",
          colorText: isDarkMode ? "#fff" : "#3f3f3f",
          fontSize: 14,
        },
      }}
    >
      <div className="lg:mr-16">
      <BgAdminTailwindWrapper>
          <Table
            className="border border-gray-400/25 shadow-gray-200/10 shadow-md"
            size="large"
            columns={columns}
            dataSource={data}
            onChange={onChange}
            scroll={{ y: "680px", x: "1800px" }}
            // sticky={{ offsetHeader: 0 }}
            // scroll={{ x: 1800 }}
          />
      </BgAdminTailwindWrapper>
      </div>
    </ConfigProvider>
  );
};

export default AntTable;
