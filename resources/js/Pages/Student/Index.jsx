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
import Pagination from "../Components/Pagination";
import ViewBtn from "../Components/ViewBtn";
import Search from "./sections/Search";
import Download from "./sections/Download";
import { getDate } from "@/utils/dateTime";

export default function StudentIndex({ admissions, years, sectors }) {
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
        "মোবাইল নং",
        "বিভাগ / বর্ষ",
        "স্টাটাস",
        "ভর্তির তারিখ",
        "একশন",
    ];

    return (
        <Dashboard>
            <PageHeader
                title="সকল ছাত্র"
                subTitle="চলতি বছরের সকল ছাত্রের তথ্য"
                backLink={route("admission.index")}
                addLink={route("admission.create")}
            />

            <div className="flex flex-col-reverse sm:flex-row-reverse md:flex-row justify-between mb-4 ">
                <Search />
                <Download years={years} sectors={sectors} />
            </div>

            <div className="relative">
                <Table headers={tableHeaders}>
                    {admissions?.data.length > 0 &&
                        admissions?.data.map((student) => (
                            <TableRow key={student.id}>
                                <TableData className="border">
                                    <span className="font-banglaTitle font-medium">
                                        {student.reg_id}
                                    </span>
                                </TableData>
                                <TableData className="border">
                                    {student.name}
                                </TableData>
                                <TableData className="border">
                                    {student.father_name}
                                </TableData>
                                <TableData className="border">
                                    <span className="font-banglaTitle font-medium">
                                        {student.phone}
                                    </span>
                                </TableData>
                                <TableData className="border">
                                    {student.sector.sector}
                                </TableData>
                                <TableData className="border">
                                    <Status status={student.status} />
                                </TableData>
                                <TableData className="border font-banglaTitle">
                                    {getDate(student.created_at)}
                                </TableData>

                                <TableData className="border flex">
                                    <EditBtn
                                        href={route(
                                            "admission.edit",
                                            student.id
                                        )}
                                    />
                                    <DownloadBtn
                                        href={route("vorti.pdf", student.id)}
                                    />
                                    <ViewBtn
                                        href={route(
                                            "admission.view",
                                            student.id
                                        )}
                                    />
                                </TableData>
                            </TableRow>
                        ))}

                    {admissions?.data.length == 0 && (
                        <tr>
                            <td colSpan={7} className="border py-3 text-center">
                                কোনো তথ্য পাওয়া যায় নি
                            </td>
                        </tr>
                    )}
                </Table>

                <Pagination
                    data={admissions.links}
                    from={admissions.from}
                    to={admissions.to}
                    total={admissions.total}
                    current_page={admissions.current_page}
                />
            </div>
        </Dashboard>
    );
}
