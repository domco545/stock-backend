import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Stock } from "src/stock/core/models/stock.model";
import { StockEntity } from "./stock.entity";

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
}