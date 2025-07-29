import type { MiddlewareHandler } from "astro";
import { sequence } from "astro/middleware";
import { clerkMiddleware } from "@clerk/astro/server";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import pino from "pino";
import { client } from './client/client.gen';
import * as crootballClient from './client';


const BASE_URL = import.meta.env.API_URL || "http://localhost:3000";
const API_KEY = import.meta.env.CROOTBALL_API_KEY || "aaaa";
const CLERK_SECRET_KEY = import.meta.env.CLERK_SECRET_KEY || "aaaa";
const TEST = false

client.setConfig({
  baseUrl: BASE_URL,
  headers: {
    "crootball-api-key": API_KEY,
  },
});

let clerk = null
if (TEST) {
  //NOP
} else {
  clerk = createClerkClient({ secretKey: CLERK_SECRET_KEY });
}

const loggerMiddleware: MiddlewareHandler = async (context, next) => {
  context.locals.log = pino({});
  return next();
};



const sessionManager: MiddlewareHandler = async (context, next) => {
  const auth = context.locals.auth();
  const { userId } = auth;

  if (!userId) {
    return next(); // No user logged in, continue
  }

  context.locals.userid = userId;
  const crootballClient = context.locals.crootballClient
  context.locals.log.trace("Clerk User: " + userId);

  if (TEST) {
    return next();
  }
  let response = await crootballClient.usersGetByIdentity({ path: { identityId: userId } })
  
  if (response.error) {
    context.locals.log.error("Clerk user not found in crootball: " + userId + " " + JSON.stringify(response.error))
    throw new Error(response.error.message)
    return next();
  }

  const user = {
    id: response.data.id,
    name: response.data.name,
    email: response.data.email,
    role: response.data.role,
    slug: response.data.slug,
    identityId: response.data.identityId,
    configuration: response.data.configuration,
  }

  context.locals.user = user
  return next();

};

const teamManager: MiddlewareHandler = async (context, next) => {
  if (!context.locals.userid) return next()
  const { data: userTeam } = await crootballClient.usersGetOwnedTeams({ path: { id: context.locals.user.id } });
  context.locals.team = userTeam?.team
  return next();
}

const tenantManager: MiddlewareHandler = async (context, next) => {

  const { data: tenant } = await crootballClient.tenantsGetByToken({ body: { token: API_KEY } })

  if(!tenant){
    context.locals.log.error("Tenant not found for token:" + API_KEY)
    throw new Error("Tenant not found for token:" + API_KEY)
  }

  context.locals.tenant = tenant
  
  return next();
};

const crootball: MiddlewareHandler = async (context, next) => {

  try {
    context.locals.crootballClient = crootballClient
    const status = await crootballClient.getApiStatus()

    if(status?.data?.type!= "TENANT") {
      context.locals.log.error("API services configured with base URL:" + BASE_URL);
      context.locals.log.error("Status:" + JSON.stringify(status.data));
      throw new Error("No TENANT key:" + BASE_URL); 
    }

    context.locals.log.trace("API services configured with base URL:" + BASE_URL);
    context.locals.log.trace("Status:" + JSON.stringify(status.data));

  } catch (err) {
    context.locals.log.error("Error configuring API services:" + err);
  }

  return next();
};

const dummySecurity: MiddlewareHandler = async (context, next) => {

  context.locals.log.warn("*** TEST MODE ***");

  const TEST_USER_ID  = 3
  const testUser =  await crootballClient.usersGetById({ path: { id: TEST_USER_ID } })

  const user = {
    id: testUser.data?.id,
    name: testUser.data?.name,
    email: testUser.data?.email,
    role: testUser.data?.role,
    slug: testUser.data?.slug,
    identityId: testUser.data?.identityId,
    configuration: testUser.data?.configuration,
  }

  context.locals.user = user
  context.locals.userId = TEST_USER_ID
  context.locals.auth = () => {
    return {
      userId: TEST_USER_ID,
    }
  }
  return next();

}

export const onRequest = sequence(loggerMiddleware, TEST ? dummySecurity : clerkMiddleware(), crootball, tenantManager, sessionManager, teamManager);