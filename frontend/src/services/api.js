const API_BASE_URL = 'http://localhost:8080';

export const analyzeModel = async (modelId, modelType) => {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId, modelType }),
    });

    if (!response.ok) {
        throw new Error('Analysis failed');
    }

    return await response.json();
}