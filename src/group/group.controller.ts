import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupRequest } from './dto/create.request';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('그룹')
@Controller('group')
export class GroupController {

  constructor(private readonly groupService: GroupService) {}

  @ApiQuery({ name: 'q' })
  @Get()
  queryGroup(@Query('q') q: string) {
    return this.groupService.queryGroup(q);
  }

  @ApiQuery({ name: 'id' })
  @Get('/member')
  queryGroupMember(@Query('id') id: string) {
    return this.groupService.queryGroupMember(id);
  }

  @Post()
  async createGroup(@Body() request: CreateGroupRequest) {
    await this.groupService.createGroup(request);
  }
}
