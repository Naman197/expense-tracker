// import { fetchExpenseData } from "./services/api";
// //import { useAuth } from "./Authcontext";

// const expensesData = async (authToken) => {
//     try {
//       console.log("hello expenese data called");
//      // const { user, logout, updateUserProfilePhoto, authToken } = useAuth();

//    console.log("usertoken",authToken);
// const response = await fetch('http://192.168.1.24:80/expense/total?interval=daily', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${authToken}`,
//   },
// });

// if (response.ok) {
//   const data = await response.json();
// } else {
//   console.error('Failed to fetch data:', response.status, response.statusText);
// }
     
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const expenses = await response.json();
  
//       return expenses;
//     } catch (error) {
//       console.error('Error:1', error.message);
//       throw error;
//     }
//   };
//   export default expensesData;
import { fetchExpenseData } from "./services/api";

const expensesData = async (authToken) => {
  try {
    console.log("Hello expense data called");

    const response = await fetch('http://192.168.1.24:80/expense/total?interval=daily', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const expenses = await response.json();
      return expenses;
    } else {
      console.error('Failed to fetch data:', response.status, response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

export default expensesData;

  