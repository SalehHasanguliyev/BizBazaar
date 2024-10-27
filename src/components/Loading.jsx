import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
import { useSelector } from 'react-redux';


function Loading() {

    const { loading } = useSelector((store) => store.product);

    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Loading