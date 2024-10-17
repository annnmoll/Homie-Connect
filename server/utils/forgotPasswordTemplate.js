exports.forgotPasswordTemplate = (resetLink, userName) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 20px;
            }
            .header img {
                max-width: 150px;
            }
            .message {
                font-size: 16px;
                color: #333333;
            }
            .reset-link {
                display: block;
                width: 100%;
                text-align: center;
                margin: 30px 0;
            }
            .reset-button {
                background-color: #3498db;
                color: white;
                padding: 12px 20px;
                border-radius: 5px;
                text-decoration: none;
                font-weight: bold;
            }
            .footer {
                margin-top: 30px;
                font-size: 12px;
                text-align: center;
                color: #888888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <!-- Replace with the actual logo URL -->
                <img src="https://res.cloudinary.com/dul4bpf0s/image/upload/v1729163630/Screenshot_2024-10-17_164106_jvric3.png" alt="HomiesConnect Logo">
            </div>
            <div class="message">
                <p>Hello <strong>${userName}</strong>,</p>
                <p>It looks like you requested a password reset. No worries! You can reset your password by clicking the link below:</p>
            </div>
            <div class="reset-link">
                <a href="${resetLink}" class="reset-button">Reset Password</a>
            </div>
            <div class="message">
                <p>If you did not request this, please ignore this email and no changes will be made to your account.</p>
                <p>Best regards,</p>
                <p><strong>The HomiesConnect Team</strong></p>
            </div>
            <div class="footer">
                &copy; 2024 HomiesConnect. All rights reserved.
            </div>
        </div>
    </body>
    </html>
      `;
};
