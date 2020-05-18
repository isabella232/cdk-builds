/**
 * @fileoverview added by tsickle
 * Generated from: src/cdk/table/row.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Directive, IterableDiffers, TemplateRef, ViewContainerRef, ViewEncapsulation, Inject, Optional } from '@angular/core';
import { mixinHasStickyInput } from './can-stick';
import { CDK_TABLE } from './tokens';
/**
 * The row template that can be used by the mat-table. Should not be used outside of the
 * material library.
 * @type {?}
 */
export const CDK_ROW_TEMPLATE = `<ng-container cdkCellOutlet></ng-container>`;
/**
 * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 * @abstract
 */
let BaseRowDef = /** @class */ (() => {
    /**
     * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs
     * for changes and notifying the table.
     * @abstract
     */
    class BaseRowDef {
        /**
         * @param {?} template
         * @param {?} _differs
         */
        constructor(template, _differs) {
            this.template = template;
            this._differs = _differs;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        ngOnChanges(changes) {
            // Create a new columns differ if one does not yet exist. Initialize it based on initial value
            // of the columns property or an empty array if none is provided.
            if (!this._columnsDiffer) {
                /** @type {?} */
                const columns = (changes['columns'] && changes['columns'].currentValue) || [];
                this._columnsDiffer = this._differs.find(columns).create();
                this._columnsDiffer.diff(columns);
            }
        }
        /**
         * Returns the difference between the current columns and the columns from the last diff, or null
         * if there is no difference.
         * @return {?}
         */
        getColumnsDiff() {
            return this._columnsDiffer.diff(this.columns);
        }
        /**
         * Gets this row def's relevant cell template from the provided column def.
         * @param {?} column
         * @return {?}
         */
        extractCellTemplate(column) {
            if (this instanceof CdkHeaderRowDef) {
                return column.headerCell.template;
            }
            if (this instanceof CdkFooterRowDef) {
                return column.footerCell.template;
            }
            else {
                return column.cell.template;
            }
        }
    }
    BaseRowDef.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    BaseRowDef.ctorParameters = () => [
        { type: TemplateRef },
        { type: IterableDiffers }
    ];
    return BaseRowDef;
})();
export { BaseRowDef };
if (false) {
    /**
     * The columns to be displayed on this row.
     * @type {?}
     */
    BaseRowDef.prototype.columns;
    /**
     * Differ used to check if any changes were made to the columns.
     * @type {?}
     * @protected
     */
    BaseRowDef.prototype._columnsDiffer;
    /**
     * \@docs-private
     * @type {?}
     */
    BaseRowDef.prototype.template;
    /**
     * @type {?}
     * @protected
     */
    BaseRowDef.prototype._differs;
}
// Boilerplate for applying mixins to CdkHeaderRowDef.
/**
 * \@docs-private
 */
class CdkHeaderRowDefBase extends BaseRowDef {
}
/** @type {?} */
const _CdkHeaderRowDefBase = mixinHasStickyInput(CdkHeaderRowDefBase);
/**
 * Header row definition for the CDK table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
let CdkHeaderRowDef = /** @class */ (() => {
    /**
     * Header row definition for the CDK table.
     * Captures the header row's template and other header properties such as the columns to display.
     */
    class CdkHeaderRowDef extends _CdkHeaderRowDefBase {
        /**
         * @param {?} template
         * @param {?} _differs
         * @param {?=} _table
         */
        constructor(template, _differs, _table) {
            super(template, _differs);
            this._table = _table;
        }
        // Prerender fails to recognize that ngOnChanges in a part of this class through inheritance.
        // Explicitly define it so that the method is called as part of the Angular lifecycle.
        /**
         * @param {?} changes
         * @return {?}
         */
        ngOnChanges(changes) {
            super.ngOnChanges(changes);
        }
    }
    CdkHeaderRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkHeaderRowDef]',
                    inputs: ['columns: cdkHeaderRowDef', 'sticky: cdkHeaderRowDefSticky'],
                },] }
    ];
    /** @nocollapse */
    CdkHeaderRowDef.ctorParameters = () => [
        { type: TemplateRef },
        { type: IterableDiffers },
        { type: undefined, decorators: [{ type: Inject, args: [CDK_TABLE,] }, { type: Optional }] }
    ];
    return CdkHeaderRowDef;
})();
export { CdkHeaderRowDef };
if (false) {
    /** @type {?} */
    CdkHeaderRowDef.ngAcceptInputType_sticky;
    /** @type {?} */
    CdkHeaderRowDef.prototype._table;
}
// Boilerplate for applying mixins to CdkFooterRowDef.
/**
 * \@docs-private
 */
