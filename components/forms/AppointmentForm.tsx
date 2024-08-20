"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { physician } from "@/constant";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { getAppointmentSchema } from "../../lib/userValidation";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";

export const AppointmentForm = ({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  type: string;
  userId: string;
  patientId: string;
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  let buttonLabel, classname;
  switch (type) {
    case "create": {
      buttonLabel = "Book an appointment 🫡";
      classname = "bg-green-800";
      break;
    }
    case "cancel": {
      buttonLabel = "Cancel appointment 😡";
      classname = "bg-red-800";
      break;
    }
    case "schedule": {
      buttonLabel = "Schedule an appointment ⌚";
      classname = "bg-green-700";
      break;
    }
    default:
      break;
  }

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);
    let status;
    switch (type) {
      case "cancel": {
        status = "cancelled";
        break;
      }
      case "schedule": {
        status = "scheduled";
        break;
      }
      default:
        status = "pending";
    }
    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason!,
          note: values.note,
          schedule: new Date(values.schedule),
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);
        console.log(appointment);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };
        // const updatedAppointment = await updateAppointment(appointmentToUpdate);
        // if (updatedAppointment) {
        //   setOpen && setOpen(false);
        //   form.reset();
        // }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type !== "cancel" && (
          <>
            <section className="mb-12 space-y-4">
              <h1 className="header">Book an Appointment. 📆</h1>
              <p className="text-dark-700">
                Fill all the details to schedule visit date.
              </p>
            </section>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a physician"
            >
              {physician.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-6">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      height={24}
                      width={24}
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <div className="flex flex-col xl:flex-row gap-4">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="e.g. Bone pain regularly"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Additional notes"
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Choose an appointment date"
            />
          </>
        )}
        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason For Cancelation"
          />
        )}
        <SubmitButton isLoading={isLoading}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
  );
};
