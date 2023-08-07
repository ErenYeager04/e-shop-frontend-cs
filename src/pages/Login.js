import { useState } from "react"
import { useLogin } from "../utils/useLogin"
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await login(email, password)
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-5">
        <h2 className="text-center">Log in</h2>
        <Form className="d-flex flex-column">
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
              Don't have an account? <NavLink to="/signup">Sign up</NavLink>
            </Col>
            <Col className="text-center">
              <Button variant="outline-success" className="w-100 mt-2" disabled={isLoading} onClick={handleSubmit}>Log in</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  )
} 

export default Login