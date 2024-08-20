import React from "react";
import { string } from "zod";
import { CalendarCheck2, ListTodo } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

interface StatusCardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
}

export default function StatCard({ type, count = 0, label, icon }: StatusCardProps) {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image src={icon} width={32} height={32} alt="icon" />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
}
