import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Ghost } from "lucide-react";
import { AppointmentForm } from "./forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
}: {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className={`capitalize && ${
              type === "schedule" &&
              "text-white-500 bg-green-700 rounded-full hover:text-white hover:bg-slate-900 mx-2"
            } ${
              type === "cancel" &&
              "text-white-500 bg-red-700 rounded-full hover:text-white hover:bg-slate-900 mx-2"
            }`}
          >
            {type}
          </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog ">
          <DialogHeader className="mb-4 space-y-3">
            <DialogTitle className="capitalize">
              {type} appointement
            </DialogTitle>
            <DialogDescription>
              Plase Fill the following details to {type} appointment
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm
            type={type}
            userId={userId}
            patientId={patientId}
            appointment={appointment}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentModal;
