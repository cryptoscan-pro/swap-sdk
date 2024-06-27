export const getIsSolAddress = (address: string): boolean =>
	address.toLowerCase() === 'so11111111111111111111111111111111111111112' || address.toLowerCase() === 'sol'
