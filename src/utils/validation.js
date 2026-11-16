// Client-side validations for forms

export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  return null;
}

export function validateRegistrationForm({ fullName, email, password, confirmPassword }) {
  const errors = {};

  if (!fullName || !fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.trim().length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  }

  if (!email || !email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateItemReport(data) {
  const errors = {};

  if (!data.title || !data.title.trim()) {
    errors.title = 'Item title/name is required.';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  }

  if (!data.category) {
    errors.category = 'Please select a category.';
  }

  if (!data.location || !data.location.trim()) {
    errors.location = 'Location is required (city, venue, or address).';
  }

  if (!data.date) {
    errors.date = 'Date is required.';
  }

  if (!data.description || !data.description.trim()) {
    errors.description = 'Please provide a detailed description.';
  } else if (data.description.trim().length < 15) {
    errors.description = 'Description must be at least 15 characters long to assist identification.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateImageFile(file) {
  if (!file) return null;

  // Max 5MB
  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only JPG, PNG, WEBP, and GIF images are allowed.';
  }

  if (file.size > MAX_SIZE) {
    return 'Image file size must be less than 5MB.';
  }

  return null;
}
