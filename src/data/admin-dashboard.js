export const dashboardKpis = [
  {
    label: "Calon Buyer",
    value: "128",
    helper: "+18 bulan ini",
    tone: "emerald",
    icon: "Users2",
  },
  {
    label: "Follow Up Aktif",
    value: "87",
    helper: "21 prioritas tinggi",
    tone: "blue",
    icon: "MessageCircle",
  },
  {
    label: "Hot Lead",
    value: "34",
    helper: "+7 siap negosiasi",
    tone: "violet",
    icon: "BadgeCheck",
  },
  {
    label: "Closing Bulan Ini",
    value: "4",
    helper: "2 container berjalan",
    tone: "amber",
    icon: "Handshake",
  },
  {
    label: "Closing Berjalan",
    value: "2 Container",
    helper: "ETA tercepat 12 hari",
    tone: "cyan",
    icon: "Workflow",
  },
  {
    label: "Profit Bulan Ini",
    value: "$18,650",
    helper: "+28% dari bulan lalu",
    tone: "green",
    icon: "BarChart3",
  },
];

export const leadSources = [
  { label: "Website", value: 42 },
  { label: "Referral", value: 31 },
  { label: "Marketplace", value: 19 },
  { label: "Repeat Buyer", value: 8 },
];

export const pipelineStages = [
  { label: "Lead", value: 128, color: "#6ee7b7" },
  { label: "Follow Up", value: 87, color: "#60a5fa" },
  { label: "Closing Process", value: 29, color: "#fbbf24" },
  { label: "Closing Selesai", value: 14, color: "#34d399" },
];

export const buyerLeads = [
  {
    company: "Golden Leaf Trading",
    country: "Malaysia",
    product: "Kunyit & Lada Hitam",
    source: "Website",
    status: "Hot Lead",
    value: "$24,000",
    owner: "Alif",
    nextAction: "Kirim sample dan COA",
  },
  {
    company: "Bach Multi Infrastruktur",
    country: "Indonesia",
    product: "Fiber optic project",
    source: "Referral",
    status: "Follow Up",
    value: "Rp 180 jt",
    owner: "Awal",
    nextAction: "Meeting teknis",
  },
  {
    company: "Nusantara Spice Hub",
    country: "Singapore",
    product: "Kayu Manis",
    source: "Website",
    status: "Negotiation",
    value: "$17,500",
    owner: "Alif",
    nextAction: "Final price confirmation",
  },
  {
    company: "Medan Build Partner",
    country: "Indonesia",
    product: "Material procurement",
    source: "Repeat Buyer",
    status: "Closing",
    value: "Rp 320 jt",
    owner: "Awal",
    nextAction: "PO dan termin pembayaran",
  },
  {
    company: "Orient Food Ingredients",
    country: "Thailand",
    product: "Jahe",
    source: "Marketplace",
    status: "New Lead",
    value: "$9,800",
    owner: "Alif",
    nextAction: "Validasi kebutuhan volume",
  },
];

export const followUps = [
  {
    time: "09:00",
    company: "Golden Leaf Trading",
    task: "Kirim quotation revisi untuk kunyit grade ekspor.",
    priority: "High",
  },
  {
    time: "11:30",
    company: "Bach Multi Infrastruktur",
    task: "Konfirmasi scope instalasi dan kebutuhan material.",
    priority: "Medium",
  },
  {
    time: "14:00",
    company: "Nusantara Spice Hub",
    task: "Follow up approval sample kayu manis.",
    priority: "High",
  },
  {
    time: "16:30",
    company: "Orient Food Ingredients",
    task: "Kirim katalog produk dan dokumen standar ekspor.",
    priority: "Normal",
  },
];

