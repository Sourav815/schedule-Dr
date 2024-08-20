import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patients.action";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[800px] py-10 flex-1 flex-col">
          <Image
            src="/assets/Logo.jpg"
            height={1000}
            width={1000}
            className="mb-8 h-10 w-fit rounded-md"
            alt="logo"
          />
          <RegisterForm user={user} />
            <p className="copyright py-12 text-dark-600 text-center">
              © 2024 HealthCare
            </p>
        </div>
      </section>
      <Image
        src="/assets/PatientImage.jpg"
        height={1000}
        width={1000}
        className="side-img max-w-[30%]"
        alt="PatientImage"
      />
    </div>
  );
};

export default Register;
