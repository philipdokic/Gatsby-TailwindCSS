import { Injectable } from "@angular/core";
import { FuseMockApiService, FuseMockApiUtils } from "@fuse/lib/mock-api";
import { Doc } from "app/modules/admin/production/production.types";
import { cloneDeep } from "lodash";
import { docs, productions } from "./data";


@Injectable({
    providedIn: "root"
})
export class ProductionsMockApi {

    private _productions: any[]
    private _docs: any[]

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers()
        this._productions = productions.data
        this._docs = docs.data
    }

    registerHandlers(): void {
        this._fuseMockApiService
            .onGet('api/productions')
            .reply(() => {
                console.log("API INSPECTIONS REPLY")
                const productions = cloneDeep(this._productions)
                return [200, { productions }]
            })

        this._fuseMockApiService
            .onGet('api/productions/:id')
            .reply((request) => {
                const PROD_ID = request.urlParams.id
                // console.log("API INSPECTION REPLY | request:", request.urlParams)
                // console.log("INSPECTIONS DATA", this._productions)
                const production = this._productions.find(production => production.PROD_ID === Number(PROD_ID))
                // if(!production) return [404,{message: "No production found"}]
                const productionWithDocs = { ...production, _docs: this._docs.filter(doc => production._docs.find(entry => entry._id === doc._id)) }

                return [200, { production: productionWithDocs }]

            })

        this._fuseMockApiService
            .onPut('api/productions')
            .reply(({ request }) => {
                const production = cloneDeep(request.body)
                production.id = FuseMockApiUtils.guid()
                this._productions.unshift(production)
                return [200, { production }]
            })


        this._fuseMockApiService
            .onGet('api/docs')
            .reply(() => {
                console.log("API _docs REPLY")
                const docs = cloneDeep(this._docs)
                return [200, { docs }]
            })

        this._fuseMockApiService
            .onGet('api/docs/:_id')
            .reply((request) => {
                const {_id} = request.urlParams
                console.log("API DOC")
                const doc = this._docs.find( d => d._id === _id)
                return [200, { doc }]
            })

        this._fuseMockApiService
            .onPost('api/docs')
            .reply(({ request }) => {


                const files = request.body.files;

                for (let i = 0; i < files.length; i++) {
                    let file = files.item(i);
                    const doc = this.createNewFile(file)
                    this._docs.push(doc)
                }


                const docs = cloneDeep(this._docs)
                return [200, { docs }]
            });

        this._fuseMockApiService
            .onDelete('api/docs/:_id')
            .reply((request) => {
                const { _id } = request.urlParams
                console.log("API _docs DEELTE", _id)
                this._docs = this._docs.filter(doc => doc._id !== _id)
                return [200, { files: this._docs }]
            })

        this._fuseMockApiService
            .onPut('api/upload/productions/docs')
            .reply(({ request }) => {

                const PROD_ID = request.body.PROD_ID
                const files = request.body.files;

                for (let i = 0; i < files.length; i++) {
                    let file = files.item(i);
                    const doc = this.createNewFile(file)
                    this._docs.push(doc)

                    console.log("====PRODUCTIONS PROD_ID", PROD_ID)
                    this._productions = this._productions.map(p => p.PROD_ID === PROD_ID ? { ...p, _docs: [...p._docs, { _id: doc._id }] } : p)



                    console.log("====PRODUCTIONS AFTER UPLOAD _docs", this._productions)
                }


                const docs = cloneDeep(this._docs)
                const production = this.selectProductionById(PROD_ID)
                const dd = this.selectProductionDocs(production)
                const productionWithDocs = { ...production, _docs: dd }

                return [200, { docs, production: productionWithDocs }]
            });

        this._fuseMockApiService
            .onPatch('api/productions/docs')
            .reply(({ request }) => {
                const { PROD_ID, DOC_ID } = request.body

                console.log("API: ON REMOVE DOC FROM PRODUCTION", { PROD_ID, DOC_ID })

                let production = this.selectProductionById(PROD_ID)
                //@ts-ignore
                const productionDocsIds = production._docs.filter(entry => entry._id !== DOC_ID)
                //@ts-ignore
                production = { ...production, _docs: productionDocsIds }
                this._productions = this._productions.map(pr => pr.PROD_ID === PROD_ID ? production : pr)
                const productionDocs = this.selectProductionDocs({ _docs: productionDocsIds })
                const productionResponse = { ...production, _docs: productionDocs }


                console.log("API: ON REMOVE DOC FROM PRODUCTION: RESPONSE", productionDocsIds)

                return [200, { production: productionResponse }]
            })


        this._fuseMockApiService
            .onPut('api/productions/docs')
            .reply(({ request }) => {
                const { PROD_ID, DOC_ID } = request.body

                console.log("API: ON ADD FILE TO PRODUCTION", { PROD_ID, DOC_ID })

                let production = cloneDeep(this.selectProductionById(parseInt(PROD_ID)))

                //@ts-ignore

                //@ts-ignore
                production = { ...production, _docs: [...production._docs, { _id: DOC_ID }] }

                this._productions = cloneDeep(this._productions.map(pr => pr.PROD_ID === parseInt(PROD_ID) ? production : pr))
                const productionDocs = this.selectProductionDocs(production)
                const productionResponse = { ...production, _docs: productionDocs }


                //@ts-ignore
                console.log("API: ON ADD FILE TO PRODUCTION", this._productions)

                return [200, { production: productionResponse }]
            })

    }

    selectProductionDocs(production): any[] {
        return this._docs.filter(doc => production._docs.find(entry => entry._id === doc._id))
    }
    selectProductionById(PROD_ID: number): any[] {
        return this._productions.find(p => p.PROD_ID === PROD_ID)
    }

    filename(str: string) {
        const ext = str.split("").reverse().join("").split(".")[0].split("").reverse().join("")
        const name = str.split(`.${ext}`)[0]
        return { name, ext }
    }

    createNewFile(file: File): Doc {
        const _id = FuseMockApiUtils.guid();
        const doc = {
            name: this.filename(file.name).name,
            type: this.filename(file.name).ext,
            category: "documentation",
            _file: file,
            "date added": new Date(),
            _id,
            lastModifiedDate: new Date().toDateString(),
            _pages: [
                {
                    "fileIndex": "file_10471994286022102",
                    "url": "https://storage.googleapis.com/spector-upload-bucket/media%2Ffile_10471994286022102"
                  },
                  {
                    "fileIndex": "file_8043483370303715",
                    "url": "https://storage.googleapis.com/spector-upload-bucket/media%2Ffile_8043483370303715"
                  },       
                  {
                    "fileIndex": "file_36573788401498897",
                    "url": "https://storage.googleapis.com/spector-upload-bucket/media%2Ffile_36573788401498897"
                  },
                  {
                    "fileIndex": "file_9560411812133804",
                    "url": "https://storage.googleapis.com/spector-upload-bucket/media%2Ffile_9560411812133804"
                  },       
                  {
                    "fileIndex": "file_3900007343867782",
                    "url": "https://storage.googleapis.com/spector-upload-bucket/media%2Ffile_3900007343867782"
                  },
                  {
                    "fileIndex": "file_04175991604973439",
                    "url": "https://storage.googleapis.com/spector-upload-bucket/media%2Ffile_04175991604973439"
                  }       
            ]
        }
        return doc
    }
}
