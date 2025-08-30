// components/predict-models.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { GejalaTypes, JenisTanamanTypes, KriteriaTypes, LabelTypes, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { RandomForestRegression } from 'ml-random-forest';
import React, { useState } from 'react';
import InputError from './input-error';
import { Toast } from './ui/toast';
export interface ParameterTransaction {
    indikator_id: number;
    nilai: string | null;
}
interface PredictModelsProps {
    models: {
        ph: RandomForestRegression | null;
        ppm: RandomForestRegression | null;
        ketinggianAir: RandomForestRegression | null;
        label: RandomForestRegression | null;
    };
    normalizationParams: any;
    transactionX: any;
    indikator: KriteriaTypes[];
    actualData: {
        ph: number[];
        ppm: number[];
        ketinggianAir: number[];
        label: number[];
    };
    className?: string;
    opsiGejala: GejalaTypes[];
    jenisTanaman: JenisTanamanTypes[];
}
type Dataset = {
    jenis_tanaman: string;
    label: string;
    attribut: string[];
};
export default function FormPrediction({
    models,
    indikator,
    className,
    opsiGejala,
    jenisTanaman,
}: PredictModelsProps) {
    const { auth } = usePage<SharedData>().props;
    const [errorModel, setErrorModel] = useState<{ text: string; status: boolean }>({ text: '', status: false });
    const [isErrorModel, setIsErrorModel] = useState<boolean>(false);

    const findLabel = async (value: number) => {
        try {
            const response: { status: number; data: LabelTypes } = await axios.get(
                route('randomForest.getLabel', { label: Number(value).toFixed(0) }),
            );
            if (response.status == 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
            return '';
        }
    };
    const { data, setData, errors } = useForm<Dataset>({
        jenis_tanaman: '',
        label: '',
        attribut: indikator.map(() => ''),
    });
    const [predictions, setPredictions] = useState<{
        jenisTanaman: string | null;
        prediksi: {
            ph: number | null;
            ppm: number | null;
            ketinggianAir: number | null;
            label: string | null;
        } | null;
    }>({
        jenisTanaman: null,
        prediksi: null,
    });

    const [metrics, setMetrics] = useState({
        ph: { mse: null as number | null, r2: null as number | null },
        ppm: { mse: null as number | null, r2: null as number | null },
        ketinggianAir: { mse: null as number | null, r2: null as number | null },
        label: { mse: null as number | null, r2: null as number | null },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const key = name.split('.')[1];
        if (/^\d*\.?\d*$/.test(value)) {
            const numValue = Number(value);
            if (!isNaN(numValue)) {
                setData((prevData) => ({
                    ...prevData,
                    attribut: prevData.attribut.map((item, index) => (index === Number(key) ? value : item)),
                }));
            }
        }
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

    const makePrediction = (model: RandomForestRegression, normalizedInput: number[]): any => {
        const inputTensor = [normalizedInput];
        const predictionTensor = model.predict(inputTensor);
        return predictionTensor[0];
    };
    /**
     * Prediksi untuk setiap jenis rumput laut.
     *
     * @description
     * Fungsi ini akan memprediksi nilai dari setiap jenis rumput laut
     * berdasarkan input yang diberikan oleh pengguna. Fungsi ini juga
     * akan menghitung metrik evaluasi model untuk setiap jenis rumput laut.
     *
     * @returns void
     */
    const predictAll = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!models) return;

        const newPredictions: {
            ph: number | null;
            ppm: number | null;
            ketinggianAir: number | null;
            label: number | null;
        } = { ph: null, ppm: null, ketinggianAir: null, label: null };
        const newMetrics = { ...metrics };

        // Initialize empty array for each model key
        const inputArr = data.attribut.map((item) => {
            const found = opsiGejala.find((gejala) => gejala.nama === item);
            return found ? found.id : Number(item);
        });
        const tanaman = jenisTanaman.find((item) => item.nama === data.jenis_tanaman);
        inputArr.push(tanaman?.id || 0);

        try {
            // Prediksi untuk setiap jenis
            Object.keys(models).forEach((key: any) => {
                const model = models[key as keyof typeof models];
                if (!model) return;

                // Initialize the inputArr object outside forEach

                const prediction = makePrediction(model, inputArr);
                newPredictions[key as keyof typeof newPredictions] = prediction;
            });

            console.log(newPredictions);
            if (newPredictions.label) {
                const labelData: LabelTypes = await findLabel(newPredictions.label);
                const jenis = `Keterangan : Nutrisi ${labelData.nama}. <br/> Saran: ${labelData.deskripsi}`;

                setPredictions({
                    jenisTanaman: jenis,
                    prediksi: {
                        ph: newPredictions.ph,
                        ppm: newPredictions.ppm,
                        ketinggianAir: newPredictions.ketinggianAir,
                        label: labelData.nama,
                    },
                });
                if (auth.user) {
                    saveRiwayatUser({
                        jenisTanaman: jenis,
                        prediksi: {
                            ph: newPredictions.ph,
                            ppm: newPredictions.ppm,
                            ketinggianAir: newPredictions.ketinggianAir,
                            label: labelData.nama,
                        },
                    });
                }
            }
            setMetrics(newMetrics);
        } catch (error) {
            console.log(error);
            setErrorModel({
                text: 'Gagal Melakukan prediksi, ini mungkin kesalahan akibat train model yang salah. mohon ulangi sekali lagi',
                status: true,
            });
            setIsErrorModel(true);
        }
    };

    const saveRiwayatUser = async (prediction: {
        jenisTanaman: string;
        prediksi: {
            ph: number | null;
            ppm: number | null;
            ketinggianAir: number | null;
            label: string | null;
        } | null;
    }) => {
        try {
            await axios.post(route('riwayat-klasifikasi.store'), {
                user_id: auth.user.id,
                user: auth.user,
                jenis_tanaman: prediction.jenisTanaman,
                label: JSON.stringify(prediction.prediksi),
                attribut: data.attribut,
                kriteria: indikator.map((item) => item),
            });
        } catch (err) {
            console.log('gagal menyimpan riwayat', err);
        }
    };
    return (
        <div className={'rounded-lg border bg-white p-6 shadow'}>
            <Toast open={isErrorModel} onOpenChange={setIsErrorModel} title="Terjadi Kesalahan Prediksi" description={errorModel.text} />
            <h3 className="mb-4 text-lg font-semibold">Prediksi 4 Jenis Rumput Laut</h3>
            <div className={cn('grid grid-cols-1 gap-4', className)}>
                <form onSubmit={predictAll} className="col-span-1">
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
                        {indikator.map((item: any, index: number) => {
                            if (item === 'gejala') {
                                return (
                                    <div key={index}>
                                        <Label htmlFor={`attribut.${index}`} className="text-xs text-gray-600">
                                            {item}
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
                                                {opsiGejala.map((gejala: GejalaTypes, index) => (
                                                    <SelectItem key={index} value={gejala.nama}>
                                                        {gejala.nama}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            }
                            if (item.toLowerCase().includes('ph')) {
                                return (
                                    <div key={index}>
                                        <Label htmlFor={`attribut.${index}`} className="text-xs text-gray-600">
                                            {item}
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
                                                {['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((gejala: any, index) => (
                                                    <SelectItem key={index} value={gejala}>
                                                        {gejala}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-gray-400">ph 1...5 itu kurang 6..7 itu sehat dan 8 itu brlebihan</p>
                                    </div>
                                );
                            }
                            return (
                                <div key={index}>
                                    <Label className="text-xs text-gray-600">{item}</Label>
                                    <Input
                                        type="text"
                                        name={`attribut.${index}`}
                                        value={data.attribut[index] || ''}
                                        onChange={handleChange}
                                        className="input-minimal"
                                        placeholder={`masukkan ${item}`}
                                        required
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <Button type="submit" variant={'default'} className="mt-4 w-full">
                        Prediksi Semua
                    </Button>
                </form>
                <div className="col-span-1">
                    {(predictions.jenisTanaman !== null || predictions.prediksi !== null) && (
                        <div className="mt-6 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                {predictions.jenisTanaman && <PredictionCard title={predictions.jenisTanaman} value={predictions.prediksi} />}

                                {/* 3 card lainnya untuk jenis yang lain */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const PredictionCard = ({
    title,
    value,
}: {
    title: string;
    value: {
        ph: number | null;
        ppm: number | null;
        ketinggianAir: number | null;
        label: string | null;
    } | null;
}) => (
    <div className="rounded-lg bg-green-50 p-4">
        <h4 className="font-medium text-green-800" dangerouslySetInnerHTML={{__html : title}} />
        <table>
            <tbody>
                <tr>
                    <th className="border p-2 text-xs">PH</th>
                    <th className="border p-2 text-xs">PPM</th>
                    <th className="border p-2 text-xs">Ketinggian Air</th>
                    <th className="border p-2 text-xs">Label</th>
                </tr>
                <tr>
                    <td className="border p-2 text-center">{value?.ph?.toFixed(2)}</td>
                    <td className="border p-2 text-center">{value?.ppm?.toFixed(2)}</td>
                    <td className="border p-2 text-center">{value?.ketinggianAir?.toFixed(2)}</td>
                    <td className="border p-2 text-center">{value?.label}</td>
                </tr>
            </tbody>
        </table>
    </div>
);
