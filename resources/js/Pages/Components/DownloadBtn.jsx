import { Link } from "@inertiajs/react";
import { FiDownload } from "react-icons/fi";

export default function DownloadBtn({ href }) {
    return (
        <a
            target="_blank"
            href={href}
            className="rounded-sm px-2 py-1 text-white flex justify-center items-center bg-blue-700 ml-1 transition-all duration-300 hover:bg-blue-800 shadow-lg"
        >
            <span className="font-sans block text-sm text-nowrap mr-1">
                PDF
            </span>
            <FiDownload className="w-4 h-4" />
        </a>
    );
}
