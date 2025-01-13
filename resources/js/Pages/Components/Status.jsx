export default function Status({ status }) {
    return (
        <span
            className={`font-banglaTitle ${
                status == "active" ? "bg-green-600" : "bg-red-600"
            } px-1 rounded-sm text-sm text-white`}
        >
            {status}
        </span>
    );
}
