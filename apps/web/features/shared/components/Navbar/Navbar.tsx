import { Bell, Moon } from "lucide-react";
import Searchbar from "../Searchbar/Searchbar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Navbar() {
    return (
        <header className="flex flex-row sticky top-0 h-16 shrink-0 px-4 justify-between items-center  bg-sidebar border-b w-full">
            <Searchbar />
            <div className="flex flex-row">
                <Moon className="mr-2 size-4" />
                <Bell className="size-4" />
            </div>
        </header>
    );
}
