import { useFormik } from "formik";
import { useUpdateProduct, useDeleteProduct } from "../../../hooks/product";
import { useSelector } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { isValidId } from "../../../utils/validations";
import { editProductSchema } from "../../../validationSchemas"; 
import useFetchData from "../../../hooks/useFetchData";
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

const EditProductPage = () => {
  const { productId } = useParams();
  if (!isValidId(productId)) return <Navigate to="/page-not-found" />;

  const { data, isLoading, error } = useFetchData(`/api/products/${productId}`);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const user = useSelector((state) => state.user.user);

  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  /* Initialize formik with initial values for updating product */
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      condition: "",
      price: "",
      stockQuantity: "",
      categoryId: "",
    },
    /* Add YUP to validate product inputs */
    validationSchema: editProductSchema,
    /* Call updateProduct hook to make a request to server to update product */
    onSubmit: (values) => {
      updateProduct(values, productId)
    }
  });

  /* Set the product image when user add product image */
  const onDrop = useCallback(acceptedFile => {
    formik.setFieldValue("productImage", acceptedFile[0]);
    setPreviewImageUrl(URL.createObjectURL(acceptedFile[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"]
    },
    maxSize: 2097152 // 2MB
  });

  const handleDeleteProduct = () => {
    deleteProduct(productId);
  };

  useEffect(() => {
    if (data) {
      formik.setFieldValue("name", data.product.name || "");
      formik.setFieldValue("description", data.product.description || "");
      formik.setFieldValue("condition", data.product.condition || "");
      formik.setFieldValue("price", data.product.price || "");
      formik.setFieldValue("stockQuantity", data.product.stockQuantity || "");
      formik.setFieldValue("categoryId", data.product.categoryId || "");
    }
    /* Remove product object url when component unmount */
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [data, previewImageUrl]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <Navigate to="/page-not-found" />;
    
  if (data.product && data.product.userId !== user.userId) return <Navigate to="/page-not-found" />;
  
  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Edit Product</h2>
      <div>
        {data.product.imageUrl && <img src={`${serverURL}${data.product.imageUrl}`} alt="Product" />}
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <label>Name: </label>
            <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="field">
            <label>Description: </label>
            <textarea name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="field">
            <label>Condition: </label>
            <select name="condition" value={formik.values.condition ? formik.values.condition : data.product.condition} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded p-2 w-full" >
              <option value="" label="Select condition" />
              <option value="new" label="New" />
              <option value="like new" label="Like New" />
              <option value="refurbished" label="Refurbished" />
              <option value="used" label="Used" />
              <option value="open box" label="Open Box" />
              <option value="damaged" label="Damaged" />
              <option value="for parts" label="For Parts" />
            </select>
            {formik.touched.condition && formik.errors.condition ? (
              <div className="text-red-500">{formik.errors.condition}</div>
            ) : null}
          </div>
          <div className="field">
            <label>Price: <span>$</span> </label>
            <input type="number" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="field">
            <label>Stock Quantity: </label>
            <input type="number" name="stockQuantity" value={formik.values.stockQuantity} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.touched.stockQuantity && formik.errors.stockQuantity ? (
              <div className="text-red-500">{formik.errors.stockQuantity}</div>
            ) : null}
          </div>
          <div className="field">
            <label>Category</label>
            <select name="categoryId" value={formik.values.categoryId ? formik.values.categoryId : data.product.categoryId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded p-2 w-full" >
              <option value="" label="Select category" />
              <option value="1" label="Antiques" />
              <option value="2" label="Appliances" />
              <option value="3" label="Art" />
              <option value="4" label="Automotive" />
              <option value="5" label="Baby" />
              <option value="6" label="Books" />
              <option value="7" label="DIY & Hardware" />
              <option value="8" label="Electronics" />
              <option value="9" label="Fashion & Apparel" />
              <option value="10" label="Food & Beverages" />
              <option value="11" label="Health & Beauty" />
              <option value="12" label="Home & Garden" />
              <option value="13" label="Movies & Music" />
              <option value="14" label="Office Supplies" />
              <option value="15" label="Pet Supplies" />
              <option value="16" label="Sports & Outdoors" />
              <option value="17" label="Toys & Games" />
            </select>
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <div className="text-red-500">{formik.errors.categoryId}</div>
            ) : null}
          </div>
          <div>
            <div {...getRootProps()} className="flex justify-between border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500">
              <div className="w-1/4">
                {previewImageUrl && <><img src={previewImageUrl} name="productImage" alt={formik.values.name} className="w-40 h-40 object-contain" />
                  <p className="mt-2 text-center text-gray-700">{formik.values.name}</p> </>}
              </div>
              <div className="w-3/4">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-gray-500">Drop the file here...</p>
                ) : (
                  <p className="text-gray-500">Drag and drop some file here, or click to select file</p>
                )}
              </div>
            </div>
            {formik.touched.productImage && formik.errors.productImage ? (
                <div className="text-red-500">{formik.errors.productImage}</div>
              ) : null}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Update product</button>
        </form>
      </div>
      <button onClick={handleDeleteProduct} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"> Delete product </button>
    </div>
  );
};