class CdkFooterRowDefBase extends BaseRowDef {
}
/** @type {?} */
const _CdkFooterRowDefBase = mixinHasStickyInput(CdkFooterRowDefBase);
/**
 * Footer row definition for the CDK table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
let CdkFooterRowDef = /** @class */ (() => {
    /**
     * Footer row definition for the CDK table.
     * Captures the footer row's template and other footer properties such as the columns to display.
     */
    class CdkFooterRowDef extends _CdkFooterRowDefBase {
        /**
         * @param {?} template
         * @param {?} _differs
         * @param {?=} _table
         */
        constructor(template, _differs, _table) {
            super(template, _differs);
            this._table = _table;
        }
        // Prerender fails to recognize that ngOnChanges in a part of this class through inheritance.
        // Explicitly define it so that the method is called as part of the Angular lifecycle.
        /**
         * @param {?} changes
         * @return {?}
         */
        ngOnChanges(changes) {
            super.ngOnChanges(changes);
        }
    }
    CdkFooterRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkFooterRowDef]',
                    inputs: ['columns: cdkFooterRowDef', 'sticky: cdkFooterRowDefSticky'],
                },] }
    ];
    /** @nocollapse */
    CdkFooterRowDef.ctorParameters = () => [
        { type: TemplateRef },
        { type: IterableDiffers },
        { type: undefined, decorators: [{ type: Inject, args: [CDK_TABLE,] }, { type: Optional }] }
    ];
    return CdkFooterRowDef;
})();
export { CdkFooterRowDef };
if (false) {
    /** @type {?} */
    CdkFooterRowDef.ngAcceptInputType_sticky;
    /** @type {?} */
    CdkFooterRowDef.prototype._table;
}
/**
 * Data row definition for the CDK table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 * @template T
 */
let CdkRowDef = /** @class */ (() => {
    /**
     * Data row definition for the CDK table.
     * Captures the header row's template and other row properties such as the columns to display and
     * a when predicate that describes when this row should be used.
     * @template T
     */
    class CdkRowDef extends BaseRowDef {
        // TODO(andrewseguin): Add an input for providing a switch function to determine
        //   if this template should be used.
        /**
         * @param {?} template
         * @param {?} _differs
         * @param {?=} _table
         */
        constructor(template, _differs, _table) {
            super(template, _differs);
            this._table = _table;
        }
    }
    CdkRowDef.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkRowDef]',
                    inputs: ['columns: cdkRowDefColumns', 'when: cdkRowDefWhen'],
                },] }
    ];
    /** @nocollapse */
    CdkRowDef.ctorParameters = () => [
        { type: TemplateRef },
        { type: IterableDiffers },
        { type: undefined, decorators: [{ type: Inject, args: [CDK_TABLE,] }, { type: Optional }] }
    ];
    return CdkRowDef;
})();
export { CdkRowDef };
if (false) {
    /**
     * Function that should return true if this row template should be used for the provided index
     * and row data. If left undefined, this row will be considered the default row template to use
     * when no other when functions return true for the data.
     * For every row, there must be at least one when function that passes or an undefined to default.
     * @type {?}
     */
    CdkRowDef.prototype.when;
    /** @type {?} */
    CdkRowDef.prototype._table;
}
/**
 * Context provided to the row cells when `multiTemplateDataRows` is false
 * @record
 * @template T
 */
export function CdkCellOutletRowContext() { }
if (false) {
    /**
     * Data for the row that this cell is located within.
     * @type {?|undefined}
     */
    CdkCellOutletRowContext.prototype.$implicit;
    /**
     * Index of the data object in the provided data array.
     * @type {?|undefined}
     */
    CdkCellOutletRowContext.prototype.index;
    /**
     * Length of the number of total rows.
     * @type {?|undefined}
     */
    CdkCellOutletRowContext.prototype.count;
    /**
     * True if this cell is contained in the first row.
     * @type {?|undefined}
     */
    CdkCellOutletRowContext.prototype.first;
    /**
     * True if this cell is contained in the last row.
     * @type {?|undefined}
     */
    CdkCellOutletRowContext.prototype.last;
    /**
     * True if this cell is contained in a row with an even-numbered index.
     * @type {?|undefined}
     */
    CdkCellOutletRowContext.prototype.even;
    /**
     * True if this cell is contained in a row with an odd-numbered index.
     * @type {?|undefined}
     */
    CdkCellOutletRowContext.prototype.odd;
}
/**
 * Context provided to the row cells when `multiTemplateDataRows` is true. This context is the same
 * as CdkCellOutletRowContext except that the single `index` value is replaced by `dataIndex` and
 * `renderIndex`.
 * @record
 * @template T
 */
