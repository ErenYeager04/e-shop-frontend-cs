import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Product from "../components/Product"

const Home = () => {
  const {email} = useSelector((state) => state.user)
  const {query} = useSelector((state) => state.query)
  const [products, setProducts] = useState()
  const [error, setError] = useState("Loading...")
  const searchParams = new URLSearchParams();
  if(query){
    searchParams.append('query', query);
  }
  const queryString = searchParams.toString();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Product/getProducts?${queryString}`)
      
      if (response.ok) {
        const json = await response.json()
        setProducts(json)
        setError("Loading...")
      }

      if(!response.ok){
        setProducts()
        const error = await response.text()
        setError(error)
      }
    }

    fetchProducts()
  },[queryString, query])

  return (
    <div className="container py-4">
      {products && products.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {products.map((product) => (
            <div key={product.id} className="col mb-4">
              <Product product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  )


}

export default Home