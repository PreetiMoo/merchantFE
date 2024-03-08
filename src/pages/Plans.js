import React, { useState, useEffect } from "react";
import axios from "axios";
import PlanCard from "../components/PlanCard";
import { Card, Accordion, Button } from "react-bootstrap";

const Plans = () => {
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [planType, setPlanType] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedProductIDs, setSelectedProductIDs] = useState([]);
  const [productList, setProductList] = useState([]);
  const [planList, setPlanList] = useState([]);
  const [accessToken, setToken] = useState("");

  useEffect(() => {
    fetchData();

    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchData = async () => {
    try {
      const storedToken = localStorage.getItem("accessToken");
      const productResponse = await axios.get(
        "http://localhost:8000/prodList/readAll",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }
      );
      console.log("Product Response:", productResponse.data); // Log the products received
      setProductList(productResponse.data);

      const planResponse = await axios.get(
        "http://localhost:8000/subsPlanList/readAll",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }
      );
      setPlanList(planResponse.data.allSubsPlans);
      console.log("Plan List:", planResponse.data.allSubsPlans);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePlanTypeChange = (event) => {
    setPlanType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleProductCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (!selectedProductIDs.includes(value)) {
        setSelectedProductIDs([...selectedProductIDs, value]);
      }
    } else {
      setSelectedProductIDs(selectedProductIDs.filter((id) => id !== value));
    }
  };

  const handleAddPlan = async (event) => {
    event.preventDefault();
    try {
      const storedToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/subsPlanList/create",
        {
          plan_name: planName,
          description: description,
          plan_type: planType,
          price: price,
          duration: duration,
          product_id: selectedProductIDs
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }
      );
      fetchData();
      console.log("Plan list:", planList);
      setPlanName("");
      setDescription("");
      setPlanType("");
      setPrice("");
      setDuration("");
      setSelectedProductIDs([]);
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#5555" }}>
      <h2 style={{ margin: "20px" }}>Add Plan</h2>
      <form style={{ margin: "20px" }} onSubmit={handleAddPlan}>
        <label style={{ padding: "5px" }}>Plan Name :</label>
        <input type="text" value={planName} onChange={handlePlanNameChange} />
        <br />
        <label style={{ padding: "5px" }}>Description :</label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <br />
        <label style={{ padding: "5px" }}>Plan Type :</label>
        <select type="text" value={planType} onChange={handlePlanTypeChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="quarterly">Quarterly</option>
          <option value="half-yearly">Half yearly</option>
          <option value="yearly">Yearly</option>
        </select>
        <br />
        <label style={{ padding: "5px" }}>Price :</label>
        <input type="number" value={price} onChange={handlePriceChange} />
        <br />
        <label style={{ padding: "5px" }}>Duration in months:</label>
        <input type="number" value={duration} onChange={handleDurationChange} />
        <br />
        <div>
          <h5 style={{ paddingTop: "20px" }}>Select Products</h5>
          {productList &&
            productList.map((product) => (
              <div style={{ padding: "2px" }} key={product.id}>
                <input
                  type="checkbox"
                  value={product.id}
                  // checked={selectedProductIDs.includes(product.id)}
                  onChange={handleProductCheckboxChange}
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: selectedProductIDs.includes(product.id)
                      ? "#007bff"
                      : "#ccc",
                    display: "inline-block",
                    position: "relative",
                    marginRight: "5px"
                  }}
                />
                <label>{product.prod_name}</label>
              </div>
            ))}
        </div>

        <br />
        <Button variant="success" type="submit">
          Add Plan
        </Button>
      </form>
      <div style={{}}>
        <h2 style={{ marginTop: "35px", marginLeft: "15px" }}>Plan List</h2>
        <PlanCard planList={planList} />
      </div>
    </div>
  );
};

