import { Stock } from "src/stock/core/models/stock.model";

export interface GetAllStocksDto{
    stocks: Stock[];
}