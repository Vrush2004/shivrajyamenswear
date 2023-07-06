import React from 'react'

const DiscountBanner = () => {
    return (
        <div class="discount-banner border mx-4" style={{borderRadius:"4px"}}>
            <div className="grid grid-cols-2 gap-0 py-4 text-center">
                <div className='mb-0 p-0 border-dashed border-r' style={{lineHeight:"1rem"}}>
                    <b>Get Flat 10% off* </b> <br/>
                    <span className='text-sm mb-1'>on your first purchase</span>
                </div>
                <div >
                    <span className='text-center bg-white text-black'>USE CODE: FLAT10</span>
                </div>
            </div>
        </div>
    )
}

export default DiscountBanner