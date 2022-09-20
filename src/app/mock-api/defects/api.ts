import { Injectable } from "@angular/core";
import { FuseMockApiService, FuseMockApiUtils } from "@fuse/lib/mock-api";
import { assign, cloneDeep } from "lodash";
import { defects } from "./data";
import { tags as tagsData, media as mediaData } from 'app/mock-api/defects/data';

@Injectable({
    providedIn: "root"
})
export class DefectsMockApi {

    private readonly _defects: any[]
    private _tags: any[] = tagsData;
    private _media: any[] = mediaData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers()
        this._defects = defects.defects
    }

    registerHandlers(): void {

        this._fuseMockApiService
        .onGet('api/defects/media')
        .reply(() =>{ 
            
            return [
            200,
            cloneDeep(this._media)
        ]});

         // -----------------------------------------------------------------------------------------------------
        // @ Tags - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/defects/tags')
            .reply(() =>{ 
                console.log("+++++API: TAGS:", this._tags)
                return [
                200,
                cloneDeep(this._tags)
            ]});

        this._fuseMockApiService
            .onGet('api/defects')
            .reply(() => {
                const defects = cloneDeep(this._defects)
                return [200, { defects }]
            })

        this._fuseMockApiService
            .onGet('api/defects/:id')
            .reply((request) => {
                const { id } = request.urlParams
                console.log("API: ID", id)
                const defects = cloneDeep(this._defects)
                console.log("API: DEFECTS", defects)
                const defect = defects.find(de => de.QCRID_LINENUM === id)
                return [200, { defect }]
            })

        this._fuseMockApiService
            .onPut('api/defects')
            .reply(({ request }) => {
                const defect = cloneDeep(request.body)
                defect.id = FuseMockApiUtils.guid()
                this._defects.unshift(defect)
                return [200, { defect }]
            })

       

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/defects/tag')
            .reply(({ request }) => {

                // Get the tag
                const newTag = cloneDeep(request.body.tag);

                // Generate a new GUID
                newTag.id = FuseMockApiUtils.guid();

                // Unshift the new tag
                this._tags.unshift(newTag);

                return [
                    200,
                    newTag
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/defects/tag')
            .reply(({ request }) => {

                // Get the id and tag
                const id = request.body.id;
                const tag = cloneDeep(request.body.tag);

                // Prepare the updated tag
                let updatedTag = null;

                // Find the tag and update it
                this._tags.forEach((item, index, tags) => {

                    if (item.id === id) {
                        // Update the tag
                        tags[index] = assign({}, tags[index], tag);

                        // Store the updated tag
                        updatedTag = tags[index];
                    }
                });

                return [
                    200,
                    updatedTag
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tag - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/defects/tag')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the tag and delete it
                const index = this._tags.findIndex(item => item.id === id);
                this._tags.splice(index, 1);

                // Get the tasks that have the tag
                // const tasksWithTag = this._tasks.filter(task => task.tags.indexOf(id) > -1);

                // Iterate through them and remove the tag
                // tasksWithTag.forEach((task) => {
                //     task.tags.splice(task.tags.indexOf(id), 1);
                // });

                return [
                    200,
                    true
                ];
            });



    }
}
