import React, { useEffect, useState, useRef } from 'react'

const ScrollToTop = () => {
    const [position, setPosition] = useState({ top: 0, left: 0 })

    useEffect(() => {
        window.scroll({
            top: position.top,
            left: position.left,
            behavior: 'smooth'
        })
    }, [position])

    const scrollTop = useRef(null);

   useEffect(() => {
        const handleScroll = () => {
            // Check if scrollTop.current is not null before accessing its style property
            if (scrollTop.current) {
                window.scrollY > 200
                    ? scrollTop.current.style.display = 'inline-block'
                    : scrollTop.current.style.display = 'none';
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='scroll-button'
            onClick={() => setPosition({ top: 0, left: 0 })}
            ref={scrollTop}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                stroke="black" className="w-6 h-6"            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>
        </div>
    )
}

export default ScrollToTop