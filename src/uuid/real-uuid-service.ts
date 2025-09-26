import { v4 as uuidv4 } from 'uuid';
import { UuidService } from "./uuid.service";

export class RealUuidService implements UuidService {
    generate(): string {
        return uuidv4()
    }
}