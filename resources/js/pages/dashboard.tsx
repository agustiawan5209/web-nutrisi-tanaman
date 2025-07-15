import AlertNotifications from '@/components/dashboard/AlertNotifications';
import MetricCards from '@/components/dashboard/MetricCards';
import NutrientChart from '@/components/dashboard/NutrientChart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold text-foreground">Hydroponic Dashboard</h1>
                    <p className="mt-1 text-muted-foreground">Monitor and maintain optimal growing conditions</p>
                </header>

                {/* Metric Cards */}
                <section className="mb-8">
                    <MetricCards />
                </section>

                {/* Main Chart */}
                <section className="mb-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-medium text-foreground">Nutrient Trends</h2>
                        <div className="flex space-x-2">
                            <select
                                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none"
                                defaultValue="7d"
                            >
                                <option value="24h">Last 24 hours</option>
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="90d">Last 90 days</option>
                            </select>
                        </div>
                    </div>
                    <NutrientChart />
                </section>

                {/* Alert Notifications */}
                <section>
                    <h2 className="mb-4 text-xl font-medium text-foreground">System Alerts</h2>
                    <AlertNotifications />
                </section>
            </div>
        </AppLayout>
    );
}
