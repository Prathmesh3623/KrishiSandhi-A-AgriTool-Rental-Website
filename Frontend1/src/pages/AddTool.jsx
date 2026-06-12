import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';
import styles from './AddTool.module.css';

export default function AddTool() {
    const { t } = useLanguage();

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
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);


    const location = useLocation();

    const { userName, userId , mobile } = location.state || {};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            // Extract Marathi and English name if the value has '|' separator
            let implement_name = formData.implement_name;
            let implement_name_en = formData.implement_name;

            if (formData.implement_name.includes("|")) {
                [implement_name, implement_name_en] = formData.implement_name.split("|");
            }

            const response = await fetch("http://127.0.0.1:5000/add-tool", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    owner_name: userName || "",
                    mobile: mobile || "",
                    implement_name: implement_name,
                    implement_name_en: implement_name_en,
                    implement_age: Number(formData.implement_age),
                    total_usage_hours: Number(formData.total_usage_hours),
                    usage_type: formData.usage_type
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || "अवजार यशस्वीरीत्या जोडले! ✅");
                setIsError(false);

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
                setMessage(data.error || "त्रुटी ❌");
                setIsError(true);
            }

        } catch (error) {
            console.error(error);
            setMessage("सर्व्हर त्रुटी ❌");
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h1>{t.navbar?.rent || 'अवजार जोडा'}</h1>
                    <p>इतरांना वापरण्यासाठी तुमचे शेती उपकरण जोडा</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="implement_name">अवजाराचे नाव</label>
                        <select
                            id="implement_name"
                            name="implement_name"
                            value={formData.implement_name}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>अवजार निवडा</option>
                            <option value="नांगर|Plough">नांगर (Plough)</option>
                            <option value="कुळव|Cultivator">कुळव (Cultivator)</option>
                            <option value="रोटाव्हेटर|Rotavator">रोटाव्हेटर (Rotavator)</option>
                            <option value="पेरणी यंत्र|Seeder">पेरणी यंत्र (Seeder)</option>
                            <option value="खत पसरवणारे यंत्र|Fertilizer Spreader">खत पसरवणारे यंत्र (Fertilizer Spreader)</option>
                            <option value="स्प्रिंकलर|Sprinkler">स्प्रिंकलर (Sprinkler)</option>
                            <option value="तण काढणी यंत्र|Weeder">तण काढणी यंत्र (Weeder)</option>
                            <option value="फवारणी यंत्र|Sprayer">फवारणी यंत्र (Sprayer)</option>
                            <option value="कापणी यंत्र|Harvester">कापणी यंत्र (Harvester)</option>
                            <option value="मळणी यंत्र|Thresher">मळणी यंत्र (Thresher)</option>
                        </select>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="implement_age">अवजाराचे वय (वर्षे)</label>
                            <input
                                id="implement_age"
                                type="number"
                                name="implement_age"
                                placeholder="उदा. २"
                                value={formData.implement_age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="total_usage_hours">एकूण वापरलेले तास</label>
                            <input
                                id="total_usage_hours"
                                type="number"
                                name="total_usage_hours"
                                placeholder="उदा. १००"
                                value={formData.total_usage_hours}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="usage_type">वापराचा प्रकार</label>
                        <input
                            id="usage_type"
                            type="text"
                            name="usage_type"
                            placeholder="उदा. नांगरणी, पेरणी, इ."
                            value={formData.usage_type}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* District */}
                    <div className={styles.inputGroup}>
                        <label>जिल्हा</label>

                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        >
                            <option value="">जिल्हा निवडा</option>
                            <option value="सातारा">सातारा</option>
                        </select>
                    </div>
                    {/* Taluka */}
                    <div className={styles.inputGroup}>
                        <label>तालुका</label>

                        <select
                            name="taluka"
                            value={formData.taluka}
                            onChange={handleChange}
                            required
                        >
                            <option value="">तालुका निवडा</option>
                            <option value="खटाव">खटाव</option>
                            <option value="कोरेगाव">कोरेगाव</option>
                        </select>
                    </div>

                    {/* Village */}
                    <div className={styles.inputGroup}>
                        <label>गाव</label>

                        <select
                            name="village"
                            value={formData.village}
                            onChange={handleChange}
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
                    <button type="submit" disabled={loading} className={styles.submitBtn}>
                        {loading ? "सबमिट करत आहे..." : "अवजार जोडा 🚜"}
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