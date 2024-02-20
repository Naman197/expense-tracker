
import ProfileComponent from '../Pro';
import { useIsFocused } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import expensesData from '../Allexpense';
import FlipCard from 'react-native-flip-card';
import { useAuth } from '../Authcontext';
const HomeScreen = () => {
  const {user, logout, updateUserProfilePhoto, authToken} = useAuth();
  console.log("auth", authToken);

  const navigation = useNavigation();

  const [getAllexpenses, setExpensesData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [tipsData, setTipData] = useState([]);
  const [likedTipIds, setLikedTipIds] = useState([]);
  const [likesUpdated, setLikesUpdated] = useState(0);
  const isFocused = useIsFocused();

  const calculateTotalAmount = (expenses) => {
    let totalAmount = 0;
  
    expenses.forEach((expense) => {
      totalAmount += expense.amount; 
    });
  
    return totalAmount;
  };
  const fetchLikedTipIds = async () => {
    try {
      console.log("hello authtoken", authToken);
      const endpoint = 'http://192.168.1.24:80/tip/liketipid'; 
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Liked Tip IDs:", data);
      setLikedTipIds(data.likedTipIds || []);
    } catch (error) {
      console.error('Error fetching liked tip IDs:', error);
    }
  };
  const fetchTipData = async () => {
    try {
      const rep = await fetch('http://192.168.1.24:80/tip/all');
      const data1 = await rep.json();
      console.log("tipdata", data1);
      setTipData(data1.tips || []);
    } catch (error) {
      console.log('error fetching tips', error);
    }
  };

  const fetchExpensesData = async (authToken) => {
    try {
      console.log("auth tookens sending for expens data collection",authToken);
      const data = await expensesData(authToken);
      console.log("Fetched data:", data);
      setExpensesData(data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setRefreshing(false);
    }
  };
  const handleLikeTip = async (tipId) => {
    try {
      const endpoint = `http://192.168.1.24:80/tip/likes?tipId=${tipId}`;
      const method = 'POST';

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          const deleteResponse = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          });

          if (!deleteResponse.ok) {
            throw new Error(`HTTP error! Status: ${deleteResponse.status}`);
          }
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      setLikesUpdated((prev) => prev + 1);


    } catch (error) {
      console.error('Error liking/unliking tip:', error);
    }
  };

  const handleLikePress = (tipId) => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    handleLikeTip(tipId); 
  };
  useEffect(() => {
    if (isFocused) {
      fetchExpensesData(authToken);
      fetchTipData();
      fetchLikedTipIds();
    }
  }, [isFocused]);

  
  useEffect(()=>{ fetchTipData();
    fetchLikedTipIds();},[likesUpdated]);
  useEffect(() => {
    fetchExpensesData();
    fetchTipData();
    fetchLikedTipIds();
  }, [refreshing]);
  

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.carouselText}>{item.tip}</Text>
    </View>
  );

  const renderExpenseItem = ({ item }) => (
    <FlipCard style={styles.flipCard} friction={6} perspective={2000} flipHorizontal={true} flipVertical={false}>
      <View style={styles.expenseItem}>
        <Text style={styles.expenseCategory}>{item.category}</Text>
        <Text style={styles.expenseAmount}>{item.amount}</Text>
      </View>
      <View style={[styles.expenseItem, styles.backCard]}>
        <Text style={styles.expenseDescription}>{item.description}</Text>
      </View>
    </FlipCard>
  );

  const handleRefresh = () => {
    setRefreshing(true);
  };
  const totalAmount = calculateTotalAmount(getAllexpenses);

  const renderTipItem = ({ item }) => {
    
    //const parsedItem = JSON.parse(item.username);
    //const username = parsedItem.username;
    console.log("RenderTipItem - item._id:", item._id);
    console.log("RenderTipItem - likedTipIds:", likedTipIds);

    const isTipLiked = likedTipIds.includes(item._id);
    // const parsedUsername = JSON.parse(item.username);

    // Access the username property
    // const username = parsedUsername.username;
    // console.log("RenderTipItem - isTipLiked:", isTipLiked);
    // console.log("items",username);
    // const jsonString = item.username.replace(/^"(.*)"$/, '$1');

    // // Parse the JSON string
    // const parsedUsername = JSON.parse(jsonString);
    
    // // Access the username property
    // const username = parsedUsername.username;
    return (
      <View style={styles.carouselItem}>
     <Text style={styles.tipText}>{item.username}</Text>
        <Text style={styles.tipText}>{item.tipText}</Text>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleLikePress(item._id)}
        >
          <MaterialCommunityIcons
            name="heart"
            size={20}
            color={isTipLiked ? 'red' : '#fff'}
          />
          <Text style={styles.likeButtonText}>{item.likes}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <ProfileComponent />
      <Carousel  data={tipsData} renderItem={renderTipItem} sliderWidth={350} itemWidth={300} />
      <View style={styles.spacer}></View>

      {/* Expenses Section */}
      <View style={styles.expensesContainer1}>
        <View style={styles.totalexpense}>
        <Text style={styles.totalExpenseText}>Total Expense: {totalAmount}</Text>
          {/* <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity> */}
        </View>
        <ScrollView style={styles.expensesContainer}>
          <FlatList
            key={getAllexpenses.length}
            data={getAllexpenses}
            keyExtractor={(item) => item.id}
            renderItem={renderExpenseItem}
          />
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddExpenseScreen")}>
          <MaterialCommunityIcons name="plus" size={24} color="#ffffff" />
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Tips Section */}
      {/* <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Useful Tips</Text>
        <FlatList data={tipsData} keyExtractor={(item) => item.id.toString()} renderItem={renderTipItem} />
      </View> */}
    </ScrollView>
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041C32",
  
    //marginTop: 30,
  },
  carouselItem: {
    height: 200,
    //position:'absolute',
    //top:-2000,

    width: 295,
    backgroundColor: "#04293A",
    borderRadius: 5,
    padding: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  carouselText: {
    fontSize: 16,
    color: "#000",
  },
  expensesContainer: {
    maxHeight: 270,
    backgroundColor: "#04293A",
    padding: 10,
    opacity: 0.4,

  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#868db1",
    borderRadius: 5,
    opacity: 0.8,
  },
  expenseCategory: {
    fontSize: 16,
    color: "#000",

  },
  spacer: {
    height: 20,
  },
  expenseAmount: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECB365',

    opacity:0.8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },

  totalexpense: {
    alignItems: 'center',
    height: 40,
    padding: 6,
    marginBottom: 7,
    marginTop: 20,
    marginStart: 30,
    width: 330,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalExpenseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#ffffff",
    fontFamily: 'Roboto', // Use the 'Roboto' font
  },
  refreshButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  refreshButtonText: {
    fontSize: 16,
    color: "#ffffff",
  },
  expensesContainer1: {
    //position: 'absolute',
    //top: 400,
    //left: 10,
    //zIndex: 2,
   //marginTop:120,
    backgroundColor: '#04293A',
    borderTopLeftRadius: 75,
    borderTopRightRadius: 75,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 39,
    },
    shadowOpacity: 0.99,
    shadowRadius: 5.84,
    elevation: 9, // This is for Android
  },
  
  // Tips Section Styles
  tipsContainer: {
    backgroundColor: '#04293A',
    padding: 20,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#fff',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 100,
    marginLeft: 230,

  },
  likeButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    alignItems: 'flex-end',
  },
});
export default HomeScreen;
