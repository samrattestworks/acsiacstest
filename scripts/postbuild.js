import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const routes = ['about', 'team', 'join'];

if (fs.existsSync(distDir)) {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    routes.forEach((route) => {
      const targetDir = path.join(distDir, route);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.copyFileSync(indexHtmlPath, path.join(targetDir, 'index.html'));
    });
    console.log(`[postbuild] Successfully generated static entry points for routes: ${routes.join(', ')}`);
  }
}
