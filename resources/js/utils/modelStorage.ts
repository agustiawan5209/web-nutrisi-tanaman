// utils/modelStorage.ts
import axios from 'axios';
import { RandomForestRegression } from 'ml-random-forest';
import { KriteriaTypes } from '@/types';


// Daftarkan kelas Sequential untuk deserialisasi
// Fungsi untuk menyimpan model ke database
export async function saveModelToDB(
    model: RandomForestRegression,
    modelName: string,
    indikator?: any
): Promise<{ success: boolean; message?: string }> {
    try {
        // 3. Siapkan payload untuk API
        const payload = {
            indikator: indikator,
            name: modelName,
            model_json: model.toJSON(),
        };

        // 4. Kirim ke backend Laravel
        const response = await axios.post(route('randomForest.store'), payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response)

        return { success: true, message: 'Model saved successfully' };
    } catch (error) {
        console.error('Error saving model:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}

// Fungsi untuk memuat model dari database
export async function loadModelFromDB(
    modelName: string
): Promise<{ indikator: KriteriaTypes[]; model: RandomForestRegression }> {
    try {
        // 1. Fetch model data from Laravel backend
        const response = await axios.get(route('randomForest.getModel', { modelName: modelName }));
        // 2. Validasi: Cek jika response mengandung error (dari PHP)
        if (response.data.error) {
            throw new Error(response.data.message || `Model ${modelName} tidak ditemukan`);
        }

        // 3. Validasi: Pastikan data yang diperlukan ada
        if (!response.data.indikator || !response.data.model_json) {
            throw new Error('Data model tidak lengkap dari server');
        }

        const { indikator, model_json } = response.data;

        // 4. Reconstruct the model from JSON
        const model = RandomForestRegression.load(model_json);
        // console.log(modelName,indikator, model)

        // 5. Return both the model and normalization parameters
        return { indikator, model };
    } catch (error) {
        console.error('Error loading model:', error);

        // Berikan error message yang lebih informatif
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`Model "${modelName}" tidak ditemukan di server`);
        }

        throw new Error(error instanceof Error ? error.message : 'Failed to load model');
    }
}


export async function savePredictionToDB(
    prediction: string | number,
    modelName: string,
    mse: null | number,
    rsquared: null | number,
): Promise<{ success: boolean; message?: string }> {
    try {

        // 1. Simpan model sementara ke IndexedDB
        await axios.post(route('prediction.store'), {
            model_name: modelName,
            prediction: prediction,
            mse: mse,
            rsquared: rsquared,
        });
        return { success: true, message: 'Model saved successfully' };
    } catch (error) {
        console.error('Error saving prediction:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}
