import React, {useState} from 'react';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { Row, Button, Form, Input, Radio, Select, Card } from 'antd';
import Sidebar from '../components/Sidebar';

const InputPredict = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handlePredict = () => {
    console.log('Predict button clicked!');
    console.log('Form Data:', formData);
    navigate('/output-predict');
  };

  const validateNumberRange = (rule, value, min, max, type = 'int') => {
    return new Promise((resolve, reject) => {
      let regex = /^[0-9]*$/;
      if (type === 'float') {
        regex = /^[0-9]*\.?[0-9]+$/;
      }
      if (!regex.test(value) || value < min || value > max) {
        reject(`Please enter a valid number between ${min} and ${max}!`);
      } else {
        resolve();
      }
    });
  };
  

  return (
    <>
      <Sidebar>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row span={24} style={{ maxWidth: '800px' }}>
            <Title level={2} span={24} style={{ marginBottom: '30px' }}>Input Variable</Title>
          </Row>
          <div style={{ padding: '20px' }}>
            <Card>
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
                onValuesChange={(changedValues, allValues) => {
                  console.log('Form Values Changed:', allValues);
                  setFormData(allValues);
                }}
              >
                <Form.Item
                  label="Age"
                  name="age"
                  rules={[
                    { required: true, message: 'Please input your age!' },
                    { validator: (rule, value) => validateNumberRange(rule, value, 0, 100) }
                  ]}
                  style={{ maxWidth: '50%' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input id="age" placeholder='age' />
                    <span style={{ marginLeft: '10px' }}>years</span>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="Gender"
                  rules={[{ required: true, message: 'Please select your gender!' }]}
                  style={{ maxWidth: '50%' }}
                >
                  <Radio.Group>
                    <Radio value="0">Female</Radio>
                    <Radio value="1">Male</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Chest Pain Type"
                  name="chestPainType"
                  rules={[{ required: true, message: 'Please select chest pain type!' }]}
                  style={{ maxWidth: '50%' }} 
                >
                  <Select placeholder='cp'>
                    <Select.Option value="1">1. typical angina</Select.Option>
                    <Select.Option value="2">2. atypical angina</Select.Option>
                    <Select.Option value="3">3. non-anginal pain</Select.Option>
                    <Select.Option value="4">4. asymptomatic</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Resting Blood Pressure"
                  name="restingBloodPressure"
                  rules={[
                    { required: true, message: 'Please input your resting blood pressure!' },
                    { validator: (rule, value) => validateNumberRange(rule, value, 90, 200) }
                  ]}
                  style={{ maxWidth: '50%' }}  
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
                    { validator: (rule, value) => validateNumberRange(rule, value, 110, 564) }
                  ]}
                  style={{ maxWidth: '50%' }}  
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input id="serumCholesterol" placeholder='chol' />
                    <span style={{ marginLeft: '10px' }}>mg/dl</span>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Fasting Blood Sugar"
                  name="fastingBloodSugar"
                  rules={[{ required: true, message: 'Please select fasting blood sugar!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Radio.Group>
                    <Radio value="0">No</Radio>
                    <Radio value="1">Yes</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Resting Electrocardiographic Result"
                  name="restingElectroResult"
                  rules={[{ required: true, message: 'Please select resting electrocardiographic result!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Select placeholder='restecg'>
                    <Select.Option value="0">0. normal</Select.Option>
                    <Select.Option value="1">1. having ST-T wave abnormality</Select.Option>
                    <Select.Option value="2">2. showing probable or definite left ventricular hypertrophy</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Maximum Heart Rate Achieved"
                  name="maxHeartRate"
                  rules={[
                    { required: true, message: 'Please input your maximum heart rate!' },
                    { validator: (rule, value) => validateNumberRange(rule, value, 0, Infinity) }
                  ]}
                  style={{ maxWidth: '50%' }}  
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input id="maxHeartRate" placeholder='thalach' />
                    <span style={{ marginLeft: '10px' }}>beats per minute</span>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Exercise Induced Angina"
                  name="exerciseInducedAngina"
                  rules={[{ required: true, message: 'Please select exercise induced angina!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Radio.Group>
                    <Radio value="0">No</Radio>
                    <Radio value="1">Yes</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="ST Depression Induced by Exercise Relative to Rest"
                  name="stDepression"
                  rules={[
                    { required: true, message: 'Please input the ST depression!' },
                    { validator: (rule, value) => validateNumberRange(rule, value, 0, 6.2, 'float') }
                  ]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Input id="stDepression" placeholder='oldpeak' />
                </Form.Item>

                <Form.Item
                  label="Slope of the Peak Exercise ST Segment"
                  name="slope"
                  rules={[{ required: true, message: 'Please select slope of the peak exercise ST segment!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Select placeholder='slope'>
                    <Select.Option value="1">1 = upsloping</Select.Option>
                    <Select.Option value="2">2 = flat</Select.Option>
                    <Select.Option value="3">3 = downsloping</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Number of Major Vessels Colored by Fluoroscopy"
                  name="vesselsColored"
                  rules={[{ required: true, message: 'Please select number of major vessels colored by fluoroscopy!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Select placeholder='ca'>
                    <Select.Option value="0">0</Select.Option>
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                    <Select.Option value="3">3</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Thalassemia"
                  name="thalassemia"
                  rules={[
                    { required: true, message: 'Please select the thalassemia!' }
                  ]}
                  style={{ maxWidth: '50%' }}
                >
                  <Select placeholder='thal'>
                    <Select.Option value="3">3</Select.Option>
                    <Select.Option value="6">6</Select.Option>
                    <Select.Option value="7">7</Select.Option>
                  </Select>
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
