const keys = require("../keys");

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Access recovery",
    html: `
        <h1>Forgot password?</h1>
        <p>If not, just ignore this mail</p>
        <p>If you, press the link below:</p>
        <p><a href="${keys.BASE_URL}/auth/password/${token}">Recover access</a></p>
        <hr/>
        <a href="${keys.BASE_URL}">Course Shop</a>
        `,
  };
};
