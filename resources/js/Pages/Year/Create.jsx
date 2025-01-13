import Cart from "../Components/Cart";
import PageHeader from "../Components/PageHeader";
import TextInput from "../Components/TextInput";
import Dashboard from "../Dashboard";
import { useForm } from "@inertiajs/react";
import Loading from "../Components/Loading";
import Select from "react-select";
import { select2style, statusOptions } from "@/utils/select2";

export default function YearCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        year: "",
        status: "active",
    });

    function submit(e) {
        e.preventDefault();
        post(route("year.store"), {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <Dashboard>
            <PageHeader
                title="নতুন শিক্ষাবর্ষ"
                subTitle="নতুন শিক্ষাবর্ষ তৈরী করুন"
                backLink={route("year.index")}
                addLink={null}
            />

            <Cart title="নতুন শিক্ষাবর্ষ তৈরী">
                <form className="space-y-6" onSubmit={submit}>
                    <TextInput
                        label="শিক্ষাবর্ষটি লিখুন"
                        placeholder="এখানে লিখুন"
                        name="year"
                        value={data.year}
                        onChange={(e) => setData("year", e.target.value)}
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
                            নতুন শিক্ষাবর্ষটি সেভ করুন
                        </span>
                    </button>
                </form>

                {processing && <Loading />}
            </Cart>
        </Dashboard>
    );
}
