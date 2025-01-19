import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddBtn from "@/Pages/Components/AddBtn";
import PageHeader from "@/Pages/Components/PageHeader";
import Table from "@/Pages/Components/Table";
import TableData from "@/Pages/Components/TableData";
import TableRow from "@/Pages/Components/TableRow";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AddMoneyModal from "./AddMoneyModal";
import { toast } from "react-toastify";
import { getDateTime } from "@/utils/dateTime";
import EditBtn from "@/Pages/Components/EditBtn";
import DownloadBtn from "@/Pages/Components/DownloadBtn";

export default function Index({ student, incomes, sectors }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
    }, [flash.success]);

    const [show, setShow] = useState(false);
    const { setData, post, processing, reset } = useForm({
        reg_id: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("accept.cash.find"), {
            onSuccess: () => {
                reset();
            },
        });
    }

    const tableHeaders = ["ছাতের নাম", "পিতার নাম", "দাখেলা", "বর্ষ"];
    const tableHeaders2 = [
        "টাকার পরিমাণ",
        "বাবদ",
        "প্রদানের তারিখ",
        "গ্রহিতা",
        "একশন",
    ];

    const addModalHandler = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="আয় সংযুক্তি"
                subTitle="একটি আয় যুক্ত করুন"
                backLink={route("dashboard")}
                addLink={null}
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <form className="max-w-md w-full" onSubmit={submit}>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                name="reg_id"
                                onChange={(e) =>
                                    setData("reg_id", e.target.value)
                                }
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="দাখেলা নাম্বার লিখুন"
                            />
                            <button
                                disabled={processing}
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 disabled:bg-blue-500 disabled:cursor-wait bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                অনুসন্ধান
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <h2 className="font-banglaTitle text-2xl font-medium mb-2">
                * ছাত্রের ব্যক্তিগত তথ্য
            </h2>
            <Table headers={tableHeaders}>
                {student ? (
                    <TableRow>
                        <TableData className="border">{student.name}</TableData>
                        <TableData className="border">
                            {student.father_name}
                        </TableData>
                        <TableData className="border">
                            {student.reg_id}
                        </TableData>
                        <TableData className="border">
                            {student.sector.sector}
                        </TableData>
                    </TableRow>
                ) : (
                    <tr>
                        <td className="text-center p-4" colSpan={4}>
                            ছাত্রের ব্যক্তিগত তথ্য পাওয়া যায় নি
                        </td>
                    </tr>
                )}
            </Table>

            <div className="flex justify-between items-center mt-5 mb-2">
                <h2 className="font-banglaTitle text-2xl font-medium mb-2 mt-4">
                    * ছাত্রের লেনদেনের তথ্য
                </h2>
                {student && <AddBtn onClick={addModalHandler} href="#" />}
            </div>
            <Table className="text-center" headers={tableHeaders2}>
                {student && incomes.length > 0 ? (
                    <>
                        {incomes.map((income) => (
                            <TableRow key={income.id}>
                                <TableData className="border text-center">
                                    {income.amount}
                                </TableData>
                                <TableData className="border text-center">
                                    {income.income_sector.name}
                                </TableData>
                                <TableData className="border font-banglaTitle text-center">
                                    {getDateTime(income.created_at)}
                                </TableData>
                                <TableData className="border font-banglaTitle text-center">
                                    {income.user.name}
                                </TableData>

                                <TableData className="border">
                                    <div className="flex justify-center">
                                        <DownloadBtn
                                            href={route("income.pdf", {
                                                id: income.id,
                                            })}
                                        />
                                    </div>
                                </TableData>
                            </TableRow>
                        ))}
                    </>
                ) : (
                    <tr>
                        <td className="text-center p-4" colSpan={5}>
                            ছাত্রের লেনদেনের তথ্য পাওয়া যায় নি
                        </td>
                    </tr>
                )}
            </Table>
            {show && student && (
                <AddMoneyModal
                    student={student}
                    onClick={() => setShow(!show)}
                    sectors={sectors}
                />
            )}
        </AuthenticatedLayout>
    );
}
