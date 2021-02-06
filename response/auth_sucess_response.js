function authSucessResponse(user, token) {
  return {
    sucess: false,
    user: {
      uid: user._id,
      fullName: user.fullName,
      email: user.email,
      token: token,
    },
  };
}

module.exports = authSucessResponse;
