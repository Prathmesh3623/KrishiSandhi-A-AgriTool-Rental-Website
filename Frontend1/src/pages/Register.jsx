import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [role, setRole] = useState('farmer');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        village: '',
        taluka: '',
        district: '',
        state: '',
        pincode: '',
        landSize: '',
        shopName: '',
        toolName: '',
        toolCategory: 'Tractor',
        toolDescription: '',
        specifications: '',
        rentalPrice: '',
        availableFrom: '',
        availableTo: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            // STEP 1: Send OTP ONLY
            await axios.post('http://127.0.0.1:5000/send-otp', {
                email: formData.email
            });

            setShowOtp(true);
            alert("OTP sent successfully ✅");

        } catch (err) {
            setError(err.response?.data?.error || 'OTP send failed');
        }

        setLoading(false);
    };
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('http://127.0.0.1:5000/verify-otp', {
                email: formData.email,
                otp
            });

            // STEP 3: NOW REGISTER USER
            await axios.post('http://127.0.0.1:5000/register', {
                email: formData.email,
                mobile: formData.mobile,
                fullName: formData.fullName,
                password: formData.password,
                role: role,
                address: {
                    village: formData.village,
                    taluka: formData.taluka,
                    district: formData.district,
                    state: formData.state,
                    pincode: formData.pincode
                },
                landSize: formData.landSize,
                shopName: formData.shopName
            });

            alert("Registration successful ✅");
            navigate('/login');

        } catch (err) {
            alert(err.response?.data?.error || 'OTP verification failed');
        }

        setLoading(false);
    };

    return (
        <div className="register-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 20px',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}>
            <div className="register-card" style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: role === 'owner' ? '800px' : '500px',
                transition: 'max-width 0.4s ease'
            }}>
                <div className="text-center" style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem', fontSize: '2.2rem', fontWeight: '800' }}>
                        {role === 'farmer' ? t.register.title : 'Tool Owner Registration'}
                    </h2>
                    <p style={{ color: '#666' }}>{t.register.subtitle}</p>
                </div>

                {/* Role Selector */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    background: '#f1f3f5',
                    padding: '6px',
                    borderRadius: '12px'
                }}>
                    <button
                        type="button"
                        onClick={() => setRole('farmer')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            border: 'none',
                            borderRadius: '8px',
                            background: role === 'farmer' ? 'var(--primary-green)' : 'transparent',
                            color: role === 'farmer' ? 'white' : '#495057',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {t.register.farmer}
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('owner')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            border: 'none',
                            borderRadius: '8px',
                            background: role === 'owner' ? 'var(--mustard-yellow)' : 'transparent',
                            color: role === 'owner' ? '#333' : '#495057',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {t.register.owner}
                    </button>
                </div>

                {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                {!showOtp ? (
                    <form onSubmit={handleSubmit}>
                        {/* Section 1: Personal Details */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '1.5rem', color: '#444' }}>
                                1. Personal Details
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: role === 'owner' ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={labelStyle}>{t.register.fullNameLabel}</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder={t.register.fullNamePlaceholder}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.register.mobileLabel} (Login ID)</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="10-digit mobile number"
                                        maxLength="10"
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                {role === 'owner' && (
                                    <>
                                        <div>
                                            <label style={labelStyle}>{t.register.emailLabel}</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t.register.emailPlaceholder}
                                                style={inputStyle}
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>{t.register.shopNameLabel}</label>
                                            <input
                                                type="text"
                                                name="shopName"
                                                value={formData.shopName}
                                                onChange={handleChange}
                                                placeholder={t.register.shopNamePlaceholder}
                                                style={inputStyle}
                                            />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <label style={labelStyle}>{t.register.passwordLabel}</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder={t.register.passwordPlaceholder}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.register.confirmPasswordLabel}</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder={t.register.confirmPasswordPlaceholder}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                {role === 'farmer' && (
                                    <div>
                                        <label style={labelStyle}>{t.register.landSizeLabel}</label>
                                        <input
                                            type="number"
                                            name="landSize"
                                            value={formData.landSize}
                                            onChange={handleChange}
                                            placeholder={t.register.landSizePlaceholder}
                                            style={inputStyle}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Email (OTP will be sent here)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                style={inputStyle}
                                required
                            />
                        </div>
                        {/* Section 2: Address Details */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '1.5rem', color: '#444' }}>
                                2. Address Details
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={labelStyle}>{t.register.villageLabel}</label>
                                    <input
                                        type="text"
                                        name="village"
                                        value={formData.village}
                                        onChange={handleChange}
                                        placeholder={t.register.villagePlaceholder}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.register.talukaLabel}</label>
                                    <input
                                        type="text"
                                        name="taluka"
                                        value={formData.taluka}
                                        onChange={handleChange}
                                        placeholder={t.register.talukaPlaceholder}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.register.districtLabel}</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        placeholder={t.register.districtPlaceholder}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.register.stateLabel}</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder={t.register.statePlaceholder}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div style={{ gridColumn: role === 'farmer' ? 'span 2' : 'auto' }}>
                                    <label style={labelStyle}>{t.register.pincodeLabel}</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder={t.register.pincodePlaceholder}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Tool Details (Only for Tool Owner) */}
                        {role === 'owner' && (
                            <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.5s' }}>
                                <h4 style={{ borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '1.5rem', color: '#444' }}>
                                    3. Tool Details <span style={{ color: 'var(--primary-green)', fontSize: '0.8rem' }}>(Very Important)</span>
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={labelStyle}>{t.register.toolCategoryLabel}</label>
                                        <select
                                            name="toolCategory"
                                            value={formData.toolCategory}
                                            onChange={handleChange}
                                            style={inputStyle}
                                        >
                                            <option value="Tractor">Tractor</option>
                                            <option value="Rotavator">Rotavator</option>
                                            <option value="Seeder">Seeder</option>
                                            <option value="Harvester">Harvester</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>{t.register.toolNameLabel}</label>
                                        <input
                                            type="text"
                                            name="toolName"
                                            list="tool-suggestions"
                                            value={formData.toolName}
                                            onChange={handleChange}
                                            placeholder={t.register.toolNamePlaceholder}
                                            style={inputStyle}
                                            required
                                        />
                                        <datalist id="tool-suggestions">
                                            <option value="John Deere 5050D" />
                                            <option value="Mahindra Arjun 555" />
                                            <option value="Sonalika Worldtrac 60" />
                                            <option value="Kubota MU4501" />
                                            <option value="Massey Ferguson 241" />
                                            <option value="New Holland 3630" />
                                        </datalist>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={labelStyle}>{t.register.toolDescriptionLabel}</label>
                                        <textarea
                                            name="toolDescription"
                                            value={formData.toolDescription}
                                            onChange={handleChange}
                                            placeholder={t.register.toolDescriptionPlaceholder}
                                            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                                        />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={labelStyle}>{t.register.specificationsLabel}</label>
                                        <input
                                            type="text"
                                            name="specifications"
                                            value={formData.specifications}
                                            onChange={handleChange}
                                            placeholder={t.register.specificationsPlaceholder}
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>{t.register.rentalPriceLabel}</label>
                                        <input
                                            type="number"
                                            name="rentalPrice"
                                            value={formData.rentalPrice}
                                            onChange={handleChange}
                                            placeholder={t.register.rentalPricePlaceholder}
                                            style={inputStyle}
                                            required
                                        />
                                    </div>
                                    <div>
                                        {/* Empty space or something else */}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>{t.register.availableFromLabel}</label>
                                        <input
                                            type="date"
                                            name="availableFrom"
                                            value={formData.availableFrom}
                                            onChange={handleChange}
                                            style={inputStyle}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>{t.register.availableToLabel}</label>
                                        <input
                                            type="date"
                                            name="availableTo"
                                            value={formData.availableTo}
                                            onChange={handleChange}
                                            style={inputStyle}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <button className="btn btn-primary" disabled={loading} style={{
                            width: '100%',
                            padding: '1.2rem',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            marginTop: '1rem',
                            borderRadius: '12px',
                            boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)',
                            opacity: loading ? 0.7 : 1
                        }}>
                            {loading ? 'Processing...' : t.register.registerBtn}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} style={{ animation: 'fadeIn 0.5s' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <p>An OTP has been sent to your mobile/email. Please enter it below to verify your account.</p>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={labelStyle}>Enter 6-digit OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="000000"
                                maxLength="6"
                                style={{ ...inputStyle, textAlign: 'center', fontSize: '1.5rem', letterSpacing: '8px' }}
                                required
                            />
                        </div>
                        <button className="btn btn-primary" disabled={loading} style={{
                            width: '100%',
                            padding: '1.2rem',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            borderRadius: '12px',
                            opacity: loading ? 0.7 : 1
                        }}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowOtp(false)}
                            style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                marginTop: '1rem',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        >
                            Back to Registration
                        </button>
                    </form>
                )}

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: '#666' }}>
                    {t.register.hasAccount} <Link to="/login" style={{ color: 'var(--primary-green)', fontWeight: '700', textDecoration: 'none' }}>{t.register.loginLink}</Link>
                </div>
            </div>

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .register-card input:focus, .register-card select:focus, .register-card textarea:focus {
                        border-color: var(--primary-green) !important;
                        box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.1);
                        outline: none;
                    }
                `}
            </style>
        </div>
    );
}

const labelStyle = {
    display: 'block',
    marginBottom: '0.6rem',
    fontWeight: '600',
    color: '#495057',
    fontSize: '0.9rem'
};

const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1.5px solid #e9ecef',
    fontSize: '1rem',
    background: '#f8f9fa',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
};
