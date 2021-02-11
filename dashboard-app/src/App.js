import './body.css';
import 'antd/dist/antd.css';
import React from 'react';
import axios from "axios";
import '@ant-design/compatible';
import { Layout } from 'antd';
import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import Header from './components/Header';
import WebSocketTransport from '@cubejs-client/ws-transport';
const API_URL = 'http://localhost:4000';
const CUBEJS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTI5ODc0NzcsImV4cCI6MTYxMzA3Mzg3N30.KccvEsStSo-3IOJ07IaItPDySFdk59WbSnx7l4fmQxU';
const cubejsApi = cubejs({
  transport: new WebSocketTransport({
    authorization: CUBEJS_TOKEN,
    apiUrl: API_URL.replace('http', 'ws'),
  }),
});

const Buttons = () => {

  const updateA = async() => {
    const response = await axios.post("http://localhost:4000/update", {name: "A"});
    console.log(response);
  }

  const updateB = async() => {
    const response = await axios.post("http://localhost:4000/update", {name: "B"});
    console.log(response);
  }

  const updateC = async() => {
    const response = await axios.post("http://localhost:4000/update", {name: "C"});
    console.log(response);
  }

  return (
    <div className="buttons">
      <button onClick={updateA}> Button A </button>
      <button onClick={updateB}> Button B </button>
      <button onClick={updateC}> Button C </button>
    </div>
  );
}

const AppLayout = ({ children }) => (
  <Layout
    style={{
      height: '100%',
    }}
  >
    <Header />
    <Buttons />
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <AppLayout>{children}</AppLayout>
  </CubeProvider>
);

export default App;
