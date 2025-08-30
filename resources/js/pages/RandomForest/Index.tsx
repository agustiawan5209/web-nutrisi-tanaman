/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
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

                // console.log(labelModel)
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
  //  history tabel
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Paginate data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataTraining?.training.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(dataTraining?.training.length / itemsPerPage);
    const findGejala = (value: number) => {
        return opsiGejala.find((label) => label.id === value)?.nama;
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={titlePage ?? 'Indikator'} />

            {/* Data */}
            <Card>
                 {dataTraining && (
                        <div className="mt-4">
                            <h3 className="text-md mb-2 font-semibold">Data Training</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border bg-white">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2">No.</th>
                                            {dataTraining.kriteria.map((kriteria, index) => (
                                                <th key={index} className="border px-4 py-2">
                                                    {kriteria}
                                                </th>
                                            ))}
                                            <th className="border px-4 py-2">Jenis Tanaman</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td className="border px-4 py-2"> {indexOfFirstItem + rowIndex + 1}</td>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="border px-4 py-2">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="order-2 text-xs text-gray-500 sm:order-1 md:text-sm whitespace-nowrap">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, dataTraining.training.length)} of{' '}
                                        {dataTraining.training.length} entries
                                    </div>
                                    <Pagination className="order-1 sm:order-2">
                                        <PaginationContent className="flex-wrap justify-center">
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                                    size={undefined}
                                                />
                                            </PaginationItem>
                                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                                let page;
                                                if (totalPages <= 5) {
                                                    page = i + 1;
                                                } else if (currentPage <= 3) {
                                                    page = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    page = totalPages - 4 + i;
                                                } else {
                                                    page = currentPage - 2 + i;
                                                }
                                                return (
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            isActive={page === currentPage}
                                                            onClick={() => setCurrentPage(page)}
                                                            size={undefined}
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                );
                                            })}
                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                                    size={undefined}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </div>
                        </div>
                    )}
                {/* Result Section */}
                {dataTraining.training.length > 5 && kriteria.length > 0 && !isLoadingModel ? (
                    <TrainModels indikator={dataTraining.kriteria} transactionX={dataTraining.training} transactionY={dataTraining.transactionY} onModelsTrained={handleModelsTrained} />
                ) : (
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Data tidak cukup</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Data panen harus lebih dari lima agar model dapat diuji. Silakan tambahkan data panen terlebih dahulu.
                            </p>
                        </div>
                    </div>
                )}
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
        </AppLayout>
    );
}

