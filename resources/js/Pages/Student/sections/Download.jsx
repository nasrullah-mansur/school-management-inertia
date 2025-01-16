import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import Filter from "./Filter";

export default function Download({ years, sectors }) {
    const [isFilter, setIsFilter] = useState(false);

    return (
        <>
            <div className="flex sm:order-1 md:order-2 mb-4 md:mb-0">
                <a
                    target="_blank"
                    href={route("students.pdf")}
                    className="px-4 mr-2 h-12 rounded-sm bg-blue-600 cursor-pointer flex justify-center items-center text-white"
                >
                    <span className="font-banglaTitle font-medium mr-2">
                        Excel
                    </span>
                    <LuDownload />
                </a>
                <button
                    onClick={() => setIsFilter(!isFilter)}
                    className="w-12 h-12 rounded-sm bg-blue-600 cursor-pointer flex justify-center items-center text-white"
                >
                    <IoFilter className="text-[22px]" />
                </button>
            </div>
            {isFilter && (
                <Filter
                    isFilter={isFilter}
                    onIsFilter={() => setIsFilter(!isFilter)}
                    years={years}
                    sectors={sectors}
                />
            )}
        </>
    );
}
