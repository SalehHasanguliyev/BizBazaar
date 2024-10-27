import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import '../css/detailCard.css'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToBasket, calculateTotalPrice } from '../redux/slices/basketSlice';

function DetailsPage() {

  const { id } = useParams();

  const { products, selectedProduct } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const { image, title, price, description } = selectedProduct;

  const [count, setCount] = useState(1);
  const [productPrice, setProductPrice] = useState(price);

  const getProductById = () => {
    products && products.map(product => {
      if (product.id == id) {
        dispatch(setSelectedProduct(product));
      }
    })
  }

  useEffect(() => {
    getProductById();
  }, [id, products, dispatch]);

  useEffect(() => {
    setProductPrice(count * price);
  }, [count, price]);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  }

  const decrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  }

  const addBasket = () => {
    const payload = {
      id,
      image,
      title,
      description,
      price,
      count
    }
    dispatch(addToBasket(payload));
    dispatch(calculateTotalPrice());
  }

  return (
    <div className='detail-card'>
      <div className='img'>
        <img src={image} />
      </div>
      <div className='info'>
        <div className='title'>
          {title}
        </div>
        <div className='desc'>
          {description}
        </div>
        <div className='price'>
          {productPrice}$
        </div>
        <div className='plus-minus'>
          <CiCirclePlus
            style={{ fontSize: '40px', cursor: 'pointer' }}
            onClick={increment}
          />
          <span style={{ fontSize: '30px' }}>{count}</span>
          <CiCircleMinus
            style={{ fontSize: '40px', cursor: 'pointer' }}
            onClick={decrement}
          />
        <div className='basket'>
          <IconButton sx={{color: '#9c27b0'}} aria-label="add to shopping cart" onClick={addBasket}>
            <AddShoppingCartIcon style={{fontSize: '35px'}}/>
          </IconButton>
        </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage