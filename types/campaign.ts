export interface Campaign {
  id: number;
  name: string;
  short_description: string;
  image_url: string;
  goal_amount: number;
  current_amount: number;
  backer_count: number;
  user_id: number;
  slug: string;
  perks?: [string];
  user?: User;
  Images?: [string];
}

export interface User {
  name: string;
  image_url: string;
}

export interface CampaignCreate {
  name: string;
  short_description: string;
  description: string;
  perks: string;
  goal_amount: number;
}
