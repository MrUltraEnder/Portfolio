#!/usr/bin/env node

/**
 * Itch.io Games Fetcher and HTML Generator
 * 
 * This script fetches published games from the Itch.io API and generates
 * a static HTML page displaying them as featured projects.
 * 
 * Environment Variables:
 * - ITCH_API_KEY: Your Itch.io API key (provided via GitHub Secrets)
 * 
 * Usage:
 * - Development: node scripts/fetch-itch-games.js
 * - Production: Called automatically during GitHub Actions build
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
  } catch (error) {
    console.log('dotenv not available, using system environment variables');
  }
}

/**
 * Fetches data from a URL using native Node.js HTTPS module
 * @param {string} url - The URL to fetch
 * @returns {Promise<object>} - Parsed JSON response
 */
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let data = '';

      // Collect data chunks
      response.on('data', (chunk) => {
        data += chunk;
      });

      // Handle response completion
      response.on('end', () => {
        try {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } else {
            reject(new Error(`HTTP ${response.statusCode}: ${data}`));
          }
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    });

    // Handle request errors
    request.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    // Set timeout
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Generates HTML template for the games page
 * @param {Array} games - Array of game objects from Itch.io API
 * @returns {string} - Complete HTML document
 */
function generateHTML(games) {
  const gameCards = games.map(game => {
    const title = game.title || 'Untitled Game';
    const description = game.short_text || 'No description available.';
    const coverUrl = game.cover_url || '/placeholder.svg?height=300&width=500';
    const gameUrl = game.url || '#';
    
    return `
      <div class="bg-[#232329]/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#232329] group hover:border-[#7EE787]/30 transition-all duration-300">
        <div class="aspect-video overflow-hidden">
          <img 
            src="${coverUrl}" 
            alt="${title} cover"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onerror="this.src='/Portfolio/placeholder.svg?height=300&width=500'"
          />
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-[#F4F4F5] mb-3 group-hover:text-[#7EE787] transition-colors">
            ${title}
          </h3>
          <p class="text-[#F4F4F5]/80 text-sm leading-relaxed mb-4 line-clamp-3">
            ${description}
          </p>
          <div class="flex items-center justify-between">
            <a 
              href="${gameUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 bg-[#7EE787]/10 text-[#7EE787] rounded-lg hover:bg-[#7EE787]/20 transition-colors duration-200 text-sm font-medium"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              Play on Itch.io
            </a>
            <span class="text-xs text-[#F4F4F5]/60 bg-[#232329]/50 px-2 py-1 rounded">
              Game
            </span>
          </div>
        </div>
      </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eric Zaleta - Featured Games from Itch.io</title>
  <meta name="description" content="Explore Eric Zaleta's published games and interactive experiences on Itch.io">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .floating-particles {
      background-image: 
        radial-gradient(2px 2px at 20px 30px, rgba(126, 231, 135, 0.2), transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(169, 112, 255, 0.2), transparent),
        radial-gradient(1px 1px at 90px 40px, rgba(126, 231, 135, 0.3), transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(169, 112, 255, 0.3), transparent);
      background-repeat: repeat;
      background-size: 200px 100px;
      animation: float 20s infinite linear;
    }
    
    @keyframes float {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-200px, -100px); }
    }
  </style>
</head>
<body class="bg-[#0e0e10] text-[#F4F4F5] font-sans">
  <!-- Background effects -->
  <div class="fixed inset-0 opacity-20">
    <div class="absolute inset-0 bg-gradient-to-br from-[#7EE787]/10 via-transparent to-[#A970FF]/10"></div>
    <div class="floating-particles"></div>
  </div>

  <!-- Main content -->
  <div class="relative z-10 min-h-screen">
    <!-- Header -->
    <header class="px-6 py-12">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent">
          Featured Games
        </h1>
        <p class="text-lg md:text-xl text-[#F4F4F5]/80 max-w-2xl mx-auto">
          Explore my published games and interactive experiences on Itch.io
        </p>
      </div>
    </header>

    <!-- Games Grid -->
    <main class="px-6 pb-20">
      <div class="max-w-6xl mx-auto">
        ${games.length > 0 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${gameCards}
          </div>
        ` : `
          <div class="text-center py-20">
            <div class="text-6xl mb-4">🎮</div>
            <h2 class="text-2xl font-bold text-[#F4F4F5] mb-4">No games found</h2>
            <p class="text-[#F4F4F5]/60">Games will appear here once they're published on Itch.io</p>
          </div>
        `}
      </div>
    </main>

    <!-- Footer -->
    <footer class="px-6 py-8 border-t border-[#232329]/30">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-[#F4F4F5]/60 text-sm">
          Games fetched from 
          <a href="https://itch.io" target="_blank" rel="noopener noreferrer" class="text-[#7EE787] hover:underline">
            Itch.io
          </a>
          • Last updated: ${new Date().toLocaleDateString()}
        </p>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

/**
 * Main function to fetch games and generate HTML
 */
async function main() {
  try {
    console.log('🎮 Starting Itch.io games fetcher...');

    // Validate environment variables
    const apiKey = process.env.ITCH_API_KEY;
    if (!apiKey) {
      throw new Error('ITCH_API_KEY environment variable is required');
    }

    console.log('🔑 API key found, fetching games...');

    // Fetch games from Itch.io API
    const apiUrl = `https://itch.io/api/1/${apiKey}/my-games`;
    const response = await fetchData(apiUrl);

    if (!response.games) {
      throw new Error('Invalid API response: missing games array');
    }

    console.log(`📦 Found ${response.games.length} games`);

    // Filter only published games and extract needed data
    const publishedGames = response.games
      .filter(game => game.published && game.published_at)
      .map(game => ({
        title: game.title,
        short_text: game.short_text,
        cover_url: game.cover_url,
        url: game.url,
        published_at: game.published_at
      }))
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at)); // Sort by newest first

    console.log(`✅ Found ${publishedGames.length} published games`);

    // Log game titles for debugging
    publishedGames.forEach((game, index) => {
      console.log(`   ${index + 1}. ${game.title}`);
    });

    // Generate HTML
    const html = generateHTML(publishedGames);

    // Ensure output directory exists
    const outputDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write HTML file
    const outputPath = path.join(outputDir, 'itch-games.html');
    fs.writeFileSync(outputPath, html, 'utf8');

    console.log(`🎉 Successfully generated: ${outputPath}`);
    console.log(`📄 ${publishedGames.length} games rendered in HTML`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Generate fallback HTML with error message in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔧 Generating fallback HTML for development...');
      
      const fallbackHTML = generateHTML([]);
      const outputPath = path.join(process.cwd(), 'public', 'itch-games.html');
      fs.writeFileSync(outputPath, fallbackHTML, 'utf8');
      
      console.log('📄 Fallback HTML generated successfully');
    }
    
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { fetchData, generateHTML, main };
