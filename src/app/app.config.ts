import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { LOCAL_STORAGE_SERVICE_TOKEN } from '../local-storage/local-storage.service';
import { RealLocalStorageService } from '../local-storage/real-local-storage.service';
import { CreateRoomUseCase } from '../room/domain/create-room.use-case';
import { GetRoomListUseCase } from '../room/domain/get-room-list.use-case';
import { LoadRoomUseCase } from '../room/domain/load-room.use-case';
import { ROOM_SERVICE_TOKEN } from '../room/domain/room.service';
import { ROOM_STORE_TOKEN } from '../room/domain/room.store';
import { ReactiveRoomStore } from '../room/infrastructure/reactive-room.store';
import { StorageRoomService } from '../room/infrastructure/storage-room.service';
import { AngularRouterService } from '../router/angular-router.service';
import { ROUTER_SERVICE_TOKEN } from '../router/router.service';
import { RealUuidService } from '../uuid/real-uuid-service';
import { UUID_SERVICE_TOKEN } from '../uuid/uuid.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    {
      provide: ROUTER_SERVICE_TOKEN,
      useClass: AngularRouterService
    },
    {
      provide: ROOM_STORE_TOKEN,
      useClass: ReactiveRoomStore
    },
    {
      provide: LOCAL_STORAGE_SERVICE_TOKEN,
      useClass: RealLocalStorageService
    },
    {
      provide: UUID_SERVICE_TOKEN,
      useClass: RealUuidService
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
};
