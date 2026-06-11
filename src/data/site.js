export const navigation = [
  { label: "Beranda", subLabel: "Home", href: "/" },
  { label: "Altha Spices Export", subLabel: "Spices Export", href: "/spices-export" },
  { label: "Konstruksi Barang & Jasa", subLabel: "Construction", href: "/construction" },
  { label: "Telekomunikasi", subLabel: "Telecommunication", href: "/telecommunication" },
  { label: "Tentang Kami", subLabel: "About Us", href: "/about" },
  { label: "Kontak", subLabel: "Contact", href: "/contact" },
];

export const company = {
  name: "PT SULIS ALTHA ABADI",
  tagline: "INTEGRITY • QUALITY • COMMITMENT",
  email: "ptsulisaltha.abadi18@pt-saa.id",
  phone: "081260553783",
  location: "Medan Amplas, Sumatera Utara, Indonesia",
  address:
    "Jl. Sumber Bakti No.21, Harjosari II, Kec. Medan Amplas, Kota Medan, Sumatera Utara 20148",
  mapQuery: "PT Sulis Altha Abadi, Jl. Sumber Bakti No.21, Medan Amplas",
  mapCoordinates: { lat: 3.5293874, lng: 98.697728 },
  nib: "8120211251209",
  year: "2025",
};

export const pageContacts = {
  default: {
    email: "ptsulisaltha.abadi18@pt-saa.id",
    phone: "081260553783",
  },
  "/spices-export": {
    email: "Info@althaspicesexport.com",
    phone: "082288392508",
  },
  "/construction": {
    email: "ptsulisaltha.abadi18@pt-saa.id",
    phone: "081260553783",
  },
  "/telecommunication": {
    email: "ptsulisaltha.abadi18@pt-saa.id",
    phone: "081260553783",
  },
};

export function getPageContact(pathname) {
  if (!pathname) {
    return pageContacts.default;
  }

  for (const key of Object.keys(pageContacts)) {
    if (key !== "default" && pathname.startsWith(key)) {
      return pageContacts[key];
    }
  }

  return pageContacts.default;
}

export const divisions = [
  {
    title: "ALTHA SPICES EXPORT",
    subtitle: "Rempah Premium Indonesia untuk Pasar Dunia",
    enSubtitle: "Premium Indonesian Spices for Global Market",
    href: "/spices-export",
    icon: "Leaf",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85",
    tone: "green",
    action: "Jelajahi Produk",
    actionEn: "Explore Products",
  },
  {
    title: "KONSTRUKSI BARANG & JASA",
    subtitle: "Layanan Konstruksi Terintegrasi dengan Manajemen Profesional",
    enSubtitle: "Integrated Construction Services with Professional Project Management",
    href: "/construction",
    icon: "Building2",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85",
    tone: "blue",
    action: "Lihat Layanan",
    actionEn: "View Services",
  },
  {
    title: "TELEKOMUNIKASI",
    subtitle: "Solusi Pembangunan & Instalasi Infrastruktur Telekomunikasi",
    enSubtitle: "Telecommunication Infrastructure Development & Installation Solutions",
    href: "/telecommunication",
    icon: "RadioTower",
    image:
      "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=85",
    tone: "purple",
    action: "Lihat Layanan",
    actionEn: "View Services",
  },
];

export const clients = [
  { name: "Adaro", src: "/logos/client-adaro.png", className: "max-h-10" },
  { name: "PLN", src: "/logos/client-pln.svg", className: "max-h-12" },
  { name: "Telkom Indonesia", src: "/logos/client-telkom.svg", className: "max-h-10" },
];

