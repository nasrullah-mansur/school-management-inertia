const select2style = {
    control: (baseStyles) => ({
        ...baseStyles,
        padding: "3px",
        fontSize: "8px", // Note: Font size may require adjusting other styles for consistent appearance
        fontFamily: "Hind Siliguri",
    }),
};

const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
];

export { select2style, statusOptions };