export const closings = [
  {
    code: "CLS-2401",
    buyer: "Nusantara Spice Hub",
    product: "Kayu Manis",
    status: "PO masuk",
    progress: 82,
    margin: "21.5%",
  },
  {
    code: "CLS-2402",
    buyer: "Medan Build Partner",
    product: "Pengadaan Material",
    status: "Termin 1",
    progress: 64,
    margin: "18.2%",
  },
  {
    code: "CLS-2403",
    buyer: "Golden Leaf Trading",
    product: "Kunyit",
    status: "Negosiasi final",
    progress: 58,
    margin: "24.1%",
  },
];

export const shipments = [
  {
    container: "MSKU-481920",
    route: "Belawan - Port Klang",
    cargo: "Kunyit 12 MT",
    eta: "12 hari",
    status: "Stuffing",
    progress: 46,
  },
  {
    container: "CMAU-908174",
    route: "Belawan - Singapore",
    cargo: "Kayu Manis 8 MT",
    eta: "18 hari",
    status: "Customs",
    progress: 68,
  },
  {
    container: "OOLU-771245",
    route: "Medan - Riau",
    cargo: "Material proyek",
    eta: "5 hari",
    status: "In Transit",
    progress: 79,
  },
];

export const exportProducts = [
  { name: "Kunyit", stock: "18 MT", demand: 92, margin: "24%" },
  { name: "Jahe", stock: "11 MT", demand: 74, margin: "20%" },
  { name: "Kayu Manis", stock: "8 MT", demand: 88, margin: "22%" },
  { name: "Lada Hitam", stock: "6 MT", demand: 66, margin: "19%" },
  { name: "Temulawak", stock: "9 MT", demand: 58, margin: "17%" },
];

export const suppliers = [
  {
    name: "Koperasi Rempah Sumut",
    category: "Kunyit, Jahe",
    quality: "A",
    capacity: "24 MT/bulan",
    status: "Aktif",
  },
  {
    name: "CV Lada Nusantara",
    category: "Lada Hitam",
    quality: "A-",
    capacity: "10 MT/bulan",
    status: "Audit Mutu",
  },
  {
    name: "Gudang Kayu Manis Raya",
    category: "Kayu Manis",
    quality: "A",
    capacity: "14 MT/bulan",
    status: "Aktif",
  },
  {
    name: "Mitra Material Medan",
    category: "Material Proyek",
    quality: "B+",
    capacity: "By PO",
    status: "Aktif",
  },
];

export const profitSeries = [
  { month: "Jan", revenue: 44, profit: 16 },
  { month: "Feb", revenue: 51, profit: 18 },
  { month: "Mar", revenue: 67, profit: 24 },
  { month: "Apr", revenue: 72, profit: 28 },
  { month: "Mei", revenue: 84, profit: 33 },
  { month: "Jun", revenue: 91, profit: 38 },
];

export const teamPerformance = [
  { name: "Alif", leads: 48, followUps: 31, closing: 5, score: 92 },
  { name: "Awal", leads: 31, followUps: 27, closing: 4, score: 86 },
  { name: "Rizky", leads: 25, followUps: 18, closing: 2, score: 70 },
  { name: "Lulu", leads: 18, followUps: 10, closing: 1, score: 45 },
];

export const monthlyTargets = [
  { label: "Target Oktober", value: 75 },
  { label: "Realisasi Container", value: 63 },
  { label: "Prospek Aktif", value: 132 },
];

export const documents = [
  {
    name: "Invoice Golden Leaf #INV-2401",
    category: "Invoice",
    owner: "Alif",
    status: "Terkirim",
    date: "2025-05-12",
    note: "Pembayaran termin pertama kunyit ekspor.",
  },
  {
    name: "Kontrak Nusantara Spice Hub",
    category: "Kontrak",
    owner: "Alif",
    status: "Aktif",
    date: "2025-04-30",
    note: "Periode 1 tahun, target 4 container kayu manis.",
  },
  {
    name: "COA Lada Hitam Grade A",
    category: "Sertifikat",
    owner: "Awal",
    status: "Disetujui",
    date: "2025-05-08",
    note: "Hasil uji laboratorium independen.",
  },
];
