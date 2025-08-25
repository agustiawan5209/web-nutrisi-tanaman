import KPICard from '@/components/dashboard/KPICard';
import AppLayout from '@/layouts/app-layout';
import { LabelTypes, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
export default function Dashboard({jenisTanaman, kriteria, dataset, riwayat }: GuestDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold text-foreground">Hydroponic Dashboard</h1>
                    <p className="mt-1 text-muted-foreground">Monitor and maintain optimal growing conditions</p>
                </header>

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
            </div>
        </AppLayout>
    );
}
