import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import Sidebar from '../components/Sidebar';


const OutputPredict = () => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate('/input-predict');
  };

  return (
    <Sidebar>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Hasil Prediksi</Title>
        <Row justify="center">
          <Col span={24}>
            <Card title="INFORMATION!">
              <Row>Diagnosis of Heart Disease (angiographic disease status) = 1 </Row>
              <Row>Note :</Row>
              <ul>
                <li>0 = no disease</li>
                <li>1-4 = presence of disease in increasing severity</li>
              </ul>
            </Card>
            <Row justify="end" style={{ marginTop: '30px' }}>
              <Button type="primary" onClick={handleOkClick}>OK</Button>
            </Row>
          </Col>
        </Row>
      </div>
    </Sidebar>
  );
};

export default OutputPredict;
