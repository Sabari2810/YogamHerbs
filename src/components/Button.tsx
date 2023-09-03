import React from 'react'

interface IButton {
    label: string;
    onClick: () => any
}

const Button: React.FC<IButton> = ({ onClick, label }) => {
    return (
        <button className='text-center w-full bg-red-600 rounded text-white py-2' onClick={onClick}>{label}</button>
    )
}

export default Button