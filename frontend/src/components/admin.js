import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://life-developers.onrender.com/User/dashboard'); 
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Procesamiento de datos para el gráfico
  const companyData = users.reduce((acc, user) => {
    acc[user.company] = (acc[user.company] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(companyData),
    datasets: [
      {
        label: 'Users per company',
        data: Object.values(companyData),
        backgroundColor: '#d32f2f',
        borderColor: '#d32f2f',
        borderWidth: 1,
      },
    ],
  };

  // Renderizado del componente
  return (
    <div> 
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.telephone}</td>
              <td>{user.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

