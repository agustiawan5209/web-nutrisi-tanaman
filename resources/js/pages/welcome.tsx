import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/guest/main-layout';
import { ArrowRight, BarChart3, Brain, CheckCircle, Droplets, Target, Zap, Leaf, Ruler, Gauge, Calendar, Eye } from 'lucide-react';

export default function LandingPage() {
    const features = [
        {
            icon: <Brain className="h-8 w-8 text-green-600" />,
            title: 'AI-Powered Analysis',
            description: 'Algoritma Random Forest yang canggih menganalisis data nutrisi untuk memberikan rekomendasi yang akurat dan optimal.',
        },
        {
            icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
            title: 'Real-time Monitoring',
            description: 'Pantau kondisi nutrisi tanaman secara real-time dengan dashboard yang intuitif dan mudah dipahami.',
        },
        {
            icon: <Target className="h-8 w-8 text-purple-600" />,
            title: 'Precision Agriculture',
            description: 'Tingkatkan hasil panen dengan rekomendasi nutrisi yang tepat sasaran berdasarkan data ilmiah.',
        },
        {
            icon: <Zap className="h-8 w-8 text-yellow-600" />,
            title: 'Automated Decisions',
            description: 'Sistem otomatis yang membantu mengambil keputusan nutrisi tanpa perlu keahlian mendalam.',
        },
    ];

    const hydroponicCriteria = [
        {
            icon: <Gauge className="h-6 w-6 text-blue-600" />,
            title: 'pH (Power of Hydrogen)',
            description: 'Menunjukkan tingkat keasaman/basa larutan. Ideal: 5.5 – 6.5 untuk sayuran daun.',
            ideal: '5.5 – 6.5',
            low: '< 5.5 (terlalu asam)',
            high: '> 6.5 (terlalu basa)'
        },
        {
            icon: <BarChart3 className="h-6 w-6 text-green-600" />,
            title: 'PPM (Parts Per Million)',
            description: 'Menunjukkan konsentrasi nutrisi dalam larutan. Selada: 800–1200 ppm, Kangkung: 900–1200 ppm.',
            ideal: '800 – 1200 ppm',
            low: '< 800 (nutrisi kurang)',
            high: '> 1200 (nutrisi berlebih)'
        },
        {
            icon: <Ruler className="h-6 w-6 text-purple-600" />,
            title: 'Ketinggian Air',
            description: 'Menentukan seberapa jauh akar terendam larutan. Pada sistem DFT: 3–5 cm.',
            ideal: '3 – 5 cm',
            low: '< 3 cm (akar kering)',
            high: '> 5 cm (akar busuk)'
        },
        {
            icon: <Calendar className="h-6 w-6 text-orange-600" />,
            title: 'Umur Panen / Fase Pertumbuhan',
            description: 'Setiap fase butuh pH & PPM berbeda. Bibit: 300–500 ppm, Vegetatif: 800–1200 ppm.',
            ideal: 'Sesuai fase tanaman',
            low: 'Pertumbuhan lambat',
            high: 'Tanaman stres'
        },
        {
            icon: <Eye className="h-6 w-6 text-red-600" />,
            title: 'Gejala Visual Tanaman',
            description: 'Indikator kesehatan tanaman melalui penampakan fisik.',
            ideal: 'Daun hijau segar',
            low: 'Daun kuning, lambat tumbuh',
            high: 'Tepi daun mengering, daun tebal'
        }
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="px-4 py-20">
                <div className="container mx-auto text-center">
                    <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">🌱 Teknologi AI untuk Hidroponik Modern</Badge>
                    <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-6xl">
                        Sistem Pendukung Keputusan untuk
                        <span className="block text-green-600">Nutrisi Tanaman Hidroponik</span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600">
                        Menggunakan Algoritma Random Forest dan Kecerdasan Buatan untuk memberikan rekomendasi nutrisi yang optimal, meningkatkan
                        hasil panen, dan membantu petani hidroponik mencapai efisiensi maksimal.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button size="lg" className="bg-green-600 px-8 py-3 text-lg hover:bg-green-700">
                            Mulai Sekarang
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* About Hydroponics Section */}
            <section id="hidroponik" className="bg-white px-4 py-16">
                <div className="container mx-auto">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-gray-900">Apa Itu Hidroponik?</h2>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                Hidroponik adalah metode budidaya tanaman tanpa menggunakan tanah, melainkan memanfaatkan larutan nutrisi mineral dalam air.
                                Akar tanaman langsung menyerap nutrisi dari air yang sudah diberi pupuk khusus hidroponik (AB Mix atau formulasi lain).
                            </p>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900">Keuntungan Hidroponik:</h3>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <p className="text-gray-600">Efisiensi lahan (bisa di lahan sempit atau perkotaan)</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <p className="text-gray-600">Penggunaan air lebih hemat (karena sirkulasi)</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <p className="text-gray-600">Pertumbuhan tanaman lebih cepat & seragam</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <p className="text-gray-600">Risiko hama tanah berkurang</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <p className="text-gray-600">Bisa dikontrol nutrisi sesuai kebutuhan tanaman</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 p-8 text-white">
                                <Leaf className="mb-4 h-16 w-16 opacity-80" />
                                <h3 className="mb-4 text-2xl font-bold">Pertanian Masa Depan</h3>
                                <p className="text-green-100">
                                    Hidroponik merupakan solusi pertanian modern yang efisien dan berkelanjutan,
                                    terutama di daerah perkotaan dengan keterbatasan lahan. Dengan sistem yang terkontrol,
                                    tanaman dapat tumbuh optimal dengan penggunaan sumber daya yang minimal.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hydroponic Criteria Section */}
            <section id='kriteria' className="bg-gray-50 px-4 py-16">
                <div className="container mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Kriteria Penting dalam Sistem Hidroponik</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Dalam penelitian (terutama untuk SPK nutrisi), biasanya dipakai parameter utama yang menentukan kondisi tanaman:
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {hydroponicCriteria.map((criteria, index) => (
                            <Card key={index} className="border-0 bg-white shadow-md transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-4 flex items-center">
                                        <div className="mr-3 rounded-full bg-gray-100 p-2">
                                            {criteria.icon}
                                        </div>
                                        <CardTitle className="text-lg">{criteria.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 text-gray-600">{criteria.description}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-green-600">Ideal:</span>
                                            <span>{criteria.ideal}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-blue-600">Kurang:</span>
                                            <span>{criteria.low}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-red-600">Berlebih:</span>
                                            <span>{criteria.high}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Summary Table Section */}
            <section id="parameter-utama" className="bg-white px-4 py-16">
                <div className="container mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Ringkasan Kriteria Hidroponik untuk Sayuran Daun</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Parameter utama yang menentukan kesehatan dan pertumbuhan tanaman hidroponik
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="w-full border-collapse bg-white text-left">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Kriteria</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Ideal</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Kurang</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Berlebihan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-6 py-4 font-medium">pH</td>
                                    <td className="px-6 py-4 text-green-600">5.5 – 6.5</td>
                                    <td className="px-6 py-4 text-blue-600">&lt; 5.5 (terlalu asam)</td>
                                    <td className="px-6 py-4 text-red-600">&gt; 6.5 (terlalu basa)</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium">PPM (Selada)</td>
                                    <td className="px-6 py-4 text-green-600">800 – 1200 ppm</td>
                                    <td className="px-6 py-4 text-blue-600">&lt; 800 (nutrisi kurang)</td>
                                    <td className="px-6 py-4 text-red-600">&gt; 1200 (nutrisi berlebih)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium">Ketinggian air</td>
                                    <td className="px-6 py-4 text-green-600">3 – 5 cm</td>
                                    <td className="px-6 py-4 text-blue-600">&lt; 3 cm (akar kering)</td>
                                    <td className="px-6 py-4 text-red-600">&gt; 5 cm (akar busuk)</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium">Gejala visual</td>
                                    <td className="px-6 py-4 text-green-600">daun hijau segar</td>
                                    <td className="px-6 py-4 text-blue-600">daun kuning, lambat tumbuh</td>
                                    <td className="px-6 py-4 text-red-600">tepi daun mengering, daun tebal</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Dalam sistem pendukung keputusan (SPK) untuk hidroponik, kriteria utama yang biasanya digunakan: pH, PPM/EC,
                            Ketinggian air, Umur panen, Gejala tanaman, dan Jenis tanaman.
                        </p>
                    </div>
                </div>
            </section>

            {/* How AI Works */}
            <section id="how-it-works" className="px-4 py-16 bg-gray-50">
                <div className="container mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Bagaimana AI dan Random Forest Bekerja?</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Sistem kami menggunakan algoritma Random Forest yang canggih untuk menganalisis berbagai parameter dan memberikan
                            rekomendasi nutrisi yang akurat berdasarkan data historis dan kondisi real-time.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="border-green-200 text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <BarChart3 className="h-8 w-8 text-green-600" />
                                </div>
                                <CardTitle className="text-green-800">1. Pengumpulan Data</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Sistem mengumpulkan data dari sensor pH, EC, suhu, kelembaban, dan parameter lingkungan lainnya secara real-time.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-blue-200 text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                    <Brain className="h-8 w-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-blue-800">2. Analisis AI</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Algoritma Random Forest menganalisis pola data historis dan kondisi saat ini untuk memprediksi kebutuhan nutrisi
                                    optimal.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-purple-200 text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                                    <Target className="h-8 w-8 text-purple-600" />
                                </div>
                                <CardTitle className="text-purple-800">3. Rekomendasi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Sistem memberikan rekomendasi nutrisi yang spesifik dan actionable untuk mengoptimalkan pertumbuhan tanaman.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="bg-white px-4 py-16">
                <div className="container mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Fitur Unggulan Sistem</h2>
                        <p className="text-xl text-gray-600">
                            Dilengkapi dengan teknologi terdepan untuk memberikan pengalaman terbaik dalam pengelolaan nutrisi hidroponik.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-0 bg-white shadow-md transition-shadow hover:shadow-lg">
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-4">{feature.icon}</div>
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-center text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
