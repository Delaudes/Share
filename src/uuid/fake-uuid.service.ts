import { UuidService } from "./uuid.service";

export class FakeUuidService implements UuidService {
    uuid = 'uuid-001'

    generate(): string {
        return this.uuid
    }

}