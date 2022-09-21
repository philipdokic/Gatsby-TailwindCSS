import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { Defect, DefectDTO, DefectsList, Media, Tag } from './defects.types';

@Injectable({
    providedIn: 'root'
})
export class DefectsService {
    // Private
    private _defects: BehaviorSubject<any> = new BehaviorSubject(null);
    private _defect: BehaviorSubject<any> = new BehaviorSubject(null);
    private _tags: BehaviorSubject<Tag[] | null> = new BehaviorSubject(null);
    private _photos: BehaviorSubject<Media[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for defects
     */
    get defects(): Observable<any> {
        return this._defects.asObservable();
    }
    get defect$(): Observable<any> {
        return this._defect.asObservable();
    }
    get tags$(): Observable<any> {
        return this._tags.asObservable();
    }
    get photos$(): Observable<any> {
        return this._photos.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get defects
     */
    getDefects(): Observable<any> {

        console.log("DEFECT SERVICE WORKS")
        return this._httpClient.get<DefectsList>('api/defects').pipe(
            tap((response: DefectsList) => {
                console.log("§ DEFECTS RESPONSE", response)
                this._defects.next(response);
            })
        );
    }
    getDefect(id?: string): Observable<DefectDTO> {

        console.log("DEFECT SERVICE WORKS ID", id)
        return this._httpClient.get<DefectDTO>(`api/defects/${id}`).pipe(
            tap((response: DefectDTO) => {
                console.log("RESPONSE", response)
                this._defect.next(response);
            })
        );
    }


    getPhotos(): Observable<Media[]> {
        return this._httpClient.get<Media[]>('api/defects/media').pipe(
            tap((response: any) => {
                console.log("-------------- PHOTOS", response)
                this._photos.next(response);
            })
        );
    }
    getTags(): Observable<Tag[]> {
        console.log("-------------- DEFECT SERVICE | GET TAGS")
        return this._httpClient.get<Tag[]>('api/defects/tags').pipe(
            tap((response: any) => {
                console.log("-------------- TAGS", response)
                this._tags.next(response);
            })
        );
    }

    /**
     * Crate tag
     *
     * @param tag
     */
    createTag(tag: Tag): Observable<Tag> {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.post<Tag>('api/defects/tag', { tag }).pipe(
                map((newTag) => {

                    // Update the tags with the new tag
                    this._tags.next([...tags, newTag]);

                    // Return new tag from observable
                    return newTag;
                })
            ))
        );
    }

    /**
     * Update the tag
     *
     * @param id
     * @param tag
     */
    updateTag(id: string, tag: Tag): Observable<Tag> {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.patch<Tag>('api/defects/tag', {
                id,
                tag
            }).pipe(
                map((updatedTag) => {

                    // Find the index of the updated tag
                    const index = tags.findIndex(item => item.id === id);

                    // Update the tag
                    tags[index] = updatedTag;

                    // Update the tags
                    this._tags.next(tags);

                    // Return the updated tag
                    return updatedTag;
                })
            ))
        );
    }

    /**
     * Delete the tag
     *
     * @param id
     */
    deleteTag(id: string): Observable<boolean> {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.delete('api/defects/tag', { params: { id } }).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted tag
                    const index = tags.findIndex(item => item.id === id);

                    // Delete the tag
                    tags.splice(index, 1);

                    // Update the tags
                    this._tags.next(tags);

                    // Return the deleted status
                    return isDeleted;
                }),
                // filter(isDeleted => isDeleted),
                // switchMap(isDeleted => this.tasks$.pipe(
                //     take(1),
                //     map((tasks) => {

                //         // Iterate through the tasks
                //         tasks.forEach((task) => {

                //             const tagIndex = task.tags.findIndex(tag => tag === id);

                //             // If the task has a tag, remove it
                //             if ( tagIndex > -1 )
                //             {
                //                 task.tags.splice(tagIndex, 1);
                //             }
                //         });

                //         // Return the deleted status
                //         return isDeleted;
                //     })
            ))
            // ))
        );
    }
}
