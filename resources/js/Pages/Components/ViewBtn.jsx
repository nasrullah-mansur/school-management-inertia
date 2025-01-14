import { Link } from "@inertiajs/react";
import { BsEye } from "react-icons/bs";

export default function ViewBtn({ href }) {
    return (
        <Link
            href={href}
            className="rounded-sm px-2 py-1 text-white flex justify-center items-center bg-purple-700 ml-1 transition-all duration-300 hover:bg-purple-800 shadow-lg"
        >
            <span className="font-sans text-sm block text-nowrap mr-1">
                View
            </span>
            <BsEye className="w-4 h-4" />
        </Link>
    );
}
