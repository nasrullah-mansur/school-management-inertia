export default function ApplicationLogo(props) {
    const domain = window.location.origin;

    return (
        <div className="flex flex-col justify-center items-center">
            <img
                className={`w-16`}
                src={`${domain}/images/logo.png`}
                alt="logo"
            />
            <span className="block mt-2 font-banglaTitle">Madrasatu Ahmad</span>
        </div>
    );
}
