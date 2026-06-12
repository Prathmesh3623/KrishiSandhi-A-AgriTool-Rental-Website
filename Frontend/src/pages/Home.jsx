import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import heroImage from '../assets/hero-farmer.jpg';

export default function Home() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                padding: '8rem 1rem',
                textAlign: 'center',
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderBottom: '5px solid var(--soil-brown)'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: 700, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        {t.home.heroTitle}
                    </h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '3rem', maxWidth: '800px', marginInline: 'auto', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        {t.home.heroSubtitle}
                    </p>
                    <div className="flex-center" style={{ gap: '1.5rem' }}>
                        <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(46, 125, 50, 0.4)', backgroundColor: 'var(--primary-green)' }} onClick={() => navigate('/login')}>
                            {t.home.rentNow}
                        </button>
                        <button className="btn" style={{ background: 'var(--mustard-yellow)', color: 'var(--text-dark)', padding: '1rem 2.5rem', fontSize: '1.2rem', border: 'none', fontWeight: 600 }} onClick={() => document.getElementById('tools').scrollIntoView({ behavior: 'smooth' })}>
                            {t.home.viewTools}
                        </button>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer style={{ background: 'var(--soil-brown)', color: 'var(--wheat-beige)', padding: '3rem 1rem', marginTop: 'auto' }}>
                <div className="container text-center">
                    <p style={{ margin: 0 }}>{t.home.footer}</p>
                </div>
            </footer>
        </div>
    );
}
