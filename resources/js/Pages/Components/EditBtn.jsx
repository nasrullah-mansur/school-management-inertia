import { Link } from "@inertiajs/react";
import { TbDatabaseEdit } from "react-icons/tb";

export default function EditBtn({ href }) {
    return (
        <Link
            href={href}
            className="rounded-sm px-3 py-1 text-white flex justify-center items-center bg-green-700 ml-1 transition-all duration-300 hover:bg-green-800 shadow-lg"
        >
            <span className="font-sans block text-nowrap mr-1">Edit</span>
            <TbDatabaseEdit className="w-5 h-5" />
        </Link>
    );
}
