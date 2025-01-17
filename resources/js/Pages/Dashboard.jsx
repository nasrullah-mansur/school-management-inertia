import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
    const domain = window.location.origin;

    const data = [
        { name: "January", value: 400 },
        { name: "February", value: 300 },
        { name: "March", value: 200 },
        { name: "April", value: 278 },
        { name: "May", value: 189 },
    ];

    return (
        <AuthenticatedLayout>
            <div className="flex mb-10">
                <div className="mr-2 hidden md:block">
                    <img
                        className="h-[70px]"
                        src={`${domain}/images/logo.png`}
                        alt="madrasatu ahmad"
                    />
                </div>
                <div className="border-l-2 pl-2">
                    <h1 className="text-3xl font-semibold font-banglaTitle">
                        ড্যশবোর্ড
                    </h1>
                    <p className="font-normal">
                        এক নজরে প্রতিষ্ঠানের বিভিন্য তথ্য
                    </p>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </AuthenticatedLayout>
    );
}
