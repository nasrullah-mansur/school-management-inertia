import { Link } from "@inertiajs/react";
import { BsDatabaseAdd } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function PageHeader({ title, subTitle, backLink, addLink }) {
    return (
        <div className="flex justify-between mb-10">
            <div className="border-l-2 pl-2">
                <h1 className="text-xl font-banglaTitle">{title}</h1>
                <p className="font-normal">{subTitle}</p>
            </div>
            <div className="flex">
                <Link
                    href={backLink ? backLink : "#"}
                    className="w-11 h-11 rounded-sm text-white flex justify-center items-center bg-green-700 ml-2 transition-all duration-300 hover:bg-green-800 shadow-lg"
                >
                    <RiArrowGoBackFill className="w-5 h-5" />
                </Link>

                {addLink && (
                    <Link
                        href={addLink ? addLink : "#"}
                        className="w-11 h-11 rounded-sm text-white flex justify-center items-center bg-blue-600 ml-2 transition-all duration-300 hover:bg-blue-700 shadow-md"
                    >
                        <BsDatabaseAdd className="w-5 h-5" />
                    </Link>
                )}
            </div>
        </div>
    );
}