import React, { useState, useEffect } from 'react';
import { Drawer, Select, Button, message, Spin, Alert, Typography } from 'antd';
import { useVariables } from '../hooks/useVariables';
import { assignVariablesToSensor, getVariablesBySensor } from '../services/sensorVariableService';

const { Option } = Select;
const { Title, Text } = Typography;

const SensorVariableManager = ({ visible, onClose, sensor }) => {
  const { variables: allVariables, loading: loadingAllVars, error } = useVariables();
  const [selectedVariableIds, setSelectedVariableIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchAssociatedVariables = async () => {
      if (!sensor) return;
      setInitialLoading(true);
      try {
        const associatedVars = await getVariablesBySensor(sensor.sensor_id);
        const ids = associatedVars.map(v => v.variable_id);
        setSelectedVariableIds(ids);
      } catch (err) {
        message.error('No se pudieron cargar las variables asociadas a este sensor.');
      } finally {
        setInitialLoading(false);
      }
    };

    if (visible) {
      fetchAssociatedVariables();
    }
  }, [sensor, visible]);
  
  const handleSave = async () => {
    setLoading(true);
    try {
      await assignVariablesToSensor(sensor.sensor_id, selectedVariableIds);
      message.success('Variables asociadas correctamente.');
      onClose();
    } catch (err) {
      message.error('Ocurrió un error al guardar las variables.');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (initialLoading || loadingAllVars) {
      return <Spin tip="Cargando variables..." style={{ display: 'block', marginTop: 20 }} />;
    }
    if (error) {
        return <Alert message={`Error: ${error}`} type="error" showIcon />;
    }
    return (
        <>
            <Text style={{ marginBottom: 8, display: 'block' }}>
                Selecciona las variables que este sensor podrá medir.
            </Text>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Escribe para buscar y seleccionar variables"
                value={selectedVariableIds}
                onChange={setSelectedVariableIds}
                loading={loadingAllVars}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {allVariables.map(variable => (
                    <Option key={variable.variable_id} value={variable.variable_id}>
                        {`${variable.nombre} (${variable.unidad})`}
                    </Option>
                ))}
            </Select>
        </>
    );
  }

  return (
    <Drawer
      title={<Title level={4}>Gestionar Variables del Sensor</Title>}
      placement="right"
      width={500}
      onClose={onClose}
      visible={visible}
      destroyOnClose
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button onClick={handleSave} type="primary" loading={loading}>
            Guardar Cambios
          </Button>
        </div>
      }
    >
        <p><Text strong>Sensor:</Text> {sensor?.tipo_sensor} ({sensor?.modelo_sensor})</p>
        <p><Text strong>ID:</Text> {sensor?.sensor_id}</p>
        {renderContent()}
    </Drawer>
  );
};

export default SensorVariableManager;
