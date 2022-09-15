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
        .onGet('api/defects/:id')
        .reply( (request) =>  {
            const {id} = request.urlParams
            console.log("API: ID", id)
            const defects = cloneDeep(this._defects)
            console.log("API: DEFECTS", defects)
            const defect = defects.find( de => de.QCRID_LINENUM === id)
            return [200, {defect}]
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
