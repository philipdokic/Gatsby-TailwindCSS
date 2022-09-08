import { Injectable } from "@angular/core";
import { FuseMockApiService, FuseMockApiUtils } from "@fuse/lib/mock-api";
import { cloneDeep } from "lodash";
import { data } from "./data";

@Injectable({
    providedIn: "root"
})
export class ProductionsMockApi {

    private readonly _productions: any[]

    constructor(private _fuseMockAPiService: FuseMockApiService)
    {
        this.registerHandlers()
        this._productions = data.data
    }

    registerHandlers(): void {
        this._fuseMockAPiService
        .onGet('api/productions')
        .reply( () =>  {
            console.log("API INSPECTIONS REPLY")
            const productions = cloneDeep(this._productions)
            return [200,{productions}]
        })
        
        this._fuseMockAPiService
        .onGet('api/productions/:id')
        .reply( (request) =>  {
            const PROD_ID = request.urlParams.id
            // console.log("API INSPECTION REPLY | request:", request.urlParams)
            // console.log("INSPECTIONS DATA", this._productions)
            const production = this._productions.find( production => production.PROD_ID === Number(PROD_ID))
            // if(!production) return [404,{message: "No production found"}]

            console.log("INSPECTION FOUND", production)
            
            return [200,{production}]
        
        })
        
        this._fuseMockAPiService
        .onPut('api/productions')
        .reply( ({request}) =>  {
            const production = cloneDeep(request.body)
            production.id = FuseMockApiUtils.guid()
            this._productions.unshift(production)
            return [200,{production}]
        })

    }
}