export function CdkCellOutletMultiRowContext() { }
if (false) {
    /**
     * Data for the row that this cell is located within.
     * @type {?|undefined}
     */
    CdkCellOutletMultiRowContext.prototype.$implicit;
    /**
     * Index of the data object in the provided data array.
     * @type {?|undefined}
     */
    CdkCellOutletMultiRowContext.prototype.dataIndex;
    /**
     * Index location of the rendered row that this cell is located within.
     * @type {?|undefined}
     */
    CdkCellOutletMultiRowContext.prototype.renderIndex;
    /**
     * Length of the number of total rows.
     * @type {?|undefined}
     */
    CdkCellOutletMultiRowContext.prototype.count;
    /**
     * True if this cell is contained in the first row.
     * @type {?|undefined}
     */
    CdkCellOutletMultiRowContext.prototype.first;
    /**
     * True if this cell is contained in the last row.
     * @type {?|undefined}
     */
    CdkCellOutletMultiRowContext.prototype.last;
    /**
     * True if this cell is contained in a row with an even-numbered index.
     * @type {?|undefined}
     */
    CdkCellOutletMultiRowContext.prototype.even;
    /**
     * True if this cell is contained in a row with an odd-numbered index.
     * @type {?|undefined}
     */
    CdkCellOutletMultiRowContext.prototype.odd;
}
/**
 * Outlet for rendering cells inside of a row or header row.
 * \@docs-private
 */
