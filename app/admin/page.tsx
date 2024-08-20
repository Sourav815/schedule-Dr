import StatCard from "@/components/StatCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CalendarCheck2, Columns } from "lucide-react";
import { getRecentAppointments } from "@/lib/actions/appointment.action";
import {DataTable} from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";


export default async function Admin() {
  const appointments = await getRecentAppointments();
  console.log(appointments.document)
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/">
          <Image
            src="/assets/HealthCare.png"
            width={100}
            height={100}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Schedule your patients</p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduleCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelCount}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments.document} />
      </main>
    </div>
  );
}
