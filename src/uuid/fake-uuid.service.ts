import { UuidService } from "./uuid.service";

export class FakeUuidService implements UuidService {
    uuid = 'room-001'

    generate(): string {
        return this.uuid
    }

}