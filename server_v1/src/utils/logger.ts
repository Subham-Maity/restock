import pinoModule from 'pino';
import dayjs from 'dayjs';

const pino = pinoModule.default;
const log = pino({
    transport: {
        target: 'pino-pretty'
    },
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
