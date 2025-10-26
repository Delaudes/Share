import { v4 as uuidv4 } from 'uuid';
import { UuidService } from "../ports/uuid.service";

export class RealUuidService implements UuidService {
    generate(): string {
        return uuidv4()
    }
}