import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { getDateTime } from "@/utils/dateTime";
import PageHeader from "@/Pages/Components/PageHeader";
import Table from "@/Pages/Components/Table";
import TableRow from "@/Pages/Components/TableRow";
import TableData from "@/Pages/Components/TableData";
import Pagination from "@/Pages/Components/Pagination";

export default function Result({ students, income_sector, status }) {
    const tableHeaders = [
        "দাখেলা",
        "ছাত্রের নাম",
        "বিভাগ / বর্ষ",
        "বাবদ",
        "গ্রহণের তারিখ",
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="সকল আয়"
                subTitle="চলতি খাতসমূহের সকল আয়"
                backLink={route("income.by.sector.index")}
                addLink={null}
            />

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
