// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useAuth } from '../Authcontext';

// const ProfileScreen = () => {
//   const { user, logout, updateUserProfilePhoto } = useAuth();
//   const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);

//   const handleChooseProfilePicture = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 1,
//       });

//       if (!result.cancelled) {
//         setProfilePhoto(result.uri);
//         updateUserProfilePhoto(result.uri);
//         Alert.alert('Success', 'Profile picture updated successfully');
//       }
//     } catch (error) {
//       console.error('ImagePicker Error: ', error);
//     }
//   };

//   const renderProfilePhoto = () => {
//     if (profilePhoto) {
//       return <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />;
//     } else {
//       return <Image source={require('../istockphoto-1300512215-612x612.jpg')} style={styles.defaultProfilePhoto} />;
//     }
//   };

//   return (
//     <View style={styles.card}>
//       <TouchableOpacity onPress={handleChooseProfilePicture} style={styles.profilePhotoContainer}>
//         {renderProfilePhoto()}
//         <Text style={styles.changePhotoText}>Change Profile Photo</Text>
//       </TouchableOpacity>
//       <View style={styles.userInfoContainer}>
//         <Text style={styles.usernameText}>{user.username}</Text>
//         <Text style={styles.emailText}>{user.email}</Text>
//       </View>
//       <TouchableOpacity style={styles.logoutButton} onPress={logout}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     margin: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   profilePhotoContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profilePhoto: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//   },
//   defaultProfilePhoto: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//     backgroundColor: '#ddd',
//   },
//   changePhotoText: {
//     color: '#007AFF',
//     fontSize: 16,
//   },
//   userInfoContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   usernameText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   emailText: {
//     fontSize: 18,
//     color: '#555',
//   },
//   logoutButton: {
//     backgroundColor: '#FF6347',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default ProfileScreen;
// ProfileScreen.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useAuth } from '../Authcontext';
// //import StreakComponent from '../components/streak';
// import { addTipToDatabase } from '../services/api';
// const ProfileScreen = () => {
//   const { user, logout, updateUserProfilePhoto,authToken} = useAuth();
//   const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);
//   const [tipInput, setTipInput] = useState('');
//   console.log("auth1",authToken);

//   const streakData = [
//     { active: true },
//     { active: true },
//     { active: false },
//     { active: true },
//   ];

//   const handleChooseProfilePicture = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 1,
//       });

//       if (!result.cancelled) {
//         setProfilePhoto(result.uri);
//         updateUserProfilePhoto(result.uri);
//         Alert.alert('Success', 'Profile picture updated successfully');
//       }
//     } catch (error) {
//       console.error('ImagePicker Error: ', error);
//     }
//   };

//   const handleAddTip = async (tipInput) => {
//     try {
//       // Call the service function to add the tip to the database
//       console.log("auth",authToken);
//       console.log("tip data",tipInput);
//       await addTipToDatabase(authToken, tipInput);
  
//       setTipInput('');
//       Alert.alert('Success', 'Tip added successfully');
//     } catch (error) {
//       console.error('Error handling tip:', error.message);
//       Alert.alert('Error', 'Failed to add tip. Please try again.');
//     }
//   };
//   const renderProfilePhoto = () => {
//     if (profilePhoto) {
//       return <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />;
//     } else {
//       return <Image source={require('../istockphoto-1300512215-612x612.jpg')} style={styles.defaultProfilePhoto} />;
//     }
//   };

//   return (
//     <View style={styles.maincont}>
//       <View style={styles.card}>
//         <TouchableOpacity onPress={handleChooseProfilePicture} style={styles.profilePhotoContainer}>
//           {renderProfilePhoto()}
//           <Text style={styles.changePhotoText}>Change Profile Photo</Text>
//         </TouchableOpacity>
//         <View style={styles.userInfoContainer}>
//           <Text style={styles.usernameText}>{user.username}</Text>
//           <Text style={styles.emailText}>{user.email}</Text>
//         </View>
//         <View style={styles.addTipContainer}>
//           <TextInput
//             style={styles.tipInput}
//             placeholder="Add Tip..."
//             value={tipInput}
//             onChangeText={(text) => setTipInput(text)}
//           />
//           <TouchableOpacity style={styles.addTipButton} onPress={() => handleAddTip(tipInput)}>
//             <Text style={styles.addTipButtonText}>Add Tip</Text>
//           </TouchableOpacity>
//         </View>
//         {/* <View style={styles.streakSection}>
//           <Text style={styles.streakTitle}>Streak</Text>
//           <StreakComponent streak={streakData} />
//         </View> */}
//         <TouchableOpacity style={styles.logoutButton} onPress={logout}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   maincont: {
//     flex: 1,
//     backgroundColor: '#04293A',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     backgroundColor: '#064663',
//     borderRadius: 10,
//     padding: 30,
//     margin: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 8,
//     width: '90%',
//     height: '80%',
//   },
//   profilePhotoContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: '#064663',
//   },
//   profilePhoto: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//   },
//   defaultProfilePhoto: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//     backgroundColor: '#ddd',
//   },
//   changePhotoText: {
//     color: '#007AFF',
//     fontSize: 16,
//   },
//   userInfoContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: '#064663',
//   },
//   usernameText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   emailText: {
//     fontSize: 18,
//     color: '#555',
//   },
//   addTipContainer: {
//     marginBottom: 20,
//     backgroundColor: '#064663',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   tipInput: {
//     flex: 1,
//     height: 40,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   addTipButton: {
//     backgroundColor: '#8E6B3D',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   addTipButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   streakSection: {
//     marginTop: 20,
//     width: '80%',
//     flex: 3,
//   },
//   streakTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginLeft: 110,
//   },
//   logoutButton: {
//     backgroundColor: '#8E6B3D',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default ProfileScreen;


