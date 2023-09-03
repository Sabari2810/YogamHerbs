import React from 'react'

// const submitData = async (data: FormData) => {
//     "use server"
// }

const GetInTouch = () => {
    return (
        <div>
            <h1 className='font-bold text-lg'>GET IN TOUCH</h1>
            <form className='flex flex-col space-y-2'>
                <input placeholder='Email' className='placeholder:text-sm px-4 border-[1px] border-slate-400 rounded-md h-10 outline-none' type="text" />
                <input placeholder='Type of query' className='placeholder:text-sm px-4 border-[1px] border-slate-400 rounded-md h-10 outline-none' type="text" />
                <input placeholder='Message' className='placeholder:text-sm px-4 border-[1px] border-slate-400 rounded-md h-10 outline-none' type="text" />
            </form>
        </div>
    )
}

export default GetInTouch