"use client";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { AppDispatch } from "@/store/redux/store";
import { createProductAsync } from "@/lib/features/product/product-pc-async-thunk";

import {
  selectCategories,
  setCategories,
} from "@/lib/features/category/category-slice";
import { selectBrands, setBrands } from "@/lib/features/brand/brand-slice";
import { useAppSelector } from "@/store/redux/useSelector";
import { Card } from "@/components/ui/shadcn/card";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { productValidationRules } from "@/validation/zod/product-add-form";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { cn } from "@/utils/tw-merge/tw";
import { Button } from "@/components/ui/shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/shadcn/command";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { useBrands } from "@/lib/features/brand/brand-react-query";
import { useCategory } from "@/lib/features/category/category-react-query";
import { setLoading } from "@/lib/features/product/product-pc-slice";
import ReactHotToast from "@/toast/react-hot-toast";
import toast from "react-hot-toast";
import Context, { ProductDataInterface } from "@/store/context/context";

const INITIAL_FORM_STATE_PRODUCT_ADD_FORM: {
  title: string;
  description: string;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  price: number;
  stock: number;
  discountPercentage: number;
} = {
  title: "",
  description: "",
  brand: "",
  category: "",
  thumbnail: "",
  images: ["", "", ""],
  price: 0,
  stock: 0,
  discountPercentage: 0,
};

