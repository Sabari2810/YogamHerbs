import { Rating } from '@mui/material'
import React from 'react'

interface IProductRating {
    rating: number
}

const ProductRating: React.FC<IProductRating> = ({ rating }) => {
    return (
        <div className='flex items gap-2'>
            {/* <Rating precision={0.5} name="disabled" value={rating} disabled />
            <p>{rating}/5</p> */}
        </div>
    )
}

export default ProductRating