export default Plans;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Plans = () => {
//   const [planName, setPlanName] = useState('');
//   const [description, setDescription] = useState('');
//   const [planType, setPlanType] = useState('');
//   const [price, setPrice] = useState('');
//   const [duration, setDuration] = useState('');
//   const [productID, setProductID] = useState('');
//   const [planList, setPlanList] = useState([]);
//   const [accessToken, setToken] = useState('');

//   useEffect(() => {
//     fetchPlanList();
//     const storedToken = localStorage.getItem('accessToken');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   const fetchPlanList = async () => {
//     try {
//       const storedToken = localStorage.getItem('accessToken');
//       const response = await axios.get('http://localhost:8000/subsPlanList/readAll', {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       });
//       setPlanList(response.data.allSubsPlans);
//     } catch (error) {
//       console.error('Error fetching plan list:', error);
//     }
//   };

//   const handlePlanNameChange = (event) => {
//     setPlanName(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handlePlanTypeChange = (event) => {
//     setPlanType(event.target.value);
//   };

//   const handlePriceChange = (event) => {
//     setPrice(event.target.value);
//   };

//   const handleDurationChange = (event) => {
//     setDuration(event.target.value);
//   };

//   const handleProductIDChange = (event) => {
//     setProductID(event.target.value);
//   };

//   const handleAddPlan = async (event) => {
//     event.preventDefault();
//     try {
//       const storedToken = localStorage.getItem('accessToken');
//       const response = await axios.post(
//         'http://localhost:8000/subsPlanList/create',
//         {
//           plan_name: planName,
//           description: description,
//           plan_type: planType,
//           price: price,
//           duration: duration,
//           product_id: productID
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//         }
//       );
//       setPlanList([...planList, response.data]);
//       setPlanName('');
//       setDescription('');
//       setPlanType('');
//       setPrice('');
//       setDuration('');
//       setProductID('');
//     } catch (error) {
//       console.error('Error adding plan:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Plan</h2>
//       <form onSubmit={handleAddPlan}>
//         <label>
//           Plan Name :
//           <input
//             type="text"
//             value={planName}
//             onChange={handlePlanNameChange}
//           />
//         </label>
//         <br />
//         <label>
//           Description :
//           <input
//             type="text"
//             value={description}
//             onChange={handleDescriptionChange}
//           />
//         </label>
//         <br />
//         <label>
//           Plan Type :
//           <input
//             type="text"
//             value={planType}
//             onChange={handlePlanTypeChange}
//           />
//         </label>
//         <br />
//         <label>
//           Price :
//           <input
//             type="text"
//             value={price}
//             onChange={handlePriceChange}
//           />
//         </label>
//         <br />
//         <label>
//           Duration :
//           <input
//             type="text"
//             value={duration}
//             onChange={handleDurationChange}
//           />
//         </label>
//         <br />
//         <label>
//           Product ID :
//           <input
//             type="text"
//             value={productID}
//             onChange={handleProductIDChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Add Plan</button>
//       </form>

// <h2>Plan List</h2>
// <ul style={{ listStyleType: 'none', padding: 0 }}>
//   {planList.map((planObj, index) => (
//     <li key={planObj.subsPlan.id}>
//       <div style={{ marginBottom: '10px' }}>
//         <strong>Plan Name:</strong> {planObj.subsPlan.plan_name}
//       </div>
//       <div><strong>Description:</strong> {planObj.subsPlan.description}</div>
//       <div><strong>Plan Type:</strong> {planObj.subsPlan.plan_type}</div>
//       <div><strong>Price:</strong> {planObj.subsPlan.price}</div>
//       <div><strong>Duration:</strong> {planObj.subsPlan.duration}</div>
//       {planObj.products && planObj.products.length > 0 && (
//         <div style={{ marginLeft: '20px', marginTop: '10px' }}>
//           <h3>Associated Products:</h3>
//           <ul style={{ listStyleType: 'none', padding: 0 }}>
//             {planObj.products.map((product) => (
//               product && (
//                 <li key={product.id} style={{ marginBottom: '5px' }}>
//                   <div><strong>Product Name:</strong> {product.prod_name}</div>
//                   <div><strong>Description:</strong> {product.description}</div>
//                   <div><strong>Price:</strong> {product.price}</div>
//                   <div><strong>Image:</strong> {product.image}</div>
//                 </li>
//               )
//             ))}
//           </ul>
//         </div>
//       )}
//       {/* Add a horizontal line between plans */}
//       {index !== planList.length - 1 && <hr style={{ marginTop: '20px', marginBottom: '20px' }} />}
//     </li>
//   ))}
// </ul>

//     </div>
//   );
// };

// export default Plans;
