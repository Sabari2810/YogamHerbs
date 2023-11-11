import React from 'react'
import { FaSpinner } from 'react-icons/fa';

interface IButton {
    label: string;
    isLoading?: boolean;
    className?: string
    onClick: () => any
}

const Button: React.FC<IButton> = ({ onClick, label, className, isLoading }) => {
    return (
        <button className={`${className} text-center items-center h-10 w-full flex bg-red-600 justify-center rounded text-white py-2`} onClick={onClick}>
            {isLoading ? <FaSpinner className="animate-spin" /> : label
            }
        </button>
    )
}

export default Button