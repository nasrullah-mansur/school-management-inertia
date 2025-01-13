import { Link } from "@inertiajs/react";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function DeleteBtn({ href }) {
    return (
        <Link
            href={href}
            className="w-9 h-9 rounded-sm text-white flex justify-center items-center bg-red-700 ml-1 transition-all duration-300 hover:bg-red-800 shadow-lg"
        >
            <RiDeleteBin5Line className="w-5 h-5" />
        </Link>
    );
}
