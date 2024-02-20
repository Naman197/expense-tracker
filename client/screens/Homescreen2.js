// import ProfileComponent from '../Pro';
// import React, { useState, useEffect } from 'react';
// import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Carousel from 'react-native-snap-carousel';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import expensesData from '../Allexpense';
// import FlipCard from 'react-native-flip-card';

// const HomeScreen = () => {
//   const carouselData = [
//     { id: 1, title: "Item 1" },
//     { id: 2, title: "Item 2" },
//     { id: 3, title: "Item 3" },
//   ];

//   const navigation = useNavigation();

//   const [getAllexpenses, setExpensesData] = useState([]);

//   const [refreshing, setRefreshing] = useState(false);

//   const fetchExpensesData = async () => {
//     try {
//       const data = await expensesData();
//       console.log("Fetched data:", data);
//       setExpensesData(data || []);
//       console.log("data set",getAllexpenses);
//      // Set an empty array as the default value if data is undefined
//     } catch (error) {
//       console.error('Error fetching expenses:', error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpensesData();
//   }, [refreshing]);

//   const renderItem = ({ item }) => (
//     <View style={styles.carouselItem}>
//       <Text style={styles.carouselText}>{item.title}</Text>
//     </View>
//   );

//   const renderExpenseItem = ({ item }) => {
//     return (
//       <FlipCard style={styles.flipCard} friction={6} perspective={2000} flipHorizontal={true} flipVertical={false}>
//         {/* Card Front */}
//         <View style={styles.expenseItem}>
//           <Text style={styles.expenseCategory}>{item.category}</Text>
//           <Text style={styles.expenseAmount}>{item.amount}</Text>
//         </View>
  
//         {/* Card Back */}
//         <View style={[styles.expenseItem, styles.backCard]}>
//           <Text style={styles.expenseDescription}>{item.description}</Text>
//         </View>
//       </FlipCard>
//     );
//   };
  
// // const totalAmount = getAllexpenses.reduce((total, item) => {
// //   // Assuming 'amount' is the property representing the expense amount in each item
// //   const expenseAmount = item.amount || 0;
  
// //   // Add the expense amount to the total
// //   return total + expenseAmount;
// // }, 0);
//   const handleRefresh = () => {
//     setRefreshing(true);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <ProfileComponent />

//       <Carousel
//         data={carouselData}
//         renderItem={renderItem}
//         sliderWidth={350}
//         itemWidth={300}
//       />
//       <View style={styles.spacer}></View>
//       <View style={styles.expensesContainer1}>
//         <View style={styles.totalexpense}>
//           <Text style={styles.totalExpenseText}>Total Expense:100</Text>
//           <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
//             <Text style={styles.refreshButtonText}>Refresh</Text>
//           </TouchableOpacity>
//         </View>

//         <ScrollView style={styles.expensesContainer}>
//           <FlatList
//             key={getAllexpenses.length}
//             data={getAllexpenses}
//             keyExtractor={(item) => item.id}
//             renderItem={renderExpenseItem}
//           />
//         </ScrollView>
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => navigation.navigate("AddExpenseScreen")}
//         >
//           <MaterialCommunityIcons name="plus" size={24} color="#ffffff" />
//           <Text style={styles.addButtonText}>Add Expense</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#041C32",
//   },
//   carouselItem: {
//     height: 200,
//     width: 300,
//     backgroundColor: "#064663",
//     borderRadius: 5,
//     padding: 10,
//     marginLeft: 25,
//     marginRight: 25,
//   },
//   carouselText: {
//     fontSize: 16,
//     color: "#000",
//   },
//   expensesContainer: {
//     maxHeight: 290,
//     backgroundColor: "#04293A",
//     padding: 10,
//   },
//   expenseItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     height: 100,
//     padding: 10,
//     marginBottom: 10,
//     marginLeft: 10,
//     marginRight: 10,
//     backgroundColor: "#064663",
//     borderRadius: 5,
//   },
//   expenseCategory: {
//     fontSize: 16,
//     color: "#000",
//   },
//   spacer: {
//     height: 20,
//   },
//   expenseAmount: {
//     fontSize: 16,
//     color: "#000",
//     fontWeight: "bold",
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#8E6B3D',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginHorizontal: 40,
//     marginTop: 20,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   addButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     marginLeft: 10,
//     fontWeight: 'bold',
//   },
  
//   totalexpense: {
//     alignItems: 'center',
//     height: 40,
//     padding: 10,
//     marginBottom: 7,
//     marginTop: 20,
//     marginStart: 30,
//     width: 330,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   totalExpenseText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: "#ffffff",
//   },
//   // addButtonText: {
//   //   fontSize: 16,
//   //   color: "#ffffff",
//   //   marginLeft: 10,
//   // },
//   refreshButton: {
//     backgroundColor: "#007BFF",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   refreshButtonText: {
//     fontSize: 16,
//     color: "#ffffff",
//   },
//   expensesContainer1: {
//     backgroundColor: "#04293A",
//     borderTopLeftRadius: 55,
//     borderTopRightRadius: 55,
//   },
// });

// export default HomeScreen;



//tip item  render backup
// const renderTipItem = ({ item }) => (
  //   <View style={styles.carouselItem}>
  //     <Text style={styles.tipText}>{item._id}</Text>
  //     <Text style={styles.tipText}>{item.tipText}</Text>
  //     <TouchableOpacity style={styles.likeButton}  onPress={() => handleLikePress(item._id)}>
  //     <MaterialCommunityIcons
  //         name="heart"
  //         size={20}
  //         color={isLiked ? 'red' : '#fff'}
  //       />
  //       <Text style={styles.likeButtonText}>{item.likes}</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
//   const userTips = [
//     { id: 1, userName: "John Doe", tip: "Some tip", likes: 10 },
//     { id: 2, userName: "Jane Smith", tip: "Another tip", likes: 5 },

//   ];
  