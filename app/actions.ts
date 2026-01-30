"use server";

import {
  ApiResponse,
  ExamAppointment,
  NewsletterSubscription,
  ContactMessage,
} from "@/lib/api/types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate network errors occasionally
const shouldSimulateError = () => Math.random() < 0.05; // 5% chance of error

export interface ExamFormData {
  name: string;
  phone: string;
  location: "centro" | "sao-sebastiao";
  preferredDate: string;
  preferredTime: string;
}

export async function scheduleExam(
  formData: FormData
): Promise<ApiResponse<ExamAppointment>> {
  // Extract form data
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;
  const preferredDate = formData.get("preferredDate") as string;
  const preferredTime = formData.get("preferredTime") as string;

  // Validate required fields
  if (!name || !phone || !location) {
    return {
      data: {} as ExamAppointment,
      success: false,
      error: "Por favor, preencha todos os campos obrigatórios.",
    };
  }

  // Validate phone format (basic validation)
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return {
      data: {} as ExamAppointment,
      success: false,
      error: "Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX.",
    };
  }

  try {
    // Simulate API call delay
    await delay(1000 + Math.random() * 1500); // 1-2.5s delay

    if (shouldSimulateError()) {
      throw new Error("Erro de conexão com o servidor");
    }

    // Map location to store ID
    const storeId = location === "centro" ? "1" : "2";

    // Create exam appointment
    const appointment: ExamAppointment = {
      id: `exam_${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      storeId,
      preferredDate,
      preferredTime,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Send WhatsApp message
    // 4. Integrate with calendar system
    // 5. Notify store staff

    console.log("Exam scheduled:", appointment);

    return {
      data: appointment,
      success: true,
      message:
        "Agendamento realizado com sucesso! Entraremos em contato via WhatsApp para confirmar.",
    };
  } catch (error) {
    console.error("Error scheduling exam:", error);
    return {
      data: {} as ExamAppointment,
      success: false,
      error: "Erro interno do servidor. Tente novamente mais tarde.",
    };
  }
}

export async function subscribeNewsletter(
  formData: FormData
): Promise<ApiResponse<NewsletterSubscription>> {
  const email = formData.get("email") as string;

  if (!email) {
    return {
      data: {} as NewsletterSubscription,
      success: false,
      error: "Por favor, insira um email válido.",
    };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      data: {} as NewsletterSubscription,
      success: false,
      error: "Por favor, insira um email válido.",
    };
  }

  try {
    // Simulate API call
    await delay(500 + Math.random() * 1000); // 0.5-1.5s delay

    if (shouldSimulateError()) {
      throw new Error("Erro de conexão");
    }

    const subscription: NewsletterSubscription = {
      id: `newsletter_${Date.now()}`,
      email: email.toLowerCase().trim(),
      isActive: true,
      subscribedAt: new Date().toISOString(),
    };

    console.log("Newsletter subscription:", subscription);

    // In a real app, this would:
    // 1. Check if email already exists
    // 2. Save to database
    // 3. Send welcome email
    // 4. Add to email marketing platform

    return {
      data: subscription,
      success: true,
      message:
        "Inscrição realizada com sucesso! Você receberá nossas novidades.",
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return {
      data: {} as NewsletterSubscription,
      success: false,
      error: "Erro interno do servidor. Tente novamente mais tarde.",
    };
  }
}

export async function contactForm(
  formData: FormData
): Promise<ApiResponse<ContactMessage>> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Validate required fields
  if (!name || !email || !message) {
    return {
      data: {} as ContactMessage,
      success: false,
      error: "Por favor, preencha todos os campos obrigatórios.",
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      data: {} as ContactMessage,
      success: false,
      error: "Por favor, insira um email válido.",
    };
  }

  try {
    // Simulate API call
    await delay(800 + Math.random() * 1200); // 0.8-2s delay

    if (shouldSimulateError()) {
      throw new Error("Erro de conexão");
    }

    const contactMessage: ContactMessage = {
      id: `contact_${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      subject: subject?.trim() || "Contato via site",
      message: message.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("Contact form submission:", contactMessage);

    // In a real app, this would:
    // 1. Save to database
    // 2. Send notification to support team
    // 3. Send confirmation email to user
    // 4. Create support ticket

    return {
      data: contactMessage,
      success: true,
      message: "Mensagem enviada com sucesso! Retornaremos em breve.",
    };
  } catch (error) {
    console.error("Error sending contact form:", error);
    return {
      data: {} as ContactMessage,
      success: false,
      error: "Erro interno do servidor. Tente novamente mais tarde.",
    };
  }
}
