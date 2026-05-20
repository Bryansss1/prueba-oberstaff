// Tipos y enumeraciones para el sistema de bingo
import { bingo_victories } from "@prisma/client";

export type VictoryType = keyof typeof bingo_victories;

export type Prize = {
  prize_id: number;
  name: string;
  description?: string;
  image?: string;
  type_of_victory: VictoryType;
};

export type NumbersPlayed = {
  sequence: number[];
  last5: number[];
};

export type WinnerDTO = {
  user_id: number;
  user_email: string;
  user_names: string;
  user_last_names: string;
  user_phone_number?: string;
  user_account_owner_dni?: string;
  user_account_number?: string;
  user_bank_name?: string;
  user_dni?: string;
  prize_id: number;
  prize_name: string;
  prize_description?: string;
  prize_image?: string;
  type_of_victory: VictoryType;
  // Referral data (from BingoCardboards → Codes → referred_code)
  winner_code?: string; // The code string used to create the cardboard
  referred_campaign_ref?: string;
  referred_vip?: string;
  referred_state?: string;
  referred_country_code?: string;
  referred_phone_number?: string;
  referred_master?: string | null;
  referred_city?: string | null;
};

export type BingoState = {
  id: number;
  prizes: Prize[];
  numbersPlayed: NumbersPlayed;
  winners: WinnerDTO[];
  is_started: boolean;
  min_number_of_participants: number; // Mínimo de participantes requeridos
};
