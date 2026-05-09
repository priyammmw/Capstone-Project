import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ subs }) => {
  const categories = ['Entertainment', 'Productivity', 'Utilities'];
  
  const data = {
    labels: categories,
    datasets: [{
      data: categories.map(cat => 
        subs.filter(s => s.category === cat).reduce((sum, s) => sum + s.monthlyImpact, 0)
      ),
      backgroundColor: ['#8b5cf6', '#3b82f6', '#f59e0b'],
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 2,
    }]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 20 } }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default ExpenseChart;