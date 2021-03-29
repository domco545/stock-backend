import { Inject, Injectable } from '@nestjs/common';
import { AllStocksDto } from 'src/stock/api/dtos/all-stocks.dto';
import { StockRepository } from 'src/stock/infrastructure/mongo/stock.repository';
import { Stock } from '../models/stock.model';

@Injectable()
export class StockService {
  constructor(private stockRepository: StockRepository) {}

  async createStock(stock: Stock): Promise<Stock> {
    const stockCreated = await this.stockRepository.addStock(stock);
    return stockCreated;
  }

  async getAllStocks(): Promise<Stock[]> {
    const stocks = await this.stockRepository.getAllStocks();
    return stocks;
  }

  async updateStock(stock: Stock): Promise<Stock> {
    const updatedStock = await this.stockRepository.updateStock(stock);
    return updatedStock;
  }

  async deleteStock(id: string): Promise<Stock>{
    const deleted = await this.stockRepository.deleteStock(id);
    return deleted;
  }

  async ChangePrice(id: string, newPrice: number): Promise<Stock> {
    const stock = await this.stockRepository.ChangePrice(id, newPrice);
    return stock;
  }
}
