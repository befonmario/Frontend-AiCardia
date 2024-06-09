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
              <Row style={{ marginBottom: '10px' }}>Diagnose</Row>
              <Row style={{ marginLeft: '10px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus suscipit mauris ac posuere. Cras eget ante vitae justo luctus ultricies sed vitae felis. Vivamus scelerisque efficitur turpis, non pretium neque elementum tempor. Cras in porta tellus, sit amet dictum odio. Nunc vulputate malesuada dapibus. In efficitur iaculis ante. Integer tempus pretium lacinia. Sed sagittis felis nisl, sit amet fringilla felis consequat quis. Mauris a tristique velit, eget pulvinar nisi. Nullam id tortor tortor. Etiam eleifend tincidunt sagittis. In lacus massa, sodales vel vulputate at, efficitur at orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer maximus urna quis metus egestas, sit amet sollicitudin nulla gravida.
              </Row>
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
