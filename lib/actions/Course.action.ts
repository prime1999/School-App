import { Account, Databases, ID, Query } from "appwrite";
import client from "../appwrite.config";
import {
	DBID,
	STUDENTID,
	TIME_TABLE_ID,
	COURSES_ID,
	USER_COURSE_ID,
} from "@/contants/env.file";

const account = new Account(client);

const databases = new Databases(client);

// function to register a course on appwrite
export const addCourse = async (courseData: any) => {
	try {
		console.log(courseData);
		const course = {
			CourseCode: courseData.courseCode,
			CourseTitle: courseData.courseTitle,
			unit: courseData.unit.toString(),
			venue: courseData.venue,
			lecturer: courseData.lecturer,
			schedule: JSON.stringify(courseData.schedule),
		};
		const courseRes = await databases.createDocument(
			DBID,
			COURSES_ID,
			ID.unique(),
			course
		);
		console.log(courseRes);
		const userCourseRes = await databases.createDocument(
			DBID,
			USER_COURSE_ID,
			ID.unique(),
			{ userId: courseData.userId, courseId: courseRes.$id }
		);
		console.log(userCourseRes);
		return userCourseRes;
	} catch (error) {
		console.log(error);
	}
};
