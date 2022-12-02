import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default class ReportChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';
  render() {
    const { data } = this.props;
    return (
      // <div className="cell-a" style={{ width: '100%', height: 300 }}>
      <div className="cell-a" style={{ width: '45%', height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="c1" name="신고접수" fill="#8884d8" />
            <Bar dataKey="c2" name="담당자배정" fill="#82ca9d" />
            <Bar dataKey="c3" name="신고처리중" fill="#8573ad" />
            <Bar dataKey="c4" name="처리완료" fill="#886547" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
//export default ReportChart;
