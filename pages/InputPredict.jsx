import React, { useState } from 'react';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { Row, Button, Form, Input, Radio, Select, Checkbox, Card } from 'antd';
import Sidebar from '../components/Sidebar';

const InputPredict = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handlePredict = () => {
    console.log('Predict button clicked!');
    navigate('/output-predict');
  };

  const validateNumber = (rule, value, callback) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(value)) {
      callback('Hanya masukkan angka!');
    } else {
      callback();
    }
  };

  return (  
    <>
    <Sidebar>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row span={24} style={{ maxWidth: '800px' }}>
          <Title level={2} span={24} style={{ marginBottom: '30px' }}>Input Variable</Title>
        </Row>
        <div style={{ padding: '20px'}}>
          <Card>
            <Form
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              layout="horizontal"
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              labelAlign="left"
            >
              <Form.Item
                label="Age"
                name="age"
                rules={[
                  { required: true, message: 'Please input your age!' },
                  { validator: validateNumber }
                ]}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input id="age" placeholder='age' />
                  <span style={{ marginLeft: '10px' }}>years</span>
                </div>
              </Form.Item>
              <Form.Item label="Gender" name="Gender">
                <Radio.Group>
                  <Radio value="option1">Female</Radio>
                  <Radio value="option2">Male</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Chest Pain Type" name="chestPainType">
                <Select placeholder='cp'>
                  <Select.Option value="option1">1. typical angina</Select.Option>
                  <Select.Option value="option2">2. atypical angina</Select.Option>
                  <Select.Option value="option3">3. non-anginal pani</Select.Option>
                  <Select.Option value="option4">4. asymptomatic</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Resting Blood Pressure"
                name="restingBloodPressure"
                rules={[
                  { required: true, message: 'Please input your resting blood pressure!' },
                  { validator: validateNumber }
                ]}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input id="restingBloodPressure" placeholder='trestbps' />
                  <span style={{ marginLeft: '10px' }}>mm Hg</span>
                </div>
              </Form.Item>
              <Form.Item
                label="Serum Cholesterol"
                name="serumCholesterol"
                rules={[
                  { required: true, message: 'Please input your serum cholesterol!' },
                  { validator: validateNumber }
                ]}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input id="serumCholesterol" placeholder='chol' />
                  <span style={{ marginLeft: '10px' }}>mg/dl</span>
                </div>
              </Form.Item>
              <Form.Item label="Fasting Blood Sugar ?" name="fastingBloodSugar">
                <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}>Yes, I have</Checkbox>
              </Form.Item>
              {isChecked && (
                <Form.Item
                  label="fbs"
                  name="additionalInput"
                  rules={[
                    { required: true, message: 'Please input your fasting blood sugar!' },
                    { validator: validateNumber }
                  ]}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input id="fbs" placeholder='fbs' />
                    <span style={{ marginLeft: '10px' }}>mg/dl</span>
                  </div>
                </Form.Item>
              )}
              <Form.Item label="Resting Electrocardiographic Result" name="restingElectroResult">
                <Select placeholder='restecg'>
                  <Select.Option value="option1">0. normal</Select.Option>
                  <Select.Option value="option2">1. having ST-T wave abnormality</Select.Option>
                  <Select.Option value="option3">2. showing probable or definite left ventricular hypertrophy</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Maximum Heart Rate Achieved"
                name="maxHeartRate"
                rules={[
                  { required: true, message: 'Please input your maximum heart rate!' },
                  { validator: validateNumber }
                ]}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input id="maxHeartRate" placeholder='thalach' />
                  <span style={{ marginLeft: '10px' }}>beats per minute</span>
                </div>
              </Form.Item>
              <Form.Item label="Exercise Induced Angina" name="exerciseInducedAngina">
                <Radio.Group>
                  <Radio value="option1">0. No</Radio>
                  <Radio value="option2">1. Yes</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="ST Depression Induced by Exercise Relative to Rest"
                name="stDepression"
                rules={[
                  { required: true, message: 'Please input the ST depression!' },
                  { validator: validateNumber }
                ]}
              >
                <Input id="stDepression" placeholder='oldpeak' />
              </Form.Item>
              <Form.Item label="Slope of the Peak Exercise ST Segment" name="slope">
                <Select placeholder='slope'>
                  <Select.Option value="option1">1 = upsloping</Select.Option>
                  <Select.Option value="option2">2 = flat</Select.Option>
                  <Select.Option value="option3">3 = downsloping</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Number of Major Vessels Colored by Fluoroscopy" name="vesselsColored">
                <Select placeholder='ca'>
                  <Select.Option value="option1">1</Select.Option>
                  <Select.Option value="option2">2</Select.Option>
                  <Select.Option value="option3">3</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Thalassemia"
                name="thalassemia"
                rules={[
                  { required: true, message: 'Please input the thalassemia!' },
                  { validator: validateNumber }
                ]}
              >
                <Input id="thalassemia" placeholder='thal' />
              </Form.Item>
              <Form.Item style={{ alignSelf: 'flex-end' }}>
                <Button type="primary" onClick={handlePredict}>Predict</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
      </Sidebar>
    </>
  );
};

export default InputPredict;
