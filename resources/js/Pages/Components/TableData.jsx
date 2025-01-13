export default function TableData({ children, className }) {
    return (
        <td className={`px-4 py-3 ${className && className}`}>{children}</td>
    );
}
