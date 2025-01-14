import { Link } from "@inertiajs/react";

const LeftBtn = ({ href, active }) => (
    <li>
        <Link
            disabled={active}
            href={href}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
            <span className="sr-only">Previous</span>
            <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                />
            </svg>
        </Link>
    </li>
);

const RightBtn = ({ href, active }) => (
    <li>
        <Link
            disabled={active}
            href={href}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
            <span className="sr-only">Next</span>
            <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                />
            </svg>
        </Link>
    </li>
);

const MiddleBtn = ({ href, active, label }) => {
    const normalClass =
        "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
    const activeClass =
        "flex disabled items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";

    return (
        <li>
            <Link
                disabled={active}
                href={href}
                className={active ? activeClass : normalClass}
                dangerouslySetInnerHTML={{ __html: label }}
            ></Link>
        </li>
    );
};

export default function Pagination(props) {
    const { data, total, from, to, current_page } = props;

    return (
        <div className="md:flex md:justify-between md:flex-row items-center my-5">
            <p className="font-banglaTitle text-slate-500 py-2">
                Displaying data {from} to {to} out of a total of {total}{" "}
                entries.
            </p>
            <nav aria-label="Page navigation example">
                <ul className="flex items-center -space-x-px h-10 text-base">
                    {/* Left (Previous) Button */}
                    {data[0] && (
                        <LeftBtn
                            href={data[0].url}
                            active={!data[0].url} // Disable if no URL
                        />
                    )}

                    {/* Middle Pagination Links */}
                    {data
                        .slice(1, data.length - 1) // Exclude first and last elements
                        .filter((_, index) => {
                            const totalLinks = data.length - 2; // Exclude prev/next
                            const firstIndex = Math.max(0, current_page - 6);
                            const lastIndex = Math.min(
                                totalLinks - 1,
                                current_page + 4
                            );
                            return index >= firstIndex && index <= lastIndex;
                        })
                        .map((link, index) => (
                            <MiddleBtn
                                key={index}
                                active={link.active}
                                href={link.url}
                                label={link.label}
                            />
                        ))}

                    {/* Right (Next) Button */}
                    {data[data.length - 1] && (
                        <RightBtn
                            href={data[data.length - 1].url}
                            active={!data[data.length - 1].url} // Disable if no URL
                        />
                    )}
                </ul>
            </nav>
        </div>
    );
}
