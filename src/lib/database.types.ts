export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      states: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          region: string
          image_url: string | null
          population: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          region: string
          image_url?: string | null
          population?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          region?: string
          image_url?: string | null
          population?: number | null
          created_at?: string
        }
      }
      destinations: {
        Row: {
          id: string
          state_id: string | null
          name: string
          slug: string
          description: string | null
          short_description: string | null
          category: string
          image_url: string | null
          location: string | null
          best_time_to_visit: string | null
          average_cost: string | null
          rating: number
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          state_id?: string | null
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          category: string
          image_url?: string | null
          location?: string | null
          best_time_to_visit?: string | null
          average_cost?: string | null
          rating?: number
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          state_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          category?: string
          image_url?: string | null
          location?: string | null
          best_time_to_visit?: string | null
          average_cost?: string | null
          rating?: number
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      attractions: {
        Row: {
          id: string
          destination_id: string | null
          name: string
          description: string | null
          type: string
          location: string | null
          opening_hours: string | null
          entry_fee: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          destination_id?: string | null
          name: string
          description?: string | null
          type: string
          location?: string | null
          opening_hours?: string | null
          entry_fee?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          destination_id?: string | null
          name?: string
          description?: string | null
          type?: string
          location?: string | null
          opening_hours?: string | null
          entry_fee?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          destination_id: string | null
          author_name: string
          rating: number
          title: string | null
          content: string
          visit_date: string | null
          helpful_count: number
          created_at: string
        }
        Insert: {
          id?: string
          destination_id?: string | null
          author_name: string
          rating: number
          title?: string | null
          content: string
          visit_date?: string | null
          helpful_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          destination_id?: string | null
          author_name?: string
          rating?: number
          title?: string | null
          content?: string
          visit_date?: string | null
          helpful_count?: number
          created_at?: string
        }
      }
    }
  }
}
