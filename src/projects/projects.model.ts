import * as mongoose from 'mongoose';

export const Projectschema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: false },
  status: { type: String, required: true },
  uid: { type: String, required: false }
});

export enum EStatus {
  active = 'ACTIVE',
  inProgress = 'IN_PROGRESS',
  finished = 'FINISHED'
}

export interface IProject {
  id: string;
  description: string;
  name: string;
  amount?: number;
  status: EStatus;
  uid?: string;
}
