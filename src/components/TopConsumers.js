import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopConsumers = () => {
  const [consumersToday, setConsumersToday] = useState([]);
  const [consumersWeek, setConsumersWeek] = useState([]);
  const [consumersMonth, setConsumersMonth] = useState([]);
  const [consumersYear, setConsumersYear] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConsumersWithPichetCount('top5PersonnesWithMostPichetsToday', setConsumersToday);
    fetchConsumersWithPichetCount('top5PersonnesWithMostPichetsThisWeek', setConsumersWeek);
    fetchConsumersWithPichetCount('top5PersonnesWithMostPichetsThisMonth', setConsumersMonth);
    fetchConsumersWithPichetCount('top5PersonnesWithMostPichetsThisYear', setConsumersYear);
  }, []);

  const fetchConsumers = async (endpoint) => {
    try {
      console.log(`Fetching ${endpoint}`);
      const response = await axios.get(`http://localhost:8080/guinguette/personnes/${endpoint}`);
      console.log(`Response for ${endpoint}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      setError(`Error fetching ${endpoint}`);
      return [];
    }
  };

  const fetchPichetCount = async (personId) => {
    try {
      const response = await axios.get(`http://localhost:8080/guinguette/personnes/${personId}/total-pichets`);
      console.log(`Total pichets for person ${personId}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pichet count for person ${personId}:`, error);
      return 0;
    }
  };

  const fetchConsumersWithPichetCount = async (endpoint, setState) => {
    const consumers = await fetchConsumers(endpoint);
    const consumersWithPichetCount = await Promise.all(consumers.map(async (consumer) => {
      const totalPichets = await fetchPichetCount(consumer.id);
      return { ...consumer, totalPichets };
    }));
    console.log(`Consumers with pichet count for ${endpoint}:`, consumersWithPichetCount);
    setState(consumersWithPichetCount);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h2>Top 5 Consumers Today</h2>
      <ul>
        {consumersToday.map((consumer, index) => (
          <li key={index}>{consumer.prenom} {consumer.nom} - {consumer.totalPichets} pichets</li>
        ))}
      </ul>

      <h2>Top 5 Consumers This Week</h2>
      <ul>
        {consumersWeek.map((consumer, index) => (
          <li key={index}>{consumer.prenom} {consumer.nom} - {consumer.totalPichets} pichets</li>
        ))}
      </ul>

      <h2>Top 5 Consumers This Month</h2>
      <ul>
        {consumersMonth.map((consumer, index) => (
          <li key={index}>{consumer.prenom} {consumer.nom} - {consumer.totalPichets} pichets</li>
        ))}
      </ul>

      <h2>Top 5 Consumers This Year</h2>
      <ul>
        {consumersYear.map((consumer, index) => (
          <li key={index}>{consumer.prenom} {consumer.nom} - {consumer.totalPichets} pichets</li>
        ))}
      </ul>
    </div>
  );
};

export default TopConsumers;