"use client";

import { useState } from "react";
import { DollarSign, Zap, Cloud, ChevronDown } from "lucide-react";
import { CalculationResult } from "@/types";
import { cloudBaselines } from "@/data/benchmarks";

interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  electricityRate: number; // per kWh in local currency
  exchangeRate: number;    // 1 USD = X local currency
  decimals: number;        // decimal places for display
}

const currencies: Currency[] = [
  { code: "USD", symbol: "$",    name: "US Dollar",         flag: "🇺🇸", electricityRate: 0.12,  exchangeRate: 1,      decimals: 2 },
  { code: "EUR", symbol: "€",    name: "Euro",              flag: "🇪🇺", electricityRate: 0.25,  exchangeRate: 0.92,   decimals: 2 },
  { code: "GBP", symbol: "£",    name: "British Pound",     flag: "🇬🇧", electricityRate: 0.28,  exchangeRate: 0.79,   decimals: 2 },
  { code: "THB", symbol: "฿",    name: "Thai Baht",         flag: "🇹🇭", electricityRate: 4.15,  exchangeRate: 34.0,   decimals: 2 },
  { code: "JPY", symbol: "¥",    name: "Japanese Yen",      flag: "🇯🇵", electricityRate: 27.0,  exchangeRate: 150.0,  decimals: 0 },
  { code: "CNY", symbol: "¥",    name: "Chinese Yuan",      flag: "🇨🇳", electricityRate: 0.60,  exchangeRate: 7.25,   decimals: 2 },
  { code: "KRW", symbol: "₩",    name: "Korean Won",        flag: "🇰🇷", electricityRate: 120,   exchangeRate: 1350,   decimals: 0 },
  { code: "TWD", symbol: "NT$",  name: "Taiwan Dollar",     flag: "🇹🇼", electricityRate: 2.80,  exchangeRate: 32.0,   decimals: 2 },
  { code: "INR", symbol: "₹",    name: "Indian Rupee",      flag: "🇮🇳", electricityRate: 7.50,  exchangeRate: 84.0,   decimals: 2 },
  { code: "SGD", symbol: "S$",   name: "Singapore Dollar",  flag: "🇸🇬", electricityRate: 0.27,  exchangeRate: 1.34,   decimals: 2 },
  { code: "MYR", symbol: "RM",   name: "Malaysian Ringgit", flag: "🇲🇾", electricityRate: 0.57,  exchangeRate: 4.47,   decimals: 2 },
  { code: "AUD", symbol: "A$",   name: "Australian Dollar", flag: "🇦🇺", electricityRate: 0.30,  exchangeRate: 1.55,   decimals: 2 },
  { code: "CAD", symbol: "C$",   name: "Canadian Dollar",   flag: "🇨🇦", electricityRate: 0.13,  exchangeRate: 1.36,   decimals: 2 },
  { code: "VND", symbol: "₫",    name: "Vietnamese Dong",   flag: "🇻🇳", electricityRate: 2100,  exchangeRate: 25500,  decimals: 0 },
  { code: "IDR", symbol: "Rp",   name: "Indonesian Rupiah", flag: "🇮🇩", electricityRate: 1500,  exchangeRate: 16200,  decimals: 0 },
  { code: "PHP", symbol: "₱",    name: "Philippine Peso",   flag: "🇵🇭", electricityRate: 11.5,  exchangeRate: 56.0,   decimals: 2 },
  { code: "BRL", symbol: "R$",   name: "Brazilian Real",    flag: "🇧🇷", electricityRate: 0.65,  exchangeRate: 5.0,    decimals: 2 },
  { code: "MXN", symbol: "MX$",  name: "Mexican Peso",      flag: "🇲🇽", electricityRate: 1.80,  exchangeRate: 17.5,   decimals: 2 },
];

const USD_ELECTRICITY_RATE = 0.12;

interface Props {
  result: CalculationResult;
  modelName: string;
}

