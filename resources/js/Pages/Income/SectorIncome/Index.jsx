import Select from "react-select";
import { select2style } from "@/utils/select2";
import { useForm } from "@inertiajs/react";
import Loading from "@/Pages/Components/Loading";
import Cart from "@/Pages/Components/Cart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Pages/Components/PageHeader";

export default function Index({ sectors, income_sectors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        sector_id: "",
        income_sector_id: "",
        status: "",
    });

    const sectorSelect = sectors.map((income) => ({
        value: income.id,
        label: income.sector,
    }));

    const incomeSectorSelect = income_sectors.map((income) => ({
        value: income.id,
        label: income.name,
    }));

    console.log(sectorSelect, incomeSectorSelect);

    const statusOptions = [
        { value: "active", label: "যারা পরিশোধ করেছে" },
        { value: "inactive", label: "যারা পরিশোধ করেনি" },
    ];

    function submit(e) {
        e.preventDefault();
        post(route("income.by.sector.req"), {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <>
            <AuthenticatedLayout>
                <PageHeader
                    title="আয় নির্বাচন"
                    subTitle="আয় নির্বাচন"
                    backLink={route("sector.index")}
                    addLink={null}
                />
                <Cart title="আয় নির্বাচন">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <form onSubmit={submit}>
                            <div className="grid gap-3 grid-cols-1 mb-5">
                                <div>
                                    <Select
                                        styles={select2style}
                                        isSearchable={false}
                                        name="sector_id"
                                        placeholder="একটি শিক্ষাবর্ষ সিলেক্ট করুন"
                                        onChange={(e) =>
                                            setData("sector_id", e.value)
                                        }
                                        options={sectorSelect}
                                    />

                                    {errors.sector_id && (
                                        <span className="text-red-500 text-sm">
                                            {errors.sector_id}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Select
                                        styles={select2style}
                                        isSearchable={false}
                                        name="income_sector_id"
                                        placeholder="একটি আয়ের খাত সিলেক্ট করুন"
                                        onChange={(e) =>
                                            setData("income_sector_id", e.value)
                                        }
                                        options={incomeSectorSelect}
                                    />

                                    {errors.income_sector_id && (
                                        <span className="text-red-500 text-sm">
                                            {errors.income_sector_id}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Select
                                        styles={select2style}
                                        isSearchable={false}
                                        name="status"
                                        placeholder="একটি অবস্থা সিলেক্ট করুন"
                                        onChange={(e) =>
                                            setData("status", e.value)
                                        }
                                        options={statusOptions}
                                    />

                                    {errors.status && (
                                        <span className="text-red-500 text-sm">
                                            {errors.status}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <button className="blue-btn">
                                        অনুসন্ধান করুন
                                    </button>
                                </div>
                            </div>
                        </form>
                        {processing && <Loading />}
                    </div>
                </Cart>
            </AuthenticatedLayout>
        </>
    );
}
