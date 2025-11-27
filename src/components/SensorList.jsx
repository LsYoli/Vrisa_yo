import React, { useState } from 'react';
import { Table, Button, Space, message, Card, Descriptions, Popconfirm, Tooltip, Typography } from 'antd';
import { PlusOutlined, SettingOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useSensors } from '../hooks/useSensors';
import { deleteSensor } from '../services/sensorService';
import SensorForm from './SensorForm';
import SensorVariableManager from './SensorVariableManager';

const SensorList = ({ station, onBack }) => {
  const { sensors, loading, error, reloadSensors } = useSensors(station.id);

  const [isSensorModalVisible, setSensorModalVisible] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);

  const [isVariableDrawerVisible, setVariableDrawerVisible] = useState(false);
  const [selectedSensorForVariables, setSelectedSensorForVariables] = useState(null);

  if (error) {
    message.error(error, 5);
  }

  // --- Manejo del Modal de Sensores (Crear/Editar) ---
  const handleCreateSensor = () => {
    setEditingSensor(null);
    setSensorModalVisible(true);
  };

  const handleEditSensor = (sensor) => {
    setEditingSensor(sensor);
    setSensorModalVisible(true);
  };

  const handleDeleteSensor = async (sensorId) => {
    try {
        await deleteSensor(sensorId);
        message.success('Sensor eliminado con éxito');
        reloadSensors();
    } catch(err) {
        message.error('Error al eliminar el sensor');
    }
  };

  const handleSensorModalOk = () => {
    setSensorModalVisible(false);
    reloadSensors();
  };

  const handleSensorModalCancel = () => {
    setSensorModalVisible(false);
  };

  // --- Manejo del Drawer de Variables ---
  const handleManageVariables = (sensor) => {
    setSelectedSensorForVariables(sensor);
    setVariableDrawerVisible(true);
  };

  const handleVariableDrawerClose = () => {
    setVariableDrawerVisible(false);
    setSelectedSensorForVariables(null);
    // Opcional: Recargar sensores si las variables mostradas en la tabla cambian
    reloadSensors(); 
  };

  const columns = [
    {
      title: 'ID del Sensor',
      dataIndex: 'sensor_id',
      key: 'sensor_id',
      sorter: (a, b) => a.sensor_id - b.sensor_id,
    },
    {
      title: 'Tipo de Sensor',
      dataIndex: 'tipo_sensor',
      key: 'tipo_sensor',
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo_sensor',
      key: 'modelo_sensor',
    },
    {
      title: 'Acciones',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Gestionar Variables">
            <Button
              icon={<SettingOutlined />}
              onClick={() => handleManageVariables(record)}
            >
              Variables
            </Button>
          </Tooltip>
          <Tooltip title="Editar Sensor">
            <Button icon={<EditOutlined />} onClick={() => handleEditSensor(record)} />
          </Tooltip>
          <Popconfirm
            title="¿Estás seguro de eliminar este sensor?"
            onConfirm={() => handleDeleteSensor(record.sensor_id)}
            okText="Sí, eliminar"
            cancelText="Cancelar"
          >
             <Tooltip title="Eliminar Sensor">
                <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Tooltip title="Volver a la lista de estaciones">
              <Button 
                  shape="circle" 
                  icon={<ArrowLeftOutlined />} 
                  onClick={onBack} 
                  style={{ marginRight: '16px' }}
              />
          </Tooltip>
          <div>
              <Typography.Title level={4} style={{ margin: 0 }}>
                  {`Sensores de la Estación: ${station.nombre}`}
              </Typography.Title>
              <Typography.Text type="secondary">
                  Gestiona los sensores asociados a esta estación
              </Typography.Text>
          </div>
      </div>
      <Card>
        <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
          <Descriptions.Item label="ID Estación">{station.id}</Descriptions.Item>
          <Descriptions.Item label="Técnico Asignado">{station.tecnico_id || 'No asignado'}</Descriptions.Item>
          <Descriptions.Item label="Latitud">{station.latitud}</Descriptions.Item>
          <Descriptions.Item label="Longitud">{station.longitud}</Descriptions.Item>
        </Descriptions>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateSensor}
          >
            Agregar Sensor
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={sensors}
          rowKey="sensor_id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <SensorForm
        visible={isSensorModalVisible}
        onCancel={handleSensorModalCancel}
        onOk={handleSensorModalOk}
        stationId={station.id}
        sensorData={editingSensor}
      />

      {selectedSensorForVariables && (
        <SensorVariableManager
          visible={isVariableDrawerVisible}
          onClose={handleVariableDrawerClose}
          sensor={selectedSensorForVariables}
        />
      )}
    </>
  );
};

export default SensorList;
