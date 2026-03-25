"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ValueEntry {
  date: string;
  value: number;
  source: string | null;
}

interface ValueChartProps {
  valueHistory: ValueEntry[];
  currentValue: number | null;
  purchasePrice: number | null;
}

const DEMO_DATA = [
  { date: "2020", value: 380000 },
  { date: "2021", value: 420000 },
  { date: "2022", value: 460000 },
  { date: "2023", value: 445000 },
  { date: "2024", value: 470000 },
  { date: "2025", value: 485000 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl shadow-card p-3">
        <p className="text-xs text-slate-500 mb-1">{label}</p>
        <p className="font-heading font-bold text-navy">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
}

export function ValueChart({
  valueHistory,
  currentValue,
  purchasePrice,
}: ValueChartProps) {
  const data =
    valueHistory.length > 0
      ? valueHistory.map((v) => ({
          date: new Date(v.date).getFullYear().toString(),
          value: v.value,
        }))
      : DEMO_DATA;

  const latestValue = currentValue ?? data[data.length - 1]?.value ?? 0;
  const firstValue = purchasePrice ?? data[0]?.value ?? 0;
  const change = latestValue - firstValue;
  const changePercent = firstValue > 0 ? (change / firstValue) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <div className="space-y-6">
      {/* Value summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-slate-500 mb-1">Current Value</p>
            <p className="font-heading text-2xl font-bold text-navy">
              {formatCurrency(latestValue)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-slate-500 mb-1">Purchase Price</p>
            <p className="font-heading text-2xl font-bold text-navy">
              {firstValue > 0 ? formatCurrency(firstValue) : "—"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-slate-500 mb-1">Value Change</p>
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-teal" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <p
                className={`font-heading text-2xl font-bold ${
                  isPositive ? "text-teal" : "text-red-500"
                }`}
              >
                {isPositive ? "+" : ""}
                {changePercent.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Estimated Value Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {valueHistory.length === 0 && (
            <p className="text-xs text-slate-400 mb-4 italic">
              Showing demo data — add value history entries to see real data
            </p>
          )}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E5FAD" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                width={55}
              />
              <Tooltip content={<CustomTooltip />} />
              {purchasePrice && (
                <ReferenceLine
                  y={purchasePrice}
                  stroke="#F59E0B"
                  strokeDasharray="4 4"
                  label={{ value: "Purchase", fill: "#F59E0B", fontSize: 11 }}
                />
              )}
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1E5FAD"
                strokeWidth={2.5}
                fill="url(#valueGradient)"
                dot={{ fill: "#1E5FAD", strokeWidth: 2, r: 4 }}
                activeDot={{ fill: "#0D9488", strokeWidth: 2, r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
