import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterService } from "../ports/router.service";

@Injectable({
    providedIn: 'root'
})
export class AngularRouterService implements RouterService {
    constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) { }


    navigate(path: string) {
        this.router.navigateByUrl(path)
    }

    getParamValue(paramName: string): string | undefined {
        const paramValue = this.activatedRoute.firstChild?.snapshot.paramMap.get(paramName)
        return paramValue ?? undefined
    }
}