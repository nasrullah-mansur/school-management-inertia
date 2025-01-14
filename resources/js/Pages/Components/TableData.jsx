export default function TableData({ children, className }) {
    return (
        <td className={`px-2 py-2 ${className && className}`}>{children}</td>
    );
}
