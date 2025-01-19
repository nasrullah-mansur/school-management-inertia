import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { getDateTime } from "@/utils/dateTime";
import PageHeader from "@/Pages/Components/PageHeader";
import Table from "@/Pages/Components/Table";
import TableRow from "@/Pages/Components/TableRow";
import TableData from "@/Pages/Components/TableData";
import Pagination from "@/Pages/Components/Pagination";
import { LuDownload } from "react-icons/lu";

export default function Result({ students, income_sector, status }) {
    const tableHeaders = [
        "দাখেলা",
        "ছাত্রের নাম",
        "বিভাগ / বর্ষ",
        "বাবদ",
        "গ্রহণের তারিখ",
    ];

    const sectorId = students.data[0]?.sector_id || 0;

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="সকল আয়"
                subTitle="চলতি খাতসমূহের সকল আয়"
                backLink={route("income.by.sector.index")}
                addLink={null}
            />

            <div className="flex justify-start md:justify-between items-center mb-5">
                <p className="font-banglaTitle text-2xl font-semibold">
                    বাবদ: {income_sector.name}
                </p>
                <a
                    target="_blank"
                    href={route("income.excel", {
                        sector_id: sectorId,
                        income_sector_id: income_sector?.id,
                        status,
                    })}
                    className="px-4 mr-2 h-12 rounded-sm bg-blue-600 cursor-pointer flex justify-center items-center text-white"
                >
                    <span className="font-banglaTitle font-medium mr-2">
                        Excel
                    </span>
                    <LuDownload />
                </a>
            </div>

            <Table headers={tableHeaders}>
                {students?.data.map((income) => (
                    <TableRow key={income.id}>
                        <TableData className="border">
                            {income.reg_id}
                        </TableData>
                        <TableData className="border">{income.name}</TableData>
                        <TableData className="border">
                            {income?.sector?.sector}
                        </TableData>
                        <TableData className="border">
                            {status == "inactive" ? "N/A" : income_sector.name}
                        </TableData>
                        <TableData className="border">
                            {getDateTime(income.created_at)}
                        </TableData>
                    </TableRow>
                ))}
            </Table>
            <Pagination
                data={students?.links}
                from={students?.from}
                to={students?.to}
                total={students?.total}
                current_page={students?.current_page}
            />
        </AuthenticatedLayout>
    );
}
