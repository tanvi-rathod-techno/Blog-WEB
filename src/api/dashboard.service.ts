// services/dashboard.service.ts
import { apiService } from './api.service'
import { DashboardResponse } from '@/models/dashboard.model'


class DashboardService {
  private api: typeof apiService
  controller: string = 'blogs'

  constructor() {
    this.api = apiService
  }

  //get all blogs
  async getBlogs(): Promise<DashboardResponse> {
    const response = await this.api.get<DashboardResponse>(`${this.controller}`)
    return response
  }

  // Create blog
  async createBlog(data: { blog_title: string; blog_content: string }) {
    return this.api.post<{ message: string }>(`${this.controller}`, data)
  }

  async updateBlog(id: number, data:  { blog_title: string; blog_content: string }) {
    return this.api.put(`${this.controller}/${id}`, data)
  }

  //delete blog
  async deleteBlog(id: number) {
    return this.api.delete<DashboardResponse>(`${this.controller}/${id}`)
  }

  async getAllBlogs(page: number): Promise<DashboardResponse> {
    const response = await this.api.post<DashboardResponse>(`all-blogs`, { page });
    return response;
  }
  

  async likeBlog(blogId: number): Promise<{ message: string }> {
    return this.api.post(`likes`, { blog_id: blogId })
  }
}

export const dashboardService = new DashboardService()
