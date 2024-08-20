import Image from "next/image";
import { PatientForm } from "@/components/forms/PatientForm";
import Link from "next/link";
import PasskeyModel from "@/components/PasskeyModel";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModel />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/Logo.jpg"
            height={1000}
            width={1000}
            className="mb-8 h-10 w-fit rounded-md"
            alt="logo"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between ">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 HealthCare
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/PatientImage.jpg"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
        alt="PatientImage"
      />
    </div>
  );
}
