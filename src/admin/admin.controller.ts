import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ChangePasswordDto, CreateAdminDto, LoginAdminDto, UpdateAdminDto } from './dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './entities/admin.entity';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';
import { AdminGuard } from '../common/guards/admin.guard';
import { FindFilteredAdminsDto } from './dto/find-filter-admins.dto';

@ApiTags('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({summary: 'SIGN UP ADMIN'})
  @ApiResponse({status: 201, type: Admin})
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp (
    @Body() createAdminDto: CreateAdminDto, @Res({passthrough: true}) res: Response,
  ) {
    return this.adminService.signUp(createAdminDto, res);
  }

  @ApiOperation({summary: 'ACTIVATE ADMIN'})
  @ApiResponse({status: 200, type: [Admin]})
  @Get('activate/:link')
  activate (@Param('link') link: string) {
      return this.adminService.activate(link)
  }

  @ApiOperation({summary: 'Login Admin'})
  @ApiResponse({status: 200, type: [Admin]})
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn (
    @Body() loginAdminDto: LoginAdminDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.adminService.signIn(loginAdminDto, res);
  }

  @ApiOperation({summary: 'Logout Admin'})
  @ApiResponse({status: 200, type: [Admin]})
  @UseGuards(AdminGuard)
  @Post('signout')
  signOut (
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response
  ) {
    
    return this.adminService.signOut(refreshToken, res);
  }

  @ApiOperation({summary: 'FIND ALL FILTERD ADMINS'})
  @ApiResponse({status: 200, type: [Admin]})
  @Post('find')
  findAll(@Body() findFilteredAdminsDto: FindFilteredAdminsDto) {
    return this.adminService.findFilteredAdmins(findFilteredAdminsDto);
  }


  @ApiOperation({summary: 'Refresh Token'})
  @ApiResponse({status: 200, description: 'Refresh Tokens'})
  @UseGuards(AdminGuard)
  @Post(':id/refresh')
  refreshToken(
    @Param('id') id: string, @CookieGetter('refresh_token') refreshToken: string, 
    @Res({passthrough: true}) res: Response
  ) {
    return this.adminService.refreshToken(id, refreshToken, res)
  }

  @ApiOperation({summary: 'FIND ADMIN BY ID'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(AdminGuard)
  @Get('findone/:id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.adminService.findOneAdmin(id, req);
  }
  

  @ApiOperation({summary: 'UPDATE ADMIN BY ID'})
  @ApiResponse({status: 200, type: Admin})
  @UseGuards(AdminGuard)
  @Put('update/:id')
  updateAdmin(
    @Param('id') id: string, 
    @Body() updateAdminDto: UpdateAdminDto,
    @Req() req: Request,
    ) {
    return this.adminService.updateAdmin(id, updateAdminDto, req);
  }

  @ApiOperation({summary: 'Delete ADMIN BY ID'})
  @ApiResponse({status: 200, description: "True if Deleted!"})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  deleteAdmin(
    @Param('id') id: string, 
    @Req() req: Request,
    ) {
    return this.adminService.deleteAdmin(id, req);
  }

  @ApiOperation({summary: 'CHANGE PASSWORD ADMIN '})
  @ApiResponse({status: 200, description: "True if UPDATED!"})
  @UseGuards(AdminGuard)
  @Patch('change-password')
  changePassword (
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request,
    ) {
    return this.adminService.changePassword(changePasswordDto, req);
  }
  
}