export const constructionClients = [
  {
    name: "PT GO-JEK INDONESIA",
    src: "/logos/PT GO-JEK INDONESIA (Kontruksi Sipil).jpeg",
    className: "max-h-9",
  },
  {
    name: "PT SARIMELATI KENCANA TBK",
    src: "/logos/PT. SARIMELATI KENCANA TBK (Kontruksi Sipil).jpeg",
    className: "max-h-12",
  },
  {
    name: "PT Sriboga Marugame Indonesia",
    src: "/logos/PT Sriboga Marugame Indonesia (Kontruksi Sipil).jpeg",
    className: "max-h-12",
  },
  {
    name: "PT Tekno Infrastruktur Sukses",
    src: "/logos/PT. Tekno Infrastruktur Sukses (Kontruksi Sipil).jpeg",
    className: "max-h-12",
  },
  {
    name: "PT GUDANG GARAM Tbk.",
    src: "/logos/PT. GUDANG GARAM Tbk. (Kontruksi Sipil).jpeg",
    className: "max-h-11",
  },
  {
    name: "PT Smartfren Telecom Tbk",
    src: "/logos/PT Smartfren Telecom Tbk (Kontruksi Sipil).jpeg",
    className: "max-h-8",
  },
  {
    name: "PT. TRAKINDO UTAMA",
    src: "/logos/trakindo.jpg",
    className: "max-h-12",
  },
  {
    name: "PT Link Net Tbk",
    src: "/logos/PT Link Net Tbk (Kontruksi Sipil).jpeg",
    className: "max-h-11",
  },
];

export const telecommunicationClients = [
  {
    name: "PT BACH MULTI INFRASTRUKTUR",
    src: "/logos/PT. BACH MULTI INFRASTRUKTUR (Telekomunikasi).jpeg",
    className: "max-h-10",
  },
  {
    name: "PT INDONESIA COMNETS PLUS",
    src: "/logos/PT. INDONESIA COMNETS PLUS (Telekomunikasi).jpeg",
    className: "max-h-10",
  },
  {
    name: "PT Saltek Dumpang Jaya",
    src: "/logos/PT. Saltek dumpang jaya (Telekomunikasi).jpeg",
    className: "max-h-12",
  },
];

export const telecomPartners = [
  { name: "Indosat", src: "/logos/indosat.svg", className: "max-h-9" },
];

export const trackRecords = [
  { value: "30+", label: "Proyek Selesai", enLabel: "Completed Projects", icon: "ClipboardCheck" },
  { value: "10+", label: "Mitra Bisnis", enLabel: "Business Partners", icon: "Handshake" },
  { value: "5+", label: "Negara Tujuan Ekspor", enLabel: "Export Destinations", icon: "Globe2" },
];

export const constructionFeatures = [
  { title: "Kualitas Terjamin", en: "Guaranteed Quality", icon: "ShieldCheck" },
  { title: "Tim Profesional", en: "Professional Team", icon: "Users2" },
  { title: "Keselamatan Kerja", en: "Safety First", icon: "HardHat" },
  { title: "Tepat Waktu", en: "On Time Delivery", icon: "Timer" },
  { title: "Solusi Terintegrasi", en: "Integrated Solution", icon: "ShieldCheck" },
];

export const telecomFeatures = [
  { title: "Teknologi Modern", en: "Modern Technology", icon: "Lightbulb" },
  { title: "Standar Keselamatan Tinggi", en: "High Safety Standard", icon: "Building2" },
  { title: "Tim Ahli & Bersertifikasi", en: "Certified Professionals", icon: "Users2" },
  { title: "Layanan End-to-End", en: "End-to-End Service", icon: "Workflow" },
  { title: "Kualitas Terjamin", en: "Guaranteed Quality", icon: "ShieldCheck" },
];

export const spicesFeatures = [
  { title: "Kualitas Terjamin", en: "Guaranteed Quality", icon: "BadgeCheck" },
  { title: "Standar Ekspor", en: "Export Standard", icon: "Globe2" },
  { title: "Supply Berkelanjutan", en: "Sustainable Supply", icon: "Sprout" },
  { title: "Layanan Profesional", en: "Professional Service", icon: "Users2" },
];

