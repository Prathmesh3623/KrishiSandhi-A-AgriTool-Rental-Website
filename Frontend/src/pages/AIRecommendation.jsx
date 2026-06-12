import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import * as XLSX from 'xlsx';

export default function AIRecommendation() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    const [formData, setFormData] = useState({
        cropType: '',
        landArea: '',
        village: '',
        taluka: '',
        district: '',
        season: '',
        soilType: '',
        weather: '',
        usage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBooking = (owner) => {
        navigate('/book-tool', {
            state: {
                tool_id: owner._id,
                ownerName: owner.owner_name,
                mobile: owner.mobile,
                tool: owner.implement_name,
                age: owner.implement_age,
                usage: owner.total_usage_hours
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch("http://127.0.0.1:5000/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Crop_Type: formData.cropType,
                    //Soil_Type: formData.soilType,
                    Usage_Type: formData.usage
                })
            });

            const data = await response.json();

            console.log("DATA RECEIVED:", data);

            // 🔥 FORCE STATE UPDATE
            setResult(null);
            setTimeout(() => {
                setResult({ ...data });
            }, 100);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ background: 'var(--bg-white)', minHeight: '90vh', padding: '2rem 1rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ color: 'var(--primary-green)', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                        AI Smart Recommendation
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        Powered by Random Forest Algorithm. Get the best tool suggestions for your farm conditions.
                    </p>
                </div>



                <div style={{
                    background: 'white',
                    padding: '2.5rem',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '1px solid var(--wheat-beige)'
                }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            {/* Crop Type */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Type of Crop</label>
                                <select
                                    name="cropType"
                                    value={formData.cropType}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">Select Crop</option>
                                    <option value="मका">मका</option>
                                    <option value="बाजरी">बाजरी</option>
                                    <option value="ज्वारी">ज्वारी</option>
                                    <option value="सोयाबीन">सोयाबीन</option>
                                    <option value="ऊस">ऊस</option>
                                </select>
                            </div>

                            {/* Land Area */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Land Area</label>
                                <select
                                    name="landArea"
                                    value={formData.landArea}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">Select Land</option>
                                    <option value="3">1-5 acres</option>
                                    <option value="7.5">5-10 acres</option>
                                    <option value="10">10 onwards</option>
                                </select>
                            </div>

                            {/* Village */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Village</label>
                                <select
                                    name="village"
                                    value={formData.village}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">Select Village</option>
                                    <option value="पुसेगाव">पुसेगाव</option>
                                    <option value="वडूज">वडूज</option>
                                    <option value="मायणी">मायणी</option>
                                    <option value="निमसोड">निमसोड</option>
                                    <option value="भोसरे">भोसरे</option>
                                    <option value="कटगाव">कटगाव</option>
                                    <option value="पिंपरी">पिंपरी</option>
                                    <option value="चिंचणी">चिंचणी</option>
                                    <option value="करंजे">करंजे</option>
                                    <option value="वाठार">वाठार</option>
                                    <option value="सातेवाडी">सातेवाडी</option>
                                    <option value="भालवडी">भालवडी</option>
                                    <option value="मांडवे">मांडवे</option>
                                    <option value="गोंदवले">गोंदवले</option>
                                    <option value="तडवळे">तडवळे</option>
                                    <option value="नागठाणे">नागठाणे</option>
                                    <option value="कण्हेरखेड">कण्हेरखेड</option>
                                    <option value="शिरसवाडी">शिरसवाडी</option>
                                    <option value="खरशिंगे">खरशिंगे</option>
                                    <option value="पळसवडे">पळसवडे</option>
                                    <option value="भिवडी">भिवडी</option>
                                    <option value="राजाचे कुरोली">राजाचे कुरोली</option>
                                    <option value="भुरकवडी">भुरकवडी</option>
                                    <option value="तांबवे">तांबवे</option>
                                    <option value="दहिवडी">दहिवडी</option>
                                    <option value="धोंडेवाडी">धोंडेवाडी</option>
                                    <option value="देवपूर">देवपूर</option>
                                    <option value="धामणेर">धामणेर</option>
                                    <option value="लिंब">लिंब</option>
                                    <option value="बेलवडे">बेलवडे</option>
                                    <option value="तारागाव">तारागाव</option>
                                    <option value="पाटकळ">पाटकळ</option>
                                    <option value="नागज">नागज</option>
                                    <option value="खुटबाव">खुटबाव</option>
                                    <option value="जखणगाव">जखणगाव</option>
                                    <option value="आंबवडे">आंबवडे</option>
                                    <option value="पडळी">पडळी</option>
                                    <option value="भोसलेवाडी">भोसलेवाडी</option>
                                    <option value="चरेगाव">चरेगाव</option>
                                    <option value="म्हसवड">म्हसवड</option>
                                    <option value="कुसूर">कुसूर</option>
                                    <option value="बांबवडे">बांबवडे</option>
                                    <option value="भाडळे">भाडळे</option>
                                    <option value="कतारवाडी">कतारवाडी</option>
                                    <option value="नवडी">नवडी</option>
                                    <option value="जुनेवाडी">जुनेवाडी</option>
                                    <option value="कोळकी">कोळकी</option>
                                    <option value="पिंपळवाडी">पिंपळवाडी</option>
                                    <option value="माळवाडी">माळवाडी</option>
                                    <option value="गुरसाळे">गुरसाळे</option>
                                </select>
                            </div>

                            {/* Taluka */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Taluka</label>
                                <select
                                    name="taluka"
                                    value={formData.taluka}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">Select Taluka</option>
                                    <option value="खटाव">खटाव</option>
                                </select>
                            </div>

                            {/* District */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>District</label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">Select District</option>
                                    <option value="सातारा">सातारा</option>
                                </select>
                            </div>

                            {/* Season */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Season</label>
                                <select
                                    name="season"
                                    value={formData.season}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">Select Season</option>
                                    <option value="खरीप">खरीप</option>
                                    <option value="रब्बी">रब्बी</option>
                                    <option value="उन्हाळी">उन्हाळी</option>
                                </select>
                            </div>

                            {/* Soil Type */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Soil Type</label>
                                <select
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">Select Soil</option>
                                    <option value="काळी माती">काळी माती</option>
                                    <option value="लाल माती">लाल माती</option>
                                    <option value="चिकणमाती">चिकणमाती</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Weather Conditions */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Weather Conditions</label>
                                <select
                                    name="weather"
                                    value={formData.weather}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">Select Condition</option>
                                    <option value="कोरडे (उष्ण)">कोरडे (उष्ण)</option>
                                    <option value="दुष्काळी">दुष्काळी</option>
                                    <option value="पावसाळी">पावसाळी</option>
                                </select>
                            </div>

                            {/* Usage */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Usage</label>
                                <select
                                    name="usage"
                                    value={formData.usage}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">Select Usage</option>

                                    <option value="जमीन तयारी">जमीन तयारी</option>

                                    <option value="पेरणी">पेरणी</option>

                                    <option value="खत देणे">खत देणे</option>

                                    <option value="सिंचन">सिंचन</option>

                                    <option value="तण नियंत्रण">तण नियंत्रण</option>

                                    <option value="फवारणी">फवारणी</option>

                                    <option value="कापणी">कापणी</option>

                                    <option value="मळणी">मळणी</option>
                                </select>
                            </div>
                        </div>



                        <button
                            type="submit"
                            className="btn"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--primary-green)',
                                color: 'white',
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                borderRadius: '10px',
                                cursor: loading ? 'wait' : 'pointer',
                                opacity: loading ? 0.8 : 1
                            }}
                        >
                            {loading ? 'Analyzing Farm Data...' : 'Get AI Recommendation'}
                        </button>
                    </form>
                </div>

                {/* Results Section */}

                {result !== null && (
                    <div
                        style={{
                            marginTop: "2rem",
                            background: "lightgreen",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        <h2>RESULT:</h2>

                        {/* Recommended Tool */}
                        <p>
                            <strong>Recommended Tool:</strong> {result.recommended_tool}
                        </p>

                        {/* Full JSON (optional debug) */}
                        <pre>{JSON.stringify(result, null, 2)}</pre>

                        {/* Owners Section */}
                        {result?.owners?.length > 0 ? (
                            <div className="owners-list">
                                <h3>Available Owners</h3>

                                {result.owners.map((owner, index) => (
                                    <div
                                        key={index}
                                        className="owner-card"
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: "10px",
                                            marginTop: "10px",
                                            borderRadius: "8px",
                                            background: "#fff",
                                        }}
                                    >
                                        <p><strong>Name:</strong> {owner.owner_name}</p>
                                        <p><strong>Mobile:</strong> {owner.mobile}</p>
                                        <p><strong>Tool:</strong> {owner.implement_name}</p>
                                        <p><strong>Tool Age:</strong> {owner.implement_age}</p>
                                        <p><strong>Usage Hours:</strong> {owner.total_usage_hours || "N/A"}</p>

                                        <button
                                            onClick={() => handleBooking(owner)}
                                            style={{
                                                marginTop: "8px",
                                                padding: "6px 12px",
                                                backgroundColor: "green",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ marginTop: "10px", color: "red" }}>
                                No owners available for this tool
                            </p>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
