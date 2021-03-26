import { Module } from '@nestjs/common';
import { StockService } from '../core/services/stock.service';
import { MongoModule } from '../infrastructure/mongo/mongo.module';
import { stocksProviders } from '../infrastructure/mongo/stock.providers';
import { StockRepository } from '../infrastructure/mongo/stock.repository';
import { StockGateway } from './stock.gateway';


@Module({
  providers: [StockService, StockGateway, StockRepository, ...stocksProviders],
  imports: [MongoModule],
})
export class StockModule {}
