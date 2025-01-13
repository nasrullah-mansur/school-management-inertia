import { Link } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";

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

export default function Sidebar() {
    const [isActive, setIsActive] = useState(false);

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
                {
                    id: "৩",
                    name: "মাসসমূহ",
                    link: route("month.index"),
                },
            ],
        },
        {
            id: "2",
            name: "menu two",
            submenu: [
                {
                    id: "1",
                    name: "sub menu one",
                    link: "#",
                },
                {
                    id: "2",
                    name: "sub menu two",
                    link: "#",
                },
            ],
        },
    ];

    return (
        <>
            <button
                onClick={() => setIsActive(!isActive)}
                className={`bg-white -translate-x-1/2 absolute w-10 h-10 border-green-500 flex justify-center items-center rounded-full z-[99] ${
                    isActive ? "left-64" : "left-0"
                } top-36 z-50 border`}
            >
                <svg
                    className={`w-6 h-6 text-green-500 dark:text-white ${
                        isActive && "rotate-180"
                    }`}
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
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                </svg>
            </button>

            {isActive && (
                <>
                    <div className="grid grid-cols-2 relative z-50">
                        <aside
                            className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white transition-full `}
                            aria-label="Sidebar"
                        >
                            <div className="h-full px-3 py-4 overflow-y-auto border-r dark:bg-gray-800">
                                <div className="p-2 mb-3 text-red-500 font-bold">
                                    Nasrullah Mansur
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
                        onClick={() => setIsActive(!isActive)}
                        className="z-40 fixed top-0 left-0 w-full h-screen inset-0 backdrop-blur bg-white/10 flex items-center justify-center"
                    ></div>
                </>
            )}
        </>
    );
}
