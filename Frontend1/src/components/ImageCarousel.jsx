import comm1 from '../assets/community/comm1.jpg';
import comm2 from '../assets/community/comm2.jpg';
import comm3 from '../assets/community/comm3.jpg';
import comm4 from '../assets/community/comm4.jpg';
import comm5 from '../assets/community/comm5.jpg';

export default function ImageCarousel() {
    const slides = [
        {
            image: comm1,
            legend: "Empowering Modern Indian Agriculture"
        },
        {
            image: comm2,
            legend: "Reliable Support for our Farmers"
        },
        {
            image: comm3,
            legend: "Digital Literacy in Rural India"
        },
        {
            image: comm4,
            legend: "Growing Together as a Community"
        },
        {
            image: comm5,
            legend: "Advanced Farming Community"
        }
    ];

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'relative'
        }}>
            <div className="carousel-track" style={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE/Edge
                scrollBehavior: 'smooth'
            }}>
                {slides.map((slide, index) => (
                    <div key={index} style={{
                        minWidth: '100%',
                        scrollSnapAlign: 'start',
                        position: 'relative',
                        height: '500px',
                        backgroundColor: '#ddd' // Fallback color
                    }}>
                        <img
                            src={slide.image}
                            alt={slide.legend}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(46, 125, 50, 0.9)',
                            color: 'white',
                            padding: '1rem 2rem',
                            borderRadius: '8px',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                        }}>
                            {slide.legend}
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
        .carousel-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>

            {/* Scroll Hint overlay */}
            <div style={{
                position: 'absolute',
                top: '50%',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 1rem',
                pointerEvents: 'none',
                transform: 'translateY(-50%)',
                opacity: 0.5
            }}>
                <span style={{ fontSize: '3rem', color: 'white', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>&#10094;</span>
                <span style={{ fontSize: '3rem', color: 'white', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>&#10095;</span>
            </div>
        </div>
    );
}
