/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { BreadcrumbItem, GejalaTypes, JenisTanamanTypes, KriteriaTypes, LabelTypes } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { LoaderIcon } from 'lucide-react';
import { RandomForestClassifier, RandomForestRegression } from 'ml-random-forest';
import { useEffect, useMemo, useState } from 'react';
import FormClassifier from '@/components/form-classifier';
import { loadModelFromDB } from '@/utils/modelStorage';
import TrainModels from '@/components/train-model';
import FormPrediction from '@/components/form-prediction';
import MainLayout from '@/layouts/guest/main-layout';

interface RandomForestViewProps {
    dataTraining: {
        training: string[][];
        kriteria: KriteriaTypes[];
        transactionY: {
            ph: number;
            ppm: number;
            ketinggianAir: number;
            label: number;
        }[]
    };
    breadcrumb?: BreadcrumbItem[];
    titlePage?: string;
    kriteria: KriteriaTypes[];
    jenisTanaman: JenisTanamanTypes[];
    opsiLabel: LabelTypes[];
    opsiGejala: GejalaTypes[];
}

interface TrainingData {
    features: number[][];
    labels: number[];
    featureNames: string[];
}

export default function RandomForestView({ dataTraining, breadcrumb, titlePage, kriteria, jenisTanaman, opsiLabel, opsiGejala }: RandomForestViewProps) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => (breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : []),
        [breadcrumb],
    );
    // console.log(dataTraining.transactionY)
    const [isLoadingModel, setIsLoadingModel] = useState<boolean>(false);
    const [errorModel, setErrorModel] = useState<{ text: string; status: boolean }>({ text: '', status: false });

    const [models, setModels] = useState({
        ph: null as RandomForestRegression | null,
        ppm: null as RandomForestRegression | null,
        ketinggianAir: null as RandomForestRegression | null,
        label: null as RandomForestRegression | null,
    });

    const [normalizationParams, setNormalizationParams] = useState<any>(null);
    const [isLoadingModels, setIsLoadingModels] = useState(false);
    const [indikatorData, setIndikatorData] = useState<KriteriaTypes[]>(kriteria ?? [])
    const handleModelsTrained = (
        trainedModels: {
            ph: RandomForestRegression;
            ppm: RandomForestRegression;
            ketinggianAir: RandomForestRegression;
            label: RandomForestRegression;
        },
        params: any,
    ) => {
        setModels(trainedModels);
        setNormalizationParams(params);
    };

    // Memuat model saat komponen mount
    useEffect(() => {
        const loadModels = async () => {
            setIsLoadingModels(true);
            try {
                const [
                    { indikator: indikator0, model: phModel },
                    { indikator: indikator1, model: ppmModel },
                    { indikator: indikator2, model: ketinggianAirModel },
                    { indikator: indikator3, model: labelModel },
                ] = await Promise.all([
                    loadModelFromDB('ph'),
                    loadModelFromDB('ppm'),
                    loadModelFromDB('ketinggianAir'),
                    loadModelFromDB('label'),
                ]);
                // console.log(indikator0)
                setIndikatorData(indikator0);

                setModels({
                    ph: phModel,
                    ppm: ppmModel,
                    ketinggianAir: ketinggianAirModel,
                    label: labelModel,
                });


            } finally {
                setIsLoadingModels(false);
            }
        };

        loadModels();
    }, []);

    return (
        <MainLayout>
            <Head title={titlePage ?? 'Indikator'} />

            {/* Data */}
            <Card>

                {models && (
                    <FormPrediction
                        models={models}
                        normalizationParams={normalizationParams}
                        opsiGejala={opsiGejala}
                        jenisTanaman={jenisTanaman}
                        indikator={dataTraining.kriteria}
                        transactionX={dataTraining.training}
                        actualData={{
                            ph: dataTraining.transactionY.map((p) => p.ph),
                            ppm: dataTraining.transactionY.map((p) => p.ppm),
                            ketinggianAir: dataTraining.transactionY.map((p) => p.ketinggianAir),
                            label: dataTraining.transactionY.map((p) => p.label),
                        }}
                    />
                )}
            </Card>
        </MainLayout>
    );
}

