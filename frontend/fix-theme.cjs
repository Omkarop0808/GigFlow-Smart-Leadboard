const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content
      // Layout & Background replacements
      .replace(/bg-black\/80/g, 'bg-background/80')
      .replace(/bg-black\/60/g, 'bg-card/60')
      .replace(/bg-black\/40/g, 'bg-card/40')
      .replace(/bg-black\/70/g, 'bg-card/70')
      .replace(/bg-black\/20/g, 'bg-foreground/20')
      .replace(/bg-black/g, 'bg-background')
      .replace(/text-white/g, 'text-foreground')
      .replace(/text-zinc-400/g, 'text-muted')
      .replace(/text-zinc-300/g, 'text-muted')
      .replace(/text-black/g, 'text-background')
      
      // Border replacements
      .replace(/border-white\/10/g, 'border-card-border')
      .replace(/border-white\/20/g, 'border-card-border/50')
      .replace(/border-white\/5/g, 'border-card-border')

      // White opacity backgrounds
      .replace(/bg-white\/5/g, 'bg-foreground/5')
      .replace(/bg-white\/10/g, 'bg-foreground/10')
      .replace(/bg-white\/20/g, 'bg-foreground/20')
      .replace(/bg-white/g, 'bg-foreground')
      
      // Specific component fixes
      .replace(/text-foreground hover:bg-destructive\/90/g, 'text-white hover:bg-destructive/90');

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed theme in', filePath);
    }
  }
});
