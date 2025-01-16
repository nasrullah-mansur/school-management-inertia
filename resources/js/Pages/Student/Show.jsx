import React from "react";
import Dashboard from "../Dashboard";
import PageHeader from "../Components/PageHeader";
import TableRow from "../Components/TableRow";
import TableData from "../Components/TableData";
import Table from "../Components/Table";
import Status from "../Components/Status";
import { getDateTime } from "@/utils/dateTime";

export default function Show({ student }) {
    const tableHeaderOne = [];

    return (
        <Dashboard>
            <PageHeader
                title="ছাত্রের তথ্য"
                subTitle="একজন ছাত্রের পরিপূর্ণ তথ্য"
                backLink={route("admission.index")}
                addLink={null}
            />

            <div className="w-full relative mx-auto max-w-2xl p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="text-xl font-semibold font-banglaTitle text-gray-900 dark:text-white mb-6">
                    ব্যক্তিগত তথ্য
                </h5>

                <Table>
                    <TableRow>
                        <TableData>ছাত্রের নাম</TableData>
                        <TableData>{student.name}</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>রেজিস্ট্রেশন নং</TableData>
                        <TableData>{student.reg_id}</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>পিতার নাম</TableData>
                        <TableData>{student.father_name}</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>জন্ম তারিখ / বয়স</TableData>
                        <TableData>{student.birth_day}</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>গ্রাম</TableData>
                        <TableData>{student.village}</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>পোস্ট অফিস</TableData>
                        <TableData>{student.post}</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>থানা</TableData>
                        <TableData>{student.thana}</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>জেলা</TableData>
                        <TableData>{student.zila}</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>ফোন নং ০১</TableData>
                        <TableData className="font-banglaTitle">
                            {student.phone}
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>ফোন নং ০২</TableData>
                        <TableData className="font-banglaTitle">
                            {student.phone_2}
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>ফোন নং ০৩</TableData>
                        <TableData className="font-banglaTitle">
                            {student.phone_3}
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>ভর্তির তারিখ </TableData>
                        <TableData className="font-banglaTitle">
                            {getDateTime(student.created_at)}
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>শিক্ষাবর্ষ ও বিভাগ</TableData>
                        <TableData>{student.sector.sector}</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>জন্ম নিবন্ধন নং</TableData>
                        <TableData className="font-banglaTitle">
                            {student.birth_no}
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>আই ডি কার্ড নং</TableData>
                        <TableData className="font-banglaTitle">
                            {student.nid_no}
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>স্টাটাস</TableData>
                        <TableData className="uppercase">
                            <Status status={student.status} />
                        </TableData>
                    </TableRow>
                </Table>
            </div>
        </Dashboard>
    );
}
