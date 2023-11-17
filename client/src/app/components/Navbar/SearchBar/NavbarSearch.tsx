import React, {useState, useEffect, useContext} from 'react';
import Image from 'next/image';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectBrands, selectCategories} from "@/app/components/products/pages/pc-components/productListSlice";
import {useRouter} from "next/navigation";
import Context from "@/context/Context";



export const NavbarSearch = ({ items }: any) => {
    const {isDarkTheme} = useContext(Context);
    const router = useRouter();
    var oldKey = 'title';
    var newKey = 'name';
    var newArray = items.map(function(obj:any) {
        var newObj = {};
        for (var key in obj) {
            if (key === oldKey) {
                // @ts-ignore
                newObj[newKey] = obj[key];
            } else {
                // @ts-ignore
                newObj[key] = obj[key];
            }
        }
        return newObj;
    });
    items = newArray;

    const [showComponent, setShowComponent] = useState(false);

    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);

    const filters = [
        {
            id: "category",
            name: "Category",
            options: categories,
        },
        {
            id: "brand",
            name: "Brands",
            options: brands,
        },
    ];

    useEffect(() => {
        // This will be executed after the initial render
        setShowComponent(true);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleOnSearch = (string: any, results: any) => {
        // console.log(string, results);

    };

    const handleOnHover = (result: any) => {
        // console.log(result);
    };

    const handleOnSelect = (item: any) => {
        // onClick("pc-components-details/",item);
        // window.location.href = `/pc-components-details/${item.id}`;
        router.push(`/pc-components-details/${item.id}`);
        // console.log(item);
    };

    const handleOnFocus = () => {
        console.log('Focused');
    };

    const formatResult = (item: any) => {
        if (!item) {
            return null; // or some default content
        }
        return (
            <Link href={"/pc-components-details/64"}>
            <div className="grid h-20 grid-cols-4">
                <div className="object-fill object-center">
                    <Image
                        className="w-full h-full object-fill object-center"
                        src={item.thumbnail}
                        alt={item.category}
                        height={100}
                        width={80}
                    />
                </div>
                <div className="col-span-3 flex pl-4 items-center">{item.name}</div>
            </div>
            </Link>
        );
    };

    return (
        <div className={`App ${showComponent ? '' : 'hidden'}`}>
            <header className="App-header">
                <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={onclick => handleOnSelect(onclick)}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        maxResults={5} 
                        className="focus:outline-none text-white"
                        styling={{
                            height: '44px',
                            color: isDarkTheme ? '#FFFFFF' : '#000000',
                            border: isDarkTheme ? '1px solid #000000' : '1px solid #FFFFFF',
                            borderRadius: '24px',
                            backgroundColor: isDarkTheme ? '#2a2a2b' : '#FFFFFF',
                            boxShadow:isDarkTheme ? 'rgba(32, 33, 36, 0.28) 0px 1px 6px 0px' : 'rgba(32, 33, 36, 0.28) 0px 1px 6px 0px',
                            hoverBackgroundColor: isDarkTheme ? '#51555f' : '#ebebeb',
                            fontSize: '16px',
                            fontFamily: 'Arial',
                            iconColor: 'grey',
                            lineColor: isDarkTheme ? `rgb(232, 234, 237)` : `rgb(232, 234, 237)`,
                            placeholderColor: isDarkTheme ? "gray" : "#dfe1e5",
                            clearIconMargin: '3px 14px 0 0',
                            searchIconMargin: '0 0 0 16px',
                        }}
                    />
                </div>
            </header>
        </div>
    );
};

export default NavbarSearch;
