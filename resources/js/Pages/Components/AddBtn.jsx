import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function AddBtn() {
    return (
        <Link
            href={backLink ? backLink : "#"}
            className="w-9 h-9 rounded-sm text-white flex justify-center items-center bg-blue-700 ml-1 transition-all duration-300 hover:bg-blue-800 shadow-lg"
        >
            <RiArrowGoBackFill className="w-5 h-5" />
        </Link>
    );
}
