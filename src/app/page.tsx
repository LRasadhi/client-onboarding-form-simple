'use client';

import { useOnboardingForm } from '@/controllers/useOnboardingForm';
import { SERVICES_OPTIONS } from '@/models/onboardingSchema';

export default function OnboardingPage() {
  const {
    form,
    isSubmitting,
    submitSuccess,
    submitError,
    submittedData,
    onSubmit,
    resetForm,
  } = useOnboardingForm();

  const { register, formState: { errors }, watch } = form;
  
  // Watch all form values to ensure they display
  const watchedValues = watch();

  if (submitSuccess && submittedData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Form Submitted Successfully!</h2>
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Submission Summary:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Name:</strong> {submittedData.fullName}</li>
                <li><strong>Email:</strong> {submittedData.email}</li>
                <li><strong>Company:</strong> {submittedData.companyName}</li>
                <li><strong>Services:</strong> {submittedData.services.join(', ')}</li>
                {submittedData.budgetUsd && (
                  <li><strong>Budget:</strong> ${submittedData.budgetUsd.toLocaleString()}</li>
                )}
                <li><strong>Start Date:</strong> {submittedData.projectStartDate}</li>
              </ul>
            </div>
            <button
              onClick={resetForm}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Another Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Onboarding</h1>
          <p className="text-gray-600 mt-2">Let's get your project started!</p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <div className="flex">
              <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <strong>Error:</strong> {submitError}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              id="companyName"
              type="text"
              {...register('companyName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="Enter your company name"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>

          {/* Services */}
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-3">
                Services Interested In *
              </legend>
              <div className="space-y-2">
                {SERVICES_OPTIONS.map((service) => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      value={service}
                      {...register('services')}
                      className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {errors.services && (
              <p className="mt-1 text-sm text-red-600">{errors.services.message}</p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budgetUsd" className="block text-sm font-medium text-gray-700 mb-1">
              Budget (USD)
            </label>
            <input
              id="budgetUsd"
              type="number"
              min="100"
              max="1000000"
              {...register('budgetUsd', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="e.g., 50000"
            />
            {errors.budgetUsd && (
              <p className="mt-1 text-sm text-red-600">{errors.budgetUsd.message}</p>
            )}
          </div>

          {/* Project Start Date */}
          <div>
            <label htmlFor="projectStartDate" className="block text-sm font-medium text-gray-700 mb-1">
              Project Start Date *
            </label>
            <input
              id="projectStartDate"
              type="date"
              {...register('projectStartDate')}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            />
            {errors.projectStartDate && (
              <p className="mt-1 text-sm text-red-600">{errors.projectStartDate.message}</p>
            )}
          </div>

          {/* Accept Terms */}
          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                {...register('acceptTerms')}
                className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-1"
              />
              <span className="text-sm text-gray-700">
                I accept the terms and conditions *
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </form>
      </div>
    </div>
  );
}