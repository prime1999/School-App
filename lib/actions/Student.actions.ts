import { Account, Databases, ID } from "appwrite";
import client from "../appwrite.config";
import { DBID, STUDENTID } from "@/contants/env.file";

const account = new Account(client);

const databases = new Databases(client);

// appwrite function to add a user to appwrite auth
export const createAppwriteUser = async (userData: any) => {
	try {
		console.log(userData);
		// create a user auth on Appwrite
		const user = await account.create(
			ID.unique(),
			//userData.matricNumber,
			userData.email,
			userData.password
		);
		const userDoc = await createAppwriteuserDocument({
			MatricNumber: userData.MatricNumber.toString(),
			Email: userData.email,
		});
		return userDoc;
	} catch (error) {
		// check if the error is a user already exist error
		if (error && error === 409) {
			console.log(error);
			return { error: "User already exists" };
		}
		// else if any other error
		console.log(error);
		return "An error occurred when creatin user, please try again";
	}
};

// function to create the user document in appwrite collection
export const createAppwriteuserDocument = async (userDocData: any) => {
	try {
		// create the document for the student created with the (email & matric-number)
		const userDoc = await databases.createDocument(
			DBID,
			STUDENTID,
			ID.unique(),
			JSON.stringify({ ...userDocData })
		);
		console.log(userDoc);
		return userDoc;
	} catch (error) {
		console.log(error);
		return error;
	}
};

// function to get a student based on the id from the appwrite collection
export const getCurrentStudent = async (userID: string) => {
	try {
		console.log(userID);
		// get the student from the DB
		const currentStudent = await databases.getDocument(DBID, STUDENTID, userID);
		console.log(currentStudent);
		return currentStudent;
	} catch (error) {
		console.log(error);
	}
};
