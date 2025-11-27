// --- MOCK DATA IMPLEMENTATION ---
let mockSensors = {
    1: [ // Sensores para la estación 1
      { sensor_id: 101, tipo_sensor: 'Temperatura', modelo_sensor: 'DHT22', estacion_id: 1 },
      { sensor_id: 102, tipo_sensor: 'Humedad', modelo_sensor: 'DHT22', estacion_id: 1 },
    ],
    2: [ // Sensores para la estación 2
      { sensor_id: 201, tipo_sensor: 'Presión Atmosférica', modelo_sensor: 'BMP180', estacion_id: 2 },
    ],
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Obtiene los sensores de una estación (simulado).
 * @param {number} stationId
 * @returns {Promise<Object[]>}
 */
export const getSensorsByStation = async (stationId) => {
  await delay(400);
  console.log("Mock Service: Fetching sensors for station", stationId);
  return mockSensors[stationId] || [];
};

/**
 * Crea un nuevo sensor (simulado).
 * @param {Object} sensorData
 * @returns {Promise<Object>}
 */
export const createSensor = async (sensorData) => {
  await delay(400);
  const { estacion_id, ...data } = sensorData;
  console.log("Mock Service: Creating sensor for station", estacion_id);
  
  const newSensor = {
    ...data,
    estacion_id,
    sensor_id: Date.now(), // ID único temporal
  };

  if (!mockSensors[estacion_id]) {
    mockSensors[estacion_id] = [];
  }
  mockSensors[estacion_id].push(newSensor);
  return newSensor;
};

/**
 * Actualiza un sensor (simulado).
 * @param {number} sensorId
 * @param {Object} sensorData
 * @returns {Promise<Object>}
 */
export const updateSensor = async (sensorId, sensorData) => {
    await delay(400);
    console.log("Mock Service: Updating sensor", sensorId);
    
    for (const stationId in mockSensors) {
        const sensorIndex = mockSensors[stationId].findIndex(s => s.sensor_id === sensorId);
        if (sensorIndex !== -1) {
            mockSensors[stationId][sensorIndex] = { ...mockSensors[stationId][sensorIndex], ...sensorData };
            return mockSensors[stationId][sensorIndex];
        }
    }
    throw new Error("Sensor not found");
};

/**
 * Elimina un sensor (simulado).
 * @param {number} sensorId
 * @returns {Promise<void>}
 */
export const deleteSensor = async (sensorId) => {
    await delay(400);
    console.log("Mock Service: Deleting sensor", sensorId);

    for (const stationId in mockSensors) {
        mockSensors[stationId] = mockSensors[stationId].filter(s => s.sensor_id !== sensorId);
    }
    return;
};
