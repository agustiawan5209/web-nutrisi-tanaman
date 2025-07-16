import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Brain,
  BarChart3,
  Users,
  CheckCircle,
  ArrowRight,
  Droplets,
  Zap,
  Target,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-green-600" />,
      title: "AI-Powered Analysis",
      description:
        "Algoritma Random Forest yang canggih menganalisis data nutrisi untuk memberikan rekomendasi yang akurat dan optimal.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Real-time Monitoring",
      description:
        "Pantau kondisi nutrisi tanaman secara real-time dengan dashboard yang intuitif dan mudah dipahami.",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Precision Agriculture",
      description:
        "Tingkatkan hasil panen dengan rekomendasi nutrisi yang tepat sasaran berdasarkan data ilmiah.",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Automated Decisions",
      description:
        "Sistem otomatis yang membantu mengambil keputusan nutrisi tanpa perlu keahlian mendalam.",
    },
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Petani Hidroponik",
      content:
        "Sistem ini sangat membantu saya dalam menentukan nutrisi yang tepat. Hasil panen meningkat 40% sejak menggunakan sistem ini.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=budi",
    },
    {
      name: "Dr. Sari Wijaya",
      role: "Ahli Pertanian",
      content:
        "Implementasi AI dalam pertanian hidroponik ini sangat inovatif. Algoritma Random Forest memberikan akurasi yang tinggi.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sari",
    },
    {
      name: "Ahmad Rizki",
      role: "Startup Agritech",
      content:
        "Dashboard yang user-friendly dan rekomendasi yang akurat membuat bisnis hidroponik kami lebih efisien dan profitable.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-800">HydroAI</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Fitur
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Testimoni
            </a>
          </nav>
          <Button className="bg-green-600 hover:bg-green-700">Coba Demo</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            🚀 Teknologi AI Terdepan untuk Hidroponik
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Sistem Pendukung Keputusan untuk
            <span className="text-green-600 block">
              Nutrisi Tanaman Hidroponik
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Menggunakan Algoritma Random Forest dan Kecerdasan Buatan untuk
            memberikan rekomendasi nutrisi yang optimal, meningkatkan hasil
            panen, dan membantu petani hidroponik mencapai efisiensi maksimal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-green-600 text-green-600 hover:bg-green-50"
            >
              Lihat Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Importance of Hydroponics Nutrition */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Mengapa Nutrisi Penting dalam Hidroponik?
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Dalam sistem hidroponik, tanaman bergantung sepenuhnya pada
                larutan nutrisi yang diberikan. Keseimbangan nutrisi yang tepat
                adalah kunci keberhasilan pertumbuhan tanaman yang optimal.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Kontrol Presisi
                    </h3>
                    <p className="text-gray-600">
                      Mengatur komposisi nutrisi dengan akurasi tinggi
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Efisiensi Maksimal
                    </h3>
                    <p className="text-gray-600">
                      Mengurangi pemborosan dan meningkatkan hasil panen
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Kualitas Terjamin
                    </h3>
                    <p className="text-gray-600">
                      Menghasilkan tanaman dengan kualitas dan nutrisi terbaik
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-white">
                <Droplets className="h-16 w-16 mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Nutrisi Optimal</h3>
                <p className="text-green-100">
                  Sistem kami memastikan setiap tanaman mendapatkan nutrisi yang
                  tepat pada waktu yang tepat, menghasilkan pertumbuhan yang
                  sehat dan produktivitas maksimal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How AI Works */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bagaimana AI dan Random Forest Bekerja?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sistem kami menggunakan algoritma Random Forest yang canggih untuk
              menganalisis berbagai parameter dan memberikan rekomendasi nutrisi
              yang akurat berdasarkan data historis dan kondisi real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">
                  1. Pengumpulan Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sistem mengumpulkan data dari sensor pH, EC, suhu, kelembaban,
                  dan parameter lingkungan lainnya secara real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">2. Analisis AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Algoritma Random Forest menganalisis pola data historis dan
                  kondisi saat ini untuk memprediksi kebutuhan nutrisi optimal.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">
                  3. Rekomendasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sistem memberikan rekomendasi nutrisi yang spesifik dan
                  actionable untuk mengoptimalkan pertumbuhan tanaman.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fitur Unggulan Sistem
            </h2>
            <p className="text-xl text-gray-600">
              Dilengkapi dengan teknologi terdepan untuk memberikan pengalaman
              terbaik dalam pengelolaan nutrisi hidroponik.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow border-0 bg-white"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Apa Kata Pengguna Kami?
            </h2>
            <p className="text-xl text-gray-600">
              Ribuan petani dan praktisi hidroponik telah merasakan manfaat
              sistem kami.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Meningkatkan Hasil Panen Hidroponik Anda?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan petani yang telah merasakan manfaat
            teknologi AI dalam pertanian hidroponik. Mulai perjalanan Anda
            menuju pertanian yang lebih cerdas dan efisien.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Mulai Uji Coba Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white/10"
            >
              Hubungi Tim Kami
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-green-400" />
                <span className="text-xl font-bold">HydroAI</span>
              </div>
              <p className="text-gray-400">
                Sistem pendukung keputusan berbasis AI untuk nutrisi tanaman
                hidroponik yang optimal.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produk</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Dukungan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dokumentasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Karir
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HydroAI. Semua hak dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
