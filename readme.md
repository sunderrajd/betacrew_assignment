# Betacrew Assignment

This repository contains a client-server application that simulates communication with the BetaCrew exchange server. The system handles receiving packets from the server, checking for missing sequences, requesting missing packets, and saving the data to an output file (output.json).

## Project Structure

betacrew_assignment/
├── betacrew_client/
│ ├── output/
│ │ └── output.json
│ ├── src/
│ │ ├── client.js
│ │ ├── packetParser.js
│ │ ├── requestBuilder.js
│ │ ├── sequenceChecker.js
│ │ └── writer.js
│ ├── package.json
│ └── .gitignore
└── betacrew_server/
└── main.js

- **betacrew_client/**: This folder contains all the code for the client application, which connects to the server, processes packets, handles missing packets, and writes the final result to `output.json`.
- **betacrew_server/**: This folder contains the server code (main.js), which simulates a server-side application and sends data packets.
- **output.json**: The final output is stored here after processing the packets and handling missing sequences.

---

## How to Run Locally

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download and install it from [Node.js](https://nodejs.org/).

### Step-by-Step Instructions

1. **Clone the Repository:**
   First, clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/betacrew_assignment.git
   cd betacrew_assignment
   ```
2. **Install Dependencies**
   \*\*Navigate to the betacrew_client directory and install the required dependencies: ```
   cd betacrew_client
   npm install
3. **Run the Server** ```
   Open a terminal, navigate to the betacrew_server directory, and start the server by running:
   node betacrew_server/main.js

4. **Run the Client**
   In a separate terminal, navigate to the betacrew_client directory and run the client:
   node betacrew_client/src/client.js
   Expected Behavior
   The server will simulate sending packets to the client.

The client will receive the packets, parse them, check for missing sequences, request those missing packets, and write the result to the betacrew_client/output/output.json file.

Output
Once the client processes all the packets, it will save the result to betacrew_client/output/output.json.

The JSON file will contain an array of packets with their details (symbol, buy/sell indicator, quantity, price, and sequence).

**File Descriptions**
betacrew_client/src/client.js: The entry point for the client, which manages packet reception, sequence checking, and missing packet requests.

betacrew_client/src/packetParser.js: Parses a single packet and extracts the necessary data (symbol, buy/sell indicator, quantity, price, sequence).

betacrew_client/src/requestBuilder.js: Builds the request for the server to either stream packets or request a missing packet.

betacrew_client/src/sequenceChecker.js: Checks for missing sequences and helps in determining which packets need to be requested again.

betacrew_client/src/writer.js: Writes the final sorted packets to the output JSON file.

betacrew_server/main.js: Simulates the server that sends packets to the client. It handles communication with the client.

**Troubleshooting**
"Module not found" error: Ensure you have run npm install to install all dependencies before starting the server or client.

Issues with missing packets: If the client detects missing packets, it will automatically request them. Ensure that the server is running and sending packets.

Output issues: If output.json is not generated, verify that the client is running correctly and receiving data from the server.
