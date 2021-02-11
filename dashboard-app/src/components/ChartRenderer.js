import React from 'react';
import PropTypes from 'prop-types';
import { useCubeQuery } from '@cubejs-client/react';
import { Spin, Row, Col, Statistic, Table } from 'antd';
import { Line, Bar, Pie } from 'react-chartjs-2';
const COLORS_SERIES = ['#FF6492', '#141446', '#7A77FF'];
const commonOptions = {
  maintainAspectRatio: false,
};
const TypeToChartComponent = {
  line: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.category),
      datasets: resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        borderColor: COLORS_SERIES[index],
        fill: false,
      })),
    };
    const options = { ...commonOptions };
    console.log(data);
    console.log(options);
    return <Line data={data} options={options} />;
  },
  bar: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.category),
      datasets: resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        backgroundColor: COLORS_SERIES[index],
        fill: false,
      })),
    };
    const options = {
      ...commonOptions,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
    return <Bar data={data} options={options} />;
  },
  area: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.category),
      datasets: resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        backgroundColor: COLORS_SERIES[index],
      })),
    };
    const options = {
      ...commonOptions,
      scales: {
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
    return <Line data={data} options={options} />;
  },
  pie: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.category),
      datasets: resultSet.series().map((s) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        backgroundColor: COLORS_SERIES,
        hoverBackgroundColor: COLORS_SERIES,
      })),
    };
    const options = { ...commonOptions };
    return <Pie data={data} options={options} />;
  },
  number: ({ resultSet }) => {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{
          height: '100%',
        }}
      >
        <Col>
          {resultSet.seriesNames().map((s) => (
            <Statistic value={resultSet.totalRow()[s.key]} />
          ))}
        </Col>
      </Row>
    );
  },
  table: ({ resultSet, pivotConfig }) => {
    return (
      <Table
        pagination={false}
        columns={resultSet.tableColumns(pivotConfig)}
        dataSource={resultSet.tablePivot(pivotConfig)}
      />
    );
  },
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map((key) => ({
    [key]: React.memo(TypeToChartComponent[key]),
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart = (Component) => ({ resultSet, error }) =>
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || <Spin />;

const ChartRenderer = ({ vizState, cubejsApi }) => {
  const { query, chartType } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  const renderProps = useCubeQuery(query, { subscribe: true, cubejsApi });
  return component && renderChart(component)(renderProps);
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
  cubejsApi: PropTypes.object,
};
ChartRenderer.defaultProps = {
  vizState: {},
  cubejsApi: null,
};
export default ChartRenderer;
