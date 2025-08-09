const fs = require('fs');
const path = require('path');

// Ensure content directories exist
const contentDir = path.join(__dirname, '../src/content');
const blogDir = path.join(contentDir, 'blog');
const imagesDir = path.join(contentDir, 'images');

// Create directories if they don't exist
[contentDir, blogDir, imagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create placeholder files for missing content
const contentFiles = [
  'impact.json',
  'how-agave-works.json',
  'faq.json'
];

contentFiles.forEach(filename => {
  const filePath = path.join(contentDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    console.log(`Created placeholder: ${filename}`);
  }
});

// Generate blog manifest from public/content/blog
try {
  const publicBlogDir = path.join(__dirname, '../public/content/blog');
  if (!fs.existsSync(publicBlogDir)) {
    fs.mkdirSync(publicBlogDir, { recursive: true });
  }
  const files = fs
    .readdirSync(publicBlogDir)
    .filter((f) => f.toLowerCase().endsWith('.md'))
    .sort();

  const manifestPath = path.join(publicBlogDir, 'index.json');
  fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2));
  console.log(`Blog manifest generated with ${files.length} posts at: ${manifestPath}`);
} catch (e) {
  console.warn('Failed to generate blog manifest:', e);
}

console.log('Content structure initialized!');
