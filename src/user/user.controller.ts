import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Role } from './role.enum'
import { User } from './decorators/user.decorator'
import { UserDetails } from './user-details.interface'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserSchema } from './schemas/user.schema'
import { JwtGuard } from '../auth/guards/jwt.guard'
import { Roles } from '../auth/decorators/role.decorator'
import { RolesGuard } from '../auth/guards/roles.guard'

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

  @Post('/friendRequest')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Sending friend request from requestor' })
  async requestFriend(
    @Body('requestorId') requestorId: string,
    @Body('recieverId') recieverId: string,
    @User('id') currentUserId: string,
  ) {
    if (currentUserId !== requestorId) {
      throw new ForbiddenException('You are not logged in as requestor')
    }
    const { newRequestor, newReciever } = await this.userService.friendRequest({
      requestorId,
      recieverId,
    })

    return { message: 'friend request sent', newReciever, newRequestor }
  }

  @Post('/friendConfirm')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Confirming friend request from reciever' })
  async confirmFriend(
    @Body('requestorId') requestorId: string,
    @Body('confirmerId') confirmerId: string,
    @User('id') currentUserId: string,
  ) {
    if (currentUserId !== confirmerId) {
      throw new ForbiddenException('You are not logged in as confirmer')
    }
    const { newRequestor, newConfirmer } = await this.userService.friendConfirm(
      {
        requestorId,
        confirmerId,
      },
    )

    return { message: 'friend request confirmed', newConfirmer, newRequestor }
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
