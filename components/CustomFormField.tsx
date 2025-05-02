"use client";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

export enum FormFieldType {
	input = "input",
	// TEXTAREA = "textarea",
	// PHONE_INPUT = "phoneInput",
	checkbox = "checkbox",
}
interface CustomProps {
	control: Control<any>;
	name: string;
	label?: string;
	type?: string;
	inputMode?: string;
	placeholder?: string;
	pattern?: string;
	iconSrc?: any;
	isPasswordField?: boolean;
	handleShowPassword?: any;
	showTimeSelect?: boolean;
	children?: React.ReactNode;
	renderSkeleton?: (field: any) => React.ReactNode;
	fieldType: FormFieldType;
}

const RenderInput = ({ props, field }: { props: CustomProps; field: any }) => {
	switch (props.fieldType) {
		case FormFieldType.input:
			return (
				<div className="relative">
					{props.isPasswordField === true ? (
						<button
							type="button"
							onClick={props.handleShowPassword}
							className="absolute top-3 left-2 text-slate-500 cursor-pointer"
						>
							{props.iconSrc}
						</button>
					) : (
						<span className="absolute top-3 left-2 text-slate-500">
							{props.iconSrc}
						</span>
					)}
					<FormControl>
						<Input
							type={props.type}
							placeholder={props.placeholder}
							{...field}
							inputMode={props.inputMode}
							className="shad-input border-1 pl-8"
						/>
					</FormControl>
				</div>
			);
	}
};

const CustomFormField = (props: CustomProps) => {
	const { control, label } = props;
	return (
		<main>
			<FormField
				control={control}
				name="name"
				render={({ field }) => (
					<FormItem>
						{props.fieldType !== FormFieldType.checkbox && label && (
							<FormLabel className="shad-input-label font-inter text-sm text-gray-300 font-semibold">
								{label}
							</FormLabel>
						)}
						<RenderInput field={FormFieldType} props={props} /> <FormMessage />
					</FormItem>
				)}
			/>
		</main>
	);
};

export default CustomFormField;
