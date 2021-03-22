import { ExcelComponent } from "@core/ExcelComponent";
import { createTemplate } from "./table.template";

export class Table extends ExcelComponent {
    static className = "excel__table"

    // constructor($root) {
    //     super($root, {
    //         name: 'Table',
    //         listeners: ['input']
    //     })
    // }

    toHTML() {
        return createTemplate()
    }
}