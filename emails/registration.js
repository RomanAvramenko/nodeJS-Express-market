const keys = require("../keys");

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Account created",
    html: `
    <h1>Welcome to our shop</h1>
    <p>You are successfuly created an account from email - ${email}</p>
    <hr/>
    <a href="${keys.BASE_URL}">Course Shop</a>
    `,
  };
};
