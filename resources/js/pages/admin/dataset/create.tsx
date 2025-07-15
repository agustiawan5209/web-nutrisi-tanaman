import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, JenisTanamanTypes, KriteriaTypes } from '@/types';
import { Head, useForm } from '@inertiajs/react';

type JenisRumputLaut = {
    nama: string;
    jumlah: number;
};

type Dataset = {
    jenis_tanaman: string;
    label: string;
    attribut: {
        kriteria_id: number;
        nilai: string | null;
    }[];
};

const daftarBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const opsiKejernihan = ['Sangat Jernih', 'Jernih', 'Agak Keruh', 'Keruh', 'Sangat Keruh'];
const opsiCahaya = ['Sangat Cerah', 'Cerah', 'Berawan', 'Mendung', 'Gelap'];
const opsiArus = ['Sangat Kuat', 'Kuat', 'Sedang', 'Lemah', 'Sangat Lemah'];
const opsiNutrisi = ['Melimpah', 'Cukup', 'Terbatas', 'Sangat Sedikit'];
const opsiLabel = ['Buruk', 'Cukup', 'Baik', 'Sangat Baik'];

interface PropsDatasetView {
    breadcrumb: BreadcrumbItem[];
    kriteria: KriteriaTypes[];
    jenisTanaman: JenisTanamanTypes[];
    titlePage?: string;
}

export default function FormDatasetView({ breadcrumb, kriteria, jenisTanaman, titlePage }: PropsDatasetView) {
    const breadcrumbs: BreadcrumbItem[] = breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : [];
    const { data, setData, post, processing, errors } = useForm<Dataset>({
        jenis_tanaman: '',
        label: '',
        attribut: kriteria.map((_, index) => ({
            kriteria_id: kriteria[index].id,
            nilai: null,
        })),
    });

    console.log(data.attribut)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const key = name.split('.')[1];
        setData((prevData) => ({
            ...prevData,
            attribut: prevData.attribut.map((item, index) => {
                if (index === Number(key)) {
                    return {
                        ...item,
                        nilai: value,
                    };
                }
                return item;
            }),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Tambahkan logika submit di sini
        post(route('admin.dataset.store'), {
            onError: (err) => {
                console.log(err);
            },
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        if (name && value !== undefined && data && data.attribut) {
            if (name === 'label' || name === 'jenis_tanaman') {
                setData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setData((prevData) => ({
                    ...prevData,
                    attribut: {
                        ...prevData.attribut,
                        [name]: value,
                    },
                }));
            }
        } else {
            console.error('Invalid data: name, value, or attribut may be undefined');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={titlePage ?? 'Input Data Panen Rumput Laut'} />
            <div className="mx-auto max-w-7xl rounded-xl border border-gray-100 bg-white p-6 shadow">
                <h1 className="mb-6 text-center text-xl font-semibold text-primary">Input Data Panen Rumput Laut</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informasi Dasar */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <Label className="text-xs text-gray-600">Jenis Tanaman</Label>
                            <Select value={data.jenis_tanaman} required onValueChange={(value) => handleSelectChange('jenis_tanaman', value)}>
                                <SelectTrigger className="input-minimal">
                                    <SelectValue placeholder="Pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jenisTanaman.map((item: any, index) => (
                                        <SelectItem key={index} value={item.nama}>
                                            {item.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.jenis_tanaman && <InputError message={errors.jenis_tanaman} className="mt-2" />}
                        </div>
                        <div>
                            <Label className="text-xs text-gray-600">Label</Label>
                            <Select value={data.label} required onValueChange={(value) => handleSelectChange('label', value)}>
                                <SelectTrigger className="input-minimal">
                                    <SelectValue placeholder="Pilih" />
                                </SelectTrigger>
                                <SelectContent>
                                    {opsiLabel.map((item: any, index) => (
                                        <SelectItem key={index} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.label && <InputError message={errors.label} className="mt-2" />}
                        </div>
                    </div>

                    {/* Parameter Lingkungan */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {kriteria.map((item: any, index: number) => {
                            return (
                                    <div key={index}>
                                        <Label className="text-xs text-gray-600">{item.nama}</Label>
                                        <Input
                                            type="text"
                                            name={`attribut.${index}`}
                                            value={data.attribut[index].nilai || ''}
                                            onChange={handleChange}
                                            className="input-minimal"
                                            placeholder={`masukkan ${item.nama}`}
                                        />
                                    </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="hover:bg-primary-dark rounded bg-primary px-6 py-2 font-medium text-white transition">
                            Simpan Data
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
                .input-minimal {
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 8px 12px;
                    font-size: 14px;
                    outline: none;
                    transition: border 0.2s;
                }
                .input-minimal:focus {
                    border-color: var(--color-primary, #2563eb);
                    background: #fff;
                }
                .bg-primary { background-color: var(--color-primary, #2563eb); }
                .bg-primary-dark { background-color: var(--color-primary-dark, #1d4ed8); }
                .text-primary { color: var(--color-primary, #2563eb); }
            `}</style>
        </AppLayout>
    );
}
