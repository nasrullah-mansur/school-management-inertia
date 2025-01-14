import Cart from "../Components/Cart";
import PageHeader from "../Components/PageHeader";
import TextInput from "../Components/TextInput";
import Dashboard from "../Dashboard";
import { useForm } from "@inertiajs/react";
import Loading from "../Components/Loading";
import Select from "react-select";
import { select2style, statusOptions } from "@/utils/select2";

export default function SectorEdit({ years, sector }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: sector.id,
        sector: sector.sector,
        year_id: sector.year_id,
        prefix: sector.prefix,
        status: sector.status,
    });

    function submit(e) {
        e.preventDefault();
        post(route("sector.update"), {
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
                title="বিভাগ এডিট"
                subTitle="বিভাগটি এডিট করুন"
                backLink={route("sector.index")}
                addLink={null}
            />

            <Cart title="বিভাগটি এডিট করুন">
                <form className="space-y-6" onSubmit={submit}>
                    <TextInput
                        type="hidden"
                        name="id"
                        value={data.id}
                        onChange={(e) => setData("sector", e.target.value)}
                    />

                    <Select
                        styles={select2style}
                        isSearchable={false}
                        defaultValue={optionArr.find(
                            (option) => option.value === sector.year_id
                        )}
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
                        type="text"
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
                        type="text"
                        label="একটি প্রিফিক্স লিখুন"
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
                        defaultValue={statusOptions[0]}
                        options={statusOptions}
                    />

                    <button
                        disabled={processing}
                        type="submit"
                        className="blue-btn"
                    >
                        <span className="font-banglaTitle">
                            বিভাগটি এডিট করুন
                        </span>
                    </button>
                </form>

                {processing && <Loading />}
            </Cart>
        </Dashboard>
    );
}
