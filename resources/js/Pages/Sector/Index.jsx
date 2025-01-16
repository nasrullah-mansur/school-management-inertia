import React, { useEffect } from "react";
import Dashboard from "../Dashboard";
import PageHeader from "../Components/PageHeader";
import Table from "../Components/Table";
import TableRow from "../Components/TableRow";
import TableData from "../Components/TableData";
import { toast } from "react-toastify";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import EditBtn from "../Components/EditBtn";
import Status from "../Components/Status";
import { getDateTime } from "@/utils/dateTime";

export default function SectorIndex({ sectors }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
    }, [flash.success]);
    const tableHeaders = [
        "বিভাগের নাম",
        "প্রিফিক্স",
        "মোট শিক্ষার্থী",
        "স্টাটাস",
        "তৈরীর তারিখ",
        "আপডেটের তারিখ",
        "স্টাটাস",
    ];
    return (
        <Dashboard>
            <PageHeader
                title="সকল বিভাগ"
                subTitle="প্রতিষ্ঠানের সকল বিভাগ"
                backLink={route("dashboard")}
                addLink={route("sector.create")}
            />

            <Table className="text-center" headers={tableHeaders}>
                {sectors.map((sector) => (
                    <TableRow key={sector.id}>
                        <TableData className="border text-center">
                            {sector.sector}
                        </TableData>
                        <TableData className="border text-center font-banglaTitle font-semibold text-blue-600">
                            {sector.prefix}
                        </TableData>
                        <TableData className="border text-center">
                            {sector.admissions_count}
                        </TableData>
                        <TableData className="border text-center">
                            <Status status={sector.status} />
                        </TableData>
                        <TableData className="border font-banglaTitle text-center">
                            {getDateTime(sector.created_at)}
                        </TableData>
                        <TableData className="border font-banglaTitle text-center">
                            {getDateTime(sector.updated_at)}
                        </TableData>
                        <TableData className="border flex justify-center">
                            <EditBtn href={route("sector.edit", sector.id)} />
                        </TableData>
                    </TableRow>
                ))}
            </Table>
        </Dashboard>
    );
}
