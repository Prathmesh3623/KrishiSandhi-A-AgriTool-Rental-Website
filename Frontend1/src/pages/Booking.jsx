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
                <h2>कोणताही बुकिंग डेटा आढळला नाही ❌</h2>
                <button onClick={() => navigate('/')}>मुख्य पानावर जा</button>
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
                setMessage("✅ बुकिंग यशस्वी!");
            } else {
                if (data.error_code === "TIME_SLOT_CONFLICT") {
                    setMessage("⛔ ही वेळ आधीच बुक केलेली आहे. कृपया दुसरी वेळ निवडा.");
                } else {
                    setMessage(data.message || data.error || "❌ बुकिंग अयशस्वी");
                }
            }

        } catch (error) {
            console.error(error);
            setMessage("❌ सर्व्हर त्रुटी");
        } finally {
            setLoading(false);
        }
    };
    const inputStyle = {
        width: '100%',
        padding: '0.9rem 1rem',
        borderRadius: '12px',
        border: '1px solid #d0d7de',
        fontSize: '1rem',
        outline: 'none',
            background: '#fafafa',
            boxSizing: 'border-box'
        };
    return (
    <div
        style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f4fff4 0%, #e8f5e9 100%)',
            padding: '3rem 1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <div
            style={{
                width: '100%',
                maxWidth: '750px',
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
            }}
        >

            {/* HEADER */}
            <div
                style={{
                    background:
                        'linear-gradient(135deg, #2e7d32 0%, #43a047 100%)',
                    padding: '2rem',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: '2rem',
                        fontWeight: '700'
                    }}
                >
                    🚜 बुकिंग निश्चित करा
                </h1>

                <p
                    style={{
                        marginTop: '0.7rem',
                        opacity: 0.9
                    }}
                >
                    तुमचे कृषी अवजार सुरक्षितपणे बुक करा
                </p>
            </div>

            <div style={{ padding: '2rem' }}>

                {/* TOOL DETAILS */}
                <div
                    style={{
                        background: '#f8fff8',
                        border: '1px solid #d7f0d8',
                        borderRadius: '18px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}
                >
                    <h3
                        style={{
                            marginBottom: '1rem',
                            color: '#2e7d32'
                        }}
                    >
                        📋 अवजाराची माहिती
                    </h3>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '1rem'
                        }}
                    >
                        <div>
                            <strong>मालक:</strong>
                            <br />
                            {ownerName}
                        </div>

                        <div>
                            <strong>मोबाईल:</strong>
                            <br />
                            {mobile}
                        </div>

                        <div>
                            <strong>अवजार:</strong>
                            <br />
                            {tool}
                        </div>

                        <div>
                            <strong>अवजाराचे वय:</strong>
                            <br />
                            {age}
                        </div>

                        <div>
                            <strong>वापरलेले तास:</strong>
                            <br />
                            {usage}
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1.5rem'
                        }}
                    >

                        {/* DATE */}
                        <div>
                            <label
                                style={{
                                    fontWeight: '600',
                                    marginBottom: '0.5rem',
                                    display: 'block'
                                }}
                            >
                                📅 तारीख
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split("T")[0]}
                                style={inputStyle}
                            />
                        </div>

                        {/* START TIME */}
                        <div>
                            <label
                                style={{
                                    fontWeight: '600',
                                    marginBottom: '0.5rem',
                                    display: 'block'
                                }}
                            >
                                ⏰ सुरुवातीची वेळ
                            </label>

                            <input
                                type="time"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>

                        {/* END TIME */}
                        <div>
                            <label
                                style={{
                                    fontWeight: '600',
                                    marginBottom: '0.5rem',
                                    display: 'block'
                                }}
                            >
                                ⏳ शेवटची वेळ
                            </label>

                            <input
                                type="time"
                                name="end_time"
                                value={formData.end_time}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>

                        {/* ACRES */}
                        <div>
                            <label
                                style={{
                                    fontWeight: '600',
                                    marginBottom: '0.5rem',
                                    display: 'block'
                                }}
                            >
                                🌾 जमिनीचे क्षेत्र (एकर)
                            </label>

                            <input
                                type="number"
                                name="acres"
                                placeholder="एकर प्रविष्ट करा"
                                value={formData.acres}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div style={{ marginTop: '1.5rem' }}>
                        <label
                            style={{
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                display: 'block'
                            }}
                        >
                            📍 पूर्ण पत्ता
                        </label>

                        <textarea
                            name="address"
                            placeholder="पूर्ण पत्ता प्रविष्ट करा"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows={4}
                            style={{
                                ...inputStyle,
                                resize: 'none'
                            }}
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            marginTop: '2rem',
                            padding: '1rem',
                            background:
                                'linear-gradient(135deg, #2e7d32 0%, #43a047 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: '0.3s',
                            boxShadow:
                                '0 10px 25px rgba(46,125,50,0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        {loading
                            ? 'प्रक्रिया करत आहे...'
                            : '✅ बुकिंग निश्चित करा'}
                    </button>
                </form>

                {/* MESSAGE */}
                {message && (
                    <div
                        style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            borderRadius: '12px',
                            background: message.includes("✅")
                                ? '#e8f5e9'
                                : '#ffebee',
                            color: message.includes("✅")
                                ? '#2e7d32'
                                : '#c62828',
                            textAlign: 'center',
                            fontWeight: '600'
                        }}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    </div>
);



}