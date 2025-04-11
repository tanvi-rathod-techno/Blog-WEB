  import {
    ChangePasswordResponse,
    LoginResponse,
    User,
  } from '@/models/user.model'
  import { apiService } from './api.service'
  import {
    SignupRequest,
    LoginRequest,
    ChangePasswordRequest,
  } from '@/validations/auth.validation'
  import {
    mockChangePasswordResponse,
    mockLoginResponse,
    mockUser,
  } from '@/data/mock-response'

  class AuthService {
    private api: typeof apiService
    controller: string = ''

    constructor() {
      this.api = apiService
    }

    async login(body: LoginRequest) {
      // return Promise.resolve(mockLoginResponse as LoginResponse)
      const response = this.api.post<LoginResponse>(`${this.controller}/login`, body)
      return response
    }

    async signup(body: SignupRequest) {
      return Promise.resolve(mockLoginResponse as LoginResponse)
      return this.api.post<LoginResponse>(`${this.controller}/signup`, body)
    }

    async getAccessToken(refreshToken: string | null = null) {
      return {
        token: refreshToken ?? ""
      }
    }

    async getUserInfo(): Promise<User> {
      // return Promise.resolve(mockUser as User)
      return this.api.post<User>(`${this.controller}/profile`)
    }

    async changePassword(body: ChangePasswordRequest) {
      return Promise.resolve(mockChangePasswordResponse as ChangePasswordResponse)
      return this.api.post<ChangePasswordResponse>(
        `${this.controller}/change-password`,
        body
      )
    }
  }

  export const authService = new AuthService()
