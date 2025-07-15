import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  status: "normal" | "warning";
  trend: "up" | "down" | "stable";
  trendValue?: string;
}

const MetricCard = ({
  title = "Metric",
  value = 0,
  unit = "",
  status = "normal",
  trend = "stable",
  trendValue = "0%",
}: MetricCardProps) => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-semibold">{value}</h3>
              <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
            </div>
            <div className="flex items-center mt-2">
              {trend === "up" && (
                <ArrowUpIcon className="h-3 w-3 text-emerald-500 mr-1" />
              )}
              {trend === "down" && (
                <ArrowDownIcon className="h-3 w-3 text-rose-500 mr-1" />
              )}
              <span className="text-xs text-muted-foreground">
                {trendValue}
              </span>
            </div>
          </div>
          <Badge
            variant={status === "normal" ? "secondary" : "destructive"}
            className="ml-auto"
          >
            {status === "normal" ? (
              <CheckCircleIcon className="h-3 w-3 mr-1" />
            ) : (
              <AlertCircleIcon className="h-3 w-3 mr-1" />
            )}
            {status === "normal" ? "Normal" : "Warning"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricCardsProps {
  metrics?: {
    ph: MetricCardProps;
    nutrientConcentration: MetricCardProps;
    waterTemperature: MetricCardProps;
    systemStatus: MetricCardProps;
  };
}

const MetricCards = ({ metrics }: MetricCardsProps) => {
  const defaultMetrics = {
    ph: {
      title: "pH Level",
      value: 6.2,
      unit: "pH",
      status: "normal" as const,
      trend: "stable" as const,
      trendValue: "Stable",
    },
    nutrientConcentration: {
      title: "Nutrient Concentration",
      value: 850,
      unit: "ppm",
      status: "normal" as const,
      trend: "up" as const,
      trendValue: "+2.5%",
    },
    waterTemperature: {
      title: "Water Temperature",
      value: 22.5,
      unit: "°C",
      status: "warning" as const,
      trend: "up" as const,
      trendValue: "+0.8°C",
    },
    systemStatus: {
      title: "System Status",
      value: "Active",
      unit: "",
      status: "normal" as const,
      trend: "stable" as const,
      trendValue: "Online 24h",
    },
  };

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="bg-background p-4 rounded-lg">
      <h2 className="text-lg font-medium mb-4">System Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard {...displayMetrics.ph} />
        <MetricCard {...displayMetrics.nutrientConcentration} />
        <MetricCard {...displayMetrics.waterTemperature} />
        <MetricCard {...displayMetrics.systemStatus} />
      </div>
    </div>
  );
};

export default MetricCards;
