import React from 'react'

const Instagram = () => {
    return (
        <div className='pt-14 mb-10 md:mb-0'>
                <h3 className='text-2xl md:text-3xl tracking-wider font-bold text-gray-900 text-center md:text-left mb-7 md:ml-24 font-agdasima'>
                    <a href="https://www.instagram.com/shivrajya_brand_menswear/" target='_blank'>
                        Follow on Instagram
                        <i className="fa fa-instagram ml-3"></i>
                    </a>
                </h3>
            <iframe src="https://widget.taggbox.com/136258" style={{ width: '100%', height: "600px", border: "none" }}></iframe>
        </div>
    )
}

export default Instagram