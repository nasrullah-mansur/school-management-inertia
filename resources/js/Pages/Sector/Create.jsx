import Cart from "../Components/Cart";
import PageHeader from "../Components/PageHeader";
import TextInput from "../Components/TextInput";
import Dashboard from "../Dashboard";
import { useForm } from "@inertiajs/react";
import Loading from "../Components/Loading";
import Select from "react-select";
import { select2style, statusOptions } from "@/utils/select2";

export default function SectorCreate({ years }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        sector: "",
        year_id: "",
        prefix: "",
        status: "active",
    });

    function submit(e) {
        e.preventDefault();
        post(route("sector.store"), {
            onSuccess: () => {
                reset();
            },
        });
    }

    const optionArr = years.map((y) => {
        return { value: y.id, label: y.year };
    });

    return (
        <Dashboard>
            <PageHeader
                title="নতুন বিভাগ"
                subTitle="একটি নতুন বিভাগ তৈরী করুন"
                backLink={route("sector.index")}
                addLink={null}
            />

            <Cart title="একটি নতুন বিভাগ তৈরী করুন">
                <form className="space-y-6" onSubmit={submit}>
                    <Select
                        styles={select2style}
                        isSearchable={false}
                        name="year_id"
                        placeholder="একটি শিক্ষাবর্ষ সিলেক্ট করুন"
                        onChange={(e) => setData("year_id", e.value)}
                        options={optionArr}
                    />

                    {errors.year_id && (
                        <span className="text-red-500 text-sm">
                            {errors.year_id}
                        </span>
                    )}
                    <TextInput
                        label="বিভাগের নামটি লিখুন"
                        placeholder="এখানে লিখুন"
                        name="sector"
                        value={data.sector}
                        onChange={(e) => setData("sector", e.target.value)}
                    />
                    {errors.sector && (
                        <span className="text-red-500 text-sm">
                            {errors.sector}
                        </span>
                    )}

                    <TextInput
                        label="একটি প্রিফিক্স লিখুন"
                        label2="(এটি পরিবর্তনযোগ্য নয়)"
                        placeholder="এখানে লিখুন"
                        name="prefix"
                        value={data.prefix}
                        onChange={(e) => setData("prefix", e.target.value)}
                    />
                    {errors.prefix && (
                        <span className="text-red-500 text-sm">
                            {errors.prefix}
                        </span>
                    )}

                    <Select
                        styles={select2style}
                        isSearchable={false}
                        name="status"
                        onChange={(e) =>
                            setData("status", e?.value || "active")
                        }
                        defaultValue={{ value: "active", label: "Active" }}
                        options={statusOptions}
                    />

                    <button
                        disabled={processing}
                        type="submit"
                        className="blue-btn"
                    >
                        <span className="font-banglaTitle">
                            নতুন বিভাগটি সেভ করুন
                        </span>
                    </button>
                </form>

                {processing && <Loading />}
            </Cart>
        </Dashboard>
    );
}
