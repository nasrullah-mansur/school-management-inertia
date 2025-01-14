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
import DownloadBtn from "../Components/DownloadBtn";

export default function StudentIndex({ admissions }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
    }, [flash.success]);

    const tableHeaders = [
        "দাখেলা",
        "ছাত্রের নাম",
        "পিতার নাম",
        "স্টাটাস",
        "তৈরীর তারিখ",
        "আপডেটের তারিখ",
        "একশন",
    ];

    return (
        <Dashboard>
            <PageHeader
                title="সকল ছাত্র"
                subTitle="একটিভ বছরের সকল ছাত্রের তথ্য"
                backLink={route("dashboard")}
                addLink={route("admission.create")}
            />
            <Table headers={tableHeaders}>
                {admissions.data.map((student) => (
                    <TableRow key={student.id}>
                        <TableData className="border">
                            {student.reg_id}
                        </TableData>
                        <TableData className="border">{student.name}</TableData>
                        <TableData className="border">
                            {student.father_name}
                        </TableData>
                        <TableData className="border">
                            <Status status={student.status} />
                        </TableData>
                        <TableData className="border font-banglaTitle">
                            {moment(student.created_at).format(
                                "MMM-D-YYYY, h:mm A"
                            )}
                        </TableData>
                        <TableData className="border font-banglaTitle">
                            {moment(student.updated_at).format(
                                "MMM-D-YYYY, h:mm A"
                            )}
                        </TableData>
                        <TableData className="border flex">
                            <EditBtn
                                href={route("admission.edit", student.id)}
                            />
                            <DownloadBtn
                                href={route("vorti.pdf", student.reg_id)}
                            />
                        </TableData>
                    </TableRow>
                ))}
            </Table>
        </Dashboard>
    );
}
