import React from 'react';
import { Card, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';

const { Meta } = Card;

const Home = () => {
  const { role } = useAuth();
  return (
    <>
      <Sidebar>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Title span={24} style={{ marginBottom: '30px' }}>Homepage</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="INFORMATION!">
                <Row> Data yang perlu disiapkan untuk mengisi input prediksi</Row>
                <ul>
                  <li>(age) - Age (years)</li>
                  <li>(sex) - Sex (1 = male; 0 = female)</li>
                  <li>(cp) - Chest Pain Type (1 = typical angina, 2 = atypical angina, 3 = non-anginal pain, 4 = asymptomatic)</li>
                  <li>(trestbps) - Resting Blood Pressure (mm Hg)</li>
                  <li>(chol) - Serum Cholesterol (mg/dl)</li>
                  <li>(fbs) - Fasting Blood Sugar (1 = true; 0 = false; &gt; 120 mg/dl)</li>
                  <li>(restecg) - Resting Electrocardiographic Results (0 = normal, 1 = having ST-T wave abnormality, 2 = showing probable or definite left ventricular hypertrophy)</li>
                  <li>(thalach) - Maximum Heart Rate Achieved (beats per minute)</li>
                  <li>(exang) - Exercise Induced Angina (1 = yes; 0 = no)</li>
                  <li>(oldpeak) - ST Depression Induced by Exercise Relative to Rest (numeric value in mm)</li>
                  <li>(slope) - Slope of the Peak Exercise ST Segment (1 = upsloping, 2 = flat, 3 = downsloping)</li>
                  <li>(ca) - Number of Major Vessels Colored by Fluoroscopy (0-3)</li>
                  <li>(thal) - Thalassemia (3 = normal; 6 = fixed defect; 7 = reversible defect)</li>
                  <li>(num) - Diagnosis of Heart Disease (angiographic disease status) (0 = no disease, 1-4 = presence of disease in increasing severity)</li>
                </ul>
                <div>
                  <h1>Welcome to the Home Page</h1>
                  {role === 'admin' && <p>You are logged in as an admin.</p>}
                  {role === 'staff' && <p>You are logged in as a staff member.</p>}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Whats we have done">
                <Meta description="Predicted pasient : xxx" />
                <Meta description="Dataset available : xxx" />
              </Card>
            </Col>
          </Row>
        </div>
      </Sidebar>
    </>
  );
};

export default Home;
