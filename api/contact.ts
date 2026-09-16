import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(req: IncomingMessage & { body: any }, res: ServerResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // use as is
      }
    } else if (!body) {
      // Collect stream buffer if not pre-parsed
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const data = Buffer.concat(buffers).toString();
      try {
        body = JSON.parse(data);
      } catch {
        body = {};
      }
    }

    const { firstName, lastName, email, phone, cityProvince, message } = body || {};

    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, error: "First name is required." }));
      return;
    }

    if (!lastName || typeof lastName !== "string" || lastName.trim().length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, error: "Last name is required." }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, error: "A valid email address is required." }));
      return;
    }

    if (!phone || typeof phone !== "string" || phone.trim().replace(/\D/g, "").length < 7) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, error: "A valid phone number is required." }));
      return;
    }

    const sanitizedData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      cityProvince: (cityProvince || "").trim(),
      message: (message || "").trim(),
      receivedAt: new Date().toISOString(),
    };

    // Resend email delivery (if RESEND_API_KEY is configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "recruitment@genesisfinancial.com";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Genesis Recruitment <onboarding@resend.dev>",
            to: [recipientEmail],
            reply_to: sanitizedData.email,
            subject: `New Genesis Financial Agent Inquiry: ${sanitizedData.firstName} ${sanitizedData.lastName}`,
            html: `
              <h2>New Candidate Recruitment Inquiry</h2>
              <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
              <p><strong>City / Province:</strong> ${sanitizedData.cityProvince || "Not specified"}</p>
              <p><strong>Message / Background:</strong><br/>${sanitizedData.message ? sanitizedData.message.replace(/\n/g, "<br/>") : "None"}</p>
              <p><em>Submitted: ${sanitizedData.receivedAt}</em></p>
            `,
          }),
        });
      } catch (err) {
        console.warn("[Vercel Function] Resend email warning:", err);
      }
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: true,
        message: "THANK YOU. We've received your information and someone from Genesis Financial will be in touch.",
      })
    );
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: false,
        error: "An unexpected error occurred. Please try again or book a call directly.",
      })
    );
  }
}
