import { Link } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";
import { FaArrowLeft } from "react-icons/fa6";
import { FaAlignLeft } from "react-icons/fa";

const ListItem = ({ li }) => {
    return (
        <li>
            <Link
                href={li.link}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                <svg
                    className="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
                    />
                </svg>
                <span className="ms-3">{li.name}</span>
            </Link>
        </li>
    );
};

const LiSubmenu = ({ li }) => {
    const [active, setActive] = useState(true);

    return (
        <li>
            <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={() => setActive(!active)}
            >
                <svg
                    className="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
                    />
                </svg>

                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    {li.name}
                </span>
                {active ? (
                    <svg
                        className="w-3 h-3 text-gray-400 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14m-7 7V5"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-3 h-3 text-gray-400 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14"
                        />
                    </svg>
                )}
            </button>
            <ul className={`${active && "hidden"} py-2 space-y-2`}>
                {li.submenu.map((sub) => (
                    <li key={sub.id}>
                        <Link
                            href={sub.link}
                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-9 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                            {sub.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default function Sidebar({ isActive, setIsActive }) {
    const domain = window.location.origin;

    const menus = [
        {
            id: "3",
            name: "ড্যশবোর্ড",
            link: route("dashboard"),
            submenu: [],
        },
        {
            id: "1",
            name: "শিক্ষাবর্ষ",
            submenu: [
                {
                    id: "1",
                    name: "শিক্ষাবর্ষসমূহ",
                    link: route("year.index"),
                },
                {
                    id: "2",
                    name: "বিভাগসমূহ",
                    link: route("sector.index"),
                },
            ],
        },
        {
            id: "2",
            name: "ছাত্র সংক্রান্ত",
            submenu: [
                {
                    id: "1",
                    name: "সকল ছাত্রের তথ্য",
                    link: route("admission.index"),
                },
                {
                    id: "2",
                    name: "নতুন ছাত্র ভর্তি",
                    link: route("admission.create"),
                },
            ],
        },
        {
            id: "3",
            name: "আয় সংক্রান্ত",
            submenu: [
                {
                    id: "1",
                    name: "আয়ের খাতসমূহ",
                    link: route("income.sector.index"),
                },
                {
                    id: "2",
                    name: "নগদ গ্রহণ",
                    link: route("accept.cash.index"),
                },
                {
                    id: "3",
                    name: "সকল আয়",
                    link: route("all.income"),
                },
                {
                    id: "4",
                    name: "বিভাগ ভিত্তিক আয়",
                    link: route("income.by.sector.index"),
                },
            ],
        },
    ];

    return (
        <>
            {isActive && (
                <>
                    <div className="grid grid-cols-2 relative z-50">
                        <aside
                            className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white transition-full `}
                            aria-label="Sidebar"
                        >
                            <div className="h-full px-3 py-4 overflow-y-auto border-r dark:bg-gray-800">
                                <div className="p-2 mb-3 text-red-500 font-bold flex justify-start">
                                    <img
                                        src={`${domain}/images/logo.png`}
                                        className="h-10"
                                        alt="madrasatu ahmad"
                                    />
                                    <span className="self-center ml-3 font-banglaTitle text-xl font-semibold whitespace-nowrap dark:text-white">
                                        মাদরাসাতু আহমাদ
                                    </span>
                                </div>
                                <ul className="space-y-2 font-medium">
                                    {menus.map((li, index) => {
                                        if (li.submenu.length === 0) {
                                            return (
                                                <ListItem
                                                    key={li.id + index}
                                                    li={li}
                                                />
                                            );
                                        } else {
                                            return (
                                                <LiSubmenu
                                                    key={li.id}
                                                    li={li}
                                                />
                                            );
                                        }
                                    })}
                                </ul>
                            </div>
                        </aside>
                    </div>
                    <div
                        onClick={() => setIsActive()}
                        className="z-40 fixed top-0 left-0 w-full h-screen inset-0 backdrop-blur bg-black/40 flex items-center justify-center"
                    ></div>
                </>
            )}
        </>
    );
}
