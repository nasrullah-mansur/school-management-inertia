import Cart from "../Components/Cart";
import PageHeader from "../Components/PageHeader";
import TextInput from "../Components/TextInput";
import { useForm } from "@inertiajs/react";
import Loading from "../Components/Loading";
import Select from "react-select";
import { select2style, statusOptions } from "@/utils/select2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function YearEdit({ year }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        year: year.year,
        id: year.id,
        status: "active",
    });

    function submit(e) {
        e.preventDefault();
        post(route("year.update", year.id), {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="শিক্ষাবর্ষটি এডিট"
                subTitle="শিক্ষাবর্ষটি এডিট করুন"
                backLink={route("year.index")}
                addLink={null}
            />

            <Cart title="শিক্ষাবর্ষটি এডিট করুন">
                <form className="space-y-6" onSubmit={submit}>
                    <TextInput
                        type="text"
                        label="শিক্ষাবর্ষটি লিখুন"
                        placeholder="এখানে লিখুন"
                        name="year"
                        value={data.year}
                        onChange={(e) => setData("year", e.target.value)}
                    />
                    <TextInput
                        type="hidden"
                        label="আই ডি লিখুন"
                        placeholder="এখানে লিখুন"
                        name="id"
                        value={data.id}
                        onChange={(e) => setData("id", e.target.value)}
                    />
                    {errors.year && (
                        <span className="text-red-500 text-sm">
                            {errors.year}
                        </span>
                    )}
                    <Select
                        styles={select2style}
                        isSearchable={false}
                        name="status"
                        onChange={(e) => setData("status", e.value)}
                        defaultValue={{ value: "active", label: "Active" }}
                        options={statusOptions}
                    />
                    <button
                        disabled={processing}
                        type="submit"
                        className="blue-btn"
                    >
                        <span className="font-banglaTitle">
                            শিক্ষাবর্ষটি সেভ করুন
                        </span>
                    </button>
                </form>

                {processing && <Loading />}
            </Cart>
        </AuthenticatedLayout>
    );
}
