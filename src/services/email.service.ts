import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import handlebars from 'handlebars';
import { LoggerService } from './log.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly loggerService: LoggerService,
  ) {}

  async send(mail: any) {
    const template = await this.loadTemplateFromDatabase(mail.templateId);

    if (!template || !template.content) {
      throw new Error('Template not found or invalid');
    }

    const compiledTemplate = handlebars.compile(template.content);

    const htmlContent = compiledTemplate(mail?.dynamicData);

    try {
      await this.mailerService.sendMail({
        to: mail.to,
        subject: mail.subject,
        html: htmlContent,
      });
    } catch (error) {
      this.loggerService.error(error.response?.body?.errors || error);
    }
  }

  private async loadTemplateFromDatabase(
    templateId: string,
  ): Promise<{ content: string }> {
    console.log(templateId);
    return {
      content: `
        <h1>Welcome, {{RecipientName}}!</h1>
        <p>Your registration is successful.  {{ConfirmUrl}}</p>
        <p>Best regards,<br/>The Team</p>
      `,
    };
  }
}
