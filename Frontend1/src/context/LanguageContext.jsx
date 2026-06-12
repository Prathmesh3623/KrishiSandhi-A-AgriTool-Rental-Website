import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        navbar: {
            home: "Home",
            hire: "Book a tool",
            rent: "Add a tool",
            aiRecommendation: "AI Suggestion",
            login: "Login"
        },
        home: {
            heroTitle: "KrishiSandhi",
            heroSubtitle: "Empowering Indian Farmers. Rent advanced agricultural tools at affordable rates.",
            rentNow: "Rent Now",
            viewTools: "View Tools",
            communityTitle: "Our Farming Community",
            availableTools: "Available Tools",
            bookNow: "Book Now",
            footer: "© 2024 KrishiSandhi. Empowering Agriculture.",
            impact: {
                title: "Words from the Field",
                quote1: "Jai Jawan, Jai Kisan",
                quote1Author: "- Lal Bahadur Shastri",
                quote2: "Agriculture is the most healthful, most useful and most noble employment of man.",
                quote2Author: "- George Washington",
                slogan: "Sowing Seeds of Prosperity"
            }
        },
        login: {
            welcome: "Welcome Back",
            subtitle: "Login to rent farming tools",
            mobileLabel: "Mobile Number *",
            otpPlaceholder: "Enter OTP",
            getOtp: "Get OTP",
            verifyLogin: "Verify & Login",
            noAccount: "Don't have an account?",
            registerLink: "Register here"
        },
        register: {
            title: "Farmer Registration",
            subtitle: "Join KrishiSandhi community",
            fullNameLabel: "Full Name *",
            fullNamePlaceholder: "Enter your full name",
            mobileLabel: "Mobile Number *",
            villageLabel: "Village *",
            villagePlaceholder: "Village Name",
            districtLabel: "District *",
            districtPlaceholder: "District",
            landSizeLabel: "Land Size (Acres)",
            landSizePlaceholder: "e.g. 2.5",
            registerBtn: "Register Now",
            hasAccount: "Already have an account?",
            loginLink: "Login here",
            successMessage: "Registration Successful for",
            errorMessage: "Please fill in all required fields correctly.",
            roleLabel: "I am a",
            farmer: "Farmer",
            owner: "Tool Owner",
            shopNameLabel: "Shop Name (Optional)",
            shopNamePlaceholder: "Enter Shop Name",
            emailLabel: "Email (Recommended)",
            emailPlaceholder: "example@mail.com",
            passwordLabel: "Password",
            passwordPlaceholder: "Create a strong password",
            confirmPasswordLabel: "Confirm Password",
            confirmPasswordPlaceholder: "Repeat your password",
            talukaLabel: "Taluka",
            talukaPlaceholder: "Enter Taluka",
            stateLabel: "State",
            statePlaceholder: "Enter State",
            pincodeLabel: "Pincode",
            pincodePlaceholder: "6-digit Pincode",
            toolDetailsTitle: "Tool Details",
            toolNameLabel: "Tool Name",
            toolNamePlaceholder: "e.g. John Deere 5050D",
            toolCategoryLabel: "Tool Category",
            toolDescriptionLabel: "Tool Description",
            toolDescriptionPlaceholder: "Briefly describe your tool",
            specificationsLabel: "Specifications",
            specificationsPlaceholder: "HP, Model, Fuel type etc.",
            rentalPriceLabel: "Rental Price (Per Day)",
            rentalPricePlaceholder: "₹ / day",
            availableFromLabel: "Available From",
            availableToLabel: "Available To",
            categories: {
                tractor: "Tractor",
                rotavator: "Rotavator",
                seeder: "Seeder",
                harvester: "Harvester"
            }
        }
    },
    hi: {
        navbar: {
            home: "होम",
            hire: "किराया",
            rent: "किराए पर",
            aiRecommendation: "AI सुझाव",
            login: "लॉगिन"
        },
        home: {
            heroTitle: "कृषिसंधी",
            heroSubtitle: "भारतीय किसानों का सशक्तिकरण। किफायती दरों पर उन्नत कृषि उपकरण किराए पर लें।",
            rentNow: "किराये पर लें",
            viewTools: "उपकरण देखें",
            communityTitle: "हमारा किसान समुदाय",
            availableTools: "उपलब्ध उपकरण",
            bookNow: "अभी बुक करें",
            footer: "© 2024 कृषिसंधी। कृषि सशक्तिकरण।",
            impact: {
                title: "खेतों से आवाज़",
                quote1: "जय जवान, जय किसान",
                quote1Author: "- लाल बहादुर शास्त्री",
                quote2: "कृषि मनुष्य का सबसे स्वास्थ्यवर्धक, सबसे उपयोगी और सबसे महान रोजगार है।",
                quote2Author: "- जॉर्ज वॉशिंगटन",
                slogan: "समृद्धि के बीज बोना"
            }
        },
        login: {
            welcome: "स्वागत है",
            subtitle: "कृषि उपकरण किराए पर लेने के लिए लॉगिन करें",
            mobileLabel: "मोबाइल नंबर *",
            otpPlaceholder: "ओटीपी दर्ज करें",
            getOtp: "ओटीपी प्राप्त करें",
            verifyLogin: "सत्यापित करें और लॉगिन करें",
            noAccount: "खाता नहीं है?",
            registerLink: "यहाँ रजिस्टर करें"
        },
        register: {
            title: "किसान पंजीकरण",
            subtitle: "कृषिसंधी समुदाय में शामिल हों",
            fullNameLabel: "पूरा नाम *",
            fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
            mobileLabel: "मोबाइल नंबर *",
            villageLabel: "गाँव *",
            villagePlaceholder: "गाँव का नाम",
            districtLabel: "जिला *",
            districtPlaceholder: "जिला",
            landSizeLabel: "भूमि का आकार (एकड़)",
            landSizePlaceholder: "उदाहरण 2.5",
            registerBtn: "अभी रजिस्टर करें",
            hasAccount: "क्या आपके पास पहले से खाता है?",
            loginLink: "यहाँ लॉगिन करें",
            successMessage: "पंजीकरण सफल:",
            errorMessage: "कृपया सभी आवश्यक फ़ील्ड सही ढंग से भरें।",
            roleLabel: "मैं एक हूँ",
            farmer: "किसान",
            owner: "उपकरण मालिक",
            shopNameLabel: "दुकान का नाम (वैकल्पिक)",
            shopNamePlaceholder: "दुकान का नाम दर्ज करें",
            emailLabel: "ईमेल (अनुशंसित)",
            emailPlaceholder: "example@mail.com",
            passwordLabel: "पासवर्ड",
            passwordPlaceholder: "एक मजबूत पासवर्ड बनाएं",
            confirmPasswordLabel: "पासवर्ड की पुष्टि करें",
            confirmPasswordPlaceholder: "अपना पासवर्ड दोहराएं",
            talukaLabel: "तालुका",
            talukaPlaceholder: "तालुका दर्ज करें",
            stateLabel: "राज्य",
            statePlaceholder: "राज्य दर्ज करें",
            pincodeLabel: "पिनकोड",
            pincodePlaceholder: "6-अंकीय पिनकोड",
            toolDetailsTitle: "उपकरण विवरण",
            toolNameLabel: "उपकरण का नाम",
            toolNamePlaceholder: "जैसे जॉन डीरे 5050D",
            toolCategoryLabel: "उपकरण श्रेणी",
            toolDescriptionLabel: "उपकरण विवरण",
            toolDescriptionPlaceholder: "अपने उपकरण का संक्षिप्त वर्णन करें",
            specificationsLabel: "विशेष विवरण",
            specificationsPlaceholder: "HP, मॉडल, ईंधन प्रकार आदि",
            rentalPriceLabel: "किराया मूल्य (प्रति दिन)",
            rentalPricePlaceholder: "₹ / दिन",
            availableFromLabel: "से उपलब्ध",
            availableToLabel: "तक उपलब्ध",
            categories: {
                tractor: "ट्रैक्टर",
                rotavator: "रोटावेटर",
                seeder: "सीडर",
                harvester: "हार्वेस्टर"
            }
        }
    },
    mr: {
        navbar: {
            home: "मुख्य पृष्ठ",
            hire: "भाड्याने घ्या",
            rent: "किराये",
            aiRecommendation: "AI शिफारस",
            login: "लॉगिन"
        },
        home: {
            heroTitle: "कृषिसंधी",
            heroSubtitle: "भारतीय शेतकऱ्यांचे सक्षमीकरण. प्रगत कृषी अवजारे परवडणाऱ्या दरात भाड्याने घ्या.",
            rentNow: "भाड्याने घ्या",
            viewTools: "अवजारे पहा",
            communityTitle: "आमचा शेतकरी समुदाय",
            availableTools: "उपलब्ध अवजारे",
            bookNow: "आत्ताच बुक करा",
            footer: "© 2024 कृषिसंधी. कृषी सक्षमीकरण.",
            impact: {
                title: "शेतकऱ्यांचे मनोगत",
                quote1: "जय जवान, जय किसान",
                quote1Author: "- लाल बहादूर शास्त्री",
                quote2: "शेती हा मानवाचा सर्वात आरोग्यदायी, सर्वात उपयुक्त आणि सर्वात उदात्त व्यवसाय आहे.",
                quote2Author: "- जॉर्ज वॉशिंग्टन",
                slogan: "समृद्धीचे बीज पेरणे"
            }
        },
        login: {
            welcome: "स्वागत आहे",
            subtitle: "कृषी अवजारे भाड्याने घेण्यासाठी लॉगिन करा",
            mobileLabel: "मोबाईल नंबर *",
            otpPlaceholder: "ओटीपी टाका",
            getOtp: "ओटीपी मिळवा",
            verifyLogin: "पडताळणी करा आणि लॉगिन करा",
            noAccount: "खाते नाही?",
            registerLink: "येथे नोंदणी करा"
        },
        register: {
            title: "पंजीकरण",
            subtitle: "कृषिसंधी समुदायात सामील व्हा",
            fullNameLabel: "पूर्ण नाव *",
            fullNamePlaceholder: "तुमचे पूर्ण नाव प्रविष्ट करा",
            mobileLabel: "मोबाईल नंबर *",
            villageLabel: "गाव *",
            villagePlaceholder: "गावाचे नाव",
            districtLabel: "जिल्हा *",
            districtPlaceholder: "जिल्हा",
            landSizeLabel: "जमिनीचा आकार (एकर)",
            landSizePlaceholder: "उदा. 2.5",
            registerBtn: "आत्ताच नोंदणी करा",
            hasAccount: "आधीच खाते आहे?",
            loginLink: "येथे लॉगिन करा",
            successMessage: "नोंदणी यशस्वी:",
            errorMessage: "कृपया सर्व आवश्यक फील्ड योग्यरित्या भरा.",
            roleLabel: "मी एक आहे",
            farmer: "शेतकरी",
            owner: "उपकरण मालक",
            shopNameLabel: "दुकानाचे नाव (पर्यायी)",
            shopNamePlaceholder: "दुकानाचे नाव प्रविष्ट करा",
            emailLabel: "ईमेल (शिफारस केलेले)",
            emailPlaceholder: "example@mail.com",
            passwordLabel: "पासवर्ड",
            passwordPlaceholder: "मजबूत पासवर्ड तयार करा",
            confirmPasswordLabel: "पासवर्डची पुष्टी करा",
            confirmPasswordPlaceholder: "तुमचा पासवर्ड पुन्हा टाका",
            talukaLabel: "तालुका",
            talukaPlaceholder: "तालुका प्रविष्ट करा",
            stateLabel: "राज्य",
            statePlaceholder: "राज्य प्रविष्ट करा",
            pincodeLabel: "पिनकोड",
            pincodePlaceholder: "6-अंकी पिनकोड",
            toolDetailsTitle: "अवजारे तपशील",
            toolNameLabel: "अवजाराचे नाव",
            toolNamePlaceholder: "उदा. जॉन डीरे 5050D",
            toolCategoryLabel: "अवजारे श्रेणी",
            toolDescriptionLabel: "अवजारे वर्णन",
            toolDescriptionPlaceholder: "तुमच्या अवजाराचे थोडक्यात वर्णन करा",
            specificationsLabel: "तपशील",
            specificationsPlaceholder: "HP, मॉडेल, इंधन प्रकार इ.",
            rentalPriceLabel: "भाडे किंमत (प्रति दिवस)",
            rentalPricePlaceholder: "₹ / दिवस",
            availableFromLabel: "पासून उपलब्ध",
            availableToLabel: "पर्यंत उपलब्ध",
            categories: {
                tractor: "ट्रॅक्टर",
                rotavator: "रोटावेटर",
                seeder: "सीडर",
                harvester: "हार्वेस्टर"
            }
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('mr');

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
