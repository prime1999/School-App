import { Account, Databases, ID } from "appwrite";
import client from "../appwrite.config";
import { DBID, STUDENTID } from "@/contants/env.file";

const account = new Account(client);

const databases = new Databases(client);

// appwrite function to add a user to appwrite auth
export const createAppwriteUser = async (userData: any) => {
	try {
		// create a user auth on Appwrite
		const user = await account.create(
			ID.unique(),
			//userData.matricNumber,
			userData.email,
			userData.password
		);
		if (user) {
			// create a session for the user
			await createuserAppwriteSession(userData);
			// create the user document in the DB
			const userDoc = await createAppwriteuserDocument({
				MatricNumber: userData.MatricNumber.toString(),
				Email: userData.email,
			});

			return userDoc;
		}
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

// function to create a session for a created user on Appwrite
export const createuserAppwriteSession = async (userdata: any) => {
	try {
		const res = await account.createEmailPasswordSession(
			userdata.email,
			userdata.password
		);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// function to create the user document in appwrite collection
export const createAppwriteuserDocument = async (userDocData: any) => {
	try {
		console.log(JSON.stringify({ ...userDocData }));
		// create the document for the student created with the (email & matric-number)
		const userDoc = await databases.createDocument(
			DBID,
			STUDENTID,
			ID.unique(),
			JSON.stringify({ ...userDocData })
		);

		return userDoc;
	} catch (error) {
		console.log(error);
		return error;
	}
};

// function to get a student based on the id from the appwrite collection
export const getCurrentStudent = async (userID: string) => {
	try {
		// get the student from the DB
		const currentStudent = await databases.getDocument(DBID, STUDENTID, userID);
		return currentStudent;
	} catch (error) {
		console.log(error);
	}
};

// function to update the student info on appwrite
export const UpdateStudentInfo = async (DataToUpdate: any) => {
	try {
		const { docId, ...data } = DataToUpdate;
		const resData = await databases.updateDocument(
			DBID,
			STUDENTID,
			docId,
			data
		);
	} catch (error) {
		console.log(error);
	}
};
