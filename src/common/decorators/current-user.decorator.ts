import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom parameter decorator.
 *
 * Extracts the `user` object attached to the request by the
 * AuthGuard so handlers can receive it directly:
 *   getProfile(@CurrentUser() user: User) { ... }
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
