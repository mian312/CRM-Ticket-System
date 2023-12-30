import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/")
    })
    return (
        <div className='d-flex h-100 justify-content-center align-items-center'>
            <h1 className='text-center text-danger'>
                500 | Page not found
            </h1>
        </div>
    )
}

export default NotFound
