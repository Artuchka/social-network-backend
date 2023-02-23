import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtGuard } from 'src/auth/guards/jwt.guard'
import { Roles } from 'src/auth/decorators/role.decorator'
import { Role } from './role.enum'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { User } from './decorators/user.decorator'
import { UserDetails } from './user-details.interface'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  getSingle(@Param('id') id: string) {
    return this.userService.getSingleById(id)
  }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  getAll(@User('email') username: string) {
    console.log({ username })

    return this.userService.getAll()
  }

  @Delete(':name')
  dropCollection(@Param('name') colName: string) {
    return this.userService.dropDB(colName)
  }
}
