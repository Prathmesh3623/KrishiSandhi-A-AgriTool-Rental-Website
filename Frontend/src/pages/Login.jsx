import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log("LOGIN CLICKED", { mobile, password });

        try {
            const res = await axios.post('http://127.0.0.1:5000/login', {
                mobile,
                password
            });

            const token = res.data.token;

            if (!token) {
                setError("Token missing from server");
                return;
            }

            localStorage.setItem('token', token);
            localStorage.setItem('mobile', mobile);

            navigate('/profile');

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: 'var(--bg-light)' }}>
            <div style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                border: '1px solid var(--soil-brown)',
                boxShadow: '0 10px 25px rgba(141, 110, 99, 0.15)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: 'var(--primary-green)', margin: 0, fontSize: '2rem' }}>{t.login.welcome}</h2>
                    <p style={{ color: 'var(--soil-brown)', marginTop: '0.5rem' }}>{t.login.subtitle}</p>
                </div>

                <form onSubmit={handleLogin}>
                    {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#333' }}>{t.login.mobileLabel}</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666', fontWeight: 500 }}>+91</span>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="0000000000"
                                maxLength="10"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    paddingLeft: '3rem',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#333' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(46, 125, 50, 0.4)', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    {t.login.noAccount} <Link to="/register" style={{ color: 'var(--primary-green)', fontWeight: 600 }}>{t.login.registerLink}</Link>
                </div>
            </div>
        </div>
    );
}
