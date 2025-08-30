import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/guest/main-layout';
import { ArrowRight, BarChart3, Brain, CheckCircle, Droplets, Target, Zap } from 'lucide-react';

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

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="px-4 py-20">
                <div className="container mx-auto text-center">
                    <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">🚀 Teknologi AI Terdepan untuk Hidroponik</Badge>
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

            {/* Importance of Hydroponics Nutrition */}
            <section className="bg-white/50 px-4 py-16">
                <div className="container mx-auto">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-gray-900">Parameter Penting dalam Sistem Hidroponik</h2>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                Keberhasilan budidaya hidroponik bergantung pada pengelolaan parameter yang tepat. Monitoring yang cermat terhadap
                                kondisi lingkungan sangat menentukan kesehatan tanaman dan hasil panen.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">pH Air (5.5 - 6.5)</h3>
                                        <p className="text-gray-600">Memastikan tingkat keasaman optimal untuk penyerapan nutrisi</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">PPM (500-1500)</h3>
                                        <p className="text-gray-600">Mengukur konsentrasi nutrisi dalam larutan untuk pertumbuhan optimal</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Ketinggian Air</h3>
                                        <p className="text-gray-600">Mengatur level air sesuai sistem dan fase pertumbuhan tanaman</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Monitoring Gejala</h3>
                                        <p className="text-gray-600">Mendeteksi dini gejala kekurangan nutrisi atau penyakit</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Umur Panen</h3>
                                        <p className="text-gray-600">Menentukan waktu panen optimal berdasarkan jenis tanaman</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 p-8 text-white">
                                <Droplets className="mb-4 h-16 w-16 opacity-80" />
                                <h3 className="mb-4 text-2xl font-bold">Kontrol Parameter Kunci</h3>
                                <p className="text-green-100">
                                    Sistem kami memonitor secara real-time parameter kritikal hidroponik: pH air, tingkat PPM, ketinggian air, gejala
                                    tanaman, dan prediksi umur panen. Dengan teknologi canggih, tanaman mendapatkan kondisi optimal untuk pertumbuhan
                                    maksimal dan hasil panen yang berkualitas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* How AI Works */}
            <section id="how-it-works" className="px-4 py-16">
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
            <section id="features" className="bg-gray-50 px-4 py-16">
                <div className="container mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Fitur Unggulan Sistem</h2>
                        <p className="text-xl text-gray-600">
                            Dilengkapi dengan teknologi terdepan untuk memberikan pengalaman terbaik dalam pengelolaan nutrisi hidroponik.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-0 bg-white transition-shadow hover:shadow-lg">
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
