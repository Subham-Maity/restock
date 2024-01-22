### Info

#### **Server_v2**

- **API Documentation**:
    - Swagger Docs(`/api/v1/docs`)
- **Types Defined**:
    - Products
    - Brand
    - Category
    - User
    - Auth
    - Cart
- **Models Defined**:
    - Products (Schema, Virtual ID,index)
    - Brand (Schema, Virtual ID)
    - Category (Schema, Virtual ID)
    - User (Schema, Virtual ID)
    - Cart (Schema, Virtual ID)
- **Controllers Defined**:
    - ProductController(Create Products, Get Products (Filtering, Sorting, Pagination, Search))
    - BrandController(Create Brand, Get Brand)
    - CategoryController(Create Category, Get Category)
    - UserController(Fetch User Details, Update User Details)
    - AuthController(Login, Register, Check Auth)
    - CartController(Add To Cart, Get Cart, Delete Cart, Update Cart)
- **Validators Defined**:
    - Products
    - Brand
    - Category
    - User
    - Auth
    - Cart
- **Routes Defined**: (Check Swagger Docs)
  -Products[Create Products , Get Products (Filtering, Sorting, Pagination , Search), Get Product By ID , Update Product By ID]
    - Brand[Create Brand, Get Brand]
    - Category[Create Category, Get Category]
    - User[Fetch User Details, Update User Details]
    - Auth[Login, Register,Chech Auth]
    - Cart[Add To Cart, Get Cart, Delete Cart, Update Cart]#
- **Authentication**:
    - JWT(Passport)
        
