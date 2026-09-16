import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    company: "Genesis Financial",
    timestamp: new Date().toISOString(),
  });
});

// Production-ready contact form submission
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, cityProvince, message } = req.body;

    // Server-side validation
    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "First name is required.",
      });
    }

    if (!lastName || typeof lastName !== "string" || lastName.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Last name is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "A valid email address is required.",
      });
    }

    if (!phone || typeof phone !== "string" || phone.trim().replace(/\D/g, "").length < 7) {
      return res.status(400).json({
        success: false,
        error: "A valid phone number is required.",
      });
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

    // Resend email integration (if RESEND_API_KEY is configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "recruitment@genesisfinancial.com";

    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
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
              <p><strong>City / Province:</strong> ${sanitizedData.cityProvince || "Not provided"}</p>
              <p><strong>Message / Note:</strong><br/>${sanitizedData.message ? sanitizedData.message.replace(/\n/g, "<br/>") : "No custom message attached"}</p>
              <p><em>Submitted: ${sanitizedData.receivedAt}</em></p>
            `,
          }),
        });

        if (!response.ok) {
          const errBody = await response.text();
          console.warn("[Contact API] Resend dispatch returned non-200:", errBody);
        } else {
          console.log("[Contact API] Notification email dispatched successfully to", recipientEmail);
        }
      } catch (emailErr) {
        console.warn("[Contact API] Failed to dispatch email via Resend:", emailErr);
      }
    } else {
      console.log("[Contact API] New candidate inquiry received (logged securely):", {
        name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        cityProvince: sanitizedData.cityProvince,
      });
    }

    return res.status(200).json({
      success: true,
      message: "THANK YOU. We've received your information and someone from Genesis Financial will be in touch.",
    });
  } catch (error) {
    console.error("[Contact API] Internal error processing inquiry:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred. Please try again or book a call directly.",
    });
  }
});

// Vite middleware in dev, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Genesis Financial server listening on port ${PORT}`);
  });
}

startServer();
