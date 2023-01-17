import { env } from 'process'

class Config {
    readonly MONGO_CONN_STRING = env.MONGO_CONN_STRING || 'mongodb://127.0.0.1:27017/iwow_test_task'

    readonly SESSION_SECRET = env.SESSION_SECRET || 'SESSION_SECRET';
    readonly JWT_SECRET = env.JWT_SECRET || 'JWT_SECRET';

    readonly RUN_CLIENT_DAY_BEFORE_NOTIFIER = env.RUN_CLIENT_DAY_BEFORE_NOTIFIER || '0 8 * * *';
    readonly RUN_CLIENT_2HOURS_BEFORE_NOTIFIER = env.RUN_CLIENT_2HOURS_BEFORE_NOTIFIER || '*/20 6-15 * * *';
}

export const config = new Config()