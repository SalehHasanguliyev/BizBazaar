import React from 'react'
import Container from '@mui/material/Container';

function PageContainer({ children }) {
    return (
        <div>
            <Container style={{paddingBottom: '40px'}} maxWidth='lg'>{children}</Container>
        </div>
    )
}

export default PageContainer   