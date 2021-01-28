import IEmailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IEmailProvider {
    private messages: ISendMailDTO[] = [];

    async sendMail(message: ISendMailDTO): Promise<void> {
        this.messages.push(message);
    }
}
