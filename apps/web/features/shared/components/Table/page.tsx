import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

const statuses: Payment["status"][] = [
    "pending",
    "processing",
    "success",
    "failed",
];

export const data: Payment[] = Array.from({ length: 20 }, (_, i) => ({
    id: `INV-${1000 + i}`,
    amount: Number(((i + 1) * 23.45).toFixed(2)),
    status: statuses[i % statuses.length],
    email: `user${i + 1}@example.com`,
}));

export default async function DemoPage() {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
