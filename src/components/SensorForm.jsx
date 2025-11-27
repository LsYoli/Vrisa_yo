import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { createSensor, updateSensor } from '../services/sensorService';

const SensorForm = ({ visible, onCancel, onOk, stationId, sensorData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isEditing = !!sensorData;

  useEffect(() => {
    if (visible) {
      if (isEditing) {
        form.setFieldsValue(sensorData);
      } else {
        form.resetFields();
      }
    }
  }, [visible, sensorData, form, isEditing]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (isEditing) {
        await updateSensor(sensorData.sensor_id, values);
        message.success('Sensor actualizado con éxito.');
      } else {
        await createSensor({ ...values, estacion_id: stationId });
        message.success('Sensor creado con éxito.');
      }
      
      onOk();
    } catch (errorInfo) {
        if (errorInfo.name !== 'FinishFailed') {
            console.log('Validation Failed:', errorInfo);
            message.error('Por favor, completa todos los campos requeridos.');
        } else {
            message.error('Ocurrió un error al guardar el sensor.');
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isEditing ? 'Editar Sensor' : 'Agregar Nuevo Sensor'}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText="Guardar"
      cancelText="Cancelar"
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="sensor_form">
        <Form.Item
          name="tipo_sensor"
          label="Tipo de Sensor"
          rules={[{ required: true, message: 'El tipo es obligatorio.' }]}
        >
          <Input placeholder="Ej: Temperatura, Humedad, Presión" />
        </Form.Item>
        <Form.Item
          name="modelo_sensor"
          label="Modelo del Sensor"
          rules={[{ required: true, message: 'El modelo es obligatorio.' }]}
        >
          <Input placeholder="Ej: DHT22, BMP180" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SensorForm;
