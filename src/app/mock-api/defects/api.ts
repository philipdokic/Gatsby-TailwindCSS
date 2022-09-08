import { Injectable } from "@angular/core";
import { FuseMockApiService, FuseMockApiUtils } from "@fuse/lib/mock-api";
import { cloneDeep } from "lodash";
import { defects } from "./data";

@Injectable({
    providedIn: "root"
})
export class DefectsMockApi {

    private readonly _defects: any[]

    constructor(private _fuseMockAPiService: FuseMockApiService)
    {
        this.registerHandlers()
        this._defects = defects.defects
    }

    registerHandlers(): void {
        this._fuseMockAPiService
        .onGet('api/defects')
        .reply( () =>  {
            const defects = cloneDeep(this._defects)
            return [200,{defects}]
        })
        
        this._fuseMockAPiService
        .onPut('api/defects')
        .reply( ({request}) =>  {
            const defect = cloneDeep(request.body)
            defect.id = FuseMockApiUtils.guid()
            this._defects.unshift(defect)
            return [200,{defect}]
        })

    }
}
