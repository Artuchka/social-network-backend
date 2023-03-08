import { UserDetails } from '../user-details.interface';
export declare const User: (...dataOrPipes: (keyof UserDetails | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
