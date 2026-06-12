import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, [location]);

    return (
        <nav style={{ padding: '0.8rem 1rem', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={logo} alt="KrishiSandhi Logo" style={{ height: '50px' }} />
                    <div>
                        <h2 style={{ color: 'var(--primary-green)', margin: 0, fontSize: '1.6rem', fontWeight: 700 }}>कृषिसंधी</h2>
                    </div>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Navigation Links */}
                    <Link to="/" style={{ fontWeight: 500, color: '#333', fontSize: '1.05rem', marginRight: '1rem' }}>{t.navbar.home}</Link>
                    <Link to="/book-tool" style={{ fontWeight: 500, color: '#333', fontSize: '1.05rem', marginRight: '1rem' }}>{t.navbar.hire}</Link>
                    <Link to="/add-tool" style={{ fontWeight: 500, color: '#333', fontSize: '1.05rem', marginRight: '1rem' }}>{t.navbar.rent}</Link>
                    <Link to="/ai-recommend" style={{ fontWeight: 500, color: '#333', fontSize: '1.05rem', marginRight: '1rem' }}>{t.navbar.aiRecommendation}</Link>
                    {isLoggedIn ? (
                        <Link to="/profile" className="btn btn-primary" style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'var(--primary-green)',
                            boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)'
                        }}>
                            <i className="fas fa-user-circle" style={{ fontSize: '1.2rem' }}></i>
                            Profile
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', borderRadius: '50px', boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)' }}>{t.navbar.login}</Link>
                    )}
                    {/* Language Selector pushed to far right */}
                    <select
                        style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            border: '1px solid var(--soil-brown)',
                            background: 'white',
                            color: 'var(--text-dark)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            outline: 'none',
                            marginLeft: 'auto'
                        }}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="mr">Marathi</option>
                    </select>
                </div>
            </div>
        </nav>
    );
}
