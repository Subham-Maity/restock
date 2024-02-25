//Use: Flags for modals
//PURPOSE: If you pass this flag modal will be open.
export const OPEN_MODAL = "/?showDialog=y";

// ()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()

//Use: Product Creation Form
//PURPOSE: In Modal after save redirect to the product list page.
export const MODAL_AFTER_SAVE_REDIRECT = "/product-t1-product-list";

// ()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()

//Use: Product Creation Form, Action Create
//PURPOSE: If user is not in this route show a different button if present shows another button & Redirect to the manin product form
//REASON: On the main page, we use a ‘danger’ modal button. This button doesn’t function within other modals,
// only on the main page. Therefore, when a modal is displayed on the main page, another modal won’t work within it.
// To resolve this, we need to create a separate modal with a distinct button. This new modal will render based on the path,
// allowing us to determine whether to display the modal or not.
export const PATH_CHECK_PRODUCT_FORM = "/product-t1-add-form";
