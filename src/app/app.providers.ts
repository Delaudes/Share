import { AddExpenseUseCase } from "../expense/domain/add-expense.use-case";
import { EXPENSE_SERVICE_TOKEN } from "../expense/domain/expense.service";
import { StorageExpenseService } from "../expense/infrastructure/storage-expense.service";
import { LOCAL_STORAGE_SERVICE_TOKEN } from "../local-storage/local-storage.service";
import { RealLocalStorageService } from "../local-storage/real-local-storage.service";
import { AddPayerUseCase } from "../payer/domain/add-payer.use-case";
import { PAYER_SERVICE_TOKEN } from "../payer/domain/payer.service";
import { StoragePayerService } from "../payer/infrastructure/storage-payer.service";
import { CreateRoomUseCase } from "../room/domain/create-room.use-case";
import { GetRoomListUseCase } from "../room/domain/get-room-list.use-case";
import { LoadRoomUseCase } from "../room/domain/load-room.use-case";
import { ROOM_SERVICE_TOKEN } from "../room/domain/room.service";
import { ROOM_STORE_TOKEN } from "../room/domain/room.store";
import { ReactiveRoomStore } from "../room/infrastructure/reactive-room.store";
import { StorageRoomService } from "../room/infrastructure/storage-room.service";
import { AngularRouterService } from "../router/angular-router.service";
import { ROUTER_SERVICE_TOKEN } from "../router/router.service";
import { RealUuidService } from "../uuid/real-uuid-service";
import { UUID_SERVICE_TOKEN } from "../uuid/uuid.service";

export const NAVIGATION_PROVIDERS = [
    {
        provide: ROUTER_SERVICE_TOKEN,
        useClass: AngularRouterService
    },
]

export const LOCAL_STORAGE_PROVIDERS = [
    {
        provide: LOCAL_STORAGE_SERVICE_TOKEN,
        useClass: RealLocalStorageService
    },
]

export const UUID_PROVIDERS = [
    {
        provide: UUID_SERVICE_TOKEN,
        useClass: RealUuidService
    },
]

export const ROOM_PROVIDERS = [
    {
        provide: ROOM_STORE_TOKEN,
        useClass: ReactiveRoomStore
    },

    {
        provide: ROOM_SERVICE_TOKEN,
        useClass: StorageRoomService,
        deps: [LOCAL_STORAGE_SERVICE_TOKEN, UUID_SERVICE_TOKEN]
    },

    {
        provide: CreateRoomUseCase,
        deps: [ROOM_SERVICE_TOKEN]
    },
    {
        provide: LoadRoomUseCase,
        deps: [ROOM_SERVICE_TOKEN, ROOM_STORE_TOKEN]
    },
    {
        provide: GetRoomListUseCase,
        deps: [ROOM_SERVICE_TOKEN]
    },
]

export const PAYER_PROVIDERS = [
    {
        provide: PAYER_SERVICE_TOKEN,
        useClass: StoragePayerService,
        deps: [LOCAL_STORAGE_SERVICE_TOKEN, UUID_SERVICE_TOKEN]
    },
    {
        provide: AddPayerUseCase,
        deps: [PAYER_SERVICE_TOKEN, ROOM_STORE_TOKEN]
    },
]

export const EXPENSE_PROVIDERS = [
    {
        provide: EXPENSE_SERVICE_TOKEN,
        useClass: StorageExpenseService,
        deps: [LOCAL_STORAGE_SERVICE_TOKEN, UUID_SERVICE_TOKEN]
    },
    {
        provide: AddExpenseUseCase,
        deps: [EXPENSE_SERVICE_TOKEN, ROOM_STORE_TOKEN]
    },
]

