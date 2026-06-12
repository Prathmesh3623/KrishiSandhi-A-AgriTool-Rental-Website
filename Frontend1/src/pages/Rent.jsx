import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styles from './Rent.module.css';

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
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        try {
            const response = await fetch("http://127.0.0.1:5000/rent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || "Tool added successfully! ✅");
                setIsError(false);
            } else {
                setMessage(data.error || "Failed to add tool ❌");
                setIsError(true);
            }

        } catch (error) {
            console.error(error);
            setMessage("Something went wrong ❌");
            setIsError(true);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h1>{t.navbar?.rent || 'Add a Tool'}</h1>
                    <p>List your farming equipment for others to use</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="tool">Tool Name</label>
                        <input
                            id="tool"
                            type="text"
                            name="tool"
                            placeholder="e.g., Tractor, Harvester"
                            value={formData.tool}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="days">Number of Days</label>
                            <input
                                id="days"
                                type="number"
                                name="days"
                                placeholder="e.g., 5"
                                value={formData.days}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="start_date">Available From</label>
                            <input
                                id="start_date"
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Submit Tool 🚜
                    </button>

                    {message && (
                        <div className={`${styles.message} ${isError ? styles.messageError : styles.messageSuccess}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}