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
import { Role } from './role.enum'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { User } from './decorators/user.decorator'
import { UserDetails } from './user-details.interface'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserSchema } from './user.schema'
import { JwtGuard } from '../auth/guards/jwt.guard'
import { Roles } from '../auth/decorators/role.decorator'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get all users' })
  async getAll() {
    const users = await this.userService.getAll()

    return { message: 'all user', users }
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get user details' })
  async getSingle(@Param('id') id: string) {
    const user = await this.userService.getSingleById(id)
    if (!user) {
      throw new NotFoundException(`User ${id} not found`)
    }

    return { message: 'single user', user }
  }

  @Delete('/drop/:name')
  @ApiExcludeEndpoint()
  dropCollection(@Param('name') colName: string) {
    return this.userService.dropDB(colName)
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a user' })
  async deleteSingle(@Param('id') id: string) {
    const user = await this.userService.deleteSingle(id)
    if (!user) {
      throw new NotFoundException(`User ${id} not found`)
    }

    return { message: 'deleted', user }
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update a user' })
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
