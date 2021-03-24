import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class StockGateway {
  @SubscribeMessage('stocks')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
