import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircleIcon, ArrowDownIcon, ArrowUpIcon, CheckCircleIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    unit: string;
    status: 'normal' | 'warning';
    trend: 'up' | 'down' | 'stable';
    trendValue?: string;
}

const KPICard = ({ title = 'Metric', value = 0, unit = '', status = 'normal', trend = 'stable', trendValue = '0%' }: MetricCardProps) => {
    return (
        <Card className="bg-white shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-3">
                <div className="flex items-center justify-between">
                        <p className="mb-1 text-lg text-muted-foreground">{title}</p>
                        <div className="flex items-baseline">
                            <h3 className="text-2xl font-semibold">{value}</h3>
                            <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
                        </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default KPICard