export const constructionServices = [
  {
    title: "Pekerjaan Konstruksi Sipil",
    en: "Civil Construction Works",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    points: ["Pembangunan gedung", "Struktur beton & baja", "Pekerjaan finishing"],
  },
  {
    title: "Pengadaan Material",
    en: "Material Procurement",
    image: "/images/services/material-procurement-b.jpg",
    points: ["Supply material berkualitas", "Manajemen pengadaan", "Pengiriman tepat waktu"],
  },
  {
    title: "Manajemen Proyek",
    en: "Project Management",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    points: ["Perencanaan & penjadwalan", "Pengawasan & kontrol mutu", "Pengendalian biaya"],
  },
  {
    title: "Pembangunan Restoran F&B",
    en: "F&B Restaurant Development",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    points: ["Pembangunan area restoran", "Instalasi utilitas F&B", "Finishing interior & eksterior"],
  },
];

export const telecomServices = [
  {
    title: "Instalasi Jaringan Fiber Optic",
    en: "Fiber Optic Network Installation",
    image:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=900&q=80",
    points: ["Instalasi kabel fiber optic", "Splicing & testing", "Dokumentasi jaringan"],
  },
  {
    title: "Pembangunan Tower Telekomunikasi",
    en: "Telecommunication Tower Construction",
    image:
      "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=900&q=80",
    points: ["Pekerjaan pondasi tower", "Pemasangan struktur tower", "Instalasi penangkal petir"],
  },
  {
    title: "Instalasi Perangkat Jaringan",
    en: "Network Equipment Installation",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    points: ["Instalasi perangkat aktif", "Konfigurasi & integrasi", "Commissioning"],
  },
  {
    title: "Maintenance & Support System",
    en: "Maintenance & Support System",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    points: ["Preventive maintenance", "Troubleshooting", "Support 24/7"],
  },
  {
    title: "Integrasi Sistem Komunikasi",
    en: "Communication System Integration",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    points: ["Integrasi sistem", "Radio link & wireless", "Monitoring system"],
  },
];

export const spicesProducts = [
  {
    slug: "kunyit",
    name: "KUNYIT",
    en: "Turmeric",
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=80",
  },
  {
    slug: "jahe",
    name: "JAHE",
    en: "Ginger",
    image: "/images/products/ginger-alt.png",
    imageClassName: "object-contain p-4",
  },
  {
    slug: "kayu-manis",
    name: "KAYU MANIS",
    en: "Cinnamon",
    image: "/images/products/cinnamon.jpg",
  },
  {
    slug: "lada-hitam",
    name: "LADA HITAM",
    en: "Black Pepper",
    image: "/images/products/black-pepper.jpg",
  },
  {
    slug: "temulawak",
    name: "TEMULAWAK",
    en: "Curcuma Xanthorrhiza",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80",
  },
];

