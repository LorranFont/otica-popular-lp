import { ApiResponse, AuthResponse, User } from "./types";
import { MOCK_USERS } from "./mock-data";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate network errors occasionally
const shouldSimulateError = () => Math.random() < 0.03; // 3% chance of error

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export class AuthAPI {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  /**
   * Login user
   */
  static async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> {
    await delay(800 + Math.random() * 1200); // 800-2000ms delay (realistic login time)

    if (shouldSimulateError()) {
      throw new Error(
        "Erro de conexão. Verifique sua internet e tente novamente."
      );
    }

    const { email, password } = credentials;

    // Basic validation
    if (!email || !password) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Email e senha são obrigatórios",
      };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Formato de email inválido",
      };
    }

    // Simulate authentication logic
    // In a real app, this would validate against a database
    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Email não encontrado",
      };
    }

    if (!user.isActive) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Conta desativada. Entre em contato com o suporte.",
      };
    }

    // For demo purposes, accept any password for existing users
    // In production, you'd hash and compare passwords
    if (password.length < 6) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Senha deve ter pelo menos 6 caracteres",
      };
    }

    // Generate mock tokens
    const token = `mock_token_${user.id}_${Date.now()}`;
    const refreshToken = `mock_refresh_${user.id}_${Date.now()}`;
    const expiresIn = 3600; // 1 hour

    return {
      data: {
        user,
        token,
        refreshToken,
        expiresIn,
      },
      success: true,
      message: "Login realizado com sucesso!",
    };
  }

  /**
   * Register new user
   */
  static async register(
    userData: RegisterData
  ): Promise<ApiResponse<AuthResponse>> {
    await delay(1000 + Math.random() * 1500); // 1000-2500ms delay (realistic registration time)

    if (shouldSimulateError()) {
      throw new Error("Erro no servidor. Tente novamente mais tarde.");
    }

    const { name, email, phone, password, confirmPassword } = userData;

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Todos os campos são obrigatórios",
      };
    }

    if (password !== confirmPassword) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Senhas não coincidem",
      };
    }

    if (password.length < 6) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Senha deve ter pelo menos 6 caracteres",
      };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Formato de email inválido",
      };
    }

    // Phone format validation (Brazilian format)
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Formato de telefone inválido. Use: (XX) XXXXX-XXXX",
      };
    }

    // Check if email already exists
    const existingUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existingUser) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: "Este email já está cadastrado",
      };
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to mock data (in production, this would save to database)
    MOCK_USERS.push(newUser);

    // Generate mock tokens
    const token = `mock_token_${newUser.id}_${Date.now()}`;
    const refreshToken = `mock_refresh_${newUser.id}_${Date.now()}`;
    const expiresIn = 3600; // 1 hour

    return {
      data: {
        user: newUser,
        token,
        refreshToken,
        expiresIn,
      },
      success: true,
      message: "Conta criada com sucesso!",
    };
  }

  /**
   * Get current user profile
   */
  static async getProfile(token: string): Promise<ApiResponse<User>> {
    await delay(200 + Math.random() * 400); // 200-600ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao carregar perfil do usuário.");
    }

    if (!token || !token.startsWith("mock_token_")) {
      return {
        data: {} as User,
        success: false,
        error: "Token inválido",
      };
    }

    // Extract user ID from mock token
    const tokenParts = token.split("_");
    const userId = tokenParts[2];

    const user = MOCK_USERS.find((u) => u.id === userId);

    if (!user) {
      return {
        data: {} as User,
        success: false,
        error: "Usuário não encontrado",
      };
    }

    if (!user.isActive) {
      return {
        data: {} as User,
        success: false,
        error: "Conta desativada",
      };
    }

    return {
      data: user,
      success: true,
    };
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    token: string,
    updates: Partial<User>
  ): Promise<ApiResponse<User>> {
    await delay(500 + Math.random() * 800); // 500-1300ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao atualizar perfil.");
    }

    if (!token || !token.startsWith("mock_token_")) {
      return {
        data: {} as User,
        success: false,
        error: "Token inválido",
      };
    }

    // Extract user ID from mock token
    const tokenParts = token.split("_");
    const userId = tokenParts[2];

    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return {
        data: {} as User,
        success: false,
        error: "Usuário não encontrado",
      };
    }

    // Update user data
    const updatedUser = {
      ...MOCK_USERS[userIndex],
      ...updates,
      id: MOCK_USERS[userIndex].id, // Prevent ID changes
      updatedAt: new Date().toISOString(),
    };

    MOCK_USERS[userIndex] = updatedUser;

    return {
      data: updatedUser,
      success: true,
      message: "Perfil atualizado com sucesso!",
    };
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(
    refreshToken: string
  ): Promise<ApiResponse<{ token: string; expiresIn: number }>> {
    await delay(300 + Math.random() * 500); // 300-800ms delay

    if (!refreshToken || !refreshToken.startsWith("mock_refresh_")) {
      return {
        data: {} as any,
        success: false,
        error: "Refresh token inválido",
      };
    }

    // Extract user ID from mock refresh token
    const tokenParts = refreshToken.split("_");
    const userId = tokenParts[2];

    const user = MOCK_USERS.find((u) => u.id === userId);

    if (!user || !user.isActive) {
      return {
        data: {} as any,
        success: false,
        error: "Sessão expirada. Faça login novamente.",
      };
    }

    // Generate new token
    const newToken = `mock_token_${userId}_${Date.now()}`;
    const expiresIn = 3600; // 1 hour

    return {
      data: {
        token: newToken,
        expiresIn,
      },
      success: true,
    };
  }

  /**
   * Logout user (invalidate token)
   */
  static async logout(
    token: string
  ): Promise<ApiResponse<{ message: string }>> {
    await delay(200 + Math.random() * 300); // 200-500ms delay

    // In a real app, you'd invalidate the token on the server
    // For this mock, we just simulate the API call

    return {
      data: { message: "Logout realizado com sucesso" },
      success: true,
    };
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(
    email: string
  ): Promise<ApiResponse<{ message: string }>> {
    await delay(800 + Math.random() * 1200); // 800-2000ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao enviar email de recuperação.");
    }

    if (!email) {
      return {
        data: {} as any,
        success: false,
        error: "Email é obrigatório",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        data: {} as any,
        success: false,
        error: "Formato de email inválido",
      };
    }

    // Check if user exists (but don't reveal if email is not found for security)
    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    return {
      data: {
        message:
          "Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.",
      },
      success: true,
    };
  }
}
