export default function TextInput(props) {
    return (
        <div className={props.type === "hidden" ? "hidden" : ""}>
            {props.label && (
                <label
                    htmlFor={props.id || ""}
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                >
                    {props.label}
                </label>
            )}
            <input
                {...props}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
        </div>
    );
}
