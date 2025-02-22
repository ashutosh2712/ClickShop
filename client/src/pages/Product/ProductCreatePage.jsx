import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../../actions/productAction";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstant";

const ProductCreatePage = () => {
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate("/admin/productlist");
    }
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("brand", brand);
    formData.append("countInStock", countInStock);
    formData.append("category", category);
    formData.append("description", description);

    dispatch(createProduct(formData));
  };
  return (
    <div className="productEditContainer">
      <Link to="/admin/productlist" className="returnLink">
        <button className="btn-cart">GO BACK</button>
      </Link>
      {loading && <Loading />}
      {error && <Message className="errorMessage">{error}</Message>}
      <div className="userProfileUpdate">
        <h2>Create Product</h2>
        <form className="authFormContainer" onSubmit={submitHandler}>
          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="formInput"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="price">
            <b>Price</b>
          </label>
          <input
            type="number"
            placeholder="price"
            className="formInput"
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="image">
            <b>Image</b>
          </label>
          {/* <input
            type="text"
            placeholder="Image"
            className="formInput"
            onChange={(e) => setImage(e.target.value)}
          /> */}

          <label htmlFor="image">
            <b>Choose Image File</b>
          </label>
          <input
            type="File"
            className="formInput"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <label htmlFor="brand">
            <b>brand</b>
          </label>
          <input
            type="text"
            placeholder="brand"
            className="formInput"
            onChange={(e) => setBrand(e.target.value)}
          />

          <label htmlFor="stock">
            <b>stock</b>
          </label>
          <input
            type="number"
            placeholder="stock"
            className="formInput"
            onChange={(e) => setCountInStock(e.target.value)}
          />

          <label htmlFor="category">
            <b>category</b>
          </label>
          <input
            type="text"
            placeholder="category"
            className="formInput"
            onChange={(e) => setCategory(e.target.value)}
          />

          <label htmlFor="descriptions">
            <b>descriptions</b>
          </label>
          <textarea
            type="text"
            placeholder="descriptions"
            className="formInput"
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" className="btn-cart">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreatePage;
