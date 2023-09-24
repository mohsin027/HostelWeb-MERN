import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const VerifyOtp = () => {
  return (
    
    <div>
        <Row>
            <Col>
            <Card>
        <h1>OTP</h1>
        <form action="submit">
            <input type="number" />
            <button>submit</button>
        </form>

            </Card>
            </Col>
        </Row>
    </div>
  )
}

export default VerifyOtp