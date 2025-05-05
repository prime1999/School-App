import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAppwriteUser } from "../actions/Student.actions";

type initType = {
	student: any | null;
	isLoading: boolean;
	isAuthenticated: any;
	theme?: string;
	message: string;
};

// Retrieve and parse the student log in status from localStorage
// const studentStatus = localStorage?.getItem("studentStatus");
// const currentStudentData: any = studentStatus
// 	? JSON.parse(studentStatus)
// 	: {
// 			isAuthenticated: false,
// 			student: null,
// 			// theme: theme ? theme : "light",
// 	  };

// declare initial state data
const initialState: initType = {
	student: null,
	isLoading: false,
	isAuthenticated: false,
	//theme: currentStudentData.theme,
	message: "",
};

export const createUser = createAsyncThunk(
	"auth/createStudent",
	async (userData: any, thunkAPI) => {
		try {
			console.log({ slice: "slice", userData });
			const studentRes: any = await createAppwriteUser(userData);
			console.log(studentRes);
			if (studentRes.$id) {
				const student = {
					id: studentRes.$id,
					email: studentRes.email,
					MatricNumber: studentRes.MatricNumber,
				};
				return {
					isAuthenticated: true,
					student,
				};
			}
			return { isAuthenticated: false, student: null };
		} catch (error) {
			console.log(error);
			return error;
		}
	}
);

export const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.message = "";
			state.isLoading = false;
		},
	},
	extraReducers: (builders) => {
		builders
			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createUser.fulfilled, (state, action: any) => {
				state.isLoading = false;
				state.isAuthenticated = action.payload.isAuthenticated as any;
				state.student = action.payload.student;
			})
			.addCase(createUser.rejected, (state, action: any) => {
				state.isLoading = false;
				state.student = action.payload.student;
				state.isAuthenticated = action.payload.isAuthenticated;
			});
	},
});

export const { reset } = AuthSlice.actions;

export default AuthSlice.reducer;
