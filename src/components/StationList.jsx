import React, { useState } from 'react';
import { Table, Button, Space, message, Popconfirm, Tag, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useStations } from '../hooks/useStations';
import StationForm from './StationForm';
import { deleteStation } from '../services/stationService';

const StationList = ({ onSelectStation }) => {
  const { stations, loading, error, reloadStations } = useStations();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStation, setEditingStation] = useState(null);

  const handleCreate = () => {
    setEditingStation(null);
    setIsModalVisible(true);
  };

  const handleEdit = (station) => {
    setEditingStation(station);
    setIsModalVisible(true);
  };

  const handleDelete = async (stationId) => {
    try {
      await deleteStation(stationId);
      message.success('Estación eliminada con éxito');
      reloadStations();
    } catch (err) {
      message.error('Error al eliminar la estación');
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setEditingStation(null);
    reloadStations();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingStation(null);
  };
  
  if (error) {
    message.error(error, 5);
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: 'Ubicación',
      key: 'location',
      render: (_, record) => (
        <Tag color="blue">{`Lat: ${record.latitud}, Lon: ${record.longitud}`}</Tag>
      ),
    },
    {
        title: 'Frec. de Actualización',
        dataIndex: 'frecuencia_actualizacion',
        key: 'frecuencia_actualizacion',
        align: 'center',
        render: (freq) => `${freq} min`,
    },
    {
      title: 'Acciones',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Ver Sensores">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => onSelectStation(record)}
            >
              Sensores
            </Button>
          </Tooltip>
          <Tooltip title="Editar Estación">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Popconfirm
            title="¿Estás seguro de eliminar esta estación?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sí, eliminar"
            cancelText="Cancelar"
          >
            <Tooltip title="Eliminar Estación">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Crear Estación
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={stations}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />
      <StationForm
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        stationData={editingStation}
      />
    </>
  );
};

export default StationList;
