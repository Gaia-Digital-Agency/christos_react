import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Blogs } from './collections/Blogs'
import { Gallery } from './collections/Gallery'
import { Sessions } from './collections/Sessions'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // Collections
  collections: [
    Users,
    Media,
    Posts,
    Categories,
    Blogs,
    Gallery,
    Sessions,
  ],

  globals: [
    Homepage,
  ],

  // Rich text editor
  editor: lexicalEditor(),

  // Database adapter
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),

  // Secret for JWT
  secret: process.env.PAYLOAD_SECRET || '',

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(dirname, '../types/payload-types.ts'),
  },

  // Sharp for image optimization
  sharp,

  // Plugins
  plugins: [
    // Add plugins here
  ],

  // CORS configuration
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.NEXT_PUBLIC_SERVER_URL || '',
  ].filter(Boolean),

  // CSRF protection
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.NEXT_PUBLIC_SERVER_URL || '',
  ].filter(Boolean),
})
