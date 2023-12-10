// "use client";

// import ProductForm from "@/components/admin/pages/pc-components/ProductFrom/ProductForm";
// import { Button, AdminProductEditModal } from "flowbite-react";
// import { useState } from "react";
// import ProductEdit from "@/components/admin/pages/pc-components/ProductList/ProductEdit";
// import { TbEditOff } from "react-icons/tb";

// export default function Component({ product }: any) {
//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <>
//       <button
//         type="submit"
//         className="inline-flex rounded-md bg-blue-800 hover:bg-blue-500 mt-2 ml-2 dark:bg-cyan-700/60 px-1 py-1 text-sm font-semibold text-white shadow-sm dark:hover:bg-cyan-500/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//         onClick={() => {
//           setOpenModal(true);
//         }}
//       >
//         <TbEditOff className="mt-0.5 mr-1" />
//         Edit Your Product
//       </button>
//       <AdminProductEditModal dismissible show={openModal} onClose={() => setOpenModal(false)} size='2xl'>
//         <AdminProductEditModal.Header className="font-bold text-xl mt-2 mx-4 ">Product Update</AdminProductEditModal.Header>
//         <AdminProductEditModal.Body className="shadow-md">
//           <div className="my-auto h-[800px] overflow-y-auto">
//             <ProductEdit product={product} />
//           </div>
//         </AdminProductEditModal.Body>
//         <AdminProductEditModal.Footer></AdminProductEditModal.Footer>
//       </AdminProductEditModal>
//     </>
//   );
// }
