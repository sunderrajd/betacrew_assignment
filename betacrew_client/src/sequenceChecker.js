function findMissingSequences(packets) {
  const sequences = packets.map((p) => p.sequence);
  const max = Math.max(...sequences);
  const missing = [];

  for (let i = 1; i < max; i++) {
    if (!sequences.includes(i)) {
      missing.push(i);
    }
  }

  return missing;
}

module.exports = { findMissingSequences };
