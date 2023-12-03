import * as env from 'env-var';

export const transactionConfig = {
	NODE_ENV: env.get('NODE_ENV').required().default('development').example('development').asString(),
};
