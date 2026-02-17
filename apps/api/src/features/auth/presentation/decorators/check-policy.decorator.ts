import { SetMetadata } from '@nestjs/common';
import { ResourceType } from '../guards/resource-type.enum';

export const POLICY_RESOURCE = 'POLICY_RESOURCE';
export const POLICY_PARAM_KEY = 'POLICY_PARAM_KEY';

/**
 * Marks a route handler with policy metadata so `PolicyGuard` knows
 * which resource type to verify and which route param holds the ID.
 *
 * @example
 * ```ts
 * @CheckPolicy(ResourceType.TASK, 'id')
 * @Get(':id')
 * getTask(@Param('id') id: string) { … }
 * ```
 */
export const CheckPolicy = (resource: ResourceType, paramKey: string) => {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    SetMetadata(POLICY_RESOURCE, resource)(target, propertyKey, descriptor);
    SetMetadata(POLICY_PARAM_KEY, paramKey)(target, propertyKey, descriptor);
    return descriptor;
  };
};
