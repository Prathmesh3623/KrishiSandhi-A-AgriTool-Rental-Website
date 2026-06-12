import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import * as XLSX from 'xlsx';

import cultivatorImg from '../assets/cultivator.png';
import seedDrillImg from '../assets/seed_drill.png';
import sprayerImg from '../assets/sprayer.png';
import waterPumpImg from '../assets/water_pump.png';
import harvesterImg from '../assets/harvester.png';
import tractorImg from '../assets/tractor.png';
import ploughImg from '../assets/plough.png';
import rotavatorImg from '../assets/rotavator.png';

export default function Hire() {
    const location = useLocation();
    const { ownerName, mobile, tool, age, usage } = location.state || {};
    const { t } = useLanguage();
    const [owners, setOwners] = useState([]);
    const [selectedTool, setSelectedTool] = useState(null);
    const [viewOwners, setViewOwners] = useState(false);
    const navigate = useNavigate();
    const isFromRecommendation = location.state?.tool;


    const normalizeTool = (name) => {
        return name
            .split("|")[0]
            .trim();
    };

    const fetchOwners = async (toolName) => {
        try {
            const res = await fetch(
                `http://127.0.0.1:5000/owners?tool=${encodeURIComponent(toolName)}`
            );

            if (!res.ok) {
                setOwners([]);
                return;
            }

            const data = await res.json();
            setOwners(data || []);

        } catch (err) {
            console.log(err);
            setOwners([]);
        }
    };
    useEffect(() => {

        console.log("📦 LOCATION STATE:", location.state);

        // ✅ Case 1: From AI Recommendation
        if (location.state?.ownerName) {

            const ownerData = {
                owner_name: location.state.ownerName,
                mobile: location.state.mobile,
                implement_name: location.state.tool,
                implement_age: location.state.age,
                total_usage_hours: location.state.usage,
                _id: location.state.tool_id || null   // 🔥 safety
            };

            console.log("✅ OWNER SET IN HIRE:", ownerData);

            setOwners([ownerData]);
            setSelectedTool({ name: location.state.tool });
            setViewOwners(true);
        }

        // ✅ Case 2: Normal flow
        else if (location.state?.owners) {

            console.log("✅ OWNERS LIST FROM NORMAL FLOW:", location.state.owners);

            setOwners(location.state.owners);
            setSelectedTool({ name: location.state.tool });
            setViewOwners(true);
        }

    }, [location.state]);






    const handleBooking = (owner) => {


        console.log("🚀 BOOKING OWNER:", owner);

        if (!owner._id) {
            alert("❌ Tool ID missing. Cannot proceed.");
            return;
        }
        navigate('/booking', {
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

    const tools = [
        { id: 1, name_en: 'Tractor', name_mr: 'ट्रॅक्टर', image: tractorImg },
        { id: 2, name_en: 'Plough', name_mr: 'नांगर', image: ploughImg },
        { id: 3, name_en: 'Rotavator', name_mr: 'रोटाव्हेटर', image: rotavatorImg },
        { id: 4, name_en: 'Cultivator', name_mr: 'कुळव', image: cultivatorImg },
        { id: 5, name_en: 'Seeder (Seed Drill)', name_mr: 'पेरणी यंत्र', image: seedDrillImg },
        { id: 6, name_en: 'Sprayer', name_mr: 'फवारणी यंत्र', image: sprayerImg },
        { id: 7, name_en: 'Water Pump', name_mr: 'पाणी पंप', image: waterPumpImg },
        { id: 8, name_en: 'Harvester', name_mr: 'कापणी यंत्र', image: harvesterImg },
    ];




    console.log("LOCATION STATE:", location.state);
    console.log("OWNERS:", owners);
    return (
        <div className="container" style={{ padding: '5rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-green)', marginBottom: '1rem', fontWeight: 800 }}>{t.hire?.title || 'Hire Tools'}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', maxWidth: '600px', margin: '0 auto' }}>
                    {t.hire?.description || 'Explore our catalog of premium agricultural tools available for hire at affordable rates.'}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                {tools.map(tool => (
                    <div key={tool.id} style={{
                        background: 'white',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        border: '1px solid #f0f0f0',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(46, 125, 50, 0.15)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                        }}
                    >
                        <div style={{ height: '220px', overflow: 'hidden' }}>
                            <img
                                src={tool.image}
                                alt={tool.name_mr}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            />
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontWeight: 600 }}>{tool.name_en}</h3>
                            <div style={{ height: '30px', marginBottom: '1.5rem' }}></div> {/* Empty price section */}

                            <button
                                className="btn"
                                onClick={async () => {
                                    setSelectedTool(tool);

                                    console.log("Fetching owners for:", tool.name_mr);

                                    await fetchOwners(tool.name_mr);

                                    setViewOwners(true);
                                }}
                                style={{
                                    marginTop: 'auto',
                                    background: 'var(--primary-green)',
                                    color: 'white',
                                    padding: '0.8rem 2.5rem',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Rent
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Tool Owners */}
            {viewOwners && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '2.5rem',
                        borderRadius: '24px',
                        maxWidth: '700px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        position: 'relative',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
                    }}>
                        <button
                            onClick={() => setViewOwners(false)}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: '#f5f5f5',
                                border: 'none',
                                boxSize: '40px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontSize: '1.5rem'
                            }}
                        >
                            &times;
                        </button>

                        <h2 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>Owners for {selectedTool?.name}</h2>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>Showing available rentals from our connected farmers.</p>

                        {owners.length > 0 ? (
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {owners.map((f, idx) => (
                                    <div key={idx} style={{
                                        padding: '1.5rem',
                                        borderRadius: '16px',
                                        border: '1px solid #eee',
                                        background: '#fafafa',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--text-dark)' }}>
                                                {f.owner_name || 'Unnamed Owner'}
                                            </h4>
                                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#666' }}>
                                                {f.mobile || f.mobile || 'No description provided.'}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right', marginLeft: '1.5rem' }}>
                                            <span style={{
                                                display: 'block',
                                                fontSize: '1.3rem',
                                                fontWeight: 'bold',
                                                color: 'var(--primary-green)',
                                                marginBottom: '0.5rem'
                                            }}>
                                                ₹{f.mobile || f.mobile || 'NA'}
                                            </span>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleBooking(f)}
                                                style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', borderRadius: '8px' }}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <i className="fas fa-exclamation-circle" style={{ fontSize: '3rem', color: '#ccc', marginBottom: '1rem' }}></i>
                                <p style={{ color: '#999' }}>No owners found for this tool in the current database.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}