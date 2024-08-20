"use server";

import { ID, Query } from "node-appwrite";
import {
  databases,
  DATEBASE_ID,
  NEXT_PUBLIC_ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
import { storage, NEXT_PULIC_BUCKET_ID } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    console.log(`newuser`)
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    
    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const userFetched = await users.get(userId);
    return parseStringify(userFetched);
  } catch (error: any) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATEBASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(patients.documents[0]);
  } catch (error: any) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(
        NEXT_PULIC_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }
    const newPatient = await databases.createDocument(
      DATEBASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PULIC_BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