function AddNewProductForm() {
  const { data: brandsData, status: brandsStatus } = useBrands();
  const { data: categoryData, status: categoryStatus } = useCategory();
  const { isDarkTheme } = useContext(Context);
  useEffect(() => {
    if (brandsStatus === "loading") {
      dispatch(setLoading());
    }
    if (brandsStatus === "success") {
      dispatch(setBrands(brandsData));
    }
  }, [brandsData, brandsStatus]);

  useEffect(() => {
    if (categoryStatus === "loading") {
      dispatch(setLoading());
    }
    if (categoryStatus === "success") {
      dispatch(setCategories(categoryData));
    }
  }, [categoryData, categoryStatus]);
  const brands = useAppSelector(selectBrands);
  const categories = useAppSelector(selectCategories);
  const dispatch: AppDispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(productValidationRules),
    defaultValues: INITIAL_FORM_STATE_PRODUCT_ADD_FORM,
  });

  const { reset } = form;
  const { setProduct } = useContext(Context);
  const handleOnChange =
    <T extends HTMLInputElement | HTMLTextAreaElement>(field: any) =>
    (e: React.ChangeEvent<T>) => {
      // Call the original onChange handler from field
      field.onChange(e);

      // Then update the product data in your context
      setProduct((prevProduct) => ({
        ...prevProduct,
        [e.target.name]: e.target.value,
      }));
    };

  const onSubmit = (form: z.infer<typeof productValidationRules>) => {
    const product: ProductDataInterface = {
      title: form.title,
      description: form.description,
      brand: form.brand,
      category: form.category,
      thumbnail: form.thumbnail,
      images: form.images,
      price: form.price,
      stock: form.stock,
      discountPercentage: form.discountPercentage,
    };
    // dispatch action to create product
    dispatch(createProductAsync(product))
      .then(() => {
        toast.success(`${product.title}  is created successfully`, {
          duration: 4000,
          icon: "🚀",
          style: {
            background: isDarkTheme ? "#232c37" : "#fff",
            color: isDarkTheme ? "#fff" : "#000",
          },
          position: "top-right",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          duration: 4000,
          icon: "❓",
          style: {
            background: isDarkTheme ? "#232c37" : "#fff",
            color: isDarkTheme ? "#fff" : "#000",
          },
          position: "top-right",
        });
      });
    // reset form
    reset();
  };
  return (
    <>
      <ReactHotToast />
      <Card className="default-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto px-4 sm:px-6 lg:px-4 ">
              <div className="p-8">
                <div className="border-b dark:border-gray-400/25 border-gray-900/10 ">
                  <h2 className="block leading-6 text-gray-700 dark:text-gray-400 text-2xl font-semibold ">
                    Add Product
                  </h2>
                  <div className="border-t mt-4 mb-2 border-gray-800 py-2 dark:border-gray-200  "></div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <div className="mt-2">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                Product Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Product Name"
                                  className="default-input"
                                  onChange={handleOnChange(field)}
                                />
                              </FormControl>
                              <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                              Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Give a brief description of the product"
                                className="default-input"
                                {...field}
                                onChange={handleOnChange(field)}
                              />
                            </FormControl>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 ">
                              Brand
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full dark:hover:bg-stone-800 hover:accent-stone-400 shadow-2xl dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:text-sm sm:leading-6 justify-between rounded-md h-11 bg-white bg-opacity-40 dark:bg-stone-950/20",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? brands.find(
                                          (brand: any) =>
                                            brand.value === field.value,
                                        )?.label
                                      : "Select Brand"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0 h-60 bg-white dark:bg-[#1e1f20]">
                                <Command className="bg-white bg-opacity-40 dark:bg-stone-950/20">
                                  <CommandInput
                                    placeholder="Search for a brand "
                                    className="dark:hover:bg-stone-800  shadow-2xl  rounded-md h-9 mt-2 mb-2"
                                  />
                                  <CommandEmpty>No brands found</CommandEmpty>
                                  <ScrollArea className="h-60 w-full rounded-md ">
                                    <CommandGroup>
                                      {brands.map((brand: any) => (
                                        <CommandItem
                                          value={brand.label}
                                          key={brand.value}
                                          onSelect={() => {
                                            const selectedBrand = brand.value;
                                            // Update form value
                                            form.setValue(
                                              "brand",
                                              selectedBrand,
                                            );
                                            // Update product data in context
                                            setProduct((prevProduct) => ({
                                              ...prevProduct,
                                              brand: selectedBrand,
                                            }));
                                          }}
                                        >
                                          {brand.label}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              brand.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </ScrollArea>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 ">
                              Category
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full dark:hover:bg-stone-800 hover:accent-stone-400 shadow-2xl dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:text-sm sm:leading-6 justify-between rounded-md h-11 bg-white bg-opacity-40 dark:bg-stone-950/20",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? categories.find(
                                          (category: any) =>
                                            category.value === field.value,
                                        )?.label
                                      : "Select Category"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0 h-60 bg-white dark:bg-[#1e1f20]">
                                <Command className="bg-white bg-opacity-40 dark:bg-stone-950/20">
                                  <CommandInput
                                    placeholder="Search for a brand "
                                    className="dark:hover:bg-stone-800  shadow-2xl  rounded-md h-9 mt-2 mb-2"
                                  />
                                  <CommandEmpty>No brands found</CommandEmpty>
                                  <ScrollArea className="h-60 w-full rounded-md ">
                                    <CommandGroup>
                                      {categories.map((category: any) => (
                                        <CommandItem
                                          value={category.label}
                                          key={category.value}
                                          onSelect={() => {
                                            const selectedCategory =
                                              category.value;
                                            // Update form value
                                            form.setValue(
                                              "category",
                                              selectedCategory,
                                            );
                                            // Update product data in context
                                            setProduct((prevProduct) => ({
                                              ...prevProduct,
                                              category: selectedCategory,
                                            }));
                                          }}
                                        >
                                          {category.label}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              category.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </ScrollArea>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                              Price
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Ex: 1000"
                                className="default-input"
                                onChange={handleOnChange(field)}
                              />
                            </FormControl>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="discountPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                              Discount(%)
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Ex: 20"
                                className="default-input"
                                onChange={handleOnChange(field)}
                              />
                            </FormControl>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                              Stock
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Ex: 5"
                                className="default-input"
                                onChange={handleOnChange(field)}
                              />
                            </FormControl>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                              Thumbnail
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="Ex: https://example.com/thumbnail.jpg"
                                className="default-input"
                                onChange={handleOnChange(field)}
                              />
                            </FormControl>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <FormField
                        control={form.control}
                        name="images.0"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                              Image 1
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="Ex: https://example.com/image1.jpg"
                                className="default-input"
                                onChange={handleOnChange(field)}
                              />
                            </FormControl>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <FormField
                        control={form.control}
                        name="images.1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                              Image 2
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="Ex: https://example.com/image2.jpg"
                                className="default-input"
                                onChange={handleOnChange(field)}
                              />
                            </FormControl>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-6 mb-8">
                      <FormField
                        control={form.control}
                        name="images.2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                              Image 3
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="Ex: https://example.com/image3.jpg"
                                className="default-input"
                                onChange={handleOnChange(field)}
                              />
                            </FormControl>
                            <FormMessage className="ml-2 dark:text-[#ef5f1f] text-[#bc4a18]" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-x-6 pb-6">
                <motion.button
                  type="submit"
                  className="inline-flex rounded-md px-3 border-2 py-2 text-md font-semibold text-grey text-teal-900 dark:text-teal-200 shadow-sm hover:bg-grey-500 border-teal-600/50"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#37cfc2",
                    color: "#FFFFFF",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    initial={{ rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    <AiFillCloseSquare className="mt-0.5 mr-1" />
                  </motion.span>
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 mt-1 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 "
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#4A90E2",
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  <motion.span
                    initial={{ rotate: 0 }}
                    whileHover={{
                      rotate: 360,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                    transition={{ duration: 0.5 }}
                    className="inline-block mr-1 "
                  >
                    <FaSave />
                  </motion.span>
                  Save
                </motion.button>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
}

export default AddNewProductForm;
