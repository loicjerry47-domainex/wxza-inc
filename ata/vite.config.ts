import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Figma/Make generates imports with versioned module IDs like
// "@radix-ui/react-slot@1.1.2" or "lucide-react@0.487.0". This plugin
// rewrites them to the canonical package name so rollup can resolve them.
function stripVersionedImports(): Plugin {
  return {
    name: 'strip-versioned-imports',
    enforce: 'pre',
    resolveId(id) {
      // Match patterns like "pkg@1.2.3" or "@scope/pkg@1.2.3"
      // (but not absolute paths, relative paths, or URLs)
      if (id.startsWith('.') || id.startsWith('/') || id.includes('://')) return null;
      const m = id.match(/^(@[^/]+\/[^@]+|[^@][^@]*)@\d[\w.\-]*(\/.*)?$/);
      if (!m) return null;
      const rewritten = m[1] + (m[2] || '');
      return this.resolve(rewritten, undefined, { skipSelf: true });
    },
  };
}

function figmaAssetResolver(): Plugin {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');
        return path.resolve(__dirname, 'src/assets', filename);
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const geminiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';

  return {
    plugins: [stripVersionedImports(), react(), tailwindcss(), figmaAssetResolver()],
    define: {
      'process.env.API_KEY': JSON.stringify(geminiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            ayi: ['@google/genai', 'mammoth', 'xlsx'],
          },
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
  };
});
