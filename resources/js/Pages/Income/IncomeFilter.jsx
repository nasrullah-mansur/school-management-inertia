import { useState } from "react";
import BlurDiv from "../Components/BlurDiv";
import Select from "react-select";
import { select2style } from "@/utils/select2";
import Loading from "../Components/Loading";
import { useForm } from "@inertiajs/react";

export default function IncomeFilter({
    isFilter,
    onIsFilter,
    sectors,
    income_sectors,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        reg_id: "",
        sector_id: "",
        form_no: "",
        father_name: "",
        birth_day: "",
        phone: "",
        birth_no: "",
        nid_no: "",
        village: "",
        post: "",
        thana: "",
        zila: "",
        phone_2: "",
        phone_3: "",
        status: "active",
    });

    const sectorSelect = sectors.map((income) => ({
        value: income.id,
        label: income.sector,
    }));

    const incomeSectorSelect = income_sectors.map((income) => ({
        value: income.id,
        label: income.name,
    }));

    console.log(sectorSelect, incomeSectorSelect);

    const statusOptions = [
        { value: "all", label: "সকল" },
        { value: "active", label: "যারা পরিশোধ করেছে" },
        { value: "inactive", label: "যারা পরিশোধ করেনি" },
    ];

    return (
        <>
            <div
                tabIndex="-1"
                aria-hidden="true"
                className={`overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="font-banglaTitle text-xl font-semibold text-gray-900 dark:text-white">
                                ছাত্রদের লেনদেনের তথ্য ফিল্টার করুন
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
                            <form action="">
                                <div className="grid gap-3 grid-cols-1 mb-5">
                                    <div>
                                        <Select
                                            styles={select2style}
                                            isSearchable={false}
                                            name="sector_id"
                                            placeholder="একটি শিক্ষাবর্ষ সিলেক্ট করুন"
                                            onChange={(e) =>
                                                setData("sector_id", e.value)
                                            }
                                            options={sectorSelect}
                                        />

                                        {errors.sector_id && (
                                            <span className="text-red-500 text-sm">
                                                {errors.sector_id}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <Select
                                            styles={select2style}
                                            isSearchable={false}
                                            name="income_sector_id"
                                            placeholder="একটি আয়ের খাত সিলেক্ট করুন"
                                            onChange={(e) =>
                                                setData(
                                                    "income_sector_id",
                                                    e.value
                                                )
                                            }
                                            options={incomeSectorSelect}
                                        />

                                        {errors.income_sector_id && (
                                            <span className="text-red-500 text-sm">
                                                {errors.income_sector_id}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <Select
                                            styles={select2style}
                                            isSearchable={false}
                                            name="status"
                                            placeholder="একটি অবস্থা সিলেক্ট করুন"
                                            onChange={(e) =>
                                                setData("status", e.value)
                                            }
                                            options={statusOptions}
                                        />

                                        {errors.status && (
                                            <span className="text-red-500 text-sm">
                                                {errors.status}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <button className="blue-btn">
                                            অনুসন্ধান করুন
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {processing && <Loading />}
                        </div>
                    </div>
                </div>
            </div>
            {isFilter && <BlurDiv />}
        </>
    );
}
