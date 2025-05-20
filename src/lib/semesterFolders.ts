// src/lib/semesterFolders.ts
// Maps semester values to Google Drive folder links (or IDs)
// You can update this file to add/remove semesters and their folder links

export const semesterFolderLinks: Record<string, string> = {
  '1-2': 'https://drive.google.com/drive/folders/1jCzxTC1axLzLZ15IXWUA6RVZmGjBlv2H',
  '3': 'https://drive.google.com/drive/folders/11eVfs8JHSO3y6MRd1rZooWtBW_sZplY1',
  '4': 'https://drive.google.com/drive/folders/PASTE_S4_FOLDER_ID_HERE',
  // Add more as needed
};

// Helper to extract folder ID from a Google Drive folder link
export function extractDriveFolderId(link: string): string | null {
  const match = link.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}
