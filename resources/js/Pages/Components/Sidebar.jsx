import { useState } from "react";

const ListItem = ({ li }) => {
    return (
        <li>
            <a
                href={li.link}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">{li.name}</span>
            </a>
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
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    {li.name}
                </span>
                <svg
                    className={`w-3 h-3 ${!active && "rotate-180"}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <ul className={`${active && "hidden"} py-2 space-y-2`}>
                {li.submenu.map((sub) => (
                    <li>
                        <a
                            href={sub.link}
                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                            {sub.name}
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default function Sidebar() {
    const menus = [
        {
            id: "3",
            name: "Menu One",
            link: "#",
            submenu: [],
        },
        {
            id: "1",
            name: "menu one",
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
            <div className="grid grid-cols-2">
                <aside
                    className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
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
                                        <ListItem key={li.id + index} li={li} />
                                    );
                                } else {
                                    return <LiSubmenu key={li.id} li={li} />;
                                }
                            })}
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
}
