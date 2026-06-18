export async function sendEmailNotification(lead: any) {
  const API_USER_ID = process.env.SENDPULSE_ID;
  const API_SECRET = process.env.SENDPULSE_SECRET;
  const TO_EMAIL = process.env.NOTIFICATION_EMAIL;

  if (!API_USER_ID || !API_SECRET || !TO_EMAIL) {
    console.warn("SendPulse credentials or TO_EMAIL not set. Skipping email notification.");
    return;
  }

  try {
    // 1. Get Token
    const tokenRes = await fetch("https://api.sendpulse.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: API_USER_ID,
        client_secret: API_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      console.error("Failed to authenticate with SendPulse");
      return;
    }

    const { access_token } = await tokenRes.json();

    // 2. Send Email
    const emailData = {
      email: {
        html: `
          <h3>Новая заявка с сайта</h3>
          <p><strong>Имя:</strong> ${lead.name}</p>
          <p><strong>Телефон:</strong> ${lead.phone}</p>
          ${lead.email ? `<p><strong>Email:</strong> ${lead.email}</p>` : ""}
          ${lead.source ? `<p><strong>Источник:</strong> ${lead.source}</p>` : ""}
        `,
        text: `Новая заявка: ${lead.name}, ${lead.phone}`,
        subject: "Новая заявка - Септик Гарант",
        from: {
          name: "Septik Zakaz Bot",
          email: "noreply@septik-garant.ru" // This should be a verified sender in SendPulse
        },
        to: [
          {
            email: TO_EMAIL,
          }
        ]
      }
    };

    const sendRes = await fetch("https://api.sendpulse.com/smtp/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      },
      body: JSON.stringify(emailData)
    });

    if (!sendRes.ok) {
      console.error("Failed to send email via SendPulse", await sendRes.text());
    } else {
      console.log("Email notification sent successfully.");
    }
  } catch (error) {
    console.error("Error in sendEmailNotification:", error);
  }
}
