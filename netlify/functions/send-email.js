const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  if (!name || !email || !message) {
    return { statusCode: 400, body: "Missing required fields" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_SERVER,
    port: process.env.MAILGUN_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `Website Inquiry: ${subject || "General"}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email failed" })
    };
  }
};
