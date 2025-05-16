import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getCurrentStudent,
	UpdateStudentInfo,
} from "../actions/Student.actions";

type initialType = {
	isLoading: boolean;
	message: string;
	isSuccess: boolean;
	student: any | null;
};

const initialState: initialType = {
	isLoading: false,
	message: "",
	isSuccess: false,
	student: null,
};

// store function to get the current user
export const getCurrentUser = createAsyncThunk(
	"student/currentUser",
	async (userID: string, thunkAPI: any) => {
		try {
			const user: any = await getCurrentStudent(userID);
			if (user) {
				const student = {
					email: user.Email,
					matricNumber: user.MatricNumber,
				};
				console.log(student);
				return student;
			}
			return null;
		} catch (error) {
			console.log(error);
		}
	}
);

// store function to get the current user
export const UpdateUser = createAsyncThunk(
	"student/updateUser",
	async (DataToUpdate: any, thunkAPI: any) => {
		try {
			const data: any = await UpdateStudentInfo(DataToUpdate);
			if (data) {
				return data;
			}
			return null;
		} catch (error) {
			console.log(error);
		}
	}
);
export const StudentSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		reset: (state) => {
			state.message = "";
			state.isLoading = false;
		},
	},
	extraReducers: (builders) => {
		builders
			.addCase(getCurrentUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.student = action.payload;
			})
			.addCase(getCurrentUser.rejected, (state) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.student = null;
			});
	},
});

export const { reset } = StudentSlice.actions;

export default StudentSlice.reducer;
