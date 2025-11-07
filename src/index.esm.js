export default class StockPortfolioPlugin {
	constructor() {
		this.stockData = [
			{
				symbol:"AAPL",
				quantity: 25,
				price: 150.45,
				purchaseDate: '2025-10-17',
			}
		];
	}

	async listMyStocks() {
		return `You have **${this.stockData.length}** positions in your portfolio.

${this.stockData.map(stock => `- **${stock.symbol}** - ${stock.price * stock.quantity}`).join('\n')}`;
	}

	async buyStock({ symbol, quantity }) {
		const price = Math.random() * 100;
		const total = price * quantity;

		this.stockData.push({
			symbol,
			quantity,
			price,
			purchaseDate: new Date().toISOString(),
		});

		return `You have bought **${total}** USD of **${symbol}** shares.`
	}

	async sellStock({ symbol }) {
		const soldShares = this.stockData
			.filter(stock => stock.symbol === symbol);

		const total = soldShares
			.map(stock => stock.price * stock.quantity)
			.reduce((sum, cur) => sum + cur, 0);

		this.stockData = this.stockData
			.filter(stock => stock.symbol !== symbol);

		return `You have sold **${total}** USD of **${symbol}** shares`;
	}


	// args is an object!
	async toolCall(toolName, args) {
		if (toolName in this) {
			return this[toolName](args);
		}

		throw new Error('This tool is not available in **Stock Portfolio Plugin**')
	}
}