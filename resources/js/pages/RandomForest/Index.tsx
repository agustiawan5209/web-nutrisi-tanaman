import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { RandomForestClassifier } from 'ml-random-forest';
import { useEffect, useMemo, useState } from 'react';

interface IndikatorIndexProps {
    dataTraining: {
        training: string[][];
        kriteria: string[];
    } | null;
    breadcrumb?: BreadcrumbItem[];
    titlePage?: string;
}

interface TrainingData {
    features: number[][];
    labels: number[];
    featureNames: string[];
}

const opsiLabel = [
    { label: 'Buruk', value: 0 },
    { label: 'Cukup', value: 1 },
    { label: 'Baik', value: 2 },
    { label: 'Sangat Baik', value: 3 },
];
const splitDataTraining = (features: number[][], labels: number[], splitRatio = 0.7) => {
    const shuffledIndices = features.map((_, i) => i).sort(() => Math.random() - 0.5);
    const splitIndex = Math.floor(features.length * splitRatio);

    const trainFeatures = shuffledIndices.slice(0, splitIndex).map((i) => features[i]);
    const trainLabels = shuffledIndices.slice(0, splitIndex).map((i) => labels[i]);
    const testFeatures = shuffledIndices.slice(splitIndex).map((i) => features[i]);
    const testLabels = shuffledIndices.slice(splitIndex).map((i) => labels[i]);

    return { trainFeatures, trainLabels, testFeatures, testLabels };
};
export default function IndikatorIndex({ dataTraining, breadcrumb, titlePage }: IndikatorIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => (breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : []),
        [breadcrumb],
    );

    const [trainingData, setTrainingData] = useState<TrainingData | null>(null);
    const [model, setModel] = useState<RandomForestClassifier | null>(null);
    const [prediction, setPrediction] = useState<number[] | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [featureImportance, setFeatureImportance] = useState<{ [key: string]: number } | null>(null);
    const [splitData, setSplitData] = useState<{trainFeatures: number[][], trainLabels: number[], testFeatures: number[][], testLabels: number[]} | null>(null)
    // Preprocess data
    useEffect(() => {
        if (dataTraining && dataTraining.training && dataTraining.kriteria) {
            // Convert string data to numerical format
            const features: number[][] = [];
            const labels: number[] = [];

            // Skip header row if exists
            for (let i = 0; i < dataTraining.training.length; i++) {
                const row = dataTraining.training[i];
                // Last column is assumed to be the label
                const featureRow = row.slice(0, -1).map(Number);
                features.push(featureRow);
                labels.push(opsiLabel.findIndex((label) => label.label === row[row.length - 1]));
            }

            setTrainingData({
                features,
                labels,
                featureNames: dataTraining.kriteria.slice(0, -1),
            });
            const { trainFeatures, trainLabels, testFeatures, testLabels } = splitDataTraining(features, labels, 0.8);
            setSplitData({trainFeatures, trainLabels, testFeatures, testLabels})
        }
    }, [dataTraining]);
    // Bagi data menjadi training dan test set

    // Train model when data is ready
    const [loading, setLoading] = useState(false);
    const runTrainingModel = (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setTimeout(() => {
            try {
                if (trainingData) {
                    const { trainFeatures, trainLabels, testFeatures, testLabels } = splitDataTraining(trainingData.features, trainingData.labels, 0.8);
                    const options = {
                        seed: 42,
                        maxFeatures: 2,
                        replacement: true,
                        nEstimators: 100,
                        // maxDepth: 5, // Tambahkan pembatasan kedalaman
                        useSampleBagging: true,
                    };

                    const classifier = new RandomForestClassifier(options);
                    classifier.train(trainFeatures, trainLabels);

                    // Evaluasi menggunakan test set, bukan data training
                    const testPredictions = classifier.predict(testFeatures);

                    let correct = 0;
                    for (let i = 0; i < testPredictions.length; i++) {
                        if (testPredictions[i] === testLabels[i]) {
                            correct++;
                        }
                    }
                    const acc = (correct / testPredictions.length) * 100;

                    // Compute feature importance manually (using mean decrease in impurity as a proxy)
                    // This is a simple approximation since ml-random-forest does not provide feature importance directly
                    const trees = (classifier as any).estimators || [];
                    const featureCount = trainingData.featureNames.length;
                    const importances = new Array(featureCount).fill(0);

                    trees.forEach((tree: any) => {
                        if (tree && tree.featureImportances) {
                            tree.featureImportances.forEach((imp: number, idx: number) => {
                                importances[idx] += imp;
                            });
                        } else if (tree && tree.root && tree.root.splitFeature !== undefined) {
                            // fallback: count splits per feature
                            const countSplits = (node: any, counts: number[]) => {
                                if (node.splitFeature !== undefined && node.splitFeature !== null) {
                                    counts[node.splitFeature]++;
                                    if (node.left) countSplits(node.left, counts);
                                    if (node.right) countSplits(node.right, counts);
                                }
                            };
                            countSplits(tree.root, importances);
                        }
                    });

                    // Normalize importances
                    const total = importances.reduce((a, b) => a + b, 0) || 1;
                    const featureImportanceMap: { [key: string]: number } = {};
                    trainingData.featureNames.forEach((name, index) => {
                        featureImportanceMap[name] = importances[index] / total;
                    });

                    setModel(classifier);
                    setPrediction(testPredictions);
                    setAccuracy(acc);
                    setFeatureImportance(featureImportanceMap);
                }
            } catch (error) {
                console.error('Error training model:', error);
            } finally {
                setLoading(false);
            }
            setLoading(false);
        }, 1000);
    };

    const findLabel = (value: number) => {
        return opsiLabel.find((label) => label.value === value)?.label;
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={titlePage ?? 'Indikator'} />

            {/* Data */}
            <Card>
                <div className="container mx-auto px-4 py-4">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-lg font-bold md:text-xl">Algoritma Random Forest</h2>
                    </div>

                    {/* {dataTraining && (
                        <div className="mt-4">
                            <h3 className="text-md mb-2 font-semibold">Data Training</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border bg-white">
                                    <thead>
                                        <tr>
                                            {dataTraining.kriteria.map((kriteria, index) => (
                                                <th key={index} className="border px-4 py-2">
                                                    {kriteria}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataTraining.training.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="border px-4 py-2">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )} */}

                    <form onSubmit={runTrainingModel}>
                        <Button type="submit" variant={'default'}>
                            {loading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
                            Mulai Pelatihan Model
                        </Button>
                    </form>
                    {model && (
                        <div className="mt-6">
                            <h3 className="text-md mb-2 font-semibold">Model Information</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="rounded bg-gray-50 p-4">
                                    <h4 className="mb-2 font-medium">Model Accuracy</h4>
                                    <p>{accuracy?.toFixed(2)}%</p>
                                </div>
                                <div className="rounded bg-gray-50 p-4">
                                    <h4 className="mb-2 font-medium">Feature Importance</h4>
                                    <ul>
                                        {featureImportance &&
                                            Object.entries(featureImportance).map(([feature, importance]) => (
                                                <li key={feature} className="mb-1">
                                                    {feature}: {importance.toFixed(4)}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {prediction && (
                        <div className="mt-6">
                            <h3 className="text-md mb-2 font-semibold">Predictions</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border bg-white">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2">Actual</th>
                                            <th className="border px-4 py-2">Predicted</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {splitData?.testLabels?.map((label, index) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{findLabel(label)}</td>
                                                <td className="border px-4 py-2">{findLabel(prediction[index])}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </AppLayout>
    );
}
