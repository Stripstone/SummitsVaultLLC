const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  // CORS headers for all responses
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST"
  };

  // Handle OPTIONS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers,
      body: "Method Not Allowed" 
    };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  if (!name || !email || !message) {
    return { 
      statusCode: 400, 
      headers,
      body: "Missing required fields" 
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_SERVER,
    port: process.env.MAILGUN_SMTP_PORT,
    secure: false,
    requireTLS: true,
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
      headers,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error("Email failed to send:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Email failed" })
    };
  }
};