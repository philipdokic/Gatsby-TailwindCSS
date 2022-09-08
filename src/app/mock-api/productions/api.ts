import { Injectable } from "@angular/core";
import { FuseMockApiService, FuseMockApiUtils } from "@fuse/lib/mock-api";
import { cloneDeep } from "lodash";
import { docs, productions } from "./data";


@Injectable({
    providedIn: "root"
})
export class ProductionsMockApi {

    private _productions: any[]
    private readonly _docs: any[]

    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        this.registerHandlers()
        this._productions = productions.data
        this._docs = docs.data
    }

    registerHandlers(): void {
        this._fuseMockApiService
        .onGet('api/productions')
        .reply( () =>  {
            console.log("API INSPECTIONS REPLY")
            const productions = cloneDeep(this._productions)
            return [200,{productions}]
        })
        
        this._fuseMockApiService
        .onGet('api/productions/:id')
        .reply( (request) =>  {
            const PROD_ID = request.urlParams.id
            // console.log("API INSPECTION REPLY | request:", request.urlParams)
            // console.log("INSPECTIONS DATA", this._productions)
            const production = this._productions.find( production => production.PROD_ID === Number(PROD_ID))
            // if(!production) return [404,{message: "No production found"}]
            const productionWithDocs = {...production, DOCS: this._docs.filter( doc => production.DOCS.find( entry => entry._id === doc._id ))}
           
            return [200,{production: productionWithDocs}]
        
        })
        
        this._fuseMockApiService
        .onPut('api/productions')
        .reply( ({request}) =>  {
            const production = cloneDeep(request.body)
            production.id = FuseMockApiUtils.guid()
            this._productions.unshift(production)
            return [200,{production}]
        })


        this._fuseMockApiService
        .onGet('api/docs')
        .reply(() => {
            console.log("API DOCS REPLY")
            const docs = cloneDeep(this._docs)
            return [200, { docs }]
        })

        this._fuseMockApiService
        .onPost('api/docs')
        .reply(({ request }) => {

            
            const files = request.body.files;
            
            for (let i = 0; i < files.length; i++) {
                let file = files.item(i);
                const _id = FuseMockApiUtils.guid();
                const doc = {
                    name: file.name,
                    type: 'IMAGE',
                    category: "documentation",
                    file: file,
                    "date added": new Date().toDateString(),        
                    _id
                }
                this._docs.push(doc)
            }
          

            const docs = cloneDeep(this._docs)
            return [200, { docs }]
        });

        this._fuseMockApiService
        .onPut('api/productions/docs')
        .reply(({ request }) => {

            const PROD_ID = request.body.PROD_ID
            const files = request.body.files;
            
            for (let i = 0; i < files.length; i++) {
                let file = files.item(i);
                const _id = FuseMockApiUtils.guid();
                const doc = {
                    name: file.name,
                    type: 'IMAGE',
                    category: "documentation",
                    file: file,
                    "date added": new Date().toDateString(),        
                    _id
                }
                this._docs.push(doc)

                console.log("====PRODUCTIONS PROD_ID", PROD_ID )
                this._productions = this._productions.map( p =>  p.PROD_ID === PROD_ID ? {...p, DOCS: [...p.DOCS, {_id}]} : p )

               

                console.log("====PRODUCTIONS AFTER UPLOAD DOCS", this._productions )
            }
          

            const docs = cloneDeep(this._docs)
            const production = this._productions.find( p =>  p.PROD_ID === PROD_ID)
            return [200, { docs, production }]
        });

    }
}
