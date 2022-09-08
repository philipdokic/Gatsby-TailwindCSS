/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    // {
    //     id   : 'example',
    //     title: 'Example',
    //     type : 'basic',
    //     icon : 'heroicons_outline:chart-pie',
    //     link : '/example'
    // },
    {
        id   : 'defects',
        title: 'Defects',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/defects'
    },
    {
        id   : 'productions',
        title: 'Productions',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/productions'
    } 
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'lm-wind-power',
        title   : 'LM Wind Power',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'productions',
                title: 'Productions',
                type : 'basic',
                icon : 'heroicons_solid:collection',
                link : '/productions'
            }
        ]
    } 
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
