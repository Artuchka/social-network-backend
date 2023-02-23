import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { JwtGuard } from 'src/auth/guards/jwt.guard'
import { Roles } from 'src/auth/decorators/role.decorator'
import { Role } from './role.enum'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { User } from './decorators/user.decorator'
import { UserDetails } from './user-details.interface'
import { User as UserType } from './user.schema'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  async getAll() {
    const users = await this.userService.getAll()

    return { message: 'all user', users }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getSingle(@Param('id') id: string) {
    const user = await this.userService.getSingleById(id)
    if (!user) {
      throw new NotFoundException(`User ${id} not found`)
    }

    return { message: 'single user', user }
  }

  @Delete('/drop/:name')
  dropCollection(@Param('name') colName: string) {
    return this.userService.dropDB(colName)
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteSingle(@Param('id') id: string) {
    const user = await this.userService.deleteSingle(id)
    if (!user) {
      throw new NotFoundException(`User ${id} not found`)
    }

    return { message: 'deleted', user }
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async updateSingle(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @User() user: UserDetails,
  ) {
    console.log({ dto })

    const { id: requestUserId, roles } = user
    if (requestUserId !== id && !roles.includes(Role.ADMIN)) {
      throw new ForbiddenException(`You are not allowed to update this user`)
    }

    const updatedUser = await this.userService.updateSingle(id, dto)
    return { message: 'updated', user: updatedUser }
  }
}