export default function CostAnalysis({ result, modelName }: Props) {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  // Convert USD electricity cost to local currency using local electricity rate
  const localElectricityCost = result.electricityCostPerHour !== undefined
    ? result.electricityCostPerHour * (currency.electricityRate / USD_ELECTRICITY_RATE)
    : undefined;

  // Convert cloud costs (USD) to local currency using exchange rate
  const localCostPer1M = result.costPer1MTokens !== undefined
    ? result.costPer1MTokens * currency.exchangeRate
    : undefined;

  function formatLocal(amount: number): string {
    if (currency.decimals === 0) {
      if (amount >= 1000000) return `${currency.symbol}${(amount / 1000000).toFixed(1)}M`;
      if (amount >= 1000) return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
      return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
    }
    if (amount < 0.001) return `${currency.symbol}${amount.toExponential(2)}`;
    if (amount < 1) return `${currency.symbol}${amount.toFixed(4)}`;
    if (amount < 100) return `${currency.symbol}${amount.toFixed(2)}`;
    if (amount < 100000) return `${currency.symbol}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
  }

  // Find relevant cloud baselines for comparison
  const relevantBaselines = cloudBaselines.filter((b) => {
    const mLower = modelName.toLowerCase();
    const bLower = b.model.toLowerCase();
    return (
      mLower.includes("llama") && bLower.includes("llama") ||
      mLower.includes("mixtral") && bLower.includes("mixtral") ||
      mLower.includes("gemma") && bLower.includes("gemma") ||
      mLower.includes("deepseek") && bLower.includes("deepseek") ||
      mLower.includes("qwen") && bLower.includes("qwen")
    );
  }).slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Cost breakdown */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-slate-400">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm font-medium">Cost Analysis</span>
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors text-xs text-slate-300"
            >
              <span>{currency.flag}</span>
              <span>{currency.code}</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            {currencyOpen && (
              <div className="absolute z-50 right-0 mt-1 w-56 max-h-64 overflow-auto rounded-xl bg-[#151520] border border-white/10 shadow-2xl">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-white/10 transition-colors flex items-center gap-2 ${
                      currency.code === c.code ? "bg-purple-500/15 text-purple-300" : "text-slate-300"
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span className="font-medium">{c.code}</span>
                    <span className="text-slate-500">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {localCostPer1M !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Cost per 1M tokens</span>
              <span className="text-xl font-bold text-green-400">
                {formatLocal(localCostPer1M)}
              </span>
            </div>
          )}
          {localElectricityCost !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <Zap className="w-3 h-3" /> Electricity cost/hr
              </span>
              <span className="text-sm text-slate-300">
                {formatLocal(localElectricityCost)}
              </span>
            </div>
          )}
          {localElectricityCost !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Electricity rate</span>
              <span className="text-xs text-slate-500">
                {currency.symbol}{currency.decimals === 0
                  ? Math.round(currency.electricityRate).toLocaleString()
                  : currency.electricityRate.toFixed(2)
                }/kWh
              </span>
            </div>
          )}
          {localCostPer1M === undefined && localElectricityCost === undefined && (
            <p className="text-slate-500 text-xs">
              Cost estimates require GPU pricing data or TDP info.
            </p>
          )}
        </div>
      </div>

      {/* Cloud comparison */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-2 text-slate-400 mb-4">
          <Cloud className="w-5 h-5" />
          <span className="text-sm font-medium">Cloud Provider Comparison</span>
        </div>

        {relevantBaselines.length > 0 ? (
          <div className="space-y-2">
            {relevantBaselines.map((b, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-slate-400">
                  {b.provider} <span className="text-slate-600">({b.model})</span>
                </span>
                <div className="text-right">
                  <span className="text-blue-300 font-medium">{b.tps} t/s</span>
                  <span className="text-slate-600 mx-1">·</span>
                  <span className="text-green-400">
                    {formatLocal(b.costPer1MTokens * currency.exchangeRate)}/1M
                  </span>
                </div>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium">Your setup</span>
              <div className="text-right">
                <span className="text-blue-300 font-medium">{result.tps.toFixed(1)} t/s</span>
                {localCostPer1M !== undefined && (
                  <>
                    <span className="text-slate-600 mx-1">·</span>
                    <span className="text-green-400">{formatLocal(localCostPer1M)}/1M</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">
            No direct cloud baselines available for this model family. Try Llama, DeepSeek, Qwen, Mixtral, or Gemma models to see cloud comparisons.
          </p>
        )}
      </div>
    </div>
  );
}
