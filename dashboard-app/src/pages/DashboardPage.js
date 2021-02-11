import React from 'react';
import { Col } from 'antd';
import ChartRenderer from '../components/ChartRenderer';
import Dashboard from '../components/Dashboard';
import DashboardItem from '../components/DashboardItem';
const DashboardItems = [
  {
    id: 0,
    name: 'Line Chart',
    vizState: {
      query: {
        measures: ['Events.clicks'],
        timeDimensions: [],
        order: {
          // 'Events.clicks': 'desc',
        },
        dimensions: ['Events.name'],
      },
      chartType: 'line',
    },
  },
  {
    id: 1,
    name: 'Area Chart',
    vizState: {
      query: {
        measures: ['Events.clicks'],
        timeDimensions: [],
        order: {
          // 'Events.clicks': 'desc',
        },
        dimensions: ['Events.name'],
      },
      chartType: 'area',
    },
  },
  {
    id: 2,
    name: 'Bar Chart',
    vizState: {
      query: {
        measures: ['Events.clicks'],
        timeDimensions: [],
        order: {
          'Events.clicks': 'desc',
        },
        dimensions: ['Events.name'],
      },
      chartType: 'bar',
    },
  },
  {
    id: 3,
    name: 'Pie Chart',
    vizState: {
      query: {
        measures: ['Events.clicks'],
        timeDimensions: [],
        order: {
          // 'Events.clicks': 'desc',
        },
        dimensions: ['Events.name'],
      },
      chartType: 'pie',
    },
  },
  {
    id: 4,
    name: 'Data Table',
    vizState: {
      query: {
        order: {
          // 'Events.clicks': 'desc',
        },
        measures: ['Events.clicks'],
        timeDimensions: [],
        dimensions: ['Events.name'],
      },
      chartType: 'table',
    },
  },
];

const DashboardPage = () => {
  const dashboardItem = (item) => (
    <Col
      span={24}
      lg={12}
      key={item.id}
      style={{
        marginBottom: '24px',
      }}
    >
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Col>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: 'center',
        padding: 12,
      }}
    >
      <h2>
        There are no charts on this dashboard. Use Playground Build to add one.
      </h2>
    </div>
  );

  return DashboardItems.length ? (
    <Dashboard dashboardItems={DashboardItems}>
      {DashboardItems.map(dashboardItem)}
    </Dashboard>
  ) : (
    <Empty />
  );
};

export default DashboardPage;
