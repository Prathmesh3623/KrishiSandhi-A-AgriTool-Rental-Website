import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';


export default function AddTool() {
    const { t } = useLanguage();




    // const isLoggedIn = localStorage.getItem("isLoggedIn");

    // if (!isLoggedIn) {
    //     return (
    //         <div style={{ textAlign: "center", marginTop: "5rem" }}>
    //             <h2> Please login first</h2>
    //             <p>You must verify your email to add a tool</p>





    const [formData, setFormData] = useState({
        owner_name: '',
        mobile: '',
        implement_name: '',
        implement_name_en: '',
        implement_age: '',
        total_usage_hours: '',
        usage_type: ''
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };




    const toolMap = {
        "नांगर": "Plough",
        "कुळव": "Cultivator",
        "रोटाव्हेटर": "Rotavator",
        "पेरणी यंत्र": "Seeder",
        "खत पसरवणारे यंत्र": "Fertilizer Spreader",
        "स्प्रिंकलर": "Sprinkler",
        "तण काढणी यंत्र": "Weeder",
        "फवारणी यंत्र": "Sprayer",
        "कापणी यंत्र": "Harvester",
        "मळणी यंत्र": "Thresher"
    };















    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const [implement_name, implement_name_en] =
                formData.implement_name.split("|");

            const response = await fetch("http://127.0.0.1:5000/add-tool", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`   // ✅ ADD THIS
                },
                body: JSON.stringify({
                    owner_name: formData.owner_name,
                    mobile: formData.mobile,
                    implement_name: formData.implement_name,
                    implement_name_en,
                    implement_age: Number(formData.implement_age),
                    total_usage_hours: Number(formData.total_usage_hours),
                    usage_type: formData.usage_type
                })
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);

                // Reset form
                setFormData({
                    owner_name: '',
                    mobile: '',
                    implement_name: '',
                    implement_name_en: '',
                    implement_age: '',
                    total_usage_hours: '',
                    usage_type: ''
                });
            } else {
                setMessage(data.error || "Error ❌");
            }

        } catch (error) {
            console.error(error);
            setMessage("Server error ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>

            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-green)', marginBottom: '1rem' }}>
                {t.navbar?.addTool || 'Add Tool'}
            </h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>

                <input
                    type="text"
                    name="owner_name"
                    placeholder="Owner Name"
                    value={formData.owner_name}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                /><br /><br />

                <select
                    name="implement_name"
                    value={formData.implement_name}
                    onChange={handleChange}
                    required
                >
                    <option value="नांगर">Plough</option>
                    <option value="कुळव">Cultivator</option>
                    <option value="रोटाव्हेटर">Rotavator</option>
                    <option value="पेरणी यंत्र">Seeder</option>
                    <option value="खत पसरवणारे यंत्र">Fertilizer Spreader</option>
                    <option value="स्प्रिंकलर">Sprinkler</option>
                    <option value="तण काढणी यंत्र">Weeder</option>
                    <option value="फवारणी यंत्र">Sprayer</option>
                    <option value="कापणी यंत्र">Harvester</option>
                    <option value="मळणी यंत्र">Thresher</option>
                </select>
                <input
                    type="number"
                    name="implement_age"
                    placeholder="Implement Age (years)"
                    value={formData.implement_age}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    type="number"
                    name="total_usage_hours"
                    placeholder="Total Usage Hours"
                    value={formData.total_usage_hours}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    type="text"
                    name="usage_type"
                    placeholder="Usage Type (Ploughing, Seeding, etc.)"
                    value={formData.usage_type}
                    onChange={handleChange}
                    required
                /><br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Add Tool 🚜"}
                </button>
            </form>

            {message && (
                <p style={{ marginTop: '20px', color: 'green' }}>
                    {message}
                </p>
            )}

        </div>
    );
}