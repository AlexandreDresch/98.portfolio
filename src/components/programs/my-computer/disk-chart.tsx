"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { condition: "Free", size: 5335.04, fill: "#FFFFFF" },
  { condition: "Used", size: 755, fill: "#c0c0c0" },
];

const chartConfig = {
  free: {
    label: "Free",
    color: "#FFFFFF",
  },
  used: {
    label: "Used",
    color: "#c0c0c0",
  },
} satisfies ChartConfig;

export function DiskChart() {
  return (
    <Card className="flex flex-col border-none shadow-none mt-8">
      <CardContent className="rounded-full border border-border flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} formatter={(value) => [`${value} MB`, "Size"]} />
            <Pie data={chartData} dataKey="size" nameKey="condition" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
