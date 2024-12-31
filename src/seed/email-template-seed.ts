import { NestFactory } from '@nestjs/core';
import { AppModule } from '../modules/app.module';
import { EmailTemplateService } from '../services/email-template.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const emailTemplateService = app.get(EmailTemplateService);

  const templates = [
    {
      name: 'Welcome Template',
      subject: 'Welcome to MyApp!',
      content: `
       <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to {{companyName}}</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            }
            .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;
            }
            .header {
            text-align: center;
            padding: 20px 0;
            background-color: #007bff;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
            }
            .header h1 {
            margin: 0;
            font-size: 28px;
            }
            .content {
            padding: 20px;
            text-align: left;
            }
            .content p {
            margin: 10px 0;
            font-size: 16px;
            }
            .content a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            }
            .content a:hover {
            background-color: #0056b3;
            }
            .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h1>Welcome to Duke Team</h1>
            </div>
            <div class="content">
            <p>Hi {{name}},</p>
            <p>We are thrilled to have you join us at Duke Team!</p>
            <p>Start exploring our platform and discover the amazing features we offer to help you achieve your goals.</p>
            <p>your password to sign-in my website: {{password}}</p>
            <a href="{{welcomeLink}}">Get Started</a>
            <p>If you have any questions or need assistance, feel free to contact us at medusasaga@gmail.com</p>
            </div>
            <div class="footer">
            <p>Thank you for choosing Duke Team!</p>
            <p>- The Duke Team Team</p>
            </div>
        </div>
        </body>
        </html>
      `,
    },
    {
      name: 'Password Reset Template',
      subject: 'Reset Your Password',
      content: `
       <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
                }
                .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 20px;
                }
                .header {
                text-align: center;
                padding: 10px 0;
                background-color: #007bff;
                color: #ffffff;
                border-radius: 8px 8px 0 0;
                }
                .header h1 {
                margin: 0;
                font-size: 24px;
                }
                .content {
                padding: 20px;
                text-align: left;
                }
                .content p {
                margin: 10px 0;
                }
                .content a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                font-size: 16px;
                }
                .content a:hover {
                background-color: #0056b3;
                }
                .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <div class="header">
                <h1>Reset Your Password</h1>
                </div>
                <div class="content">
                <p>Hello {{name}},</p>
                <p>You recently requested to reset your password. Click the button below to reset it:</p>
                <a href="{{resetLink}}">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
                <p>This password reset link is valid for {{expirationTime}} minutes.</p>
                </div>
                <div class="footer">
                <p>Thank you,</p>
                <p>The Duke Team</p>
                </div>
            </div>
            </body>
            </html>
      `,
    },
    {
      name: 'Confirm Your Account',
      subject: 'Verify your email for Duke team',
      content: `
       <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirm Your Account</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            }
            .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;
            }
            .header {
            text-align: center;
            padding: 20px 0;
            background-color: #28a745;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
            }
            .header h1 {
            margin: 0;
            font-size: 28px;
            }
            .content {
            padding: 20px;
            text-align: left;
            }
            .content p {
            margin: 10px 0;
            font-size: 16px;
            }
            .content a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            }
            .content a:hover {
            background-color: #218838;
            }
            .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h1>Confirm Your Account</h1>
            </div>
            <div class="content">
            <p>Hi {{name}},</p>
            <p>Thank you for creating an account with Duke Team. To complete your registration, please confirm your email address by clicking the button below:</p>
            <a href="{{confirmationLink}}">Confirm Account</a>
            <p>If you did not create this account, you can safely ignore this email.</p>
            <p>This confirmation link will expire in {{expirationTime}} minutes.</p>
            </div>
            <div class="footer">
            <p>Thank you for choosing Duke Team!</p>
            <p>- The Duke Team Team</p>
            </div>
        </div>
        </body>
        </html>
      `,
    },
  ];

  for (const template of templates) {
    const existingTemplate = await emailTemplateService.getTemplateByName(
      template.name,
    );
    if (!existingTemplate) {
      await emailTemplateService.createTemplate(
        template.name,
        template.subject,
        template.content,
      );
      console.log(`Added template: ${template.name}`);
    } else {
      console.log(`Template "${template.name}" already exists. Skipping...`);
    }
  }

  await app.close();
}

bootstrap();
