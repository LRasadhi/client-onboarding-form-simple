import { OnboardingFormData } from '@/models/onboardingSchema';

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const submitOnboarding = async (formData: OnboardingFormData): Promise<ApiResponse> => {
  const endpoint = process.env.NEXT_PUBLIC_ONBOARD_URL;
  
  if (!endpoint) {
    throw new ApiError(0, 'API endpoint not configured');
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new ApiError(response.status, `Server error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      message: 'Form submitted successfully!',
      data
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors
    throw new ApiError(0, 'Network error: Unable to submit form. Please check your connection.');
  }
};