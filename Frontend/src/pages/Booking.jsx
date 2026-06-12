import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Booking() {

    const location = useLocation();
    const navigate = useNavigate();

    // 🔥 Data received from previous page
    const {
        tool_id,
        ownerName,
        mobile,
        tool,
        age,
        usage
    } = location.state || {};

    // 🔥 Booking form state
    const [formData, setFormData] = useState({
        date: '',
        start_time: '',
        end_time: '',
        acres: '',
        address: ''
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔍 Debug (VERY IMPORTANT)
    console.log("BOOKING PAGE DATA:", location.state);

    // ❌ If user directly opens page without data
    if (!ownerName) {
        return (
            <div style={{ textAlign: "center", marginTop: "5rem" }}>
                <h2>No booking data found ❌</h2>
                <button onClick={() => navigate('/')}>Go Home</button>
            </div>
        );
    }

    // 🔄 Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 🚀 Submit booking
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:5000/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({
                    tool_id: tool_id,
                    owner_name: ownerName,
                    mobile: mobile,
                    implement_name: tool,
                    implement_age: age,
                    total_usage_hours: usage,
                    booking_date: formData.date,
                    start_time: formData.start_time,
                    end_time: formData.end_time,
                    land_area: formData.acres,
                    address: formData.address
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("✅ Booking Successful!");
            } else {
                if (data.error_code === "TIME_SLOT_CONFLICT") {
                    setMessage("⛔ This time slot is already booked. Please choose another time.");
                } else {
                    setMessage(data.message || data.error || "❌ Booking Failed");
                }
            }

        } catch (error) {
            console.error(error);
            setMessage("❌ Server Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>

            <h2 style={{ textAlign: 'center', color: 'green' }}>
                Confirm Booking
            </h2>

            {/* 🔥 TOOL + OWNER DETAILS */}
            <div style={{
                background: '#f5f5f5',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px'
            }}>
                <p><strong>Owner:</strong> {ownerName}</p>
                <p><strong>Mobile:</strong> {mobile}</p>
                <p><strong>Tool:</strong> {tool}</p>
                <p><strong>Tool Age:</strong> {age}</p>
                <p><strong>Usage Hours:</strong> {usage}</p>
            </div>

            {/* 📝 BOOKING FORM */}
            <form onSubmit={handleSubmit}>

                <label>Date:</label><br />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                /><br /><br />

                <label>Time:</label><br />
                <label>Start Time:</label><br />
                <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                /><br /><br />

                <label>End Time:</label><br />
                <input
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                /><br /><br />

                <label>Land Area (acres):</label><br />
                <input
                    type="number"
                    name="acres"
                    placeholder="Enter acres"
                    value={formData.acres}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                /><br /><br />

                <label>Address:</label><br />
                <textarea
                    name="address"
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                /><br /><br />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        background: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    {loading ? "Processing..." : "Confirm Booking"}
                </button>
            </form>

            {/* ✅ MESSAGE */}
            {message && (
                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    {message}
                </p>
            )}

        </div>
    );
}