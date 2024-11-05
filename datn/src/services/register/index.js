// import axios from 'axios';

// const apiUrl = "http://127.0.0.1:8000/api/auth/register";

// export const registerUser = async (userData) => {
//   try {
//     const formData =  new FormData();
//     formData.append('email', userData.email);
//     formData.append('password', userData.password);
//     formData.append('full_name', userData.full_name);
//     formData.append('phone', userData.phone);
//     const response = await axios.post(apiUrl, userData,{
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     }); 
//     console.log("Tạo tk thành công",  response.data);
    
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };
import axios from 'axios';

const apiUrl = "http://127.0.0.1:8000/api/auth/register";

export const registerUser = async (userData) => {
  try {
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('full_name', userData.full_name);
    formData.append('phone', userData.phone);

    const response = await axios.post(apiUrl, formData, {  // Pass formData instead of userData
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log("Tạo tk thành công", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
