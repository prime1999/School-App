export const StudenFormSchema = z.object({
	MatricNumber: z.coerce
		.number({
			required_error: "Matric number is required",
		})
		.min(100000, "Invalid Matric Number")
		.max(999999, "Invalid Matric Number"),
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters"),
	email: z.string().email("Invalid email address"),
	phone: z
		.string()
		.refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
	gender: z.enum(["Male", "Female"]),

	faculty: z.string().min(2, "Invalid Faculty").max(500, "Invalid Faculty"),
	department: z
		.string()
		.min(2, "Invalid department")
		.max(500, "Invalid department"),
	school: z.string().min(2, "Invalid school").max(500, "Invalid school"),
	level: z.number().min(100, "Invalid Level").max(999, "Invalid Level"),
});

export const CreateUserSchema = z.object({
	MatricNumber: z.coerce
		.number({
			required_error: "Matric number is required",
		})
		.min(100000, "Invalid Matric Number")
		.max(999999, "Invalid Matric Number"),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
			message: "Password must contain letters and at least one number",
		}),
});
