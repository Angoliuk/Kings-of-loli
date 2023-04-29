/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createTRPCReact } from '@trpc/react-query';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore TODO: better aliases
import type { AppRouter } from '../../../server/src/modules/routes';

export const trpc = createTRPCReact<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
