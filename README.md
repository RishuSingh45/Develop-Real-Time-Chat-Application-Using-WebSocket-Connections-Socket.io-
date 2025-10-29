# Real-Time Chat Application

This project is a simple, real-time chat application built with a React frontend (using Vite) and a Node.js backend. It uses WebSockets via the `socket.io` library to allow multiple users to communicate instantly without refreshing the page.

## 📸 Screenshot

Here is a screenshot of the running application. Users can enter their name and send messages, which appear in the chat window with a timestamp.

![Screenshot of the chat application](https://github.com/ravishankar1810/Develop-Real-Time-Chat-Application-Using-WebSocket-Connections-Socket.io-/blob/0cf678624be6ca6567613c0dfcb6224a7f1aa2cb/Screenshot%202025-10-29%20051251.png)

*(Note: You may need to move your screenshot file into the project and update this path).*

---

## 🚀 What We Built

This project is divided into two main parts: a backend server and a frontend client.

### 1. Backend (`chat-server`)
* **Technology:** Node.js, Express, and `socket.io`.
* **Role:** Acts as the central "post office" for all messages.
* **Key Functions:**
    * Starts an Express server and attaches `socket.io` to it.
    * Uses `cors` to allow the React app (on a different port) to connect.
    * Listens for new client connections (`io.on('connection', ...)`).
    * Listens for a `"sendMessage"` event from any client.
    * When a message is received, it broadcasts a `"receiveMessage"` event to **all** connected clients, sending them the message data (user, text, and time).

### 2. Frontend (`My_project`)
* **Technology:** React (Vite) and `socket.io-client`.
* **Role:** The user interface that people see and interact with.
* **Key Functions:**
    * Connects to the backend server (`io('http://localhost:3001')`).
    * Uses `useState` to manage the user's name, the current message being typed, and the list of all chat messages.
    * Uses `useEffect` to listen for the `"receiveMessage"` event from the server. When it "hears" this event, it adds the new message to the chat list, causing the UI to re-render.
    * When the "Send" button is clicked, it emits a `"sendMessage"` event to the server, passing along the user's name, the message text, and a new timestamp.

---

## 🛠️ How to Run This Project

You must run **both** the frontend and backend in two separate terminals.

### 1. Run the Backend Server

```bash
# 1. Navigate into the server folder
cd chat-server

# 2. Install the necessary packages (only need to do this once)
npm install

# 3. Start the server
npm start

# Server will be running on http://localhost:3001
