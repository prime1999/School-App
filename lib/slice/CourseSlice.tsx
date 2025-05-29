import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCourse } from "../actions/Course.action";

type initialType = {
	isLoading: boolean;
	message: string;
	isSuccess: boolean;
};

const initialState: initialType = {
	isLoading: false,
	message: "",
	isSuccess: false,
};

// function to reister a course
export const registerCourse = createAsyncThunk(
	"course/registerCourse",
	async (courseData: any, thunkAPI: any) => {
		try {
			const response = await addCourse(courseData);
			if (response) {
				console.log(response);
				return response;
			}
		} catch (error) {
			console.log(error);
		}
	}
);

export const CourseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {
		reset: (state) => {
			state.message = "";
			state.isLoading = false;
		},
	},
	extraReducers: (builders) => {
		builders
			.addCase(registerCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerCourse.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(registerCourse.rejected, (state) => {
				state.isLoading = false;
				state.isSuccess = false;
			});
	},
});

export const { reset } = CourseSlice.actions;

export default CourseSlice.reducer;
