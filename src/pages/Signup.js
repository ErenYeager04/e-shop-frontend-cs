import { useState } from "react"
import { useSignup } from "../utils/useSignup"
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const Signup = () => {
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(firstName, lastName, email, password)
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-5">
        <h2 className="text-center">Sign up</h2>
        <Form className="d-flex flex-column">
          <Form.Control 
          className="mt-3" 
          type='text'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName} 
          placeholder="Your first name" />
          <Form.Control 
          className="mt-3" 
          type='text'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName} 
          placeholder="Your last name" />
          <Form.Control 
          className="mt-3" 
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email} 
          placeholder="Your email" />
          <Form.Control 
          className="mt-3" 
          placeholder="Your password"
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password} />
          {error && <div className="text-danger mt-1">{error}</div>}
          <Row className="mt-3">
            <Col className="text-center">
              Already have an account? <NavLink to="/login">Log in</NavLink>
            </Col>
            <Col className="text-center">
              <Button variant="outline-success" className="w-100 mt-2" disabled={isLoading} onClick={handleSubmit}>Sign up</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  )
} 

export default Signup