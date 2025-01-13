import Cart from "../Components/Cart";
import PageHeader from "../Components/PageHeader";
import TextInput from "../Components/TextInput";
import Dashboard from "../Dashboard";
import { useForm } from "@inertiajs/react";
import Loading from "../Components/Loading";

export default function YearCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        year: "",
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
