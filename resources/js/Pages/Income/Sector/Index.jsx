import { useEffect } from "react";
import { route } from "ziggy-js";
import { usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import { getDateTime } from "@/utils/dateTime";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Pages/Components/PageHeader";
import Table from "@/Pages/Components/Table";
import TableRow from "@/Pages/Components/TableRow";
import TableData from "@/Pages/Components/TableData";
import EditBtn from "@/Pages/Components/EditBtn";
import Status from "@/Pages/Components/Status";

export default function Income_sectorIndex({ income_sectors }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
    }, [flash.success]);

    const tableHeaders = ["খাতের নাম", "স্টাটাস", "তৈরীর তারিখ", "স্টাটাস"];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="আয়ের খাত"
                subTitle="সকল আয়ের খাত হালনাগাত করুন"
                backLink={route("dashboard")}
                addLink={route("income.sector.create")}
            />
            <Table className="text-center" headers={tableHeaders}>
                {income_sectors.map((income_sector) => (
                    <TableRow key={income_sector.id}>
                        <TableData className="border text-center">
                            {income_sector.name}
                        </TableData>

                        <TableData className="border text-center">
                            <Status status={income_sector.status} />
                        </TableData>
                        <TableData className="border font-banglaTitle text-center">
                            {getDateTime(income_sector.created_at)}
                        </TableData>

                        <TableData className="flex justify-center">
                            <EditBtn
                                href={route(
                                    "income.sector.edit",
                                    income_sector.id
                                )}
                            />
                        </TableData>
                    </TableRow>
                ))}
            </Table>
        </AuthenticatedLayout>
    );
}
