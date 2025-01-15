import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import PageHeader from "../Components/PageHeader";
import { route } from "ziggy-js";
import Table from "../Components/Table";
import TableData from "../Components/TableData";
import TableRow from "../Components/TableRow";
import moment from "moment";
import EditBtn from "../Components/EditBtn";
import { Link, useForm, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import Status from "../Components/Status";
import DownloadBtn from "../Components/DownloadBtn";
import Pagination from "../Components/Pagination";

import { IoFilter } from "react-icons/io5";
import Loading from "../Components/Loading";
import ViewBtn from "../Components/ViewBtn";
import Select from "react-select";
import { select2style, statusOptions } from "@/utils/select2";
import BlurDiv from "../Components/BlurDiv";
import { LuDownload } from "react-icons/lu";

export default function StudentIndex({ admissions, years, sectors }) {
    const [isFilter, setIsFilter] = useState(false);
    const { flash } = usePage().props;
    const { url } = usePage();

    const form1 = useForm({
        text: "",
    });

    const form2 = useForm({
        year_id: "all",
        sector_id: "all",
        status: "all",
    });

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
    }, [flash.success]);

    const yearArr = years.map((y) => {
        return { value: y.id, label: y.year };
    });

    yearArr.unshift({
        value: "all",
        label: "সকল শিক্ষাবর্ষ",
    });

    const sectorArr = sectors.map((y) => {
        return { value: y.id, label: y.sector };
    });

    sectorArr.unshift({
        value: "all",
        label: "সকল বিভাগ",
    });

    const statusOptionsCustom = [
        { value: "active", label: "নিয়মিত" },
        { value: "inactive", label: "বিদায়" },
    ];

    const tableHeaders = [
        "দাখেলা",
        "ছাত্রের নাম",
        "পিতার নাম",
        "মোবাইল নং",
        "স্টাটাস",
        "তৈরীর তারিখ",
        "আপডেটের তারিখ",
        "একশন",
    ];

    function submit(e) {
        e.preventDefault();
        form1.post(route("search.post"), {
            onSuccess: () => {
                form1.reset();
            },
        });
    }

    function submit2(e) {
        e.preventDefault();
        form2.post(route("search.filter"), {
            onSuccess: () => {
                form2.reset();
            },
        });
    }

    return (
        <Dashboard>
            <PageHeader
                title="সকল ছাত্র"
                subTitle="চলতি বছরের সকল ছাত্রের তথ্য"
                backLink={route("admission.index")}
                addLink={route("admission.create")}
            />

            <div className="flex flex-col-reverse sm:flex-row-reverse md:flex-row justify-between mb-4 ">
                <form
                    onSubmit={submit}
                    className="max-w-md min-w-80 mr-auto relative sm:order-2 md:order-1"
                >
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
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
                            value={form1.data.text}
                            onChange={(e) =>
                                form1.setData("text", e.target.value)
                            }
                            type="search"
                            id="default-search"
                            className={`block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="আই ডি বা ফোন নাম্বার দিয়ে খুঁজুন"
                        />
                        <button
                            disabled={form1.processing}
                            type="submit"
                            className="text-white disabled:bg-blue-300 disabled:cursor-wait font-banglaTitle text-sm absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            অনুসন্ধান
                        </button>
                    </div>
                </form>
                <div className="flex sm:order-1 md:order-2 mb-4 md:mb-0">
                    <a
                        target="_blank"
                        href={route("students.pdf")}
                        className="px-4 mr-2 h-12 rounded-sm bg-blue-600 cursor-pointer flex justify-center items-center text-white"
                    >
                        <span className="font-banglaTitle font-medium mr-2">
                            Download PDF
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

            <div className="relative">
                {form1.processing && <Loading />}
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

            {/* Modal */}
            <div
                tabIndex="-1"
                aria-hidden="true"
                className={`${
                    !isFilter && "hidden"
                } overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="font-banglaTitle text-xl font-semibold text-gray-900 dark:text-white">
                                ছাত্রদের তথ্য ফিল্টার করুন
                            </h3>
                            <button
                                onClick={() => setIsFilter(!isFilter)}
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={submit2}>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                                    >
                                        শিক্ষাবর্ষ সিলেক্ট করুন
                                    </label>
                                    <Select
                                        styles={select2style}
                                        placeholder="একটি শিক্ষাবর্ষ সিলেক্ট করুন"
                                        isSearchable={false}
                                        name="year_id"
                                        onChange={(e) =>
                                            form2.setData(
                                                "year_id",
                                                e?.value || "all"
                                            )
                                        }
                                        options={yearArr}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                                    >
                                        বিভাগ সিলেক্ট করুন
                                    </label>
                                    <Select
                                        styles={select2style}
                                        placeholder="একটি বিভাগ সিলেক্ট করুন"
                                        isSearchable={false}
                                        name="sector_id"
                                        onChange={(e) =>
                                            form2.setData(
                                                "sector_id",
                                                e?.value || "all"
                                            )
                                        }
                                        options={sectorArr}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                                    >
                                        স্টাটাস সিলেক্ট করুন
                                    </label>
                                    <Select
                                        styles={select2style}
                                        isSearchable={false}
                                        placeholder="একটি স্টাটাস সিলেক্ট করুন"
                                        name="status"
                                        onChange={(e) =>
                                            form2.setData(
                                                "status",
                                                e?.value || "all"
                                            )
                                        }
                                        options={statusOptionsCustom}
                                    />
                                </div>

                                <button
                                    onClick={() => setIsFilter(!isFilter)}
                                    type="submit"
                                    className="blue-btn"
                                >
                                    <span className="font-normal font-banglaTitle">
                                        অনুসন্ধান করুন
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {isFilter && <BlurDiv />}
        </Dashboard>
    );
}
