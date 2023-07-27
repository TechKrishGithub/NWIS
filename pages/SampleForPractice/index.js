import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

const YesNoQuestion = ({ question, onYes, onNo }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleYes = () => {
    setSelectedButton('yes');
    if (onYes) onYes();
  };

  const handleNo = () => {
    setSelectedButton('no');
    if (onNo) onNo();
  };

  return (
    <Card>
      <Card.Content>
        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
          {question}
        </Text>
      </Card.Content>
      <Card.Actions style={{ justifyContent: 'center' }}>
        <Button
          mode={selectedButton === 'yes' ? 'contained' : 'outlined'}
          onPress={handleYes}
          color={selectedButton === 'yes' ? '#007bff' : '#000'}
        >
          Yes
        </Button>
        <Button
          mode={selectedButton === 'no' ? 'contained' : 'outlined'}
          onPress={handleNo}
          color={selectedButton === 'no' ? '#007bff' : '#000'}
        >
          No
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default YesNoQuestion;
