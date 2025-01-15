import React from "react";

export default function Table({ data, headers }) {
    return (
        <div className="relative overflow-x-auto ">
            <table className="w-full border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className={`px-6 py-3 text-nowrap ${
                                    headers.length - 1 == index
                                        ? ""
                                        : "border-r"
                                }`}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="px-6 py-4 border-r">asfa</td>
                            <td className="px-6 py-4 border-r">Silver</td>
                            <td className="px-6 py-4 border-r">Laptop</td>
                            <td className="px-6 py-4 border-r">$2999</td>
                            <td className="px-6 py-4 border-r text-right">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
