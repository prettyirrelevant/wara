export type Advert = {
  price: number;
  token: string;
  adType: 0 | 1;
  merchant: string;
  quantity: number;
  validUntil: number;
  adTypeText: "Buy" | "Sell";
  adTypeDisplay: "Buy" | "Sell" | "Sold Out";
};
