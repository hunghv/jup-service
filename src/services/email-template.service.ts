import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailTemplate } from '../entities/email-template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplate, 'app_db')
    private readonly emailTemplateRepository: Repository<EmailTemplate>,
  ) {}

  async createTemplate(
    name: string,
    subject: string,
    content: string,
  ): Promise<EmailTemplate> {
    const newTemplate = this.emailTemplateRepository.create({
      name,
      subject,
      content,
    });
    return this.emailTemplateRepository.save(newTemplate);
  }

  async getTemplateByName(templateName: string): Promise<EmailTemplate> {
    return this.emailTemplateRepository.findOneBy({ name: templateName });
  }

  async updateTemplate(
    templateId: string,
    updates: Partial<EmailTemplate>,
  ): Promise<EmailTemplate> {
    await this.emailTemplateRepository.update(templateId, updates);
    return this.getTemplateByName(templateId);
  }

  async deleteTemplate(templateId: number): Promise<void> {
    await this.emailTemplateRepository.delete(templateId);
  }
}