export const spiceProductDetails = [
  {
    slug: "kunyit",
    name: "KUNYIT",
    en: "Turmeric",
    scientificName: "Curcuma longa",
    heroImage:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1500&q=88",
    summary:
      "Kunyit berkualitas tinggi dengan warna kuning-oranye cerah, aroma khas, dan kandungan kurkumin alami yang tinggi.",
    features: [
      { title: "Alami & Murni", en: "100% Natural", icon: "Leaf" },
      { title: "Kualitas Terjamin", en: "Export Standard", icon: "ShieldCheck" },
    ],
    productsTitle: "Produk Kunyit Kami",
    variants: [
      {
        name: "Kunyit Segar",
        en: "Fresh Turmeric",
        image:
          "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Kunyit Kering",
        en: "Dried Turmeric",
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Kunyit Bubuk",
        en: "Turmeric Powder",
        image:
          "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Oleoresin Kunyit",
        en: "Turmeric Oleoresin",
        image:
          "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=700&q=85",
      },
    ],
    specs: [
      { label: "Nama Produk", value: "Kunyit" },
      { label: "Asal", value: "Indonesia" },
      { label: "Bentuk", value: "Segar, kering, bubuk, oleoresin" },
      { label: "Warna", value: "Kuning-oranye cerah alami" },
      { label: "Aroma", value: "Khas kunyit, kuat" },
      { label: "Kandungan Kurkumin", value: "Minimal 3% - 5%" },
      { label: "Kadar Air", value: "Maks. 10% - 12% kering, maks. 8% bubuk" },
      { label: "Kemasan", value: "25 kg/karung atau sesuai permintaan" },
    ],
    standards: [
      "Kadar air kunyit kering maksimal 10% - 12%.",
      "Benda asing maksimal 1% - 2%.",
      "Kunyit segar harus utuh, bersih dari tanah, tidak keriput, dan tidak bertunas.",
      "Kunyit bubuk halus 60 - 80 mesh dan tanpa pewarna tambahan.",
      "Bebas serangga, jamur, aflatoksin, dan residu pestisida.",
    ],
  },
  {
    slug: "jahe",
    name: "JAHE",
    en: "Ginger",
    scientificName: "Zingiber officinale",
    heroImage: "/images/products/ginger-alt2.jpg",
    summary:
      "Jahe ekspor dengan rimpang utuh, aroma hangat khas, bersih dari tanah, serta bebas hama, penyakit, dan jamur.",
    features: [
      { title: "Rimpang Pilihan", en: "Selected Rhizome", icon: "BadgeCheck" },
      { title: "Standar Pangan", en: "Food Safety", icon: "ShieldCheck" },
    ],
    productsTitle: "Produk Jahe Kami",
    variants: [
      { name: "Jahe Segar", en: "Fresh Ginger", image: "/images/products/ginger-alt.png" },
      { name: "Jahe Kering", en: "Dried Ginger", image: "/images/products/ginger.jpg" },
      { name: "Jahe Bubuk", en: "Ginger Powder", image: "/images/products/ginger-alt2.jpg" },
      { name: "Jahe Emprit", en: "Small White Ginger", image: "/images/products/ginger-alt.png" },
    ],
    specs: [
      { label: "Nama Produk", value: "Jahe" },
      { label: "Asal", value: "Indonesia" },
      { label: "Jenis Utama", value: "Jahe gajah dan jahe emprit" },
      { label: "Bentuk", value: "Segar, kering, bubuk" },
      { label: "Kondisi Fisik", value: "Rimpang utuh, tidak busuk, tidak berjamur" },
      { label: "Kebersihan", value: "Bebas tanah, batu, dan kotoran lainnya" },
      { label: "Kadar Air", value: "Maks. 10% - 14% untuk jahe kering" },
      { label: "Kemasan", value: "Karung food grade atau sesuai buyer" },
    ],
    standards: [
      "Rimpang jahe harus utuh dan bersih dari tanah.",
      "Bebas dari hama, penyakit, dan jamur.",
      "Kualitas memenuhi standar keamanan pangan internasional.",
      "Kadar air jahe kering maksimal 10% - 14%.",
      "Sortasi dilakukan untuk menjaga ukuran dan kondisi fisik produk.",
    ],
  },
  {
    slug: "kayu-manis",
    name: "KAYU MANIS",
    en: "Cinnamon",
    scientificName: "Cinnamomum burmannii",
    heroImage: "/images/products/cinnamon.jpg",
    summary:
      "Kayu manis cassia Indonesia dengan warna cokelat kemerahan alami, aroma kuat, kering, bersih, dan bebas hama.",
    features: [
      { title: "Cassia Indonesia", en: "Indonesian Cassia", icon: "Leaf" },
      { title: "Aroma Kuat", en: "Rich Aroma", icon: "Award" },
    ],
    productsTitle: "Produk Kayu Manis Kami",
    variants: [
      { name: "Kayu Manis Batang", en: "Cinnamon Stick", image: "/images/products/cinnamon.jpg" },
      {
        name: "Kayu Manis Pecah",
        en: "Broken Cinnamon",
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Kayu Manis Bubuk",
        en: "Cinnamon Powder",
        image:
          "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Minyak Kayu Manis",
        en: "Cinnamon Oil",
        image:
          "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=700&q=85",
      },
    ],
    specs: [
      { label: "Nama Produk", value: "Kayu Manis" },
      { label: "Jenis", value: "Cinnamomum burmannii (Cassia Indonesia)" },
      { label: "Asal", value: "Indonesia" },
      { label: "Bentuk", value: "Batang, broken, bubuk, minyak" },
      { label: "Warna", value: "Cokelat kemerahan alami" },
      { label: "Kadar Air", value: "Maksimal 12% - 13%" },
      { label: "Minyak Atsiri", value: "Minimal 1% - 2,5%" },
      { label: "Kemasan", value: "Karung/karton food grade sesuai permintaan" },
    ],
    standards: [
      "Bahan asing 0% sesuai standar mutu dokumen.",
      "Kondisi fisik bersih, kering, dan tidak berjamur.",
      "Warna cokelat kemerahan alami dan seragam.",
      "Bebas serangga dan hama.",
      "Kadar air maksimal 12% - 13% untuk menjaga kualitas pengiriman.",
    ],
  },
  {
    slug: "lada-hitam",
    name: "LADA HITAM",
    en: "Black Pepper",
    scientificName: "Piper nigrum",
    heroImage: "/images/products/black-pepper.jpg",
    summary:
      "Lada hitam pilihan dengan aroma tajam, warna gelap alami, kadar air terkendali, dan proses sortasi untuk kebutuhan ekspor.",
    features: [
      { title: "Sortasi Premium", en: "Premium Sorting", icon: "CircleCheck" },
      { title: "Aroma Tajam", en: "Strong Aroma", icon: "Award" },
    ],
    productsTitle: "Produk Lada Hitam Kami",
    variants: [
      { name: "Lada Hitam Biji", en: "Whole Black Pepper", image: "/images/products/black-pepper.jpg" },
      {
        name: "Lada Hitam Bubuk",
        en: "Black Pepper Powder",
        image:
          "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Lada Pecah",
        en: "Crushed Pepper",
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Lada Premium",
        en: "Premium Grade",
        image: "/images/products/black-pepper.jpg",
      },
    ],
    specs: [
      { label: "Nama Produk", value: "Lada Hitam" },
      { label: "Asal", value: "Indonesia" },
      { label: "Bentuk", value: "Biji utuh, bubuk, crushed" },
      { label: "Warna", value: "Hitam gelap alami" },
      { label: "Aroma", value: "Khas lada, kuat dan tajam" },
      { label: "Kadar Air", value: "Maksimal 12%" },
      { label: "Benda Asing", value: "Maksimal 1%" },
      { label: "Kemasan", value: "25 kg/karung atau sesuai permintaan" },
    ],
    standards: [
      "Biji lada disortasi untuk menjaga ukuran, warna, dan kebersihan.",
      "Produk harus bebas dari serangga, jamur, dan bau asing.",
      "Kadar air dikendalikan untuk menjaga mutu selama penyimpanan.",
      "Tidak tercampur batu, tanah, atau benda asing berlebih.",
      "Pengemasan menggunakan material food grade sesuai kebutuhan buyer.",
    ],
  },
  {
    slug: "temulawak",
    name: "TEMULAWAK",
    en: "Curcuma Xanthorrhiza",
    scientificName: "Curcuma xanthorrhiza",
    heroImage:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1500&q=88",
    summary:
      "Temulawak Indonesia dengan rimpang pilihan, aroma herbal khas, warna kuning alami, dan pengolahan bersih untuk pasar ekspor.",
    features: [
      { title: "Herbal Indonesia", en: "Indonesian Herbal", icon: "Leaf" },
      { title: "Siap Ekspor", en: "Export Ready", icon: "Globe2" },
    ],
    productsTitle: "Produk Temulawak Kami",
    variants: [
      {
        name: "Temulawak Segar",
        en: "Fresh Curcuma",
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Temulawak Kering",
        en: "Dried Curcuma",
        image:
          "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Temulawak Bubuk",
        en: "Curcuma Powder",
        image:
          "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Ekstrak Temulawak",
        en: "Curcuma Extract",
        image:
          "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=700&q=85",
      },
    ],
    specs: [
      { label: "Nama Produk", value: "Temulawak" },
      { label: "Asal", value: "Indonesia" },
      { label: "Bentuk", value: "Segar, kering, bubuk, ekstrak" },
      { label: "Warna", value: "Kuning alami" },
      { label: "Aroma", value: "Khas herbal temulawak" },
      { label: "Kadar Air", value: "Maks. 10% - 12% untuk produk kering" },
      { label: "Kebersihan", value: "Bebas tanah, jamur, dan benda asing" },
      { label: "Kemasan", value: "Karung/karton food grade sesuai permintaan" },
    ],
    standards: [
      "Rimpang dipilih dalam kondisi segar, utuh, dan tidak busuk.",
      "Produk kering harus memiliki kadar air terkendali.",
      "Bebas tanah, jamur, serangga, dan bau asing.",
      "Pengolahan dilakukan secara bersih untuk menjaga mutu herbal.",
      "Spesifikasi akhir dapat menyesuaikan permintaan buyer dan negara tujuan.",
    ],
  },
];