import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../Authcontext';
import { addTipToDatabase } from '../services/api';
import CoinImage from '../components/2ce889b2a3332f0ddb749a50285115e8.jpg'; 
const ProfileScreen = () => {
  const { user, logout, updateUserProfilePhoto, authToken } = useAuth();
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);
  const [tipInput, setTipInput] = useState('');

  const handleChooseProfilePicture = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfilePhoto(result.uri);
        updateUserProfilePhoto(result.uri);
        Alert.alert('Success', 'Profile picture updated successfully');
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };

  const handleAddTip = async (tipInput) => {
    try {
      await addTipToDatabase(authToken, tipInput);
      setTipInput('');
      Alert.alert('Success', 'Tip added successfully');
    } catch (error) {
      console.error('Error handling tip:', error.message);
      Alert.alert('Error', 'Failed to add tip. Please try again.');
    }
  };

  const renderProfilePhoto = () => {
    if (profilePhoto) {
      return <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />;
    } else {
      return <Image source={require('../istockphoto-1300512215-612x612.jpg')} style={styles.defaultProfilePhoto} />;
    }
  };

  return (
    <View style={styles.maincont}>
      <View style={styles.card}>
        <View style={styles.card2}>
          <TouchableOpacity onPress={handleChooseProfilePicture} style={styles.profilePhotoContainer}>
          {renderProfilePhoto()}
          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <Text style={styles.usernameText}>{user.username}</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
        </View>
        
        <View style={styles.addTipContainer}>
          <TextInput
            style={styles.tipInput}
            placeholder="Add Tip..."
            value={tipInput}
            onChangeText={(text) => setTipInput(text)}
          />
          <TouchableOpacity style={styles.addTipButton} onPress={() => handleAddTip(tipInput)}>
            <Text style={styles.addTipButtonText}>Add Tip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.creditsContainer}>
          <Text style={styles.creditsText}>Credits Earned</Text>
          <View style={styles.creditsValueContainer}>
            <Image source={CoinImage} style={styles.coinImage} />
            <Text style={styles.creditsValue}>123</Text> 
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card2:{

    flexDirection:'row',
    //backgroundColor:'red',
  },
  maincont: {
    //marginTop:100,
    flex: 1,
    backgroundColor: '#041C32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop:50,
    backgroundColor: '#04293A',
    borderRadius: 25,
    //sborderTopLeftRadius:100,
   //opacity:0.9,
    padding: 30,
    paddingBottom:20,
   //margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
    elevation: 8,
    width: '87%',
    height: '68%',
    //borderRadius:10,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  //backgroundColor: '#064663',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginRight:80,
    marginBottom: 20,
  },
  defaultProfilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    //backgroundColor: '#ddd',
  },
  changePhotoText: {
    //alignItems:'center',
    marginRight:50,
    marginLeft:-25,
    color: '#007AFF',
    fontSize: 14,
    marginTop:-13,
  },
  userInfoContainer: {
    // /alignItems: 'center',
    marginTop:40,
    marginLeft:-50,
    marginRight:80,
    marginBottom: 10,
    //backgroundColor: '#064663',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, 
    color: '#fff',
  },
  emailText: {
    fontSize: 18,
    color: '#ccc', 
    marginBottom: 20, 
  },
  
  addTipContainer: {
    marginTop:30,
    marginBottom: 30,
    backgroundColor: '#064663',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipInput: {
    flex: 1,
    height: 40,
    overflow:'hidden',
    //width:1000,
    //width:-200,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    //opacity:0.7,
    borderRadius:2,
    //marginRight: 3,
  },
  addTipButton: {
    backgroundColor: '#ECB365',
    opacity:0.72,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:100,
    //marginLeft:-120,
    alignItems: 'center',
  },
  addTipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  creditsContainer: {
    marginBottom: 20,
  //  backgroundColor: '#064663',
    alignItems: 'center',
  },
  creditsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
  creditsValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    width: 35,
    height: 35,
    marginRight: 5,
    borderRadius: 70,
   backgroundColor:'#064663',
   opacity:0.8,
   marginTop:15, 
  },
  
  creditsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8E6B3D',
    marginTop:15,
  },
  logoutButton: {
    backgroundColor: '#ECB365',
    opacity:0.72,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 13,
    alignItems: 'center',
    marginTop:20,
    marginLeft:8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
