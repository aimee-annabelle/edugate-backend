import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddRatingDto } from './dto/adding-rating.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource, ResourceDocument } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>,
  ) {}

  async create(
    createResourceDto: CreateResourceDto,
    userId: string,
  ): Promise<Resource> {
    const createdResource = new this.resourceModel({
      ...createResourceDto,
      creator: userId,
    });
    return createdResource.save();
  }

  async findAll(query: any = {}): Promise<Resource[]> {
    return this.resourceModel
      .find({ isActive: true, ...query })
      .populate('creator', 'name email')
      .exec();
  }

  async findOne(id: string): Promise<Resource> {
    const resource = await this.resourceModel
      .findById(id)
      .populate('creator', 'name email')
      .exec();

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    // Increment views
    await this.resourceModel
      .findByIdAndUpdate(id, { $inc: { views: 1 } })
      .exec();

    return resource;
  }

  async update(
    id: string,
    updateResourceDto: UpdateResourceDto,
    userId: string,
  ): Promise<Resource> {
    const resource = await this.resourceModel.findById(id);

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    if (resource.creator.toString() !== userId) {
      throw new Error('Unauthorized to update this resource');
    }

    return this.resourceModel
      .findByIdAndUpdate(id, { $set: updateResourceDto }, { new: true })
      .exec();
  }

  async addRating(
    id: string,
    addRatingDto: AddRatingDto,
    userId: string,
  ): Promise<Resource> {
    const resource = await this.resourceModel.findById(id);

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    // Remove existing rating by this user if it exists
    resource.ratings = resource.ratings.filter(
      (rating) => rating.user.toString() !== userId,
    );

    // Add new rating
    resource.ratings.push({
      user: userId,
      rating: addRatingDto.rating,
      comment: addRatingDto.comment,
      createdAt: new Date(),
    });

    return resource.save();
  }

  async addCollaborator(
    id: string,
    collaboratorId: string,
    userId: string,
  ): Promise<Resource> {
    const resource = await this.resourceModel.findById(id);

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    if (resource.creator.toString() !== userId) {
      throw new Error('Unauthorized to add collaborators');
    }

    if (!resource.collaborators.includes(collaboratorId)) {
      resource.collaborators.push(collaboratorId);
      return resource.save();
    }

    return resource;
  }

  async delete(id: string, userId: string): Promise<Resource> {
    const resource = await this.resourceModel.findById(id);

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    if (resource.creator.toString() !== userId) {
      throw new Error('Unauthorized to delete this resource');
    }

    // Soft delete
    return this.resourceModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
  }
}
