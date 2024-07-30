import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Buget = () => {
  const [budget, setBudget] = useState(1000); // Initial budget
  const [sections, setSections] = useState([{ id: 1, amount: 0 }]);

  const handleAddSection = () => {
    if(sections.length < 3){
		setSections([...sections, { id: sections.length + 1, amount: 0 }]);
	}
  };

  const handleRemoveSection = (id) => {
    const updatedSections = sections.filter(section => section.id !== id);
    setSections(updatedSections);                        
  };

  const handleAmountChange = (id, value) => {
    const updatedSections = sections.map(section =>
      section.id === id ? { ...section, amount: parseFloat(value) || 0 } : section
    );
    setSections(updatedSections);
  };

  const totalAmount = sections.reduce((total, section) => total + section.amount, 0);
  const balance = budget - totalAmount;

  return (
    <View style={styles.container}>

<View style={styles.summary}>
        <Text style={styles.summaryText}>Budget: ${budget.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Total Amount: ${totalAmount.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Balance: ${balance.toFixed(2)}</Text>
      </View>

      {sections.map((section) => (
        <View key={section.id} style={styles.section}>
          <Text style={styles.label}>Enter amount</Text>
          <TextInput
            style={styles.input}
            value={section.amount.toString()}
            onChangeText={(value) => handleAmountChange(section.id, value)}
            keyboardType="numeric"
          />
           <FontAwesome name="star-o" size={30} color="#900" onPress={() => handleRemoveSection(section.id)} /> 
        </View>
      ))}
      <Button mode="contained" onPress={handleAddSection}>
        Add Section
      </Button>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
  },
  summary: {
    marginTop: 20,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Buget;

