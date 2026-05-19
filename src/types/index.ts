export type UserRole = "client" | "nutritionist";
export type SubscriptionTier = "free" | "premium";
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type ContentCategory = "nutrição" | "fitness" | "receitas" | "saúde" | "mindfulness";

export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  role: UserRole;
  subscription_tier: SubscriptionTier;
  stripe_customer_id: string | null;
  bio: string | null;
  specialization: string | null;
  created_at: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface NutritionalInfo {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  video_url: string | null;
  ingredients: Ingredient[];
  instructions: string[];
  nutritional_info: NutritionalInfo;
  prep_time_min: number;
  cook_time_min: number;
  servings: number;
  category: ContentCategory;
  tags: string[];
  author_id: string;
  author?: Pick<Profile, "name" | "avatar_url" | "specialization">;
  is_published: boolean;
  created_at: string;
}

export interface MealPlanDay {
  breakfast: string;
  morning_snack: string;
  lunch: string;
  afternoon_snack: string;
  dinner: string;
  notes: string;
}

export interface MealPlan {
  id: string;
  client_id: string;
  nutritionist_id: string;
  week_start: string;
  plan: Record<string, MealPlanDay>;
  notes: string | null;
  created_at: string;
  nutritionist?: Pick<Profile, "name" | "avatar_url">;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  video_url: string | null;
  author_id: string;
  author?: Pick<Profile, "name" | "avatar_url" | "specialization">;
  category: ContentCategory;
  tags: string[];
  is_published: boolean;
  created_at: string;
  read_time_min: number;
}

export interface Appointment {
  id: string;
  client_id: string;
  nutritionist_id: string;
  scheduled_at: string;
  status: AppointmentStatus;
  daily_room_url: string | null;
  notes: string | null;
  client?: Pick<Profile, "name" | "avatar_url">;
  nutritionist?: Pick<Profile, "name" | "avatar_url" | "specialization">;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  is_read: boolean;
  type: "new_content" | "appointment" | "meal_plan" | "system";
  url: string | null;
  created_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price_brl: number;
  stripe_price_id: string;
  features: string[];
  is_popular: boolean;
}
