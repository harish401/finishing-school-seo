import { NextRequest } from 'next/server';
import { REST_GET, REST_POST, REST_PATCH, REST_DELETE, REST_OPTIONS } from '@payloadcms/next/routes';
import config from '@/payload/payload.config';

const getHandler = REST_GET(config);
const postHandler = REST_POST(config);
const patchHandler = REST_PATCH(config);
const deleteHandler = REST_DELETE(config);
const optionsHandler = REST_OPTIONS(config);

type RouteContext = { params: Promise<{ payload: string[] }> };

export const GET = async (request: NextRequest, context: RouteContext) => {
  const { payload } = await context.params;
  return getHandler(request, { params: Promise.resolve({ slug: payload }) } as any);
};

export const POST = async (request: NextRequest, context: RouteContext) => {
  const { payload } = await context.params;
  return postHandler(request, { params: Promise.resolve({ slug: payload }) } as any);
};

export const PATCH = async (request: NextRequest, context: RouteContext) => {
  const { payload } = await context.params;
  return patchHandler(request, { params: Promise.resolve({ slug: payload }) } as any);
};

export const DELETE = async (request: NextRequest, context: RouteContext) => {
  const { payload } = await context.params;
  return deleteHandler(request, { params: Promise.resolve({ slug: payload }) } as any);
};

export const OPTIONS = async (request: NextRequest, context: RouteContext) => {
  const { payload } = await context.params;
  return optionsHandler(request, { params: Promise.resolve({ slug: payload }) } as any);
};
