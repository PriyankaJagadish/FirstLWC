import { LightningElement } from 'lwc';
import lightningDataTable from 'lightning/datatable';
import progressRing from './progressRing.html';
import ratingPick from './ratingPicklist.html';
import ratingPicklistSpan from './ratingPicklistSpan.html';


export default class DataTableCustomColumn extends lightningDataTable {

    static customTypes = {
        progRing:{
            template: progressRing
        },

        ratingPicklist:{
            template: ratingPicklistSpan,
            editTemplate: ratingPick,
            standardCellLayout: true,
            typeAttributes:['label','options','value']
        }
    };
}