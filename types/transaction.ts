export interface CreateTransaction {
  amount: number;
  campaign_id: number;
}

export interface PaymentTransaction {
  id: number;
  campaign_id: number;
  amount: number;
  status: string;
  code: string;
  payment_url: string;
}

export interface Transaction {
  id: number;
  amount: number;
  status: string;
  created_at: string;
  campaign: Campaign;
}

export interface Campaign {
  name: string;
  image_url: string;
}
