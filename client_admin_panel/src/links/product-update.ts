//Use: Flags for modals
//PURPOSE: If you pass this flag modal will be open.
export const OPEN_MODAL = "/?showDialog=y";

// ()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()

//Use: Update Product/No URL Parameter
//PURPOSE: If no id is found in the URL or the id is not valid, then redirect to this page.
//Example: /product-t1-update/ -> /product-t1-update/no-url-parameter
export const REDIRECT_TO_THE_PRODUCT_LIST = "/product-t1-product-list";

// ()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()

//Use: Update Product/No URL Parameter
//PURPOSE: If no id is found in the URL or the id is not valid, then redirect to this page.
//Example: /product-t1-update/ -> /product-t1-update/no-url-parameter
export const editProduct = "/product-t1-update-form/";

// ()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()

//Use: Update Product/No URL Parameter
//PURPOSE: If no id is found in the URL or the id is not valid, then redirect to this page.
//Example: /product-t1-update/ -> /product-t1-update/no-url-parameter
export const REDIRECT_TO_THE_PRODUCT_UPDATE_UPDATE =
  "/product-t1-update-form/update/";

// ()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()

//Use: Product Creation Form, Action Create
//PURPOSE: If user is not in this route show a different button if present shows another button & Redirect to the manin product form
//REASON: On the main page, we use a ‘danger’ modal button. This button doesn’t function within other modals,
// only on the main page. Therefore, when a modal is displayed on the main page, another modal won’t work within it.
// To resolve this, we need to create a separate modal with a distinct button. This new modal will render based on the path,
// allowing us to determine whether to display the modal or not.
export const PATH_CHECK_PRODUCT_FORM_U_1 = "/product-t1-update-form/update";
export const PATH_CHECK_PRODUCT_FORM_U_2 = "/product-t1-update-form";

// ()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()

//Use: Product Creation Form
//PURPOSE: In Modal after save redirect to the product list page.
export const MODAL_AFTER_SAVE_REDIRECT_U = "/product-t1-product-list";
