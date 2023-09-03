import React from 'react'

interface IButton {
    label: string;
    className?: string
    onClick: () => any
}

const Button: React.FC<IButton> = ({ onClick, label, className }) => {
    return (
        <button className={`${className} text-center w-full bg-red-600 rounded text-white py-2`} onClick={onClick}>{label}</button>
    )
}

export default Button