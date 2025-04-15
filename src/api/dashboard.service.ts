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

  // Create blog with optional image URL
  async createBlog(data: { blog_title: string; blog_content: string; image_path?: string }) {
    console.log('data', data)
    return this.api.post<{ message: string }>(`${this.controller}`, data)
  }

  async updateBlog(id: number, data:  { blog_title: string; blog_content: string }) {
    return this.api.put(`${this.controller}/${id}`, data)
  }

  //delete blog
  async deleteBlog(id: number) {
    return this.api.delete<DashboardResponse>(`${this.controller}/${id}`)
  }

  async getAllBlogs(page: number,limit = 12): Promise<DashboardResponse> {
    const response = await this.api.post<DashboardResponse>(`all-blogs`, { page ,limit});
    return response;
  }
  

  async likeBlog(blogId: number): Promise<{ message: string }> {
    return this.api.post(`likes`, { blog_id: blogId })
  }

  async commentBlog(data: { blog_id: string; commnet: string }) {
    return this.api.post(`comments`, data);
  }


  async getCommentBlog(blogId: number): Promise<{ message: string }> {
    return this.api.post(`get-comments`, { blog_id: blogId })
  }


}

export const dashboardService = new DashboardService()
