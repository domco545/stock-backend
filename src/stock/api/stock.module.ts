import { Module } from '@nestjs/common';
import { StockService } from '../core/services/stock.service';
import { StockGateway } from './stock.gateway';

@Module({
  providers: [StockService, StockGateway]
})
export class StockModule {}
