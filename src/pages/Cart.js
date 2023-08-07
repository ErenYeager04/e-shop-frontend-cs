import { useSelector } from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem.js';

const Cart = () => {
  const [cart, setCart] = useState([])
  const {token, userId} = useSelector((state) => state.user)
  const [message, setMessage] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Cart/getUserCart/${userId}`, {  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      const json = await response.json()
  
      if (response.ok) {
        setCart(json.cartProducts)
      }
      if(!response.ok){
        setError(json)
      }
  }
  fetchWorkouts()
  
  }, [userId, token])

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.product.price * product.seasons;
    });
    return total
  };

  return (
    <Container>
      <h1>Cart</h1>
      {error && <div className="text-danger mt-1">{error}</div>}
      {!error && cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Seasons</th>
              <th>Price</th>
              <th>Total</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((product, index) => (
              <CartItem key={index} product={product} />
            ))}
            <tr>
              <td colSpan={3}></td>
              <td>
                <strong>Total:</strong> ${getTotalPrice().toFixed(2)}
              </td>
              <td>
                <Button variant="primary" onClick={() => setMessage(!message)}>Checkout</Button>
                {message && <div className="text-danger mt-1">Theres no functionality yet</div>}
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default Cart