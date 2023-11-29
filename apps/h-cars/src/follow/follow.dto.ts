import * as mongoose from 'mongoose';

export interface FollowDTO {
  follower: mongoose.Schema.Types.ObjectId;
  following: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}
