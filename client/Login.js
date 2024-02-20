
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from './Authcontext';
import { performLogin, performRegistration } from './services/api';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  //const{}=useauth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeForm, setActiveForm] = useState('login'); 
  const handleForgotpassword=()=>{
       console.log('forgot password pressed'); 


  }
  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log('Login button pressed');
      const result = await performLogin(username, password);
      console.log("Login result:", result);

      login(result);

      // navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed:', error.message);
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      if (!email || !username || !password || !confirmPassword) {
        console.error('Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      setLoading(true);
      console.log('Register button pressed');
      const result = await performRegistration(username,email,password);

      console.log("Registration result:", result);
      login(result);


      // login(result);
      // navigation.navigate('Home');
    } catch (error) {
      console.error('Registration failed:', error.message);
      setLoading(false);
    }
  };

  const switchForm = (form) => {
    setActiveForm(form);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={[styles.headerButton, activeForm === 'login' && styles.activeHeaderButton]}
            onPress={() => switchForm('login')}
          >
            <Text style={[styles.headerText, activeForm === 'login' && styles.activeHeaderText]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.headerButton, activeForm === 'register' && styles.activeHeaderButton]}
            onPress={() => switchForm('register')}
          >
            <Text style={[styles.headerText, activeForm === 'register' && styles.activeHeaderText]}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          {activeForm === 'login' && (
            <>
              <Text style={styles.headerText}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
              />
            <TouchableOpacity onPress={handleForgotpassword}>
  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
</TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </>
          )}

          {activeForm === 'register' && (
            <>
              <Text style={styles.headerText}>Register</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Register</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041C32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#04293A',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: '80%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 2,
    borderColor: '#ECB365',
    elevation:3,
  },
  
  headerButton: {
    flex: 1, 
    paddingVertical: 10, 
  },

  headerText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },

  activeHeaderButton: {
    borderBottomWidth: 2, 
    borderColor: '#ECB365',
    marginRight: 30, 
  },
  
  forgotPasswordText: {
    color: 'grey',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  activeHeaderText: {
  },
  loginContainer: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#064663',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#ECB365',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#ECB365',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
  },
}
);


export default LoginScreen;





