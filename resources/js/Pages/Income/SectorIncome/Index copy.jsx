import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { getDateTime } from "@/utils/dateTime";
import { LuDownload } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import PageHeader from "@/Pages/Components/PageHeader";
import IncomeFilter from "../IncomeFilter";
import Table from "@/Pages/Components/Table";
import TableRow from "@/Pages/Components/TableRow";
import TableData from "@/Pages/Components/TableData";
import Pagination from "@/Pages/Components/Pagination";

export default function All({ students, income_sectors, sectors }) {
    const [isFilter, setIsFilter] = useState(false);

    const tableHeaders = [
        "দাখেলা",
        "ছাত্রের নাম",
        "বিভাগ / বর্ষ",
        "পরিমাণ",
        "বাবদ",
        "গ্রহিতা",
        "গ্রহণের তারিখ",
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="সকল আয়"
                subTitle="চলতি খাতসমূহের সকল আয়"
                backLink={route("dashboard")}
                addLink={route("accept.cash.index")}
            />

            <div className="flex justify-end mb-5">
                <div className="flex">
                    <a
                        target="_blank"
                        href={route("students.pdf")}
                        className="px-4 mr-2 h-12 rounded-sm bg-blue-600 cursor-pointer flex justify-center items-center text-white"
                    >
                        <span className="font-banglaTitle font-medium mr-2">
                            Excel
                        </span>
                        <LuDownload />
                    </a>
                    <button
                        onClick={() => setIsFilter(!isFilter)}
                        className="w-12 h-12 rounded-sm bg-blue-600 cursor-pointer flex justify-center items-center text-white"
                    >
                        <IoFilter className="text-[22px]" />
                    </button>
                </div>
            </div>

            {isFilter && (
                <IncomeFilter
                    isFilter={isFilter}
                    onIsFilter={() => setIsFilter(!isFilter)}
                    income_sectors={income_sectors}
                    sectors={sectors}
                />
            )}

            <Table headers={tableHeaders}>
                {students.data.map((income) => (
                    <TableRow key={income.id}>
                        <TableData className="border">
                            {income.reg_id}
                        </TableData>
                        <TableData className="border">{income.name}</TableData>
                        <TableData className="border">
                            {income.sector.sector}
                        </TableData>
                        <TableData className="border">
                            {income.income}
                        </TableData>
                        <TableData className="border">
                            {income.income_sector.name}
                        </TableData>
                        <TableData className="border">
                            {income.user.name}
                        </TableData>
                        <TableData className="border">
                            {getDateTime(income.created_at)}
                        </TableData>
                    </TableRow>
                ))}
            </Table>
            <Pagination
                data={incomes.links}
                from={incomes.from}
                to={incomes.to}
                total={incomes.total}
                current_page={incomes.current_page}
            />
        </AuthenticatedLayout>
    );
}
