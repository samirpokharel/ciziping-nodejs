function errorResponsObj(message) {
  return {
    sucess: false,
    error: { message },
  };
}

module.exports = errorResponsObj;