let CdkCellOutlet = /** @class */ (() => {
    /**
     * Outlet for rendering cells inside of a row or header row.
     * \@docs-private
     */
    class CdkCellOutlet {
        /**
         * @param {?} _viewContainer
         */
        constructor(_viewContainer) {
            this._viewContainer = _viewContainer;
            CdkCellOutlet.mostRecentCellOutlet = this;
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            // If this was the last outlet being rendered in the view, remove the reference
            // from the static property after it has been destroyed to avoid leaking memory.
            if (CdkCellOutlet.mostRecentCellOutlet === this) {
                CdkCellOutlet.mostRecentCellOutlet = null;
            }
        }
    }
    /**
     * Static property containing the latest constructed instance of this class.
     * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
     * createEmbeddedView. After one of these components are created, this property will provide
     * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
     * construct the cells with the provided context.
     */
    CdkCellOutlet.mostRecentCellOutlet = null;
    CdkCellOutlet.decorators = [
        { type: Directive, args: [{ selector: '[cdkCellOutlet]' },] }
    ];
    /** @nocollapse */
    CdkCellOutlet.ctorParameters = () => [
        { type: ViewContainerRef }
    ];
    return CdkCellOutlet;
})();
export { CdkCellOutlet };
if (false) {
    /**
     * Static property containing the latest constructed instance of this class.
     * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
     * createEmbeddedView. After one of these components are created, this property will provide
     * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
     * construct the cells with the provided context.
     * @type {?}
     */
    CdkCellOutlet.mostRecentCellOutlet;
    /**
     * The ordered list of cells to render within this outlet's view container
     * @type {?}
     */
    CdkCellOutlet.prototype.cells;
    /**
     * The data context to be provided to each cell
     * @type {?}
     */
    CdkCellOutlet.prototype.context;
    /** @type {?} */
    CdkCellOutlet.prototype._viewContainer;
}
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
let CdkHeaderRow = /** @class */ (() => {
    /**
     * Header template container that contains the cell outlet. Adds the right class and role.
     */
    class CdkHeaderRow {
    }
    CdkHeaderRow.decorators = [
        { type: Component, args: [{
                    selector: 'cdk-header-row, tr[cdk-header-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'cdk-header-row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return CdkHeaderRow;
})();
export { CdkHeaderRow };
/**
 * Footer template container that contains the cell outlet. Adds the right class and role.
 */
let CdkFooterRow = /** @class */ (() => {
    /**
     * Footer template container that contains the cell outlet. Adds the right class and role.
     */
    class CdkFooterRow {
    }
    CdkFooterRow.decorators = [
        { type: Component, args: [{
                    selector: 'cdk-footer-row, tr[cdk-footer-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'cdk-footer-row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return CdkFooterRow;
})();
export { CdkFooterRow };
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
let CdkRow = /** @class */ (() => {
    /**
     * Data row template container that contains the cell outlet. Adds the right class and role.
     */
    class CdkRow {
    }
    CdkRow.decorators = [
        { type: Component, args: [{
                    selector: 'cdk-row, tr[cdk-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'cdk-row',
                        'role': 'row',
                    },
                    // See note on CdkTable for explanation on why this uses the default change detection strategy.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return CdkRow;
})();
export { CdkRow };
/**
 * Row that can be used to display a message when no data is shown in the table.
 */
let CdkNoDataRow = /** @class */ (() => {
    /**
     * Row that can be used to display a message when no data is shown in the table.
     */
    class CdkNoDataRow {
        /**
         * @param {?} templateRef
         */
        constructor(templateRef) {
            this.templateRef = templateRef;
        }
    }
    CdkNoDataRow.decorators = [
        { type: Directive, args: [{
                    selector: 'ng-template[cdkNoDataRow]'
                },] }
    ];
    /** @nocollapse */
    CdkNoDataRow.ctorParameters = () => [
        { type: TemplateRef }
    ];
    return CdkNoDataRow;
})();
export { CdkNoDataRow };
if (false) {
    /** @type {?} */
    CdkNoDataRow.prototype.templateRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay90YWJsZS9yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUdULGVBQWUsRUFJZixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBeUIsbUJBQW1CLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFeEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7Ozs7O0FBTW5DLE1BQU0sT0FBTyxnQkFBZ0IsR0FBRyw2Q0FBNkM7Ozs7OztBQU03RTs7Ozs7O0lBQUEsTUFDc0IsVUFBVTs7Ozs7UUFPOUIsWUFDZ0MsUUFBMEIsRUFBWSxRQUF5QjtZQUEvRCxhQUFRLEdBQVIsUUFBUSxDQUFrQjtZQUFZLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQy9GLENBQUM7Ozs7O1FBRUQsV0FBVyxDQUFDLE9BQXNCO1lBQ2hDLDhGQUE4RjtZQUM5RixpRUFBaUU7WUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7O3NCQUNsQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7Z0JBQzdFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQzs7Ozs7O1FBTUQsY0FBYztZQUNaLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJ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b0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEl0ZXJhYmxlQ2hhbmdlcyxcbiAgSXRlcmFibGVEaWZmZXIsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgSW5qZWN0LFxuICBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FuU3RpY2ssIENhblN0aWNrQ3RvciwgbWl4aW5IYXNTdGlja3lJbnB1dH0gZnJvbSAnLi9jYW4tc3RpY2snO1xuaW1wb3J0IHtDZGtDZWxsRGVmLCBDZGtDb2x1bW5EZWZ9IGZyb20gJy4vY2VsbCc7XG5pbXBvcnQge0NES19UQUJMRX0gZnJvbSAnLi90b2tlbnMnO1xuXG4vKipcbiAqIFRoZSByb3cgdGVtcGxhdGUgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgbWF0LXRhYmxlLiBTaG91bGQgbm90IGJlIHVzZWQgb3V0c2lkZSBvZiB0aGVcbiAqIG1hdGVyaWFsIGxpYnJhcnkuXG4gKi9cbmV4cG9ydCBjb25zdCBDREtfUk9XX1RFTVBMQVRFID0gYDxuZy1jb250YWluZXIgY2RrQ2VsbE91dGxldD48L25nLWNvbnRhaW5lcj5gO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIHRoZSBDZGtIZWFkZXJSb3dEZWYgYW5kIENka1Jvd0RlZiB0aGF0IGhhbmRsZXMgY2hlY2tpbmcgdGhlaXIgY29sdW1ucyBpbnB1dHNcbiAqIGZvciBjaGFuZ2VzIGFuZCBub3RpZnlpbmcgdGhlIHRhYmxlLlxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUm93RGVmIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqIFRoZSBjb2x1bW5zIHRvIGJlIGRpc3BsYXllZCBvbiB0aGlzIHJvdy4gKi9cbiAgY29sdW1uczogSXRlcmFibGU8c3RyaW5nPjtcblxuICAvKiogRGlmZmVyIHVzZWQgdG8gY2hlY2sgaWYgYW55IGNoYW5nZXMgd2VyZSBtYWRlIHRvIHRoZSBjb2x1bW5zLiAqL1xuICBwcm90ZWN0ZWQgX2NvbHVtbnNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPGFueT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogQGRvY3MtcHJpdmF0ZSAqLyBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sIHByb3RlY3RlZCBfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgLy8gQ3JlYXRlIGEgbmV3IGNvbHVtbnMgZGlmZmVyIGlmIG9uZSBkb2VzIG5vdCB5ZXQgZXhpc3QuIEluaXRpYWxpemUgaXQgYmFzZWQgb24gaW5pdGlhbCB2YWx1ZVxuICAgIC8vIG9mIHRoZSBjb2x1bW5zIHByb3BlcnR5IG9yIGFuIGVtcHR5IGFycmF5IGlmIG5vbmUgaXMgcHJvdmlkZWQuXG4gICAgaWYgKCF0aGlzLl9jb2x1bW5zRGlmZmVyKSB7XG4gICAgICBjb25zdCBjb2x1bW5zID0gKGNoYW5nZXNbJ2NvbHVtbnMnXSAmJiBjaGFuZ2VzWydjb2x1bW5zJ10uY3VycmVudFZhbHVlKSB8fCBbXTtcbiAgICAgIHRoaXMuX2NvbHVtbnNEaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQoY29sdW1ucykuY3JlYXRlKCk7XG4gICAgICB0aGlzLl9jb2x1bW5zRGlmZmVyLmRpZmYoY29sdW1ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgY3VycmVudCBjb2x1bW5zIGFuZCB0aGUgY29sdW1ucyBmcm9tIHRoZSBsYXN0IGRpZmYsIG9yIG51bGxcbiAgICogaWYgdGhlcmUgaXMgbm8gZGlmZmVyZW5jZS5cbiAgICovXG4gIGdldENvbHVtbnNEaWZmKCk6IEl0ZXJhYmxlQ2hhbmdlczxhbnk+fG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zRGlmZmVyLmRpZmYodGhpcy5jb2x1bW5zKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoaXMgcm93IGRlZidzIHJlbGV2YW50IGNlbGwgdGVtcGxhdGUgZnJvbSB0aGUgcHJvdmlkZWQgY29sdW1uIGRlZi4gKi9cbiAgZXh0cmFjdENlbGxUZW1wbGF0ZShjb2x1bW46IENka0NvbHVtbkRlZik6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQ2RrSGVhZGVyUm93RGVmKSB7XG4gICAgICByZXR1cm4gY29sdW1uLmhlYWRlckNlbGwudGVtcGxhdGU7XG4gICAgfVxuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQ2RrRm9vdGVyUm93RGVmKSB7XG4gICAgICByZXR1cm4gY29sdW1uLmZvb3RlckNlbGwudGVtcGxhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb2x1bW4uY2VsbC50ZW1wbGF0ZTtcbiAgICB9XG4gIH1cbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBDZGtIZWFkZXJSb3dEZWYuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY2xhc3MgQ2RrSGVhZGVyUm93RGVmQmFzZSBleHRlbmRzIEJhc2VSb3dEZWYge31cbmNvbnN0IF9DZGtIZWFkZXJSb3dEZWZCYXNlOiBDYW5TdGlja0N0b3ImdHlwZW9mIENka0hlYWRlclJvd0RlZkJhc2UgPVxuICAgIG1peGluSGFzU3RpY2t5SW5wdXQoQ2RrSGVhZGVyUm93RGVmQmFzZSk7XG5cbi8qKlxuICogSGVhZGVyIHJvdyBkZWZpbml0aW9uIGZvciB0aGUgQ0RLIHRhYmxlLlxuICogQ2FwdHVyZXMgdGhlIGhlYWRlciByb3cncyB0ZW1wbGF0ZSBhbmQgb3RoZXIgaGVhZGVyIHByb3BlcnRpZXMgc3VjaCBhcyB0aGUgY29sdW1ucyB0byBkaXNwbGF5LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrSGVhZGVyUm93RGVmXScsXG4gIGlucHV0czogWydjb2x1bW5zOiBjZGtIZWFkZXJSb3dEZWYnLCAnc3RpY2t5OiBjZGtIZWFkZXJSb3dEZWZTdGlja3knXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2RrSGVhZGVyUm93RGVmIGV4dGVuZHMgX0Nka0hlYWRlclJvd0RlZkJhc2UgaW1wbGVtZW50cyBDYW5TdGljaywgT25DaGFuZ2VzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICBASW5qZWN0KENES19UQUJMRSkgQE9wdGlvbmFsKCkgcHVibGljIF90YWJsZT86IGFueSkge1xuICAgIHN1cGVyKHRlbXBsYXRlLCBfZGlmZmVycyk7XG4gIH1cblxuICAvLyBQcmVyZW5kZXIgZmFpbHMgdG8gcmVjb2duaXplIHRoYXQgbmdPbkNoYW5nZXMgaW4gYSBwYXJ0IG9mIHRoaXMgY2xhc3MgdGhyb3VnaCBpbmhlcml0YW5jZS5cbiAgLy8gRXhwbGljaXRseSBkZWZpbmUgaXQgc28gdGhhdCB0aGUgbWV0aG9kIGlzIGNhbGxlZCBhcyBwYXJ0IG9mIHRoZSBBbmd1bGFyIGxpZmVjeWNsZS5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0aWNreTogQm9vbGVhbklucHV0O1xufVxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIENka0Zvb3RlclJvd0RlZi5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jbGFzcyBDZGtGb290ZXJSb3dEZWZCYXNlIGV4dGVuZHMgQmFzZVJvd0RlZiB7fVxuY29uc3QgX0Nka0Zvb3RlclJvd0RlZkJhc2U6IENhblN0aWNrQ3RvciZ0eXBlb2YgQ2RrRm9vdGVyUm93RGVmQmFzZSA9XG4gICAgbWl4aW5IYXNTdGlja3lJbnB1dChDZGtGb290ZXJSb3dEZWZCYXNlKTtcblxuLyoqXG4gKiBGb290ZXIgcm93IGRlZmluaXRpb24gZm9yIHRoZSBDREsgdGFibGUuXG4gKiBDYXB0dXJlcyB0aGUgZm9vdGVyIHJvdydzIHRlbXBsYXRlIGFuZCBvdGhlciBmb290ZXIgcHJvcGVydGllcyBzdWNoIGFzIHRoZSBjb2x1bW5zIHRvIGRpc3BsYXkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjZGtGb290ZXJSb3dEZWZdJyxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IGNka0Zvb3RlclJvd0RlZicsICdzdGlja3k6IGNka0Zvb3RlclJvd0RlZlN0aWNreSddLFxufSlcbmV4cG9ydCBjbGFzcyBDZGtGb290ZXJSb3dEZWYgZXh0ZW5kcyBfQ2RrRm9vdGVyUm93RGVmQmFzZSBpbXBsZW1lbnRzIENhblN0aWNrLCBPbkNoYW5nZXMge1xuICBjb25zdHJ1Y3RvcihcbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PixcbiAgICBfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgIEBJbmplY3QoQ0RLX1RBQkxFKSBAT3B0aW9uYWwoKSBwdWJsaWMgX3RhYmxlPzogYW55KSB7XG4gICAgc3VwZXIodGVtcGxhdGUsIF9kaWZmZXJzKTtcbiAgfVxuXG4gIC8vIFByZXJlbmRlciBmYWlscyB0byByZWNvZ25pemUgdGhhdCBuZ09uQ2hhbmdlcyBpbiBhIHBhcnQgb2YgdGhpcyBjbGFzcyB0aHJvdWdoIGluaGVyaXRhbmNlLlxuICAvLyBFeHBsaWNpdGx5IGRlZmluZSBpdCBzbyB0aGF0IHRoZSBtZXRob2QgaXMgY2FsbGVkIGFzIHBhcnQgb2YgdGhlIEFuZ3VsYXIgbGlmZWN5Y2xlLlxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RpY2t5OiBCb29sZWFuSW5wdXQ7XG59XG5cbi8qKlxuICogRGF0YSByb3cgZGVmaW5pdGlvbiBmb3IgdGhlIENESyB0YWJsZS5cbiAqIENhcHR1cmVzIHRoZSBoZWFkZXIgcm93J3MgdGVtcGxhdGUgYW5kIG90aGVyIHJvdyBwcm9wZXJ0aWVzIHN1Y2ggYXMgdGhlIGNvbHVtbnMgdG8gZGlzcGxheSBhbmRcbiAqIGEgd2hlbiBwcmVkaWNhdGUgdGhhdCBkZXNjcmliZXMgd2hlbiB0aGlzIHJvdyBzaG91bGQgYmUgdXNlZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Nka1Jvd0RlZl0nLFxuICBpbnB1dHM6IFsnY29sdW1uczogY2RrUm93RGVmQ29sdW1ucycsICd3aGVuOiBjZGtSb3dEZWZXaGVuJ10sXG59KVxuZXhwb3J0IGNsYXNzIENka1Jvd0RlZjxUPiBleHRlbmRzIEJhc2VSb3dEZWYge1xuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCBzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhpcyByb3cgdGVtcGxhdGUgc2hvdWxkIGJlIHVzZWQgZm9yIHRoZSBwcm92aWRlZCBpbmRleFxuICAgKiBhbmQgcm93IGRhdGEuIElmIGxlZnQgdW5kZWZpbmVkLCB0aGlzIHJvdyB3aWxsIGJlIGNvbnNpZGVyZWQgdGhlIGRlZmF1bHQgcm93IHRlbXBsYXRlIHRvIHVzZVxuICAgKiB3aGVuIG5vIG90aGVyIHdoZW4gZnVuY3Rpb25zIHJldHVybiB0cnVlIGZvciB0aGUgZGF0YS5cbiAgICogRm9yIGV2ZXJ5IHJvdywgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCBvbmUgd2hlbiBmdW5jdGlvbiB0aGF0IHBhc3NlcyBvciBhbiB1bmRlZmluZWQgdG8gZGVmYXVsdC5cbiAgICovXG4gIHdoZW46IChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuO1xuXG4gIC8vIFRPRE8oYW5kcmV3c2VndWluKTogQWRkIGFuIGlucHV0IGZvciBwcm92aWRpbmcgYSBzd2l0Y2ggZnVuY3Rpb24gdG8gZGV0ZXJtaW5lXG4gIC8vICAgaWYgdGhpcyB0ZW1wbGF0ZSBzaG91bGQgYmUgdXNlZC5cbiAgY29uc3RydWN0b3IoXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICBASW5qZWN0KENES19UQUJMRSkgQE9wdGlvbmFsKCkgcHVibGljIF90YWJsZT86IGFueSkge1xuICAgIHN1cGVyKHRlbXBsYXRlLCBfZGlmZmVycyk7XG4gIH1cbn1cblxuLyoqIENvbnRleHQgcHJvdmlkZWQgdG8gdGhlIHJvdyBjZWxscyB3aGVuIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIGlzIGZhbHNlICovXG5leHBvcnQgaW50ZXJmYWNlIENka0NlbGxPdXRsZXRSb3dDb250ZXh0PFQ+IHtcbiAgLyoqIERhdGEgZm9yIHRoZSByb3cgdGhhdCB0aGlzIGNlbGwgaXMgbG9jYXRlZCB3aXRoaW4uICovXG4gICRpbXBsaWNpdD86IFQ7XG5cbiAgLyoqIEluZGV4IG9mIHRoZSBkYXRhIG9iamVjdCBpbiB0aGUgcHJvdmlkZWQgZGF0YSBhcnJheS4gKi9cbiAgaW5kZXg/OiBudW1iZXI7XG5cbiAgLyoqIExlbmd0aCBvZiB0aGUgbnVtYmVyIG9mIHRvdGFsIHJvd3MuICovXG4gIGNvdW50PzogbnVtYmVyO1xuXG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gdGhlIGZpcnN0IHJvdy4gKi9cbiAgZmlyc3Q/OiBib29sZWFuO1xuXG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gdGhlIGxhc3Qgcm93LiAqL1xuICBsYXN0PzogYm9vbGVhbjtcblxuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIGEgcm93IHdpdGggYW4gZXZlbi1udW1iZXJlZCBpbmRleC4gKi9cbiAgZXZlbj86IGJvb2xlYW47XG5cbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiBhIHJvdyB3aXRoIGFuIG9kZC1udW1iZXJlZCBpbmRleC4gKi9cbiAgb2RkPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDb250ZXh0IHByb3ZpZGVkIHRvIHRoZSByb3cgY2VsbHMgd2hlbiBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBpcyB0cnVlLiBUaGlzIGNvbnRleHQgaXMgdGhlIHNhbWVcbiAqIGFzIENka0NlbGxPdXRsZXRSb3dDb250ZXh0IGV4Y2VwdCB0aGF0IHRoZSBzaW5nbGUgYGluZGV4YCB2YWx1ZSBpcyByZXBsYWNlZCBieSBgZGF0YUluZGV4YCBhbmRcbiAqIGByZW5kZXJJbmRleGAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2RrQ2VsbE91dGxldE11bHRpUm93Q29udGV4dDxUPiB7XG4gIC8qKiBEYXRhIGZvciB0aGUgcm93IHRoYXQgdGhpcyBjZWxsIGlzIGxvY2F0ZWQgd2l0aGluLiAqL1xuICAkaW1wbGljaXQ/OiBUO1xuXG4gIC8qKiBJbmRleCBvZiB0aGUgZGF0YSBvYmplY3QgaW4gdGhlIHByb3ZpZGVkIGRhdGEgYXJyYXkuICovXG4gIGRhdGFJbmRleD86IG51bWJlcjtcblxuICAvKiogSW5kZXggbG9jYXRpb24gb2YgdGhlIHJlbmRlcmVkIHJvdyB0aGF0IHRoaXMgY2VsbCBpcyBsb2NhdGVkIHdpdGhpbi4gKi9cbiAgcmVuZGVySW5kZXg/OiBudW1iZXI7XG5cbiAgLyoqIExlbmd0aCBvZiB0aGUgbnVtYmVyIG9mIHRvdGFsIHJvd3MuICovXG4gIGNvdW50PzogbnVtYmVyO1xuXG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gdGhlIGZpcnN0IHJvdy4gKi9cbiAgZmlyc3Q/OiBib29sZWFuO1xuXG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gdGhlIGxhc3Qgcm93LiAqL1xuICBsYXN0PzogYm9vbGVhbjtcblxuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIGEgcm93IHdpdGggYW4gZXZlbi1udW1iZXJlZCBpbmRleC4gKi9cbiAgZXZlbj86IGJvb2xlYW47XG5cbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiBhIHJvdyB3aXRoIGFuIG9kZC1udW1iZXJlZCBpbmRleC4gKi9cbiAgb2RkPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBPdXRsZXQgZm9yIHJlbmRlcmluZyBjZWxscyBpbnNpZGUgb2YgYSByb3cgb3IgaGVhZGVyIHJvdy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbY2RrQ2VsbE91dGxldF0nfSlcbmV4cG9ydCBjbGFzcyBDZGtDZWxsT3V0bGV0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBvcmRlcmVkIGxpc3Qgb2YgY2VsbHMgdG8gcmVuZGVyIHdpdGhpbiB0aGlzIG91dGxldCdzIHZpZXcgY29udGFpbmVyICovXG4gIGNlbGxzOiBDZGtDZWxsRGVmW107XG5cbiAgLyoqIFRoZSBkYXRhIGNvbnRleHQgdG8gYmUgcHJvdmlkZWQgdG8gZWFjaCBjZWxsICovXG4gIGNvbnRleHQ6IGFueTtcblxuICAvKipcbiAgICogU3RhdGljIHByb3BlcnR5IGNvbnRhaW5pbmcgdGhlIGxhdGVzdCBjb25zdHJ1Y3RlZCBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzLlxuICAgKiBVc2VkIGJ5IHRoZSBDREsgdGFibGUgd2hlbiBlYWNoIENka0hlYWRlclJvdyBhbmQgQ2RrUm93IGNvbXBvbmVudCBpcyBjcmVhdGVkIHVzaW5nXG4gICAqIGNyZWF0ZUVtYmVkZGVkVmlldy4gQWZ0ZXIgb25lIG9mIHRoZXNlIGNvbXBvbmVudHMgYXJlIGNyZWF0ZWQsIHRoaXMgcHJvcGVydHkgd2lsbCBwcm92aWRlXG4gICAqIGEgaGFuZGxlIHRvIHByb3ZpZGUgdGhhdCBjb21wb25lbnQncyBjZWxscyBhbmQgY29udGV4dC4gQWZ0ZXIgaW5pdCwgdGhlIENka0NlbGxPdXRsZXQgd2lsbFxuICAgKiBjb25zdHJ1Y3QgdGhlIGNlbGxzIHdpdGggdGhlIHByb3ZpZGVkIGNvbnRleHQuXG4gICAqL1xuICBzdGF0aWMgbW9zdFJlY2VudENlbGxPdXRsZXQ6IENka0NlbGxPdXRsZXR8bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHVibGljIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgQ2RrQ2VsbE91dGxldC5tb3N0UmVjZW50Q2VsbE91dGxldCA9IHRoaXM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvLyBJZiB0aGlzIHdhcyB0aGUgbGFzdCBvdXRsZXQgYmVpbmcgcmVuZGVyZWQgaW4gdGhlIHZpZXcsIHJlbW92ZSB0aGUgcmVmZXJlbmNlXG4gICAgLy8gZnJvbSB0aGUgc3RhdGljIHByb3BlcnR5IGFmdGVyIGl0IGhhcyBiZWVuIGRlc3Ryb3llZCB0byBhdm9pZCBsZWFraW5nIG1lbW9yeS5cbiAgICBpZiAoQ2RrQ2VsbE91dGxldC5tb3N0UmVjZW50Q2VsbE91dGxldCA9PT0gdGhpcykge1xuICAgICAgQ2RrQ2VsbE91dGxldC5tb3N0UmVjZW50Q2VsbE91dGxldCA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cbi8qKiBIZWFkZXIgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nkay1oZWFkZXItcm93LCB0cltjZGstaGVhZGVyLXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdjZGstaGVhZGVyLXJvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBDZGtIZWFkZXJSb3cge1xufVxuXG5cbi8qKiBGb290ZXIgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nkay1mb290ZXItcm93LCB0cltjZGstZm9vdGVyLXJvd10nLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdjZGstZm9vdGVyLXJvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBDZGtGb290ZXJSb3cge1xufVxuXG4vKiogRGF0YSByb3cgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgY29udGFpbnMgdGhlIGNlbGwgb3V0bGV0LiBBZGRzIHRoZSByaWdodCBjbGFzcyBhbmQgcm9sZS4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nkay1yb3csIHRyW2Nkay1yb3ddJyxcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnY2RrLXJvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBDZGtSb3cge1xufVxuXG4vKiogUm93IHRoYXQgY2FuIGJlIHVzZWQgdG8gZGlzcGxheSBhIG1lc3NhZ2Ugd2hlbiBubyBkYXRhIGlzIHNob3duIGluIHRoZSB0YWJsZS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW2Nka05vRGF0YVJvd10nXG59KVxuZXhwb3J0IGNsYXNzIENka05vRGF0YVJvdyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiJdfQ==