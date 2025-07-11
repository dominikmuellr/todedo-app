// Date Parsing & Formatting
export function parseDateInput(dateString) {
  const parts = dateString.split('/');
  if (parts.length === 3) {
    return new Date(parts[2], parseInt(parts[1]) - 1, parseInt(parts[0]));
  }
  return null;
}

export function formatDate(date) {
  if (!date) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Date Status & Display Logic
export function formatDateDisplay(date) {
  if (!date) return '';
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
  
  return formatDate(date);
}

export function isOverdue(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function isDueSoon(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return date.getTime() === today.getTime() || date.getTime() === tomorrow.getTime();
}

export function getDateDisplayInfo(date) {
  if (!date) return { text: '', className: '' };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let className = 'bg-surface-variant text-on-surface-variant';
  let text = formatDateDisplay(date);
  
  if (diffDays < 0) className = 'bg-error-container text-on-error-container';
  else if (diffDays === 0) className = 'bg-warning-container text-on-warning-container';
  else if (diffDays === 1) className = 'bg-primary-container text-on-primary-container';
  
  return { text, className };
} 