// Greeting Data
const greetings = [
  // English
  { template: "Hello {name}!", language: "English", translation: "Hello {name}!" },
  { template: "Hi there, {name}!", language: "English", translation: "Hi there, {name}!" },
  { template: "Welcome back, {name}!", language: "English", translation: "Welcome back, {name}!" },
  { template: "Good to see you, {name}!", language: "English", translation: "Good to see you, {name}!" },
  { template: "Hey {name}, let's get things done!", language: "English", translation: "Hey {name}, let's get things done!" },
  { template: "Ready to be productive, {name}?", language: "English", translation: "Ready to be productive, {name}?" },
  
  // Spanish
  { template: "¡Hola {name}!", language: "Spanish", translation: "Hello {name}!" },
  { template: "¡Bienvenide {name}!", language: "Spanish", translation: "Welcome {name}!" },
  { template: "¡Qué tal, {name}!", language: "Spanish", translation: "How's it going, {name}!" },
  { template: "¡Hola {name}, a trabajar!", language: "Spanish", translation: "Hello {name}, let's work!" },
  { template: "¡Buenos días, {name}!", language: "Spanish", translation: "Good morning, {name}!" },
  
  // French
  { template: "Bonjour {name}!", language: "French", translation: "Hello {name}!" },
  { template: "Salut {name}!", language: "French", translation: "Hi {name}!" },
  { template: "Bienvenue {name}!", language: "French", translation: "Welcome {name}!" },
  { template: "Bonjour {name}, au travail!", language: "French", translation: "Hello {name}, let's work!" },
  { template: "Coucou {name}!", language: "French", translation: "Hey {name}!" },
  
  // German
  { template: "Hallo {name}!", language: "German", translation: "Hello {name}!" },
  { template: "Guten Tag, {name}!", language: "German", translation: "Good day, {name}!" },
  { template: "Willkommen {name}!", language: "German", translation: "Welcome {name}!" },
  { template: "Hi {name}, lass uns loslegen!", language: "German", translation: "Hi {name}, let's get started!" },
  { template: "Moin {name}!", language: "German", translation: "Hi {name}!" },
  
  // Italian
  { template: "Ciao {name}!", language: "Italian", translation: "Hello {name}!" },
  { template: "Buongiorno {name}!", language: "Italian", translation: "Good morning {name}!" },
  { template: "Benvenute {name}!", language: "Italian", translation: "Welcome {name}!" },
  { template: "Ciao {name}, al lavoro!", language: "Italian", translation: "Hello {name}, let's work!" },
  { template: "Salve {name}!", language: "Italian", translation: "Greetings {name}!" },
  
  // Portuguese
  { template: "Olá {name}!", language: "Portuguese", translation: "Hello {name}!" },
  { template: "Oi {name}!", language: "Portuguese", translation: "Hi {name}!" },
  { template: "Bem-vindo {name}!", language: "Portuguese", translation: "Welcome {name}!" },
  { template: "E aí {name}!", language: "Portuguese", translation: "What's up {name}!" },
  { template: "Olá {name}, vamos trabalhar!", language: "Portuguese", translation: "Hello {name}, let's work!" },
  
  // Dutch
  { template: "Hallo {name}!", language: "Dutch", translation: "Hello {name}!" },
  { template: "Hoi {name}!", language: "Dutch", translation: "Hi {name}!" },
  { template: "Welkom {name}!", language: "Dutch", translation: "Welcome {name}!" },
  { template: "Dag {name}!", language: "Dutch", translation: "Hello {name}!" },
  { template: "Hé {name}, aan de slag!", language: "Dutch", translation: "Hey {name}, let's get to work!" },
  
  // Japanese
  { template: "こんにちは {name}さん!", language: "Japanese", translation: "Hello {name}!" },
  { template: "{name}さん、おはよう!", language: "Japanese", translation: "Good morning, {name}!" },
  { template: "やあ {name}さん!", language: "Japanese", translation: "Hey {name}!" },
  { template: "{name}さん、頑張って!", language: "Japanese", translation: "{name}, good luck!" },
  
  // Korean
  { template: "안녕하세요 {name}님!", language: "Korean", translation: "Hello {name}!" },
  { template: "안녕 {name}!", language: "Korean", translation: "Hi {name}!" },
  { template: "{name}님, 화이팅!", language: "Korean", translation: "{name}, fighting!" },
  { template: "반가워요 {name}님!", language: "Korean", translation: "Nice to meet you, {name}!" },
  
  // Russian
  { template: "Привет {name}!", language: "Russian", translation: "Hello {name}!" },
  { template: "Здравствуй {name}!", language: "Russian", translation: "Greetings {name}!" },
  { template: "Добро пожаловать {name}!", language: "Russian", translation: "Welcome {name}!" },
  { template: "Привет {name}, за работу!", language: "Russian", translation: "Hello {name}, let's work!" },
  
  // Chinese
  { template: "你好 {name}!", language: "Chinese", translation: "Hello {name}!" },
  { template: "{name}，你好!", language: "Chinese", translation: "{name}, hello!" },
  { template: "嗨 {name}!", language: "Chinese", translation: "Hi {name}!" },
  { template: "{name}，加油!", language: "Chinese", translation: "{name}, keep it up!" },
  
  // Arabic
  { template: "مرحبا {name}!", language: "Arabic", translation: "Hello {name}!" },
  { template: "أهلا {name}!", language: "Arabic", translation: "Welcome {name}!" },
  { template: "أهلا وسهلا {name}!", language: "Arabic", translation: "Welcome {name}!" },
  
  // Hindi
  { template: "नमस्ते {name}!", language: "Hindi", translation: "Hello {name}!" },
  { template: "हैलो {name}!", language: "Hindi", translation: "Hello {name}!" },
  { template: "{name}, आइए काम करते हैं!", language: "Hindi", translation: "{name}, let's work!" },
  
  // Swedish
  { template: "Hej {name}!", language: "Swedish", translation: "Hello {name}!" },
  { template: "Välkommen {name}!", language: "Swedish", translation: "Welcome {name}!" },
  { template: "Tjena {name}!", language: "Swedish", translation: "Hi {name}!" },
  
  // Norwegian
  { template: "Hei {name}!", language: "Norwegian", translation: "Hello {name}!" },
  { template: "Hallo {name}!", language: "Norwegian", translation: "Hello {name}!" },
  { template: "Velkommen {name}!", language: "Norwegian", translation: "Welcome {name}!" },
  
  // Finnish
  { template: "Hei {name}!", language: "Finnish", translation: "Hello {name}!" },
  { template: "Moi {name}!", language: "Finnish", translation: "Hi {name}!" },
  { template: "Tervetuloa {name}!", language: "Finnish", translation: "Welcome {name}!" },
  { template: "Hyvää päivää {name}!", language: "Finnish", translation: "Good day {name}!" },
  
  // Greek
  { template: "Γεια σου {name}!", language: "Greek", translation: "Hello {name}!" },
  { template: "Καλημέρα {name}!", language: "Greek", translation: "Good morning {name}!" },
  
  // Polish
  { template: "Cześć {name}!", language: "Polish", translation: "Hello {name}!" },
  { template: "Witaj {name}!", language: "Polish", translation: "Welcome {name}!" },
  { template: "Dzień dobry {name}!", language: "Polish", translation: "Good day {name}!" },
  
  // Turkish
  { template: "Merhaba {name}!", language: "Turkish", translation: "Hello {name}!" },
  { template: "Selam {name}!", language: "Turkish", translation: "Hi {name}!" },
  { template: "Hoş geldin {name}!", language: "Turkish", translation: "Welcome {name}!" },
  
  // Hebrew
  { template: "שלום {name}!", language: "Hebrew", translation: "Hello {name}!" },
  { template: "היי {name}!", language: "Hebrew", translation: "Hi {name}!" },
  
  // Vietnamese
  { template: "Xin chào {name}!", language: "Vietnamese", translation: "Hello {name}!" },
  { template: "Chào {name}!", language: "Vietnamese", translation: "Hi {name}!" },
  
  // Thai
  { template: "สวัสดี {name}!", language: "Thai", translation: "Hello {name}!" },
  { template: "หวัดดี {name}!", language: "Thai", translation: "Hi {name}!" },
  
  // Czech
  { template: "Ahoj {name}!", language: "Czech", translation: "Hello {name}!" },
  { template: "Dobrý den {name}!", language: "Czech", translation: "Good day {name}!" },
  { template: "Nazdar {name}!", language: "Czech", translation: "Hi {name}!" },
  { template: "Vítej {name}!", language: "Czech", translation: "Welcome {name}!" },
  
  // Hungarian
  { template: "Szia {name}!", language: "Hungarian", translation: "Hi {name}!" },
  { template: "Jó napot {name}!", language: "Hungarian", translation: "Good day {name}!" },
  { template: "Üdvözöl {name}!", language: "Hungarian", translation: "Welcome {name}!" },
  { template: "Szervusz {name}!", language: "Hungarian", translation: "Hello {name}!" },
  
  // Romanian
  { template: "Salut {name}!", language: "Romanian", translation: "Hi {name}!" },
  { template: "Bună ziua {name}!", language: "Romanian", translation: "Good day {name}!" },
  { template: "Bună {name}!", language: "Romanian", translation: "Hello {name}!" },
  { template: "Bine ai venit {name}!", language: "Romanian", translation: "Welcome {name}!" },
  
  // Bulgarian
  { template: "Здравей {name}!", language: "Bulgarian", translation: "Hello {name}!" },
  { template: "Добро утро {name}!", language: "Bulgarian", translation: "Good morning {name}!" },
  { template: "Добре дошъл {name}!", language: "Bulgarian", translation: "Welcome {name}!" },
  
  // Croatian
  { template: "Bok {name}!", language: "Croatian", translation: "Hi {name}!" },
  { template: "Dobar dan {name}!", language: "Croatian", translation: "Good day {name}!" },
  { template: "Dobrodošla/dobrodošao {name}!", language: "Croatian", translation: "Welcome {name}!" },
  { template: "Pozdrav {name}!", language: "Croatian", translation: "Greetings {name}!" },
  
  // Serbian
  { template: "Здраво {name}!", language: "Serbian", translation: "Hello {name}!" },
  { template: "Добар дан {name}!", language: "Serbian", translation: "Good day {name}!" },
  { template: "Добродошла/добродошао {name}!", language: "Serbian", translation: "Welcome {name}!" },
  
  // Slovak
  { template: "Ahoj {name}!", language: "Slovak", translation: "Hello {name}!" },
  { template: "Dobrý deň {name}!", language: "Slovak", translation: "Good day {name}!" },
  { template: "Vitaj {name}!", language: "Slovak", translation: "Welcome {name}!" },
  
  // Slovenian
  { template: "Živjo {name}!", language: "Slovenian", translation: "Hello {name}!" },
  { template: "Dober dan {name}!", language: "Slovenian", translation: "Good day {name}!" },
  { template: "Dobrodošla/dobrodošel {name}!", language: "Slovenian", translation: "Welcome {name}!" },
  
  // Lithuanian
  { template: "Labas {name}!", language: "Lithuanian", translation: "Hello {name}!" },
  { template: "Sveiki {name}!", language: "Lithuanian", translation: "Hello {name}!" },
  { template: "Sveiki atvykę {name}!", language: "Lithuanian", translation: "Welcome {name}!" },
  
  // Latvian
  { template: "Sveiki {name}!", language: "Latvian", translation: "Hello {name}!" },
  { template: "Labdien {name}!", language: "Latvian", translation: "Good day {name}!" },
  { template: "Laipni lūdzam {name}!", language: "Latvian", translation: "Welcome {name}!" },
  
  // Estonian
  { template: "Tere {name}!", language: "Estonian", translation: "Hello {name}!" },
  { template: "Tere päevast {name}!", language: "Estonian", translation: "Good day {name}!" },
  { template: "Tere tulemast {name}!", language: "Estonian", translation: "Welcome {name}!" },
  
  // Ukrainian
  { template: "Привіт {name}!", language: "Ukrainian", translation: "Hello {name}!" },
  { template: "Добрий день {name}!", language: "Ukrainian", translation: "Good day {name}!" },
  { template: "Ласкаво просимо {name}!", language: "Ukrainian", translation: "Welcome {name}!" },
  
  // Belarusian
  { template: "Прывітанне {name}!", language: "Belarusian", translation: "Hello {name}!" },
  { template: "Добры дзень {name}!", language: "Belarusian", translation: "Good day {name}!" },
  
  // Macedonian
  { template: "Здраво {name}!", language: "Macedonian", translation: "Hello {name}!" },
  { template: "Добар ден {name}!", language: "Macedonian", translation: "Good day {name}!" },
  { template: "Добредојди {name}!", language: "Macedonian", translation: "Welcome {name}!" },
  
  // Albanian
  { template: "Përshëndetje {name}!", language: "Albanian", translation: "Hello {name}!" },
  { template: "Mirëdita {name}!", language: "Albanian", translation: "Good day {name}!" },
  { template: "Mirë se vini {name}!", language: "Albanian", translation: "Welcome {name}!" },
  
  // Maltese
  { template: "Bonġu {name}!", language: "Maltese", translation: "Hello {name}!" },
  { template: "Merħba {name}!", language: "Maltese", translation: "Welcome {name}!" },
  
  // Icelandic
  { template: "Halló {name}!", language: "Icelandic", translation: "Hello {name}!" },
  { template: "Góðan dag {name}!", language: "Icelandic", translation: "Good day {name}!" },
  { template: "Velkomin {name}!", language: "Icelandic", translation: "Welcome {name}!" },
  
  // Welsh
  { template: "Helo {name}!", language: "Welsh", translation: "Hello {name}!" },
  { template: "Prynhawn da {name}!", language: "Welsh", translation: "Good afternoon {name}!" },
  { template: "Croeso {name}!", language: "Welsh", translation: "Welcome {name}!" },
  
  // Irish
  { template: "Dia dhuit {name}!", language: "Irish", translation: "Hello {name}!" },
  { template: "Fáilte {name}!", language: "Irish", translation: "Welcome {name}!" },
  { template: "Conas atá tú {name}?", language: "Irish", translation: "How are you {name}?" },
  
  // Basque
  { template: "Kaixo {name}!", language: "Basque", translation: "Hello {name}!" },
  { template: "Egun on {name}!", language: "Basque", translation: "Good day {name}!" },
  { template: "Ongi etorri {name}!", language: "Basque", translation: "Welcome {name}!" },
  
  // Catalan
  { template: "Hola {name}!", language: "Catalan", translation: "Hello {name}!" },
  { template: "Bon dia {name}!", language: "Catalan", translation: "Good day {name}!" },
  { template: "Benvingut {name}!", language: "Catalan", translation: "Welcome {name}!" },
  
  // Indonesian
  { template: "Halo {name}!", language: "Indonesian", translation: "Hello {name}!" },
  { template: "Selamat datang {name}!", language: "Indonesian", translation: "Welcome {name}!" },
  { template: "Hai {name}!", language: "Indonesian", translation: "Hi {name}!" },
  
  // Malay
  { template: "Hai {name}!", language: "Malay", translation: "Hi {name}!" },
  { template: "Selamat datang {name}!", language: "Malay", translation: "Welcome {name}!" },
  { template: "Apa khabar {name}?", language: "Malay", translation: "How are you {name}?" },
  
  // Tagalog
  { template: "Kamusta {name}!", language: "Tagalog", translation: "Hello {name}!" },
  { template: "Maligayang pagdating {name}!", language: "Tagalog", translation: "Welcome {name}!" },
  { template: "Kumusta ka {name}?", language: "Tagalog", translation: "How are you {name}?" },
  
  // Swahili
  { template: "Hujambo {name}!", language: "Swahili", translation: "Hello {name}!" },
  { template: "Karibu {name}!", language: "Swahili", translation: "Welcome {name}!" },
  { template: "Habari {name}?", language: "Swahili", translation: "How are you {name}?" },
  
  // Amharic
  { template: "ሰላም {name}!", language: "Amharic", translation: "Hello {name}!" },
  { template: "እንዴት ነህ {name}?", language: "Amharic", translation: "How are you {name}?" },
  
  // Zulu
  { template: "Sawubona {name}!", language: "Zulu", translation: "Hello {name}!" },
  { template: "Siyakwamukela {name}!", language: "Zulu", translation: "We welcome you {name}!" },
  
  // Afrikaans
  { template: "Hallo {name}!", language: "Afrikaans", translation: "Hello {name}!" },
  { template: "Welkom {name}!", language: "Afrikaans", translation: "Welcome {name}!" },
  { template: "Goeie dag {name}!", language: "Afrikaans", translation: "Good day {name}!" },
  
  // Bengali
  { template: "হ্যালো {name}!", language: "Bengali", translation: "Hello {name}!" },
  { template: "স্বাগতম {name}!", language: "Bengali", translation: "Welcome {name}!" },
  { template: "নমস্কার {name}!", language: "Bengali", translation: "Greetings {name}!" },
  
  // Urdu
  { template: "السلام علیکم {name}!", language: "Urdu", translation: "Peace be upon you {name}!" },
  { template: "ہیلو {name}!", language: "Urdu", translation: "Hello {name}!" },
  { template: "خوش آمدید {name}!", language: "Urdu", translation: "Welcome {name}!" },
  
  // Persian
  { template: "سلام {name}!", language: "Persian", translation: "Hello {name}!" },
  { template: "خوش آمدید {name}!", language: "Persian", translation: "Welcome {name}!" },
  { template: "درود {name}!", language: "Persian", translation: "Greetings {name}!" },
  
  // Tamil
  { template: "வணக்கம் {name}!", language: "Tamil", translation: "Hello {name}!" },
  { template: "வரவேற்கிறேன் {name}!", language: "Tamil", translation: "Welcome {name}!" },
  { template: "வணக்கம் {name}, எப்படி இருக்கிறீர்கள்?", language: "Tamil", translation: "Hello {name}, how are you?" },
  
  // Telugu
  { template: "హలో {name}!", language: "Telugu", translation: "Hello {name}!" },
  { template: "స్వాగతం {name}!", language: "Telugu", translation: "Welcome {name}!" },
  { template: "నమస్కారం {name}!", language: "Telugu", translation: "Greetings {name}!" },
  
  // Gujarati
  { template: "નમસ્તે {name}!", language: "Gujarati", translation: "Hello {name}!" },
  { template: "સ્વાગત છે {name}!", language: "Gujarati", translation: "Welcome {name}!" },
  { template: "હેલો {name}!", language: "Gujarati", translation: "Hello {name}!" },
  
  // Punjabi
  { template: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ {name}!", language: "Punjabi", translation: "Hello {name}!" },
  { template: "ਜੀ ਆਇਆਂ ਨੂੰ {name}!", language: "Punjabi", translation: "Welcome {name}!" },
  { template: "ਨਮਸਤੇ {name}!", language: "Punjabi", translation: "Hello {name}!" },
  
  // Marathi
  { template: "नमस्कार {name}!", language: "Marathi", translation: "Hello {name}!" },
  { template: "स्वागत आहे {name}!", language: "Marathi", translation: "Welcome {name}!" },
  { template: "हॅलो {name}!", language: "Marathi", translation: "Hello {name}!" },
  
  // Kannada
  { template: "ನಮಸ್ಕಾರ {name}!", language: "Kannada", translation: "Hello {name}!" },
  { template: "ಸ್ವಾಗತ {name}!", language: "Kannada", translation: "Welcome {name}!" },
  { template: "ಹಲೋ {name}!", language: "Kannada", translation: "Hello {name}!" },
  
  // Malayalam
  { template: "നമസ്കാരം {name}!", language: "Malayalam", translation: "Hello {name}!" },
  { template: "സ്വാഗതം {name}!", language: "Malayalam", translation: "Welcome {name}!" },
  { template: "ഹലോ {name}!", language: "Malayalam", translation: "Hello {name}!" },
  
  // Nepali
  { template: "नमस्कार {name}!", language: "Nepali", translation: "Hello {name}!" },
  { template: "स्वागत छ {name}!", language: "Nepali", translation: "Welcome {name}!" },
  { template: "कस्तो छ {name}?", language: "Nepali", translation: "How are you {name}?" },
  
  // Sinhala
  { template: "ආයුබෝවන් {name}!", language: "Sinhala", translation: "Hello {name}!" },
  { template: "ස්වාගතයි {name}!", language: "Sinhala", translation: "Welcome {name}!" },
  
  // Burmese
  { template: "မင်္ဂလာပါ {name}!", language: "Burmese", translation: "Hello {name}!" },
  { template: "ကြိုဆိုပါတယ် {name}!", language: "Burmese", translation: "Welcome {name}!" },
  
  // Khmer
  { template: "សួស្តី {name}!", language: "Khmer", translation: "Hello {name}!" },
  { template: "សូមស្វាគមន៍ {name}!", language: "Khmer", translation: "Welcome {name}!" },
  
  // Lao
  { template: "ສະບາຍດີ {name}!", language: "Lao", translation: "Hello {name}!" },
  { template: "ຍິນດີຕ້ອນຮັບ {name}!", language: "Lao", translation: "Welcome {name}!" },
  
  // Mongolian
  { template: "Сайн байна уу {name}!", language: "Mongolian", translation: "Hello {name}!" },
  { template: "Тавтай морилно уу {name}!", language: "Mongolian", translation: "Welcome {name}!" },
  
  // Georgian
  { template: "გამარჯობა {name}!", language: "Georgian", translation: "Hello {name}!" },
  { template: "კეთილი იყოს თქვენი მობრძანება {name}!", language: "Georgian", translation: "Welcome {name}!" },
  
  // Armenian
  { template: "Բարև {name}!", language: "Armenian", translation: "Hello {name}!" },
  { template: "Բարի գալուստ {name}!", language: "Armenian", translation: "Welcome {name}!" },
  
  // Kazakh
  { template: "Сәлеметсіз бе {name}!", language: "Kazakh", translation: "Hello {name}!" },
  { template: "Қош келдіңіз {name}!", language: "Kazakh", translation: "Welcome {name}!" },
  
  // Uzbek
  { template: "Assalomu alaykum {name}!", language: "Uzbek", translation: "Peace be upon you {name}!" },
  { template: "Xush kelibsiz {name}!", language: "Uzbek", translation: "Welcome {name}!" },
  { template: "Salom {name}!", language: "Uzbek", translation: "Hello {name}!" },
  
  // Kyrgyz
  { template: "Салам {name}!", language: "Kyrgyz", translation: "Hello {name}!" },
  { template: "Кош келиңиз {name}!", language: "Kyrgyz", translation: "Welcome {name}!" },
  
  // Tajik
  { template: "Salam {name}!", language: "Tajik", translation: "Hello {name}!" },
  { template: "Хуш омадед {name}!", language: "Tajik", translation: "Welcome {name}!" },
  
  // Turkmen
  { template: "Salam {name}!", language: "Turkmen", translation: "Hello {name}!" },
  { template: "Hoş geldiňiz {name}!", language: "Turkmen", translation: "Welcome {name}!" },
  
  // Azerbaijani
  { template: "Salam {name}!", language: "Azerbaijani", translation: "Hello {name}!" },
  { template: "Xoş gəlmisiniz {name}!", language: "Azerbaijani", translation: "Welcome {name}!" },
  
  // Hausa
  { template: "Sannu {name}!", language: "Hausa", translation: "Hello {name}!" },
  { template: "Barka da zuwa {name}!", language: "Hausa", translation: "Welcome {name}!" },
  
  // Yoruba
  { template: "Bawo {name}!", language: "Yoruba", translation: "Hello {name}!" },
  { template: "Kaabo {name}!", language: "Yoruba", translation: "Welcome {name}!" },
  { template: "Pele {name}!", language: "Yoruba", translation: "Hello {name}!" },
  
  // Igbo
  { template: "Ndewo {name}!", language: "Igbo", translation: "Hello {name}!" },
  { template: "Nnọọ {name}!", language: "Igbo", translation: "Welcome {name}!" },
  
  // Somali
  { template: "Salaan {name}!", language: "Somali", translation: "Hello {name}!" },
  { template: "Soo dhawoow {name}!", language: "Somali", translation: "Welcome {name}!" },
  
  // Xhosa
  { template: "Molo {name}!", language: "Xhosa", translation: "Hello {name}!" },
  { template: "Wamkelekile {name}!", language: "Xhosa", translation: "Welcome {name}!" },
  
  // Tswana
  { template: "Dumela {name}!", language: "Tswana", translation: "Hello {name}!" },
  { template: "O amogelwe {name}!", language: "Tswana", translation: "Welcome {name}!" },
  
  // Shona
  { template: "Mhoro {name}!", language: "Shona", translation: "Hello {name}!" },
  { template: "Mauya {name}!", language: "Shona", translation: "Welcome {name}!" },
  
  // Malagasy
  { template: "Salama {name}!", language: "Malagasy", translation: "Hello {name}!" },
  { template: "Tonga soa {name}!", language: "Malagasy", translation: "Welcome {name}!" },
  
  // Quechua
  { template: "Napaykullayki {name}!", language: "Quechua", translation: "Hello {name}!" },
  { template: "Allin hamusqayki {name}!", language: "Quechua", translation: "Welcome {name}!" },
  
  // Guarani
  { template: "Mba'éichapa {name}!", language: "Guarani", translation: "Hello {name}!" },
  { template: "Tereg̃uahẽporãite {name}!", language: "Guarani", translation: "Welcome {name}!" },
  
  // Nahuatl
  { template: "Niltze {name}!", language: "Nahuatl", translation: "Hello {name}!" },
  { template: "Ximopanolti {name}!", language: "Nahuatl", translation: "Welcome {name}!" },
  
  // Esperanto
  { template: "Saluton {name}!", language: "Esperanto", translation: "Hello {name}!" },
  { template: "Bonvenon {name}!", language: "Esperanto", translation: "Welcome {name}!" },
  { template: "Saluton {name}, kiel vi fartas?", language: "Esperanto", translation: "Hello {name}, how are you?" },
  
  // Javanese
  { template: "Sugeng enjing {name}!", language: "Javanese", translation: "Good morning {name}!" },
  { template: "Wilujeng sumping {name}!", language: "Javanese", translation: "Welcome {name}!" },
  { template: "Halo {name}!", language: "Javanese", translation: "Hello {name}!" },
  
  // Sundanese
  { template: "Wilujeng enjing {name}!", language: "Sundanese", translation: "Good morning {name}!" },
  { template: "Wilujeng sumping {name}!", language: "Sundanese", translation: "Welcome {name}!" },
  { template: "Kumaha damang {name}?", language: "Sundanese", translation: "How are you {name}?" },
  
  // Cebuano
  { template: "Maayong buntag {name}!", language: "Cebuano", translation: "Good morning {name}!" },
  { template: "Maligayang pag-abot {name}!", language: "Cebuano", translation: "Welcome {name}!" },
  { template: "Kumusta {name}?", language: "Cebuano", translation: "How are you {name}?" },
  
  // Hiligaynon
  { template: "Maayong aga {name}!", language: "Hiligaynon", translation: "Good morning {name}!" },
  { template: "Maligayang pag-abot {name}!", language: "Hiligaynon", translation: "Welcome {name}!" },
  { template: "Kamusta {name}?", language: "Hiligaynon", translation: "How are you {name}?" },
  
  // Ilocano
  { template: "Naimbag a bigat {name}!", language: "Ilocano", translation: "Good morning {name}!" },
  { template: "Naragsak nga isasangpet {name}!", language: "Ilocano", translation: "Welcome {name}!" },
  { template: "Kumusta {name}?", language: "Ilocano", translation: "How are you {name}?" },
  
  // Bikol
  { template: "Maupay nga aga {name}!", language: "Waray", translation: "Good morning {name}!" },
  { template: "Maupay nga pag-abot {name}!", language: "Waray", translation: "Welcome {name}!" },
  
  // Waray
  { template: "བཀྲ་ཤིས་བདེ་ལེགས་ {name}!", language: "Tibetan", translation: "Hello {name}!" },
  { template: "ཕེབས་སྐྱེལ་ {name}!", language: "Tibetan", translation: "Welcome {name}!" },
  
  // Dzongkha
  { template: "ཀུ་ཟུ་ཟང་པོ་ལ་ {name}!", language: "Dzongkha", translation: "Hello {name}!" },
  { template: "ལེགས་སོ་ {name}!", language: "Dzongkha", translation: "Welcome {name}!" },
  
  // Odia
  { template: "ନମସ୍କାର {name}!", language: "Odia", translation: "Hello {name}!" },
  { template: "ଆପଣଙ୍କୁ ସ୍ୱାଗତ {name}!", language: "Odia", translation: "Welcome {name}!" },
  { template: "କେମିତି ଅଛନ୍ତି {name}?", language: "Odia", translation: "How are you {name}?" },
  
  // Assamese
  { template: "নমস্কাৰ {name}!", language: "Assamese", translation: "Hello {name}!" },
  { template: "স্বাগতম {name}!", language: "Assamese", translation: "Welcome {name}!" },
  { template: "কেনে আছে {name}?", language: "Assamese", translation: "How are you {name}?" },
  
  // Manipuri
  { template: "ꯈꯨꯔꯨꯝꯖꯔꯤ {name}!", language: "Manipuri", translation: "Hello {name}!" },
  { template: "ꯇꯔꯥꯡ ꯈꯨꯔꯨꯝꯖꯔꯤ {name}!", language: "Manipuri", translation: "Welcome {name}!" },
  
  // Bodo
  { template: "Adaab {name}!", language: "Bodo", translation: "Hello {name}!" },
  { template: "Joahar {name}!", language: "Bodo", translation: "Welcome {name}!" },
  
  // Santali
  { template: "ᱡᱚᱦᱟᱨ {name}!", language: "Santali", translation: "Hello {name}!" },
  { template: "ᱥᱟᱨᱦᱟᱣ {name}!", language: "Santali", translation: "Welcome {name}!" },
  
  // Konkani
  { template: "नमस्कार {name}!", language: "Konkani", translation: "Hello {name}!" },
  { template: "स्वागत {name}!", language: "Konkani", translation: "Welcome {name}!" },
  
  // Kashmiri
  { template: "آداب {name}!", language: "Kashmiri", translation: "Hello {name}!" },
  { template: "خوش آمدید {name}!", language: "Kashmiri", translation: "Welcome {name}!" },
  
  // Sindhi
  { template: "آداب {name}!", language: "Sindhi", translation: "Hello {name}!" },
  { template: "خوش آمدید {name}!", language: "Sindhi", translation: "Welcome {name}!" },
  
  // Pashto
  { template: "سلام وروره {name}!", language: "Pashto", translation: "Hello brother {name}!" },
  { template: "ښه راغلاست {name}!", language: "Pashto", translation: "Welcome {name}!" },
  
  // Balochi
  { template: "سلام {name}!", language: "Balochi", translation: "Hello {name}!" },
  { template: "خوش آمدید {name}!", language: "Balochi", translation: "Welcome {name}!" },
  
  // Kurdish
  { template: "Silav {name}!", language: "Kurdish", translation: "Hello {name}!" },
  { template: "Bi xêr hatî {name}!", language: "Kurdish", translation: "Welcome {name}!" },
  { template: "Çawa yî {name}?", language: "Kurdish", translation: "How are you {name}?" },
  
  // Yiddish
  { template: "שלום עליכם {name}!", language: "Yiddish", translation: "Peace be upon you {name}!" },
  { template: "ברוכים הבאים {name}!", language: "Yiddish", translation: "Welcome {name}!" },
  { template: "וואס מאכסטו {name}?", language: "Yiddish", translation: "How are you {name}?" },
  
  // Ladino
  { template: "Shalom {name}!", language: "Ladino", translation: "Hello {name}!" },
  { template: "Bien venido {name}!", language: "Ladino", translation: "Welcome {name}!" },
  
  // Aramaic
  { template: "ܫܠܡܐ {name}!", language: "Aramaic", translation: "Hello {name}!" },
  { template: "ܒܪܝܟ ܗܘܐ {name}!", language: "Aramaic", translation: "Welcome {name}!" },
  
  // Coptic
  { template: "Ⲭⲉⲣⲉ {name}!", language: "Coptic", translation: "Hello {name}!" },
  { template: "Ⲙⲁⲣⲟⲩ {name}!", language: "Coptic", translation: "Welcome {name}!" },
  
  // Tigrinya
  { template: "ሰላም ነህ {name}!", language: "Amharic", translation: "Hello {name}!" },
  { template: "እንዴት ነህ {name}?", language: "Amharic", translation: "How are you {name}?" },
  
  { template: "ሰላም {name}!", language: "Tigrinya", translation: "Hello {name}!" },
  { template: "ብሩኽ መጻእካ {name}!", language: "Tigrinya", translation: "Welcome {name}!" },
  { template: "ከመይ ኣለካ {name}?", language: "Tigrinya", translation: "How are you {name}?" },
  
  // Oromo
  { template: "Akkam {name}!", language: "Oromo", translation: "Hello {name}!" },
  { template: "Baga nagaan dhufte {name}!", language: "Oromo", translation: "Welcome {name}!" },
  { template: "Akkam jirta {name}?", language: "Oromo", translation: "How are you {name}?" },
  
  // Wolof
  { template: "As-salaam aleikum {name}!", language: "Wolof", translation: "Peace be upon you {name}!" },
  { template: "Dalal ak jamm {name}!", language: "Wolof", translation: "Welcome {name}!" },
  { template: "Na nga def {name}?", language: "Wolof", translation: "How are you {name}?" },
  
  // Fulani
  { template: "Jam walli {name}!", language: "Fulani", translation: "Hello {name}!" },
  { template: "Jam tan {name}!", language: "Fulani", translation: "Welcome {name}!" },
  { template: "No mbadda {name}?", language: "Fulani", translation: "How are you {name}?" },
  
  // Mandinka
  { template: "I be di {name}!", language: "Mandinka", translation: "Hello {name}!" },
  { template: "Bisimila {name}!", language: "Mandinka", translation: "Welcome {name}!" },
  
  // Bambara
  { template: "I ni ce {name}!", language: "Bambara", translation: "Hello {name}!" },
  { template: "I ni tile {name}!", language: "Bambara", translation: "Welcome {name}!" },
  { template: "I ka kene wa {name}?", language: "Bambara", translation: "How are you {name}?" },
  
  // Twi
  { template: "Wo ho te sɛn {name}?", language: "Twi", translation: "How are you {name}?" },
  { template: "Akwaaba {name}!", language: "Twi", translation: "Welcome {name}!" },
  { template: "Maakye {name}!", language: "Twi", translation: "Good morning {name}!" },
  
  // Ewe
  { template: "Woezɔ {name}!", language: "Ewe", translation: "Hello {name}!" },
  { template: "Wɔ dzo {name}!", language: "Ewe", translation: "Welcome {name}!" },
  { template: "Efɔ̃a {name}?", language: "Ewe", translation: "How are you {name}?" },
  
  // Ga
  { template: "Bawo {name}!", language: "Ga", translation: "Hello {name}!" },
  { template: "Akɔɔbɔ {name}!", language: "Ga", translation: "Welcome {name}!" },
  
  // Lingala
  { template: "Mbote {name}!", language: "Lingala", translation: "Hello {name}!" },
  { template: "Boyei malamu {name}!", language: "Lingala", translation: "Welcome {name}!" },
  { template: "Ozali malamu {name}?", language: "Lingala", translation: "How are you {name}?" },
  
  // Kikongo
  { template: "Mbote {name}!", language: "Kikongo", translation: "Hello {name}!" },
  { template: "Tusonama {name}!", language: "Kikongo", translation: "Welcome {name}!" },
  
  // Kinyarwanda
  { template: "Muraho {name}!", language: "Kinyarwanda", translation: "Hello {name}!" },
  { template: "Murakaza neza {name}!", language: "Kinyarwanda", translation: "Welcome {name}!" },
  { template: "Amakuru {name}?", language: "Kinyarwanda", translation: "How are you {name}?" },
  
  // Kirundi
  { template: "Amahoro {name}!", language: "Kirundi", translation: "Hello {name}!" },
  { template: "Murakaza neza {name}!", language: "Kirundi", translation: "Welcome {name}!" },
  { template: "Amakuru {name}?", language: "Kirundi", translation: "How are you {name}?" },
  
  // Luganda
  { template: "Oli otya {name}!", language: "Luganda", translation: "Hello {name}!" },
  { template: "Tusanyuse okulaba {name}!", language: "Luganda", translation: "Welcome {name}!" },
  { template: "Oli otya {name}?", language: "Luganda", translation: "How are you {name}?" },
  
  // Chichewa
  { template: "Muli bwanji {name}!", language: "Chichewa", translation: "Hello {name}!" },
  { template: "Takulandirani {name}!", language: "Chichewa", translation: "Welcome {name}!" },
  { template: "Muli bwanji {name}?", language: "Chichewa", translation: "How are you {name}?" },
  
  // Sesotho
  { template: "Lumela {name}!", language: "Sesotho", translation: "Hello {name}!" },
  { template: "Rea u amohela {name}!", language: "Sesotho", translation: "Welcome {name}!" },
  { template: "U phela joang {name}?", language: "Sesotho", translation: "How are you {name}?" },
  
  // Venda
  { template: "Ndaa {name}!", language: "Venda", translation: "Hello {name}!" },
  { template: "Ri a u tanganedza {name}!", language: "Venda", translation: "Welcome {name}!" },
  { template: "Vho vha hani {name}?", language: "Venda", translation: "How are you {name}?" },
  
  // Tsonga
  { template: "Avuxeni {name}!", language: "Tsonga", translation: "Hello {name}!" },
  { template: "Hi ku amukela {name}!", language: "Tsonga", translation: "Welcome {name}!" },
  { template: "Ku njhani {name}?", language: "Tsonga", translation: "How are you {name}?" },
  
  // Ndebele
  { template: "Sawubona {name}!", language: "Ndebele", translation: "Hello {name}!" },
  { template: "Siyakwemukela {name}!", language: "Ndebele", translation: "Welcome {name}!" },
  { template: "Unjani {name}?", language: "Ndebele", translation: "How are you {name}?" },
  
  // Maori
  { template: "Kia ora {name}!", language: "Maori", translation: "Hello {name}!" },
  { template: "Nau mai {name}!", language: "Maori", translation: "Welcome {name}!" },
  { template: "Kei te pēhea koe {name}?", language: "Maori", translation: "How are you {name}?" },
  
  // Hawaiian
  { template: "Aloha {name}!", language: "Hawaiian", translation: "Hello {name}!" },
  { template: "E komo mai {name}!", language: "Hawaiian", translation: "Welcome {name}!" },
  { template: "Pehea ʻoe {name}?", language: "Hawaiian", translation: "How are you {name}?" },
  
  // Samoan
  { template: "Talofa {name}!", language: "Samoan", translation: "Hello {name}!" },
  { template: "Afio mai {name}!", language: "Samoan", translation: "Welcome {name}!" },
  { template: "O a mai oe {name}?", language: "Samoan", translation: "How are you {name}?" },
  
  // Tongan
  { template: "Mālō e lelei {name}!", language: "Tongan", translation: "Hello {name}!" },
  { template: "Talitali fiefia {name}!", language: "Tongan", translation: "Welcome {name}!" },
  { template: "Fēfē hake {name}?", language: "Tongan", translation: "How are you {name}?" },
  
  // Fijian
  { template: "Bula {name}!", language: "Fijian", translation: "Hello {name}!" },
  { template: "Bula vinaka {name}!", language: "Fijian", translation: "Welcome {name}!" },
  { template: "O cei tiko {name}?", language: "Fijian", translation: "How are you {name}?" },
  
  // Chamorro
  { template: "Håfa adai {name}!", language: "Chamorro", translation: "Hello {name}!" },
  { template: "Mañelu {name}!", language: "Chamorro", translation: "Welcome {name}!" },
  { template: "Håfa tatatmanu hao {name}?", language: "Chamorro", translation: "How are you {name}?" }
];

const defaultTitles = [
  "Your Todo-List :)",
  "Get Things Done!",
  "Today's Tasks",
  "What's on your mind?",
  "Let's be productive!",
  "Your Daily Planner",
  "Task Master",
  "Things to Accomplish"
];

// Greeting Functions
export const getPersonalizedGreeting = (name) => {
  if (!name) return "Let's get started!";
  
  const allGreetings = [...greetings, ...accessibilityGreetings];
  const randomIndex = Math.floor(Math.random() * allGreetings.length);
  const greeting = allGreetings[randomIndex];
  return greeting.template.replace('{name}', name.trim());
};

export const getRandomTitle = () => {
  const randomIndex = Math.floor(Math.random() * defaultTitles.length);
  return defaultTitles[randomIndex];
};

export const getRandomGreetingExcluding = (name, currentGreeting) => {
  if (!name || name.trim() === '') {
    return getRandomTitle();
  }
  
  const availableGreetings = greetings.filter(greeting => 
    greeting.template.replace('{name}', name.trim()) !== currentGreeting
  );
  
  if (availableGreetings.length === 0) return getPersonalizedGreeting(name);
  
  const randomIndex = Math.floor(Math.random() * availableGreetings.length);
  return availableGreetings[randomIndex].template.replace('{name}', name.trim());
};

export const parseGreeting = (fullGreeting, name) => {
  if (!name || name.trim() === '' || !fullGreeting.includes(name)) {
    return { parts: [{ text: fullGreeting, isName: false }] };
  }
  
  const parts = [];
  const nameIndex = fullGreeting.indexOf(name);
  
  if (nameIndex > 0) {
    parts.push({ text: fullGreeting.substring(0, nameIndex), isName: false });
  }
  
  parts.push({ text: name, isName: true });
  
  const afterNameIndex = nameIndex + name.length;
  if (afterNameIndex < fullGreeting.length) {
    parts.push({ text: fullGreeting.substring(afterNameIndex), isName: false });
  }
  
  return { parts };
};

export const getGreetingInfo = (fullGreeting, name) => {
  if (!name || name.trim() === '' || !fullGreeting.includes(name)) {
    return { language: 'English', translation: fullGreeting };
  }
  
  const allGreetings = [...greetings, ...accessibilityGreetings];
  
  const matchingGreeting = allGreetings.find(greeting => 
    greeting.template.replace('{name}', name.trim()) === fullGreeting
  );
  
  if (matchingGreeting) {
    return { 
      language: matchingGreeting.language, 
      translation: matchingGreeting.translation.replace('{name}', name.trim())
    };
  }
  
  return { language: 'English', translation: fullGreeting };
};

export const getGreetingLanguage = (fullGreeting, name) => {
  return getGreetingInfo(fullGreeting, name).language;
};

const accessibilityGreetings = [];

export default { getPersonalizedGreeting, getRandomTitle, getRandomGreetingExcluding, parseGreeting, getGreetingLanguage, getGreetingInfo }; 