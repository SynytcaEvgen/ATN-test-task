import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DeviceService } from './device.service';
import { Device } from '../../db/entity/device.entity';
import { User } from '../../db/entity/user.entity';
import {
  CreateDeviceDto,
  UpdateDeviceDto,
  GetAllDeviceDto,
  GetAllUserDto,
} from './dto/device.dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NotFoundResponse } from '../../db/type/type.response';
import { JwtAuthGaurd } from '../auth/jwt-auth.guard';
import { ValidationPipe } from '../pipe/validation.pipe';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly jwtService: JwtService,
  ) {}
  @ApiOperation({ summary: 'Get all users by device ' })
  @ApiResponse({ status: 200, type: [Device] })
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  @Get('users')
  async getAllUserByDevice(@Query() dto: GetAllDeviceDto): Promise<User[]> {
    const userArry = await this.deviceService.findAllUserByDevice(dto.prodId);
    return userArry;
  }
  @ApiOperation({ summary: 'Get all users by device ' })
  @ApiResponse({ status: 200, type: [Device] })
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  @Get('devices')
  async getAllDeviceByUser(
    @Request() req: any,
    @Query() dto: GetAllUserDto,
  ): Promise<Device[]> {
    const user = await this.decodeToken(req.headers.authorization);
    const email = dto.email ? dto.email : user.email;
    const deviceArry = await this.deviceService.findAllDeviceByUser(email);
    return deviceArry;
  }

  @ApiOperation({ summary: 'Save some device' })
  @ApiResponse({ status: 200, type: Device, description: 'create device' })
  @ApiBody({ type: CreateDeviceDto })
  @UseGuards(JwtAuthGaurd)
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @Post('create')
  async saveData(
    @Body() dto: CreateDeviceDto,
    @Request() req: any,
  ): Promise<Device> {
    const device = new Device();
    device.name = dto.name;
    device.prodId = dto.prodId;
    const { id } = await this.decodeToken(req.headers.authorization);
    return await this.deviceService.create(device, id);
  }
  @ApiOperation({ summary: 'Change device for user' })
  @ApiBody({ type: UpdateDeviceDto })
  @ApiResponse({ status: 200, description: 'change device for user' })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Put('update')
  async updateData(
    @Body() dto: UpdateDeviceDto,
    @Request() req: any,
  ): Promise<Device> {
    const user = await this.decodeToken(req.headers.authorization);

    return this.deviceService.update(dto, user.id);
  }
  @ApiOperation({ summary: 'Delete by product number' })
  @ApiResponse({ status: 200, description: 'delete device' })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  @Delete('delete/:prodId')
  async deleteData(
    @Param('prodId') prodId: string,
    @Request() req: any,
  ): Promise<Device[]> {
    const user = await this.decodeToken(req.headers.authorization);
    await this.deviceService.remove(prodId, user.id);
    return await this.deviceService.findAllDeviceByUser(user.email);
  }
  private async decodeToken(headers: string) {
    const token = headers.split(' ')[1];
    const obj: any = this.jwtService.decode(token);
    return obj;
  }
}
