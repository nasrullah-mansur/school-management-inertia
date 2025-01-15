import { useForm, usePage } from "@inertiajs/react";

export default function Search() {
    const form1 = useForm({
        text: "",
    });

    function submit(e) {
        e.preventDefault();
        form1.post(route("search.post"), {
            onSuccess: () => {
                form1.reset();
            },
        });
    }

    return (
        <form
            onSubmit={submit}
            className="max-w-md min-w-80 mr-auto relative sm:order-2 md:order-1"
        >
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    value={form1.data.text}
                    onChange={(e) => form1.setData("text", e.target.value)}
                    type="search"
                    id="default-search"
                    className={`block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="আই ডি বা ফোন নাম্বার দিয়ে খুঁজুন"
                />
                <button
                    disabled={form1.processing}
                    type="submit"
                    className="text-white disabled:bg-blue-300 disabled:cursor-wait font-banglaTitle text-sm absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    অনুসন্ধান
                </button>
            </div>
        </form>
    );
}
