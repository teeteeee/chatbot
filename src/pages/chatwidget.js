import React, { useState } from "react";
import axios from "axios";

function Chatwidget() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);
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
          
          {/* .tyn-appbar */}
          <div className="tyn-content tyn-content-full-height tyn-chatbot tyn-chatbot-page has-aside-base">
            <div className="tyn-aside tyn-aside-base">
              {/* .tyn-aside-head */}
            </div>
            {/* .tyn-aside */}
            <div className="tyn-main" id="tynMain">
              
              <div className="tyn-chat-body my-4 px-4" data-simplebar="">
                <div className="container px-0">
                  <div className="tyn-qa tyn-qa-bubbly">
                    <div className="tyn-qa-item">
                      <div className="tyn-qa-message tyn-text-block">
                        <p>
                          Hey, I’m your personal shopping assistant. Welcome to
                          our store. How can I assist you today?
                        </p>
                      </div>
                    </div>
                    {messages.map((message) => (
                      <div className="tyn-qa-item">
                        <div
                          className={`tyn-qa ${
                            message.sender === "AI"
                              ? "ai-message"
                              : "user-message"
                          }`}
                          key={message.id}
                        >
                          <div
                            className={`tyn-qa-message ${
                              message.sender === "AI"
                                ? "ai-message"
                                : "user-message"
                            }`}
                          >
                            {message.text}
                          </div>

                          {/* .tyn-qa-message */}
                        </div>
                      </div>
                    ))}
                    {waitingForResponse && (
                      <div
                        className="tyn-qa-item"
                        // style={{ background: "white" }}
                      >
                        {/* <div className="tyn-qa-avatar">
                              <div className="tyn-qa-avatar-wrap">
                                <div className="tyn-media tyn-size-md">
                                  <img src="images/avatar/bot-1.jpg" alt="" />
                                </div>
                              </div>
                            </div> */}
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

                    {/* .tyn-qa-item */}

                    {/* .tyn-qa-item */}
                  </div>
                  {/* <div ref={conversationEndRef} /> */}
                  {/* .tyn-qa */}
                </div>
              </div>
              {/* .tyn-chat-body */}
              <form onSubmit={sendUserMessage}>
                <div className="tyn-chat-form border-0 px-4">
                  <div className="container px-0">
                    <div className="ps-3 pe-4 py-3 bg-white mb-4 rounded-3">
                      <div className="tyn-chat-form-enter">
                        <div
                          className="tyn-chat-form-input"
                          id="tynChatInput"
                          placeholder="text"
                          // contentEditable=""
                        >
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
                              {/* send-fill */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
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
                    </div>
                  </div>
                </div>
              </form>
              {/* .tyn-chat-form */}
            </div>
            {/* .tyn-chat-content */}
          </div>
          <div className="tyn-quick-chat" id="tynQuickChat">
            <button className="tyn-quick-chat-toggle js-toggle-quick">
              <svg
                viewBox="0 0 43 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37.2654 14.793C37.2654 14.793 45.0771 20.3653 41.9525 29.5311C41.9525 29.5311 41.3796 31.1976 39.0361 34.4264L42.4732 37.9677C42.4732 37.9677 43.3065 39.478 41.5879 39.9987H24.9229C24.9229 39.9987 19.611 40.155 14.8198 36.9782C14.8198 36.9782 12.1638 35.2076 9.76825 31.9787L18.6215 32.0308C18.6215 32.0308 24.298 31.9787 29.7662 28.3333C35.2344 24.6878 37.4217 18.6988 37.2654 14.793Z"
                  fill="#60A5FA"
                />
                <path
                  d="M34.5053 12.814C32.2659 1.04441 19.3506 0.0549276 19.3506 0.0549276C8.31004 -0.674164 3.31055 6.09597 3.31055 6.09597C-4.24076 15.2617 3.6751 23.6983 3.6751 23.6983C3.6751 23.6983 2.99808 24.6357 0.862884 26.5105C-1.27231 28.3854 1.22743 29.3748 1.22743 29.3748H17.3404C23.4543 28.7499 25.9124 27.3959 25.9124 27.3959C36.328 22.0318 34.5053 12.814 34.5053 12.814ZM19.9963 18.7301H9.16412C8.41419 18.7301 7.81009 18.126 7.81009 17.3761C7.81009 16.6261 8.41419 16.022 9.16412 16.022H19.9963C20.7463 16.022 21.3504 16.6261 21.3504 17.3761C21.3504 18.126 20.7358 18.7301 19.9963 18.7301ZM25.3708 13.314H9.12245C8.37253 13.314 7.76843 12.7099 7.76843 11.96C7.76843 11.21 8.37253 10.6059 9.12245 10.6059H25.3708C26.1207 10.6059 26.7248 11.21 26.7248 11.96C26.7248 12.7099 26.1103 13.314 25.3708 13.314Z"
                  fill="#2563EB"
                />
              </svg>
              <span className="badge bg-primary top-0 end-0 position-absolute rounded-pill">
                2
              </span>
            </button>
            <div className="tyn-quick-chat-box">
              <div className="tyn-quick-chat-head">
                <div className="tyn-media-group">
                  <div className="tyn-media tyn-size-rg">
                    <img src="images/avatar/1.jpg" alt="" />
                  </div>
                  <div className="tyn-media-col">
                    <div className="tyn-media-row">
                      <h6 className="name">Jasmine Thompson</h6>
                    </div>
                    <div className="tyn-media-row has-dot-sap">
                      <span className="meta">Active</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tyn-quick-chat-reply js-scroll-to-end">
                <div className="tyn-reply tyn-reply-quick" id="tynQuickReply">
                  <div className="tyn-reply-item outgoing">
                    <div className="tyn-reply-group">
                      <div className="tyn-reply-bubble">
                        <div className="tyn-reply-text">
                          {" "}
                          Do you know which App or feature it will require to
                          set up.{" "}
                        </div>
                        {/* tyn-reply-text */}
                      </div>
                      {/* .tyn-reply-bubble */}
                      <div className="tyn-reply-bubble">
                        <div className="tyn-reply-text">
                          {" "}
                          These article helps.{" "}
                        </div>
                        {/* tyn-reply-text */}
                      </div>
                      {/* .tyn-reply-bubble */}
                    </div>
                    {/* .tyn-reply-group */}
                  </div>
                  {/* .tyn-reply-item */}
                  <div className="tyn-reply-item incoming">
                    <div className="tyn-reply-avatar">
                      <div className="tyn-media tyn-size-md tyn-circle">
                        <img src="images/avatar/2.jpg" alt="" />
                      </div>
                    </div>
                    <div className="tyn-reply-group">
                      <div className="tyn-reply-bubble">
                        <div className="tyn-reply-link">
                          <a
                            className="tyn-reply-anchor"
                            href="https://www.envato.com/atomic-power-plant-engine/"
                          >
                            https://www.envato.com/atomic-power-plant-engine/
                          </a>
                        </div>
                      </div>
                      {/* .tyn-reply-bubble */}
                      <div className="tyn-reply-bubble">
                        <div className="tyn-reply-text">
                          {" "}
                          I hope these article helps.{" "}
                        </div>
                      </div>
                      {/* .tyn-reply-bubble */}
                    </div>
                    {/* .tyn-reply-group */}
                  </div>
                  {/* .tyn-reply-item */}
                  <div className="tyn-reply-separator">
                    May 10, 2022, 11:14 AM
                  </div>
                  <div className="tyn-reply-item outgoing">
                    <div className="tyn-reply-group">
                      <div className="tyn-reply-bubble">
                        <div className="tyn-reply-text">
                          {" "}
                          Yes, you can reset your password online. Go to the
                          login page, click on "Forgot Password," and follow the
                          instructions to reset it.{" "}
                        </div>
                        {/* tyn-reply-text */}
                      </div>
                      {/* .tyn-reply-bubble */}
                    </div>
                    {/* .tyn-reply-group */}
                  </div>
                  {/* .tyn-reply-item */}
                  <div className="tyn-reply-item incoming">
                    <div className="tyn-reply-avatar">
                      <div className="tyn-media tyn-size-md tyn-circle">
                        <img src="images/avatar/2.jpg" alt="" />
                      </div>
                    </div>
                    <div className="tyn-reply-group">
                      <div className="tyn-reply-bubble">
                        <div className="tyn-reply-text">
                          {" "}
                          How do I reset my password? Can I do it online?{" "}
                        </div>
                      </div>
                      {/* .tyn-reply-bubble */}
                    </div>
                    {/* .tyn-reply-group */}
                  </div>
                  {/* .tyn-reply-item */}
                </div>
                {/* .tyn-reply */}
              </div>
              <div className="tyn-quick-chat-form">
                <div
                  className="tyn-chat-form-input bg-light"
                  id="tynQuickChatInput"
                  contentEditable=""
                />
                <ul className="tyn-list-inline me-n2 my-1">
                  <li>
                    <button className="btn btn-icon btn-white btn-sm btn-pill">
                      {/* send-fill */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
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
              <button className="btn btn-danger btn-sm btn-icon top-0 end-0 position-absolute rounded-pill translate-middle js-toggle-quick">
                {/* x-lg */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <script src="assets/js/bundle1c4a.js?v131"></script>
        <script src="assets/js/app1c4a.js?v131"></script>
      </body>
    </div>
  );
}
export default Chatwidget;
