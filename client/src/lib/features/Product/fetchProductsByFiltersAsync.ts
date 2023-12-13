import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    fetchAllProducts,
    fetchProductsByFilters,
    fetchBrands,
    fetchCategories,
    fetchProductById, createProduct, updateProduct,
} from "@/lib/api/Product/productListAPI";
import {
    Filter,
    Id,
    Pagination,
    Sort,
} from "@/lib/types/Product/productList.type";

interface ProductState {
    products: any[];
    status: "idle" | "loading";
    totalItems: number;
    brands?: any[];
    categories?: any[];
    selectedProduct?: any;
    allProducts: any[];
}

const initialState: ProductState = {
    products: [],
    status: "idle",
    totalItems: 0,
    brands: [],
    categories: [],
    selectedProduct: null,
    allProducts: []
};

export const fetchAllProductsAsync = createAsyncThunk(
    "product/fetchAllProducts",
    async () => {
        const response = await fetchAllProducts();
        return response.data;
    },
);

export const fetchAllStoreProductsAsync = createAsyncThunk(
    "product/fetchAllStoreProductsAsync",
    async () => {
        const response = await fetchAllProducts();
        return response.data;
    },
);

export const fetchAllProductByIdAsync = createAsyncThunk(
    "product/fetchProductById",
    async (id: any) => {
        const response = await fetchProductById(id);
        return response.data;
    },
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
    "product/fetchProductsByFilters",
    async ({
               filter,
               sort,
               pagination,
               admin,

           }: {
        filter: Filter;
        sort: Sort;
        pagination: Pagination;
        admin: boolean;

    }) => {
        const response = await fetchProductsByFilters(filter, sort, pagination, admin);
        return response.data;
    },
);

export const fetchBrandsAsync = createAsyncThunk(
    "product/fetchBrands",
    async () => {
        const response = await fetchBrands();
        return response.data;
    },
);
export const fetchCategoriesAsync = createAsyncThunk(
    "product/fetchCategories",
    async () => {
        const response = await fetchCategories();
        return response.data;
    },
);

export const createProductAsync = createAsyncThunk(
    "product/create",
    async (product:any) => {
        const response = await createProduct(product);
        return response.data;
    },
);
export const updateProductAsync = createAsyncThunk(
    'product/update',
    async (update:any) => {
        const response = await updateProduct(update);
        return response.data;
    }
);
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearSelectedProduct:(state)=>{
            state.selectedProduct = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload;
            })

            .addCase(fetchAllStoreProductsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.allProducts = action.payload;
            })

            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload.products;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(fetchBrandsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.brands = action.payload;
            })
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.categories = action.payload;
            })
            .addCase(fetchAllProductByIdAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.selectedProduct = action.payload;
            })
            .addCase(createProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products.push(action.payload);
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                state.products[index] = action.payload;
            });
    },
});
export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state: any) => state.product.products;
export const selectAllProducts_ = (state: any) => state.product.allProducts;
export const selectTotalItems = (state: any) => state.product.totalItems;

export const selectBrands = (state: any) => state.product.brands;

export const selectCategories = (state: any) => state.product.categories;

export const selectProductById = (state: any) => state.product.selectedProduct;

export default productSlice.reducer;