export const exportMarkets = [
  { name: "Malaysia", flag: "/flags/malaysia.svg" },
  { name: "Singapore", flag: "/flags/singapore.svg" },
  { name: "India", flag: "/flags/india.svg" },
  { name: "China", flag: "/flags/china.svg" },
  { name: "Thailand", flag: "/flags/thailand.svg" },
];

export const faqs = [
  {
    question: "Website ini tentang apa?",
    answer:
      "Website ini memperkenalkan PT Sulis Altha Abadi, perusahaan dengan tiga divisi utama: Altha Spices Export, konstruksi barang dan jasa, serta telekomunikasi.",
  },
  {
    question: "Apakah perusahaan ini hanya bergerak di ekspor rempah?",
    answer:
      "Tidak. Altha Spices Export adalah salah satu divisi utama, tetapi website ini juga menampilkan layanan konstruksi dan telekomunikasi perusahaan.",
  },
  {
    question: "Produk ekspor apa saja yang ditampilkan di website ini?",
    answer:
      "Produk rempah yang ditampilkan meliputi kunyit, jahe, kayu manis, lada hitam, dan temulawak untuk kebutuhan pasar ekspor.",
  },
  {
    question: "Layanan konstruksi apa yang tersedia?",
    answer:
      "Layanan konstruksi mencakup pekerjaan sipil, pengadaan material, manajemen proyek, dan pembangunan restoran F&B.",
  },
  {
    question: "Apa saja layanan telekomunikasi yang ditawarkan?",
    answer:
      "Layanan telekomunikasi meliputi instalasi jaringan fiber optic, pembangunan tower, instalasi perangkat jaringan, maintenance, dan integrasi sistem komunikasi.",
  },
  {
    question: "Bagaimana cara meminta penawaran atau menghubungi perusahaan?",
    answer:
      "Pengunjung dapat menghubungi perusahaan melalui WhatsApp, email, atau formulir Kirim Pesan pada halaman Kontak untuk meminta informasi dan penawaran.",
  },
  {
    question: "Di mana lokasi perusahaan?",
    answer:
      "Lokasi perusahaan berada di Medan, Sumatera Utara, Indonesia, dan detail alamatnya tersedia pada halaman Kontak.",
  },
];

