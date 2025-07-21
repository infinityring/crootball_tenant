/// <reference path="../.astro/types.d.ts" />
/// <reference types="@clerk/astro/env" />

interface ImportMetaEnv {
    readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
	readonly CLERK_SECRET_KEY: string;
	readonly CROOTBALL_API_KEY: string;
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

