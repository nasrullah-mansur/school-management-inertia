export default function Status({ status }) {
    const statusColor = () => {
        if (status == "active") {
            return "bg-green-600";
        }

        if (status == "inactive") {
            return "bg-red-600";
        }

        if (status == "past") {
            return "bg-fuchsia-600";
        } else {
            return "bg-gray-600";
        }
    };

    return (
        <span
            className={`font-banglaTitle ${statusColor()} px-1 rounded-sm text-sm text-white`}
        >
            {status}
        </span>
    );
}
