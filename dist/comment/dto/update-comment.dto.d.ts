import { NewCommentDto } from './new-comment.dto';
import { UpdateContentDto } from '../../dto/update-content.dto';
declare const UpdateCommentDto_base: import("@nestjs/common").Type<Partial<Omit<NewCommentDto, "sourceType" | "source" | "reply">>>;
export declare class UpdateCommentDto extends UpdateCommentDto_base {
    content: UpdateContentDto;
}
export {};
