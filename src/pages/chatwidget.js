import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../UserContext";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import "../pages/messageStyling.css";

// Define a styled component for the button
const StyledButton = styled(Button)({
  borderRadius: "8px",
  border: "2px solid black",
  spacing: "20px",
  display: "flex",
  justifyContent: "center",
});

function DynamicHomePage() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const { user } = useUserContext();
  const { folderName } = useParams();

  const sendUserMessage = async (event) => {
    event.preventDefault();
  
    if (!userInput) {
      return; // Prevent sending empty queries
    }
  
    const question = userInput;
    setUserInput("");
    setWaitingForResponse(true);
  
    const userMessage = {
      id: new Date().toISOString(),
      text: question,
      sender: "User",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    try {
      const response = await axios.post(
        // "http://localhost:80/new",
        // "https://konvas.ai/konvasnode/chat",
        "https://konvasai-c8ad18e7b5ef.herokuapp.com/chat",
        { question }, // Assuming question is a valid JSON object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.data.question;  
      console.log("aiResponse", aiResponse);
      const aiMessage = {
        id: new Date().toISOString(),
        text: aiResponse,
        sender: "AI",
      };
  
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      
    } catch (error) {
      console.error("Error sending/receiving message:", error);
    } finally {
      setWaitingForResponse(false);
    }
  };

  return (
    <div>
      <body className="tyn-body">
        <div className="tyn-root">
          <div className="tyn-content tyn-content-full-height tyn-chatbot tyn-chatbot-page has-aside-base">           
           <div
              className="tyn-main tyn-main-boxed tyn-main-boxed-lg"
              id="tynMain"
            >
              <ul className="tyn-list-inline d-md-none translate-middle-x position-absolute start-50 z-1">
                <li>
                  <button className="btn btn-icon btn-pill btn-white js-toggle-main">
                    {/* <!-- x-lg --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  </button>
                </li>
              </ul>
              <div className="tyn-chat-body m-4 rounded-3" data-simplebar>
                <div
                  className="conversation tyn-qa"
                  style={{ maxHeight: "700px" }}
                >
                  <div className="tyn-qa-item" style={{ background: "white" }}>
                    <div className="tyn-qa-avatar">
                      <div className="tyn-qa-avatar-wrap">
                        <div className="tyn-media tyn-size-md">
                          <img src="images/avatar/bot-1.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    {user && Object.keys(user).length !== 0 ? (
                      <div className="tyn-qa-message tyn-text-block">
                        <p>
                          {/* {user.given_name} */}
                          Hey {user.given_name}, I’m your personal shopping
                          assistant. Welcome to {folderName} store. How can I
                          assist you today?
                        </p>
                      </div>
                    ) : (
                      <div className="tyn-qa-message tyn-text-block">
                        <p>
                          Hey, I’m your personal shopping assistant. Welcome to{" "}
                          {folderName} store. You are not logged in. Please
                          login so I can assist you today.
                        </p>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Stack spacing={2} direction="row">
                            <Link to="/">
                              <StyledButton variant="contained">
                                Login
                              </StyledButton>
                            </Link>
                            <StyledButton variant="contained">
                              Register
                            </StyledButton>
                          </Stack>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {messages.map((message) => (
                      <div
                        className={`tyn-qa ${
                          message.sender === "AI"
                            ? "ai-message"
                            : "user-message"
                        }`}
                        key={message.id}
                      >
                        <div className="tyn-qa-item">
                          <div className="tyn-qa-avatar">
                            <div className="tyn-media tyn-size-md">
                              <img
                                src={
                                  message.sender === "AI"
                                    ? "/images/avatar/bot-1.jpg"
                                    : user.picture
                                }
                                alt=""
                                width={2}
                                height={100}
                              />
                            </div>
                          </div>
                          <div className="tyn-qa-message tyn-text-block">
                            <div
                              className={`message ${
                                message.sender === "AI"
                                  ? "ai-message"
                                  : "user-message"
                              }`}
                              style={
                                message.sender === "AI"
                                  ? { background: "#fff" }
                                  : { background: "CCDDFE" }
                              }
                            >
                              {message.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {waitingForResponse && (
                      <div
                        className="tyn-qa-item"
                        style={{ background: "white" }}
                      >
                        <div className="tyn-qa-avatar">
                          <div className="tyn-qa-avatar-wrap">
                            <div className="tyn-media tyn-size-md">
                              <img src="images/avatar/bot-1.jpg" alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="tyn-qa-message tyn-text-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            style={{
                              margin: "auto",
                              background: "rgb(255, 255, 255)",
                              display: "block",
                              shapeRendering: "auto",
                              animation: "moveLeft 2s infinite",
                            }}
                            width="50px"
                            height="50px"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                          >
                            <circle cx="84" cy="50" r="10" fill="#93c5fd">
                              <animate
                                attributeName="r"
                                repeatCount="indefinite"
                                dur="0.4716981132075471s"
                                calcMode="spline"
                                keyTimes="0;1"
                                values="10;0"
                                keySplines="0 0.5 0.5 1"
                                begin="0s"
                              ></animate>
                              <animate
                                attributeName="fill"
                                repeatCount="indefinite"
                                dur="1.8867924528301885s"
                                calcMode="discrete"
                                keyTimes="0;0.25;0.5;0.75;1"
                                values="#93c5fd;#93c5fd;#93c5fd;#93c5fd;#93c5fd"
                                begin="0s"
                              ></animate>
                            </circle>
                            <circle cx="16" cy="50" r="10" fill="#93c5fd">
                              <animate
                                attributeName="r"
                                repeatCount="indefinite"
                                dur="1.8867924528301885s"
                                calcMode="spline"
                                keyTimes="0;0.25;0.5;0.75;1"
                                values="0;0;10;10;10"
                                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="0s"
                              ></animate>
                              <animate
                                attributeName="cx"
                                repeatCount="indefinite"
                                dur="1.8867924528301885s"
                                calcMode="spline"
                                keyTimes="0;0.25;0.5;0.75;1"
                                values="16;16;16;50;84"
                                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="0s"
                              ></animate>
                            </circle>
                            <circle cx="50" cy="50" r="10" fill="#93c5fd">
                              <animate
                                attributeName="r"
                                repeatCount="indefinite"
                                dur="1.8867924528301885s"
                                calcMode="spline"
                                keyTimes="0;0.25;0.5;0.75;1"
                                values="0;0;10;10;10"
                                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="-0.4716981132075471s"
                              ></animate>
                              <animate
                                attributeName="cx"
                                repeatCount="indefinite"
                                dur="1.8867924528301885s"
                                calcMode="spline"
                                keyTimes="0;0.25;0.5;0.75;1"
                                values="16;16;16;50;84"
                                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="-0.4716981132075471s"
                              ></animate>
                            </circle>
                            <circle cx="84" cy="50" r="10" fill="#93c5fd">
                              <animate
                                attributeName="r"
                                repeatCount="indefinite"
                                dur="1.8867924528301885s"
                                calcMode="spline"
                                keyTimes="0;0.25;0.5;0.75;1"
                                values="0;0;10;10;10"
                                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="-0.9433962264150942s"
                              ></animate>
                              <animate
                                attributeName="cx"
                                repeatCount="indefinite"
                                dur="1.8867924528301885s"
                                calcMode="spline"
                                keyTimes="0;0.25;0.5;0.75;1"
                                values="16;16;16;50;84"
                                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="-0.9433962264150942s"
                              ></animate>
                            </circle>
                            <circle cx="16" cy="50" r="10" fill="#93c5fd">
                              <animate
                                attributeName="r"
                                repeatCount="indefinite"
                                dur="1.8867924528301885s"
                                calcMode="spline"
                                keyTimes="0;0.25;0.5;0.75;1"
                                values="0;0;10;10;10"
                                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="-1.4150943396226414s"
                              ></animate>
                              <animate
                                attributeName="cx"
                                repeatCount="indefinite"
                                dur="1.8867924528301885s"
                                calcMode="spline"
                                keyTimes="0;0.25;0.5;0.75;1"
                                values="16;16;16;50;84"
                                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                                begin="-1.4150943396226414s"
                              ></animate>
                            </circle>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <div ref={conversationEndRef} /> */}
                </div>
              </div>
              <form
                onSubmit={sendUserMessage}
                className="tyn-chat-form border-0 ps-3 pe-4 py-3 bg-white mb-4 mx-4 rounded-3"
              >
                <div className="tyn-chat-form-enter">
                  <div className="tyn-chat-form-input" id="tynChatInput">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Ask me anything..."
                      value={userInput}
                      autoComplete="off"
                    />
                  </div>
                  <ul className="tyn-list-inline me-n2 my-1">
                    <li>
                      <button className="btn btn-icon btn-white btn-md btn-pill">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-send-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
              
            </div>
          </div>         
        </div>
        <script src="assets/js/bundle1c4a.js?v131"></script>
        <script src="assets/js/app1c4a.js?v131"></script>
      </body>
    </div>
  );
}
export default DynamicHomePage;
