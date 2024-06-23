import React from 'react';
import { Card, Col, Row, Table, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import AiCardiaLogo from '../src/assets/AiCardia_logo.png';

const { Meta } = Card;

const Home = () => {
  const { role } = useAuth();

  // Data untuk input prediksi
  const inputData = [
    { key: '1', Parameter: 'Age', description: 'Age (years)' },
    { key: '2', Parameter: 'Sex', description: 'Sex (1 = male; 0 = female)' },
    { key: '3', Parameter: 'Chest Pain Type', description: '1 = typical angina, 2 = atypical angina, 3 = non-anginal pain, 4 = asymptomatic' },
    { key: '4', Parameter: 'Resting Blood Pressure', description: 'Resting Blood Pressure (mm Hg)' },
    { key: '5', Parameter: 'Serum Cholesterol', description: 'Serum Cholesterol (mg/dl)' },
    { key: '6', Parameter: 'Fasting Blood Sugar', description: '1 = true; 0 = false; > 120 mg/dl' },
    { key: '7', Parameter: 'Resting Electrocardiographic Results', description: '0 = normal, 1 = having ST-T wave abnormality, 2 = showing probable or definite left ventricular hypertrophy' },
    { key: '8', Parameter: 'Maximum Heart Rate Achieved', description: 'Maximum Heart Rate Achieved (beats per minute)' },
    { key: '9', Parameter: 'Exercise Induced Angina', description: '1 = yes; 0 = no' },
    { key: '10', Parameter: 'ST Depression Induced by Exercise Relative to Rest', description: 'Numeric value in mm' },
    { key: '11', Parameter: 'Slope of the Peak Exercise ST Segment', description: '1 = upsloping, 2 = flat, 3 = downsloping' },
    { key: '12', Parameter: 'Number of Major Vessels Colored by Fluoroscopy', description: '0-3' },
    { key: '13', Parameter: 'Thalassemia', description: '3 = normal; 6 = fixed defect; 7 = reversible defect' },
    { key: '14', Parameter: 'Diagnosis of Heart Disease', description: '0 = no disease, 1-4 = presence of disease in increasing severity' },
  ];

  // Kolom untuk tabel input data
  const columns = [
    {
      title: 'Parameter',
      dataIndex: 'Parameter',
      key: 'Parameter',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <>
      <Sidebar>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Title span={24} style={{ marginBottom: '30px', textAlign: 'center' }}>Welcome to AiCardia</Title>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Try it Now">
                <Meta description="Start predicting heart disease risk with AiCardia." />
                <Link to="/input-predict"> {/* Link to input predict page */}
                  <Button type="primary" style={{marginTop: '20px'}}>Try it Now</Button> {/* Button to navigate to input predict page */}
                </Link>
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: '30px' }}>
            <Col span={24}>
              <Card title="About AiCardia">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  <img src={AiCardiaLogo} alt="AiCardia Logo" style={{ width: '150px', marginBottom: '10px' }} />
                </div>
                <Meta description="AiCardia is an AI-powered tool for predicting heart disease risk based on various health parameters. With artificial intelligence (AI) technology, AiCardia offers you a sophisticated yet user-friendly tool, allowing you to access your health information quickly and accurately. Make AiCardia your partner in understanding and managing the risk of heart disease efficiently and effectively." />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: '30px' }}>
            <Col span={24}>
              <Card title="Input Data" style={{ marginBottom: '30px' }}>
                <Table columns={columns} dataSource={inputData} pagination={false} />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="User Role">
                {role === 'admin' && <p>You are logged in as an admin.</p>}
                {role === 'staff' && <p>You are logged in as a staff member.</p>}
              </Card>
            </Col>
          </Row>
        </div>
      </Sidebar>
    </>
  );
};

export default Home;
