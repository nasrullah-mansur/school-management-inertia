import BlurDiv from "@/Pages/Components/BlurDiv";
import Loading from "@/Pages/Components/Loading";
import { select2style } from "@/utils/select2";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

export default function Filter({ years, sectors, isFilter, onIsFilter }) {
    const [startDate, setStartDate] = useState(new Date());
    const form2 = useForm({
        year_id: "all",
        sector_id: "all",
        status: "all",
        day: "all",
    });

    const yearArr = years?.map((y) => {
        return { value: y.id, label: y.year };
    });

    yearArr.unshift({
        value: "all",
        label: "সকল শিক্ষাবর্ষ",
    });

    const sectorArr = sectors?.map((y) => {
        return { value: y.id, label: y.sector };
    });

    sectorArr.unshift({
        value: "all",
        label: "সকল বিভাগ",
    });

    const statusOptionsCustom = [
        { value: "all", label: "সকল স্টাটাস" },
        { value: "active", label: "নিয়মিত" },
        { value: "inactive", label: "বিদায়ী" },
        { value: "past", label: "বিগত ছাত্র" },
    ];

    function submit2(e) {
        e.preventDefault();
        form2.post(route("search.filter"), {
            onSuccess: () => {
                form2.reset();
                onIsFilter();
            },
        });
    }

    return (
        <>
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
                                onClick={() => onIsFilter()}
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

                        <div className="p-4 md:p-5 relative">
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

                                <button type="submit" className="blue-btn">
                                    <span className="font-normal font-banglaTitle">
                                        অনুসন্ধান করুন
                                    </span>
                                </button>
                            </form>

                            {form2.processing && <Loading />}
                        </div>
                    </div>
                </div>
            </div>
            {isFilter && <BlurDiv />}
        </>
    );
}
