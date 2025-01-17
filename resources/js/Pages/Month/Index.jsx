import React, { useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import { route } from "ziggy-js";
import Table from "../Components/Table";
import TableData from "../Components/TableData";
import TableRow from "../Components/TableRow";
import moment from "moment";
import EditBtn from "../Components/EditBtn";
import { usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import Status from "../Components/Status";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function MonthIndex({ months }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
    }, [flash.success]);

    const tableHeaders = [
        "মাসের নাম",
        "শিক্ষাবর্ষ",
        "মোট শিক্ষার্থী",
        "নতুন ভর্তি",
        "বিদায়",
        "স্টাটাস",
        "তৈরীর তারিখ",
        "আপডেটের তারিখ",
        "একশন",
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="সকল মাস"
                subTitle="সকল মাসের তথ্য"
                backLink={route("dashboard")}
                addLink={route("month.create")}
            />
            <Table headers={tableHeaders}>
                {months.map((month) => (
                    <TableRow key={month.id}>
                        <TableData className="border">{month.month}</TableData>
                        <TableData className="border">
                            {month.year.year}
                        </TableData>
                        <TableData className="border">
                            {month.admissions_count
                                ? month.admissions_count
                                : "0"}
                        </TableData>
                        <TableData className="border">
                            {month.admissions_count
                                ? month.admissions_count
                                : "0"}
                        </TableData>
                        <TableData className="border">
                            {month.admissions_count
                                ? month.admissions_count
                                : "0"}
                        </TableData>
                        <TableData className="border">
                            <Status status={month.status} />
                        </TableData>
                        <TableData className="border font-banglaTitle">
                            {moment(month.created_at).format(
                                "MMM-D-YYYY, h:mm A"
                            )}
                        </TableData>
                        <TableData className="border font-banglaTitle">
                            {moment(month.updated_at).format(
                                "MMM-D-YYYY, h:mm A"
                            )}
                        </TableData>
                        <TableData className="flex">
                            <EditBtn href={route("month.edit", month.id)} />
                        </TableData>
                    </TableRow>
                ))}
            </Table>
        </AuthenticatedLayout>
    );
}
