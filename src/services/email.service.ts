import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
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
