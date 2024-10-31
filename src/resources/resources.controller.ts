import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddRatingDto } from './dto/adding-rating.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesService } from './resources.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('resources')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) {}

  @Post()
  create(@Body() createResourceDto: CreateResourceDto, @Request() req) {
    return this.resourceService.create(createResourceDto, req.user.id);
  }

  @Get()
  findAll(@Query() query) {
    return this.resourceService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
    @Request() req,
  ) {
    return this.resourceService.update(id, updateResourceDto, req.user.id);
  }

  @Post(':id/ratings')
  addRating(
    @Param('id') id: string,
    @Body() addRatingDto: AddRatingDto,
    @Request() req,
  ) {
    return this.resourceService.addRating(id, addRatingDto, req.user.id);
  }

  @Post(':id/collaborators/:collaboratorId')
  addCollaborator(
    @Param('id') id: string,
    @Param('collaboratorId') collaboratorId: string,
    @Request() req,
  ) {
    return this.resourceService.addCollaborator(id, collaboratorId, req.user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.resourceService.delete(id, req.user.id);
  }
}
