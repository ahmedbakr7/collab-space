import LogoIcon from "../LogoIcon/LogoIcon";

export default function Logo({ className="" }: { className?: string }) {
    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <LogoIcon />
            <span className="font-semibold">CollabSpace</span>
        </div>
    );
}
