import React from 'react';
import { Card } from 'react-bootstrap';

const PlanCard = ({ planList }) => {
  return (
    <div>
      {planList && planList.map((planObj, index) => (
        <div key={planObj.subsPlan.id}>
          <Card style={{ marginBottom: '20px' }}>
            <Card.Body>
              <Card.Title>{planObj.subsPlan.plan_name}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {planObj.subsPlan.description}<br />
                <strong>Plan Type:</strong> {planObj.subsPlan.plan_type}<br />
                <strong>Price:</strong> {planObj.subsPlan.price}<br />
                <strong>Duration:</strong> {planObj.subsPlan.duration}
              </Card.Text>
              {planObj.products && planObj.products.length > 0 && (
                <div >
                  <h5>Associated Products:</h5>
                  <div style={{display:"flex", flexWrap:"wrap", justifyContent:"flex-start"}}>
                  {planObj.products.map((product) => (
                    product && (
                      // <Card key={product.id} style={{ margin: '2rem'}}>
                      //   <Card.Img variant="top" src={product.image} style={{maxHeight:"250px", maxWidth:"250px"}} />
                      //   <Card.Body>
                      //     <Card.Title>{product.prod_name}</Card.Title>
                      //     <Card.Text>
                      //       <strong>Description:</strong> {product.description}<br />
                      //       <strong>Price:</strong> {product.price}<br />
                      //       <strong>Image:</strong> {product.image}
                      //     </Card.Text>
                      //   </Card.Body>
                      // </Card>
                      <Card style={{ width: '18rem', margin:"2rem" }}>
                      <Card.Img variant="top" src={product.image} />
                      <Card.Body>
                        <Card.Title>{product.prod_name}</Card.Title>
                        <Card.Text>
                             <strong>Description:</strong> {product.description}<br />
                            <strong>Price:</strong> {product.price}<br />
                            <strong>Image:</strong> {product.image}
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                      </Card.Body>
                    </Card>
                    )
                  ))}
                  </div>
                  
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PlanCard;