"use client";

import {
  Car,
  Wrench,
  Gauge,
  Disc,
  Settings,
  Filter,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function CategoriesMenu() {
  const iconStroke = 2.5;
  const iconSize = 20;

  const categories = [
    { label: "CATEGORIAS", icon: Car },
    { label: "SUSPENSÃO", icon: Wrench },
    { label: "MOTOR", icon: Gauge },
    { label: "DIREÇÃO", icon: Settings },
    { label: "FREIO", icon: Disc },
    { label: "TRANSMISSÃO", icon: Settings },
    { label: "FILTROS", icon: Filter },
    { label: "IGINIÇÃO", icon: Sparkles },
  ];

  return (
    <div className="w-full bg-gray-800 shadow-md flex justify-center border-t border-gray-700">
      <div className="flex gap-16 py-3">
        {categories.map((cat, index) => {
          const Icon = cat.icon;

          return (
            <Link
              key={index}
              href={`/categoria/${cat.label
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/ /g, "-")}`}
              className="flex items-center gap-2 px-2 py-2 text-white hover:text-yellow-600 transition"
            >
              <Icon size={iconSize} strokeWidth={iconStroke} />
              <span className="text-sm font-semibold">{cat.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}