module.exports = {
  emptyToNull(obj) {
    //Convert empty string to null
    for (const key in obj) {
      obj[key] = obj[key] === "" ? null : obj[key];
    }
  },
};
