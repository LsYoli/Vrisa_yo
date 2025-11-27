import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, message, Spin, Row, Col, Divider } from 'antd';
import { createOrUpdateStation, getTechnicians } from '../services/stationService';

const { Option } = Select;

const StationForm = ({ visible, onCancel, onOk, stationData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [technicians, setTechnicians] = useState([]);
  const [loadingTechnicians, setLoadingTechnicians] = useState(false);

  const isEditing = !!stationData;

  useEffect(() => {
    // Cargar técnicos cuando el modal se hace visible
    const fetchTechs = async () => {
      setLoadingTechnicians(true);
      try {
        const techs = await getTechnicians();
        setTechnicians(techs);
      } catch (error) {
        message.error('No se pudieron cargar los técnicos.');
      } finally {
        setLoadingTechnicians(false);
      }
    };

    if (visible) {
      fetchTechs();
      // Si estamos editando, poblamos el formulario con los datos de la estación
      if (isEditing) {
        form.setFieldsValue({
          ...stationData,
          // Asegúrate de que el técnico_id se maneje correctamente,
          // puede que necesites un mapeo si el objeto completo se pasa.
          tecnico_id: stationData.tecnico_id,
        });
      } else {
        // Si es nuevo, reseteamos el formulario
        form.resetFields();
      }
    }
  }, [visible, stationData, form, isEditing]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = { ...values };
      if (isEditing) {
        payload.id = stationData.id;
      }
      
      // Aquí puedes transformar el objeto de ubicación si es necesario
      // Por ejemplo, si la API espera un GeoJSON
      // payload.ubicacion = { type: "Point", coordinates: [values.longitud, values.latitud] };

      await createOrUpdateStation(payload);
      
      message.success(`Estación ${isEditing ? 'actualizada' : 'creada'} con éxito.`);
      onOk(); // Cierra el modal y refresca la lista
    } catch (errorInfo) {
      if (errorInfo.name !== 'FinishFailed') {
        console.log('Validation Failed:', errorInfo);
        message.error('Por favor, completa todos los campos requeridos.');
      } else {
        message.error('Ocurrió un error al guardar la estación.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isEditing ? 'Editar Estación' : 'Crear Nueva Estación'}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      width={720}
      okText="Guardar"
      cancelText="Cancelar"
      destroyOnClose
    >
      <Spin spinning={loadingTechnicians} tip="Cargando técnicos...">
        <Form form={form} layout="vertical" name="station_form">
          <Divider orientation="left">Información General</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="nombre"
                label="Nombre de la Estación"
                rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
              >
                <Input placeholder="Ej: Estación Central" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Ubicación Geográfica</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="latitud"
                label="Latitud"
                rules={[{ required: true, message: 'La latitud es obligatoria.' }]}
              >
                <Input placeholder="-33.44889" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="longitud"
                label="Longitud"
                rules={[{ required: true, message: 'La longitud es obligatoria.' }]}
              >
                <Input placeholder="-70.66926" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Configuración y Asignación</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="frecuencia_actualizacion"
                label="Frecuencia de Actualización (minutos)"
                rules={[{ required: true, message: 'La frecuencia es obligatoria.' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} placeholder="Ej: 60" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tecnico_id"
                label="Técnico Asignado"
                rules={[{ required: true, message: 'Debe asignar un técnico.' }]}
              >
                <Select placeholder="Seleccionar un técnico">
                  {technicians.map(tech => (
                    <Option key={tech.id} value={tech.id}>
                      {tech.name} ({tech.email})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* Aquí puedes añadir campos para reporte_id y admin_id si son editables */}
          {/* Por ejemplo, el admin_id podría venir del contexto de autenticación */}

        </Form>
      </Spin>
    </Modal>
  );
};

export default StationForm;
