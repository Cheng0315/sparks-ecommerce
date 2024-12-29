import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react"
import { useAddProduct } from "../../hooks/product";
import { addProductSchema } from "../../validationSchemas"; 
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const AddProductPage = () => {
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const user = useSelector((state) => state.user.user);
  const addProduct = useAddProduct()

  if (user.role !== "seller") return <Navigate to="/page-not-found" />;
  
  /* Initialize formik with initial values for adding product */
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      condition: "",
      price: "",
      stockQuantity: "",
      categoryId: "",
      productImage: ""
    },
    /* Add YUP to validate product inputs */
    validationSchema: addProductSchema,
    /* Call addProduct hook to make a request to server to add product */
    onSubmit: addProduct
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

  /* Remove object url when component unmount */
  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Add Product</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label>Name:</label>
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="field">
          <label>Description:</label>
          <textarea name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="field">
          <label>Condition:</label>
          <select name="condition" value={formik.values.condition} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded p-2 w-full" >
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
          <label>Stock Quantity:</label>
          <input type="number" name="stockQuantity" value={formik.values.stockQuantity} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.stockQuantity && formik.errors.stockQuantity ? (
            <div className="text-red-500">{formik.errors.stockQuantity}</div>
          ) : null}
        </div>
        <div className="field">
          <label>Category</label>
          <select name="categoryId" value={formik.values.categoryId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded p-2 w-full" >
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
