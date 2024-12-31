import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import handlebars from 'handlebars';
import { LoggerService } from './log.service';
import { EmailTemplateService } from './email-template.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly loggerService: LoggerService,
    private readonly emailTemplateService: EmailTemplateService,
  ) {}

  async send(mail: any) {
    const template = await this.loadTemplateFromDatabase(mail.templateName);

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
    templateName: string,
  ): Promise<{ content: string }> {
    const template =
      await this.emailTemplateService.getTemplateByName(templateName);
    if (!template) {
      throw new Error('Template not found or invalid');
    }
    return {
      content: template.content,
    };
  }
}
