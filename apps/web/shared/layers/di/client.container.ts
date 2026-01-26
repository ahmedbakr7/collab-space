import 'reflect-metadata';
import { container } from 'tsyringe';
import { registerClientDependencies } from './client.registry';

// Register dependencies
registerClientDependencies(container);

export const clientContainer = container;
