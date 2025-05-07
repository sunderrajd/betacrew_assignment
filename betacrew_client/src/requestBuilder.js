function createRequest(callType, sequence = 0) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt8(callType, 0); // 1 for stream, 2 for resend
  buffer.writeUInt8(sequence, 1); // 0 for stream, actual seq for resend
  return buffer;
}

module.exports = { createRequest };
