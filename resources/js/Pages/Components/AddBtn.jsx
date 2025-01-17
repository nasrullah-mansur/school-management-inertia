import { Link } from "@inertiajs/react";
import React from "react";
import { GiReceiveMoney } from "react-icons/gi";

export default function AddBtn({ href, onClick }) {
    return (
        <Link
            onClick={onClick}
            href={href ? href : "#"}
            className=" rounded-sm px-3 py-2 text-white flex justify-center items-center bg-blue-700 ml-1 transition-all duration-300 hover:bg-blue-800 shadow-lg"
        >
            <span className="mr-1">নগদ গ্রহন করুন</span>
            <GiReceiveMoney className="text-2xl" />
        </Link>
    );
}
