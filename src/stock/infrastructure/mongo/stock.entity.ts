import { Document } from 'mongoose';

export interface StockEntity extends Document {
  readonly _id: string;
  readonly __v: number;
  readonly name: string;
  readonly price: number;
  readonly description: string;
}