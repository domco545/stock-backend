import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Stock } from 'src/stock/core/models/stock.model';
import { StockEntity } from './stock.entity';

@Injectable()
export class StockRepository {
  constructor(
    @Inject('STOCK_MODEL')
    private stockDBModel: Model<StockEntity>,
  ) {}

  async addStock(stock: Stock): Promise<Stock> {
    //Convert to Entity
    const createdStock = new this.stockDBModel(stock);
    const stockEntitySaved = await createdStock.save();
    const stockToReturn: Stock = {
      id: stockEntitySaved._id,
      name: stockEntitySaved.name,
      price: stockEntitySaved.price,
      description: stockEntitySaved.description,
    };
    console.log('entiy saved', stockToReturn);
    return stockToReturn;
  }

  async getAllStocks(): Promise<Stock[]> {
    const stocks: Stock[] = await this.stockDBModel.find();
    return stocks;
  }

  async updateStock(stock: Stock): Promise<Stock> {
    const update = {name: stock.name, price: stock.price, description: stock.description}
    const updatedStock = await this.stockDBModel.findByIdAndUpdate(stock.id, update, {new: true});
    return updatedStock;
  }

  async deleteStock(id: string): Promise<Stock>{
    const deleted = await this.stockDBModel.findByIdAndRemove(id);
    return deleted;
  }
}
