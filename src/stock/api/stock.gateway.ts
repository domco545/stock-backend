import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Stock } from '../core/models/stock.model';
import { StockService } from '../core/services/stock.service';
import { AllStocksDto } from './dtos/all-stocks.dto';
import { StockDto } from './dtos/stock.dto';

@WebSocketGateway()
export class StockGateway {
  constructor(private stockService: StockService) {}
  @WebSocketServer() server;

  @SubscribeMessage('price-change')
  async handlePriceChange(
    @MessageBody() data: StockDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const stock: Stock = {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
      };

      await this.stockService.updateStock(stock);
      const dto: AllStocksDto = {
        stocks: await this.stockService.getAllStocks(),
      };
      this.server.emit('allStocks', dto);
    } catch (e) {
      client.emit('error', e.message);
    }
  }

  @SubscribeMessage('create-stock')
  async handleCreateStock(
    @MessageBody() data: StockDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const stock: Stock = {
        name: data.name,
        description: data.description,
        price: data.price,
      };

      const stockCreated = await this.stockService.createStock(stock);
      const dto: AllStocksDto = {
        stocks: await this.stockService.getAllStocks(),
      };
      this.server.emit('allStocks', dto);
    } catch (e) {
      client.emit('error', e.message);
    }
  }

  @SubscribeMessage('delete-stock')
  async handleDeleteStock(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const deleted = await this.stockService.deleteStock(id);
      const dto: AllStocksDto = {
        stocks: await this.stockService.getAllStocks(),
      };
      this.server.emit('allStocks', dto);
    } catch (e) {
      client.emit('error', e.message);
    }
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connect', client.id);
    const dto: AllStocksDto = {
      stocks: await this.stockService.getAllStocks(),
    };
    client.emit('allStocks', dto);
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnect', client.id);
  }
}
