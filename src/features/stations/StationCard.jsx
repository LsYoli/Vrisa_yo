import React from 'react';
import { Card } from 'antd';

const StationCard = ({ station }) => {
  return (
    <Card title={station.name}>
      <p>{station.location}</p>
    </Card>
  );
};

export default StationCard;
