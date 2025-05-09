import "./App.css";

import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <>
      <div className="">
        <ChatWidget
          currentUser={{
            id: 3731,
            name: "Your Name",
            email: "shubham18822@gmail.com",
            picture: "https://your-picture-url.com/avatar.jpg",
          }}
        />
      </div>
    </>
  );
}

// export { ChatWidget };
export default App;
