import { NewPostDto } from './new-post.dto';
import { UpdateContentDto } from '../../dto/update-content.dto';
declare const UpdatePostDto_base: import("@nestjs/common").Type<Partial<NewPostDto>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
    content: UpdateContentDto;
}
export {};
