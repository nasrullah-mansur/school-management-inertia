import { useForm } from "@inertiajs/react";
import Select from "react-select";
import { select2style, statusOptions } from "@/utils/select2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Pages/Components/PageHeader";
import Cart from "@/Pages/Components/Cart";
import Loading from "@/Pages/Components/Loading";
import TextInput from "@/Pages/Components/TextInput";

export default function IncomeCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        status: "active",
    });

    function submit(e) {
        e.preventDefault();
        post(route("income.sector.store"), {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="আয়ের খাত"
                subTitle="নতুন আয়ের খাত তৈরী করুন"
                backLink={route("income.sector.index")}
                addLink={null}
            />

            <Cart title="নতুন আয়ের খাত তৈরী">
                <form className="space-y-6" onSubmit={submit}>
                    <TextInput
                        label="আয়ের খাতটি লিখুন"
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
                            নতুন আয়ের খাতটি সেভ করুন
                        </span>
                    </button>
                </form>

                {processing && <Loading />}
            </Cart>
        </AuthenticatedLayout>
    );
}
