import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Stock } from '../core/models/stock.model';
import { StockService } from '../core/services/stock.service';
import { CreateStockDto } from './dtos/create-stock.dto';

@WebSocketGateway()
export class StockGateway {
  constructor(private stockService: StockService) {}

  @SubscribeMessage('price-change')
  async handlePriceChange(
    @MessageBody() typing: boolean,
    @ConnectedSocket() client: Socket): Promise<string> {
    return 'Hello world!';
  }

  @SubscribeMessage('create-stock')
  async handleCreateStock(
    @MessageBody() data: CreateStockDto,
    @ConnectedSocket() client: Socket,
  ) {
    const stock: Stock = {
      name: data.name,
      description: data.description,
      price: data.price,
    };
    try {
      const stockCreated = await this.stockService.createStock(stock);
      client.emit('stock-created-success', stockCreated);
    } catch (e) {
      client.emit('stock-created-error', e.message);
    }
  }
}
