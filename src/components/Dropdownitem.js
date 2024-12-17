import React, { useState } from 'react'

const Dropdownitem = () => {
    const [qauntity, setQquntity] = useState(1)
    const handleClick = (e) => {
        setQquntity(e.target.value)
    }
    return (
        <div className="w-25 dropdown">
            <button className="btn btn-warning text-white dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {qauntity}
            </button>
            <div className="bg-warning dropdown-menu">
                {
                    Array.from(Array(5), (e, i) => {
                        return (
                            <button className="dropdown-item" key={i + 1} value={i + 1} type="button" onClick={handleClick}>{i + 1}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Dropdownitem
