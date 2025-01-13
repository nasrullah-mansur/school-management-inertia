export default function Table({ children, headers }) {
    return (
        <div className="relative overflow-x-auto ">
            <table className="w-full border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className={`px-4 py-3 text-nowrap ${
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
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}
