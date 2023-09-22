import axios from 'axios';
import PageNotFound from '../pageNotFound';

export async function saveDynamicPartToLocalStorage() {
// Get the current URL
const currentURL = window.location.href;

const parts = currentURL.split("https://konvas.app/");
// if (parts.length === 2) {
//   //   // Extract the dynamic part
//     const dynamicPart = parts[1];
  
// localStorage.setItem("customKey", dynamicPart);
// }
//      

// const parts = currentURL.split("https://konvas.app/");

// const parts = currentURL.split("http://localhost:3000/");
// Check if there is a dynamic part in the URL
if (parts.length === 2) {
  // Extract the dynamic part
  const dynamicPart = parts[1];

  try {
    // Check the endpoint before setting the customKey in local storage
    const response = await axios.get(`https://konvas.ai/apiv0/company_details_get/${dynamicPart}`);
    
    if (response.status === 200) {
      // Save the dynamic part to local storage
      localStorage.setItem("customKey", dynamicPart);
      // console.log("Value saved to local storage:", dynamicPart);
    } else {
      console.log("Endpoint check failed, not saving to local storage.");
    
      return <PageNotFound />;
     }
  } catch (error) {
    console.error("Error checking endpoint:", error);
  }
}
}






// export function saveDynamicPartToLocalStorage() {
//     // Get the current URL
//     const currentURL = window.location.href;    
    
//     const parts = currentURL.split("https://konvas.app/");
  
//     // const parts = currentURL.split("http://localhost:3000/");
//     // Check if there is a dynamic part in the URL
//     if (parts.length === 2) {
//       // Extract the dynamic part
//       const dynamicPart = parts[1];
      
  
//       // Save the dynamic part to local storage
//       localStorage.setItem("customKey", dynamicPart);
//       console.log("Value saved to local storage:", dynamicPart);

//     }
//   }
  

