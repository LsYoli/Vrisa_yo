// --- MOCK DATA IMPLEMENTATION ---
import { getVariables } from './variableService';

// Almacén en caché para las relaciones sensor-variable
let mockSensorVariables = {
    101: [1, 2], // El sensor 101 (Temperatura/Humedad) tiene asociadas las variables 1 (Temp) y 2 (Hum)
    201: [3],    // El sensor 201 (Presión) tiene asociada la variable 3 (Presión)
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Asigna una lista de variables a un sensor (simulado).
 * @param {number} sensorId
 * @param {number[]} variableIds
 * @returns {Promise<Object>}
 */
export const assignVariablesToSensor = async (sensorId, variableIds) => {
  await delay(300);
  console.log("Mock Service: Assigning variables", variableIds, "to sensor", sensorId);
  mockSensorVariables[sensorId] = variableIds;
  return { success: true, sensorId, variableIds };
};

/**
 * Obtiene las variables asociadas a un sensor (simulado).
 * @param {number} sensorId
 * @returns {Promise<Object[]>}
 */
export const getVariablesBySensor = async (sensorId) => {
    await delay(300);
    console.log("Mock Service: Fetching variables for sensor", sensorId);
    
    const allVariables = await getVariables();
    const associatedIds = mockSensorVariables[sensorId] || [];
    
    return allVariables.filter(v => associatedIds.includes(v.variable_id));
};
