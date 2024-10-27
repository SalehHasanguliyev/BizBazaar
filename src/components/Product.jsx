import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Product({ product }) {

    const { id, image, title, price } = product;

    const navigate = useNavigate();

    return (
        <div>
            <Card sx={{ width: 345, height: '100%' }}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        height="240"
                        image={image}
                    />
                    <CardContent sx={{ height: 120 }}>
                        <Typography gutterBottom variant="h6" component="div" style={{fontWeight: 'bold'}}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {price}$
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" sx={{ backgroundColor: '#0ef0a6', color: '#fff' }} onClick={() => navigate('/details/' + id)}>Details</Button>
                    </Stack>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product