const performLogin = async (email, password) => {
  try {
    const response = await fetch('http://192.168.1.24:80/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    //console.log('Response Status:', response.status);
    //const getResponse = await fetch("http://192.168.1.2:80/expense/total?interval=daily",{ method: 'GET',});
//console.log('GET Response:', getResponse);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server Error:', errorText);
      throw new Error('Authentication failed');
    }

    const result = await response.json();
    console.log('Authentication Result:', result);
    return result;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    throw new Error('Authentication failed');
  }
};
const performRegistration=async(username,email,password)=>{

  try {
    const response=await fetch('http://192.168.1.24:80/user/create',{ method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),})
    console.log('Response Status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server Error:', errorText);
      throw new Error('Authentication failed');

    }
    const result = await response.json();
    console.log('Authentication Result:', result);
    return result;
  } 
  catch (error) {
    console.error('Authentication failed:', error.message);
    throw new Error('Authentication failed');
    
  }
}
//const apiUrl = "http://192.168.1.24:80/expense/total";

//const apiUrl = "http://192.168.1.24:80/expense/total";
const apiUrl = "http://192.168.1.24:80/expense/total";


const fetchExpenseData = async (interval,authToken) => {
  try {
    const apiUrl = "http://192.168.1.24:80/expense/total";
    console.log("hello fetching expense data for cchart auth token ",authToken);
    const response = await fetch(`${apiUrl}?interval=${interval}`, {method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
    console.log(`HTTP Status: ${response.status}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};
const addTipToDatabase = async (authToken, tipText) => {
  try {
    const response = await fetch('http://192.168.1.24:80/tip/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        tipText,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add tip');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding tip:', error.message);
    throw error;
  }
};


  
  
  export { performLogin ,performRegistration,fetchExpenseData,addTipToDatabase};
  