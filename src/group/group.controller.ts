import { Body, Controller, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupRequest } from './dto/create.request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('그룹')
@Controller('group')
export class GroupController {

  constructor(private readonly groupService: GroupService) {}

  @Post()
  async createGroup(@Body() request: CreateGroupRequest) {
    await this.groupService.createGroup(request);
  }
}
