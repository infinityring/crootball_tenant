/// <reference path="../.astro/types.d.ts" />
/// <reference types="@clerk/astro/env" />

interface ImportMetaEnv {
	readonly BASE_URL: string;

	readonly PROTOCOL: string;
	readonly HOST: string;
	readonly PORT: string;

    readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
	readonly CLERK_SECRET_KEY: string;

	readonly API_URL: string;
	readonly CROOTBALL_API_KEY: string;

	readonly CONTENT_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
  }


declare namespace App {
	interface Locals {
		log : any;
		userid : string | null;
		user : any;
		team : any;
		apikey : string | null;
		crootballClient : typeof import('./client');
		error : any;
		tenant : any;
	}
}

