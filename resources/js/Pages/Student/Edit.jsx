import PageHeader from "../Components/PageHeader";
import TextInput from "../Components/TextInput";
import { useForm } from "@inertiajs/react";
import Loading from "../Components/Loading";
import Select from "react-select";
import { select2style } from "@/utils/select2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function StudentEdit({ sectors, student }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: student.name,
        reg_id: student.reg_id,
        sector_id: student.sector_id,
        year_id: student.year_id,
        form_no: student.form_no,
        father_name: student.father_name,
        birth_day: student.birth_day ? student.birth_day : "",
        phone: student.phone ? student.phone : "",
        birth_no: student.birth_no ? student.birth_no : "",
        nid_no: student.nid_no ? student.nid_no : "",
        village: student.village ? student.village : "",
        post: student.post ? student.post : "",
        thana: student.thana ? student.thana : "",
        zila: student.zila ? student.zila : "",
        phone_2: student.phone_2 ? student.phone_2 : "",
        phone_3: student.phone_3 ? student.phone_3 : "",
        status: student.status ? student.status : "",
    });

    const selectSectors = sectors.map((s) => {
        return { value: s.id, label: s.sector };
    });

    const getActiveSector = (id) => {
        let getIndex = selectSectors.findIndex((i) => i.value == id);
        return selectSectors[getIndex];
    };
    const statusOptionsCustom = [
        { value: "all", label: "সকল স্টাটাস" },
        { value: "active", label: "নিয়মিত" },
        { value: "inactive", label: "বিদায়ী" },
        { value: "past", label: "বিগত ছাত্র" },
    ];

    const getActiveStatus = (value) => {
        let getIndex = statusOptionsCustom.findIndex((i) => i.value == value);
        return statusOptionsCustom[getIndex];
    };

    function submit(e) {
        e.preventDefault();
        post(route("admission.update", student.id), {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="নতুন শিক্ষাবর্ষ"
                subTitle="নতুন শিক্ষাবর্ষ তৈরী করুন"
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
                    <div className="col-span-2 md:col-span-1 !m-0">
                        <TextInput
                            label="ছাতের পূর্ণ নাম"
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

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="!m-0 col-span-2 md:col-span-1">
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
                            onChange={(e) => setData("sector_id", e.value)}
                            defaultValue={getActiveSector(student.sector_id)}
                            options={selectSectors}
                        />
                        {errors.sector_id && (
                            <span className="text-red-500 text-sm">
                                {errors.sector_id}
                            </span>
                        )}
                    </div>

                    <div className="!m-0 col-span-2 md:col-span-1">
                        <label
                            htmlFor="status"
                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                        >
                            স্টাটাস সিলেক্ট করুন
                        </label>
                        <Select
                            styles={select2style}
                            isSearchable={false}
                            name="status"
                            onChange={(e) =>
                                setData("status", e?.value || "নিয়মিত")
                            }
                            defaultValue={getActiveStatus(data.status)}
                            options={statusOptionsCustom}
                        />
                    </div>

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2 md:col-span-1 !m-0">
                        <TextInput
                            label="জন্ম তারিখ"
                            placeholder="এখানে লিখুন"
                            name="birth_day"
                            value={data.birth_day}
                            onChange={(e) =>
                                setData("birth_day", e.target.value)
                            }
                        />
                        {errors.birth_day && (
                            <span className="text-red-500 text-sm">
                                {errors.birth_day}
                            </span>
                        )}
                    </div>

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2 md:col-span-1 !m-0">
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

                    <div className="col-span-2">
                        <button
                            disabled={processing}
                            type="submit"
                            className="blue-btn"
                        >
                            <span className="font-banglaTitle">
                                ছাত্রের আপডেট তথ্য সেভ করুন
                            </span>
                        </button>
                    </div>
                </form>

                {processing && <Loading />}
            </div>
        </AuthenticatedLayout>
    );
}
