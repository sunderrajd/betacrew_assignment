function parsePacket(buffer) {
  return {
    symbol: buffer.toString("ascii", 0, 4).replace(/\0/g, ""),
    buySellIndicator: buffer.toString("ascii", 4, 5),
    quantity: buffer.readInt32BE(5),
    price: buffer.readInt32BE(9),
    sequence: buffer.readInt32BE(13),
  };
}

module.exports = { parsePacket };
