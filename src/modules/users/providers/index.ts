import { container } from 'tsyringe';
import IHashProvider from './HashProvider/models/IhashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