export const constructionProjects = [
  {
    title: "Gedung Perkantoran",
    meta: "Medan, 2023",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Pembangunan PJO Tenaga Surya",
    meta: "Balige, 2025",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Fiber Optik",
    meta: "Sumatra Utara, 2025",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Pembangunan Restoran F&B",
    meta: "Tanjung Balai, 2025",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
];

export const telecomProjects = [
  {
    title: "Pembangunan Tower 4G/5G",
    meta: "Sumut, 2023",
    image:
      "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Instalasi Fiber Optic Backbone",
    meta: "Riau, 2023",
    image:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Integrasi Jaringan Enterprise",
    meta: "Medan, 2024",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Instalasi Perangkat Network",
    meta: "Sumut, 2024",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
];

export const leaders = [
  {
    name: "Alif Aviciena Hendrisyah",
    role: "CEO - Altha Spices Export",
    photo: "/images/leader-alif-new.jpeg",
    summary:
      "Memimpin divisi ekspor rempah dengan fokus pada penguatan jaringan global, pengendalian kualitas, dan pengembangan pasar internasional.",
    education: "S1 Manajemen, Universitas Harapan Medan",
    focus: ["Pengembangan pasar ekspor", "Business development", "Strategi pemasaran internasional", "Negosiasi & komunikasi buyer luar negeri", "Supply chain coordination"],
    linkedin: "linkedin.com/in/alifavicienahendrisyah",
    linkedinUrl: "https://www.linkedin.com/in/alif-aviciena-hendrisyah-533683406/",
  },
  {
    name: "Awal Surya Hendrisyah",
    role: "CEO - Konstruksi Barang & Jasa",
    photo: "/images/leader-awal-new.jpeg",
    summary:
      "Memimpin divisi konstruksi dengan komitmen pada keselamatan kerja, ketepatan waktu, serta standar mutu tinggi dalam setiap proyek.",
    education: "S1 Teknik Sipil, Institut Teknologi Medan (ITM)",
    focus: ["15+ tahun di industri konstruksi", "Manajemen proyek konstruksi", "Pengendalian mutu & keselamatan kerja", "Perencanaan & pelaksanaan proyek", "Pengelolaan tim & sumber daya"],
    linkedin: "linkedin.com/in/awalsuryahendrisyah",
    linkedinUrl: "https://www.linkedin.com/in/awal-surya-hendrisyah-20a38944/",
  },
];

export const services = divisions.map((division) => ({
  slug: division.href.replace("/", ""),
  title: division.title,
  eyebrow: division.enSubtitle,
  icon: division.icon,
  summary: division.subtitle,
  description: division.enSubtitle,
  highlights: ["Kualitas terjamin", "Tim profesional", "Solusi terintegrasi", "Layanan end-to-end"],
  deliverables: ["Company page", "Service cards", "Contact CTA", "Footer information"],
}));

export const projects = [...constructionProjects, ...telecomProjects].slice(0, 3).map((project) => ({
  title: project.title,
  category: "Project Portfolio",
  image: project.image,
  description: project.meta,
  tags: ["PT Sulis Altha Abadi", "Portfolio", "Quality"],
}));

export const techStack = ["Next.js", "React", "JavaScript", "Tailwind CSS", "API Routes", "Responsive UI"];

export const processSteps = [
  {
    title: "Perencanaan",
    description: "Memetakan kebutuhan bisnis, visual, konten, dan alur halaman.",
  },
  {
    title: "Produksi",
    description: "Membangun halaman dengan komponen konsisten dan struktur scalable.",
  },
  {
    title: "Review",
    description: "Menguji responsive, build, performa, dan kesesuaian visual.",
  },
  {
    title: "Pengembangan",
    description: "Menyiapkan integrasi backend, form, dashboard, dan fitur lanjutan.",
  },
];
