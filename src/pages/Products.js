import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card} from "react-bootstrap";

const Products = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0); // Initialized as 0
  const [image, setImage] = useState("");
  const [productList, setProductList] = useState([]);
  const [accessToken, setToken] = useState("");

  useEffect(() => {
    fetchProductList();
    // Fetch token from wherever it's stored (localStorage, sessionStorage, etc.)
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchProductList = async () => {
    try {
      // Fetch token from localStorage
      const storedToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8000/prodList/readAll",
        {
          headers: {
            Authorization: `Bearer ${storedToken}` // Set token in the Authorization header
          }
        }
      );
      setProductList(response.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(parseInt(event.target.value)); // Parse input value to an integer
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    try {
      // Fetch token from localStorage
      const storedToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/prodList/create",
        {
          prod_name: productName,
          description: description,
          price: price,
          image: image
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}` // Set token in the Authorization header
          }
        }
      );
      // Update productList with the new product details from the response
      setProductList([...productList, response.data]);

      // Reset form fields after adding the product
      setProductName("");
      setDescription("");
      setPrice(0);
      setImage("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#5555", padding: "1rem" }}>
      <h2 style={{ margin: "15px" }}>Add Product</h2>
      <form
        onSubmit={handleAddProduct}
        style={{
          display: "inherit",
          alignItems: "center",
          margin: "20px"
        }}>
        <label style={{ marginRight: "20px" }}>
          Product Name :
        </label>
        <input
            type="text"
            value={productName}
            onChange={handleProductNameChange}
          />
        <br />
        <label style={{ marginRight: "20px" }}>
          Description :
        </label>
        <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        <br />
        <label style={{ marginRight: "20px" }}>
          Price :
        </label>
        <input
            type="number" // Change type to number for price input
            value={price}
            onChange={handlePriceChange}
          />
        <br />
        <label style={{ marginRight: "20px" }}>
          Image:
        </label>
        <input
            type="text"
            value={image}
            onChange={handleImageChange}
            placeholder="Paste image link here"
          />
        <br />
        {/* <button type="submit">Add product</button> */}
        <Button variant="success" type="submit">
          Add product
        </Button>
      </form>

      <h2 style={{ marginTop: "revert", marginLeft: "15px" }}>Product List</h2>
      <ul>
      {productList.map((product) => (
        <Card key={product.id} style={{ width: '18rem', margin:"2rem" }}>
          <Card.Img variant="top" src={product.image} style={{ maxWidth: '100%' }} />
          <Card.Body>
            <Card.Title>Product Name: {product.prod_name}</Card.Title>
            <Card.Text>Description: {product.description}</Card.Text>
            <Card.Text>Price: {product.price}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      </ul>
    </div>
  );
};

export default Products;
