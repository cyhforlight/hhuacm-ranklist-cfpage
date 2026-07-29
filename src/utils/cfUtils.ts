/**
 * Get the CSS class for a Codeforces rating
 */
export function getRatingColorClass(rating: number | null | undefined): string {
  if (rating === null || rating === undefined) return 'CF_text-gray';

  if (rating < 1200) return 'CF_text-gray';  // Newbie (gray)
  if (rating < 1400) return 'CF_text-green'; // Pupil (green)
  if (rating < 1600) return 'CF_text-cyan';  // Specialist (cyan)
  if (rating < 1900) return 'CF_text-blue';  // Expert (blue)
  if (rating < 2200) return 'CF_text-violet'; // Candidate Master (purple)
  if (rating < 2400) return 'CF_text-orange'; // Master or International Master (orange)
  return 'CF_text-red';                       // Grandmaster (red)
}
