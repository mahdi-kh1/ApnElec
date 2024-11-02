"use client";

import { Card, CardBody } from "@nextui-org/react";
import { Activity, Users, DollarSign, Package } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: <DollarSign className="h-5 w-5" />,
      change: "+20.1%",
    },
    {
      title: "Active Users",
      value: "2,345",
      icon: <Users className="h-5 w-5" />,
      change: "+15.1%",
    },
    {
      title: "Active Projects",
      value: "12",
      icon: <Package className="h-5 w-5" />,
      change: "+2.1%",
    },
    {
      title: "Conversion Rate",
      value: "4.35%",
      icon: <Activity className="h-5 w-5" />,
      change: "+1.2%",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-default-500">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-semibold">{stat.value}</h3>
                  <span className="text-xs text-success">{stat.change}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}