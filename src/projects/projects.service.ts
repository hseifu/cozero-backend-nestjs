import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from './projects.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private readonly productModel: Model<IProject>
  ) {}

  async addProduct(
    name: string,
    description: string,
    amount: number,
    status: string
  ) {
    const newProduct = new this.productModel({
      description,
      name,
      amount,
      status
    });
    const result = await newProduct.save();
    return result.id;
  }

  async getAllProjects() {
    const projects = await this.productModel.find().exec();
    return projects.map((prod) => ({
      id: prod.id,
      name: prod.name,
      description: prod.description,
      amount: prod.amount,
      status: prod.status
    }));
  }

  async getProduct(prodId: IProject['id']): Promise<IProject> {
    const prod = await this.findProduct(prodId);
    return prod;
  }

  async updateProduct(
    prodId: IProject['id'],
    name: IProject['name'],
    description: IProject['description'],
    amount: IProject['amount'],
    status: IProject['status']
  ) {
    const updates: Partial<IProject> = {};
    if (name) {
      updates.name = name;
    }
    if (description) {
      updates.description = description;
    }
    if (amount) {
      updates.amount = amount;
    }
    if (status) {
      updates.status = status;
    }
    await this.productModel.updateOne({ id: prodId }, updates).exec();
    return;
  }

  async removeProduct(id: IProject['id']) {
    await this.productModel.deleteOne({ id }).exec();
  }

  private async findProduct(prodId: IProject['id']): Promise<IProject> {
    const project = await this.productModel.findById(prodId).exec();
    if (!project) {
      throw new NotFoundException('No project found');
    }
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      amount: project.amount,
      status: project.status
    };
  }
}
