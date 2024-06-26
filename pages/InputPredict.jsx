import React, { useState } from 'react';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { Row, Button, Form, Input, Radio, Select, Card } from 'antd';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const FLASK_API_URL = 'https://beagle-hopeful-chicken.ngrok-free.app/predict';

const InputPredict = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const handlePredict = () => {
    form.validateFields().then(values => {
      console.log('Predict button clicked!');
      console.log('Form Data:', values);

      // Send the form data to the Flask API
      axios.post(FLASK_API_URL, values)
        .then(response => {
          console.log('Prediction response:', response.data);
          const prediction = response.data.prediction;
          navigate('/output-predict', { state: { prediction } });
        })
        .catch(error => {
          console.error('There was an error making the prediction request!', error);
        });
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
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
                form={form}
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
                  label="Sex"
                  name="sex"
                  rules={[{ required: true, message: 'Please select your gender!' }]}
                  style={{ maxWidth: '50%' }}
                >
                  <Radio.Group>
                    <Radio value={0}>Female</Radio>
                    <Radio value={1}>Male</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Chest Pain Type"
                  name="cp"
                  rules={[{ required: true, message: 'Please select chest pain type!' }]}
                  style={{ maxWidth: '50%' }} 
                >
                  <Select placeholder='cp'>
                    <Select.Option value={1}>1. typical angina</Select.Option>
                    <Select.Option value={2}>2. atypical angina</Select.Option>
                    <Select.Option value={3}>3. non-anginal pain</Select.Option>
                    <Select.Option value={4}>4. asymptomatic</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Resting Blood Pressure"
                  name="trestbps"
                  rules={[
                    { required: true, message: 'Please input your resting blood pressure!' },
                    { validator: (rule, value) => validateNumberRange(rule, value, 90, 200) }
                  ]}
                  style={{ maxWidth: '50%' }}  
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input id="trestbps" placeholder='trestbps' />
                    <span style={{ marginLeft: '10px' }}>mm Hg</span>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Serum Cholesterol"
                  name="chol"
                  rules={[
                    { required: true, message: 'Please input your serum cholesterol!' },
                    { validator: (rule, value) => validateNumberRange(rule, value, 110, 564) }
                  ]}
                  style={{ maxWidth: '50%' }}  
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input id="chol" placeholder='chol' />
                    <span style={{ marginLeft: '10px' }}>mg/dl</span>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Fasting Blood Sugar"
                  name="fbs"
                  rules={[{ required: true, message: 'Please select fasting blood sugar!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Radio.Group>
                    <Radio value={0}>No</Radio>
                    <Radio value={1}>Yes</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Resting Electrocardiographic Result"
                  name="restecg"
                  rules={[{ required: true, message: 'Please select resting electrocardiographic result!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Select placeholder='restecg'>
                    <Select.Option value={0}>0. normal</Select.Option>
                    <Select.Option value={1}>1. having ST-T wave abnormality</Select.Option>
                    <Select.Option value={2}>2. showing probable or definite left ventricular hypertrophy</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Maximum Heart Rate Achieved"
                  name="thalach"
                  rules={[
                    { required: true, message: 'Please input your maximum heart rate!' },
                    { validator: (rule, value) => validateNumberRange(rule, value, 0, Infinity) }
                  ]}
                  style={{ maxWidth: '50%' }}  
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input id="thalach" placeholder='thalach' />
                    <span style={{ marginLeft: '10px' }}>beats per minute</span>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Exercise Induced Angina"
                  name="exang"
                  rules={[{ required: true, message: 'Please select exercise induced angina!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Radio.Group>
                    <Radio value={0}>No</Radio>
                    <Radio value={1}>Yes</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="ST Depression Induced by Exercise Relative to Rest"
                  name="oldpeak"
                  rules={[
                    { required: true, message: 'Please input the ST depression!' },
                    { validator: (rule, value) => validateNumberRange(rule, value, 0, 6.2, 'float') }
                  ]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Input id="oldpeak" placeholder='oldpeak' />
                </Form.Item>

                <Form.Item
                  label="Slope of the Peak Exercise ST Segment"
                  name="slope"
                  rules={[{ required: true, message: 'Please select slope of the peak exercise ST segment!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Select placeholder='slope'>
                    <Select.Option value={1}>1 = upsloping</Select.Option>
                    <Select.Option value={2}>2 = flat</Select.Option>
                    <Select.Option value={3}>3 = downsloping</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Number of Major Vessels Colored by Fluoroscopy"
                  name="ca"
                  rules={[{ required: true, message: 'Please select number of major vessels colored by fluoroscopy!' }]}
                  style={{ maxWidth: '50%' }}  
                >
                  <Select placeholder='ca'>
                    <Select.Option value={0}>0</Select.Option>
                    <Select.Option value={1}>1</Select.Option>
                    <Select.Option value={2}>2</Select.Option>
                    <Select.Option value={3}>3</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Thalassemia"
                  name="thal"
                  rules={[
                    { required: true, message: 'Please select the thalassemia!' }
                  ]}
                  style={{ maxWidth: '50%' }}
                >
                  <Select placeholder='thal'>
                    <Select.Option value={3}>3</Select.Option>
                    <Select.Option value={6}>6</Select.Option>
                    <Select.Option value={7}>7</Select.Option>
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
