<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shicomp - Solusi Manajemen Modern</title>
    
    <!-- Fonts: Plus Jakarta Sans for a modern, geometric, premium feel -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Icons: Phosphor Icons (Cleaner than FontAwesome for UI) -->
    <script src="https://unpkg.com/@phosphor-icons/web"></script>

    <!-- Tailwind Configuration -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            DEFAULT: '#fa8c0f',
                            50: '#fff8ed',
                            100: '#ffefd6',
                            500: '#fa8c0f',
                            600: '#e07b00', // Darker for hover
                        },
                        gray: {
                            850: '#1f2937',
                            900: '#111827',
                        }
                    },
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                    },
                    boxShadow: {
                        'soft': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
                        'glow': '0 0 20px rgba(250, 140, 15, 0.3)',
                    }
                }
            }
        }
    </script>

    <style>
        /* Custom Utilities */
        .glass-panel {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .hero-pattern {
            background-image: radial-gradient(#fa8c0f 0.5px, transparent 0.5px), radial-gradient(#fa8c0f 0.5px, #ffffff 0.5px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
            opacity: 0.03;
        }

        /* Hide scrollbar for clean horizontal scroll if needed */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="font-sans text-gray-600 bg-white antialiased selection:bg-brand-100 selection:text-brand-600">

    <!-- Navbar -->
    <nav class="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-100" id="navbar">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                    <div class="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white">
                        <i class="ph-bold ph-asterisk-simple text-xl"></i>
                    </div>
                    <span class="font-bold text-xl text-gray-900 tracking-tight">Shicomp</span>
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:flex space-x-8 items-center">
                    <a href="#features" class="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">Fitur</a>
                    <a href="#benefits" class="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">Solusi</a>
                    <a href="#pricing" class="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">Harga</a>
                    <a href="#testimonials" class="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">Testimoni</a>
                </div>

                <!-- Desktop CTA -->
                <div class="hidden md:flex items-center space-x-4">
                    <a href="#" class="text-sm font-medium text-gray-900 hover:text-brand-500 transition-colors">Masuk</a>
                    <a href="#" class="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-2.5 px-5 rounded-full shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-0.5">
                        Mulai Gratis
                    </a>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-btn" class="text-gray-600 hover:text-brand-500 focus:outline-none">
                        <i class="ph ph-list text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Panel -->
        <div id="mobile-menu" class="hidden md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-soft p-6 flex flex-col space-y-4">
            <a href="#features" class="block text-base font-medium text-gray-700 hover:text-brand-500">Fitur</a>
            <a href="#benefits" class="block text-base font-medium text-gray-700 hover:text-brand-500">Solusi</a>
            <a href="#pricing" class="block text-base font-medium text-gray-700 hover:text-brand-500">Harga</a>
            <hr class="border-gray-100">
            <a href="#" class="block text-base font-medium text-gray-900">Masuk</a>
            <a href="#" class="block w-full text-center bg-brand-500 text-white font-semibold py-3 rounded-xl shadow-md">
                Mulai Gratis
            </a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div class="absolute inset-0 hero-pattern z-0"></div>
        <!-- Gradient Blob Background -->
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-50 z-0"></div>
        <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-50 z-0"></div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <!-- Text Content -->
                <div class="text-center lg:text-left">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs font-semibold mb-6 uppercase tracking-wider">
                        <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                        Bersedia menerima project baru
                    </div>
                    <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-6">
                        Kendalikan Bisnis Anda dengan <span class="text-brand-500">Presisi.</span>
                    </h1>
                    <p class="text-lg text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Platform manajemen modern yang menyatukan seluruh alur kerja tim Anda dalam satu dashboard yang elegan, cepat, dan intuitif.
                    </p>
                    <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <a href="#" class="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-full shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1 text-center">
                            Mulai Trial 14 Hari
                        </a>
                        <a href="#" class="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 hover:border-brand-200 text-gray-700 hover:text-brand-600 font-semibold rounded-full transition-all text-center flex items-center justify-center gap-2 group">
                            <i class="ph-fill ph-play-circle text-xl text-gray-400 group-hover:text-brand-500 transition-colors"></i>
                            Lihat Demo
                        </a>
                    </div>
                    <p class="mt-6 text-sm text-gray-400">
                        <i class="ph-fill ph-check-circle text-brand-500 mr-1"></i> Tanpa kartu kredit
                        <span class="mx-2">•</span>
                        <i class="ph-fill ph-check-circle text-brand-500 mr-1"></i> Batal kapan saja
                    </p>
                </div>

                <!-- Dashboard Mockup (CSS Composition for speed & luxury feel) -->
                <div class="relative perspective-1000 group">
                    <!-- Glow effect behind -->
                    <div class="absolute inset-0 bg-gradient-to-tr from-brand-500 to-purple-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                    
                    <!-- Main Dashboard Card -->
                    <div class="relative bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden transform transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1">
                        <!-- Top Bar -->
                        <div class="h-10 border-b border-gray-100 flex items-center px-4 gap-2 bg-gray-50/50">
                            <div class="w-3 h-3 rounded-full bg-red-400"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div class="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <!-- UI Body -->
                        <div class="p-6 grid grid-cols-3 gap-6">
                            <!-- Sidebar Placeholder -->
                            <div class="col-span-1 space-y-3 hidden sm:block">
                                <div class="h-8 w-24 bg-gray-100 rounded-lg"></div>
                                <div class="h-4 w-full bg-gray-50 rounded mt-6"></div>
                                <div class="h-4 w-3/4 bg-gray-50 rounded"></div>
                                <div class="h-4 w-5/6 bg-gray-50 rounded"></div>
                            </div>
                            <!-- Main Chart Area -->
                            <div class="col-span-3 sm:col-span-2 space-y-4">
                                <div class="flex justify-between items-end">
                                    <div class="space-y-2">
                                        <div class="h-4 w-32 bg-gray-100 rounded"></div>
                                        <div class="h-8 w-48 bg-gray-800 rounded"></div>
                                    </div>
                                    <div class="h-8 w-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-500">
                                        <i class="ph-bold ph-trend-up"></i>
                                    </div>
                                </div>
                                <!-- Abstract Chart -->
                                <div class="h-40 w-full bg-gradient-to-t from-gray-50 to-white border border-gray-100 rounded-xl relative overflow-hidden flex items-end justify-between px-4 pb-0 pt-8 gap-2">
                                    <div class="w-full bg-brand-100 rounded-t-sm h-[40%]"></div>
                                    <div class="w-full bg-brand-200 rounded-t-sm h-[70%]"></div>
                                    <div class="w-full bg-brand-500 rounded-t-sm h-[50%] shadow-lg shadow-brand-500/20"></div>
                                    <div class="w-full bg-brand-200 rounded-t-sm h-[80%]"></div>
                                    <div class="w-full bg-brand-100 rounded-t-sm h-[60%]"></div>
                                </div>
                                <div class="grid grid-cols-2 gap-4 mt-4">
                                    <div class="h-20 bg-gray-50 rounded-xl border border-gray-100"></div>
                                    <div class="h-20 bg-gray-50 rounded-xl border border-gray-100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Floating Badge -->
                    <div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-4 animate-bounce-slow hidden md:flex">
                        <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <i class="ph-fill ph-chart-line-up text-xl"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 uppercase font-semibold">Growth</p>
                            <p class="text-lg font-bold text-gray-900">+128%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Trusted By -->
    <section class="py-10 border-y border-gray-50 bg-gray-50/50">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <p class="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Dipercaya oleh 500+ Perusahaan Modern</p>
            <div class="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                <!-- Simple SVG Logos placeholders -->
                <div class="h-8 flex items-center text-xl font-bold text-gray-800"><i class="ph-fill ph-google-logo mr-2"></i>Alphacorp</div>
                <div class="h-8 flex items-center text-xl font-bold text-gray-800"><i class="ph-fill ph-spotify-logo mr-2"></i>Streamline</div>
                <div class="h-8 flex items-center text-xl font-bold text-gray-800"><i class="ph-fill ph-slack-logo mr-2"></i>Connect</div>
                <div class="h-8 flex items-center text-xl font-bold text-gray-800"><i class="ph-fill ph-dropbox-logo mr-2"></i>BoxCloud</div>
                <div class="h-8 flex items-center text-xl font-bold text-gray-800"><i class="ph-fill ph-microsoft-logo mr-2"></i>MicroSys</div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 lg:py-28 bg-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Fitur Premium untuk <br class="hidden md:block">Workflow Profesional</h2>
                <p class="text-gray-500 text-lg">Kami mendesain setiap piksel untuk membantu Anda bekerja lebih cerdas, bukan lebih keras.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                    <div class="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 mb-6 group-hover:scale-110 transition-transform">
                        <i class="ph-fill ph-lightning text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Real-time Analytics</h3>
                    <p class="text-gray-500 leading-relaxed">Pantau performa bisnis Anda detik demi detik dengan visualisasi data yang memukau dan akurat.</p>
                </div>

                <!-- Feature 2 -->
                <div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                    <div class="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 mb-6 group-hover:scale-110 transition-transform">
                        <i class="ph-fill ph-users-three text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Kolaborasi Tim</h3>
                    <p class="text-gray-500 leading-relaxed">Space kerja terintegrasi untuk tim Anda. Berbagi file, chat, dan tugas dalam satu ekosistem.</p>
                </div>

                <!-- Feature 3 -->
                <div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                    <div class="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 mb-6 group-hover:scale-110 transition-transform">
                        <i class="ph-fill ph-shield-check text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Keamanan Enterprise</h3>
                    <p class="text-gray-500 leading-relaxed">Enkripsi tingkat bank untuk melindungi data sensitif perusahaan Anda. Aman dan terpercaya.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section (Alternating) -->
    <section id="benefits" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
            
            <!-- Item 1 -->
            <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div class="lg:w-1/2 order-2 lg:order-1">
                    <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-2">
                         <!-- Abstract UI Visual -->
                        <div class="aspect-video bg-gray-100 rounded-xl relative overflow-hidden group">
                             <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 bg-white rounded-lg shadow-lg p-4 transition-all duration-500 group-hover:scale-105">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">AI</div>
                                    <div class="h-2 w-20 bg-gray-200 rounded"></div>
                                </div>
                                <div class="space-y-2">
                                    <div class="h-2 w-full bg-gray-100 rounded"></div>
                                    <div class="h-2 w-5/6 bg-gray-100 rounded"></div>
                                </div>
                                <div class="mt-4 flex gap-2">
                                    <div class="h-6 w-16 bg-brand-50 rounded"></div>
                                    <div class="h-6 w-16 bg-gray-50 rounded"></div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
                <div class="lg:w-1/2 order-1 lg:order-2">
                    <div class="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-6">
                        <span class="font-bold">01</span>
                    </div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Otomatisasi Laporan Cerdas</h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-6">
                        Lupakan spreadsheet manual yang membosankan. Sistem kami mengumpulkan, menganalisis, dan menyajikan data dalam format yang siap presentasi hanya dalam satu klik.
                    </p>
                    <ul class="space-y-3">
                        <li class="flex items-center text-gray-700">
                            <i class="ph-bold ph-check text-brand-500 mr-3"></i> Hemat 20+ jam per minggu
                        </li>
                        <li class="flex items-center text-gray-700">
                            <i class="ph-bold ph-check text-brand-500 mr-3"></i> Export ke PDF & Excel instan
                        </li>
                        <li class="flex items-center text-gray-700">
                            <i class="ph-bold ph-check text-brand-500 mr-3"></i> Jadwal kirim otomatis ke email
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Item 2 -->
            <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div class="lg:w-1/2">
                    <div class="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-6">
                        <span class="font-bold">02</span>
                    </div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Kontrol Keuangan Terpusat</h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-6">
                        Visibilitas penuh terhadap arus kas, pengeluaran, dan profitabilitas proyek. Buat keputusan strategis berdasarkan data finansial yang real-time.
                    </p>
                    <button class="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-2 group">
                        Pelajari Fitur Keuangan <i class="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
                <div class="lg:w-1/2">
                     <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-2">
                        <!-- Abstract UI Visual 2 -->
                        <div class="aspect-video bg-gray-800 rounded-xl relative overflow-hidden flex items-center justify-center">
                            <div class="text-center">
                                <p class="text-gray-400 text-sm mb-1">Total Revenue</p>
                                <p class="text-3xl font-bold text-white mb-4">$124,500.00</p>
                                <div class="flex gap-1 justify-center items-end h-12">
                                    <div class="w-2 bg-brand-600 h-4 rounded-t"></div>
                                    <div class="w-2 bg-brand-600 h-6 rounded-t"></div>
                                    <div class="w-2 bg-brand-500 h-8 rounded-t"></div>
                                    <div class="w-2 bg-brand-500 h-12 rounded-t"></div>
                                    <div class="w-2 bg-white h-10 rounded-t"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
             <div class="absolute top-40 left-10 w-72 h-72 bg-brand-50 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Investasi Cerdas untuk Bisnis</h2>
                <p class="text-gray-500">Pilih paket yang sesuai dengan skala perusahaan Anda. Transparan, tanpa biaya tersembunyi.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                
                <!-- Starter -->
                <div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Starter</h3>
                    <div class="flex items-baseline mb-6">
                        <span class="text-4xl font-bold text-gray-900">$29</span>
                        <span class="text-gray-500 ml-2">/bulan</span>
                    </div>
                    <p class="text-sm text-gray-500 mb-8">Untuk freelancer dan startup kecil.</p>
                    <a href="#" class="block w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold rounded-xl text-center transition-colors">
                        Mulai Sekarang
                    </a>
                    <div class="mt-8 space-y-4">
                        <div class="flex items-center text-sm text-gray-600"><i class="ph-fill ph-check text-brand-500 mr-3"></i> 3 User Active</div>
                        <div class="flex items-center text-sm text-gray-600"><i class="ph-fill ph-check text-brand-500 mr-3"></i> Basic Analytics</div>
                        <div class="flex items-center text-sm text-gray-600"><i class="ph-fill ph-check text-brand-500 mr-3"></i> 5GB Storage</div>
                    </div>
                </div>

                <!-- Pro (Featured) -->
                <div class="p-8 rounded-2xl bg-white border-2 border-brand-500 shadow-xl relative transform scale-105 z-10">
                    <div class="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">POPULAR</div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Business Pro</h3>
                    <div class="flex items-baseline mb-6">
                        <span class="text-5xl font-bold text-gray-900">$79</span>
                        <span class="text-gray-500 ml-2">/bulan</span>
                    </div>
                    <p class="text-sm text-gray-500 mb-8">Solusi lengkap untuk tim yang berkembang.</p>
                    <a href="#" class="block w-full py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-center shadow-lg shadow-brand-500/30 transition-all">
                        Coba Gratis 14 Hari
                    </a>
                    <div class="mt-8 space-y-4">
                        <div class="flex items-center text-sm text-gray-700 font-medium"><i class="ph-fill ph-check text-brand-500 mr-3"></i> Unlimited Users</div>
                        <div class="flex items-center text-sm text-gray-700 font-medium"><i class="ph-fill ph-check text-brand-500 mr-3"></i> Advanced Analytics & AI</div>
                        <div class="flex items-center text-sm text-gray-700 font-medium"><i class="ph-fill ph-check text-brand-500 mr-3"></i> 1TB Storage</div>
                        <div class="flex items-center text-sm text-gray-700 font-medium"><i class="ph-fill ph-check text-brand-500 mr-3"></i> Priority Support 24/7</div>
                    </div>
                </div>

                <!-- Enterprise -->
                <div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
                    <div class="flex items-baseline mb-6">
                        <span class="text-4xl font-bold text-gray-900">Custom</span>
                    </div>
                    <p class="text-sm text-gray-500 mb-8">Kebutuhan spesifik & keamanan tinggi.</p>
                    <a href="#" class="block w-full py-3 px-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl text-center transition-colors">
                        Hubungi Sales
                    </a>
                    <div class="mt-8 space-y-4">
                        <div class="flex items-center text-sm text-gray-600"><i class="ph-fill ph-check text-brand-500 mr-3"></i> Dedicated Server</div>
                        <div class="flex items-center text-sm text-gray-600"><i class="ph-fill ph-check text-brand-500 mr-3"></i> Custom Integration</div>
                        <div class="flex items-center text-sm text-gray-600"><i class="ph-fill ph-check text-brand-500 mr-3"></i> SLA Guarantee</div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">Kata Mereka Tentang Kami</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Testi 1 -->
                <div class="bg-white p-8 rounded-2xl shadow-soft">
                    <div class="text-brand-500 text-4xl mb-4 opacity-50">“</div>
                    <p class="text-gray-600 mb-6 leading-relaxed">LuxeSaaS mengubah cara kami mengelola proyek. UI-nya sangat bersih dan responsif, membuat tim kami lebih produktif dari sebelumnya.</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-gray-200"></div>
                        <div>
                            <p class="font-bold text-gray-900 text-sm">Sarah Jenkins</p>
                            <p class="text-xs text-gray-500">CEO, Creative Studio</p>
                        </div>
                    </div>
                </div>
                <!-- Testi 2 -->
                <div class="bg-white p-8 rounded-2xl shadow-soft">
                    <div class="text-brand-500 text-4xl mb-4 opacity-50">“</div>
                    <p class="text-gray-600 mb-6 leading-relaxed">Fitur reporting otomatisnya adalah penyelamat. Saya bisa menghemat waktu berjam-jam setiap minggu. Sangat recommended!</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-gray-200"></div>
                        <div>
                            <p class="font-bold text-gray-900 text-sm">Budi Santoso</p>
                            <p class="text-xs text-gray-500">Ops Manager, LogistikID</p>
                        </div>
                    </div>
                </div>
                 <!-- Testi 3 -->
                 <div class="bg-white p-8 rounded-2xl shadow-soft md:hidden lg:block">
                    <div class="text-brand-500 text-4xl mb-4 opacity-50">“</div>
                    <p class="text-gray-600 mb-6 leading-relaxed">Support yang luar biasa dan platform yang stabil. Ini adalah standar baru untuk software manajemen enterprise.</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-gray-200"></div>
                        <div>
                            <p class="font-bold text-gray-900 text-sm">Michael Chen</p>
                            <p class="text-xs text-gray-500">CTO, TechFlow</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-24 relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Siap Meningkatkan Level Bisnis Anda?</h2>
            <p class="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">Bergabunglah dengan ribuan perusahaan forward-thinking lainnya. Coba gratis hari ini, tanpa risiko.</p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#" class="w-full sm:w-auto px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full shadow-lg shadow-brand-500/40 transition-all transform hover:-translate-y-1">
                    Dapatkan Akses Sekarang
                </a>
            </div>
            <p class="mt-6 text-sm text-gray-400">14-day free trial • No credit card required</p>
        </div>
        
        <!-- Background Elements -->
        <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent z-0"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-50 rounded-full blur-3xl opacity-40 z-0"></div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100 pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                <div class="col-span-2 lg:col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-6 h-6 bg-brand-500 rounded flex items-center justify-center text-white">
                            <i class="ph-bold ph-asterisk-simple"></i>
                        </div>
                        <span class="font-bold text-xl text-gray-900">LuxeSaaS</span>
                    </div>
                    <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Membangun masa depan manajemen bisnis dengan teknologi yang elegan dan powerful.
                    </p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 mb-4">Produk</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Fitur</a></li>
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Integrasi</a></li>
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Harga</a></li>
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Changelog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 mb-4">Perusahaan</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Tentang Kami</a></li>
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Karir</a></li>
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Blog</a></li>
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Kontak</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 mb-4">Legal</h4>
                    <ul class="space-y-2 text-sm text-gray-500">
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-brand-500 transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-sm text-gray-400">© 2026 LuxeSaaS Inc. All rights reserved.</p>
                <div class="flex gap-4 text-gray-400">
                    <a href="#" class="hover:text-brand-500 transition-colors"><i class="ph-fill ph-twitter-logo text-xl"></i></a>
                    <a href="#" class="hover:text-brand-500 transition-colors"><i class="ph-fill ph-linkedin-logo text-xl"></i></a>
                    <a href="#" class="hover:text-brand-500 transition-colors"><i class="ph-fill ph-instagram-logo text-xl"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Simple Mobile Menu Script -->
    <script>
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const navbar = document.getElementById('navbar');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Add shadow to navbar on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        });
    </script>
</body>
</html>