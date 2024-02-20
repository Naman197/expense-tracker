
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { PieChart } from "react-native-chart-kit";

import { fetchExpenseData } from "../services/api";
import { useAuth } from "../Authcontext";
const StatsScreen = () => {
  console.log('StatsScreen rendering...');
  const [expenses, setExpenses] = useState([]);
  const [timeRange, setTimeRange] = useState("daily");
  const [isModalVisible, setModalVisible] = useState(false);
  const { user, logout, updateUserProfilePhoto, authToken } = useAuth();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    updateChartData();
  }, [timeRange]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const updateChartData = async () => {
    try {
      const apiData = await fetchExpenseData(timeRange,authToken);

      const formattedData = apiData.map((data) => ({
        name: data.category,
        amount: data.amount,
        color: getRandomColor(),
      }));

      setChartData(formattedData);
      setExpenses(apiData);
    } catch (error) {
      console.error('Error fetching or processing data:', error.message);
    }
  };
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Stats</Text>

      <TouchableOpacity style={styles.pickerContainer} onPress={toggleModal}>
        <Text style={styles.pickerText}>{timeRange}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => handleTimeRangeChange("daily")}>
            <Text style={styles.modalOption}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeRangeChange("weekly")}>
            <Text style={styles.modalOption}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeRangeChange("monthly")}>
            <Text style={styles.modalOption}>Monthly</Text>
          </TouchableOpacity>
          {/* Add more options as needed */}
        </View>
      </Modal>

      {/* Container for Pie chart */}
      <View style={styles.chartContainer}>
        {/* Pie chart */}
        <PieChart
          data={chartData}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: "#041C32",
            backgroundGradientFrom: "#041C32",
            backgroundGradientTo: "#041C32",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(236, 179, 101, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(236, 179, 101, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.expenseListContainer}>
        <Text style={styles.subtitle}>Expense List</Text>
        <FlatList
          data={expenses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
             <Text style={styles.listItemtext1}>{item.category}</Text>
              <Text style={styles.listItemtext}>${item.amount}</Text>

            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#041C32",
   opacity:0.96,
    //backgroundColor: "#041C32",
    marginTop:13,
  },
  chartContainer: {
    marginBottom: 16,
    backgroundColor: "#1E2732",
    borderRadius: 15,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  expenseListContainer: {
    flex: 1,
    opacity:0.6,
    backgroundColor: "#1E2732",
    borderRadius: 15,
    padding: 5,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    margin:20,
  },
  title: {
    fontSize: 24,
    color: "#ECB365",
    marginBottom: 16,
   // marginLeft:30,
  },
  subtitle: {
    fontSize: 18,
    color: "#ECB365",
    marginBottom: 8,
    marginLeft:90,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginRight:40,
    marginLeft:30,
   
  },
  listItemtext:{
    fontSize:18,

  },
  listItemtext1:{
    fontSize:18,

  },
  pickerContainer: {
    backgroundColor: "#3A4450",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  pickerText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  modalContainer: {
    backgroundColor: "#3A4450",
    padding: 16,
    borderRadius: 8,
    marginTop: "auto",
  },
  modalOption: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 12,
  },
});







export default StatsScreen;
