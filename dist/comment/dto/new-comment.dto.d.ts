import { NewContentDto } from '../../dto/new-content.dto';
import { SourceType } from '../source-type.enum';
export declare class NewCommentDto {
    reply: string;
    source: string;
    sourceType: SourceType;
    content: NewContentDto;
}
export declare class AdditionalPostInfo {
}
