import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import { Teacher } from "../../teacher/entities/teacher.entity";

@Injectable()
export class TeacherGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        ) {}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        
        const authHeader = req.headers.authorization;
        if(!authHeader) throw new UnauthorizedException('Teacher Unauthorized');

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer != 'Bearer' || !token) throw new UnauthorizedException('Teacher Unauthorized');

        try {
            
            const teacher: Partial<Teacher> = await this.jwtService.verify(token, {
                secret: process.env.TEACHER_ACCESS_TOKEN_KEY,
            });
            if(!teacher) throw new UnauthorizedException('Invalid token provided');
            const findTeacher = await this.prismaService.teacher.findUnique({where: {email: teacher.email}})

            if(!findTeacher.is_active) throw new BadRequestException('Teacher is not active');
            
            req.teacher = findTeacher;
            

            return true;
        } catch (error) {
            throw new UnauthorizedException('Token verify error');
        }
    } 
}
