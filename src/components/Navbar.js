import { useEffect, useState } from "react"
import { FaShippingFast } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { makeQuery } from "../store/querySlice";
import { useLogout } from '../utils/useLogout'
import { AddUserHook } from "../utils/AddUserHook";

const NavBar = () => {
  const { logout } = useLogout()
  const {userId, email} = useSelector((state) => state.user)
  const { userHook } = AddUserHook()
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")

  const handleClick = () => {
    logout()
  }

  const handleSearch = () => {
    // Call the handleSearch function passed from the parent component
    dispatch(makeQuery({query: query}))
    setQuery("")
  }

  useEffect(() => {
    // Refresh token logic
    const refreshToken = async () => {
      const token = localStorage.getItem('user')
      if(token){
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/User/refresh/${email}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          credentials: 'include',
        })

        if (response.ok) {
          const token = await response.text()
          userHook(token)
        }

        if (!response.ok) {
          console.log(response.text())
        }

      }
    }

    if(email){
      refreshToken()
    }

    const intervalId = setInterval(() => {
      if(email){
        refreshToken()
      }
    }, 10 * 60 * 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  },[email])

  useEffect(() => {
    const token = localStorage.getItem('user')

    if(token) {
      userHook(token)
    }

  }, [0])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <FaShippingFast size={30} />
        <Link className="navbar-brand mx-2" to="/">E-shop</Link>
        {/* Search Bar */}
          <div className="d-flex mx-1" >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ">
            {userId ?
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleClick}>Log out</button>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </Container>
    </nav>
  )
}

export default NavBar

