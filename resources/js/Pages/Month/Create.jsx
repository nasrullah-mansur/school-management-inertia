import Cart from "../Components/Cart";
import PageHeader from "../Components/PageHeader";
import TextInput from "../Components/TextInput";
import Dashboard from "../Dashboard";
import { useForm } from "@inertiajs/react";
import Loading from "../Components/Loading";
import Select from "react-select";
import { select2style, statusOptions } from "@/utils/select2";

export default function MonthCreate({ years }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        month: "",
        status: "active",
        year_id: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("month.store"), {
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
                title="নতুন মাস"
                subTitle="একটি নতুন মাস তৈরী করুন"
                backLink={route("month.index")}
                addLink={null}
            />

            <Cart title="একটি নতুন মাস তৈরী">
                <form className="space-y-6" onSubmit={submit}>
                    <TextInput
                        type="text"
                        label="মাসের নামটি লিখুন"
                        placeholder="এখানে লিখুন"
                        name="month"
                        value={data.month}
                        onChange={(e) => setData("month", e.target.value)}
                    />
                    {errors.month && (
                        <span className="text-red-500 text-sm">
                            {errors.month}
                        </span>
                    )}
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
