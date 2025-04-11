// models/dashboard.model.ts

import { GenericResponse } from './generic'

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  status: string;
  role_id: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface Blog {
  id: number;
  blog_title: string;
  user_id: number;
  blog_tagline: string;
  blog_content: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: User;
  onDelete?: (id: number) => void
}

// Input type for creating a blog
export interface BlogCreateInput {
  blog_title: string;
  blog_content: string;
}


// Single blog response (if needed)
export type BlogResponse = GenericResponse<Blog>

// Multiple blogs response
export type DashboardResponse = GenericResponse<Blog[]>
