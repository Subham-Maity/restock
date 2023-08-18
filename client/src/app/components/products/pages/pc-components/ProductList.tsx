"use client";

import {Fragment, useEffect, useState} from "react";
import {Dialog, Disclosure, Menu, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon, StarIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {selectAllProducts, fetchAllProductsAsync} from "@/app/components/products/pages/pc-components/productListSlice";


const sortOptions = [
    {name: "Most Popular", href: "#", current: true},
    {name: "Best Rating", href: "#", current: false},
    {name: "Newest", href: "#", current: false},
    {name: "Price: Low to High", href: "#", current: false},
    {name: "Price: High to Low", href: "#", current: false},
];
const subCategories = [
    {name: "Totes", href: "#"},
    {name: "Backpacks", href: "#"},
    {name: "Travel Bags", href: "#"},
    {name: "Hip Bags", href: "#"},
    {name: "Laptop Sleeves", href: "#"},
];
const filters = [
    {
        id: "color",
        name: "Color",
        options: [
            {value: "white", label: "White", checked: false},
            {value: "beige", label: "Beige", checked: false},
            {value: "blue", label: "Blue", checked: true},
            {value: "brown", label: "Brown", checked: false},
            {value: "green", label: "Green", checked: false},
            {value: "purple", label: "Purple", checked: false},
        ],
    },
    {
        id: "category",
        name: "Category",
        options: [
            {value: "new-arrivals", label: "New Arrivals", checked: false},
            {value: "sale", label: "Sale", checked: false},
            {value: "travel", label: "Travel", checked: true},
            {value: "organization", label: "Organization", checked: false},
            {value: "accessories", label: "Accessories", checked: false},
        ],
    },
    {
        id: "size",
        name: "Size",
        options: [
            {value: "2l", label: "2L", checked: false},
            {value: "6l", label: "6L", checked: false},
            {value: "12l", label: "12L", checked: false},
            {value: "18l", label: "18L", checked: false},
            {value: "20l", label: "20L", checked: false},
            {value: "40l", label: "40L", checked: true},
        ],
    },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export const PcComponentFilter = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    return (
        <div className="mt-4  ">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel
                                    className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-[#2f3349] py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                            Filters
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 dark:bg-[#1c1f2d]"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul
                                            role="list"
                                            className="px-2 py-3 font-medium text-gray-900"
                                        >
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <Link
                                                        href={category.href}
                                                        className="block px-2 py-3 dark:text-white"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-t border-gray-200 px-4 py-3 dark:dg-[#2f3349] dark:text-white "
                                            >
                                                {({open}) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root ">
                                                            <Disclosure.Button
                                                                className="flex w-full items-center justify-between px-2 py-3 hover:text-gray-500 dark:hover:bg-[#34384e] dark:hover:text-[#8669de]">
                                                                {/*Mobile text*/}
                                                                <span className="font-medium ">
                                  {section.name}
                                </span>
                                                                <span className="ml-6 flex items-center">
                                  {open ? (
                                      <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                      />
                                  ) : (
                                      <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                      />
                                  )}
                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div
                                                                        key={option.value}
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-white dark:hover:text-[#8669de]"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className=" mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                            New Arrivals
                        </h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md dark:bg-[#25293c] shadow-xl dark:shadow-[#292045] shadow-[#f3f4f6] ring-1 ring-black bg-white ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({active}) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                // Somthing is wrong here why we are using active?
                                                                option.current
                                                                    ? "dark:hover:bg-[#343756] hover:bg-[#f3f4f6] text-gray-800 dark:text-[#d9d8ff] dark:bg-[#25293c ] dark:hover:text-[#7f70ff] "
                                                                    : "dark:hover:bg-[#343756] hover:bg-[#f3f4f6] text-gray-800 dark:text-[#d9d8ff] dark:bg-[#25293c ] dark:hover:text-[#7f70ff] ",
                                                                active ? "" : "",
                                                                "block px-4 py-2 text-sm",
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button
                                type="button"
                                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                            >
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true"/>
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block product-card p-4">
                                <h3 className="sr-only">Categories</h3>
                                <ul
                                    role="list"
                                    className="space-y-4 border-b border-gray-200 pb-6 text-base font-medium text-gray-900"
                                >
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <Link href={category.href} className="dark:text-white">
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="border-b border-gray-200 py-3 dark:text-white"
                                    >
                                        {({open}) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    {/*Here it is*/}
                                                    <Disclosure.Button
                                                        className="flex w-full items-center justify-between py-3 text-sm text-black hover:text-gray-500 dark:hover:bg-[#34384e] px-2 dark:text-white dark:hover:text-[#8669de]">
                                                        <span className="font-medium">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                              {open ? (
                                  <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                  />
                              ) : (
                                  <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                  />
                              )}
                            </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div
                                                                key={option.value}
                                                                className="flex items-center"
                                                            >
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600 dark:text-white dark:hover:text-[#8669de] "
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                            <div className="lg:col-span-3">
                                <PcComponentProductList></PcComponentProductList>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export const PcComponentProductList = () => {
    const products = useSelector(selectAllProducts);
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchAllProductsAsync());
    }, [dispatch]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    return (
        <div>
            <div>
                <div className="product-card">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl  lg:px-8">
                        <h2 className="sr-only">Products</h2>

                        <div
                            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map((product: any) => (
                                <Link href="/" key={product.id}>
                                    <div
                                        className="group relative shadow-2xl  border dark:border-gray-400/25 sha rounded-lg p-2 ">
                                        <div
                                            className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                            <Image
                                                width={300}
                                                height={300}
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <h3 className="text-sm dark:text-gray-200 text-gray-700">
                                                    <a href={product.thumbnail}>
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                    />
                                                        {product.title}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    <StarIcon className="w-6 h-6 inline"></StarIcon>
                                                    <span className=" align-bottom">
                                    {product.rating}
                                  </span>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm block font-medium text-gray-900">

                                                    ₹{Math.round(
                                                    product.price *
                                                    (1 - product.discountPercentage / 100)
                                                )}/-
                                                </p>
                                                <p className="text-sm block line-through font-medium text-gray-400">
                                                    ₹{product.price}/-
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
