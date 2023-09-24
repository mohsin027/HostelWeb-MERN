import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import axios from "axios";
import { Navigate } from 'react-router-dom';

const VerifyOtp = (props) => {
  const [otp,setOtp]=useState('')
  const [error,setError]=useState('')

  const handleOtpChange=(e) => {
    
    setOtp(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  const response = await axios.post(
    "/hostelAdmin/hostelRegisterVerify",
    {  otp, ...props.data })
    const data=await response.data
    console.log(data,'otp submitted');
    if(data){
    <Navigate to='/'/>
    }
  
} catch (error) {
      console.log("Error:", error);
      setError(
        error.response ? error.response.data.error : "Unknown error occurred."
      );
}
  }
  return (
    
    <div>
        <Row className="d-flex justify-content-center mt-5">
            <Col xs={3}>
            <Card className='m-5'>
              <Form onSubmit={handleSubmit}>

            <Form.Group
                    className="m-4 p-4"
                    style={{ textAlign: "left" }}
                    controlId="otp"
                  >
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      required
                    />
                  </Form.Group>
                  <Button className='m-2' variant="primary" type="submit" style={{ width: "150px" }}>
            Submit
          </Button>
              </Form>

            </Card>
            </Col>
        </Row>
    </div>
  )
}

export default VerifyOtp