export default EditProductPage;






      // formik.setFieldValue("name", data.product.name);
      // formik.setFieldValue("description", data.product.description);
      // formik.setFieldValue("condition", data.product.condition);
      // formik.setFieldValue("price", data.product.price);
      // formik.setFieldValue("stockQuantity", data.product.stockQuantity);
      // formik.setFieldValue("categoryId", data.product.categoryId);



// import { useFormik } from "formik";
// import { useUpdateProduct, useDeleteProduct } from "../../../hooks/product";
// import { useSelector } from 'react-redux';
// import { useParams, Navigate } from "react-router-dom";
// import { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { isValidId } from "../../../utils/validations";
// import { editProductSchema } from "../../../validationSchemas"; 
// import useFetchData from "../../../hooks/useFetchData";
// const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

// const EditProductPage = () => {
//   const { productId } = useParams();
//   if (!isValidId(productId)) return <Navigate to="/page-not-found" />;

//   const { data, isLoading, error } = useFetchData(`/api/products/${productId}`);
//   const [previewImageUrl, setPreviewImageUrl] = useState(null);
//   const user = useSelector((state) => state.user.user);

//   const updateProduct = useUpdateProduct();
//   const deleteProduct = useDeleteProduct();

//   /* Initialize formik with initial values for updating product */
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       description: "",
//       condition: "",
//       price: "",
//       stockQuantity: "",
//       categoryId: "",
//       productImage: ""
//     },
//     /* Add YUP to validate product inputs */
//     validationSchema: editProductSchema,
//     /* Call updateProduct hook to make a request to server to update product */
//     onSubmit: (values) => {
//       updateProduct(values, productId)
//     }
//   });

//   /* Set the product image when user add product image */
//   const onDrop = useCallback(acceptedFile => {
//     formik.setFieldValue("productImage", acceptedFile[0]);
//     setPreviewImageUrl(URL.createObjectURL(acceptedFile[0]));
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/jpeg": [".jpeg", ".jpg"],
//       "image/png": [".png"],
//       "image/gif": [".gif"]
//     },
//     maxSize: 2 * 1024 * 1024 // 2MB
//   });

//   const handleDeleteProduct = () => {
//     deleteProduct(productId);
//   };

//   /* Remove product object url when component unmount */
//   useEffect(() => {
//     if (data) {
//       formik.setValues({
//         name: data.product.name || "",
//         description: data.product.description || "",
//         condition: data.product.condition || "",
//         price: data.product.price || "",
//         stockQuantity: data.product.stockQuantity || "",
//         categoryId: data.product.categoryId || "",
//       });
//     }

//     return () => {
//       if (previewImageUrl) {
//         URL.revokeObjectURL(previewImageUrl);
//       }
//     };
//   }, [data, previewImageUrl]);

//   if (isLoading) return <div>Loading...</div>;

//   if (error) return <Navigate to="/page-not-found" />;
    
//   if (data.product && data.product.userId !== user.userId) return <Navigate to="/page-not-found" />;
  
