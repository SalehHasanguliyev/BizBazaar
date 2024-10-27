import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product';
import '../css/card.css'
import '../css/header.css'

function ProductList() {

  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase().trim()));

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
        <input type="text" placeholder='search' className='search-input' onChange={(e) => setSearch(e.target.value)} />
      <div className='demo-card'>
        {
          filteredProducts && filteredProducts.map(product => (
            <Product key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default ProductList
