/**
 * Module dependencies.
 */
// @ts-ignore
import {asValue, createContainer, InjectionMode} from 'awilix';

import {transactionConfig,} from './config';
//import PubSub from '../shared/functions/pubsub';

/**
 * Create awilix proxy container for dependency injection
 */
const container = createContainer({
	injectionMode: InjectionMode.PROXY,
});

/**
 * dependency injection register values
 */
container.register({
	transaction: asValue(transactionConfig),
});

export default container;
