import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Rent() {
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        tool: '',
        name: '',
        phone: '',
        days: '',
        start_date: ''
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/rent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setMessage(data.message || data.error);

        } catch (error) {
            console.error(error);
            setMessage("Something went wrong ❌");
        }
    };

    return (
        <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>

            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-green)', marginBottom: '1rem' }}>
                {t.navbar?.rent || 'Rent Tools'}
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>

                <input
                    type="text"
                    name="tool"
                    placeholder="Tool Name"
                    value={formData.tool}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    type="number"
                    name="days"
                    placeholder="Number of Days"
                    value={formData.days}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                /><br /><br />

                <button type="submit">
                    Rent Now 🚜
                </button>
            </form>

            {/* Message */}
            {message && (
                <p style={{ marginTop: '20px', color: 'green' }}>
                    {message}
                </p>
            )}

        </div>
    );
}