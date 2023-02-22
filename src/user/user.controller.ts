import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtGuard } from 'src/auth/guards/jwt.guard'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  getSingle(@Param('id') id: string) {
    return this.userService.getSingleById(id)
  }

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.userService.getAll()
  }

  @Delete(':name')
  dropCollection(@Param('name') colName: string) {
    return this.userService.dropDB(colName)
  }
}
