import 'reflect-metadata';
import { container } from 'tsyringe';
import { registerServerDependencies } from './server.registry';

// Register dependencies
registerServerDependencies(container);

export const serverContainer = container;
