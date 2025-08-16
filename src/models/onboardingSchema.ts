import { z } from 'zod';

// Define the available services
export const SERVICES_OPTIONS = [
  'UI/UX',
  'Branding', 
  'Web Dev',
  'Mobile App'
] as const;

// Create the Zod schema for form validation
export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name must be no more than 80 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, apostrophes, and hyphens'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be no more than 100 characters'),
  
  services: z
    .array(z.enum(SERVICES_OPTIONS))
    .min(1, 'Please select at least one service'),
  
  budgetUsd: z
    .number()
    .int('Budget must be a whole number')
    .min(100, 'Budget must be at least $100')
    .max(1000000, 'Budget must be no more than $1,000,000')
    .optional(),
  
  projectStartDate: z
    .string()
    .min(1, 'Project start date is required')
    .refine((dateStr) => {
      const inputDate = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day
      return inputDate >= today;
    }, 'Project start date must be today or later'),
  
  acceptTerms: z
    .boolean()
    .refine(val => val === true, 'You must accept the terms and conditions')
});

// TypeScript type derived from the schema
export type OnboardingFormData = z.infer<typeof onboardingSchema>;