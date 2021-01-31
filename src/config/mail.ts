interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        email: string;
        name: string;
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        email: 'goBarber@soscidade.com',
        name: 'Go Barber Contato',
    },
} as IMailConfig;
