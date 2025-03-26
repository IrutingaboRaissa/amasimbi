import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = {
  dashboard: {
    hero: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
    learning: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    community: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    discussion: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    schedule: 'https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?w=800&q=80'
  },
  home: {
    hero: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80',
    features: {
      education: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      community: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      resources: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'
    },
    testimonials: {
      student1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      student2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      student3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'
    }
  },
  learn: {
    hero: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80',
    courses: {
      course1: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      course2: 'https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?w=800&q=80',
      course3: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'
    }
  },
  community: {
    hero: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
    discussions: {
      discussion1: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      discussion2: 'https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?w=800&q=80'
    },
    events: {
      event1: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      event2: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'
    }
  }
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
}

async function downloadImages() {
  const baseDir = path.join(__dirname, '../src/assets/images');

  // Create base directories
  const directories = [
    'dashboard',
    'home/features',
    'home/testimonials',
    'learn/courses',
    'community/discussions',
    'community/events'
  ];

  directories.forEach(dir => {
    fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
  });

  // Download images
  for (const [section, urls] of Object.entries(images)) {
    if (typeof urls === 'object') {
      for (const [name, url] of Object.entries(urls)) {
        if (typeof url === 'object') {
          for (const [subName, subUrl] of Object.entries(url)) {
            const filepath = path.join(baseDir, section, name, `${subName}.jpg`);
            console.log(`Downloading ${filepath}...`);
            await downloadImage(subUrl, filepath);
          }
        } else {
          const filepath = path.join(baseDir, section, `${name}.jpg`);
          console.log(`Downloading ${filepath}...`);
          await downloadImage(url, filepath);
        }
      }
    }
  }
}

downloadImages().catch(console.error); 