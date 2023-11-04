import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import { Admin } from "../../admin/entities/admin.entity";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        ) {}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        
        const authHeader = req.headers.authorization;
        
        if(!authHeader) throw new UnauthorizedException('Admin Unauthorized');

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer != 'Bearer' || !token) throw new UnauthorizedException('Admin Unauthorized');

        try {
            const admin: Partial<Admin> = await this.jwtService.verify(token, {
                secret: process.env.ADMIN_ACCESS_TOKEN_KEY
            });
            
            const findAdmin = await this.prismaService.admin.findUnique({where: {email: admin.email}})
            if(!admin) throw new UnauthorizedException('Invalid token provided');

            if(!findAdmin.is_active) throw new BadRequestException('Admin is not active');
            
            req.admin = findAdmin;

            return true;
        } catch (error) {
            console.log(error);
            
            throw new UnauthorizedException('Token verify error');
        }
    } 
}
