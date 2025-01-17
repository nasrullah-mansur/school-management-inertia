import React, { useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import { route } from "ziggy-js";
import Table from "../Components/Table";
import TableData from "../Components/TableData";
import TableRow from "../Components/TableRow";
import EditBtn from "../Components/EditBtn";
import { usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import Status from "../Components/Status";
import { getDateTime } from "@/utils/dateTime";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function YearIndex({ years }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
    }, [flash.success]);

    const tableHeaders = [
        "শিক্ষাবর্ষ",
        "মোট শিক্ষার্থী",
        "স্টাটাস",
        "তৈরীর তারিখ",
        "আপডেটের তারিখ",
        "স্টাটাস",
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="সকল শিক্ষাবর্ষ"
                subTitle="সকল শিক্ষাবর্ষ হালনাগাত করুন"
                backLink={route("dashboard")}
                addLink={route("year.create")}
            />
            <Table className="text-center" headers={tableHeaders}>
                {years.map((year) => (
                    <TableRow key={year.id}>
                        <TableData className="border text-center">
                            {year.year}
                        </TableData>
                        <TableData className="border text-center">
                            {year.admissions_count
                                ? year.admissions_count
                                : "0"}{" "}
                            জন
                        </TableData>
                        <TableData className="border text-center">
                            <Status status={year.status} />
                        </TableData>
                        <TableData className="border font-banglaTitle text-center">
                            {getDateTime(year.created_at)}
                        </TableData>
                        <TableData className="border font-banglaTitle text-center">
                            {getDateTime(year.updated_at)}
                        </TableData>
                        <TableData className="border flex justify-center">
                            <EditBtn href={route("year.edit", year.id)} />
                        </TableData>
                    </TableRow>
                ))}
            </Table>
        </AuthenticatedLayout>
    );
}
