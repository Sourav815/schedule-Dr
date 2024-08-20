import Link from "next/link";

import React from "react";
import Image from "next/image";
import { getAppointment } from "@/lib/actions/appointment.action";
import { physician } from "@/constant";
import { Button } from "@/components/ui/button";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
    const doctor = physician.find(
      (doc) => doc.name === appointment.primaryPhysician
    );
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/Logo.jpg"
            height={1000}
            width={1000}
            className="h-10 w-fit"
            alt="logo"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/success.gif"
            alt="success logo"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-400">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We will be touch in short to confirm.</p>
        </section>
        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image src={doctor?.image!} alt="doctor" width={100} height={100}/>
            <p>Dr. {doctor?.name}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>New Appointment</Link>
        </Button>
      </div>
    </div>
  );
};

export default Success;
