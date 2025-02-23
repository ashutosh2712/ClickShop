import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listProductDetails, updateProduct } from "../../actions/productAction";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstant";

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        // setImage(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [product, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", productId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("brand", brand);
    formData.append("countInStock", countInStock);
    formData.append("category", category);
    formData.append("description", description);
    // for (let [name, value] of formData) {
    //   console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    // }
    dispatch(updateProduct(formData));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  return (
    <div className="productEditContainer">
      <Link to="/admin/productlist" className="returnLink">
        <button className="btn-cart">GO BACK</button>
      </Link>
      <div className="userProfileUpdate">
        <h2>Edit Product</h2>
        <form className="authFormContainer" onSubmit={submitHandler}>
          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="formInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="price">
            <b>Price</b>
          </label>
          <input
            type="number"
            placeholder="price"
            className="formInput"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="image">
            <b>Image</b>
          </label>
          <div className="imagePreview">
            {preview ? (
              <img src={preview} alt="preview" style={{ width: "50px" }} />
            ) : (
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt="Current Product"
                style={{ width: "50px" }}
              />
            )}
          </div>
          {/* <input type="text" placeholder="Image" className="formInput" /> */}

          <label htmlFor="image">
            <b>Choose Image File</b>
          </label>
          <input
            type="File"
            className="formInput"
            onChange={handleImageChange}
          />

          <label htmlFor="brand">
            <b>brand</b>
          </label>
          <input
            type="text"
            placeholder="brand"
            className="formInput"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <label htmlFor="stock">
            <b>stock</b>
          </label>
          <input
            type="number"
            placeholder="stock"
            className="formInput"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />

          <label htmlFor="category">
            <b>category</b>
          </label>
          <input
            type="text"
            placeholder="category"
            className="formInput"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label htmlFor="descriptions">
            <b>descriptions</b>
          </label>
          <textarea
            type="text"
            placeholder="descriptions"
            className="formInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" className="btn-cart">
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
