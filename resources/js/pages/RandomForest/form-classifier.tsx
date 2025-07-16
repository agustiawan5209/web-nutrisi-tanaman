import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toast } from '@/components/ui/toast';
import { JenisTanamanTypes, KriteriaTypes } from '@/types';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { RandomForestClassifier } from 'ml-random-forest';
import React, { useEffect, useState } from 'react';

interface FormData {
    feature1: string;
    feature2: string;
    feature3: string;
    // Add more features as needed
}

const initialFormData: FormData = {
    feature1: '',
    feature2: '',
    feature3: '',
};
const opsiLabel = [
    { label: 'Buruk', value: 0 },
    { label: 'Cukup', value: 1 },
    { label: 'Baik', value: 2 },
    { label: 'Sangat Baik', value: 3 },
];
const opsiGejala = [
    { label: 'daun menguning', value: 0 },
    { label: 'pertumbuhan lambat', value: 1 },
    { label: 'ujung daun mengering', value: 2 },
    { label: 'daun sehat', value: 3 },
    { label: 'batang rapuh', value: 4 },
    { label: 'daun menggulung', value: 5 },
];
type Dataset = {
    jenis_tanaman: string;
    label: string;
    attribut: string[];
};
const findLabel = (value: number) => {
    return opsiLabel.find((label) => label.value === value)?.label;
};
const FormClassifier = ({ kriteria, jenisTanaman }: { kriteria: KriteriaTypes[]; jenisTanaman: JenisTanamanTypes[] }) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState<RandomForestClassifier | null>(null);
    const { data, setData, post, processing, errors } = useForm<Dataset>({
        jenis_tanaman: '',
        label: '',
        attribut: kriteria.map((_, index) => ''),
    });
    const [toast, setToast] = useState<{title: string; show: boolean; message: string; type: 'success' | 'default' | 'error'}>({
        title: "",
        show: false,
        message: '',
        type: 'success',
    })
    const getModel = async () => {
        try {
            const response = await axios.get('/random-forest/get-model');

            // Pastikan response memiliki struktur yang diharapkan
            if (!response.data?.model) {
                throw new Error('Invalid model response structure');
            }

            // Rekonstruksi model dari data serialisasi
            const modelData = response.data.model;
            const classifier = RandomForestClassifier.load(modelData);

            setModel(classifier);
            return classifier; // Mengembalikan model untuk penggunaan lanjutan
        } catch (error) {
            console.error('Failed to load model:', error);
            setToast({
                title: 'Error',
                show: true,
                message: 'Gagal memuat model',
                type: 'error',
            })
            // Tambahkan penanganan error ke user (misal: toast notification)
            throw error; // Re-throw untuk penanganan di komponen pemanggil
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getModel();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const attribut = data.attribut.map((item) => {
                const found = opsiGejala.find((gejala) => gejala.label === item);
                return found ? found.value : Number(item);
            });
            const tanaman = jenisTanaman.find((item) => item.nama === data.jenis_tanaman);
            attribut.push(tanaman?.id || 0);
            const options = {
                seed: 42,
                maxFeatures: 2,
                replacement: true,
                nEstimators: 100,
                // maxDepth: 5, // Tambahkan pembatasan kedalaman
                useSampleBagging: true,
            };

            if (model) {
                const predict = model.predict([attribut]);

                setResult(`Hasil Prediksi: ${findLabel(predict[0])}`);
            }
            // const predict = model?.predict();
            // Replace with your API endpoint for classification
        } catch (error) {
            setResult('Error during classification');
            setToast({
                title: 'Error',
                show: true,
                message: 'Gagal memuat hasil klasifikasi',
                type: 'error',
            })
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const key = name.split('.')[1];
        setData((prevData) => ({
            ...prevData,
            attribut: prevData.attribut.map((item, index) => {
                if (index === Number(key)) {
                    return value;
                } else {
                    return item;
                }
            }),
        }));
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
                    attribut: prevData.attribut.map((item, index) => {
                        if (index === Number(name)) {
                            return value;
                        } else {
                            return item;
                        }
                    }),
                }));
            }
        } else {
            console.error('Invalid data: name, value, or attribut may be undefined');
        }
    };
    return (
        <div>
            <Toast
                            open={toast.show}
                            onOpenChange={()=> setToast((prev) => ({ ...prev, show: false }))}
                            title={toast.title}
                            description={toast.message}
                            duration={5000}
                            variant={toast.type}
                        />
            <h2 className="mb-4 text-2xl font-bold">Random Forest Classification</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    {kriteria.map((item: any, index: number) => {
                        if (item.nama === 'gejala') {
                            return (
                                <div key={index}>
                                    <Label htmlFor={`attribut.${index}`} className="text-xs text-gray-600">
                                        {item.nama}
                                    </Label>
                                    <Select
                                        value={data.attribut[index] || ''}
                                        required
                                        onValueChange={(value) => handleSelectChange(index.toLocaleString(), value)}
                                    >
                                        <SelectTrigger className="input-minimal">
                                            <SelectValue placeholder="Pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {opsiGejala.map((gejala: any, index) => (
                                                <SelectItem key={index} value={gejala.label}>
                                                    {gejala.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            );
                        }
                        return (
                            <div key={index}>
                                <Label className="text-xs text-gray-600">{item.nama}</Label>
                                <Input
                                    type="text"
                                    name={`attribut.${index}`}
                                    value={data.attribut[index] || ''}
                                    onChange={handleChange}
                                    className="input-minimal"
                                    placeholder={`masukkan ${item.nama}`}
                                    required
                                />
                            </div>
                        );
                    })}
                </div>
                {/* Add more feature inputs as needed */}
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" disabled={loading}>
                    {loading ? 'Classifying...' : 'Classify'}
                </button>
            </form>
            {result && (
                <div className="mt-4 rounded bg-gray-100 p-3">
                    <strong>Result:</strong>
                    <div className="flex items-center">
                        <div
                            className={`w-4 h-4 rounded-full mr-2 ${
                                result === "Buruk"
                                    ? 'bg-red-500'
                                    : result === "Cukup"
                                    ? 'bg-yellow-500'
                                    : result === "Baik"
                                    ? 'bg-green-500'
                                    : 'bg-blue-500'
                            }`}
                        />
                        <span>{result}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormClassifier;
