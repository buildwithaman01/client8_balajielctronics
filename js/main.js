document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });

        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        }

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }

    // --- Dropdown Mobile Toggle ---
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-trigger');
    mobileDropdowns.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const content = trigger.nextElementSibling;
            content.classList.toggle('hidden');
            trigger.querySelector('i').classList.toggle('rotate-180');
        });
    });

    // --- Scroll Animations (IntersectionObserver) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});

// --- Generic Form Handler with Real Email Sending ---
window.handleFormSubmit = function (event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button');
    const originalText = btn.innerHTML;
    const originalClass = btn.className;

    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Loading State
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-not-allowed');

    // Send email using FormSubmit AJAX API
    const targetEmail = 'contact.balajielectronics@gmail.com'; // Use your actual email
    const submitUrl = `https://formsubmit.co/ajax/${targetEmail}`;

    // Add extra FormSubmit configurations
    // _subject: to create a nice subject line
    // _captcha: false to disable captcha for AJAX (optional, but often good for AJAX)
    // _template: 'table' (optional)
    const subject = `New Inquiry from ${data.firstName || data.company || 'Website'}`;

    // Convert FormData to JSON object for FormSubmit
    const jsonData = {
        _subject: subject,
        _captcha: "false", // Disable captcha for smoother AJAX if desired, or "true"
        _template: "table", // Nice table format
        ...data // Spread the form data
    };

    fetch(submitUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            // Success State
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Sent Successfully!';
            btn.classList.remove('bg-blue-600', 'bg-orange-600', 'hover:bg-blue-700', 'hover:bg-orange-700');
            btn.classList.add('bg-green-600');

            // Reset form after delay
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.className = originalClass;
                btn.disabled = false;
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error. Try Again.';
            btn.classList.add('bg-red-600');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.className = originalClass;
                btn.disabled = false;
            }, 3000);
        });
};


// --- Language Toggle Functionality ---
let currentLang = localStorage.getItem('language') || 'en';

