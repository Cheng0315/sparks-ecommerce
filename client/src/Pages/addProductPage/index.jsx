import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { useCallback } from 'react'
import { useState } from "react";
import { useAddProduct } from "../../hooks/product";
import { addProductSchema } from '../../validationSchemas'; 



const AddProductPage = () => {
  const [productImage, setProductImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const addProduct = useAddProduct
  
  /* Initialize formik with initial values for adding product */
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      condition: "",
      price: "",
      stockQuantity: "",
      categoryId: ""
    },
    /* Add YUP add product validation schema */
    validationSchema: addProductSchema,
    /* Call addProduct hook to make a request to server to add product */
    onSubmit: addProduct(productImage)
  });

  /* Set the product image when user add product image */
  const onDrop = useCallback(acceptedFile => {
    setProductImage(acceptedFile[0]);
    setPreviewImageUrl(URL.createObjectURL(acceptedFile[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 2097152 // 2MB
  });

  return (
    <form onSubmit={formik.handleSubmit}>
       <div className="field">
        <label>Name:</label>
        <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Description:</label>
        <textarea name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.description && formik.errors.description ? (
          <div className="error">{formik.errors.description}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Condition:</label>
        <input type="text" name="condition" value={formik.values.condition} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.condition && formik.errors.condition ? (
          <div className="error">{formik.errors.condition}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Price: <span>$</span> </label>
        <input type="number" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.price && formik.errors.price ? (
          <div className="error">{formik.errors.price}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Stock Quantity:</label>
        <input type="number" name="stockQuantity" value={formik.values.stockQuantity} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.stockQuantity && formik.errors.stockQuantity ? (
          <div className="error">{formik.errors.stockQuantity}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Category ID:</label>
        <input type="number" name="categoryId" value={formik.values.categoryId} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.categoryId && formik.errors.categoryId ? (
          <div className="error">{formik.errors.categoryId}</div>
        ) : null}
      </div>
      <div {...getRootProps()} className="flex justify-between border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500">
      <div className="w-1/4">
          {previewImageUrl && <><img src={previewImageUrl} alt={formik.values.name} className="w-40 h-40 object-contain" />
            <p className="mt-2 text-center text-gray-700">{formik.values.name}</p> </>}
            
        </div>
        <div className="w-3/4">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-500">Drop the files here...</p>
          ) : (
            <p className="text-gray-500">Drag and drop some file here, or click to select files</p>
          )}
        </div>
        
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductPage;
