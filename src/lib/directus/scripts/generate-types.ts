import { generateDirectusTypes } from 'directus-sdk-typegen';
import dotenv from 'dotenv';
dotenv.config();


async function generateTypes() {
    try {
        await generateDirectusTypes({
            outputPath: 'src/lib/directus/types.ts',
            directusUrl: 'http://localhost:8055',
            directusToken: process.env.DIRECTUS_TOKEN,
        });

        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

generateTypes()