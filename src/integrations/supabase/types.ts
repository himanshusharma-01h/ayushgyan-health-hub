export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string
          doctor_id: string
          id: string
          notes: string | null
          patient_email: string
          patient_name: string
          reason: string | null
          status: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string
          doctor_id: string
          id?: string
          notes?: string | null
          patient_email: string
          patient_name: string
          reason?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_email?: string
          patient_name?: string
          reason?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_ritual_logs: {
        Row: {
          completed_rituals: string[]
          id: string
          log_date: string
          progress_percent: number
          submitted_at: string
          total_rituals: number
          user_id: string
        }
        Insert: {
          completed_rituals?: string[]
          id?: string
          log_date?: string
          progress_percent?: number
          submitted_at?: string
          total_rituals?: number
          user_id: string
        }
        Update: {
          completed_rituals?: string[]
          id?: string
          log_date?: string
          progress_percent?: number
          submitted_at?: string
          total_rituals?: number
          user_id?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          consultation_fee: number
          created_at: string
          experience_years: number
          id: string
          is_available: boolean | null
          languages: string[] | null
          name: string
          qualifications: string
          specialty: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          consultation_fee?: number
          created_at?: string
          experience_years?: number
          id?: string
          is_available?: boolean | null
          languages?: string[] | null
          name: string
          qualifications: string
          specialty: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          consultation_fee?: number
          created_at?: string
          experience_years?: number
          id?: string
          is_available?: boolean | null
          languages?: string[] | null
          name?: string
          qualifications?: string
          specialty?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          id: string
          rating: number
          review: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          rating: number
          review?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          rating?: number
          review?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      notify_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          price: number
          product_id: string | null
          product_name: string
          quantity: number
        }
        Insert: {
          id?: string
          order_id: string
          price: number
          product_id?: string | null
          product_name: string
          quantity?: number
        }
        Update: {
          id?: string
          order_id?: string
          price?: number
          product_id?: string | null
          product_name?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          payment_id: string | null
          shipping_address: string
          shipping_email: string
          shipping_name: string
          shipping_phone: string | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          payment_id?: string | null
          shipping_address: string
          shipping_email: string
          shipping_name: string
          shipping_phone?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          payment_id?: string | null
          shipping_address?: string
          shipping_email?: string
          shipping_name?: string
          shipping_phone?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      prakriti_results: {
        Row: {
          created_at: string
          id: string
          kapha_score: number
          pitta_score: number
          primary_dosha: string
          user_id: string
          vata_score: number
        }
        Insert: {
          created_at?: string
          id?: string
          kapha_score?: number
          pitta_score?: number
          primary_dosha: string
          user_id: string
          vata_score?: number
        }
        Update: {
          created_at?: string
          id?: string
          kapha_score?: number
          pitta_score?: number
          primary_dosha?: string
          user_id?: string
          vata_score?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          benefits: string[] | null
          category: string
          created_at: string
          description: string
          description_hi: string | null
          dosha_compatibility: string[] | null
          id: string
          image_emoji: string | null
          image_url: string | null
          in_stock: boolean
          is_published: boolean
          name: string
          name_hi: string | null
          original_price: number | null
          price: number
          rating: number | null
          reviews_count: number | null
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          category?: string
          created_at?: string
          description: string
          description_hi?: string | null
          dosha_compatibility?: string[] | null
          id?: string
          image_emoji?: string | null
          image_url?: string | null
          in_stock?: boolean
          is_published?: boolean
          name: string
          name_hi?: string | null
          original_price?: number | null
          price?: number
          rating?: number | null
          reviews_count?: number | null
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          category?: string
          created_at?: string
          description?: string
          description_hi?: string | null
          dosha_compatibility?: string[] | null
          id?: string
          image_emoji?: string | null
          image_url?: string | null
          in_stock?: boolean
          is_published?: boolean
          name?: string
          name_hi?: string | null
          original_price?: number | null
          price?: number
          rating?: number | null
          reviews_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          full_name: string
          gender: string | null
          health_goals: string[] | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          gender?: string | null
          health_goals?: string[] | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          gender?: string | null
          health_goals?: string[] | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      symptom_checks: {
        Row: {
          ai_response: string | null
          created_at: string
          diet_recommendations: string[] | null
          dominant_dosha: string
          herbs_recommended: string[] | null
          id: string
          lifestyle_recommendations: string[] | null
          patient_email: string
          patient_name: string
          symptoms: string[]
        }
        Insert: {
          ai_response?: string | null
          created_at?: string
          diet_recommendations?: string[] | null
          dominant_dosha: string
          herbs_recommended?: string[] | null
          id?: string
          lifestyle_recommendations?: string[] | null
          patient_email: string
          patient_name: string
          symptoms: string[]
        }
        Update: {
          ai_response?: string | null
          created_at?: string
          diet_recommendations?: string[] | null
          dominant_dosha?: string
          herbs_recommended?: string[] | null
          id?: string
          lifestyle_recommendations?: string[] | null
          patient_email?: string
          patient_name?: string
          symptoms?: string[]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vaidya_advice: {
        Row: {
          category: string
          created_at: string
          description: string
          description_hi: string | null
          doctor_avatar: string | null
          doctor_name: string
          id: string
          image_url: string | null
          is_published: boolean
          title: string
          title_hi: string | null
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          description_hi?: string | null
          doctor_avatar?: string | null
          doctor_name: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          title: string
          title_hi?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          description_hi?: string | null
          doctor_avatar?: string | null
          doctor_name?: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          title?: string
          title_hi?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      weight_logs: {
        Row: {
          created_at: string
          id: string
          logged_at: string
          user_id: string
          weight_kg: number
        }
        Insert: {
          created_at?: string
          id?: string
          logged_at?: string
          user_id: string
          weight_kg: number
        }
        Update: {
          created_at?: string
          id?: string
          logged_at?: string
          user_id?: string
          weight_kg?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "doctor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "doctor"],
    },
  },
} as const
