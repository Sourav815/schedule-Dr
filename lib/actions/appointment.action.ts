"use server";

import { stringify } from "querystring";
import {
  APPOINTMENT_COLLECTION_ID,
  databases,
  DATEBASE_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATEBASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATEBASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATEBASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelCount: 0,
    };
    const count = appointments.documents.reduce((total, appointment) => {
      if (appointment.status === "scheduled") {
        total.scheduleCount++;
      } else if (appointment.status === "pending") {
        total.pendingCount++;
      } else if (appointment.status === "cancelled") {
        total.cancelCount++;
      }
      return total;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...count,
      document: appointments.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  userId,
  appointmentId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATEBASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updatedAppointment) {
      throw new Error("Appointment data not found!");
    }
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};
