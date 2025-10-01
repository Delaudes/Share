import { RouterService } from "./router.service";

export class FakeRouterService implements RouterService {
    path?: string
    paramName?: string

    paramValue = 'room-001'

    navigate(path: string) {
        this.path = path
    }

    getParamValue(paramName: string): string | undefined {
        this.paramName = paramName

        return this.paramValue
    }
}