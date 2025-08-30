import KPICard from '@/components/dashboard/KPICard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UserAuthLayout from '@/layouts/guest/user-auth-layout';
import { LabelTypes, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface GuestDashboardProps {
   jenisTanaman: number;
    kriteria: number;
    dataset: number;
    riwayat: number;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'GuestDashboard',
        href: '/dashboard',
    },
];

export default function GuestDashboard({ jenisTanaman, kriteria, dataset, riwayat }: GuestDashboardProps) {
    return (
        <UserAuthLayout>
            <Head title="Dashboard" />
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold text-foreground">Hydroponic Dashboard</h1>
                    <p className="mt-1 text-muted-foreground">Monitor and maintain optimal growing conditions</p>
                </header>

                {/* Metric Cards */}
                  {/* Metric Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <KPICard
                        title={`Jumlah Jenis Tanaman`}
                        value={jenisTanaman}
                        unit={'data'}
                        status="normal"
                        trend="stable"
                    />
                    <KPICard
                        title={`Jumlah Kriteria`}
                        value={kriteria}
                        unit={'data'}
                        status="normal"
                        trend="stable"
                    />
                    <KPICard
                        title={`Jumlah Dataset`}
                        value={dataset}
                        unit={'data'}
                        status="normal"
                        trend="stable"
                    />
                    <KPICard
                        title={`Jumlah Riwayat Klasifikasi`}
                        value={riwayat}
                        unit={'data'}
                        status="normal"
                        trend="stable"
                    />
                </div>
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
                            <Link href={route('guest.klasifikasi.index')}>
                                <Button size="lg" className="bg-green-600 px-8 py-3 text-lg hover:bg-green-700">
                                    Mulai Sekarang
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </UserAuthLayout>
    );
}
