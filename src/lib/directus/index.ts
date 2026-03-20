import { createDirectus, rest, staticToken } from '@directus/sdk';
import type { Schema } from './types';

const directus = createDirectus<Schema>(import.meta.env.DIRECTUS_URL).with(staticToken(import.meta.env.DIRECTUS_TOKEN)).with(rest());

export default directus;
