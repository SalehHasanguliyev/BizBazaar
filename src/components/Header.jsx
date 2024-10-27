import React, { useEffect, useState } from 'react'
import '../css/header.css'
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { calculateTotalPrice, removeFromBasket } from '../redux/slices/basketSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function Header() {

    const [theme, setTheme] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { products, totalAmount } = useSelector(store => store.basket);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const changeTheme = () => {

        const root = document.getElementById('root');
        const logoText = document.querySelector('.logo-text');
        const basket = document.querySelector('.basket');

        if (theme) {
            root.style.backgroundColor = '#fff';
            root.style.color = '#202020';
            logoText.style.color = '#4c4c4c';
            basket.style.color = '#707070'
        } else {
            root.style.backgroundColor = '#202020';
            root.style.color = '#fff';
            logoText.style.color = '#fff';
            basket.style.color = '#fff'
        }
        setTheme(!theme);
    }

    useEffect(() => {
        dispatch(calculateTotalPrice())
    }, []);

    const removeProductFromBasket = (id) => {
        dispatch(removeFromBasket({ id }));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div className='flex-row' onClick={() => navigate('/')}>
                <img src="./src/images/logo.png" className='logo' />
                <p className='logo-text'>BizBazaar</p>
            </div>
            <div className='flex-row'>
                {
                    theme ? <MdOutlineLightMode className='icons' onClick={changeTheme} /> : <MdDarkMode className='icons' onClick={changeTheme} />
                }
                <IconButton aria-label="cart" onClick={() => setDrawerOpen(true)}>
                    <StyledBadge badgeContent={products.length} color="secondary">
                        <ShoppingCartIcon className='basket' />
                    </StyledBadge>
                </IconButton>
            </div>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <>
                    {products && products.map(product => (
                        <div key={product.id} style={{ display: 'flex', gap: '8px', margin: '10px', alignItems: 'center' }}>
                            <img src={product.img} alt={product.title} width={50} height={50} />
                            <p style={{ fontSize: '14px', width: '300px' }}>{product.title}({product.count})</p>
                            <p style={{ fontWeight: 'bold', marginLeft: 'auto' }}>{product.price}$</p>
                            <Button variant="outlined" color="error" onClick={() => removeProductFromBasket(product.id)}>X</Button>
                        </div>
                    ))}
                    <h2 style={{ margin: '10px' }}> Total: {totalAmount.toFixed(2)}$</h2>
                </>
            </Drawer>


        </div >
    )
}

export default Header