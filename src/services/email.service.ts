import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor() {}

  async send(mail: any) {
    const message = {
      to: mail.to,
      subject: mail.subject,
      from: 'medusasaga@gmail.com',
      templateId: mail.templateId,
      dynamic_template_data: mail?.dynamicData,
    };

    try {
      console.log(message);
      console.log('Email sent successfully');
    } catch (error) {
      console.error(
        'Error sending email:',
        error.response?.body?.errors || error,
      );
    }
  }
}
