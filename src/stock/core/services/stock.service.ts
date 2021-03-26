import { Inject, Injectable } from '@nestjs/common';
import { StockRepository } from 'src/stock/infrastructure/mongo/stock.repository';
import { Stock } from '../models/stock.model';


@Injectable()
export class StockService {
    constructor(private stockRepository: StockRepository) {}

    async createStock(stock: Stock): Promise<Stock> {
        if (stock.name.length < 2) {
          throw new Error('Stock name must be more then 2 chars');
        }
        const stockCreated = this.stockRepository.addStock(stock);
        return stockCreated;
      }
}
