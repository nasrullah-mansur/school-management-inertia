import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "../Components/PageHeader";
import Table from "../Components/Table";
import TableRow from "../Components/TableRow";
import TableData from "../Components/TableData";
import { getDateTime } from "@/utils/dateTime";
import Pagination from "../Components/Pagination";

export default function All({ incomes }) {
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

            <Table headers={tableHeaders}>
                {incomes.data.map((income) => (
                    <TableRow key={income.id}>
                        <TableData className="border">
                            {income.admission.reg_id}
                        </TableData>
                        <TableData className="border">
                            {income.admission.name}
                        </TableData>
                        <TableData className="border">
                            {income.sector.sector}
                        </TableData>
                        <TableData className="border">
                            {income.amount}
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
