// --- MOCK DATA IMPLEMENTATION ---
const mockVariables = [
    { variable_id: 1, nombre: 'Temperatura', unidad: '°C', descripcion: 'Mide la temperatura del ambiente.' },
    { variable_id: 2, nombre: 'Humedad Relativa', unidad: '%', descripcion: 'Mide la humedad en el aire.' },
    { variable_id: 3, nombre: 'Presión Atmosférica', unidad: 'hPa', descripcion: 'Mide la presión del aire.' },
    { variable_id: 4, nombre: 'Velocidad del Viento', unidad: 'km/h', descripcion: 'Mide la velocidad de las corrientes de aire.' },
    { variable_id: 5, nombre: 'Dirección del Viento', unidad: '°', descripcion: 'Mide la dirección del viento.' },
    { variable_id: 6, nombre: 'Radiación Solar', unidad: 'W/m²', descripcion: 'Mide la radiación solar.' },
    { variable_id: 7, nombre: 'Calidad del Aire (PM2.5)', unidad: 'µg/m³', descripcion: 'Mide partículas finas en el aire.' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Obtiene el listado completo de variables (simulado).
 * @returns {Promise<Object[]>}
 */
export const getVariables = async () => {
    await delay(200);
    console.log("Mock Service: Fetching all variables");
    return [...mockVariables];
};
