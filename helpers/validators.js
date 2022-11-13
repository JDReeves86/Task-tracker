module.exports = {
  emailValidate(email) {
    regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}", "g");
    return regex.test(email);
  },
  passStrength: (password) => {
    const regex = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    return regex.test(password);
  },
  comparePassword: async (password, compare) => {
    console.log("received:", password, compare);
    const result = await bcrypt.compare(password, compare);
    console.log(result);
    return result ? true : console.log("check failed");
  },
};
