import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from './entities/resource.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Resource.name, schema: ResourceSchema }]),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
