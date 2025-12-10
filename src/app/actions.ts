"use server";

import { addDoc, collection } from "firebase/firestore";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { WaitlistFormSchema } from "@/lib/definitions";

export async function addToWaitlist(data: z.infer<typeof WaitlistFormSchema>) {
  const validatedFields = WaitlistFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid data. Please check your inputs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addDoc(collection(db, "waitlist"), {
      ...validatedFields.data,
      createdAt: new Date(),
    });

    return { success: true, message: "Successfully joined the waitlist!" };
  } catch (error) {
    console.error("Error adding to waitlist: ", error);
    return { success: false, message: "A server error occurred. Please try again later." };
  }
}
