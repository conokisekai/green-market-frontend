
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./farmerProductForm.css";

function FarmerProductForm({userId}) {
  const [product_name, setProduct_name] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [is_out_of_stock, setIs_out_of_stock] = useState(0);
  const [description, setDescription] = useState("");
  const [imageLinkType, setImageLinkType] = useState("link");
  const [image_link, setImage_link] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/create_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name,
        price,
        quantity,
        is_out_of_stock,
        description,
        image_link,
        category_name,
        user_id: userId,
      }),
    })
      .then((r) => {
        if (r.ok) {
          navigate("/farmerdashboard");
        } else {
          throw new Error("Failed to register");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setError("Failed to register. Please try again.");
      });
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // FileReader has successfully read the file
        const dataUrl = reader.result;
        setImage_link(dataUrl);
      };

      reader.readAsDataURL(file);
    } else {
      // Clear the image_link state if an invalid file is selected
      setImage_link("");
      setError("Please select a valid image file.");
    }
  }

  function getImageInput() {
    if (imageLinkType === "link") {
      return (
        <div className="form-group">
          <label htmlFor="image_link">Image Link</label>
          <input
            type="text"
            className="form-control transparent-input"
            id="image_link"
            onChange={(e) => setImage_link(e.target.value)}
            placeholder="image_link"
            required
          />
        </div>
      );
    } else if (imageLinkType === "file") {
      return (
        <div className="form-group">
          <label htmlFor="imageUpload">Upload Image</label>
          <input
            type="file"
            className="form-control-file"
            id="imageUpload"
            onChange={(e) => handleFileUpload(e)}
            accept="image/*"
            required
          />
        </div>
      );
    }
  }

  return (
    <div id="product-form-container" className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="product_name">Name</label>
              <input
                type="text"
                className="form-control transparent-input"
                id="product_name"
                onChange={(e) => setProduct_name(e.target.value)}
                placeholder="product_name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control transparent-input"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                className="form-control transparent-input"
                id="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="is_out_of_stock">OutOfStalk</label>
              <input
                type="boolean"
                className="form-control transparent-input"
                id="is_out_of_stock"
                onChange={(e) => setIs_out_of_stock(e.target.value)}
                placeholder="True"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control transparent-input"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageLinkType">Image Link Type</label>
              <select
                className="form-control"
                id="imageLinkType"
                onChange={(e) => {
                  setImageLinkType(e.target.value);
                  // Reset the image_link state when changing the link type
                  setImage_link("");
                }}
              >
                <option value="link">Link</option>
                <option value="file">File Upload</option>
              </select>
            </div>

            {getImageInput()}

            <div className="form-group">
              <label htmlFor="category_name">Category</label>
              <input
                type="text"
                className="form-control transparent-input"
                id="category_name"
                onChange={(e) => setCategory_name(e.target.value)}
                placeholder="category_name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="user_id">UserId</label>
              <input
                type="number"
                className="form-control transparent-input"
                id="user_id"
                value={userId}  // Display the userId from props
                readOnly       //  read-only
                required
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Add
            </button>
            {error && <p className="text-danger">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmerProductForm;


