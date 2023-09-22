import React from "react";
import "./App.css";
import { UserProvider } from "./UserContext";
import Chatwidget from "./pages/chatwidget";
import PageNotFound from "./pageNotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  // const { setUser } = useUserContext();

  // // Function to check for user data in local storage
  // const checkForUserData = () => {
  //   const userData = localStorage.getItem("user_data");
  //   if (userData) {
  //     const userDetails = JSON.parse(userData);
  //     setUser(userDetails);
  //   }
  // };

  // // Run the check when the app component mounts (initializes)
  // useEffect(() => {
  //   checkForUserData();
  // }, []); // The empty array [] ensures this effect runs only once when the component mounts

   return (
    <UserProvider>
      <Router >
        <div className="App">
          <Routes >
            <Route path="/" element={<Chatwidget />} />
            
            {/* <Route path="/:folderName" element={<NewHome />} /> */}
          
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<PageNotFound />} />
            
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;