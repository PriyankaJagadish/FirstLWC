import { LightningElement,api } from 'lwc';

export default class DragAndDropList extends LightningElement {
    @api records
    @api stage

    handleItemDrag(evt){
        const event = new CustomEvent('listitemdrag',{detail:evt.detail});
        this.dispatchEvent(event);
    }

    handleDragOver(event){
        event.preventDefault();
    }

    handleDrop(){
        const event = new CustomEvent('itemdrop',{detail:this.stage});
        this.dispatchEvent(event);
    }
}