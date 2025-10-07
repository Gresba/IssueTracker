import { Box, Skeleton } from '@radix-ui/themes'
import React from 'react'

const LoadingNewIssuePage = () => {
    return (
        <Box className='max-w-xl'>
            Loading...
            <Skeleton className='mb-2'/>
            <Skeleton height="20rem"/>
        </Box>
    )
}

export default LoadingNewIssuePage