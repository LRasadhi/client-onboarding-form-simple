import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { onboardingSchema, OnboardingFormData, SERVICES_OPTIONS } from '@/models/onboardingSchema';
import { submitOnboarding, ApiError } from '@/services/onboardingApi';

export const useOnboardingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<OnboardingFormData | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      services: [],
      budgetUsd: undefined,
      projectStartDate: '',
      acceptTerms: false,
    },
  });

  // Pre-fill form from query params (bonus feature)
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && SERVICES_OPTIONS.includes(serviceParam as any)) {
      form.setValue('services', [serviceParam as any]);
    }
  }, [searchParams, form]);

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await submitOnboarding(data);
      setSubmittedData(data);
      setSubmitSuccess(true);
      form.reset(); // Clear form on success
    } catch (error) {
      if (error instanceof ApiError) {
        setSubmitError(error.message);
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setSubmitSuccess(false);
    setSubmitError(null);
    setSubmittedData(null);
  };

  return {
    form,
    isSubmitting,
    submitSuccess,
    submitError,
    submittedData,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm,
  };
};