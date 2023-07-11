function generateShortId() {
  const date = new Date();
  const dateString = `${date.getUTCFullYear()}${
    date.getUTCMonth() + 1
  }${date.getUTCDate()}`;
  const randomNum = Math.floor(Math.random() * 100);
  return `${dateString}${randomNum}`;
}

module.exports = { generateShortId };