//   return (
//     <div>
//       <h2 className="text-center text-2xl font-bold">Edit Product</h2>
//       <div>
//         {data.product.imageUrl && <img src={`${serverURL}${data.product.imageUrl}`} alt="Product" />}
//       </div>
//       <div>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="field">
//             <label>Name: </label>
//             <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
//             {formik.touched.name && formik.errors.name ? (
//               <div className="text-red-500">{formik.errors.name}</div>
//             ) : null}
//           </div>
//           <div className="field">
//             <label>Description: </label>
//             <textarea name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
//             {formik.touched.description && formik.errors.description ? (
//               <div className="text-red-500">{formik.errors.description}</div>
//             ) : null}
//           </div>
//           <div className="field">
//             <label>Condition: </label>
//             <select name="condition" value={formik.values.condition ? formik.values.condition : data.product.condition} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded p-2 w-full" >
//               <option value="" label="Select condition" />
//               <option value="new" label="New" />
//               <option value="like new" label="Like New" />
//               <option value="refurbished" label="Refurbished" />
//               <option value="used" label="Used" />
//               <option value="open box" label="Open Box" />
//               <option value="damaged" label="Damaged" />
//               <option value="for parts" label="For Parts" />
//             </select>
//             {formik.touched.condition && formik.errors.condition ? (
//               <div className="text-red-500">{formik.errors.condition}</div>
//             ) : null}
//           </div>
//           <div className="field">
//             <label>Price: <span>$</span> </label>
//             <input type="number" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
//             {formik.touched.price && formik.errors.price ? (
//               <div className="text-red-500">{formik.errors.price}</div>
//             ) : null}
//           </div>
//           <div className="field">
//             <label>Stock Quantity: </label>
//             <input type="number" name="stockQuantity" value={formik.values.stockQuantity} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
//             {formik.touched.stockQuantity && formik.errors.stockQuantity ? (
//               <div className="text-red-500">{formik.errors.stockQuantity}</div>
//             ) : null}
//           </div>
//           <div className="field">
//             <label>Category</label>
//             <select name="categoryId" value={formik.values.categoryId ? formik.values.categoryId : data.product.categoryId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded p-2 w-full" >
//               <option value="" label="Select category" />
//               <option value="1" label="Antiques" />
//               <option value="2" label="Appliances" />
//               <option value="3" label="Art" />
//               <option value="4" label="Automotive" />
//               <option value="5" label="Baby" />
//               <option value="6" label="Books" />
//               <option value="7" label="DIY & Hardware" />
//               <option value="8" label="Electronics" />
//               <option value="9" label="Fashion & Apparel" />
//               <option value="10" label="Food & Beverages" />
//               <option value="11" label="Health & Beauty" />
//               <option value="12" label="Home & Garden" />
//               <option value="13" label="Movies & Music" />
//               <option value="14" label="Office Supplies" />
//               <option value="15" label="Pet Supplies" />
//               <option value="16" label="Sports & Outdoors" />
//               <option value="17" label="Toys & Games" />
//             </select>
//             {formik.touched.categoryId && formik.errors.categoryId ? (
//               <div className="text-red-500">{formik.errors.categoryId}</div>
//             ) : null}
//           </div>
//           <div>
//             <div {...getRootProps()} className="flex justify-between border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500">
//               <div className="w-1/4">
//                 {previewImageUrl && <><img src={previewImageUrl} name="productImage" alt={formik.values.name} className="w-40 h-40 object-contain" />
//                   <p className="mt-2 text-center text-gray-700">{formik.values.name}</p> </>}
//               </div>
//               <div className="w-3/4">
//                 <input {...getInputProps()} />
//                 {isDragActive ? (
//                   <p className="text-gray-500">Drop the file here...</p>
//                 ) : (
//                   <p className="text-gray-500">Drag and drop some file here, or click to select file</p>
//                 )}
//               </div>
//             </div>
//             {formik.touched.productImage && formik.errors.productImage ? (
//                 <div className="text-red-500">{formik.errors.productImage}</div>
//               ) : null}
//           </div>
//           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Update product</button>
//         </form>
//       </div>
//       <button onClick={handleDeleteProduct} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"> Delete product </button>
//     </div>
//   );
// };

// export default EditProductPage;