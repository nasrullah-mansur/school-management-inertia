import React from "react";

export default function Cart({ title, children }) {
    return (
        <div className="w-full relative mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                {title}
            </h5>
            {children}
        </div>
    );
}
