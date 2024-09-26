import React from 'react'
function Date({ data }) {
    return (
        <span className="text-gray-300 font-semibold">
            {format(new Date(data?.date), 'MMM do yyyy')}
        </span>
    )
}

export default Date