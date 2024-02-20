import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const updateUserProfilePhoto = async (profilePhotoUri, authToken) => {
//     try {
//       const formData = new FormData();
//       formData.append('profilePhoto', {
//         uri: profilePhotoUri,
//         name: 'profilePhoto.jpg', // You can use any name you prefer
//         type: 'image/jpeg', // Adjust the type according to your image format
//       });
  
//       const response = await fetch('YOUR_BACKEND_API_URL', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
//           // Include any additional headers required by your backend
//         },
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error('Profile photo update failed');
//       }
  
//       // Handle the response as needed
//       const responseData = await response.json();
//       console.log('Profile photo updated successfully', responseData);
  
//       // Update the user context with the new profile photo
//       setUser((prevUser) => ({
//         ...prevUser,
//         profilePhoto: profilePhotoUri,
//       }));
//     } catch (error) {
//       console.error('Error updating profile photo:', error.message);
//       // Handle errors accordingly
//     }
//   };

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   const contextValue = {
//     user,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// Import statements

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
  
    const updateUserProfilePhoto = async (profilePhotoUri) => {
      try {
        const formData = new FormData();
        formData.append('profilePhoto', {
          uri: profilePhotoUri,
          name: 'profilePhoto.jpg', 
          type: 'image/jpeg', 
        });
      
           console.log("profilephoto",profilePhotoUri);
           
        const response = await fetch('http://192.168.1.24:80/user/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`, 
            
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Profile photo update failed');
        }
  
        const responseData = await response.json();
        console.log('Profile photo updated successfully', responseData);
  
        setUser((prevUser) => ({
          ...prevUser,
          profilePhoto: profilePhotoUri,
        }));
      } catch (error) {
        console.error('Error updating profile photo:', error.message);
      }
    };
  
    const login = (userData) => {
      setUser(userData.user);
      console.log("form here",userData.token);
      setAuthToken(userData.token);
    };
  
    const logout = () => {
      setUser(null);
      setAuthToken(null);
    };
  
    const contextValue = {
      user,
      login,
      logout,
      authToken,
      updateUserProfilePhoto,
    };
  
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  };
  
 
  
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
