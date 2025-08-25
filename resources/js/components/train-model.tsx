// components/train-models.tsx
import { Button } from '@/components/ui/button';
import { KriteriaTypes } from '@/types';
import { saveModelToDB } from '@/utils/modelStorage';
import { useState } from 'react';
import { Toast } from './ui/toast';
import { RandomForestRegression } from 'ml-random-forest';

interface TrainModelsProps {
    indikator: KriteriaTypes[];
    transactionX: any[];
    transactionY: {
        ph: number;
        ppm: number;
        ketinggianAir: number;
    }[];
    onModelsTrained: (
        models: {
            ph: RandomForestRegression;
            ppm: RandomForestRegression;
            ketinggianAir: RandomForestRegression;
        },
        normalizationParams: any,
    ) => void;
}

export default function TrainModels({ indikator, transactionX, transactionY, onModelsTrained }: TrainModelsProps) {
    const [errorModel, setErrorModel] = useState<{ title: string;text: string; status: boolean; variant: 'default' | 'error' }>({ title: '',text: '', status: false, variant: 'default' });
    const [isErrorModel, setIsErrorModel] = useState<boolean>(false);

    const [training, setTraining] = useState(false);
    const [progress, setProgress] = useState({
        ph: 0,
        ppm: 0,
        ketinggianAir: 0,
    });

    const initModel = () => {
        const options = {
            seed: 42,
            maxFeatures: 2,
            replacement: true,
            nEstimators: 100,
            // maxDepth: 5, // Tambahkan pembatasan kedalaman
            useSampleBagging: true,
        };
        const model = new RandomForestRegression(options);
        return model;
    };

    const normalize = (value: number, min: number, max: number) => {
        if (min === max) return 0;
        return Math.min(1, Math.max(0, (value - min) / (max - min)));
    };

    const trainAllModels = async () => {
        setTraining(true);
        try {
            // 1. VALIDASI DATA AWAL YANG KRITIS
            if (!Array.isArray(transactionX) || !Array.isArray(transactionY)) {
                throw new Error('transactionX atau transactionY bukan array');
            }

            if (transactionX.length === 0 || transactionY.length === 0) {
                throw new Error('Data training (transactionX atau transactionY) kosong');
            }

            if (transactionX.length !== transactionY.length) {
                throw new Error(`Jumlah data tidak konsisten. transactionX: ${transactionX.length}, transactionY: ${transactionY.length}`);
            }

            // 2. Persiapan InputXs - Hanya assign, tidak perlu map
            const InputXs = transactionX; // Asumsi: transactionX sudah berupa array 2D [ [x1, x2, ...], ... ]

            // 3. Inisialisasi model
            const models = {
                ph: initModel(),
                ppm: initModel(),
                ketinggianAir: initModel(),
            };

            // 4. Fungsi training dengan error handling yang lebih spesifik
            const trainSingleModel = async (model: RandomForestRegression, outputKey: keyof (typeof transactionY)[0]) => {
                try {
                    const outputValues = transactionY.map((point) => point[outputKey]);

                    // Handle array kosong untuk output tertentu (jika mungkin)
                    if (outputValues.length === 0) {
                        throw new Error(`Tidak ada data untuk output: ${outputKey}`);
                    }
                    console.log(`Training model ${outputKey} dengan ${InputXs.length} samples`);
                    model.train(InputXs, outputValues);

                    return model;
                } catch (error) {
                    console.error(`Error training model ${outputKey}:`, error);
                    throw new Error(`Gagal training model ${outputKey}: ${error}`);
                }
            };

            // 5. Training model
            const [phModel, ppmModel, ketinggianAirModel] = await Promise.all([
                trainSingleModel(models.ph, 'ph'),
                trainSingleModel(models.ppm, 'ppm'),
                trainSingleModel(models.ketinggianAir, 'ketinggianAir'),
            ]);

            // 6. Simpan model
            try {
                await Promise.all([
                    saveModelToDB(phModel, 'ph', indikator),
                    saveModelToDB(ppmModel, 'ppm', indikator),
                    saveModelToDB(ketinggianAirModel, 'ketinggianAir', indikator),
                ]);
                setErrorModel({
                    title: "Berhasil",
                    text: "Model Berhasil Dilatih",
                    status: true,
                    variant: 'default'
                });
                setIsErrorModel(true)
            } catch (error) {
                console.error('Error saving models:', error);
                // Pertimbangkan: throw error lagi jika critical?
            }

        } catch (error) {
            console.error('Error in trainAllModels:', error);
            setErrorModel({
                title: 'Terjadi Kesalahan Ketika Melatih Model',
                text: `Gagal melakukan training model: ${error}`,
                status: true,
                variant: 'error'
            });
            setIsErrorModel(true);
        } finally {
            setTraining(false);
        }
    };

    return (
        <div className="rounded-lg border bg-gray-50 p-6">
            <Toast open={isErrorModel} onOpenChange={setIsErrorModel} title={errorModel.title} description={errorModel.text} variant={errorModel.variant} />
            <h3 className="mb-4 text-lg font-semibold">Mulai Pelatihan Model</h3>

            {/* Progress bars untuk 3 model lainnya... */}

            <Button onClick={trainAllModels} disabled={training} className="mt-4 w-full">
                {training ? 'Melatih Semua Model...' : 'Latih Model'}
            </Button>
        </div>
    );
}
