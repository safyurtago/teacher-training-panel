import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/entities/admin.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Injectable()
export class MailService {
    constructor (private mailerService: MailerService) {}

    async sendTeacherConfirmation(teacher: Teacher) : Promise<void> {
        
        const  url = `${process.env.API_HOST}/api/teacher/activate/${teacher.activation_link}`;
        await this.mailerService.sendMail({
            to: teacher.email,
            subject: "Welcome to TEACHER TRAINING PANEL, Please Confirm!",
            template: "./confirmation",
            context: {
                name: teacher.username,
                url
            }
        })
    }
    
    
    async sendAdminConfirmation(admin: Admin) : Promise<void> {
        const  url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
        await this.mailerService.sendMail({
            to: 'safyur0621@gmail.com',
            subject: "New Administrator Has Been Registrated, Please Confirm!",
            template: "./confirmation",
            context: {
                name: admin.username,
                url
            }
        })
    }

}