// Expanded Translation Dictionary
const translations = {
    en: {
        // Navbar
        nav_home: "Home",
        nav_about: "About",
        nav_products: "Products",
        nav_services: "Services",
        nav_blog: "Blog",
        nav_contact: "Contact",
        nav_connect: "Connect",
        nav_call: "Call Now",
        nav_back_home: "Back to Home",
        lang_button: "हिंदी",

        // Footer Services
        service_motor: "Motor Rewinding",
        service_wiring: "House Wiring",
        service_appliance: "Appliance Repair",
        service_amc: "Industrial AMC",

        // Common
        footer_quick_links: "Quick Links",
        footer_services: "Services",
        footer_contact: "Contact",
        footer_desc: "Your complete electrical solutions partner. We combine traditional expertise with modern service.",

        // Home Page
        hero_title: "Powering Patna",
        hero_line1: "Complete",
        hero_line2: "Electrical Solutions",
        hero_subtitle: "Since 2012",
        hero_description: "Sales • Repairs • Installation • Custom Solutions. Whether it's a small motor rewinding or bulk wiring for your factory, we provide the best service in Bihar.",
        hero_cta: "Book Repair",
        stat_rating: "Google Rating",
        stat_genuine: "100% Genuine",

        // About Page
        about_title: "Our Story",
        about_subtitle: "Since 2012",
        about_desc: "From a small repair shop to Patna's most trusted electrical partner.",
        about_hero_title: "The Electronics Story",
        about_hero_quote: "\"Quality is not an act, it is a habit.\"",
        about_badge_est: "Established 2012",
        about_journey_title: "Our Journey",
        about_journey_p1: "Balaji Electronics began its journey in 2012 as a dedicated repair shop in Parsa, Bihar. Founded by Mr. Ashish Kumar Singh, the vision was clear from day one: to provide honest, high-quality electrical repairs without ever cutting corners.",
        about_journey_p2: "Over the last 12 years, that small shop has evolved into one of the region's most trusted independent service centers. Today, we specialize in industrial motors and home electrical solutions, bridging the gap between traditional technical expertise and modern service standards.",
        about_stat_years: "Years Excellence",
        about_stat_households: "Households Served",
        about_stat_businesses: "Local Businesses",
        about_stat_locations: "Locations",
        about_founder_title: "Meet the Founder",
        about_founder_role: "Founder & Visionary",
        about_founder_quote: "\"With over a decade of hands-on leadership, I've built Balaji Electronics on the pillars of integrity and precision. My deep understanding of electrical dynamics and commitment to customer satisfaction has been the driving force behind our expansion from Parsa to becoming a leading name in Patna.\"",
        about_choose_title: "Why Choose Balaji Electronics?",
        about_choose_desc: "We believe in a \"Customer First\" philosophy. Whether it is a complex industrial motor or a standard home appliance, we treat every project with the same level of strict quality control.",
        about_feat_honest_title: "Honest Diagnostics",
        about_feat_honest_desc: "No hidden costs or unnecessary repairs. We tell you exactly what's wrong.",
        about_feat_expert_title: "Proven Expertise",
        about_feat_expert_desc: "12+ years of specialized experience in both motors and appliances.",
        about_feat_scale_title: "Scalable Solutions",
        about_feat_scale_desc: "Serving both individual homes and large-scale industrial units effectively.",

        // Contact Page
        contact_title: "Get in Touch",
        contact_desc: "We are here to help you with all your electrical needs.",
        contact_hero_title: "Get Verified Repairs",
        contact_hero_desc: "Visit our workshop or book a home visit. We are open 6 days a week.",
        contact_address_title: "Balaji Electronics",
        contact_address_text: "Mantu singh market high school chowk, Parsa bazar, Parsa Mathura, Bihar 841219",
        contact_call_title: "Call Us",
        contact_call_subtitle: "Available 9 AM - 8 PM",
        contact_map_link: "Open in Google Maps",
        contact_form_title: "Send Message",
        label_first_name: "First Name",
        label_last_name: "Last Name",
        label_email: "Email Address",
        label_inquiry: "Inquiry Type",
        option_repair: "Repair Status",
        option_install: "New Installation",
        option_complaint: "Complaint",
        label_msg_help: "How can we help?",
        btn_send_msg: "Send Message",
        b2b_badge: "Contractors & Shops",
        b2b_title: "Join the Balaji Business Network",
        b2b_desc: "Are you a Small Shop Owner, Contractor, or Builder? We don't just fix machines; we power businesses. Get direct wholesale access to our entire product catalog.",
        b2b_who_title: "Who is this for?",
        b2b_who_1: "Small Shop Owners: Buy at distributor rates.",
        b2b_who_2: "Contractors: Priority supply for installation jobs.",
        b2b_who_3: "Builders: Direct procurement for sites.",
        b2b_benefit_1: "Direct Wholesale Discounts",
        b2b_benefit_2: "45-Day Credit Window",
        b2b_benefit_3: "Priority Breakdown Support",
        b2b_reg_title: "Partner Registration",
        b2b_reg_desc: "Instant verification via WhatsApp.",
        label_shop_name: "Shop / Business Name",
        label_mobile: "Mobile Number",
        label_profession: "Select Profession",
        option_owner: "Shop Owner",
        option_contractor: "Electrical Contractor",
        option_builder: "Builder / Developer",
        btn_wholesale: "Get Wholesale Access",

        // Services Page
        services_title: "Our Services",
        services_desc: "Expert solutions for industrial and domestic needs.",
        services_hero_title: "Professional Repair Solutions",
        services_hero_desc: "Expert motor rewinding, house wiring, and appliance repair in Patna. Fast, reliable, and affordable.",
        services_badge_popular: "Most Popular",
        service_motor_title: "Motor Rewinding Center",
        service_motor_desc: "Complete rewinding for single phase, three phase, and submersible motors using 100% copper wire. Includes thorough testing on dyno before delivery.",
        service_motor_feat1: "4-6 Hour Fast Turnaround",
        service_motor_feat2: "6-Month Comprehensive Warranty",
        service_motor_feat3: "Free Pickup & Delivery (10km)",
        service_motor_price: "From ₹450",
        service_appliance_title: "Appliance Repair Lab",
        service_appliance_desc: "Expert repair for mixer grinders, fans, induction cooktops, and other home appliances using only genuine spare parts.",
        service_appliance_feat1: "Same-Day Service Available",
        service_appliance_feat2: "90-Day Repair Warranty",
        service_appliance_feat3: "Genuine Spares Guarantee",
        service_appliance_price: "From ₹150",
        service_wiring_title: "House Wiring & Installation",
        service_wiring_desc: "Complete electrical wiring for new homes and renovations. Panel board installation, inverter setup, and safety auditing.",
        service_wiring_feat1: "Licensed Electricians",
        service_wiring_feat2: "BIS Standard Compliance",
        service_wiring_feat3: "Material Supply Support",
        btn_call_quote: "Call for Quote",
        btn_book_now: "Book Now",
        book_title: "Book a Service",
        book_desc: "Fill details below. We'll call back in 15 mins.",
        label_name: "Your Name",
        label_phone: "Phone Number",
        label_service: "Select Service Type",
        label_msg: "Describe the issue...",
        btn_submit: "Submit Request",
        area_title: "Serving Across Patna",
        area_kankarbagh: "Kankarbagh",
        area_boring_road: "Boring Road",
        area_rajendra_nagar: "Rajendra Nagar",
        area_patna_city: "Patna City",
        area_gandhi_maidan: "Gandhi Maidan",
        area_bailey_road: "Bailey Road",
        area_patliputra: "Patliputra",

        // Products Page
        products_title: "Shop Electrical Products",
        products_desc: "Genuine products from top brands like Polycab, Havells, and Crompton.",
        products_hero_badge: "Authorized Dealer Since 1995",
        products_hero_title: "500+ Genuine Electrical Products",
        products_hero_desc: "Authorized Dealer for India's Most Trusted Brands in Patna. Quality guaranteed for Industrial & Domestic needs.",
        products_search_placeholder: "Search for motors, fans, wires, tools...",
        products_sidebar_title: "Shop By Category",
        products_trust_1_title: "100% Genuine",
        products_trust_1_desc: "Authorized distributor for top industrial and home brands with official warranty.",
        products_trust_2_title: "Competitive Pricing",
        products_trust_2_desc: "Best industrial rates in Patna and wholesale prices for bulk orders.",
        products_trust_3_title: "Same Day Delivery",
        products_trust_3_desc: "Fast local delivery within Patna for orders placed before 2 PM.",
        products_trust_4_title: "Expert Guidance",
        products_trust_4_desc: "In-house electrical experts to help you choose the right specs.",
        modal_best_price: "Our Best Price",
        modal_buy_now: "Buy Now",
        modal_warranty: "Genuine Warranty",
        modal_delivery: "Fast Delivery",
        cat_industrial_machines: "Industrial Motors",
        cat_power_tools: "Power Tools",
        cat_home_appliances: "Home Appliances",
        cat_wiring_cables: "Wiring & Cables",
        cat_electronic_components: "Electronic Components",
        cat_all: "All Categories",
        btn_view_details: "View Details",
        nav_back_blog: "Back to Blog",
        label_sku: "SKU",

        // Blog CTA - General (Motor)
        blog_cta_title: "Need an Expert Opinion?",
        blog_cta_text: "We offer free motor inspection at our Patna Workshop.",
        btn_book_inspection: "Book Inspection",

        // Blog CTA - BLDC
        blog_cta_bldc_title: "Ready to Switch?",
        blog_cta_bldc_text: "We stock premium Atomberg, Crompton, and Havells BLDC fans.",
        btn_get_quote: "Get a Quote",

        // Blog CTA - Wire
        blog_cta_wire_title: "Planning a Renovation?",
        blog_cta_wire_text: "Get free consultation on total load calculation for your home.",
        btn_call_electrician: "Call Electrician",

        // Blog CTA - Tools
        blog_cta_tools_title: "Upgrade Your Toolkit",
        blog_cta_tools_text: "We sell Taparia and Bosch original tools at wholesale rates.",
        btn_buy_tools: "Buy Tools",

        // Blog CTA - Panel
        blog_cta_panel_title: "Need an AMC?",
        blog_cta_panel_text: "We offer Annual Maintenance Contracts for factories in Patna.",
        btn_request_amc: "Request AMC Quote",

        // Blog Page
        blog_title: "Latest Updates",
        blog_desc: "Tips, guides, and news from the electrical world.",
        blog_page_title: "Electrical Insights",
        blog_page_subtitle: "Tips, Guides, and Industry News for Patna's Community",
        blog_sidebar_cat: "Categories",
        blog_search_placeholder: "Search articles...",
        blog_newsletter_title: "Weekly Tips",
        blog_newsletter_text: "Join 2,000+ subscribers for electrical maintenance guides.",
        blog_newsletter_placeholder: "Your Email",
        btn_subscribe: "Subscribe",
        blog_no_results_title: "No articles found",
        blog_no_results_text: "Try searching for 'motor', 'wiring', or 'safety'.",
        btn_clear_filters: "Clear Filters",
        btn_read_article: "Read Article",
        cat_maintenance: "Maintenance",
        cat_energy_saving: "Energy Saving",
        cat_safety: "Safety",
        cat_tools: "Tools"
    },
    hi: {
        // Navbar
        nav_home: "होम",
        nav_about: "हमारे बारे में",
        nav_products: "उत्पाद",
        nav_services: "सेवाएं",
        nav_blog: "ब्लॉग",
        nav_contact: "संपर्क",
        nav_connect: "जुड़ें",
        nav_call: "कॉल करें",
        nav_back_home: "घर वापस जाएं",
        nav_back_blog: "ब्लॉग पर वापस जाएं",
        lang_button: "English",

        // Footer Services
        service_motor: "मोटर रिवाइंडिंग",
        service_wiring: "हाउस वायरिंग",
        service_appliance: "उपकरण मरम्मत",
        service_amc: "औद्योगिक ए.एम.सी.",

        // Common
        footer_quick_links: "महत्वपूर्ण लिंक",
        footer_services: "सेवाएं",
        footer_contact: "संपर्क करें",
        footer_desc: "आपका संपूर्ण विद्युत समाधान भागीदार। हम आधुनिक सेवा के साथ पारंपरिक विशेषज्ञता को जोड़ते हैं।",

        // Home Page
        hero_title: "पटना को शक्ति प्रदान",
        hero_line1: "सम्पूर्ण",
        hero_line2: "विद्युत समाधान",
        hero_subtitle: "2012 से",
        hero_description: "बिक्री • मरम्मत • स्थापना • कस्टम समाधान। छोटी मोटर रिवाइंडिंग हो या फैक्ट्री के लिए बल्क वायरिंग, हम बिहार में सर्वश्रेष्ठ सेवा प्रदान करते हैं।",
        hero_cta: "मरम्मत बुक करें",
        stat_rating: "गूगल रेटिंग",
        stat_genuine: "100% असली",

        // About Page
        about_title: "हमारी कहानी",
        about_subtitle: "2012 से",
        about_desc: "एक छोटी मरम्मत की दुकान से पटना के सबसे भरोसेमंद बिजली भागीदार तक।",
        about_hero_title: "इलेक्ट्रॉनिक्स की कहानी",
        about_hero_quote: "\"गुणवत्ता कोई कार्य नहीं, यह एक आदत है।\"",
        about_badge_est: "स्थापना 2012",
        about_journey_title: "हमारी यात्रा",
        about_journey_p1: "बालाजी इलेक्ट्रॉनिक्स ने 2012 में परसा, बिहार में एक समर्पित मरम्मत की दुकान के रूप में अपनी यात्रा शुरू की। श्री आशीष कुमार सिंह द्वारा स्थापित, पहले दिन से ही दृष्टिकोण स्पष्ट था: बिना किसी समझौते के ईमानदार, उच्च गुणवत्ता वाली विद्युत मरम्मत प्रदान करना।",
        about_journey_p2: "पिछले 12 वर्षों में, वह छोटी सी दुकान क्षेत्र के सबसे भरोसेमंद स्वतंत्र सेवा केंद्रों में से एक में विकसित हो गई है। आज, हम पारंपरिक तकनीकी विशेषज्ञता और आधुनिक सेवा मानकों के बीच की खाई को पाटते हुए, औद्योगिक मोटर्स और घरेलू विद्युत समाधानों के विशेषज्ञ हैं।",
        about_stat_years: "वर्षों की उत्कृष्टता",
        about_stat_households: "परिवारों की सेवा की",
        about_stat_businesses: "स्थानीय व्यवसाय",
        about_stat_locations: "स्थान",
        about_founder_title: "संस्थापक से मिलें",
        about_founder_role: "संस्थापक और दूरदर्शी",
        about_founder_quote: "\"एक दशक से अधिक के व्यावहारिक नेतृत्व के साथ, मैंने बालाजी इलेक्ट्रॉनिक्स को अखंडता और सटीकता के स्तंभों पर बनाया है। विद्युत गतिशीलता की मेरी गहरी समझ और ग्राहकों की संतुष्टि के प्रति प्रतिबद्धता परसा से विस्तार करके पटना में एक प्रमुख नाम बनने के पीछे की प्रेरक शक्ति रही है।\"",
        about_choose_title: "बालाजी इलेक्ट्रॉनिक्स क्यों चुनें?",
        about_choose_desc: "हम 'ग्राहक पहले' दर्शन में विश्वास करते हैं। चाहे वह एक जटिल औद्योगिक मोटर हो या एक मानक घरेलू उपकरण, हम हर परियोजना को समान स्तर के सख्त गुणवत्ता नियंत्रण के साथ मानते हैं।",
        about_feat_honest_title: "ईमानदार निदान",
        about_feat_honest_desc: "कोई छिपी हुई लागत या अनावश्यक मरम्मत नहीं। हम आपको ठीक-ठीक बताते हैं कि क्या गलत है।",
        about_feat_expert_title: "सिद्ध विशेषज्ञता",
        about_feat_expert_desc: "मोटर्स और उपकरणों दोनों में 12+ वर्षों का विशेष अनुभव।",
        about_feat_scale_title: "स्केलेबल समाधान",
        about_feat_scale_desc: "व्यक्तिगत घरों और बड़े पैमाने पर औद्योगिक इकाइयों दोनों की प्रभावी ढंग से सेवा करना।",

        // Contact Page
        contact_title: "संपर्क करें",
        contact_desc: "हम आपकी सभी विद्युत आवश्यकताओं में आपकी सहायता के लिए यहां हैं।",
        contact_hero_title: "सत्यापित मरम्मत प्राप्त करें",
        contact_hero_desc: "हमारी कार्यशाला पर जाएँ या होम विजिट बुक करें। हम सप्ताह में 6 दिन खुले रहते हैं।",
        contact_address_title: "बालाजी इलेक्ट्रॉनिक्स",
        contact_address_text: "मंटू सिंह मार्केट हाई स्कूल चौक, परसा बाजार, परसा मथुरा, बिहार 841219",
        contact_call_title: "हमें कॉल करें",
        contact_call_subtitle: "उपलब्ध सुबह 9 बजे - रात 8 बजे",
        contact_map_link: "गूगल मैप्स में खोलें",
        contact_form_title: "संदेश भेजें",
        label_first_name: "पहला नाम",
        label_last_name: "अंतिम नाम",
        label_email: "ईमेल पता",
        label_inquiry: "पूछताछ प्रकार",
        option_repair: "मरम्मत की स्थिति",
        option_install: "नई स्थापना",
        option_complaint: "शिकायत",
        label_msg_help: "हम कैसे मदद कर सकते हैं?",
        btn_send_msg: "संदेश भेजें",
        b2b_badge: "ठेकेदार और दुकानें",
        b2b_title: "बालाजी बिजनेस नेटवर्क से जुड़ें",
        b2b_desc: "क्या आप एक छोटे दुकानदार, ठेकेदार या बिल्डर हैं? हम केवल मशीनें ठीक नहीं करते; हम व्यवसायों को शक्ति प्रदान करते हैं। हमारे पूरे उत्पाद कैटलॉग तक सीधी थोक पहुँच प्राप्त करें।",
        b2b_who_title: "यह किसके लिए है?",
        b2b_who_1: "छोटे दुकानदार: वितरक दरों पर खरीदें।",
        b2b_who_2: "ठेकेदार: स्थापना कार्यों के लिए प्राथमिकता आपूर्ति।",
        b2b_who_3: "बिल्डर्स: साइटों के लिए सीधी खरीद।",
        b2b_benefit_1: "सीधे थोक छूट",
        b2b_benefit_2: "45-दिन क्रेडिट विंडो",
        b2b_benefit_3: "प्राथमिकता ब्रेकडाउन सहायता",
        b2b_reg_title: "भागीदार पंजीकरण",
        b2b_reg_desc: "व्हाट्सएप के माध्यम से तत्काल सत्यापन।",
        label_shop_name: "दुकान / व्यवसाय का नाम",
        label_mobile: "मोबाइल नंबर",
        label_profession: "व्यवसाय चुनें",
        option_owner: "दुकानदार",
        option_contractor: "विद्युत ठेकेदार",
        option_builder: "बिल्डर / डेवलपर",
        btn_wholesale: "थोक पहुंच प्राप्त करें",

        // Services Page
        services_title: "हमारी सेवाएं",
        services_desc: "औद्योगिक और घरेलू जरूरतों के लिए विशेषज्ञ समाधान।",
        services_hero_title: "पेशेवर मरम्मत समाधान",
        services_hero_desc: "पटना में विशेषज्ञ मोटर रिवाइंडिंग, हाउस वायरिंग और उपकरण मरम्मत। तेज़, विश्वसनीय और किफायती।",
        services_badge_popular: "सबसे लोकप्रिय",
        service_motor_title: "मोटर रिवाइंडिंग केंद्र",
        service_motor_desc: "100% तांबे के तार का उपयोग करके सिंगल फेज, थ्री फेज और सबमर्सिबल मोटर्स के लिए पूरी रिवाइंडिंग। डिलीवरी से पहले डायनो पर गहन परीक्षण शामिल है।",
        service_motor_feat1: "4-6 घंटे में वापसी",
        service_motor_feat2: "6 महीने की व्यापक वारंटी",
        service_motor_feat3: "फ्री पिकअप और डिलीवरी (10 किमी)",
        service_motor_price: "₹450 से शुरू",
        service_appliance_title: "उपकरण मरम्मत लैब",
        service_appliance_desc: "केवल असली स्पेयर पार्ट्स का उपयोग करके मिक्सर ग्राइंडर, पंखे, इंडक्शन कुकटॉप और अन्य घरेलू उपकरणों के लिए विशेषज्ञ मरम्मत।",
        service_appliance_feat1: "उसी दिन सेवा उपलब्ध",
        service_appliance_feat2: "90-दिन मरम्मत वारंटी",
        service_appliance_feat3: "असली पुर्जो की गारंटी",
        service_appliance_price: "₹150 से शुरू",
        service_wiring_title: "हाउस वायरिंग और स्थापना",
        service_wiring_desc: "नए घरों और नवीकरण के लिए पूर्ण विद्युत वायरिंग। पैनल बोर्ड स्थापना, इन्वर्टर सेटअप और सुरक्षा ऑडिटिंग।",
        service_wiring_feat1: "लाइसेंस प्राप्त इलेक्ट्रीशियन",
        service_wiring_feat2: "BIS मानक अनुपालन",
        service_wiring_feat3: "सामग्री आपूर्ति सहायता",
        btn_call_quote: "कोट के लिए कॉल करें",
        btn_book_now: "अभी बुक करें",
        book_title: "सेवा बुक करें",
        book_desc: "नीचे विवरण भरें। हम 15 मिनट में वापस कॉल करेंगे।",
        label_name: "आपका नाम",
        label_phone: "फ़ोन नंबर",
        label_service: "सेवा प्रकार चुनें",
        label_msg: "समस्या का वर्णन करें...",
        btn_submit: "अनुरोध जमा करें",
        area_title: "पूरे पटना में सेवा",
        area_kankarbagh: "कंकड़बाग",
        area_boring_road: "बोरिंग रोड",
        area_rajendra_nagar: "राजेंद्र नगर",
        area_patna_city: "पटना सिटी",
        area_gandhi_maidan: "गांधी मैदान",
        area_bailey_road: "बेली रोड",
        area_patliputra: "पाटलिपुत्र",

        // Products Page
        products_title: "विद्युत उत्पाद खरीदें",
        products_desc: "पॉलीकैब, हैवल्स और क्रॉम्पटन जैसे शीर्ष ब्रांडों के असली उत्पाद।",
        products_hero_badge: "1995 से अधिकृत डीलर",
        products_hero_title: "500+ असली विद्युत उत्पाद",
        products_hero_desc: "पटना में भारत के सबसे भरोसेमंद ब्रांडों का अधिकृत डीलर। औद्योगिक और घरेलू जरूरतों के लिए गुणवत्ता की गारंटी।",
        products_search_placeholder: "मोटर, पंखे, तार, उपकरण खोजें...",
        products_sidebar_title: "श्रेणी के अनुसार खरीदारी करें",
        products_trust_1_title: "100% असली",
        products_trust_1_desc: "आधिकारिक वारंटी के साथ शीर्ष औद्योगिक और घरेलू ब्रांडों के लिए अधिकृत वितरक।",
        products_trust_2_title: "प्रतिस्पर्धी मूल्य निर्धारण",
        products_trust_2_desc: "थोक ऑर्डर के लिए पटना में सर्वोत्तम औद्योगिक दरें और थोक मूल्य।",
        products_trust_3_title: "उसी दिन डिलीवरी",
        products_trust_3_desc: "दोपहर 2 बजे से पहले दिए गए ऑर्डर के लिए पटना के भीतर तेज स्थानीय डिलीवरी।",
        products_trust_4_title: "विशेषज्ञ मार्गदर्शन",
        products_trust_4_desc: "सही विनिर्देशों को चुनने में आपकी सहायता के लिए इन-हाउस विद्युत विशेषज्ञ।",
        modal_best_price: "हमारी सबसे अच्छी कीमत",
        modal_buy_now: "अभी खरीदें",
        modal_warranty: "असली वारंटी",
        modal_delivery: "तेज़ डिलीवरी",
        cat_industrial_machines: "औद्योगिक मोटर्स",
        cat_power_tools: "पावर टूल्स",
        cat_home_appliances: "घरेलू उपकरण",
        cat_wiring_cables: "वायरिंग और केबल्स",
        cat_electronic_components: "इलेक्ट्रॉनिक घटक",
        cat_all: "सभी श्रेणियाँ",
        btn_view_details: "विवरण देखें",
        label_sku: "SKU",

        // Blog Page
        blog_title: "नवीनतम अपडेट",
        blog_desc: "विद्युत दुनिया से सुझाव, गाइड और समाचार।",
        blog_page_title: "विद्युत अंतर्दृष्टि",
        blog_page_subtitle: "पटना समुदाय के लिए सुझाव, गाइड और उद्योग समाचार",
        blog_sidebar_cat: "श्रेणियाँ",
        blog_search_placeholder: "लेख खोजें...",
        blog_newsletter_title: "साप्ताहिक सुझाव",
        blog_newsletter_text: "विद्युत रखरखाव गाइड के लिए 2,000+ ग्राहकों से जुड़ें।",
        blog_newsletter_placeholder: "आपका ईमेल",
        btn_subscribe: "सदस्यता लें",
        blog_no_results_title: "कोई लेख नहीं मिला",
        blog_no_results_text: "'मोटर', 'वायरिंग' या 'सुरक्षा' खोजने का प्रयास करें।",
        btn_clear_filters: "फिल्टर हटाएँ",
        btn_read_article: "लेख पढ़ें",
        cat_maintenance: "रखरखाव",
        cat_energy_saving: "ऊर्जा बचत",
        cat_safety: "सुरक्षा",
        cat_tools: "उपकरण",

        // Blog CTA - General (Motor)
        blog_cta_title: "विशेषज्ञ की राय चाहिए?",
        blog_cta_text: "हम अपने पटना वर्कशॉप में मुफ्त मोटर निरीक्षण प्रदान करते हैं।",
        btn_book_inspection: "निरीक्षण बुक करें",

        // Blog CTA - BLDC
        blog_cta_bldc_title: "स्विच करने के लिए तैयार हैं?",
        blog_cta_bldc_text: "हम प्रीमियम एटमबर्ग, क्रॉम्पटन और हैवल्स बीएलडीसी पंखे स्टॉक करते हैं।",
        btn_get_quote: "कोट प्राप्त करें",

        // Blog CTA - Wire
        blog_cta_wire_title: "नवीनीकरण की योजना बना रहे हैं?",
        blog_cta_wire_text: "अपने घर के लिए कुल लोड गणना पर मुफ्त परामर्श प्राप्त करें।",
        btn_call_electrician: "इलेक्ट्रीशियन को कॉल करें",

        // Blog CTA - Tools
        blog_cta_tools_title: "अपनी टूलकिट अपडेट करें",
        blog_cta_tools_text: "हम थोक दरों पर टपारिया और बॉश के मूल उपकरण बेचते हैं।",
        btn_buy_tools: "उपकरण खरीदें",

        // Blog CTA - Panel
        blog_cta_panel_title: "AMC चाहिए?",
        blog_cta_panel_text: "हम पटना में कारखानों के लिए वार्षिक रखरखाव अनुबंध प्रदान करते हैं।",
        btn_request_amc: "AMC कोट का अनुरोध करें"
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    localStorage.setItem('language', currentLang);
    applyLanguage();
}

function applyLanguage() {
    // 1. Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            // Check if element is an input with placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });

    // 2. Update specific button text if it exists (legacy support or specific ID)
    // 2. Update specific button text if it exists (legacy support or specific ID)
    document.querySelectorAll('.lang-text, #lang-text').forEach(el => {
        el.textContent = translations[currentLang].lang_button;
    });

    // 3. Show notification
    showLangNotification();

    // 4. Update html lang attribute
    document.documentElement.lang = currentLang;

    console.log(`Language switched to: ${currentLang}`);
}

function showLangNotification() {
    // Remove existing notification if any
    const existing = document.querySelector('.lang-toast');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'lang-toast fixed top-24 right-6 z-[2000] bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in pointer-events-none';
    notification.innerHTML = `<i class="fas fa-language"></i> ${currentLang === 'hi' ? 'हिंदी में बदला गया' : 'Changed to English'}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage();

    // Attach click handler to any element with class="lang-toggle-btn" or id="lang-toggle-btn"
    const toggleBtns = document.querySelectorAll('.lang-toggle-btn, #lang-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLanguage();
        });
    });
});


// --- B2B WhatsApp Workflow ---
window.handlePartnerRegistration = function (event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button');
    const originalText = btn.innerHTML;

    // Loading State
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    btn.disabled = true;

    // Get Data
    const formData = new FormData(form);
    const name = formData.get('name');
    const shopName = formData.get('shop_name');
    const profession = formData.get('profession');
    const mobile = formData.get('mobile');

    // Construct WhatsApp Message
    const message = `*New B2B Partner Request*%0A%0A*Name:* ${name}%0A*Business:* ${shopName}%0A*Type:* ${profession}%0A*Mobile:* ${mobile}%0A%0AI am interested in joining the Balaji Business Network for wholesale access.`;

    const whatsappUrl = `https://wa.me/918347588525?text=${message}`;

    // Redirect after slight delay for UX
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');

        // Reset Button
        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
    }, 1000);

    return false;
};

// Mobile Filter Toggle (Products Page)
document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filter-toggle-btn');
    const filterContent = document.getElementById('filter-content');
    const filterIcon = document.getElementById('filter-icon');

    if (filterBtn && filterContent) {
        filterBtn.addEventListener('click', () => {
            filterContent.classList.toggle('hidden');
            if (filterIcon) {
                filterIcon.classList.toggle('rotate-180');
            }
        });
    }
});
