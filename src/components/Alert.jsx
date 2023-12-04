import React from 'react'

const Alert = ({ type, text }) => {
    return (
        <div className='absolute top-10 left-0 right-0 flex justify-center items-center'>
            <div className={`${type == 'danger' ? 'bg-red-800' : 'bg-blue-800'} p-2 text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex items-center`} role='alert'>
                <p className={`${type == 'danger' ? 'bg-red-500' : 'bg-blue-800'} mr-3 font-semibold py-1 px-2 uppercase flex rounded-full text-xs`}>
                    {type == 'danger' ? 'Failed' : 'Success'}
                </p>
                <p className='mr-2 text-left'>{text}</p>
            </div>

        </div>
    )
}

export default Alert
