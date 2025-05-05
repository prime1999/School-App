"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "@/lib/utils/SubmitButton";
import { StudenFormSchema } from "@/lib/types";

const StudentForm = () => {
	return <main>StudentForm</main>;
};

export default StudentForm;
