import Cart from "../Components/Cart";
import PageHeader from "../Components/PageHeader";
import TextInput from "../Components/TextInput";
import Dashboard from "../Dashboard";
import { useForm } from "@inertiajs/react";
import Loading from "../Components/Loading";
import Select from "react-select";
import { select2style, statusOptions } from "@/utils/select2";

export default function StudentCreate({ years, sectors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        reg_id: "",
        sector_id: "",
        year_id: "",
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

    const selectYears = years.map((m) => {
        return { value: m.id, label: m.year };
    });

    const selectSectors = sectors.map((s) => {
        return { value: s.id, label: s.sector };
    });

    function submit(e) {
        e.preventDefault();
        post(route("admission.store"), {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <Dashboard>
            <PageHeader
                title="নতুন ছাত্র"
                subTitle="নতুন ছাত্র ভর্তি করুন"
                backLink={route("admission.index")}
                addLink={null}
            />

            <div className="w-full max-w-3xl relative mx-auto p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                    নতুন ছাত্র ভর্তি করুন
                </h5>

                <form
                    className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-3"
                    onSubmit={submit}
                >
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="ছাত্রের পূর্ণ নাম"
                            placeholder="এখানে লিখুন"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">
                                {errors.name}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="পিতার নাম"
                            placeholder="এখানে লিখুন"
                            name="father_name"
                            value={data.father_name}
                            onChange={(e) =>
                                setData("father_name", e.target.value)
                            }
                        />
                        {errors.father_name && (
                            <span className="text-red-500 text-sm">
                                {errors.father_name}
                            </span>
                        )}
                    </div>
                    <div className="!m-0 col-span-1">
                        <label
                            htmlFor="status"
                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                        >
                            শিক্ষাবর্ষ সিলেক্ট করুন
                        </label>
                        <Select
                            styles={select2style}
                            isSearchable={false}
                            name="year_id"
                            onChange={(e) =>
                                setData("year_id", e?.value || "active")
                            }
                            options={selectYears}
                        />
                        {errors.year_id && (
                            <span className="text-red-500 text-sm">
                                {errors.year_id}
                            </span>
                        )}
                    </div>
                    <div className="!m-0 col-span-1">
                        <label
                            htmlFor="status"
                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                        >
                            বিভাগ সিলেক্ট করুন
                        </label>
                        <Select
                            styles={select2style}
                            isSearchable={false}
                            name="sector_id"
                            onChange={(e) =>
                                setData("sector_id", e?.value || "active")
                            }
                            options={selectSectors}
                        />
                        {errors.sector_id && (
                            <span className="text-red-500 text-sm">
                                {errors.sector_id}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="ফরম নং"
                            placeholder="এখানে লিখুন"
                            name="form_no"
                            value={data.form_no}
                            onChange={(e) => setData("form_no", e.target.value)}
                        />
                        {errors.form_no && (
                            <span className="text-red-500 text-sm">
                                {errors.form_no}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="মোবাইল নং"
                            placeholder="এখানে লিখুন"
                            name="phone"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                        {errors.phone && (
                            <span className="text-red-500 text-sm">
                                {errors.phone}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="জন্ম নিবন্ধন নং"
                            placeholder="এখানে লিখুন"
                            name="birth_no"
                            value={data.birth_no}
                            onChange={(e) =>
                                setData("birth_no", e.target.value)
                            }
                        />
                        {errors.birth_no && (
                            <span className="text-red-500 text-sm">
                                {errors.birth_no}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="এন আই ডি নং"
                            placeholder="এখানে লিখুন"
                            name="nid_no"
                            value={data.nid_no}
                            onChange={(e) => setData("nid_no", e.target.value)}
                        />
                        {errors.nid_no && (
                            <span className="text-red-500 text-sm">
                                {errors.nid_no}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="গ্রাম"
                            placeholder="এখানে লিখুন"
                            name="village"
                            value={data.village}
                            onChange={(e) => setData("village", e.target.value)}
                        />
                        {errors.village && (
                            <span className="text-red-500 text-sm">
                                {errors.village}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="পোস্ট অফিস"
                            placeholder="এখানে লিখুন"
                            name="post"
                            value={data.post}
                            onChange={(e) => setData("post", e.target.value)}
                        />
                        {errors.post && (
                            <span className="text-red-500 text-sm">
                                {errors.post}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="থানা"
                            placeholder="এখানে লিখুন"
                            name="thana"
                            value={data.thana}
                            onChange={(e) => setData("thana", e.target.value)}
                        />
                        {errors.thana && (
                            <span className="text-red-500 text-sm">
                                {errors.thana}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="জেলা"
                            placeholder="এখানে লিখুন"
                            name="zila"
                            value={data.zila}
                            onChange={(e) => setData("zila", e.target.value)}
                        />
                        {errors.zila && (
                            <span className="text-red-500 text-sm">
                                {errors.zila}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="ফেন নং ২"
                            placeholder="এখানে লিখুন"
                            name="phone_2"
                            value={data.phone_2}
                            onChange={(e) => setData("phone_2", e.target.value)}
                        />
                        {errors.phone_2 && (
                            <span className="text-red-500 text-sm">
                                {errors.phone_2}
                            </span>
                        )}
                    </div>
                    <div className="col-span-1 !m-0">
                        <TextInput
                            label="ফেন নং ৩"
                            placeholder="এখানে লিখুন"
                            name="phone_3"
                            value={data.phone_3}
                            onChange={(e) => setData("phone_3", e.target.value)}
                        />
                        {errors.phone_3 && (
                            <span className="text-red-500 text-sm">
                                {errors.phone_3}
                            </span>
                        )}
                    </div>
                    <div className="mt-0">
                        <button
                            disabled={processing}
                            type="submit"
                            className="blue-btn"
                        >
                            <span className="font-banglaTitle">
                                ছাত্রের ভর্তি কনফার্ম করুন
                            </span>
                        </button>
                    </div>
                </form>

                {processing && <Loading />}
            </div>
        </Dashboard>
    );
}
