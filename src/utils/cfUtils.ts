/**
 * Get the CSS class for a Codeforces rating
 */
export function getRatingColorClass(rating: number | null | string | undefined): string {
  if (rating === null || rating === undefined || rating === "—") {
    return 'CF_text-gray';
  }
  const numRating = typeof rating === 'string' ? parseInt(rating) : rating;
  if (numRating < 1200) return 'CF_text-gray';  // Newbie (gray)
  if (numRating < 1400) return 'CF_text-green'; // Pupil (green)
  if (numRating < 1600) return 'CF_text-cyan';  // Specialist (cyan)
  if (numRating < 1900) return 'CF_text-blue';  // Expert (blue)
  if (numRating < 2200) return 'CF_text-violet'; // Candidate Master (purple)
  if (numRating < 2400) return 'CF_text-orange'; // Master or International Master (orange)
  return 'CF_text-red';                        // Grandmaster (red)
}