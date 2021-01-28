import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseEMailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

export default class HandlebarsMailTemplateProvider
    implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseEMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}
