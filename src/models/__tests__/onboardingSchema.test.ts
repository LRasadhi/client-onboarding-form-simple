import { onboardingSchema } from '../onboardingSchema';

describe('onboardingSchema', () => {
  const validData = {
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    companyName: 'Analytical Engines Ltd',
    services: ['UI/UX', 'Web Dev'],
    budgetUsd: 50000,
    projectStartDate: '2025-09-01',
    acceptTerms: true
  };

  it('should validate correct data', () => {
    const result = onboardingSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('fullName validation', () => {
    it('should reject empty full name', () => {
      const result = onboardingSchema.safeParse({
        ...validData,
        fullName: ''
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Full name is required');
      }
    });

    it('should reject full name with invalid characters', () => {
      const result = onboardingSchema.safeParse({
        ...validData,
        fullName: 'Ada123'
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Full name can only contain letters, spaces, apostrophes, and hyphens'
        );
      }
    });

    it('should accept full name with valid characters', () => {
      const result = onboardingSchema.safeParse({
        ...validData,
        fullName: "Mary O'Connor-Smith"
      });
      expect(result.success).toBe(true);
    });
  });

  describe('email validation', () => {
    it('should reject invalid email format', () => {
      const result = onboardingSchema.safeParse({
        ...validData,
        email: 'invalid-email'
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter a valid email address');
      }
    });
  });

  describe('services validation', () => {
    it('should reject empty services array', () => {
      const result = onboardingSchema.safeParse({
        ...validData,
        services: []
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select at least one service');
      }
    });

    it('should reject invalid service options', () => {
      const result = onboardingSchema.safeParse({
        ...validData,
        services: ['Invalid Service']
      });
      expect(result.success).toBe(false);
    });
  });

  describe('budgetUsd validation', () => {
    it('should accept undefined budget', () => {
      const { budgetUsd, ...dataWithoutBudget } = validData;
      const result = onboardingSchema.safeParse(dataWithoutBudget);
      expect(result.success).toBe(true);
    });

    it('should reject budget below minimum', () => {
      const result = onboardingSchema.safeParse({
        ...validData,
        budgetUsd: 50
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Budget must be at least $100');
      }
    });

    it('should reject budget above maximum', () => {
      const result = onboardingSchema.safeParse({
        ...validData,
        budgetUsd: 2000000
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Budget must be no more than $1,000,000');
      }
    });
  });

  describe('projectStartDate validation', () => {
    it('should reject past dates', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const result = onboardingSchema.safeParse({
        ...validData,
        projectStartDate: yesterday.toISOString().split('T')[0]
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Project start date must be today or later');
      }
    });

    it('should accept today\'s date', () => {
      const today = new Date().toISOString().split('T')[0];
      const result = onboardingSchema.safeParse({
        ...validData,
        projectStartDate: today
      });
      expect(result.success).toBe(true);
    });
  });

  describe('acceptTerms validation', () => {
    it('should reject false acceptTerms', () => {
      const result = onboardingSchema.safeParse({
        ...validData,
        acceptTerms: false
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('You must accept the terms and conditions');
      }
    });
  });
});