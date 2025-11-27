// --- MOCK DATA IMPLEMENTATION ---
// Este archivo está modificado para simular un backend en memoria.

// Lista de estaciones en caché para simulación
let mockStations = [
  {
    id: 1,
    nombre: 'Estación Central de Monitoreo',
    latitud: '-33.447487',
    longitud: '-70.673676',
    frecuencia_actualizacion: 30,
    tecnico_id: 2,
  },
  {
    id: 2,
    nombre: 'Punto de Control Norte',
    latitud: '-33.424423',
    longitud: '-70.645851',
    frecuencia_actualizacion: 60,
    tecnico_id: 1,
  },
];

// Lista de técnicos para simulación
const mockTechnicians = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', role: 'technician' },
    { id: 2, name: 'Ana Gómez', email: 'ana.gomez@example.com', role: 'technician' },
    { id: 3, name: 'Luis Martínez', email: 'luis.martinez@example.com', role: 'technician' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Obtiene la lista completa de estaciones (simulado).
 * @returns {Promise<Object[]>}
 */
export const getStations = async () => {
  await delay(500); // Simula latencia de red
  console.log("Mock Service: Fetching stations");
  return [...mockStations];
};

/**
 * Crea o actualiza una estación (simulado).
 * @param {Object} stationData - Los datos de la estación.
 * @returns {Promise<Object>}
 */
export const createOrUpdateStation = async (stationData) => {
  await delay(500);
  const { id, ...data } = stationData;

  if (id) {
    // Actualizar
    console.log("Mock Service: Updating station", id);
    mockStations = mockStations.map(s => s.id === id ? { ...s, ...data, id } : s);
    return { ...data, id };
  } else {
    // Crear
    console.log("Mock Service: Creating new station");
    const newId = Date.now(); // ID temporal único
    const newStation = { ...data, id: newId };
    mockStations.push(newStation);
    return newStation;
  }
};

/**
 * Elimina una estación por su ID (simulado).
 * @param {number} stationId
 * @returns {Promise<void>}
 */
export const deleteStation = async (stationId) => {
  await delay(500);
  console.log("Mock Service: Deleting station", stationId);
  mockStations = mockStations.filter(s => s.id !== stationId);
  return; // Simula una respuesta exitosa sin contenido
};

/**
 * Obtiene la lista de usuarios con rol de técnico (simulado).
 * @returns {Promise<Object[]>}
 */
export const getTechnicians = async () => {
    await delay(300);
    console.log("Mock Service: Fetching technicians");
    return [...mockTechnicians];
};
