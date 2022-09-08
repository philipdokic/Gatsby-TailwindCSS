import { Injectable } from "@angular/core";
import { FuseMockApiService, FuseMockApiUtils } from "@fuse/lib/mock-api";
import { cloneDeep } from "lodash";
import { data } from "./data";

@Injectable({
    providedIn: "root"
})
export class DocsMockApi {

    private readonly _docs: any[]

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers()
        this._docs = data.data
    }

    registerHandlers(): void {
        this._fuseMockApiService
            .onGet('api/docs')
            .reply(() => {
                console.log("API DOCS REPLY")
                const docs = cloneDeep(this._docs)
                return [200, { docs }]
            })

        // this._fuseMockApiService
        // .onGet('api/docs/:id')
        // .reply( (request) =>  {
        //     const PROD_ID = request.urlParams.id
        //     // console.log("API INSPECTION REPLY | request:", request.urlParams)
        //     // console.log("INSPECTIONS DATA", this._docs)
        //     const doc = this._docs.find( doc => doc.PROD_ID === Number(PROD_ID))
        //     // if(!doc) return [404,{message: "No doc found"}]

        //     console.log("INSPECTION FOUND", doc)

        //     return [200,{doc}]

        // })

        // this._fuseMockApiService
        // .onPut('api/docs')
        // .reply( ({request}) =>  {
        //     const doc = cloneDeep(request.body)
        //     doc.id = FuseMockApiUtils.guid()
        //     this._docs.unshift(doc)
        //     return [200,{doc}]
        // })

        // -----------------------------------------------------------------------------------------------------
        // @ Docs - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/docs')
            .reply(({ request }) => {

                
                const files = request.body.files;
                
                for (let i = 0; i < files.length; i++) {
                    let file = files.item(i);
                    console.log(file.name);
                    const doc = {
                        name: file.name,
                        type: 'IMAGE',
                        category: "documentation",
                        file: file,
                        "Date added": new Date().toDateString(),        
                    }
                    this._docs.push(doc)
                }

                // // Add an id
                // note.id = FuseMockApiUtils.guid();

                // // Push the note
                // this._notes.push(note);

                const docs = cloneDeep(this._docs)
                return [200, { docs }]
            });

    }
}
