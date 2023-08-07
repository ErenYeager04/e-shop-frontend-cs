import { useState, useEffect, useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux'

const Admin = () => {
  const {token} = useSelector((state) => state.user)
  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [seasons, setSeasons] = useState(0);
  const [price, setPrice] = useState(0);
  const [productGenres, setProductGenres] = useState([]);
  const [ratingId, setRatingId] = useState(0);
  const [studioId, setStudioId] = useState(0);
  // Extra data for form
  const [availableProductGenres, setAvailableProductGenres] = useState([]);
  const [availableRatings, setAvailableRatings] = useState([]);
  const [availableStudios, setAvailableStudios] = useState([]);
  // Error handling states
  const [error, setError] = useState("")
  const [disabled, setDisabled] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    // Fetch available ProductGenres from the endpoint
    fetchProductGenres();
    fetchRatings()
    fetchStudios()
  }, []);

  const fetchProductGenres = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Helper/getGenres`);
      const data = await response.json();
      setAvailableProductGenres(data);
    } catch (error) {
      console.error('Error fetching product genres:', error);
      setError(error)
    }
  }

  const fetchRatings = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Helper/getRatings`);
      const data = await response.json();
      setAvailableRatings(data);
    } catch (error) {
      console.error('Error fetching product genres:', error);
      setError(error)
    }
  }

  const fetchStudios = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Helper/getStudios`);
      const data = await response.json();
      setAvailableStudios(data);
    } catch (error) {
      console.error('Error fetching product genres:', error);
      setError(error)
    }
  }

  const handleProductGenreChange = (e) => {
    const selectedGenre = e.target.value;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      setProductGenres((prevGenres) => [...prevGenres, parseInt(selectedGenre)]);
    } else {
      setProductGenres((prevGenres) => prevGenres.filter((genre) => genre !== parseInt(selectedGenre)));
    }
  };
  
  console.log(token)
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      imageUrl,
      seasons,
      price,
      productGenres,
      ratingId,
      studioId
    };
    setDisabled(true)
    setError("")
    setSuccess(null)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Product/createProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const error = await response.text()
      setDisabled(false)
      setError(error)
    }
    
    if (response.ok) {
      setSuccess(true)
      setDisabled(false)
      setError("")
      setTitle("")
      setDescription("")
      setImageUrl("")
      setSeasons(0)
      setPrice(0)
      setProductGenres([])
      setStudioId(0)
      setRatingId(0)
    }
  };
  // Refs for errors
  const titleInputRef = useRef()
  const descriptionRef = useRef()
  const imageRef = useRef()
  const seasonRef = useRef()
  const priceRef = useRef()
  const productGenreRef = useRef()
  const ratingRef = useRef()
  const studioRef = useRef()
  switch (true) {
      case error.includes("Title"):
        titleInputRef.current.focus();
        break;
      case error.includes("Description"):
        descriptionRef.current.focus();
        break;
      case error.includes("ImageUrl"):
        imageRef.current.focus();
        break;
      case error.includes("Seasons"):
        seasonRef.current.focus();
        break;
      case error.includes("Price"):
        priceRef.current.focus();
        break;
      case error.includes("ProductGenres"):
        productGenreRef.current.focus();
        break;
      case error.includes("Rating"):
        ratingRef.current.focus();
        break;
      case error.includes("Studio"):
        studioRef.current.focus();
        break;
      default:
        break;
    }

  return (
    <Container className='my-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='title'>
          <Form.Label>Title:</Form.Label>
          <Form.Control ref={titleInputRef} type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        {error.includes("Title") && <div className="text-danger mt-1">{error}</div>}
        <Form.Group controlId='description'>
          <Form.Label>Description:</Form.Label>
          <Form.Control as='textarea' ref={descriptionRef} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        {error.includes("Description") && <div className="text-danger mt-1">{error}</div>}
        <Form.Group controlId='imageUrl'>
          <Form.Label>Image URL:</Form.Label>
          <Form.Control type='text' ref={imageRef} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </Form.Group>
        {error.includes("ImageUrl") && <div className="text-danger mt-1">{error}</div>}
        <Form.Group controlId='seasons'>
          <Form.Label>Seasons:</Form.Label>
          <Form.Select value={seasons} ref={seasonRef} onChange={(e) => setSeasons(parseInt(e.target.value))}>
            <option value={0}>Select seasons</option>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </Form.Select>
        </Form.Group>
        {error.includes("Seasons") && <div className="text-danger mt-1">{error}</div>}
        <Form.Group controlId='price'>
          <Form.Label>Price:</Form.Label>
          <Form.Control step='0.01' type='number' ref={priceRef} value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
        </Form.Group>
        {error.includes("Price") && <div className="text-danger mt-1">{error}</div>}
        <Form.Group controlId='productGenres'>
          <Form.Label>Product Genres:</Form.Label>
          <div className="genre-checkboxes" ref={productGenreRef}>
            {availableProductGenres.map((genre, index) => (
              <Form.Check
                key={genre.id}
                type='checkbox'
                id={genre.id}
                label={genre.name}
                value={parseInt(genre.id)}
                checked={productGenres.includes(parseInt(genre.id))}
                onChange={handleProductGenreChange}
                className="genre-checkbox"
              />
            ))}
          </div>
        </Form.Group>
        {error.includes("ProductGenres") && <div className="text-danger mt-1">{error}</div>}

        <Form.Group controlId='rating'>
          <Form.Label>Rating:</Form.Label>
          <Form.Select value={ratingId} ref={ratingRef} onChange={(e) => setRatingId(parseInt(e.target.value))}>
            <option value={0}>Choose rating</option>
            {availableRatings.map((ratingOption) => (
              <option key={ratingOption.id} value={ratingOption.id}>{ratingOption.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        {error.includes("Rating") && <div className="text-danger mt-1">{error}</div>}  
        <Form.Group controlId='rating'>
          <Form.Label>Studio:</Form.Label>
          <Form.Select  value={studioId} ref={studioRef} onChange={(e) => setStudioId(parseInt(e.target.value))}>
            <option value={0}>Choose studio</option>
            {availableStudios.map((studioOption) => (
              <option key={studioOption.id} value={studioOption.id}>{studioOption.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        {error && <div className="text-danger mt-1">{error}</div>} 
        {success && <div className=" text-black m-2">Successfuly added</div>} 
        

        <Button disabled={disabled} className='my-4' variant='primary' type='submit'>Submit</Button>
      </Form>
    </Container>
  );
};

export default Admin
