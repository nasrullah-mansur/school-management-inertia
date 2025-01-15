import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const { auth } = usePage().props;
    const { post } = useForm();

    const signOutHandler = (e) => {
        post(
            route("logout"),
            {},
            {
                onSuccess: () => {
                    console.log("Logged out successfully");
                },
            }
        );
    };

    return (
        <>
            <nav className={`bg-white border-b dark:bg-gray-900`}>
                <div className="max-w-screen-2xl flex flex-wrap items-center mx-auto px-4 py-3">
                    <p className="text-md text-green-600 text-xl hidden md:block font-banglaTitle">
                        <span className="font-semibold text-xl">
                            {auth?.user?.name}
                        </span>
                        {" কে "}
                        ড্যশবোর্ড প্যনেলে স্বাগতম
                    </p>
                    <a
                        href="https://flowbite.com/"
                        className="flex items-center space-x-3 rtl:space-x-reverse md:hidden"
                    >
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Flowbite
                        </span>
                    </a>
                    <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-auto">
                        <button
                            onClick={() => setDropdown(!dropdown)}
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-10 h-10 rounded-full"
                                src="https://i.postimg.cc/JhBqDrXN/FB-IMG-1695654585761.png"
                                alt="user photo"
                            />
                        </button>

                        {dropdown && (
                            <div
                                className="z-10 pb-4 text-center absolute border right-0 top-6 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                                id="user-dropdown"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white font-banglaTitle">
                                        {auth?.user?.name}
                                    </span>
                                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 font-banglaTitle">
                                        {auth?.user?.email}
                                    </span>
                                </div>
                                <ul
                                    className="py-2"
                                    aria-labelledby="user-menu-button"
                                >
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="font-banglaTitle block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            My Profile
                                        </a>
                                    </li>

                                    <li>
                                        <button
                                            onClick={signOutHandler}
                                            className="mx-auto font-banglaTitle bg-red-700 text-white block px-4 py-2 text-sm hover:bg-red-600 rounded dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
