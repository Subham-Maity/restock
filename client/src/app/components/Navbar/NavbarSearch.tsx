import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export const NavbarSearch = ({ items }: any) => {
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
        console.log("pc-components-details/",item);
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
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        maxResults={5} // Set the maximum number of results to display in the dropdown
                        className="focus:outline-none text-white"
                        styling={{
                            height: '44px',
                            color: 'white',
                            border: '1px solid #dfe1e5',
                            borderRadius: '24px',
                            backgroundColor: '#2a2a2b',
                            boxShadow: 'rgba(32, 33, 36, 0.28) 0px 1px 6px 0px',
                            hoverBackgroundColor: '#51555f',
                            fontSize: '16px',
                            fontFamily: 'Arial',
                            iconColor: 'grey',
                            lineColor: 'rgb(232, 234, 237)',
                            placeholderColor: 'grey',
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
