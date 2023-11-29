import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow } from './follow';

@Injectable()
export class FollowService {
  constructor(@InjectModel('Follow') private followModel: Model<Follow>) {}

  async follow(followerId: string, followingId: string) {
    const follow = new this.followModel({
      follower: followerId,
      following: followingId,
    });
    return follow.save();
  }

  async getFollowers(userId: string) {
    return this.followModel
      .find({ following: userId })
      .populate('follower')
      .exec();
  }
}
