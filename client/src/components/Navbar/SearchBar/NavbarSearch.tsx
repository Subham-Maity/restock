import React, {useState, useEffect, useContext} from 'react';
import Image from 'next/image';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProductsByFiltersAsync,
    selectBrands,
    selectCategories
} from "@/lib/features/Product/productListSlice";
import {useRouter} from "next/navigation";
import Context from "@/lib/context/Context";
import {ITEMS_PER_PAGE} from "@/lib/constant/constants";

interface Filter {
    [key: string]: string[];
}

interface SortOption {
    _sort: string;
    _order: string;

    [key: string]: any;
}

export const NavbarSearch = ({ items }: any) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<Filter>({});
    const [sort, setSort] = useState<SortOption>({
        _sort: "rating",
        _order: "desc",
    } as SortOption);


    const [latestArray,setLatestArray] = useState();
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

    // const filters = [
    //     {
    //         id: "category",
    //         name: "Category",
    //         options: categories,
    //     },
    //     {
    //         id: "brand",
    //         name: "Brands",
    //         options: brands,
    //     },
    // ];

    useEffect(() => {
        // This will be executed after the initial render
        setShowComponent(true);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleOnSearch = (string: any, results: any) => {
        // console.log(string, results);
        setLatestArray(results);
    };

    const handleOnHover = (result: any) => {
        // console.log(result);
        console.log(result,"hover");
    };

    const handleOnSelect = (item: any) => {
        // onClick("pc-components-details/",item);
        // window.location.href = `/pc-components-details/${item.id}`;
        router.push(`/pc-components-details/${item.id}`);
        console.log(item,"clicken on select");
        // console.log(item);
    };

    const handleOnFocus = () => {
        console.log('Focused');
    };

    // useEffect(() => {
    //     const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    //     dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
    // }, [dispatch, filter, sort, page]);

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

    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
            // Perform the action you want here
            // @ts-ignore
            console.log("select catagory...........", latestArray[0].category);
            // setFilter(newFilter);
            const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
            // @ts-ignore
            let filter={"category":[latestArray[0].category]};
            router.push("/");
            // @ts-ignore
            dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
            // @ts-ignore
            dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
            // @ts-ignore
            dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
        }
    };

    return (
        <div className={`App ${showComponent ? '' : 'hidden'}`}>
            <header className="App-header">
                <div style={{ width: 800 }} onKeyDown={handleKeyDown}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={(onclick: any) => handleOnSelect(onclick)}
                        onFocus={handleOnFocus}
                        formatResult={formatResult}
                        placeholder={"Search here..."}
                        maxResults={5}
                        // autoFocus={true}
                        // showNoResultsText={"HI"}
                        // showNoResults={true}
                        // showClear={true}
                        // showItemsOnFocus={false}
                        className="focus:outline-none text-white testing_search_bar"
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
