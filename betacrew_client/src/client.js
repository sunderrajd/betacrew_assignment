const net = require("net");
const { parsePacket } = require("./packetParser");
const { createRequest } = require("./requestBuilder");
const { findMissingSequences } = require("./sequenceChecker");
const { writePacketsToFile } = require("./writer");

const HOST = "127.0.0.1";
const PORT = 3000;
const PACKET_SIZE = 17;

// Request type 1: Stream All
function streamAllPackets(callback) {
  const client = new net.Socket();
  const packets = [];
  let buffer = Buffer.alloc(0);

  client.connect(PORT, HOST, () => {
    console.log("Connected to BetaCrew exchange server.");
    client.write(createRequest(1));
  });

  client.on("data", (data) => {
    buffer = Buffer.concat([buffer, data]);

    while (buffer.length >= PACKET_SIZE) {
      const packetBuffer = buffer.slice(0, PACKET_SIZE);
      const packet = parsePacket(packetBuffer);
      packets.push(packet);
      buffer = buffer.slice(PACKET_SIZE);
      console.log(" Received packet:", packet);
    }
  });

  client.on("close", () => {
    console.log(" Connection closed by server.");
    callback(packets);
  });

  client.on("error", (err) => {
    console.error(" Error:", err.message);
  });
}

// Request type 2: Resend missing packet
function requestMissingPacket(seq, callback) {
  const client = new net.Socket();
  let buffer = Buffer.alloc(0);

  client.connect(PORT, HOST, () => {
    client.write(createRequest(2, seq));
  });

  client.on("data", (data) => {
    buffer = Buffer.concat([buffer, data]);
    if (buffer.length >= PACKET_SIZE) {
      const packet = parsePacket(buffer.slice(0, PACKET_SIZE));
      client.destroy();
      callback(packet);
    }
  });

  client.on("error", (err) => {
    console.error(` Error requesting packet ${seq}:`, err.message);
  });
}

// Main logic
streamAllPackets(async (packets) => {
  const sequenceMap = new Map();
  let maxSeq = 0;

  packets.forEach((p) => {
    sequenceMap.set(p.sequence, p);
    if (p.sequence > maxSeq) maxSeq = p.sequence;
  });

  const missing = findMissingSequences(packets);
  console.log("Missing sequences:", missing);

  for (const seq of missing) {
    await new Promise((resolve) => {
      requestMissingPacket(seq, (packet) => {
        console.log(" Received missing packet:", packet);
        sequenceMap.set(packet.sequence, packet);
        resolve();
      });
    });
  }

  const allPackets = Array.from(sequenceMap.values());
  writePacketsToFile(allPackets);
});
