import React, { useEffect } from "react";
import Dashboard from "../Dashboard";
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
        <Dashboard>
            <PageHeader
                title="সকল শিক্ষাবর্ষ"
                subTitle="সকল শিক্ষাবর্ষ হালনাগাত করুন"
                backLink={route("dashboard")}
                addLink={route("year.create")}
            />
            <Table headers={tableHeaders}>
                {years.map((year) => (
                    <TableRow key={year.id}>
                        <TableData className="border">{year.year}</TableData>
                        <TableData className="border">
                            {year.admissions_count
                                ? year.admissions_count
                                : "0"}
                        </TableData>
                        <TableData className="border">
                            <Status status={year.status} />
                        </TableData>
                        <TableData className="border font-banglaTitle">
                            {moment(year.created_at).format(
                                "MMM-D-YYYY, h:mm A"
                            )}
                        </TableData>
                        <TableData className="border font-banglaTitle">
                            {moment(year.updated_at).format(
                                "MMM-D-YYYY, h:mm A"
                            )}
                        </TableData>
                        <TableData className="border flex">
                            <EditBtn href={route("year.edit", year.id)} />
                        </TableData>
                    </TableRow>
                ))}
            </Table>
        </Dashboard>
    );
}
