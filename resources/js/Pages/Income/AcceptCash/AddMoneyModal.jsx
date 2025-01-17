import BlurDiv from "@/Pages/Components/BlurDiv";
import CloseBtn from "@/Pages/Components/CloseBtn";
import TextInput from "@/Pages/Components/TextInput";
import { select2style } from "@/utils/select2";
import Select from "react-select";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import Loading from "@/Pages/Components/Loading";

export default function AddMoneyModal({ sectors, onClick, student }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
        confirm_amount: "",
        income_sector_id: "",
        admission_id: student.id,
        status: "active",
        reg_id: student.reg_id,
    });

    const statusOptionsCustom = sectors?.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const [selectedOption, setSelectedOption] = useState(null);

    function submit(e) {
        e.preventDefault();
        post(route("accept.cash.store"), {
            onSuccess: () => {
                reset();
                setSelectedOption(null);
                onClick();
            },
        });
    }

    return (
        <>
            <div
                id="authentication-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-banglaTitle font-semibold text-gray-900 dark:text-white">
                                নগদ টাকা গ্রহন করার ফরম
                            </h3>
                            <CloseBtn onClick={onClick} />
                        </div>

                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={submit}>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                                    >
                                        আয় গ্রহণের খাত সিলেক্ট করুন
                                    </label>
                                    <Select
                                        styles={select2style}
                                        isSearchable={false}
                                        placeholder="আয় গ্রহণের খাত সিলেক্ট করুন"
                                        name="income_sector_id"
                                        onChange={(e) => {
                                            setData(
                                                "income_sector_id",
                                                e?.value || null
                                            );
                                            setSelectedOption(e);
                                        }}
                                        value={selectedOption}
                                        options={statusOptionsCustom}
                                    />
                                    {errors.income_sector_id && (
                                        <span className="text-red-500 text-sm">
                                            {errors.income_sector_id}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <TextInput
                                        type="number"
                                        label="টাকার পরিমাণ লিখুন"
                                        label2="(এটি পরিবর্তনযোগ্য নয়)"
                                        placeholder="এখানে লিখুন"
                                        name="amount"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
                                    />
                                    {errors.amount && (
                                        <span className="text-red-500 text-sm">
                                            {errors.amount}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <TextInput
                                        type="number"
                                        label="টাকার পরিমাণটি আবার লিখুন"
                                        placeholder="এখানে লিখুন"
                                        name="confirm_amount"
                                        value={data.confirm_amount}
                                        onChange={(e) =>
                                            setData(
                                                "confirm_amount",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.confirm_amount && (
                                        <span className="text-red-500 text-sm">
                                            {errors.confirm_amount}
                                        </span>
                                    )}
                                </div>

                                <input
                                    type="hidden"
                                    name="reg_id"
                                    value={data.reg_id}
                                    readOnly
                                />

                                <button
                                    type="submit"
                                    className="w-full text-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    নগদ টাকা গ্রহন করুন
                                </button>
                            </form>
                        </div>
                        {processing && <Loading />}
                    </div>
                </div>
            </div>

            <BlurDiv />
        </>
    );
}
