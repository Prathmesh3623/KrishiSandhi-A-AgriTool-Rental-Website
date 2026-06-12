import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import * as XLSX from 'xlsx';

export default function AIRecommendation() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    const getStaticPrice = (toolName) => {
        switch(toolName) {
            case 'नांगर': return '800/hr';
            case 'रोटाव्हेटर': return '2500/acre';
            case 'कुळव': return '1200/acre';
            case 'पेरणी यंत्र': return '1800/acre';
            default: return 'NA';
        }
    };

    const [formData, setFormData] = useState({
        cropType: '',
        landArea: '',
        village: '',
        taluka: '',
        district: '',
        season: '',
        soilType: '',
        weather: '',
        usage: '',
        bookingDate: ''
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
                    Booking_Date: formData.bookingDate,
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
        <div style={{ background: 'var(--bg-light)', minHeight: '90vh', padding: '2rem 1rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ color: 'var(--primary-green)', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                        AI शिफारस
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        तुमच्या शेतीच्या परिस्थितीनुसार सर्वोत्तम अवजारांची शिफारस मिळवा.
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
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>पिकाचा प्रकार</label>
                                <select
                                    name="cropType"
                                    value={formData.cropType}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">पीक निवडा</option>
                                    <option value="मका">मका</option>
                                    <option value="बाजरी">बाजरी</option>
                                    <option value="ज्वारी">ज्वारी</option>
                                    <option value="सोयाबीन">सोयाबीन</option>
                                    <option value="ऊस">ऊस</option>
                                </select>
                            </div>

                            {/* Land Area */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>जमिनीचे क्षेत्र</label>
                                <select
                                    name="landArea"
                                    value={formData.landArea}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">जमीन निवडा</option>
                                    <option value="3">१-५ एकर</option>
                                    <option value="7.5">५-१० एकर</option>
                                    <option value="10">१० पेक्षा जास्त</option>
                                </select>
                            </div>

                            {/* Village */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>गाव</label>

    <select
        name="village"
        value={formData.village}
        onChange={handleChange}
        style={{
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none'
        }}
        required
    >
        <option value="">गाव निवडा</option>

        {/* KHATAV VILLAGES */}
        {formData.taluka === "खटाव" && (
            <>
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
            </>
        )}

        {/* KOREGAON VILLAGES */}
        {formData.taluka === "कोरेगाव" && (
            <>
                <option value="तारगाव">तारगाव</option>
                <option value="वाघोली">वाघोली</option>
                <option value="किन्हई">किन्हई</option>
                <option value="बोरगाव">बोरगाव</option>
                <option value="पिंपोडे बुद्रुक">पिंपोडे बुद्रुक</option>
                <option value="पिंपोडे खुर्द">पिंपोडे खुर्द</option>
                <option value="सैगाव">सैगाव</option>
                <option value="एकसळ">एकसळ</option>
                <option value="चिमणगाव">चिमणगाव</option>
                <option value="कण्हेरखेड">कण्हेरखेड</option>
                <option value="करंजखोप">करंजखोप</option>
                <option value="कोळवडी">कोळवडी</option>
                <option value="कुमठे">कुमठे</option>
                <option value="नायगाव">नायगाव</option>
                <option value="निगडी">निगडी</option>
                <option value="रांदुळाबाद">रांदुळाबाद</option>
                <option value="रुई">रुई</option>
                <option value="सांगवी">सांगवी</option>
                <option value="सुरळी">सुरळी</option>
                <option value="वेळू">वेळू</option>
                <option value="आरवी">आरवी</option>
                <option value="आसनगाव">आसनगाव</option>
                <option value="आसगाव">आसगाव</option>
                <option value="बागेवाडी">बागेवाडी</option>
                <option value="बनवडी">बनवडी</option>
                <option value="बेलेवाडी">बेलेवाडी</option>
                <option value="भाडळे">भाडळे</option>
                <option value="भाकरवाडी">भाकरवाडी</option>
                <option value="भोसे">भोसे</option>
                <option value="बिचुकले">बिचुकले</option>
                <option value="चांचळी">चांचळी</option>
                <option value="दहीगाव">दहीगाव</option>
                <option value="धामनेर">धामनेर</option>
                <option value="जळगाव">जळगाव</option>
                <option value="शाहापूर">शाहापूर</option>
                <option value="शेंदुरजणे">शेंदुरजणे</option>
                <option value="सोळशी">सोळशी</option>
                <option value="सुलतानवाडी">सुलतानवाडी</option>
                <option value="तांबी">तांबी</option>
                <option value="त्रिपुटी">त्रिपुटी</option>
                <option value="आंभेरी">आंभेरी</option>
                <option value="आंभुळवाडी">आंभुळवाडी</option>
                <option value="अपशिंगे">अपशिंगे</option>
                <option value="अरबवाडी">अरबवाडी</option>
                <option value="भक्तवाडी">भक्तवाडी</option>
                <option value="भंडारमाची">भंडारमाची</option>
                <option value="आंबवडे स. कोरेगाव">आंबवडे स. कोरेगाव</option>
                <option value="आंबवडे स. वाघोली">आंबवडे स. वाघोली</option>
                <option value="तडवळे स. कोरेगाव">तडवळे स. कोरेगाव</option>
                <option value="सर्कलवाडी">सर्कलवाडी</option>
                <option value="सातारा रोड">सातारा रोड</option>
                <option value="वाठार स्टेशन">वाठार स्टेशन</option>
                <option value="कऱ्हाडे">कऱ्हाडे</option>
                <option value="पलशी">पलशी</option>
                <option value="धानगरवाडी">धानगरवाडी</option>
                <option value="म्हसवे">म्हसवे</option>
                <option value="लिंब">लिंब</option>
                <option value="कटापूर">कटापूर</option>
                <option value="देवपूर">देवपूर</option>
                <option value="पाडळी">पाडळी</option>
            </>
        )}
    </select>
</div>

                            {/* Taluka */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>तालुका</label>
                                <select
                                    name="taluka"
                                    value={formData.taluka}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">तालुका निवडा</option>
                                    <option value="खटाव">खटाव</option>
                                    <option value="कोरेगाव">कोरेगाव</option>

                                </select>
                            </div>

                            {/* District */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>जिल्हा</label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">जिल्हा निवडा</option>
                                    <option value="सातारा">सातारा</option>
                                </select>
                            </div>

                            {/* Season */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>हंगाम</label>
                                <select
                                    name="season"
                                    value={formData.season}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">हंगाम निवडा</option>
                                    <option value="खरीप">खरीप</option>
                                    <option value="रब्बी">रब्बी</option>
                                    <option value="उन्हाळी">उन्हाळी</option>
                                </select>
                            </div>

                            {/* Soil Type */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>मातीचा प्रकार</label>
                                <select
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">माती निवडा</option>
                                    <option value="काळी माती">काळी माती</option>
                                    <option value="लाल माती">लाल माती</option>
                                    <option value="चिकणमाती">चिकणमाती</option>
                                    <option value="Other">इतर</option>
                                </select>
                            </div>

                            {/* Weather Conditions */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>हवामानाची परिस्थिती</label>
                                <select
                                    name="weather"
                                    value={formData.weather}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">परिस्थिती निवडा</option>
                                    <option value="कोरडे (उष्ण)">कोरडे (उष्ण)</option>
                                    <option value="दुष्काळी">दुष्काळी</option>
                                    <option value="पावसाळी">पावसाळी</option>
                                </select>
                            </div>

                            {/* Usage */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>उपयोग</label>
                                <select
                                    name="usage"
                                    value={formData.usage}
                                    onChange={handleChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                                    required
                                >
                                    <option value="">उपयोग निवडा</option>

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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
                                    बुकिंग तारीख
                                </label>

                                <input
                                    type="date"
                                    name="bookingDate"
                                    value={formData.bookingDate}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        padding: '0.8rem',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                        outline: 'none'
                                    }}
                                />
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
                            {loading ? 'शेतीच्या डेटाचे विश्लेषण करत आहे...' : 'AI शिफारस मिळवा'}
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
                        <h2>निकाल:</h2>
                        <p>
                            <strong>शिफारस केलेले अवजार:</strong> {result.recommended_tool}
                        </p>
                            

                        {/* Owners Section */}
                        {result?.owners?.length > 0 ? (
                            <div className="owners-list">
                                <h3>उपलब्ध मालक</h3>

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
                                        <p><strong>नाव:</strong> {owner.owner_name}</p>
                                        <p><strong>मोबाईल:</strong> {owner.mobile}</p>
                                        <p><strong>अवजार:</strong> {owner.implement_name}</p>
                                        <p><strong>अवजाराचे वय:</strong> {owner.implement_age}</p>
                                        <p><strong>वापरलेले तास:</strong> {owner.total_usage_hours || "उपलब्ध नाही"}</p>
                                        <p><strong>दर:</strong> ₹{getStaticPrice(owner.implement_name)}</p>

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
                                            आत्ताच बुक करा
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ marginTop: "10px", color: "red" }}>
                                या अवजारासाठी कोणतेही मालक उपलब्ध नाहीत
                            </p>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
