/**
 * Get the CSS class for a Codeforces rating
 */
export function getRatingColorClass(rating: number | null | string | undefined): string {
  if (rating === null || rating === undefined || rating === "—") {
    return 'text-gray-500';
  }
  
  const numRating = typeof rating === 'string' ? parseInt(rating) : rating;
  
  if (numRating < 1200) return 'text-gray-500';  // Newbie (gray)
  if (numRating < 1400) return 'text-emerald-500'; // Pupil (green)
  if (numRating < 1600) return 'text-cyan-500';  // Specialist (cyan)
  if (numRating < 1900) return 'text-blue-500';  // Expert (blue)
  if (numRating < 2100) return 'text-violet-500'; // Candidate Master (purple)
  if (numRating < 2400) return 'text-amber-500'; // Master (orange)
  if (numRating < 2600) return 'text-amber-600'; // International Master (orange)
  if (numRating < 3000) return 'text-rose-500';   // Grandmaster (red)
  return 'text-rose-600';                        // International Grandmaster (red)
} 