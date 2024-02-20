// import React, { useState} from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,

// } from "react-native";
// import DateTimePicker from '@react-native-community/datetimepicker';

// import { Platform } from "react-native";


// const AddExpenseScreen = () => {
//   const [category, setCategory] = useState("");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [expenseAdded, setExpenseAdded] = useState(false);

//   const showDatePicker = async () => {
//     try {
//       if (Platform.OS === "android") {
//         const { action, year, month, day } = await DatePickerAndroid.open({
//           date: new Date(),
//         });

//         if (action !== DatePickerAndroid.dismissedAction) {
//           const selectedDate = new Date(year, month, day);
//           setDate(selectedDate);
//         }
//       } else if (Platform.OS === "ios") {
//         // You can implement a custom date picker for iOS if needed
//         // For simplicity, using the default DatePickerIOS
//       }
//     } catch (error) {
//       console.error("Error showing date picker:", error);
//     }
//   };

//   const handleAddExpense = async () => {
//     try {
//       const response = await fetch("http://192.168.1.24:80/expense/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category,
//           amount,
//           description,
//           date, // Include the selected date in the request body
//         }),
//       });

//       const responseData = await response.json();

//       // Reset form fields
//       setCategory("");
//       setAmount("");
//       setDescription("");
//       setDate(new Date());

//       // Set expense added message
//       setExpenseAdded(true);

//       // Set expense back to false after 2 seconds
//       setTimeout(() => {
//         setExpenseAdded(false);
//       }, 2000);

//       console.log(responseData); // Log the response data if needed
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Category:</Text>
//       <TextInput
//         style={styles.input}
//         value={category}
//         onChangeText={(text) => setCategory(text)}
//       />

//       <Text style={styles.label}>Amount:</Text>
//       <TextInput
//         style={styles.input}
//         value={amount}
//         onChangeText={(text) => setAmount(text)}
//         keyboardType="numeric"
//       />

//       <Text style={styles.label}>Description:</Text>
//       <TextInput
//         style={styles.input}
//         value={description}
//         onChangeText={(text) => setDescription(text)}
//       />

//       <Text style={styles.label}>Date:</Text>
//       <TouchableOpacity onPress={showDatePicker}>
//         <Text style={styles.input}>{date.toDateString()}</Text>
//       </TouchableOpacity>

//       <Button title="Add Expense" onPress={handleAddExpense} />
//       {expenseAdded && <Text style={styles.messageText}>Expense added!</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#041C32", // Background color
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 8,
//     color: "#ECB365", // Label color
//   },
//   input: {
//     height: 40,
//     borderColor: "#04293A", // Input border color
//     borderWidth: 1,
//     marginBottom: 16,
//     padding: 8,
//     color: "#ECB365", // Input text color
//   },
//   messageText: {
//     fontSize: 16,
//     color: "green",
//     marginTop: 8,
//   },
// });

// export default AddExpenseScreen;\
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './Authcontext';


const AddExpenseScreen = () => {
  const { user, logout, updateUserProfilePhoto, authToken } = useAuth();

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [expenseAdded, setExpenseAdded] = useState(false);

  const formatDate = (selectedDate) => {
    const dd = String(selectedDate.getDate()).padStart(2, "0");
    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0"); 
    const yyyy = selectedDate.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const navigation = useNavigation();


  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleAddExpense = async () => {
    try {
      console.log("actual date", date);
      const formattedDate = formatDate(date);
      console.log("date", formattedDate);
  
      const response = await fetch("http://192.168.1.24:80/expense/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          category,
          amount,
          description,
          date: formattedDate,
        }),
      });
     
      setCategory("");
      setAmount("");
      setDescription("");
      setDate(new Date());
       
       
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Message:', responseData.message);
        setExpenseAdded(true);
        navigation.navigate('Home', { refresh: true });

        setTimeout(() => {
          setExpenseAdded(false);
        }, 2000);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  

  return (
    <View style={styles.card1}>
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Category:</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={(text) => setCategory(text)}
        />

        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.input}>{formatDate(date)}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Button title="Add Expense" onPress={handleAddExpense} />
        {expenseAdded && <Text style={styles.messageText}>Expense added!</Text>}
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card1:{
    flex:1,
    backgroundColor: "#041C32",
    //opacity:0.9,
    
    //margin:10,
    //height:"100%"
  },
  cardContainer: {
    //opacity:0.6,
    margin:20,
    marginVertical:70,
    marginBottom:150,
    flex: 1,
    padding: 40,
    backgroundColor: "#04293A",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height:50,
  },
  
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#ECB365",
  },
  input: {
    height: 40,
    borderColor: "#04293A",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    color: "#ECB365",
    borderRadius: 8,
  },
  messageText: {
    fontSize: 16,
    color: "green",
    marginTop: 8,
  },
});

export default AddExpenseScreen;



