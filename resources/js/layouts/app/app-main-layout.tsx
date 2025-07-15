import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MetricCards from "@/components/dashboard/MetricCards";
import NutrientChart from "@/components/dashboard/NutrientChart";
import AlertNotifications from "@/components/dashboard/AlertNotifications";

const Home = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground">
              Hydroponic Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and maintain optimal growing conditions
            </p>
          </header>

          {/* Metric Cards */}
          <section className="mb-8">
            <MetricCards />
          </section>

          {/* Main Chart */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-foreground">
                Nutrient Trends
              </h2>
              <div className="flex space-x-2">
                <select
                  className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
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
            <h2 className="text-xl font-medium text-foreground mb-4">
              System Alerts
            </h2>
            <AlertNotifications />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
