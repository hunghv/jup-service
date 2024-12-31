import { Injectable } from '@nestjs/common';
import SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(mail: any) {
    const message = {
      to: mail.to,
      subject: mail.subject,
      from: 'medusasaga@gmail.com',
      templateId: mail.templateId,
      dynamic_template_data: mail?.dynamicData,
    };

    try {
      await SendGrid.send(message);
      console.log('Email sent successfully');
    } catch (error) {
      console.error(
        'Error sending email:',
        error.response?.body?.errors || error,
      );
    }
  }
}
