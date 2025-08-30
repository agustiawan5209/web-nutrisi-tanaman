import { DeleteConfirmationForm } from '@/components/delete-confirmation-form';
import PaginationTable from '@/components/pagination-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserAuthLayout from '@/layouts/guest/user-auth-layout';
import { BreadcrumbItem, DatasetTypes } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EyeIcon, PenBoxIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
interface IndikatorIndexProps {
    riwayat: {
        current_page: number;
        data: {
            id: number;
            user: string;
            jenis_tanaman: string;
            label: string;
            attribut: string[];
            created_at: string;
        }[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url?: string;
        path: string;
        per_page: number;
        prev_page_url: string;
        to: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    breadcrumb?: BreadcrumbItem[];
    titlePage?: string;
}

export default function IndikatorIndex({ riwayat, breadcrumb, titlePage }: IndikatorIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => (breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : []),
        [breadcrumb],
    );

    const [isDeleteDialog, setisDeleteDialog] = useState(false);

    const formatDate = (value: string) => {
        return new Date(value).toLocaleDateString('id-ID', {
            hour: 'numeric',
            minute: '2-digit',
            weekday: 'long',   // Senin, Selasa, ...
            day: 'numeric',    // 1, 2, ...
            month: 'long',     // Januari, Februari, ...
            year: 'numeric',    // 2025
        });
    }
    const labelParse = (value : string)=>{
        const label = JSON.parse(value);

        return (<table>
            <tbody>
                <tr>
                    <th className="border p-2 text-xs">PH</th>
                    <th className="border p-2 text-xs">PPM</th>
                    <th className="border p-2 text-xs">Ketinggian Air</th>
                    <th className="border p-2 text-xs">Label</th>
                </tr>
                <tr>
                    <td className="border p-2 text-center">{label?.ph?.toFixed(2)}</td>
                    <td className="border p-2 text-center">{label?.ppm?.toFixed(2)}</td>
                    <td className="border p-2 text-center">{label?.ketinggianAir?.toFixed(2)}</td>
                    <td className="border p-2 text-center">{label?.label}</td>
                </tr>
            </tbody>
        </table>)
    }
    return (
        <UserAuthLayout >
            <Head title={titlePage ?? 'Indikator'} />

            {/* Data */}
            <Card>
                <div className="container mx-auto px-4">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-lg font-bold md:text-xl">Riwayat Klasifikasi Nutrisi Tanaman</h2>

                    </div>
                    <div className="overflow-x-auto rounded-md border">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="cursor-pointer">no</TableHead>
                                    <TableHead className="cursor-pointer">Tanggal</TableHead>
                                    <TableHead className="cursor-pointer">Pengguna</TableHead>
                                    <TableHead className="cursor-pointer">Jenis Tanaman</TableHead>
                                    <TableHead className="cursor-pointer">Label (Nutrisi)</TableHead>
                                    <TableHead className="cursor-pointer">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {riwayat.data && riwayat.data.length ? (
                                    riwayat.data.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{formatDate(item.created_at)}</TableCell>
                                            <TableCell>{JSON.parse(item.user).name}</TableCell>
                                            <TableCell>
                                                <p dangerouslySetInnerHTML={{__html: item.jenis_tanaman}} />
                                            </TableCell>
                                            <TableCell>{labelParse(item.label)}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-row items-center gap-2">
                                                    <Link href={route('guest.riwayat.show', { riwayat: item.id })}>
                                                        <Button variant={'default'} type="button" className="bg-chart-1">
                                                            <EyeIcon size={4} />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="py-4 text-center">
                                            No data found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <PaginationTable links={riwayat.links} data={riwayat} />
                    </div>
                </div>
            </Card>
        </UserAuthLayout>
    );
}
