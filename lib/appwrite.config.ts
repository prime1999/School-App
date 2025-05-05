import { ENDPOINT, PROJECTID } from "@/contants/env.file";
import { Client } from "appwrite";

// export const {
// 	NEXT_PUBLIC_APPWRITE_PROJECT_ID,
// 	APPWRITE_API_KEY,
// 	APPWRITE_DATABASE_ID,
// 	STUDENT_COLLECTION_ID,
// 	NOTE_COLLECTION_ID,
// 	TIME_TABLE_COLLECTION_ID,
// 	EXAM_SCHEDULE_COLLECTION_ID,
// } = process.env;

const client = new Client();

client.setEndpoint(ENDPOINT).setProject(PROJECTID);

export default client;
