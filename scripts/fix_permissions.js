#!/usr/bin/env node

/**
 * Script to fix permissions on build environment
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔧 Fixing build permissions...');

try {
  // Fix permissions for Astro binary
  const astroBinPath = path.join(process.cwd(), 'node_modules/.bin/astro');
  
  if (fs.existsSync(astroBinPath)) {
    // Add execute permissions to the Astro binary
    execSync(`chmod +x "${astroBinPath}"`, { stdio: 'inherit' });
    console.log('✅ Added execute permissions to Astro binary');
  } else {
    console.log('⚠️ Astro binary not found at', astroBinPath);
  }
  
  // Fix permissions for all binaries in node_modules/.bin
  execSync('chmod -R +x node_modules/.bin/', { stdio: 'inherit' });
  console.log('✅ Added execute permissions to all binaries in node_modules/.bin/');
  
} catch (error) {
  console.error('❌ Error fixing permissions:', error);
  // Don't fail the build
  process.exit(0);
} 