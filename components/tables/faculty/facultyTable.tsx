"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { TimeTable } from "@/contants/Timetable";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getFacultyTable } from "@/lib/slice/StudentSlice";

const FacultyTable = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [table, setTable] = useState<any>([]);

	const pathname = usePathname();
	// get the pathname from the current url
	const paths = pathname.split("/");

	useEffect(() => {
		const getTableData = async () => {
			try {
				const res: any = await dispatch(getFacultyTable(paths[2])).unwrap();
				console.log(res);
				console.log(res.documents[0].table);
				const table = JSON.parse(JSON.parse(res.documents[0].table));
				console.log(table);
				const data = table.map((slot: any) => ({
					time: slot.time,
					Monday: slot.Monday,
					Tuesday: slot.Tuesday,
					Wednesday: slot.Wednesday,
					Thursday: slot.Thursday,
					Friday: slot.Friday,
				}));
				console.log(data);
				setTable(data);
			} catch (error) {
				console.log(error);
			}
		};
		getTableData();
	}, []);
	return (
		<main className="mb-8 pb-16">
			<DataTable columns={columns} data={table} />
		</main>
	);
};

export default FacultyTable;
