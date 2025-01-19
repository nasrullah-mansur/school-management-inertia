import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts";
import Table from "./Components/Table";
import TableRow from "./Components/TableRow";
import TableData from "./Components/TableData";
import Status from "./Components/Status";
import { Link } from "@inertiajs/react";
import ViewBtn from "./Components/ViewBtn";

export default function Dashboard({ dailyTotals, users }) {
    const domain = window.location.origin;

    const tableHeaders = ["নাম", "মোবাইল নং", "স্টাটাস", "মোট আয়", "একশন"];

    return (
        <AuthenticatedLayout>
            <div className="flex mb-10">
                <div className="mr-2 hidden md:block">
                    <img
                        className="h-[70px]"
                        src={`${domain}/images/logo.png`}
                        alt="madrasatu ahmad"
                    />
                </div>
                <div className="border-l-2 pl-2">
                    <h1 className="text-3xl font-semibold font-banglaTitle">
                        ড্যশবোর্ড
                    </h1>
                    <p className="font-normal">
                        এক নজরে প্রতিষ্ঠানের বিভিন্য তথ্য
                    </p>
                </div>
            </div>

            <h2 className="font-banglaTitle text-xl font-semibold mb-5 ml-4">
                শেষ ১০ দিনের মোট আয়
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="grid-cols-1">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={dailyTotals.reverse()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid-cols-1">
                    <div>
                        <h2 className="font-banglaTitle text-xl font-semibold mb-5 ml-4">
                            শিক্ষক / স্টফগণের মাধ্যমে আয়
                        </h2>
                        <Table headers={tableHeaders}>
                            {users.map((user) => (
                                <TableRow>
                                    <TableData className="border">
                                        {user.name}
                                    </TableData>
                                    <TableData className="border">
                                        {user.phone}
                                    </TableData>
                                    <TableData className="border">
                                        <Status status={user.status} />
                                    </TableData>
                                    <TableData className="border">
                                        {user.total_income}
                                    </TableData>
                                    <TableData className="border">
                                        <ViewBtn>afa</ViewBtn>
                                    </TableData>
                                </TableRow>
                            ))}
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
