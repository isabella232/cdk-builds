/**
 * @fileoverview added by tsickle
 * Generated from: src/cdk/table/table.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { isDataSource } from '@angular/cdk/collections';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EmbeddedViewRef, Inject, Input, isDevMode, IterableDiffers, Optional, QueryList, ViewChild, ViewContainerRef, ViewEncapsulation, ContentChild } from '@angular/core';
import { BehaviorSubject, of as observableOf, Subject, isObservable, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkColumnDef } from './cell';
import { CdkCellOutlet, CdkFooterRowDef, CdkHeaderRowDef, CdkRowDef, CdkNoDataRow } from './row';
import { StickyStyler } from './sticky-styler';
import { getTableDuplicateColumnNameError, getTableMissingMatchingRowDefError, getTableMissingRowDefsError, getTableMultipleDefaultRowDefsError, getTableUnknownColumnError, getTableUnknownDataSourceError } from './table-errors';
import { CDK_TABLE } from './tokens';
/**
 * Interface used to provide an outlet for rows to be inserted into.
 * @record
 */
export function RowOutlet() { }
if (false) {
    /** @type {?} */
    RowOutlet.prototype.viewContainer;
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * \@docs-private
 */
let DataRowOutlet = /** @class */ (() => {
    /**
     * Provides a handle for the table to grab the view container's ng-container to insert data rows.
     * \@docs-private
     */
    class DataRowOutlet {
        /**
         * @param {?} viewContainer
         * @param {?} elementRef
         */
        constructor(viewContainer, elementRef) {
            this.viewContainer = viewContainer;
            this.elementRef = elementRef;
        }
    }
    DataRowOutlet.decorators = [
        { type: Directive, args: [{ selector: '[rowOutlet]' },] }
    ];
    /** @nocollapse */
    DataRowOutlet.ctorParameters = () => [
        { type: ViewContainerRef },
        { type: ElementRef }
    ];
    return DataRowOutlet;
})();
export { DataRowOutlet };
if (false) {
    /** @type {?} */
    DataRowOutlet.prototype.viewContainer;
    /** @type {?} */
    DataRowOutlet.prototype.elementRef;
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * \@docs-private
 */
let HeaderRowOutlet = /** @class */ (() => {
    /**
     * Provides a handle for the table to grab the view container's ng-container to insert the header.
     * \@docs-private
     */
    class HeaderRowOutlet {
        /**
         * @param {?} viewContainer
         * @param {?} elementRef
         */
        constructor(viewContainer, elementRef) {
            this.viewContainer = viewContainer;
            this.elementRef = elementRef;
        }
    }
    HeaderRowOutlet.decorators = [
        { type: Directive, args: [{ selector: '[headerRowOutlet]' },] }
    ];
    /** @nocollapse */
    HeaderRowOutlet.ctorParameters = () => [
        { type: ViewContainerRef },
        { type: ElementRef }
    ];
    return HeaderRowOutlet;
})();
export { HeaderRowOutlet };
if (false) {
    /** @type {?} */
    HeaderRowOutlet.prototype.viewContainer;
    /** @type {?} */
    HeaderRowOutlet.prototype.elementRef;
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the footer.
 * \@docs-private
 */
let FooterRowOutlet = /** @class */ (() => {
    /**
     * Provides a handle for the table to grab the view container's ng-container to insert the footer.
     * \@docs-private
     */
    class FooterRowOutlet {
        /**
         * @param {?} viewContainer
         * @param {?} elementRef
         */
        constructor(viewContainer, elementRef) {
            this.viewContainer = viewContainer;
            this.elementRef = elementRef;
        }
    }
    FooterRowOutlet.decorators = [
        { type: Directive, args: [{ selector: '[footerRowOutlet]' },] }
    ];
    /** @nocollapse */
    FooterRowOutlet.ctorParameters = () => [
        { type: ViewContainerRef },
        { type: ElementRef }
    ];
    return FooterRowOutlet;
})();
export { FooterRowOutlet };
if (false) {
    /** @type {?} */
    FooterRowOutlet.prototype.viewContainer;
    /** @type {?} */
    FooterRowOutlet.prototype.elementRef;
}
/**
 * Provides a handle for the table to grab the view
 * container's ng-container to insert the no data row.
 * \@docs-private
 */
let NoDataRowOutlet = /** @class */ (() => {
    /**
     * Provides a handle for the table to grab the view
     * container's ng-container to insert the no data row.
     * \@docs-private
     */
    class NoDataRowOutlet {
        /**
         * @param {?} viewContainer
         * @param {?} elementRef
         */
        constructor(viewContainer, elementRef) {
            this.viewContainer = viewContainer;
            this.elementRef = elementRef;
        }
    }
    NoDataRowOutlet.decorators = [
        { type: Directive, args: [{ selector: '[noDataRowOutlet]' },] }
    ];
    /** @nocollapse */
    NoDataRowOutlet.ctorParameters = () => [
        { type: ViewContainerRef },
        { type: ElementRef }
    ];
    return NoDataRowOutlet;
})();
export { NoDataRowOutlet };
if (false) {
    /** @type {?} */
    NoDataRowOutlet.prototype.viewContainer;
    /** @type {?} */
    NoDataRowOutlet.prototype.elementRef;
}
/**
 * The table template that can be used by the mat-table. Should not be used outside of the
 * material library.
 * \@docs-private
 * @type {?}
 */
export const CDK_TABLE_TEMPLATE = 
// Note that according to MDN, the `caption` element has to be projected as the **first**
// element in the table. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
`
  <ng-content select="caption"></ng-content>
  <ng-content select="colgroup, col"></ng-content>
  <ng-container headerRowOutlet></ng-container>
  <ng-container rowOutlet></ng-container>
  <ng-container noDataRowOutlet></ng-container>
  <ng-container footerRowOutlet></ng-container>
`;
/**
 * Interface used to conveniently type the possible context interfaces for the render row.
 * \@docs-private
 * @record
 * @template T
 */
export function RowContext() { }
/**
 * Class used to conveniently type the embedded view ref for rows with a context.
 * \@docs-private
 * @abstract
 * @template T
 */
class RowViewRef extends EmbeddedViewRef {
}
/**
 * Set of properties that represents the identity of a single rendered row.
 *
 * When the table needs to determine the list of rows to render, it will do so by iterating through
 * each data object and evaluating its list of row templates to display (when multiTemplateDataRows
 * is false, there is only one template per data object). For each pair of data object and row
 * template, a `RenderRow` is added to the list of rows to render. If the data object and row
 * template pair has already been rendered, the previously used `RenderRow` is added; else a new
 * `RenderRow` is * created. Once the list is complete and all data objects have been itereated
 * through, a diff is performed to determine the changes that need to be made to the rendered rows.
 *
 * \@docs-private
 * @record
 * @template T
 */
export function RenderRow() { }
if (false) {
    /** @type {?} */
    RenderRow.prototype.data;
    /** @type {?} */
    RenderRow.prototype.dataIndex;
    /** @type {?} */
    RenderRow.prototype.rowDef;
}
/**
 * A data table that can render a header row, data rows, and a footer row.
 * Uses the dataSource input to determine the data to be rendered. The data can be provided either
 * as a data array, an Observable stream that emits the data array to render, or a DataSource with a
 * connect function that will return an Observable stream that emits the data array to render.
 * @template T
 */
let CdkTable = /** @class */ (() => {
    /**
     * A data table that can render a header row, data rows, and a footer row.
     * Uses the dataSource input to determine the data to be rendered. The data can be provided either
     * as a data array, an Observable stream that emits the data array to render, or a DataSource with a
     * connect function that will return an Observable stream that emits the data array to render.
     * @template T
     */
    class CdkTable {
        /**
         * @param {?} _differs
         * @param {?} _changeDetectorRef
         * @param {?} _elementRef
         * @param {?} role
         * @param {?} _dir
         * @param {?} _document
         * @param {?} _platform
         */
        constructor(_differs, _changeDetectorRef, _elementRef, role, _dir, _document, _platform) {
            this._differs = _differs;
            this._changeDetectorRef = _changeDetectorRef;
            this._elementRef = _elementRef;
            this._dir = _dir;
            this._platform = _platform;
            /**
             * Subject that emits when the component has been destroyed.
             */
            this._onDestroy = new Subject();
            /**
             * Map of all the user's defined columns (header, data, and footer cell template) identified by
             * name. Collection populated by the column definitions gathered by `ContentChildren` as well as
             * any custom column definitions added to `_customColumnDefs`.
             */
            this._columnDefsByName = new Map();
            /**
             * Column definitions that were defined outside of the direct content children of the table.
             * These will be defined when, e.g., creating a wrapper around the cdkTable that has
             * column definitions as *its* content child.
             */
            this._customColumnDefs = new Set();
            /**
             * Data row definitions that were defined outside of the direct content children of the table.
             * These will be defined when, e.g., creating a wrapper around the cdkTable that has
             * built-in data rows as *its* content child.
             */
            this._customRowDefs = new Set();
            /**
             * Header row definitions that were defined outside of the direct content children of the table.
             * These will be defined when, e.g., creating a wrapper around the cdkTable that has
             * built-in header rows as *its* content child.
             */
            this._customHeaderRowDefs = new Set();
            /**
             * Footer row definitions that were defined outside of the direct content children of the table.
             * These will be defined when, e.g., creating a wrapper around the cdkTable that has a
             * built-in footer row as *its* content child.
             */
            this._customFooterRowDefs = new Set();
            /**
             * Whether the header row definition has been changed. Triggers an update to the header row after
             * content is checked. Initialized as true so that the table renders the initial set of rows.
             */
            this._headerRowDefChanged = true;
            /**
             * Whether the footer row definition has been changed. Triggers an update to the footer row after
             * content is checked. Initialized as true so that the table renders the initial set of rows.
             */
            this._footerRowDefChanged = true;
            /**
             * Cache of the latest rendered `RenderRow` objects as a map for easy retrieval when constructing
             * a new list of `RenderRow` objects for rendering rows. Since the new list is constructed with
             * the cached `RenderRow` objects when possible, the row identity is preserved when the data
             * and row template matches, which allows the `IterableDiffer` to check rows by reference
             * and understand which rows are added/moved/removed.
             *
             * Implemented as a map of maps where the first key is the `data: T` object and the second is the
             * `CdkRowDef<T>` object. With the two keys, the cache points to a `RenderRow<T>` object that
             * contains an array of created pairs. The array is necessary to handle cases where the data
             * array contains multiple duplicate data objects and each instantiated `RenderRow` must be
             * stored.
             */
            this._cachedRenderRowsMap = new Map();
            /**
             * CSS class added to any row or cell that has sticky positioning applied. May be overriden by
             * table subclasses.
             */
            this.stickyCssClass = 'cdk-table-sticky';
            /**
             * Whether the no data row is currently showing anything.
             */
            this._isShowingNoDataRow = false;
            this._multiTemplateDataRows = false;
            // TODO(andrewseguin): Remove max value as the end index
            //   and instead calculate the view on init and scroll.
            /**
             * Stream containing the latest information on what rows are being displayed on screen.
             * Can be used by the data source to as a heuristic of what data should be provided.
             *
             * \@docs-private
             */
            this.viewChange = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
            if (!role) {
                this._elementRef.nativeElement.setAttribute('role', 'grid');
            }
            this._document = _document;
            this._isNativeHtmlTable = this._elementRef.nativeElement.nodeName === 'TABLE';
        }
        /**
         * Tracking function that will be used to check the differences in data changes. Used similarly
         * to `ngFor` `trackBy` function. Optimize row operations by identifying a row based on its data
         * relative to the function to know if a row should be added/removed/moved.
         * Accepts a function that takes two parameters, `index` and `item`.
         * @return {?}
         */
        get trackBy() {
            return this._trackByFn;
        }
        /**
         * @param {?} fn
         * @return {?}
         */
        set trackBy(fn) {
            if (isDevMode() && fn != null && typeof fn !== 'function' && (/** @type {?} */ (console)) &&
                (/** @type {?} */ (console.warn))) {
                console.warn(`trackBy must be a function, but received ${JSON.stringify(fn)}.`);
            }
            this._trackByFn = fn;
        }
        /**
         * The table's source of data, which can be provided in three ways (in order of complexity):
         *   - Simple data array (each object represents one table row)
         *   - Stream that emits a data array each time the array changes
         *   - `DataSource` object that implements the connect/disconnect interface.
         *
         * If a data array is provided, the table must be notified when the array's objects are
         * added, removed, or moved. This can be done by calling the `renderRows()` function which will
         * render the diff since the last table render. If the data array reference is changed, the table
         * will automatically trigger an update to the rows.
         *
         * When providing an Observable stream, the table will trigger an update automatically when the
         * stream emits a new array of data.
         *
         * Finally, when providing a `DataSource` object, the table will use the Observable stream
         * provided by the connect function and trigger updates when that stream emits new data array
         * values. During the table's ngOnDestroy or when the data source is removed from the table, the
         * table will call the DataSource's `disconnect` function (may be useful for cleaning up any
         * subscriptions registered during the connect process).
         * @return {?}
         */
        get dataSource() {
            return this._dataSource;
        }
        /**
         * @param {?} dataSource
         * @return {?}
         */
        set dataSource(dataSource) {
            if (this._dataSource !== dataSource) {
                this._switchDataSource(dataSource);
            }
        }
        /**
         * Whether to allow multiple rows per data object by evaluating which rows evaluate their 'when'
         * predicate to true. If `multiTemplateDataRows` is false, which is the default value, then each
         * dataobject will render the first row that evaluates its when predicate to true, in the order
         * defined in the table, or otherwise the default row which does not have a when predicate.
         * @return {?}
         */
        get multiTemplateDataRows() {
            return this._multiTemplateDataRows;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        set multiTemplateDataRows(v) {
            this._multiTemplateDataRows = coerceBooleanProperty(v);
            // In Ivy if this value is set via a static attribute (e.g. <table multiTemplateDataRows>),
            // this setter will be invoked before the row outlet has been defined hence the null check.
            if (this._rowOutlet && this._rowOutlet.viewContainer.length) {
                this._forceRenderDataRows();
            }
        }
        /**
         * @return {?}
         */
        ngOnInit() {
            this._setupStickyStyler();
            if (this._isNativeHtmlTable) {
                this._applyNativeTableSections();
            }
            // Set up the trackBy function so that it uses the `RenderRow` as its identity by default. If
            // the user has provided a custom trackBy, return the result of that function as evaluated
            // with the values of the `RenderRow`'s data and index.
            this._dataDiffer = this._differs.find([]).create((/**
             * @param {?} _i
             * @param {?} dataRow
             * @return {?}
             */
            (_i, dataRow) => {
                return this.trackBy ? this.trackBy(dataRow.dataIndex, dataRow.data) : dataRow;
            }));
        }
        /**
         * @return {?}
         */
        ngAfterContentChecked() {
            // Cache the row and column definitions gathered by ContentChildren and programmatic injection.
            this._cacheRowDefs();
            this._cacheColumnDefs();
            // Make sure that the user has at least added header, footer, or data row def.
            if (!this._headerRowDefs.length && !this._footerRowDefs.length && !this._rowDefs.length) {
                throw getTableMissingRowDefsError();
            }
            // Render updates if the list of columns have been changed for the header, row, or footer defs.
            this._renderUpdatedColumns();
            // If the header row definition has been changed, trigger a render to the header row.
            if (this._headerRowDefChanged) {
                this._forceRenderHeaderRows();
                this._headerRowDefChanged = false;
            }
            // If the footer row definition has been changed, trigger a render to the footer row.
            if (this._footerRowDefChanged) {
                this._forceRenderFooterRows();
                this._footerRowDefChanged = false;
            }
            // If there is a data source and row definitions, connect to the data source unless a
            // connection has already been made.
            if (this.dataSource && this._rowDefs.length > 0 && !this._renderChangeSubscription) {
                this._observeRenderChanges();
            }
            this._checkStickyStates();
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this._rowOutlet.viewContainer.clear();
            this._noDataRowOutlet.viewContainer.clear();
            this._headerRowOutlet.viewContainer.clear();
            this._footerRowOutlet.viewContainer.clear();
            this._cachedRenderRowsMap.clear();
            this._onDestroy.next();
            this._onDestroy.complete();
            if (isDataSource(this.dataSource)) {
                this.dataSource.disconnect(this);
            }
        }
        /**
         * Renders rows based on the table's latest set of data, which was either provided directly as an
         * input or retrieved through an Observable stream (directly or from a DataSource).
         * Checks for differences in the data since the last diff to perform only the necessary
         * changes (add/remove/move rows).
         *
         * If the table's data source is a DataSource or Observable, this will be invoked automatically
         * each time the provided Observable stream emits a new data array. Otherwise if your data is
         * an array, this function will need to be called to render any changes.
         * @return {?}
         */
        renderRows() {
            this._renderRows = this._getAllRenderRows();
            /** @type {?} */
            const changes = this._dataDiffer.diff(this._renderRows);
            if (!changes) {
                return;
            }
            /** @type {?} */
            const viewContainer = this._rowOutlet.viewContainer;
            changes.forEachOperation((/**
             * @param {?} record
             * @param {?} prevIndex
             * @param {?} currentIndex
             * @return {?}
             */
            (record, prevIndex, currentIndex) => {
                if (record.previousIndex == null) {
                    this._insertRow(record.item, (/** @type {?} */ (currentIndex)));
                }
                else if (currentIndex == null) {
                    viewContainer.remove((/** @type {?} */ (prevIndex)));
                }
                else {
                    /** @type {?} */
                    const view = (/** @type {?} */ (viewContainer.get((/** @type {?} */ (prevIndex)))));
                    viewContainer.move((/** @type {?} */ (view)), currentIndex);
                }
            }));
            // Update the meta context of a row's context data (index, count, first, last, ...)
            this._updateRowIndexContext();
            // Update rows that did not get added/removed/moved but may have had their identity changed,
            // e.g. if trackBy matched data on some property but the actual data reference changed.
            changes.forEachIdentityChange((/**
             * @param {?} record
             * @return {?}
             */
            (record) => {
                /** @type {?} */
                const rowView = (/** @type {?} */ (viewContainer.get((/** @type {?} */ (record.currentIndex)))));
                rowView.context.$implicit = record.item.data;
            }));
            this._updateNoDataRow();
            this.updateStickyColumnStyles();
        }
        /**
         * Adds a column definition that was not included as part of the content children.
         * @param {?} columnDef
         * @return {?}
         */
        addColumnDef(columnDef) {
            this._customColumnDefs.add(columnDef);
        }
        /**
         * Removes a column definition that was not included as part of the content children.
         * @param {?} columnDef
         * @return {?}
         */
        removeColumnDef(columnDef) {
            this._customColumnDefs.delete(columnDef);
        }
        /**
         * Adds a row definition that was not included as part of the content children.
         * @param {?} rowDef
         * @return {?}
         */
        addRowDef(rowDef) {
            this._customRowDefs.add(rowDef);
        }
        /**
         * Removes a row definition that was not included as part of the content children.
         * @param {?} rowDef
         * @return {?}
         */
        removeRowDef(rowDef) {
            this._customRowDefs.delete(rowDef);
        }
        /**
         * Adds a header row definition that was not included as part of the content children.
         * @param {?} headerRowDef
         * @return {?}
         */
        addHeaderRowDef(headerRowDef) {
            this._customHeaderRowDefs.add(headerRowDef);
            this._headerRowDefChanged = true;
        }
        /**
         * Removes a header row definition that was not included as part of the content children.
         * @param {?} headerRowDef
         * @return {?}
         */
        removeHeaderRowDef(headerRowDef) {
            this._customHeaderRowDefs.delete(headerRowDef);
            this._headerRowDefChanged = true;
        }
        /**
         * Adds a footer row definition that was not included as part of the content children.
         * @param {?} footerRowDef
         * @return {?}
         */
        addFooterRowDef(footerRowDef) {
            this._customFooterRowDefs.add(footerRowDef);
            this._footerRowDefChanged = true;
        }
        /**
         * Removes a footer row definition that was not included as part of the content children.
         * @param {?} footerRowDef
         * @return {?}
         */
        removeFooterRowDef(footerRowDef) {
            this._customFooterRowDefs.delete(footerRowDef);
            this._footerRowDefChanged = true;
        }
        /**
         * Updates the header sticky styles. First resets all applied styles with respect to the cells
         * sticking to the top. Then, evaluating which cells need to be stuck to the top. This is
         * automatically called when the header row changes its displayed set of columns, or if its
         * sticky input changes. May be called manually for cases where the cell content changes outside
         * of these events.
         * @return {?}
         */
        updateStickyHeaderRowStyles() {
            /** @type {?} */
            const headerRows = this._getRenderedRows(this._headerRowOutlet);
            /** @type {?} */
            const tableElement = (/** @type {?} */ (this._elementRef.nativeElement));
            // Hide the thead element if there are no header rows. This is necessary to satisfy
            // overzealous a11y checkers that fail because the `rowgroup` element does not contain
            // required child `row`.
            /** @type {?} */
            const thead = tableElement.querySelector('thead');
            if (thead) {
                thead.style.display = headerRows.length ? '' : 'none';
            }
            /** @type {?} */
            const stickyStates = this._headerRowDefs.map((/**
             * @param {?} def
             * @return {?}
             */
            def => def.sticky));
            this._stickyStyler.clearStickyPositioning(headerRows, ['top']);
            this._stickyStyler.stickRows(headerRows, stickyStates, 'top');
            // Reset the dirty state of the sticky input change since it has been used.
            this._headerRowDefs.forEach((/**
             * @param {?} def
             * @return {?}
             */
            def => def.resetStickyChanged()));
        }
        /**
         * Updates the footer sticky styles. First resets all applied styles with respect to the cells
         * sticking to the bottom. Then, evaluating which cells need to be stuck to the bottom. This is
         * automatically called when the footer row changes its displayed set of columns, or if its
         * sticky input changes. May be called manually for cases where the cell content changes outside
         * of these events.
         * @return {?}
         */
        updateStickyFooterRowStyles() {
            /** @type {?} */
            const footerRows = this._getRenderedRows(this._footerRowOutlet);
            /** @type {?} */
            const tableElement = (/** @type {?} */ (this._elementRef.nativeElement));
            // Hide the tfoot element if there are no footer rows. This is necessary to satisfy
            // overzealous a11y checkers that fail because the `rowgroup` element does not contain
            // required child `row`.
            /** @type {?} */
            const tfoot = tableElement.querySelector('tfoot');
            if (tfoot) {
                tfoot.style.display = footerRows.length ? '' : 'none';
            }
            /** @type {?} */
            const stickyStates = this._footerRowDefs.map((/**
             * @param {?} def
             * @return {?}
             */
            def => def.sticky));
            this._stickyStyler.clearStickyPositioning(footerRows, ['bottom']);
            this._stickyStyler.stickRows(footerRows, stickyStates, 'bottom');
            this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement, stickyStates);
            // Reset the dirty state of the sticky input change since it has been used.
            this._footerRowDefs.forEach((/**
             * @param {?} def
             * @return {?}
             */
            def => def.resetStickyChanged()));
        }
        /**
         * Updates the column sticky styles. First resets all applied styles with respect to the cells
         * sticking to the left and right. Then sticky styles are added for the left and right according
         * to the column definitions for each cell in each row. This is automatically called when
         * the data source provides a new set of data or when a column definition changes its sticky
         * input. May be called manually for cases where the cell content changes outside of these events.
         * @return {?}
         */
        updateStickyColumnStyles() {
            /** @type {?} */
            const headerRows = this._getRenderedRows(this._headerRowOutlet);
            /** @type {?} */
            const dataRows = this._getRenderedRows(this._rowOutlet);
            /** @type {?} */
            const footerRows = this._getRenderedRows(this._footerRowOutlet);
            // Clear the left and right positioning from all columns in the table across all rows since
            // sticky columns span across all table sections (header, data, footer)
            this._stickyStyler.clearStickyPositioning([...headerRows, ...dataRows, ...footerRows], ['left', 'right']);
            // Update the sticky styles for each header row depending on the def's sticky state
            headerRows.forEach((/**
             * @param {?} headerRow
             * @param {?} i
             * @return {?}
             */
            (headerRow, i) => {
                this._addStickyColumnStyles([headerRow], this._headerRowDefs[i]);
            }));
            // Update the sticky styles for each data row depending on its def's sticky state
            this._rowDefs.forEach((/**
             * @param {?} rowDef
             * @return {?}
             */
            rowDef => {
                // Collect all the rows rendered with this row definition.
                /** @type {?} */
                const rows = [];
                for (let i = 0; i < dataRows.length; i++) {
                    if (this._renderRows[i].rowDef === rowDef) {
                        rows.push(dataRows[i]);
                    }
                }
                this._addStickyColumnStyles(rows, rowDef);
            }));
            // Update the sticky styles for each footer row depending on the def's sticky state
            footerRows.forEach((/**
             * @param {?} footerRow
             * @param {?} i
             * @return {?}
             */
            (footerRow, i) => {
                this._addStickyColumnStyles([footerRow], this._footerRowDefs[i]);
            }));
            // Reset the dirty state of the sticky input change since it has been used.
            Array.from(this._columnDefsByName.values()).forEach((/**
             * @param {?} def
             * @return {?}
             */
            def => def.resetStickyChanged()));
        }
        /**
         * Get the list of RenderRow objects to render according to the current list of data and defined
         * row definitions. If the previous list already contained a particular pair, it should be reused
         * so that the differ equates their references.
         * @private
         * @return {?}
         */
        _getAllRenderRows() {
            /** @type {?} */
            const renderRows = [];
            // Store the cache and create a new one. Any re-used RenderRow objects will be moved into the
            // new cache while unused ones can be picked up by garbage collection.
            /** @type {?} */
            const prevCachedRenderRows = this._cachedRenderRowsMap;
            this._cachedRenderRowsMap = new Map();
            // For each data object, get the list of rows that should be rendered, represented by the
            // respective `RenderRow` object which is the pair of `data` and `CdkRowDef`.
            for (let i = 0; i < this._data.length; i++) {
                /** @type {?} */
                let data = this._data[i];
                /** @type {?} */
                const renderRowsForData = this._getRenderRowsForData(data, i, prevCachedRenderRows.get(data));
                if (!this._cachedRenderRowsMap.has(data)) {
                    this._cachedRenderRowsMap.set(data, new WeakMap());
                }
                for (let j = 0; j < renderRowsForData.length; j++) {
                    /** @type {?} */
                    let renderRow = renderRowsForData[j];
                    /** @type {?} */
                    const cache = (/** @type {?} */ (this._cachedRenderRowsMap.get(renderRow.data)));
                    if (cache.has(renderRow.rowDef)) {
                        (/** @type {?} */ (cache.get(renderRow.rowDef))).push(renderRow);
                    }
                    else {
                        cache.set(renderRow.rowDef, [renderRow]);
                    }
                    renderRows.push(renderRow);
                }
            }
            return renderRows;
        }
        /**
         * Gets a list of `RenderRow<T>` for the provided data object and any `CdkRowDef` objects that
         * should be rendered for this data. Reuses the cached RenderRow objects if they match the same
         * `(T, CdkRowDef)` pair.
         * @private
         * @param {?} data
         * @param {?} dataIndex
         * @param {?=} cache
         * @return {?}
         */
        _getRenderRowsForData(data, dataIndex, cache) {
            /** @type {?} */
            const rowDefs = this._getRowDefs(data, dataIndex);
            return rowDefs.map((/**
             * @param {?} rowDef
             * @return {?}
             */
            rowDef => {
                /** @type {?} */
                const cachedRenderRows = (cache && cache.has(rowDef)) ? (/** @type {?} */ (cache.get(rowDef))) : [];
                if (cachedRenderRows.length) {
                    /** @type {?} */
                    const dataRow = (/** @type {?} */ (cachedRenderRows.shift()));
                    dataRow.dataIndex = dataIndex;
                    return dataRow;
                }
                else {
                    return { data, rowDef, dataIndex };
                }
            }));
        }
        /**
         * Update the map containing the content's column definitions.
         * @private
         * @return {?}
         */
        _cacheColumnDefs() {
            this._columnDefsByName.clear();
            /** @type {?} */
            const columnDefs = mergeArrayAndSet(this._getOwnDefs(this._contentColumnDefs), this._customColumnDefs);
            columnDefs.forEach((/**
             * @param {?} columnDef
             * @return {?}
             */
            columnDef => {
                if (this._columnDefsByName.has(columnDef.name)) {
                    throw getTableDuplicateColumnNameError(columnDef.name);
                }
                this._columnDefsByName.set(columnDef.name, columnDef);
            }));
        }
        /**
         * Update the list of all available row definitions that can be used.
         * @private
         * @return {?}
         */
        _cacheRowDefs() {
            this._headerRowDefs = mergeArrayAndSet(this._getOwnDefs(this._contentHeaderRowDefs), this._customHeaderRowDefs);
            this._footerRowDefs = mergeArrayAndSet(this._getOwnDefs(this._contentFooterRowDefs), this._customFooterRowDefs);
            this._rowDefs = mergeArrayAndSet(this._getOwnDefs(this._contentRowDefs), this._customRowDefs);
            // After all row definitions are determined, find the row definition to be considered default.
            /** @type {?} */
            const defaultRowDefs = this._rowDefs.filter((/**
             * @param {?} def
             * @return {?}
             */
            def => !def.when));
            if (!this.multiTemplateDataRows && defaultRowDefs.length > 1) {
                throw getTableMultipleDefaultRowDefsError();
            }
            this._defaultRowDef = defaultRowDefs[0];
        }
        /**
         * Check if the header, data, or footer rows have changed what columns they want to display or
         * whether the sticky states have changed for the header or footer. If there is a diff, then
         * re-render that section.
         * @private
         * @return {?}
         */
        _renderUpdatedColumns() {
            /** @type {?} */
            const columnsDiffReducer = (/**
             * @param {?} acc
             * @param {?} def
             * @return {?}
             */
            (acc, def) => acc || !!def.getColumnsDiff());
            // Force re-render data rows if the list of column definitions have changed.
            if (this._rowDefs.reduce(columnsDiffReducer, false)) {
                this._forceRenderDataRows();
            }
            // Force re-render header/footer rows if the list of column definitions have changed..
            if (this._headerRowDefs.reduce(columnsDiffReducer, false)) {
                this._forceRenderHeaderRows();
            }
            if (this._footerRowDefs.reduce(columnsDiffReducer, false)) {
                this._forceRenderFooterRows();
            }
        }
        /**
         * Switch to the provided data source by resetting the data and unsubscribing from the current
         * render change subscription if one exists. If the data source is null, interpret this by
         * clearing the row outlet. Otherwise start listening for new data.
         * @private
         * @param {?} dataSource
         * @return {?}
         */
        _switchDataSource(dataSource) {
            this._data = [];
            if (isDataSource(this.dataSource)) {
                this.dataSource.disconnect(this);
            }
            // Stop listening for data from the previous data source.
            if (this._renderChangeSubscription) {
                this._renderChangeSubscription.unsubscribe();
                this._renderChangeSubscription = null;
            }
            if (!dataSource) {
                if (this._dataDiffer) {
                    this._dataDiffer.diff([]);
                }
                this._rowOutlet.viewContainer.clear();
            }
            this._dataSource = dataSource;
        }
        /**
         * Set up a subscription for the data provided by the data source.
         * @private
         * @return {?}
         */
        _observeRenderChanges() {
            // If no data source has been set, there is nothing to observe for changes.
            if (!this.dataSource) {
                return;
            }
            /** @type {?} */
            let dataStream;
            if (isDataSource(this.dataSource)) {
                dataStream = this.dataSource.connect(this);
            }
            else if (isObservable(this.dataSource)) {
                dataStream = this.dataSource;
            }
            else if (Array.isArray(this.dataSource)) {
                dataStream = observableOf(this.dataSource);
            }
            if (dataStream === undefined) {
                throw getTableUnknownDataSourceError();
            }
            this._renderChangeSubscription = dataStream.pipe(takeUntil(this._onDestroy)).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                this._data = data || [];
                this.renderRows();
            }));
        }
        /**
         * Clears any existing content in the header row outlet and creates a new embedded view
         * in the outlet using the header row definition.
         * @private
         * @return {?}
         */
        _forceRenderHeaderRows() {
            // Clear the header row outlet if any content exists.
            if (this._headerRowOutlet.viewContainer.length > 0) {
                this._headerRowOutlet.viewContainer.clear();
            }
            this._headerRowDefs.forEach((/**
             * @param {?} def
             * @param {?} i
             * @return {?}
             */
            (def, i) => this._renderRow(this._headerRowOutlet, def, i)));
            this.updateStickyHeaderRowStyles();
            this.updateStickyColumnStyles();
        }
        /**
         * Clears any existing content in the footer row outlet and creates a new embedded view
         * in the outlet using the footer row definition.
         * @private
         * @return {?}
         */
        _forceRenderFooterRows() {
            // Clear the footer row outlet if any content exists.
            if (this._footerRowOutlet.viewContainer.length > 0) {
                this._footerRowOutlet.viewContainer.clear();
            }
            this._footerRowDefs.forEach((/**
             * @param {?} def
             * @param {?} i
             * @return {?}
             */
            (def, i) => this._renderRow(this._footerRowOutlet, def, i)));
            this.updateStickyFooterRowStyles();
            this.updateStickyColumnStyles();
        }
        /**
         * Adds the sticky column styles for the rows according to the columns' stick states.
         * @private
         * @param {?} rows
         * @param {?} rowDef
         * @return {?}
         */
        _addStickyColumnStyles(rows, rowDef) {
            /** @type {?} */
            const columnDefs = Array.from(rowDef.columns || []).map((/**
             * @param {?} columnName
             * @return {?}
             */
            columnName => {
                /** @type {?} */
                const columnDef = this._columnDefsByName.get(columnName);
                if (!columnDef) {
                    throw getTableUnknownColumnError(columnName);
                }
                return (/** @type {?} */ (columnDef));
            }));
            /** @type {?} */
            const stickyStartStates = columnDefs.map((/**
             * @param {?} columnDef
             * @return {?}
             */
            columnDef => columnDef.sticky));
            /** @type {?} */
            const stickyEndStates = columnDefs.map((/**
             * @param {?} columnDef
             * @return {?}
             */
            columnDef => columnDef.stickyEnd));
            this._stickyStyler.updateStickyColumns(rows, stickyStartStates, stickyEndStates);
        }
        /**
         * Gets the list of rows that have been rendered in the row outlet.
         * @param {?} rowOutlet
         * @return {?}
         */
        _getRenderedRows(rowOutlet) {
            /** @type {?} */
            const renderedRows = [];
            for (let i = 0; i < rowOutlet.viewContainer.length; i++) {
                /** @type {?} */
                const viewRef = ((/** @type {?} */ ((/** @type {?} */ (rowOutlet.viewContainer.get(i))))));
                renderedRows.push(viewRef.rootNodes[0]);
            }
            return renderedRows;
        }
        /**
         * Get the matching row definitions that should be used for this row data. If there is only
         * one row definition, it is returned. Otherwise, find the row definitions that has a when
         * predicate that returns true with the data. If none return true, return the default row
         * definition.
         * @param {?} data
         * @param {?} dataIndex
         * @return {?}
         */
        _getRowDefs(data, dataIndex) {
            if (this._rowDefs.length == 1) {
                return [this._rowDefs[0]];
            }
            /** @type {?} */
            let rowDefs = [];
            if (this.multiTemplateDataRows) {
                rowDefs = this._rowDefs.filter((/**
                 * @param {?} def
                 * @return {?}
                 */
                def => !def.when || def.when(dataIndex, data)));
            }
            else {
                /** @type {?} */
                let rowDef = this._rowDefs.find((/**
                 * @param {?} def
                 * @return {?}
                 */
                def => def.when && def.when(dataIndex, data))) || this._defaultRowDef;
                if (rowDef) {
                    rowDefs.push(rowDef);
                }
            }
            if (!rowDefs.length) {
                throw getTableMissingMatchingRowDefError(data);
            }
            return rowDefs;
        }
        /**
         * Create the embedded view for the data row template and place it in the correct index location
         * within the data row view container.
         * @private
         * @param {?} renderRow
         * @param {?} renderIndex
         * @return {?}
         */
        _insertRow(renderRow, renderIndex) {
            /** @type {?} */
            const rowDef = renderRow.rowDef;
            /** @type {?} */
            const context = { $implicit: renderRow.data };
            this._renderRow(this._rowOutlet, rowDef, renderIndex, context);
        }
        /**
         * Creates a new row template in the outlet and fills it with the set of cell templates.
         * Optionally takes a context to provide to the row and cells, as well as an optional index
         * of where to place the new row template in the outlet.
         * @private
         * @param {?} outlet
         * @param {?} rowDef
         * @param {?} index
         * @param {?=} context
         * @return {?}
         */
        _renderRow(outlet, rowDef, index, context = {}) {
            // TODO(andrewseguin): enforce that one outlet was instantiated from createEmbeddedView
            outlet.viewContainer.createEmbeddedView(rowDef.template, context, index);
            for (let cellTemplate of this._getCellTemplates(rowDef)) {
                if (CdkCellOutlet.mostRecentCellOutlet) {
                    CdkCellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(cellTemplate, context);
                }
            }
            this._changeDetectorRef.markForCheck();
        }
        /**
         * Updates the index-related context for each row to reflect any changes in the index of the rows,
         * e.g. first/last/even/odd.
         * @private
         * @return {?}
         */
        _updateRowIndexContext() {
            /** @type {?} */
            const viewContainer = this._rowOutlet.viewContainer;
            for (let renderIndex = 0, count = viewContainer.length; renderIndex < count; renderIndex++) {
                /** @type {?} */
                const viewRef = (/** @type {?} */ (viewContainer.get(renderIndex)));
                /** @type {?} */
                const context = (/** @type {?} */ (viewRef.context));
                context.count = count;
                context.first = renderIndex === 0;
                context.last = renderIndex === count - 1;
                context.even = renderIndex % 2 === 0;
                context.odd = !context.even;
                if (this.multiTemplateDataRows) {
                    context.dataIndex = this._renderRows[renderIndex].dataIndex;
                    context.renderIndex = renderIndex;
                }
                else {
                    context.index = this._renderRows[renderIndex].dataIndex;
                }
            }
        }
        /**
         * Gets the column definitions for the provided row def.
         * @private
         * @param {?} rowDef
         * @return {?}
         */
        _getCellTemplates(rowDef) {
            if (!rowDef || !rowDef.columns) {
                return [];
            }
            return Array.from(rowDef.columns, (/**
             * @param {?} columnId
             * @return {?}
             */
            columnId => {
                /** @type {?} */
                const column = this._columnDefsByName.get(columnId);
                if (!column) {
                    throw getTableUnknownColumnError(columnId);
                }
                return rowDef.extractCellTemplate(column);
            }));
        }
        /**
         * Adds native table sections (e.g. tbody) and moves the row outlets into them.
         * @private
         * @return {?}
         */
        _applyNativeTableSections() {
            /** @type {?} */
            const documentFragment = this._document.createDocumentFragment();
            /** @type {?} */
            const sections = [
                { tag: 'thead', outlets: [this._headerRowOutlet] },
                { tag: 'tbody', outlets: [this._rowOutlet, this._noDataRowOutlet] },
                { tag: 'tfoot', outlets: [this._footerRowOutlet] },
            ];
            for (const section of sections) {
                /** @type {?} */
                const element = this._document.createElement(section.tag);
                element.setAttribute('role', 'rowgroup');
                for (const outlet of section.outlets) {
                    element.appendChild(outlet.elementRef.nativeElement);
                }
                documentFragment.appendChild(element);
            }
            // Use a DocumentFragment so we don't hit the DOM on each iteration.
            this._elementRef.nativeElement.appendChild(documentFragment);
        }
        /**
         * Forces a re-render of the data rows. Should be called in cases where there has been an input
         * change that affects the evaluation of which rows should be rendered, e.g. toggling
         * `multiTemplateDataRows` or adding/removing row definitions.
         * @private
         * @return {?}
         */
        _forceRenderDataRows() {
            this._dataDiffer.diff([]);
            this._rowOutlet.viewContainer.clear();
            this.renderRows();
            this.updateStickyColumnStyles();
        }
        /**
         * Checks if there has been a change in sticky states since last check and applies the correct
         * sticky styles. Since checking resets the "dirty" state, this should only be performed once
         * during a change detection and after the inputs are settled (after content check).
         * @private
         * @return {?}
         */
        _checkStickyStates() {
            /** @type {?} */
            const stickyCheckReducer = (/**
             * @param {?} acc
             * @param {?} d
             * @return {?}
             */
            (acc, d) => {
                return acc || d.hasStickyChanged();
            });
            // Note that the check needs to occur for every definition since it notifies the definition
            // that it can reset its dirty state. Using another operator like `some` may short-circuit
            // remaining definitions and leave them in an unchecked state.
            if (this._headerRowDefs.reduce(stickyCheckReducer, false)) {
                this.updateStickyHeaderRowStyles();
            }
            if (this._footerRowDefs.reduce(stickyCheckReducer, false)) {
                this.updateStickyFooterRowStyles();
            }
            if (Array.from(this._columnDefsByName.values()).reduce(stickyCheckReducer, false)) {
                this.updateStickyColumnStyles();
            }
        }
        /**
         * Creates the sticky styler that will be used for sticky rows and columns. Listens
         * for directionality changes and provides the latest direction to the styler. Re-applies column
         * stickiness when directionality changes.
         * @private
         * @return {?}
         */
        _setupStickyStyler() {
            /** @type {?} */
            const direction = this._dir ? this._dir.value : 'ltr';
            this._stickyStyler = new StickyStyler(this._isNativeHtmlTable, this.stickyCssClass, direction, this._platform.isBrowser);
            (this._dir ? this._dir.change : observableOf())
                .pipe(takeUntil(this._onDestroy))
                .subscribe((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                this._stickyStyler.direction = value;
                this.updateStickyColumnStyles();
            }));
        }
        /**
         * Filters definitions that belong to this table from a QueryList.
         * @private
         * @template I
         * @param {?} items
         * @return {?}
         */
        _getOwnDefs(items) {
            return items.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => !item._table || item._table === this));
        }
        /**
         * Creates or removes the no data row, depending on whether any data is being shown.
         * @private
         * @return {?}
         */
        _updateNoDataRow() {
            if (this._noDataRow) {
                /** @type {?} */
                const shouldShow = this._rowOutlet.viewContainer.length === 0;
                if (shouldShow !== this._isShowingNoDataRow) {
                    /** @type {?} */
                    const container = this._noDataRowOutlet.viewContainer;
                    shouldShow ? container.createEmbeddedView(this._noDataRow.templateRef) : container.clear();
                    this._isShowingNoDataRow = shouldShow;
                }
            }
        }
    }
    CdkTable.decorators = [
        { type: Component, args: [{
                    selector: 'cdk-table, table[cdk-table]',
                    exportAs: 'cdkTable',
                    template: CDK_TABLE_TEMPLATE,
                    host: {
                        'class': 'cdk-table',
                    },
                    encapsulation: ViewEncapsulation.None,
                    // The "OnPush" status for the `MatTable` component is effectively a noop, so we are removing it.
                    // The view for `MatTable` consists entirely of templates declared in other views. As they are
                    // declared elsewhere, they are checked when their declaration points are checked.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    providers: [{ provide: CDK_TABLE, useExisting: CdkTable }]
                }] }
    ];
    /** @nocollapse */
    CdkTable.ctorParameters = () => [
        { type: IterableDiffers },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Platform }
    ];
    CdkTable.propDecorators = {
        trackBy: [{ type: Input }],
        dataSource: [{ type: Input }],
        multiTemplateDataRows: [{ type: Input }],
        _rowOutlet: [{ type: ViewChild, args: [DataRowOutlet, { static: true },] }],
        _headerRowOutlet: [{ type: ViewChild, args: [HeaderRowOutlet, { static: true },] }],
        _footerRowOutlet: [{ type: ViewChild, args: [FooterRowOutlet, { static: true },] }],
        _noDataRowOutlet: [{ type: ViewChild, args: [NoDataRowOutlet, { static: true },] }],
        _contentColumnDefs: [{ type: ContentChildren, args: [CdkColumnDef, { descendants: true },] }],
        _contentRowDefs: [{ type: ContentChildren, args: [CdkRowDef, { descendants: true },] }],
        _contentHeaderRowDefs: [{ type: ContentChildren, args: [CdkHeaderRowDef, {
                        descendants: true
                    },] }],
        _contentFooterRowDefs: [{ type: ContentChildren, args: [CdkFooterRowDef, {
                        descendants: true
                    },] }],
        _noDataRow: [{ type: ContentChild, args: [CdkNoDataRow,] }]
    };
    return CdkTable;
})();
export { CdkTable };
if (false) {
    /** @type {?} */
    CdkTable.ngAcceptInputType_multiTemplateDataRows;
    /**
     * @type {?}
     * @private
     */
    CdkTable.prototype._document;
    /**
     * Latest data provided by the data source.
     * @type {?}
     * @protected
     */
    CdkTable.prototype._data;
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     * @private
     */
    CdkTable.prototype._onDestroy;
    /**
     * List of the rendered rows as identified by their `RenderRow` object.
     * @type {?}
     * @private
     */
    CdkTable.prototype._renderRows;
    /**
     * Subscription that listens for the data provided by the data source.
     * @type {?}
     * @private
     */
    CdkTable.prototype._renderChangeSubscription;
    /**
     * Map of all the user's defined columns (header, data, and footer cell template) identified by
     * name. Collection populated by the column definitions gathered by `ContentChildren` as well as
     * any custom column definitions added to `_customColumnDefs`.
     * @type {?}
     * @private
     */
    CdkTable.prototype._columnDefsByName;
    /**
     * Set of all row definitions that can be used by this table. Populated by the rows gathered by
     * using `ContentChildren` as well as any custom row definitions added to `_customRowDefs`.
     * @type {?}
     * @private
     */
    CdkTable.prototype._rowDefs;
    /**
     * Set of all header row definitions that can be used by this table. Populated by the rows
     * gathered by using `ContentChildren` as well as any custom row definitions added to
     * `_customHeaderRowDefs`.
     * @type {?}
     * @private
     */
    CdkTable.prototype._headerRowDefs;
    /**
     * Set of all row definitions that can be used by this table. Populated by the rows gathered by
     * using `ContentChildren` as well as any custom row definitions added to
     * `_customFooterRowDefs`.
     * @type {?}
     * @private
     */
    CdkTable.prototype._footerRowDefs;
    /**
     * Differ used to find the changes in the data provided by the data source.
     * @type {?}
     * @private
     */
    CdkTable.prototype._dataDiffer;
    /**
     * Stores the row definition that does not have a when predicate.
     * @type {?}
     * @private
     */
    CdkTable.prototype._defaultRowDef;
    /**
     * Column definitions that were defined outside of the direct content children of the table.
     * These will be defined when, e.g., creating a wrapper around the cdkTable that has
     * column definitions as *its* content child.
     * @type {?}
     * @private
     */
    CdkTable.prototype._customColumnDefs;
    /**
     * Data row definitions that were defined outside of the direct content children of the table.
     * These will be defined when, e.g., creating a wrapper around the cdkTable that has
     * built-in data rows as *its* content child.
     * @type {?}
     * @private
     */
    CdkTable.prototype._customRowDefs;
    /**
     * Header row definitions that were defined outside of the direct content children of the table.
     * These will be defined when, e.g., creating a wrapper around the cdkTable that has
     * built-in header rows as *its* content child.
     * @type {?}
     * @private
     */
    CdkTable.prototype._customHeaderRowDefs;
    /**
     * Footer row definitions that were defined outside of the direct content children of the table.
     * These will be defined when, e.g., creating a wrapper around the cdkTable that has a
     * built-in footer row as *its* content child.
     * @type {?}
     * @private
     */
    CdkTable.prototype._customFooterRowDefs;
    /**
     * Whether the header row definition has been changed. Triggers an update to the header row after
     * content is checked. Initialized as true so that the table renders the initial set of rows.
     * @type {?}
     * @private
     */
    CdkTable.prototype._headerRowDefChanged;
    /**
     * Whether the footer row definition has been changed. Triggers an update to the footer row after
     * content is checked. Initialized as true so that the table renders the initial set of rows.
     * @type {?}
     * @private
     */
    CdkTable.prototype._footerRowDefChanged;
    /**
     * Cache of the latest rendered `RenderRow` objects as a map for easy retrieval when constructing
     * a new list of `RenderRow` objects for rendering rows. Since the new list is constructed with
     * the cached `RenderRow` objects when possible, the row identity is preserved when the data
     * and row template matches, which allows the `IterableDiffer` to check rows by reference
     * and understand which rows are added/moved/removed.
     *
     * Implemented as a map of maps where the first key is the `data: T` object and the second is the
     * `CdkRowDef<T>` object. With the two keys, the cache points to a `RenderRow<T>` object that
     * contains an array of created pairs. The array is necessary to handle cases where the data
     * array contains multiple duplicate data objects and each instantiated `RenderRow` must be
     * stored.
     * @type {?}
     * @private
     */
    CdkTable.prototype._cachedRenderRowsMap;
    /**
     * Whether the table is applied to a native `<table>`.
     * @type {?}
     * @private
     */
    CdkTable.prototype._isNativeHtmlTable;
    /**
     * Utility class that is responsible for applying the appropriate sticky positioning styles to
     * the table's rows and cells.
     * @type {?}
     * @private
     */
    CdkTable.prototype._stickyStyler;
    /**
     * CSS class added to any row or cell that has sticky positioning applied. May be overriden by
     * table subclasses.
     * @type {?}
     * @protected
     */
    CdkTable.prototype.stickyCssClass;
    /**
     * Whether the no data row is currently showing anything.
     * @type {?}
     * @private
     */
    CdkTable.prototype._isShowingNoDataRow;
    /**
     * @type {?}
     * @private
     */
    CdkTable.prototype._trackByFn;
    /**
     * @type {?}
     * @private
     */
    CdkTable.prototype._dataSource;
    /** @type {?} */
    CdkTable.prototype._multiTemplateDataRows;
    /**
     * Stream containing the latest information on what rows are being displayed on screen.
     * Can be used by the data source to as a heuristic of what data should be provided.
     *
     * \@docs-private
     * @type {?}
     */
    CdkTable.prototype.viewChange;
    /** @type {?} */
    CdkTable.prototype._rowOutlet;
    /** @type {?} */
    CdkTable.prototype._headerRowOutlet;
    /** @type {?} */
    CdkTable.prototype._footerRowOutlet;
    /** @type {?} */
    CdkTable.prototype._noDataRowOutlet;
    /**
     * The column definitions provided by the user that contain what the header, data, and footer
     * cells should render for each column.
     * @type {?}
     */
    CdkTable.prototype._contentColumnDefs;
    /**
     * Set of data row definitions that were provided to the table as content children.
     * @type {?}
     */
    CdkTable.prototype._contentRowDefs;
    /**
     * Set of header row definitions that were provided to the table as content children.
     * @type {?}
     */
    CdkTable.prototype._contentHeaderRowDefs;
    /**
     * Set of footer row definitions that were provided to the table as content children.
     * @type {?}
     */
    CdkTable.prototype._contentFooterRowDefs;
    /**
     * Row definition that will only be rendered if there's no data in the table.
     * @type {?}
     */
    CdkTable.prototype._noDataRow;
    /**
     * @type {?}
     * @protected
     */
    CdkTable.prototype._differs;
    /**
     * @type {?}
     * @protected
     */
    CdkTable.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @protected
     */
    CdkTable.prototype._elementRef;
    /**
     * @type {?}
     * @protected
     */
    CdkTable.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    CdkTable.prototype._platform;
}
/**
 * Utility function that gets a merged list of the entries in an array and values of a Set.
 * @template T
 * @param {?} array
 * @param {?} set
 * @return {?}
 */
function mergeArrayAndSet(array, set) {
    return array.concat(Array.from(set));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrL3RhYmxlL3RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBWSxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQStCLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3BGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixlQUFlLEVBQ2YsTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBR1QsZUFBZSxFQUdmLFFBQVEsRUFDUixTQUFTLEVBR1QsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxlQUFlLEVBRWYsRUFBRSxJQUFJLFlBQVksRUFDbEIsT0FBTyxFQUVQLFlBQVksR0FDYixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3BDLE9BQU8sRUFFTCxhQUFhLEVBR2IsZUFBZSxFQUNmLGVBQWUsRUFDZixTQUFTLEVBQ1QsWUFBWSxFQUNiLE1BQU0sT0FBTyxDQUFDO0FBQ2YsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFDTCxnQ0FBZ0MsRUFDaEMsa0NBQWtD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Ozs7Ozs7SUFHekMsK0JBQW9DOzs7Ozs7SUFHcEMsNkNBQXFEOzs7Ozs7OztJQU9yRCxxQ0FBNEQ7Ozs7Ozs7SUFNNUQsNEJBQWlDOzs7Ozs7OztJQU9qQyxrQ0FBMEM7Ozs7Ozs7O0lBTzFDLGtDQUEwQzs7Ozs7O0lBRzFDLCtCQUFrRDs7Ozs7O0lBR2xELGtDQUEwQzs7Ozs7Ozs7SUFPMUMscUNBQW9EOzs7Ozs7OztJQU9wRCxrQ0FBaUQ7Ozs7Ozs7O0lBT2pELHdDQUEwRDs7Ozs7Ozs7SUFPMUQsd0NBQTBEOzs7Ozs7O0lBTTFELHdDQUFvQzs7Ozs7OztJQU1wQyx3Q0FBb0M7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlcEMsd0NBQW1GOzs7Ozs7SUFHbkYsc0NBQW9DOzs7Ozs7O0lBTXBDLGlDQUFvQzs7Ozs7OztJQU1wQyxrQ0FBc0Q7Ozs7OztJQUd0RCx1Q0FBb0M7Ozs7O0lBbUJwQyw4QkFBdUM7Ozs7O0lBK0J2QywrQkFBZ0Q7O0lBcUJoRCwwQ0FBd0M7Ozs7Ozs7O0lBVXhDLDhCQUN5Rjs7SUFHekYsOEJBQW9FOztJQUNwRSxvQ0FBOEU7O0lBQzlFLG9DQUE4RTs7SUFDOUUsb0NBQThFOzs7Ozs7SUFNOUUsc0NBQWdHOzs7OztJQUdoRyxtQ0FBMEY7Ozs7O0lBRzFGLHlDQUVxRDs7Ozs7SUFHckQseUNBRXFEOzs7OztJQUdyRCw4QkFBcUQ7Ozs7O0lBR2pELDRCQUE0Qzs7Ozs7SUFDNUMsc0NBQXdEOzs7OztJQUN4RCwrQkFBMEM7Ozs7O0lBQzFDLHdCQUFtRDs7Ozs7SUFDbkQsNkJBQTJCOzs7Ozs7Ozs7QUErcUJqQyxTQUFTLGdCQUFnQixDQUFJLEtBQVUsRUFBRSxHQUFXO0lBQ2xELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NvbGxlY3Rpb25WaWV3ZXIsIERhdGFTb3VyY2UsIGlzRGF0YVNvdXJjZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgaXNEZXZNb2RlLFxuICBJdGVyYWJsZUNoYW5nZVJlY29yZCxcbiAgSXRlcmFibGVEaWZmZXIsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBUcmFja0J5RnVuY3Rpb24sXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENvbnRlbnRDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YgYXMgb2JzZXJ2YWJsZU9mLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG4gIGlzT2JzZXJ2YWJsZSxcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDZGtDb2x1bW5EZWZ9IGZyb20gJy4vY2VsbCc7XG5pbXBvcnQge1xuICBCYXNlUm93RGVmLFxuICBDZGtDZWxsT3V0bGV0LFxuICBDZGtDZWxsT3V0bGV0TXVsdGlSb3dDb250ZXh0LFxuICBDZGtDZWxsT3V0bGV0Um93Q29udGV4dCxcbiAgQ2RrRm9vdGVyUm93RGVmLFxuICBDZGtIZWFkZXJSb3dEZWYsXG4gIENka1Jvd0RlZixcbiAgQ2RrTm9EYXRhUm93XG59IGZyb20gJy4vcm93JztcbmltcG9ydCB7U3RpY2t5U3R5bGVyfSBmcm9tICcuL3N0aWNreS1zdHlsZXInO1xuaW1wb3J0IHtcbiAgZ2V0VGFibGVEdXBsaWNhdGVDb2x1bW5OYW1lRXJyb3IsXG4gIGdldFRhYmxlTWlzc2luZ01hdGNoaW5nUm93RGVmRXJyb3IsXG4gIGdldFRhYmxlTWlzc2luZ1Jvd0RlZnNFcnJvcixcbiAgZ2V0VGFibGVNdWx0aXBsZURlZmF1bHRSb3dEZWZzRXJyb3IsXG4gIGdldFRhYmxlVW5rbm93bkNvbHVtbkVycm9yLFxuICBnZXRUYWJsZVVua25vd25EYXRhU291cmNlRXJyb3Jcbn0gZnJvbSAnLi90YWJsZS1lcnJvcnMnO1xuaW1wb3J0IHtDREtfVEFCTEV9IGZyb20gJy4vdG9rZW5zJztcblxuLyoqIEludGVyZmFjZSB1c2VkIHRvIHByb3ZpZGUgYW4gb3V0bGV0IGZvciByb3dzIHRvIGJlIGluc2VydGVkIGludG8uICovXG5leHBvcnQgaW50ZXJmYWNlIFJvd091dGxldCB7XG4gIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG59XG5cbi8qKlxuICogVW5pb24gb2YgdGhlIHR5cGVzIHRoYXQgY2FuIGJlIHNldCBhcyB0aGUgZGF0YSBzb3VyY2UgZm9yIGEgYENka1RhYmxlYC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xudHlwZSBDZGtUYWJsZURhdGFTb3VyY2VJbnB1dDxUPiA9XG4gICAgRGF0YVNvdXJjZTxUPnxPYnNlcnZhYmxlPFJlYWRvbmx5QXJyYXk8VD58VFtdPnxSZWFkb25seUFycmF5PFQ+fFRbXTtcblxuLyoqXG4gKiBQcm92aWRlcyBhIGhhbmRsZSBmb3IgdGhlIHRhYmxlIHRvIGdyYWIgdGhlIHZpZXcgY29udGFpbmVyJ3MgbmctY29udGFpbmVyIHRvIGluc2VydCBkYXRhIHJvd3MuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW3Jvd091dGxldF0nfSlcbmV4cG9ydCBjbGFzcyBEYXRhUm93T3V0bGV0IGltcGxlbWVudHMgUm93T3V0bGV0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgaGFuZGxlIGZvciB0aGUgdGFibGUgdG8gZ3JhYiB0aGUgdmlldyBjb250YWluZXIncyBuZy1jb250YWluZXIgdG8gaW5zZXJ0IHRoZSBoZWFkZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2hlYWRlclJvd091dGxldF0nfSlcbmV4cG9ydCBjbGFzcyBIZWFkZXJSb3dPdXRsZXQgaW1wbGVtZW50cyBSb3dPdXRsZXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYSBoYW5kbGUgZm9yIHRoZSB0YWJsZSB0byBncmFiIHRoZSB2aWV3IGNvbnRhaW5lcidzIG5nLWNvbnRhaW5lciB0byBpbnNlcnQgdGhlIGZvb3Rlci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbZm9vdGVyUm93T3V0bGV0XSd9KVxuZXhwb3J0IGNsYXNzIEZvb3RlclJvd091dGxldCBpbXBsZW1lbnRzIFJvd091dGxldCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhIGhhbmRsZSBmb3IgdGhlIHRhYmxlIHRvIGdyYWIgdGhlIHZpZXdcbiAqIGNvbnRhaW5lcidzIG5nLWNvbnRhaW5lciB0byBpbnNlcnQgdGhlIG5vIGRhdGEgcm93LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tub0RhdGFSb3dPdXRsZXRdJ30pXG5leHBvcnQgY2xhc3MgTm9EYXRhUm93T3V0bGV0IGltcGxlbWVudHMgUm93T3V0bGV0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vKipcbiAqIFRoZSB0YWJsZSB0ZW1wbGF0ZSB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBtYXQtdGFibGUuIFNob3VsZCBub3QgYmUgdXNlZCBvdXRzaWRlIG9mIHRoZVxuICogbWF0ZXJpYWwgbGlicmFyeS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IENES19UQUJMRV9URU1QTEFURSA9XG4gICAgLy8gTm90ZSB0aGF0IGFjY29yZGluZyB0byBNRE4sIHRoZSBgY2FwdGlvbmAgZWxlbWVudCBoYXMgdG8gYmUgcHJvamVjdGVkIGFzIHRoZSAqKmZpcnN0KipcbiAgICAvLyBlbGVtZW50IGluIHRoZSB0YWJsZS4gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9jYXB0aW9uXG4gICAgYFxuICA8bmctY29udGVudCBzZWxlY3Q9XCJjYXB0aW9uXCI+PC9uZy1jb250ZW50PlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJjb2xncm91cCwgY29sXCI+PC9uZy1jb250ZW50PlxuICA8bmctY29udGFpbmVyIGhlYWRlclJvd091dGxldD48L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciByb3dPdXRsZXQ+PC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250YWluZXIgbm9EYXRhUm93T3V0bGV0PjwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyIGZvb3RlclJvd091dGxldD48L25nLWNvbnRhaW5lcj5cbmA7XG5cbi8qKlxuICogSW50ZXJmYWNlIHVzZWQgdG8gY29udmVuaWVudGx5IHR5cGUgdGhlIHBvc3NpYmxlIGNvbnRleHQgaW50ZXJmYWNlcyBmb3IgdGhlIHJlbmRlciByb3cuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm93Q29udGV4dDxUPiBleHRlbmRzIENka0NlbGxPdXRsZXRNdWx0aVJvd0NvbnRleHQ8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZGtDZWxsT3V0bGV0Um93Q29udGV4dDxUPiB7fVxuXG4vKipcbiAqIENsYXNzIHVzZWQgdG8gY29udmVuaWVudGx5IHR5cGUgdGhlIGVtYmVkZGVkIHZpZXcgcmVmIGZvciByb3dzIHdpdGggYSBjb250ZXh0LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5hYnN0cmFjdCBjbGFzcyBSb3dWaWV3UmVmPFQ+IGV4dGVuZHMgRW1iZWRkZWRWaWV3UmVmPFJvd0NvbnRleHQ8VD4+IHt9XG5cbi8qKlxuICogU2V0IG9mIHByb3BlcnRpZXMgdGhhdCByZXByZXNlbnRzIHRoZSBpZGVudGl0eSBvZiBhIHNpbmdsZSByZW5kZXJlZCByb3cuXG4gKlxuICogV2hlbiB0aGUgdGFibGUgbmVlZHMgdG8gZGV0ZXJtaW5lIHRoZSBsaXN0IG9mIHJvd3MgdG8gcmVuZGVyLCBpdCB3aWxsIGRvIHNvIGJ5IGl0ZXJhdGluZyB0aHJvdWdoXG4gKiBlYWNoIGRhdGEgb2JqZWN0IGFuZCBldmFsdWF0aW5nIGl0cyBsaXN0IG9mIHJvdyB0ZW1wbGF0ZXMgdG8gZGlzcGxheSAod2hlbiBtdWx0aVRlbXBsYXRlRGF0YVJvd3NcbiAqIGlzIGZhbHNlLCB0aGVyZSBpcyBvbmx5IG9uZSB0ZW1wbGF0ZSBwZXIgZGF0YSBvYmplY3QpLiBGb3IgZWFjaCBwYWlyIG9mIGRhdGEgb2JqZWN0IGFuZCByb3dcbiAqIHRlbXBsYXRlLCBhIGBSZW5kZXJSb3dgIGlzIGFkZGVkIHRvIHRoZSBsaXN0IG9mIHJvd3MgdG8gcmVuZGVyLiBJZiB0aGUgZGF0YSBvYmplY3QgYW5kIHJvd1xuICogdGVtcGxhdGUgcGFpciBoYXMgYWxyZWFkeSBiZWVuIHJlbmRlcmVkLCB0aGUgcHJldmlvdXNseSB1c2VkIGBSZW5kZXJSb3dgIGlzIGFkZGVkOyBlbHNlIGEgbmV3XG4gKiBgUmVuZGVyUm93YCBpcyAqIGNyZWF0ZWQuIE9uY2UgdGhlIGxpc3QgaXMgY29tcGxldGUgYW5kIGFsbCBkYXRhIG9iamVjdHMgaGF2ZSBiZWVuIGl0ZXJlYXRlZFxuICogdGhyb3VnaCwgYSBkaWZmIGlzIHBlcmZvcm1lZCB0byBkZXRlcm1pbmUgdGhlIGNoYW5nZXMgdGhhdCBuZWVkIHRvIGJlIG1hZGUgdG8gdGhlIHJlbmRlcmVkIHJvd3MuXG4gKlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclJvdzxUPiB7XG4gIGRhdGE6IFQ7XG4gIGRhdGFJbmRleDogbnVtYmVyO1xuICByb3dEZWY6IENka1Jvd0RlZjxUPjtcbn1cblxuLyoqXG4gKiBBIGRhdGEgdGFibGUgdGhhdCBjYW4gcmVuZGVyIGEgaGVhZGVyIHJvdywgZGF0YSByb3dzLCBhbmQgYSBmb290ZXIgcm93LlxuICogVXNlcyB0aGUgZGF0YVNvdXJjZSBpbnB1dCB0byBkZXRlcm1pbmUgdGhlIGRhdGEgdG8gYmUgcmVuZGVyZWQuIFRoZSBkYXRhIGNhbiBiZSBwcm92aWRlZCBlaXRoZXJcbiAqIGFzIGEgZGF0YSBhcnJheSwgYW4gT2JzZXJ2YWJsZSBzdHJlYW0gdGhhdCBlbWl0cyB0aGUgZGF0YSBhcnJheSB0byByZW5kZXIsIG9yIGEgRGF0YVNvdXJjZSB3aXRoIGFcbiAqIGNvbm5lY3QgZnVuY3Rpb24gdGhhdCB3aWxsIHJldHVybiBhbiBPYnNlcnZhYmxlIHN0cmVhbSB0aGF0IGVtaXRzIHRoZSBkYXRhIGFycmF5IHRvIHJlbmRlci5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2RrLXRhYmxlLCB0YWJsZVtjZGstdGFibGVdJyxcbiAgZXhwb3J0QXM6ICdjZGtUYWJsZScsXG4gIHRlbXBsYXRlOiBDREtfVEFCTEVfVEVNUExBVEUsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnY2RrLXRhYmxlJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gVGhlIFwiT25QdXNoXCIgc3RhdHVzIGZvciB0aGUgYE1hdFRhYmxlYCBjb21wb25lbnQgaXMgZWZmZWN0aXZlbHkgYSBub29wLCBzbyB3ZSBhcmUgcmVtb3ZpbmcgaXQuXG4gIC8vIFRoZSB2aWV3IGZvciBgTWF0VGFibGVgIGNvbnNpc3RzIGVudGlyZWx5IG9mIHRlbXBsYXRlcyBkZWNsYXJlZCBpbiBvdGhlciB2aWV3cy4gQXMgdGhleSBhcmVcbiAgLy8gZGVjbGFyZWQgZWxzZXdoZXJlLCB0aGV5IGFyZSBjaGVja2VkIHdoZW4gdGhlaXIgZGVjbGFyYXRpb24gcG9pbnRzIGFyZSBjaGVja2VkLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBDREtfVEFCTEUsIHVzZUV4aXN0aW5nOiBDZGtUYWJsZX1dXG59KVxuZXhwb3J0IGNsYXNzIENka1RhYmxlPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29sbGVjdGlvblZpZXdlciwgT25EZXN0cm95LCBPbkluaXQge1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgLyoqIExhdGVzdCBkYXRhIHByb3ZpZGVkIGJ5IHRoZSBkYXRhIHNvdXJjZS4gKi9cbiAgcHJvdGVjdGVkIF9kYXRhOiBUW118UmVhZG9ubHlBcnJheTxUPjtcblxuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIExpc3Qgb2YgdGhlIHJlbmRlcmVkIHJvd3MgYXMgaWRlbnRpZmllZCBieSB0aGVpciBgUmVuZGVyUm93YCBvYmplY3QuICovXG4gIHByaXZhdGUgX3JlbmRlclJvd3M6IFJlbmRlclJvdzxUPltdO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdGhhdCBsaXN0ZW5zIGZvciB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gIHByaXZhdGUgX3JlbmRlckNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9ufG51bGw7XG5cbiAgLyoqXG4gICAqIE1hcCBvZiBhbGwgdGhlIHVzZXIncyBkZWZpbmVkIGNvbHVtbnMgKGhlYWRlciwgZGF0YSwgYW5kIGZvb3RlciBjZWxsIHRlbXBsYXRlKSBpZGVudGlmaWVkIGJ5XG4gICAqIG5hbWUuIENvbGxlY3Rpb24gcG9wdWxhdGVkIGJ5IHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgZ2F0aGVyZWQgYnkgYENvbnRlbnRDaGlsZHJlbmAgYXMgd2VsbCBhc1xuICAgKiBhbnkgY3VzdG9tIGNvbHVtbiBkZWZpbml0aW9ucyBhZGRlZCB0byBgX2N1c3RvbUNvbHVtbkRlZnNgLlxuICAgKi9cbiAgcHJpdmF0ZSBfY29sdW1uRGVmc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBDZGtDb2x1bW5EZWY+KCk7XG5cbiAgLyoqXG4gICAqIFNldCBvZiBhbGwgcm93IGRlZmluaXRpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgdGhpcyB0YWJsZS4gUG9wdWxhdGVkIGJ5IHRoZSByb3dzIGdhdGhlcmVkIGJ5XG4gICAqIHVzaW5nIGBDb250ZW50Q2hpbGRyZW5gIGFzIHdlbGwgYXMgYW55IGN1c3RvbSByb3cgZGVmaW5pdGlvbnMgYWRkZWQgdG8gYF9jdXN0b21Sb3dEZWZzYC5cbiAgICovXG4gIHByaXZhdGUgX3Jvd0RlZnM6IENka1Jvd0RlZjxUPltdO1xuXG4gIC8qKlxuICAgKiBTZXQgb2YgYWxsIGhlYWRlciByb3cgZGVmaW5pdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGlzIHRhYmxlLiBQb3B1bGF0ZWQgYnkgdGhlIHJvd3NcbiAgICogZ2F0aGVyZWQgYnkgdXNpbmcgYENvbnRlbnRDaGlsZHJlbmAgYXMgd2VsbCBhcyBhbnkgY3VzdG9tIHJvdyBkZWZpbml0aW9ucyBhZGRlZCB0b1xuICAgKiBgX2N1c3RvbUhlYWRlclJvd0RlZnNgLlxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyUm93RGVmczogQ2RrSGVhZGVyUm93RGVmW107XG5cbiAgLyoqXG4gICAqIFNldCBvZiBhbGwgcm93IGRlZmluaXRpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgdGhpcyB0YWJsZS4gUG9wdWxhdGVkIGJ5IHRoZSByb3dzIGdhdGhlcmVkIGJ5XG4gICAqIHVzaW5nIGBDb250ZW50Q2hpbGRyZW5gIGFzIHdlbGwgYXMgYW55IGN1c3RvbSByb3cgZGVmaW5pdGlvbnMgYWRkZWQgdG9cbiAgICogYF9jdXN0b21Gb290ZXJSb3dEZWZzYC5cbiAgICovXG4gIHByaXZhdGUgX2Zvb3RlclJvd0RlZnM6IENka0Zvb3RlclJvd0RlZltdO1xuXG4gIC8qKiBEaWZmZXIgdXNlZCB0byBmaW5kIHRoZSBjaGFuZ2VzIGluIHRoZSBkYXRhIHByb3ZpZGVkIGJ5IHRoZSBkYXRhIHNvdXJjZS4gKi9cbiAgcHJpdmF0ZSBfZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8UmVuZGVyUm93PFQ+PjtcblxuICAvKiogU3RvcmVzIHRoZSByb3cgZGVmaW5pdGlvbiB0aGF0IGRvZXMgbm90IGhhdmUgYSB3aGVuIHByZWRpY2F0ZS4gKi9cbiAgcHJpdmF0ZSBfZGVmYXVsdFJvd0RlZjogQ2RrUm93RGVmPFQ+fG51bGw7XG5cbiAgLyoqXG4gICAqIENvbHVtbiBkZWZpbml0aW9ucyB0aGF0IHdlcmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBkaXJlY3QgY29udGVudCBjaGlsZHJlbiBvZiB0aGUgdGFibGUuXG4gICAqIFRoZXNlIHdpbGwgYmUgZGVmaW5lZCB3aGVuLCBlLmcuLCBjcmVhdGluZyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBjZGtUYWJsZSB0aGF0IGhhc1xuICAgKiBjb2x1bW4gZGVmaW5pdGlvbnMgYXMgKml0cyogY29udGVudCBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2N1c3RvbUNvbHVtbkRlZnMgPSBuZXcgU2V0PENka0NvbHVtbkRlZj4oKTtcblxuICAvKipcbiAgICogRGF0YSByb3cgZGVmaW5pdGlvbnMgdGhhdCB3ZXJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgZGlyZWN0IGNvbnRlbnQgY2hpbGRyZW4gb2YgdGhlIHRhYmxlLlxuICAgKiBUaGVzZSB3aWxsIGJlIGRlZmluZWQgd2hlbiwgZS5nLiwgY3JlYXRpbmcgYSB3cmFwcGVyIGFyb3VuZCB0aGUgY2RrVGFibGUgdGhhdCBoYXNcbiAgICogYnVpbHQtaW4gZGF0YSByb3dzIGFzICppdHMqIGNvbnRlbnQgY2hpbGQuXG4gICAqL1xuICBwcml2YXRlIF9jdXN0b21Sb3dEZWZzID0gbmV3IFNldDxDZGtSb3dEZWY8VD4+KCk7XG5cbiAgLyoqXG4gICAqIEhlYWRlciByb3cgZGVmaW5pdGlvbnMgdGhhdCB3ZXJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgZGlyZWN0IGNvbnRlbnQgY2hpbGRyZW4gb2YgdGhlIHRhYmxlLlxuICAgKiBUaGVzZSB3aWxsIGJlIGRlZmluZWQgd2hlbiwgZS5nLiwgY3JlYXRpbmcgYSB3cmFwcGVyIGFyb3VuZCB0aGUgY2RrVGFibGUgdGhhdCBoYXNcbiAgICogYnVpbHQtaW4gaGVhZGVyIHJvd3MgYXMgKml0cyogY29udGVudCBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2N1c3RvbUhlYWRlclJvd0RlZnMgPSBuZXcgU2V0PENka0hlYWRlclJvd0RlZj4oKTtcblxuICAvKipcbiAgICogRm9vdGVyIHJvdyBkZWZpbml0aW9ucyB0aGF0IHdlcmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBkaXJlY3QgY29udGVudCBjaGlsZHJlbiBvZiB0aGUgdGFibGUuXG4gICAqIFRoZXNlIHdpbGwgYmUgZGVmaW5lZCB3aGVuLCBlLmcuLCBjcmVhdGluZyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBjZGtUYWJsZSB0aGF0IGhhcyBhXG4gICAqIGJ1aWx0LWluIGZvb3RlciByb3cgYXMgKml0cyogY29udGVudCBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2N1c3RvbUZvb3RlclJvd0RlZnMgPSBuZXcgU2V0PENka0Zvb3RlclJvd0RlZj4oKTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgaGVhZGVyIHJvdyBkZWZpbml0aW9uIGhhcyBiZWVuIGNoYW5nZWQuIFRyaWdnZXJzIGFuIHVwZGF0ZSB0byB0aGUgaGVhZGVyIHJvdyBhZnRlclxuICAgKiBjb250ZW50IGlzIGNoZWNrZWQuIEluaXRpYWxpemVkIGFzIHRydWUgc28gdGhhdCB0aGUgdGFibGUgcmVuZGVycyB0aGUgaW5pdGlhbCBzZXQgb2Ygcm93cy5cbiAgICovXG4gIHByaXZhdGUgX2hlYWRlclJvd0RlZkNoYW5nZWQgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBmb290ZXIgcm93IGRlZmluaXRpb24gaGFzIGJlZW4gY2hhbmdlZC4gVHJpZ2dlcnMgYW4gdXBkYXRlIHRvIHRoZSBmb290ZXIgcm93IGFmdGVyXG4gICAqIGNvbnRlbnQgaXMgY2hlY2tlZC4gSW5pdGlhbGl6ZWQgYXMgdHJ1ZSBzbyB0aGF0IHRoZSB0YWJsZSByZW5kZXJzIHRoZSBpbml0aWFsIHNldCBvZiByb3dzLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyUm93RGVmQ2hhbmdlZCA9IHRydWU7XG5cbiAgLyoqXG4gICAqIENhY2hlIG9mIHRoZSBsYXRlc3QgcmVuZGVyZWQgYFJlbmRlclJvd2Agb2JqZWN0cyBhcyBhIG1hcCBmb3IgZWFzeSByZXRyaWV2YWwgd2hlbiBjb25zdHJ1Y3RpbmdcbiAgICogYSBuZXcgbGlzdCBvZiBgUmVuZGVyUm93YCBvYmplY3RzIGZvciByZW5kZXJpbmcgcm93cy4gU2luY2UgdGhlIG5ldyBsaXN0IGlzIGNvbnN0cnVjdGVkIHdpdGhcbiAgICogdGhlIGNhY2hlZCBgUmVuZGVyUm93YCBvYmplY3RzIHdoZW4gcG9zc2libGUsIHRoZSByb3cgaWRlbnRpdHkgaXMgcHJlc2VydmVkIHdoZW4gdGhlIGRhdGFcbiAgICogYW5kIHJvdyB0ZW1wbGF0ZSBtYXRjaGVzLCB3aGljaCBhbGxvd3MgdGhlIGBJdGVyYWJsZURpZmZlcmAgdG8gY2hlY2sgcm93cyBieSByZWZlcmVuY2VcbiAgICogYW5kIHVuZGVyc3RhbmQgd2hpY2ggcm93cyBhcmUgYWRkZWQvbW92ZWQvcmVtb3ZlZC5cbiAgICpcbiAgICogSW1wbGVtZW50ZWQgYXMgYSBtYXAgb2YgbWFwcyB3aGVyZSB0aGUgZmlyc3Qga2V5IGlzIHRoZSBgZGF0YTogVGAgb2JqZWN0IGFuZCB0aGUgc2Vjb25kIGlzIHRoZVxuICAgKiBgQ2RrUm93RGVmPFQ+YCBvYmplY3QuIFdpdGggdGhlIHR3byBrZXlzLCB0aGUgY2FjaGUgcG9pbnRzIHRvIGEgYFJlbmRlclJvdzxUPmAgb2JqZWN0IHRoYXRcbiAgICogY29udGFpbnMgYW4gYXJyYXkgb2YgY3JlYXRlZCBwYWlycy4gVGhlIGFycmF5IGlzIG5lY2Vzc2FyeSB0byBoYW5kbGUgY2FzZXMgd2hlcmUgdGhlIGRhdGFcbiAgICogYXJyYXkgY29udGFpbnMgbXVsdGlwbGUgZHVwbGljYXRlIGRhdGEgb2JqZWN0cyBhbmQgZWFjaCBpbnN0YW50aWF0ZWQgYFJlbmRlclJvd2AgbXVzdCBiZVxuICAgKiBzdG9yZWQuXG4gICAqL1xuICBwcml2YXRlIF9jYWNoZWRSZW5kZXJSb3dzTWFwID0gbmV3IE1hcDxULCBXZWFrTWFwPENka1Jvd0RlZjxUPiwgUmVuZGVyUm93PFQ+W10+PigpO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB0YWJsZSBpcyBhcHBsaWVkIHRvIGEgbmF0aXZlIGA8dGFibGU+YC4gKi9cbiAgcHJpdmF0ZSBfaXNOYXRpdmVIdG1sVGFibGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgY2xhc3MgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgYXBwbHlpbmcgdGhlIGFwcHJvcHJpYXRlIHN0aWNreSBwb3NpdGlvbmluZyBzdHlsZXMgdG9cbiAgICogdGhlIHRhYmxlJ3Mgcm93cyBhbmQgY2VsbHMuXG4gICAqL1xuICBwcml2YXRlIF9zdGlja3lTdHlsZXI6IFN0aWNreVN0eWxlcjtcblxuICAvKipcbiAgICogQ1NTIGNsYXNzIGFkZGVkIHRvIGFueSByb3cgb3IgY2VsbCB0aGF0IGhhcyBzdGlja3kgcG9zaXRpb25pbmcgYXBwbGllZC4gTWF5IGJlIG92ZXJyaWRlbiBieVxuICAgKiB0YWJsZSBzdWJjbGFzc2VzLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN0aWNreUNzc0NsYXNzOiBzdHJpbmcgPSAnY2RrLXRhYmxlLXN0aWNreSc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG5vIGRhdGEgcm93IGlzIGN1cnJlbnRseSBzaG93aW5nIGFueXRoaW5nLiAqL1xuICBwcml2YXRlIF9pc1Nob3dpbmdOb0RhdGFSb3cgPSBmYWxzZTtcblxuICAvKipcbiAgICogVHJhY2tpbmcgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gY2hlY2sgdGhlIGRpZmZlcmVuY2VzIGluIGRhdGEgY2hhbmdlcy4gVXNlZCBzaW1pbGFybHlcbiAgICogdG8gYG5nRm9yYCBgdHJhY2tCeWAgZnVuY3Rpb24uIE9wdGltaXplIHJvdyBvcGVyYXRpb25zIGJ5IGlkZW50aWZ5aW5nIGEgcm93IGJhc2VkIG9uIGl0cyBkYXRhXG4gICAqIHJlbGF0aXZlIHRvIHRoZSBmdW5jdGlvbiB0byBrbm93IGlmIGEgcm93IHNob3VsZCBiZSBhZGRlZC9yZW1vdmVkL21vdmVkLlxuICAgKiBBY2NlcHRzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyB0d28gcGFyYW1ldGVycywgYGluZGV4YCBhbmQgYGl0ZW1gLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHRyYWNrQnkoKTogVHJhY2tCeUZ1bmN0aW9uPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fdHJhY2tCeUZuO1xuICB9XG4gIHNldCB0cmFja0J5KGZuOiBUcmFja0J5RnVuY3Rpb248VD4pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgZm4gIT0gbnVsbCAmJiB0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicgJiYgPGFueT5jb25zb2xlICYmXG4gICAgICAgIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oYHRyYWNrQnkgbXVzdCBiZSBhIGZ1bmN0aW9uLCBidXQgcmVjZWl2ZWQgJHtKU09OLnN0cmluZ2lmeShmbil9LmApO1xuICAgIH1cbiAgICB0aGlzLl90cmFja0J5Rm4gPSBmbjtcbiAgfVxuICBwcml2YXRlIF90cmFja0J5Rm46IFRyYWNrQnlGdW5jdGlvbjxUPjtcblxuICAvKipcbiAgICogVGhlIHRhYmxlJ3Mgc291cmNlIG9mIGRhdGEsIHdoaWNoIGNhbiBiZSBwcm92aWRlZCBpbiB0aHJlZSB3YXlzIChpbiBvcmRlciBvZiBjb21wbGV4aXR5KTpcbiAgICogICAtIFNpbXBsZSBkYXRhIGFycmF5IChlYWNoIG9iamVjdCByZXByZXNlbnRzIG9uZSB0YWJsZSByb3cpXG4gICAqICAgLSBTdHJlYW0gdGhhdCBlbWl0cyBhIGRhdGEgYXJyYXkgZWFjaCB0aW1lIHRoZSBhcnJheSBjaGFuZ2VzXG4gICAqICAgLSBgRGF0YVNvdXJjZWAgb2JqZWN0IHRoYXQgaW1wbGVtZW50cyB0aGUgY29ubmVjdC9kaXNjb25uZWN0IGludGVyZmFjZS5cbiAgICpcbiAgICogSWYgYSBkYXRhIGFycmF5IGlzIHByb3ZpZGVkLCB0aGUgdGFibGUgbXVzdCBiZSBub3RpZmllZCB3aGVuIHRoZSBhcnJheSdzIG9iamVjdHMgYXJlXG4gICAqIGFkZGVkLCByZW1vdmVkLCBvciBtb3ZlZC4gVGhpcyBjYW4gYmUgZG9uZSBieSBjYWxsaW5nIHRoZSBgcmVuZGVyUm93cygpYCBmdW5jdGlvbiB3aGljaCB3aWxsXG4gICAqIHJlbmRlciB0aGUgZGlmZiBzaW5jZSB0aGUgbGFzdCB0YWJsZSByZW5kZXIuIElmIHRoZSBkYXRhIGFycmF5IHJlZmVyZW5jZSBpcyBjaGFuZ2VkLCB0aGUgdGFibGVcbiAgICogd2lsbCBhdXRvbWF0aWNhbGx5IHRyaWdnZXIgYW4gdXBkYXRlIHRvIHRoZSByb3dzLlxuICAgKlxuICAgKiBXaGVuIHByb3ZpZGluZyBhbiBPYnNlcnZhYmxlIHN0cmVhbSwgdGhlIHRhYmxlIHdpbGwgdHJpZ2dlciBhbiB1cGRhdGUgYXV0b21hdGljYWxseSB3aGVuIHRoZVxuICAgKiBzdHJlYW0gZW1pdHMgYSBuZXcgYXJyYXkgb2YgZGF0YS5cbiAgICpcbiAgICogRmluYWxseSwgd2hlbiBwcm92aWRpbmcgYSBgRGF0YVNvdXJjZWAgb2JqZWN0LCB0aGUgdGFibGUgd2lsbCB1c2UgdGhlIE9ic2VydmFibGUgc3RyZWFtXG4gICAqIHByb3ZpZGVkIGJ5IHRoZSBjb25uZWN0IGZ1bmN0aW9uIGFuZCB0cmlnZ2VyIHVwZGF0ZXMgd2hlbiB0aGF0IHN0cmVhbSBlbWl0cyBuZXcgZGF0YSBhcnJheVxuICAgKiB2YWx1ZXMuIER1cmluZyB0aGUgdGFibGUncyBuZ09uRGVzdHJveSBvciB3aGVuIHRoZSBkYXRhIHNvdXJjZSBpcyByZW1vdmVkIGZyb20gdGhlIHRhYmxlLCB0aGVcbiAgICogdGFibGUgd2lsbCBjYWxsIHRoZSBEYXRhU291cmNlJ3MgYGRpc2Nvbm5lY3RgIGZ1bmN0aW9uIChtYXkgYmUgdXNlZnVsIGZvciBjbGVhbmluZyB1cCBhbnlcbiAgICogc3Vic2NyaXB0aW9ucyByZWdpc3RlcmVkIGR1cmluZyB0aGUgY29ubmVjdCBwcm9jZXNzKS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBkYXRhU291cmNlKCk6IENka1RhYmxlRGF0YVNvdXJjZUlucHV0PFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgfVxuICBzZXQgZGF0YVNvdXJjZShkYXRhU291cmNlOiBDZGtUYWJsZURhdGFTb3VyY2VJbnB1dDxUPikge1xuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICE9PSBkYXRhU291cmNlKSB7XG4gICAgICB0aGlzLl9zd2l0Y2hEYXRhU291cmNlKGRhdGFTb3VyY2UpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9kYXRhU291cmNlOiBDZGtUYWJsZURhdGFTb3VyY2VJbnB1dDxUPjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBhbGxvdyBtdWx0aXBsZSByb3dzIHBlciBkYXRhIG9iamVjdCBieSBldmFsdWF0aW5nIHdoaWNoIHJvd3MgZXZhbHVhdGUgdGhlaXIgJ3doZW4nXG4gICAqIHByZWRpY2F0ZSB0byB0cnVlLiBJZiBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBpcyBmYWxzZSwgd2hpY2ggaXMgdGhlIGRlZmF1bHQgdmFsdWUsIHRoZW4gZWFjaFxuICAgKiBkYXRhb2JqZWN0IHdpbGwgcmVuZGVyIHRoZSBmaXJzdCByb3cgdGhhdCBldmFsdWF0ZXMgaXRzIHdoZW4gcHJlZGljYXRlIHRvIHRydWUsIGluIHRoZSBvcmRlclxuICAgKiBkZWZpbmVkIGluIHRoZSB0YWJsZSwgb3Igb3RoZXJ3aXNlIHRoZSBkZWZhdWx0IHJvdyB3aGljaCBkb2VzIG5vdCBoYXZlIGEgd2hlbiBwcmVkaWNhdGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlUZW1wbGF0ZURhdGFSb3dzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aVRlbXBsYXRlRGF0YVJvd3M7XG4gIH1cbiAgc2V0IG11bHRpVGVtcGxhdGVEYXRhUm93cyh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlUZW1wbGF0ZURhdGFSb3dzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuXG4gICAgLy8gSW4gSXZ5IGlmIHRoaXMgdmFsdWUgaXMgc2V0IHZpYSBhIHN0YXRpYyBhdHRyaWJ1dGUgKGUuZy4gPHRhYmxlIG11bHRpVGVtcGxhdGVEYXRhUm93cz4pLFxuICAgIC8vIHRoaXMgc2V0dGVyIHdpbGwgYmUgaW52b2tlZCBiZWZvcmUgdGhlIHJvdyBvdXRsZXQgaGFzIGJlZW4gZGVmaW5lZCBoZW5jZSB0aGUgbnVsbCBjaGVjay5cbiAgICBpZiAodGhpcy5fcm93T3V0bGV0ICYmIHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZm9yY2VSZW5kZXJEYXRhUm93cygpO1xuICAgIH1cbiAgfVxuICBfbXVsdGlUZW1wbGF0ZURhdGFSb3dzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gVE9ETyhhbmRyZXdzZWd1aW4pOiBSZW1vdmUgbWF4IHZhbHVlIGFzIHRoZSBlbmQgaW5kZXhcbiAgLy8gICBhbmQgaW5zdGVhZCBjYWxjdWxhdGUgdGhlIHZpZXcgb24gaW5pdCBhbmQgc2Nyb2xsLlxuICAvKipcbiAgICogU3RyZWFtIGNvbnRhaW5pbmcgdGhlIGxhdGVzdCBpbmZvcm1hdGlvbiBvbiB3aGF0IHJvd3MgYXJlIGJlaW5nIGRpc3BsYXllZCBvbiBzY3JlZW4uXG4gICAqIENhbiBiZSB1c2VkIGJ5IHRoZSBkYXRhIHNvdXJjZSB0byBhcyBhIGhldXJpc3RpYyBvZiB3aGF0IGRhdGEgc2hvdWxkIGJlIHByb3ZpZGVkLlxuICAgKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICB2aWV3Q2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8e3N0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyfT4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDx7c3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXJ9Pih7c3RhcnQ6IDAsIGVuZDogTnVtYmVyLk1BWF9WQUxVRX0pO1xuXG4gIC8vIE91dGxldHMgaW4gdGhlIHRhYmxlJ3MgdGVtcGxhdGUgd2hlcmUgdGhlIGhlYWRlciwgZGF0YSByb3dzLCBhbmQgZm9vdGVyIHdpbGwgYmUgaW5zZXJ0ZWQuXG4gIEBWaWV3Q2hpbGQoRGF0YVJvd091dGxldCwge3N0YXRpYzogdHJ1ZX0pIF9yb3dPdXRsZXQ6IERhdGFSb3dPdXRsZXQ7XG4gIEBWaWV3Q2hpbGQoSGVhZGVyUm93T3V0bGV0LCB7c3RhdGljOiB0cnVlfSkgX2hlYWRlclJvd091dGxldDogSGVhZGVyUm93T3V0bGV0O1xuICBAVmlld0NoaWxkKEZvb3RlclJvd091dGxldCwge3N0YXRpYzogdHJ1ZX0pIF9mb290ZXJSb3dPdXRsZXQ6IEZvb3RlclJvd091dGxldDtcbiAgQFZpZXdDaGlsZChOb0RhdGFSb3dPdXRsZXQsIHtzdGF0aWM6IHRydWV9KSBfbm9EYXRhUm93T3V0bGV0OiBOb0RhdGFSb3dPdXRsZXQ7XG5cbiAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgcHJvdmlkZWQgYnkgdGhlIHVzZXIgdGhhdCBjb250YWluIHdoYXQgdGhlIGhlYWRlciwgZGF0YSwgYW5kIGZvb3RlclxuICAgKiBjZWxscyBzaG91bGQgcmVuZGVyIGZvciBlYWNoIGNvbHVtbi5cbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2RrQ29sdW1uRGVmLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfY29udGVudENvbHVtbkRlZnM6IFF1ZXJ5TGlzdDxDZGtDb2x1bW5EZWY+O1xuXG4gIC8qKiBTZXQgb2YgZGF0YSByb3cgZGVmaW5pdGlvbnMgdGhhdCB3ZXJlIHByb3ZpZGVkIHRvIHRoZSB0YWJsZSBhcyBjb250ZW50IGNoaWxkcmVuLiAqL1xuICBAQ29udGVudENoaWxkcmVuKENka1Jvd0RlZiwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgX2NvbnRlbnRSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrUm93RGVmPFQ+PjtcblxuICAvKiogU2V0IG9mIGhlYWRlciByb3cgZGVmaW5pdGlvbnMgdGhhdCB3ZXJlIHByb3ZpZGVkIHRvIHRoZSB0YWJsZSBhcyBjb250ZW50IGNoaWxkcmVuLiAqL1xuICBAQ29udGVudENoaWxkcmVuKENka0hlYWRlclJvd0RlZiwge1xuICAgIGRlc2NlbmRhbnRzOiB0cnVlXG4gIH0pIF9jb250ZW50SGVhZGVyUm93RGVmczogUXVlcnlMaXN0PENka0hlYWRlclJvd0RlZj47XG5cbiAgLyoqIFNldCBvZiBmb290ZXIgcm93IGRlZmluaXRpb25zIHRoYXQgd2VyZSBwcm92aWRlZCB0byB0aGUgdGFibGUgYXMgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDZGtGb290ZXJSb3dEZWYsIHtcbiAgICBkZXNjZW5kYW50czogdHJ1ZVxuICB9KSBfY29udGVudEZvb3RlclJvd0RlZnM6IFF1ZXJ5TGlzdDxDZGtGb290ZXJSb3dEZWY+O1xuXG4gIC8qKiBSb3cgZGVmaW5pdGlvbiB0aGF0IHdpbGwgb25seSBiZSByZW5kZXJlZCBpZiB0aGVyZSdzIG5vIGRhdGEgaW4gdGhlIHRhYmxlLiAqL1xuICBAQ29udGVudENoaWxkKENka05vRGF0YVJvdykgX25vRGF0YVJvdzogQ2RrTm9EYXRhUm93O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQEF0dHJpYnV0ZSgncm9sZScpIHJvbGU6IHN0cmluZyxcbiAgICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCByZWFkb25seSBfZGlyOiBEaXJlY3Rpb25hbGl0eSwgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICBpZiAoIXJvbGUpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZ3JpZCcpO1xuICAgIH1cblxuICAgIHRoaXMuX2RvY3VtZW50ID0gX2RvY3VtZW50O1xuICAgIHRoaXMuX2lzTmF0aXZlSHRtbFRhYmxlID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lID09PSAnVEFCTEUnO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fc2V0dXBTdGlja3lTdHlsZXIoKTtcblxuICAgIGlmICh0aGlzLl9pc05hdGl2ZUh0bWxUYWJsZSkge1xuICAgICAgdGhpcy5fYXBwbHlOYXRpdmVUYWJsZVNlY3Rpb25zKCk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHVwIHRoZSB0cmFja0J5IGZ1bmN0aW9uIHNvIHRoYXQgaXQgdXNlcyB0aGUgYFJlbmRlclJvd2AgYXMgaXRzIGlkZW50aXR5IGJ5IGRlZmF1bHQuIElmXG4gICAgLy8gdGhlIHVzZXIgaGFzIHByb3ZpZGVkIGEgY3VzdG9tIHRyYWNrQnksIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb24gYXMgZXZhbHVhdGVkXG4gICAgLy8gd2l0aCB0aGUgdmFsdWVzIG9mIHRoZSBgUmVuZGVyUm93YCdzIGRhdGEgYW5kIGluZGV4LlxuICAgIHRoaXMuX2RhdGFEaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgoX2k6IG51bWJlciwgZGF0YVJvdzogUmVuZGVyUm93PFQ+KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy50cmFja0J5ID8gdGhpcy50cmFja0J5KGRhdGFSb3cuZGF0YUluZGV4LCBkYXRhUm93LmRhdGEpIDogZGF0YVJvdztcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBDYWNoZSB0aGUgcm93IGFuZCBjb2x1bW4gZGVmaW5pdGlvbnMgZ2F0aGVyZWQgYnkgQ29udGVudENoaWxkcmVuIGFuZCBwcm9ncmFtbWF0aWMgaW5qZWN0aW9uLlxuICAgIHRoaXMuX2NhY2hlUm93RGVmcygpO1xuICAgIHRoaXMuX2NhY2hlQ29sdW1uRGVmcygpO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHVzZXIgaGFzIGF0IGxlYXN0IGFkZGVkIGhlYWRlciwgZm9vdGVyLCBvciBkYXRhIHJvdyBkZWYuXG4gICAgaWYgKCF0aGlzLl9oZWFkZXJSb3dEZWZzLmxlbmd0aCAmJiAhdGhpcy5fZm9vdGVyUm93RGVmcy5sZW5ndGggJiYgIXRoaXMuX3Jvd0RlZnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBnZXRUYWJsZU1pc3NpbmdSb3dEZWZzRXJyb3IoKTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgdXBkYXRlcyBpZiB0aGUgbGlzdCBvZiBjb2x1bW5zIGhhdmUgYmVlbiBjaGFuZ2VkIGZvciB0aGUgaGVhZGVyLCByb3csIG9yIGZvb3RlciBkZWZzLlxuICAgIHRoaXMuX3JlbmRlclVwZGF0ZWRDb2x1bW5zKCk7XG5cbiAgICAvLyBJZiB0aGUgaGVhZGVyIHJvdyBkZWZpbml0aW9uIGhhcyBiZWVuIGNoYW5nZWQsIHRyaWdnZXIgYSByZW5kZXIgdG8gdGhlIGhlYWRlciByb3cuXG4gICAgaWYgKHRoaXMuX2hlYWRlclJvd0RlZkNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX2ZvcmNlUmVuZGVySGVhZGVyUm93cygpO1xuICAgICAgdGhpcy5faGVhZGVyUm93RGVmQ2hhbmdlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBmb290ZXIgcm93IGRlZmluaXRpb24gaGFzIGJlZW4gY2hhbmdlZCwgdHJpZ2dlciBhIHJlbmRlciB0byB0aGUgZm9vdGVyIHJvdy5cbiAgICBpZiAodGhpcy5fZm9vdGVyUm93RGVmQ2hhbmdlZCkge1xuICAgICAgdGhpcy5fZm9yY2VSZW5kZXJGb290ZXJSb3dzKCk7XG4gICAgICB0aGlzLl9mb290ZXJSb3dEZWZDaGFuZ2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSBkYXRhIHNvdXJjZSBhbmQgcm93IGRlZmluaXRpb25zLCBjb25uZWN0IHRvIHRoZSBkYXRhIHNvdXJjZSB1bmxlc3MgYVxuICAgIC8vIGNvbm5lY3Rpb24gaGFzIGFscmVhZHkgYmVlbiBtYWRlLlxuICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5fcm93RGVmcy5sZW5ndGggPiAwICYmICF0aGlzLl9yZW5kZXJDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX29ic2VydmVSZW5kZXJDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hlY2tTdGlja3lTdGF0ZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgdGhpcy5fbm9EYXRhUm93T3V0bGV0LnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICB0aGlzLl9oZWFkZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIHRoaXMuX2Zvb3RlclJvd091dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICB0aGlzLl9jYWNoZWRSZW5kZXJSb3dzTWFwLmNsZWFyKCk7XG5cbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuXG4gICAgaWYgKGlzRGF0YVNvdXJjZSh0aGlzLmRhdGFTb3VyY2UpKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGlzY29ubmVjdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVycyByb3dzIGJhc2VkIG9uIHRoZSB0YWJsZSdzIGxhdGVzdCBzZXQgb2YgZGF0YSwgd2hpY2ggd2FzIGVpdGhlciBwcm92aWRlZCBkaXJlY3RseSBhcyBhblxuICAgKiBpbnB1dCBvciByZXRyaWV2ZWQgdGhyb3VnaCBhbiBPYnNlcnZhYmxlIHN0cmVhbSAoZGlyZWN0bHkgb3IgZnJvbSBhIERhdGFTb3VyY2UpLlxuICAgKiBDaGVja3MgZm9yIGRpZmZlcmVuY2VzIGluIHRoZSBkYXRhIHNpbmNlIHRoZSBsYXN0IGRpZmYgdG8gcGVyZm9ybSBvbmx5IHRoZSBuZWNlc3NhcnlcbiAgICogY2hhbmdlcyAoYWRkL3JlbW92ZS9tb3ZlIHJvd3MpLlxuICAgKlxuICAgKiBJZiB0aGUgdGFibGUncyBkYXRhIHNvdXJjZSBpcyBhIERhdGFTb3VyY2Ugb3IgT2JzZXJ2YWJsZSwgdGhpcyB3aWxsIGJlIGludm9rZWQgYXV0b21hdGljYWxseVxuICAgKiBlYWNoIHRpbWUgdGhlIHByb3ZpZGVkIE9ic2VydmFibGUgc3RyZWFtIGVtaXRzIGEgbmV3IGRhdGEgYXJyYXkuIE90aGVyd2lzZSBpZiB5b3VyIGRhdGEgaXNcbiAgICogYW4gYXJyYXksIHRoaXMgZnVuY3Rpb24gd2lsbCBuZWVkIHRvIGJlIGNhbGxlZCB0byByZW5kZXIgYW55IGNoYW5nZXMuXG4gICAqL1xuICByZW5kZXJSb3dzKCkge1xuICAgIHRoaXMuX3JlbmRlclJvd3MgPSB0aGlzLl9nZXRBbGxSZW5kZXJSb3dzKCk7XG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX2RhdGFEaWZmZXIuZGlmZih0aGlzLl9yZW5kZXJSb3dzKTtcbiAgICBpZiAoIWNoYW5nZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2aWV3Q29udGFpbmVyID0gdGhpcy5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG5cbiAgICBjaGFuZ2VzLmZvckVhY2hPcGVyYXRpb24oXG4gICAgICAgIChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFJlbmRlclJvdzxUPj4sIHByZXZJbmRleDogbnVtYmVyfG51bGwsXG4gICAgICAgICBjdXJyZW50SW5kZXg6IG51bWJlcnxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHJlY29yZC5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc2VydFJvdyhyZWNvcmQuaXRlbSwgY3VycmVudEluZGV4ISk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgdmlld0NvbnRhaW5lci5yZW1vdmUocHJldkluZGV4ISk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSA8Um93Vmlld1JlZjxUPj52aWV3Q29udGFpbmVyLmdldChwcmV2SW5kZXghKTtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXIubW92ZSh2aWV3ISwgY3VycmVudEluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBtZXRhIGNvbnRleHQgb2YgYSByb3cncyBjb250ZXh0IGRhdGEgKGluZGV4LCBjb3VudCwgZmlyc3QsIGxhc3QsIC4uLilcbiAgICB0aGlzLl91cGRhdGVSb3dJbmRleENvbnRleHQoKTtcblxuICAgIC8vIFVwZGF0ZSByb3dzIHRoYXQgZGlkIG5vdCBnZXQgYWRkZWQvcmVtb3ZlZC9tb3ZlZCBidXQgbWF5IGhhdmUgaGFkIHRoZWlyIGlkZW50aXR5IGNoYW5nZWQsXG4gICAgLy8gZS5nLiBpZiB0cmFja0J5IG1hdGNoZWQgZGF0YSBvbiBzb21lIHByb3BlcnR5IGJ1dCB0aGUgYWN0dWFsIGRhdGEgcmVmZXJlbmNlIGNoYW5nZWQuXG4gICAgY2hhbmdlcy5mb3JFYWNoSWRlbnRpdHlDaGFuZ2UoKHJlY29yZDogSXRlcmFibGVDaGFuZ2VSZWNvcmQ8UmVuZGVyUm93PFQ+PikgPT4ge1xuICAgICAgY29uc3Qgcm93VmlldyA9IDxSb3dWaWV3UmVmPFQ+PnZpZXdDb250YWluZXIuZ2V0KHJlY29yZC5jdXJyZW50SW5kZXghKTtcbiAgICAgIHJvd1ZpZXcuY29udGV4dC4kaW1wbGljaXQgPSByZWNvcmQuaXRlbS5kYXRhO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fdXBkYXRlTm9EYXRhUm93KCk7XG4gICAgdGhpcy51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgfVxuXG4gIC8qKiBBZGRzIGEgY29sdW1uIGRlZmluaXRpb24gdGhhdCB3YXMgbm90IGluY2x1ZGVkIGFzIHBhcnQgb2YgdGhlIGNvbnRlbnQgY2hpbGRyZW4uICovXG4gIGFkZENvbHVtbkRlZihjb2x1bW5EZWY6IENka0NvbHVtbkRlZikge1xuICAgIHRoaXMuX2N1c3RvbUNvbHVtbkRlZnMuYWRkKGNvbHVtbkRlZik7XG4gIH1cblxuICAvKiogUmVtb3ZlcyBhIGNvbHVtbiBkZWZpbml0aW9uIHRoYXQgd2FzIG5vdCBpbmNsdWRlZCBhcyBwYXJ0IG9mIHRoZSBjb250ZW50IGNoaWxkcmVuLiAqL1xuICByZW1vdmVDb2x1bW5EZWYoY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYpIHtcbiAgICB0aGlzLl9jdXN0b21Db2x1bW5EZWZzLmRlbGV0ZShjb2x1bW5EZWYpO1xuICB9XG5cbiAgLyoqIEFkZHMgYSByb3cgZGVmaW5pdGlvbiB0aGF0IHdhcyBub3QgaW5jbHVkZWQgYXMgcGFydCBvZiB0aGUgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgYWRkUm93RGVmKHJvd0RlZjogQ2RrUm93RGVmPFQ+KSB7XG4gICAgdGhpcy5fY3VzdG9tUm93RGVmcy5hZGQocm93RGVmKTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVzIGEgcm93IGRlZmluaXRpb24gdGhhdCB3YXMgbm90IGluY2x1ZGVkIGFzIHBhcnQgb2YgdGhlIGNvbnRlbnQgY2hpbGRyZW4uICovXG4gIHJlbW92ZVJvd0RlZihyb3dEZWY6IENka1Jvd0RlZjxUPikge1xuICAgIHRoaXMuX2N1c3RvbVJvd0RlZnMuZGVsZXRlKHJvd0RlZik7XG4gIH1cblxuICAvKiogQWRkcyBhIGhlYWRlciByb3cgZGVmaW5pdGlvbiB0aGF0IHdhcyBub3QgaW5jbHVkZWQgYXMgcGFydCBvZiB0aGUgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgYWRkSGVhZGVyUm93RGVmKGhlYWRlclJvd0RlZjogQ2RrSGVhZGVyUm93RGVmKSB7XG4gICAgdGhpcy5fY3VzdG9tSGVhZGVyUm93RGVmcy5hZGQoaGVhZGVyUm93RGVmKTtcbiAgICB0aGlzLl9oZWFkZXJSb3dEZWZDaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVzIGEgaGVhZGVyIHJvdyBkZWZpbml0aW9uIHRoYXQgd2FzIG5vdCBpbmNsdWRlZCBhcyBwYXJ0IG9mIHRoZSBjb250ZW50IGNoaWxkcmVuLiAqL1xuICByZW1vdmVIZWFkZXJSb3dEZWYoaGVhZGVyUm93RGVmOiBDZGtIZWFkZXJSb3dEZWYpIHtcbiAgICB0aGlzLl9jdXN0b21IZWFkZXJSb3dEZWZzLmRlbGV0ZShoZWFkZXJSb3dEZWYpO1xuICAgIHRoaXMuX2hlYWRlclJvd0RlZkNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqIEFkZHMgYSBmb290ZXIgcm93IGRlZmluaXRpb24gdGhhdCB3YXMgbm90IGluY2x1ZGVkIGFzIHBhcnQgb2YgdGhlIGNvbnRlbnQgY2hpbGRyZW4uICovXG4gIGFkZEZvb3RlclJvd0RlZihmb290ZXJSb3dEZWY6IENka0Zvb3RlclJvd0RlZikge1xuICAgIHRoaXMuX2N1c3RvbUZvb3RlclJvd0RlZnMuYWRkKGZvb3RlclJvd0RlZik7XG4gICAgdGhpcy5fZm9vdGVyUm93RGVmQ2hhbmdlZCA9IHRydWU7XG4gIH1cblxuICAvKiogUmVtb3ZlcyBhIGZvb3RlciByb3cgZGVmaW5pdGlvbiB0aGF0IHdhcyBub3QgaW5jbHVkZWQgYXMgcGFydCBvZiB0aGUgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgcmVtb3ZlRm9vdGVyUm93RGVmKGZvb3RlclJvd0RlZjogQ2RrRm9vdGVyUm93RGVmKSB7XG4gICAgdGhpcy5fY3VzdG9tRm9vdGVyUm93RGVmcy5kZWxldGUoZm9vdGVyUm93RGVmKTtcbiAgICB0aGlzLl9mb290ZXJSb3dEZWZDaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBoZWFkZXIgc3RpY2t5IHN0eWxlcy4gRmlyc3QgcmVzZXRzIGFsbCBhcHBsaWVkIHN0eWxlcyB3aXRoIHJlc3BlY3QgdG8gdGhlIGNlbGxzXG4gICAqIHN0aWNraW5nIHRvIHRoZSB0b3AuIFRoZW4sIGV2YWx1YXRpbmcgd2hpY2ggY2VsbHMgbmVlZCB0byBiZSBzdHVjayB0byB0aGUgdG9wLiBUaGlzIGlzXG4gICAqIGF1dG9tYXRpY2FsbHkgY2FsbGVkIHdoZW4gdGhlIGhlYWRlciByb3cgY2hhbmdlcyBpdHMgZGlzcGxheWVkIHNldCBvZiBjb2x1bW5zLCBvciBpZiBpdHNcbiAgICogc3RpY2t5IGlucHV0IGNoYW5nZXMuIE1heSBiZSBjYWxsZWQgbWFudWFsbHkgZm9yIGNhc2VzIHdoZXJlIHRoZSBjZWxsIGNvbnRlbnQgY2hhbmdlcyBvdXRzaWRlXG4gICAqIG9mIHRoZXNlIGV2ZW50cy5cbiAgICovXG4gIHVwZGF0ZVN0aWNreUhlYWRlclJvd1N0eWxlcygpOiB2b2lkIHtcbiAgICBjb25zdCBoZWFkZXJSb3dzID0gdGhpcy5fZ2V0UmVuZGVyZWRSb3dzKHRoaXMuX2hlYWRlclJvd091dGxldCk7XG4gICAgY29uc3QgdGFibGVFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgLy8gSGlkZSB0aGUgdGhlYWQgZWxlbWVudCBpZiB0aGVyZSBhcmUgbm8gaGVhZGVyIHJvd3MuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIHNhdGlzZnlcbiAgICAvLyBvdmVyemVhbG91cyBhMTF5IGNoZWNrZXJzIHRoYXQgZmFpbCBiZWNhdXNlIHRoZSBgcm93Z3JvdXBgIGVsZW1lbnQgZG9lcyBub3QgY29udGFpblxuICAgIC8vIHJlcXVpcmVkIGNoaWxkIGByb3dgLlxuICAgIGNvbnN0IHRoZWFkID0gdGFibGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkJyk7XG4gICAgaWYgKHRoZWFkKSB7XG4gICAgICB0aGVhZC5zdHlsZS5kaXNwbGF5ID0gaGVhZGVyUm93cy5sZW5ndGggPyAnJyA6ICdub25lJztcbiAgICB9XG5cbiAgICBjb25zdCBzdGlja3lTdGF0ZXMgPSB0aGlzLl9oZWFkZXJSb3dEZWZzLm1hcChkZWYgPT4gZGVmLnN0aWNreSk7XG4gICAgdGhpcy5fc3RpY2t5U3R5bGVyLmNsZWFyU3RpY2t5UG9zaXRpb25pbmcoaGVhZGVyUm93cywgWyd0b3AnXSk7XG4gICAgdGhpcy5fc3RpY2t5U3R5bGVyLnN0aWNrUm93cyhoZWFkZXJSb3dzLCBzdGlja3lTdGF0ZXMsICd0b3AnKTtcblxuICAgIC8vIFJlc2V0IHRoZSBkaXJ0eSBzdGF0ZSBvZiB0aGUgc3RpY2t5IGlucHV0IGNoYW5nZSBzaW5jZSBpdCBoYXMgYmVlbiB1c2VkLlxuICAgIHRoaXMuX2hlYWRlclJvd0RlZnMuZm9yRWFjaChkZWYgPT4gZGVmLnJlc2V0U3RpY2t5Q2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBmb290ZXIgc3RpY2t5IHN0eWxlcy4gRmlyc3QgcmVzZXRzIGFsbCBhcHBsaWVkIHN0eWxlcyB3aXRoIHJlc3BlY3QgdG8gdGhlIGNlbGxzXG4gICAqIHN0aWNraW5nIHRvIHRoZSBib3R0b20uIFRoZW4sIGV2YWx1YXRpbmcgd2hpY2ggY2VsbHMgbmVlZCB0byBiZSBzdHVjayB0byB0aGUgYm90dG9tLiBUaGlzIGlzXG4gICAqIGF1dG9tYXRpY2FsbHkgY2FsbGVkIHdoZW4gdGhlIGZvb3RlciByb3cgY2hhbmdlcyBpdHMgZGlzcGxheWVkIHNldCBvZiBjb2x1bW5zLCBvciBpZiBpdHNcbiAgICogc3RpY2t5IGlucHV0IGNoYW5nZXMuIE1heSBiZSBjYWxsZWQgbWFudWFsbHkgZm9yIGNhc2VzIHdoZXJlIHRoZSBjZWxsIGNvbnRlbnQgY2hhbmdlcyBvdXRzaWRlXG4gICAqIG9mIHRoZXNlIGV2ZW50cy5cbiAgICovXG4gIHVwZGF0ZVN0aWNreUZvb3RlclJvd1N0eWxlcygpOiB2b2lkIHtcbiAgICBjb25zdCBmb290ZXJSb3dzID0gdGhpcy5fZ2V0UmVuZGVyZWRSb3dzKHRoaXMuX2Zvb3RlclJvd091dGxldCk7XG4gICAgY29uc3QgdGFibGVFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgLy8gSGlkZSB0aGUgdGZvb3QgZWxlbWVudCBpZiB0aGVyZSBhcmUgbm8gZm9vdGVyIHJvd3MuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIHNhdGlzZnlcbiAgICAvLyBvdmVyemVhbG91cyBhMTF5IGNoZWNrZXJzIHRoYXQgZmFpbCBiZWNhdXNlIHRoZSBgcm93Z3JvdXBgIGVsZW1lbnQgZG9lcyBub3QgY29udGFpblxuICAgIC8vIHJlcXVpcmVkIGNoaWxkIGByb3dgLlxuICAgIGNvbnN0IHRmb290ID0gdGFibGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3Rmb290Jyk7XG4gICAgaWYgKHRmb290KSB7XG4gICAgICB0Zm9vdC5zdHlsZS5kaXNwbGF5ID0gZm9vdGVyUm93cy5sZW5ndGggPyAnJyA6ICdub25lJztcbiAgICB9XG5cbiAgICBjb25zdCBzdGlja3lTdGF0ZXMgPSB0aGlzLl9mb290ZXJSb3dEZWZzLm1hcChkZWYgPT4gZGVmLnN0aWNreSk7XG4gICAgdGhpcy5fc3RpY2t5U3R5bGVyLmNsZWFyU3RpY2t5UG9zaXRpb25pbmcoZm9vdGVyUm93cywgWydib3R0b20nXSk7XG4gICAgdGhpcy5fc3RpY2t5U3R5bGVyLnN0aWNrUm93cyhmb290ZXJSb3dzLCBzdGlja3lTdGF0ZXMsICdib3R0b20nKTtcbiAgICB0aGlzLl9zdGlja3lTdHlsZXIudXBkYXRlU3RpY2t5Rm9vdGVyQ29udGFpbmVyKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgc3RpY2t5U3RhdGVzKTtcblxuICAgIC8vIFJlc2V0IHRoZSBkaXJ0eSBzdGF0ZSBvZiB0aGUgc3RpY2t5IGlucHV0IGNoYW5nZSBzaW5jZSBpdCBoYXMgYmVlbiB1c2VkLlxuICAgIHRoaXMuX2Zvb3RlclJvd0RlZnMuZm9yRWFjaChkZWYgPT4gZGVmLnJlc2V0U3RpY2t5Q2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb2x1bW4gc3RpY2t5IHN0eWxlcy4gRmlyc3QgcmVzZXRzIGFsbCBhcHBsaWVkIHN0eWxlcyB3aXRoIHJlc3BlY3QgdG8gdGhlIGNlbGxzXG4gICAqIHN0aWNraW5nIHRvIHRoZSBsZWZ0IGFuZCByaWdodC4gVGhlbiBzdGlja3kgc3R5bGVzIGFyZSBhZGRlZCBmb3IgdGhlIGxlZnQgYW5kIHJpZ2h0IGFjY29yZGluZ1xuICAgKiB0byB0aGUgY29sdW1uIGRlZmluaXRpb25zIGZvciBlYWNoIGNlbGwgaW4gZWFjaCByb3cuIFRoaXMgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgd2hlblxuICAgKiB0aGUgZGF0YSBzb3VyY2UgcHJvdmlkZXMgYSBuZXcgc2V0IG9mIGRhdGEgb3Igd2hlbiBhIGNvbHVtbiBkZWZpbml0aW9uIGNoYW5nZXMgaXRzIHN0aWNreVxuICAgKiBpbnB1dC4gTWF5IGJlIGNhbGxlZCBtYW51YWxseSBmb3IgY2FzZXMgd2hlcmUgdGhlIGNlbGwgY29udGVudCBjaGFuZ2VzIG91dHNpZGUgb2YgdGhlc2UgZXZlbnRzLlxuICAgKi9cbiAgdXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCkge1xuICAgIGNvbnN0IGhlYWRlclJvd3MgPSB0aGlzLl9nZXRSZW5kZXJlZFJvd3ModGhpcy5faGVhZGVyUm93T3V0bGV0KTtcbiAgICBjb25zdCBkYXRhUm93cyA9IHRoaXMuX2dldFJlbmRlcmVkUm93cyh0aGlzLl9yb3dPdXRsZXQpO1xuICAgIGNvbnN0IGZvb3RlclJvd3MgPSB0aGlzLl9nZXRSZW5kZXJlZFJvd3ModGhpcy5fZm9vdGVyUm93T3V0bGV0KTtcblxuICAgIC8vIENsZWFyIHRoZSBsZWZ0IGFuZCByaWdodCBwb3NpdGlvbmluZyBmcm9tIGFsbCBjb2x1bW5zIGluIHRoZSB0YWJsZSBhY3Jvc3MgYWxsIHJvd3Mgc2luY2VcbiAgICAvLyBzdGlja3kgY29sdW1ucyBzcGFuIGFjcm9zcyBhbGwgdGFibGUgc2VjdGlvbnMgKGhlYWRlciwgZGF0YSwgZm9vdGVyKVxuICAgIHRoaXMuX3N0aWNreVN0eWxlci5jbGVhclN0aWNreVBvc2l0aW9uaW5nKFxuICAgICAgICBbLi4uaGVhZGVyUm93cywgLi4uZGF0YVJvd3MsIC4uLmZvb3RlclJvd3NdLCBbJ2xlZnQnLCAncmlnaHQnXSk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHN0aWNreSBzdHlsZXMgZm9yIGVhY2ggaGVhZGVyIHJvdyBkZXBlbmRpbmcgb24gdGhlIGRlZidzIHN0aWNreSBzdGF0ZVxuICAgIGhlYWRlclJvd3MuZm9yRWFjaCgoaGVhZGVyUm93LCBpKSA9PiB7XG4gICAgICB0aGlzLl9hZGRTdGlja3lDb2x1bW5TdHlsZXMoW2hlYWRlclJvd10sIHRoaXMuX2hlYWRlclJvd0RlZnNbaV0pO1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBzdGlja3kgc3R5bGVzIGZvciBlYWNoIGRhdGEgcm93IGRlcGVuZGluZyBvbiBpdHMgZGVmJ3Mgc3RpY2t5IHN0YXRlXG4gICAgdGhpcy5fcm93RGVmcy5mb3JFYWNoKHJvd0RlZiA9PiB7XG4gICAgICAvLyBDb2xsZWN0IGFsbCB0aGUgcm93cyByZW5kZXJlZCB3aXRoIHRoaXMgcm93IGRlZmluaXRpb24uXG4gICAgICBjb25zdCByb3dzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFSb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJSb3dzW2ldLnJvd0RlZiA9PT0gcm93RGVmKSB7XG4gICAgICAgICAgcm93cy5wdXNoKGRhdGFSb3dzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9hZGRTdGlja3lDb2x1bW5TdHlsZXMocm93cywgcm93RGVmKTtcbiAgICB9KTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgc3RpY2t5IHN0eWxlcyBmb3IgZWFjaCBmb290ZXIgcm93IGRlcGVuZGluZyBvbiB0aGUgZGVmJ3Mgc3RpY2t5IHN0YXRlXG4gICAgZm9vdGVyUm93cy5mb3JFYWNoKChmb290ZXJSb3csIGkpID0+IHtcbiAgICAgIHRoaXMuX2FkZFN0aWNreUNvbHVtblN0eWxlcyhbZm9vdGVyUm93XSwgdGhpcy5fZm9vdGVyUm93RGVmc1tpXSk7XG4gICAgfSk7XG5cbiAgICAvLyBSZXNldCB0aGUgZGlydHkgc3RhdGUgb2YgdGhlIHN0aWNreSBpbnB1dCBjaGFuZ2Ugc2luY2UgaXQgaGFzIGJlZW4gdXNlZC5cbiAgICBBcnJheS5mcm9tKHRoaXMuX2NvbHVtbkRlZnNCeU5hbWUudmFsdWVzKCkpLmZvckVhY2goZGVmID0+IGRlZi5yZXNldFN0aWNreUNoYW5nZWQoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsaXN0IG9mIFJlbmRlclJvdyBvYmplY3RzIHRvIHJlbmRlciBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgbGlzdCBvZiBkYXRhIGFuZCBkZWZpbmVkXG4gICAqIHJvdyBkZWZpbml0aW9ucy4gSWYgdGhlIHByZXZpb3VzIGxpc3QgYWxyZWFkeSBjb250YWluZWQgYSBwYXJ0aWN1bGFyIHBhaXIsIGl0IHNob3VsZCBiZSByZXVzZWRcbiAgICogc28gdGhhdCB0aGUgZGlmZmVyIGVxdWF0ZXMgdGhlaXIgcmVmZXJlbmNlcy5cbiAgICovXG4gIHByaXZhdGUgX2dldEFsbFJlbmRlclJvd3MoKTogUmVuZGVyUm93PFQ+W10ge1xuICAgIGNvbnN0IHJlbmRlclJvd3M6IFJlbmRlclJvdzxUPltdID0gW107XG5cbiAgICAvLyBTdG9yZSB0aGUgY2FjaGUgYW5kIGNyZWF0ZSBhIG5ldyBvbmUuIEFueSByZS11c2VkIFJlbmRlclJvdyBvYmplY3RzIHdpbGwgYmUgbW92ZWQgaW50byB0aGVcbiAgICAvLyBuZXcgY2FjaGUgd2hpbGUgdW51c2VkIG9uZXMgY2FuIGJlIHBpY2tlZCB1cCBieSBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgY29uc3QgcHJldkNhY2hlZFJlbmRlclJvd3MgPSB0aGlzLl9jYWNoZWRSZW5kZXJSb3dzTWFwO1xuICAgIHRoaXMuX2NhY2hlZFJlbmRlclJvd3NNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAvLyBGb3IgZWFjaCBkYXRhIG9iamVjdCwgZ2V0IHRoZSBsaXN0IG9mIHJvd3MgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQsIHJlcHJlc2VudGVkIGJ5IHRoZVxuICAgIC8vIHJlc3BlY3RpdmUgYFJlbmRlclJvd2Agb2JqZWN0IHdoaWNoIGlzIHRoZSBwYWlyIG9mIGBkYXRhYCBhbmQgYENka1Jvd0RlZmAuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZGF0YSA9IHRoaXMuX2RhdGFbaV07XG4gICAgICBjb25zdCByZW5kZXJSb3dzRm9yRGF0YSA9IHRoaXMuX2dldFJlbmRlclJvd3NGb3JEYXRhKGRhdGEsIGksIHByZXZDYWNoZWRSZW5kZXJSb3dzLmdldChkYXRhKSk7XG5cbiAgICAgIGlmICghdGhpcy5fY2FjaGVkUmVuZGVyUm93c01hcC5oYXMoZGF0YSkpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVkUmVuZGVyUm93c01hcC5zZXQoZGF0YSwgbmV3IFdlYWtNYXAoKSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVuZGVyUm93c0ZvckRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbGV0IHJlbmRlclJvdyA9IHJlbmRlclJvd3NGb3JEYXRhW2pdO1xuXG4gICAgICAgIGNvbnN0IGNhY2hlID0gdGhpcy5fY2FjaGVkUmVuZGVyUm93c01hcC5nZXQocmVuZGVyUm93LmRhdGEpITtcbiAgICAgICAgaWYgKGNhY2hlLmhhcyhyZW5kZXJSb3cucm93RGVmKSkge1xuICAgICAgICAgIGNhY2hlLmdldChyZW5kZXJSb3cucm93RGVmKSEucHVzaChyZW5kZXJSb3cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhY2hlLnNldChyZW5kZXJSb3cucm93RGVmLCBbcmVuZGVyUm93XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyUm93cy5wdXNoKHJlbmRlclJvdyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlclJvd3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2YgYFJlbmRlclJvdzxUPmAgZm9yIHRoZSBwcm92aWRlZCBkYXRhIG9iamVjdCBhbmQgYW55IGBDZGtSb3dEZWZgIG9iamVjdHMgdGhhdFxuICAgKiBzaG91bGQgYmUgcmVuZGVyZWQgZm9yIHRoaXMgZGF0YS4gUmV1c2VzIHRoZSBjYWNoZWQgUmVuZGVyUm93IG9iamVjdHMgaWYgdGhleSBtYXRjaCB0aGUgc2FtZVxuICAgKiBgKFQsIENka1Jvd0RlZilgIHBhaXIuXG4gICAqL1xuICBwcml2YXRlIF9nZXRSZW5kZXJSb3dzRm9yRGF0YShcbiAgICAgIGRhdGE6IFQsIGRhdGFJbmRleDogbnVtYmVyLCBjYWNoZT86IFdlYWtNYXA8Q2RrUm93RGVmPFQ+LCBSZW5kZXJSb3c8VD5bXT4pOiBSZW5kZXJSb3c8VD5bXSB7XG4gICAgY29uc3Qgcm93RGVmcyA9IHRoaXMuX2dldFJvd0RlZnMoZGF0YSwgZGF0YUluZGV4KTtcblxuICAgIHJldHVybiByb3dEZWZzLm1hcChyb3dEZWYgPT4ge1xuICAgICAgY29uc3QgY2FjaGVkUmVuZGVyUm93cyA9IChjYWNoZSAmJiBjYWNoZS5oYXMocm93RGVmKSkgPyBjYWNoZS5nZXQocm93RGVmKSEgOiBbXTtcbiAgICAgIGlmIChjYWNoZWRSZW5kZXJSb3dzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBkYXRhUm93ID0gY2FjaGVkUmVuZGVyUm93cy5zaGlmdCgpITtcbiAgICAgICAgZGF0YVJvdy5kYXRhSW5kZXggPSBkYXRhSW5kZXg7XG4gICAgICAgIHJldHVybiBkYXRhUm93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtkYXRhLCByb3dEZWYsIGRhdGFJbmRleH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogVXBkYXRlIHRoZSBtYXAgY29udGFpbmluZyB0aGUgY29udGVudCdzIGNvbHVtbiBkZWZpbml0aW9ucy4gKi9cbiAgcHJpdmF0ZSBfY2FjaGVDb2x1bW5EZWZzKCkge1xuICAgIHRoaXMuX2NvbHVtbkRlZnNCeU5hbWUuY2xlYXIoKTtcblxuICAgIGNvbnN0IGNvbHVtbkRlZnMgPSBtZXJnZUFycmF5QW5kU2V0KFxuICAgICAgICB0aGlzLl9nZXRPd25EZWZzKHRoaXMuX2NvbnRlbnRDb2x1bW5EZWZzKSwgdGhpcy5fY3VzdG9tQ29sdW1uRGVmcyk7XG4gICAgY29sdW1uRGVmcy5mb3JFYWNoKGNvbHVtbkRlZiA9PiB7XG4gICAgICBpZiAodGhpcy5fY29sdW1uRGVmc0J5TmFtZS5oYXMoY29sdW1uRGVmLm5hbWUpKSB7XG4gICAgICAgIHRocm93IGdldFRhYmxlRHVwbGljYXRlQ29sdW1uTmFtZUVycm9yKGNvbHVtbkRlZi5uYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NvbHVtbkRlZnNCeU5hbWUuc2V0KGNvbHVtbkRlZi5uYW1lLCBjb2x1bW5EZWYpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFVwZGF0ZSB0aGUgbGlzdCBvZiBhbGwgYXZhaWxhYmxlIHJvdyBkZWZpbml0aW9ucyB0aGF0IGNhbiBiZSB1c2VkLiAqL1xuICBwcml2YXRlIF9jYWNoZVJvd0RlZnMoKSB7XG4gICAgdGhpcy5faGVhZGVyUm93RGVmcyA9IG1lcmdlQXJyYXlBbmRTZXQoXG4gICAgICAgIHRoaXMuX2dldE93bkRlZnModGhpcy5fY29udGVudEhlYWRlclJvd0RlZnMpLCB0aGlzLl9jdXN0b21IZWFkZXJSb3dEZWZzKTtcbiAgICB0aGlzLl9mb290ZXJSb3dEZWZzID0gbWVyZ2VBcnJheUFuZFNldChcbiAgICAgICAgdGhpcy5fZ2V0T3duRGVmcyh0aGlzLl9jb250ZW50Rm9vdGVyUm93RGVmcyksIHRoaXMuX2N1c3RvbUZvb3RlclJvd0RlZnMpO1xuICAgIHRoaXMuX3Jvd0RlZnMgPSBtZXJnZUFycmF5QW5kU2V0KFxuICAgICAgICB0aGlzLl9nZXRPd25EZWZzKHRoaXMuX2NvbnRlbnRSb3dEZWZzKSwgdGhpcy5fY3VzdG9tUm93RGVmcyk7XG5cbiAgICAvLyBBZnRlciBhbGwgcm93IGRlZmluaXRpb25zIGFyZSBkZXRlcm1pbmVkLCBmaW5kIHRoZSByb3cgZGVmaW5pdGlvbiB0byBiZSBjb25zaWRlcmVkIGRlZmF1bHQuXG4gICAgY29uc3QgZGVmYXVsdFJvd0RlZnMgPSB0aGlzLl9yb3dEZWZzLmZpbHRlcihkZWYgPT4gIWRlZi53aGVuKTtcbiAgICBpZiAoIXRoaXMubXVsdGlUZW1wbGF0ZURhdGFSb3dzICYmIGRlZmF1bHRSb3dEZWZzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IGdldFRhYmxlTXVsdGlwbGVEZWZhdWx0Um93RGVmc0Vycm9yKCk7XG4gICAgfVxuICAgIHRoaXMuX2RlZmF1bHRSb3dEZWYgPSBkZWZhdWx0Um93RGVmc1swXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgaGVhZGVyLCBkYXRhLCBvciBmb290ZXIgcm93cyBoYXZlIGNoYW5nZWQgd2hhdCBjb2x1bW5zIHRoZXkgd2FudCB0byBkaXNwbGF5IG9yXG4gICAqIHdoZXRoZXIgdGhlIHN0aWNreSBzdGF0ZXMgaGF2ZSBjaGFuZ2VkIGZvciB0aGUgaGVhZGVyIG9yIGZvb3Rlci4gSWYgdGhlcmUgaXMgYSBkaWZmLCB0aGVuXG4gICAqIHJlLXJlbmRlciB0aGF0IHNlY3Rpb24uXG4gICAqL1xuICBwcml2YXRlIF9yZW5kZXJVcGRhdGVkQ29sdW1ucygpIHtcbiAgICBjb25zdCBjb2x1bW5zRGlmZlJlZHVjZXIgPSAoYWNjOiBib29sZWFuLCBkZWY6IEJhc2VSb3dEZWYpID0+IGFjYyB8fCAhIWRlZi5nZXRDb2x1bW5zRGlmZigpO1xuXG4gICAgLy8gRm9yY2UgcmUtcmVuZGVyIGRhdGEgcm93cyBpZiB0aGUgbGlzdCBvZiBjb2x1bW4gZGVmaW5pdGlvbnMgaGF2ZSBjaGFuZ2VkLlxuICAgIGlmICh0aGlzLl9yb3dEZWZzLnJlZHVjZShjb2x1bW5zRGlmZlJlZHVjZXIsIGZhbHNlKSkge1xuICAgICAgdGhpcy5fZm9yY2VSZW5kZXJEYXRhUm93cygpO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIHJlLXJlbmRlciBoZWFkZXIvZm9vdGVyIHJvd3MgaWYgdGhlIGxpc3Qgb2YgY29sdW1uIGRlZmluaXRpb25zIGhhdmUgY2hhbmdlZC4uXG4gICAgaWYgKHRoaXMuX2hlYWRlclJvd0RlZnMucmVkdWNlKGNvbHVtbnNEaWZmUmVkdWNlciwgZmFsc2UpKSB7XG4gICAgICB0aGlzLl9mb3JjZVJlbmRlckhlYWRlclJvd3MoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZm9vdGVyUm93RGVmcy5yZWR1Y2UoY29sdW1uc0RpZmZSZWR1Y2VyLCBmYWxzZSkpIHtcbiAgICAgIHRoaXMuX2ZvcmNlUmVuZGVyRm9vdGVyUm93cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2ggdG8gdGhlIHByb3ZpZGVkIGRhdGEgc291cmNlIGJ5IHJlc2V0dGluZyB0aGUgZGF0YSBhbmQgdW5zdWJzY3JpYmluZyBmcm9tIHRoZSBjdXJyZW50XG4gICAqIHJlbmRlciBjaGFuZ2Ugc3Vic2NyaXB0aW9uIGlmIG9uZSBleGlzdHMuIElmIHRoZSBkYXRhIHNvdXJjZSBpcyBudWxsLCBpbnRlcnByZXQgdGhpcyBieVxuICAgKiBjbGVhcmluZyB0aGUgcm93IG91dGxldC4gT3RoZXJ3aXNlIHN0YXJ0IGxpc3RlbmluZyBmb3IgbmV3IGRhdGEuXG4gICAqL1xuICBwcml2YXRlIF9zd2l0Y2hEYXRhU291cmNlKGRhdGFTb3VyY2U6IENka1RhYmxlRGF0YVNvdXJjZUlucHV0PFQ+KSB7XG4gICAgdGhpcy5fZGF0YSA9IFtdO1xuXG4gICAgaWYgKGlzRGF0YVNvdXJjZSh0aGlzLmRhdGFTb3VyY2UpKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGlzY29ubmVjdCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBTdG9wIGxpc3RlbmluZyBmb3IgZGF0YSBmcm9tIHRoZSBwcmV2aW91cyBkYXRhIHNvdXJjZS5cbiAgICBpZiAodGhpcy5fcmVuZGVyQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9yZW5kZXJDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX3JlbmRlckNoYW5nZVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFkYXRhU291cmNlKSB7XG4gICAgICBpZiAodGhpcy5fZGF0YURpZmZlcikge1xuICAgICAgICB0aGlzLl9kYXRhRGlmZmVyLmRpZmYoW10pO1xuICAgICAgfVxuICAgICAgdGhpcy5fcm93T3V0bGV0LnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgfVxuXG4gIC8qKiBTZXQgdXAgYSBzdWJzY3JpcHRpb24gZm9yIHRoZSBkYXRhIHByb3ZpZGVkIGJ5IHRoZSBkYXRhIHNvdXJjZS4gKi9cbiAgcHJpdmF0ZSBfb2JzZXJ2ZVJlbmRlckNoYW5nZXMoKSB7XG4gICAgLy8gSWYgbm8gZGF0YSBzb3VyY2UgaGFzIGJlZW4gc2V0LCB0aGVyZSBpcyBub3RoaW5nIHRvIG9ic2VydmUgZm9yIGNoYW5nZXMuXG4gICAgaWYgKCF0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YVN0cmVhbTogT2JzZXJ2YWJsZTxUW118UmVhZG9ubHlBcnJheTxUPj58dW5kZWZpbmVkO1xuXG4gICAgaWYgKGlzRGF0YVNvdXJjZSh0aGlzLmRhdGFTb3VyY2UpKSB7XG4gICAgICBkYXRhU3RyZWFtID0gdGhpcy5kYXRhU291cmNlLmNvbm5lY3QodGhpcyk7XG4gICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUodGhpcy5kYXRhU291cmNlKSkge1xuICAgICAgZGF0YVN0cmVhbSA9IHRoaXMuZGF0YVNvdXJjZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5kYXRhU291cmNlKSkge1xuICAgICAgZGF0YVN0cmVhbSA9IG9ic2VydmFibGVPZih0aGlzLmRhdGFTb3VyY2UpO1xuICAgIH1cblxuICAgIGlmIChkYXRhU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IGdldFRhYmxlVW5rbm93bkRhdGFTb3VyY2VFcnJvcigpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlckNoYW5nZVN1YnNjcmlwdGlvbiA9IGRhdGFTdHJlYW0ucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgdGhpcy5fZGF0YSA9IGRhdGEgfHwgW107XG4gICAgICB0aGlzLnJlbmRlclJvd3MoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYW55IGV4aXN0aW5nIGNvbnRlbnQgaW4gdGhlIGhlYWRlciByb3cgb3V0bGV0IGFuZCBjcmVhdGVzIGEgbmV3IGVtYmVkZGVkIHZpZXdcbiAgICogaW4gdGhlIG91dGxldCB1c2luZyB0aGUgaGVhZGVyIHJvdyBkZWZpbml0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9yY2VSZW5kZXJIZWFkZXJSb3dzKCkge1xuICAgIC8vIENsZWFyIHRoZSBoZWFkZXIgcm93IG91dGxldCBpZiBhbnkgY29udGVudCBleGlzdHMuXG4gICAgaWYgKHRoaXMuX2hlYWRlclJvd091dGxldC52aWV3Q29udGFpbmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2hlYWRlclJvd091dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5faGVhZGVyUm93RGVmcy5mb3JFYWNoKChkZWYsIGkpID0+IHRoaXMuX3JlbmRlclJvdyh0aGlzLl9oZWFkZXJSb3dPdXRsZXQsIGRlZiwgaSkpO1xuICAgIHRoaXMudXBkYXRlU3RpY2t5SGVhZGVyUm93U3R5bGVzKCk7XG4gICAgdGhpcy51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgfVxuICAvKipcbiAgICogQ2xlYXJzIGFueSBleGlzdGluZyBjb250ZW50IGluIHRoZSBmb290ZXIgcm93IG91dGxldCBhbmQgY3JlYXRlcyBhIG5ldyBlbWJlZGRlZCB2aWV3XG4gICAqIGluIHRoZSBvdXRsZXQgdXNpbmcgdGhlIGZvb3RlciByb3cgZGVmaW5pdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX2ZvcmNlUmVuZGVyRm9vdGVyUm93cygpIHtcbiAgICAvLyBDbGVhciB0aGUgZm9vdGVyIHJvdyBvdXRsZXQgaWYgYW55IGNvbnRlbnQgZXhpc3RzLlxuICAgIGlmICh0aGlzLl9mb290ZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9mb290ZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIH1cblxuICAgIHRoaXMuX2Zvb3RlclJvd0RlZnMuZm9yRWFjaCgoZGVmLCBpKSA9PiB0aGlzLl9yZW5kZXJSb3codGhpcy5fZm9vdGVyUm93T3V0bGV0LCBkZWYsIGkpKTtcbiAgICB0aGlzLnVwZGF0ZVN0aWNreUZvb3RlclJvd1N0eWxlcygpO1xuICAgIHRoaXMudXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gIH1cblxuICAvKiogQWRkcyB0aGUgc3RpY2t5IGNvbHVtbiBzdHlsZXMgZm9yIHRoZSByb3dzIGFjY29yZGluZyB0byB0aGUgY29sdW1ucycgc3RpY2sgc3RhdGVzLiAqL1xuICBwcml2YXRlIF9hZGRTdGlja3lDb2x1bW5TdHlsZXMocm93czogSFRNTEVsZW1lbnRbXSwgcm93RGVmOiBCYXNlUm93RGVmKSB7XG4gICAgY29uc3QgY29sdW1uRGVmcyA9IEFycmF5LmZyb20ocm93RGVmLmNvbHVtbnMgfHwgW10pLm1hcChjb2x1bW5OYW1lID0+IHtcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IHRoaXMuX2NvbHVtbkRlZnNCeU5hbWUuZ2V0KGNvbHVtbk5hbWUpO1xuICAgICAgaWYgKCFjb2x1bW5EZWYpIHtcbiAgICAgICAgdGhyb3cgZ2V0VGFibGVVbmtub3duQ29sdW1uRXJyb3IoY29sdW1uTmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sdW1uRGVmITtcbiAgICB9KTtcbiAgICBjb25zdCBzdGlja3lTdGFydFN0YXRlcyA9IGNvbHVtbkRlZnMubWFwKGNvbHVtbkRlZiA9PiBjb2x1bW5EZWYuc3RpY2t5KTtcbiAgICBjb25zdCBzdGlja3lFbmRTdGF0ZXMgPSBjb2x1bW5EZWZzLm1hcChjb2x1bW5EZWYgPT4gY29sdW1uRGVmLnN0aWNreUVuZCk7XG4gICAgdGhpcy5fc3RpY2t5U3R5bGVyLnVwZGF0ZVN0aWNreUNvbHVtbnMocm93cywgc3RpY2t5U3RhcnRTdGF0ZXMsIHN0aWNreUVuZFN0YXRlcyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbGlzdCBvZiByb3dzIHRoYXQgaGF2ZSBiZWVuIHJlbmRlcmVkIGluIHRoZSByb3cgb3V0bGV0LiAqL1xuICBfZ2V0UmVuZGVyZWRSb3dzKHJvd091dGxldDogUm93T3V0bGV0KTogSFRNTEVsZW1lbnRbXSB7XG4gICAgY29uc3QgcmVuZGVyZWRSb3dzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd091dGxldC52aWV3Q29udGFpbmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gKHJvd091dGxldC52aWV3Q29udGFpbmVyLmdldChpKSEgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pO1xuICAgICAgcmVuZGVyZWRSb3dzLnB1c2godmlld1JlZi5yb290Tm9kZXNbMF0pO1xuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlZFJvd3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXRjaGluZyByb3cgZGVmaW5pdGlvbnMgdGhhdCBzaG91bGQgYmUgdXNlZCBmb3IgdGhpcyByb3cgZGF0YS4gSWYgdGhlcmUgaXMgb25seVxuICAgKiBvbmUgcm93IGRlZmluaXRpb24sIGl0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIGZpbmQgdGhlIHJvdyBkZWZpbml0aW9ucyB0aGF0IGhhcyBhIHdoZW5cbiAgICogcHJlZGljYXRlIHRoYXQgcmV0dXJucyB0cnVlIHdpdGggdGhlIGRhdGEuIElmIG5vbmUgcmV0dXJuIHRydWUsIHJldHVybiB0aGUgZGVmYXVsdCByb3dcbiAgICogZGVmaW5pdGlvbi5cbiAgICovXG4gIF9nZXRSb3dEZWZzKGRhdGE6IFQsIGRhdGFJbmRleDogbnVtYmVyKTogQ2RrUm93RGVmPFQ+W10ge1xuICAgIGlmICh0aGlzLl9yb3dEZWZzLmxlbmd0aCA9PSAxKSB7XG4gICAgICByZXR1cm4gW3RoaXMuX3Jvd0RlZnNbMF1dO1xuICAgIH1cblxuICAgIGxldCByb3dEZWZzOiBDZGtSb3dEZWY8VD5bXSA9IFtdO1xuICAgIGlmICh0aGlzLm11bHRpVGVtcGxhdGVEYXRhUm93cykge1xuICAgICAgcm93RGVmcyA9IHRoaXMuX3Jvd0RlZnMuZmlsdGVyKGRlZiA9PiAhZGVmLndoZW4gfHwgZGVmLndoZW4oZGF0YUluZGV4LCBkYXRhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByb3dEZWYgPVxuICAgICAgICAgIHRoaXMuX3Jvd0RlZnMuZmluZChkZWYgPT4gZGVmLndoZW4gJiYgZGVmLndoZW4oZGF0YUluZGV4LCBkYXRhKSkgfHwgdGhpcy5fZGVmYXVsdFJvd0RlZjtcbiAgICAgIGlmIChyb3dEZWYpIHtcbiAgICAgICAgcm93RGVmcy5wdXNoKHJvd0RlZik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFyb3dEZWZzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgZ2V0VGFibGVNaXNzaW5nTWF0Y2hpbmdSb3dEZWZFcnJvcihkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93RGVmcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIGVtYmVkZGVkIHZpZXcgZm9yIHRoZSBkYXRhIHJvdyB0ZW1wbGF0ZSBhbmQgcGxhY2UgaXQgaW4gdGhlIGNvcnJlY3QgaW5kZXggbG9jYXRpb25cbiAgICogd2l0aGluIHRoZSBkYXRhIHJvdyB2aWV3IGNvbnRhaW5lci5cbiAgICovXG4gIHByaXZhdGUgX2luc2VydFJvdyhyZW5kZXJSb3c6IFJlbmRlclJvdzxUPiwgcmVuZGVySW5kZXg6IG51bWJlcikge1xuICAgIGNvbnN0IHJvd0RlZiA9IHJlbmRlclJvdy5yb3dEZWY7XG4gICAgY29uc3QgY29udGV4dDogUm93Q29udGV4dDxUPiA9IHskaW1wbGljaXQ6IHJlbmRlclJvdy5kYXRhfTtcbiAgICB0aGlzLl9yZW5kZXJSb3codGhpcy5fcm93T3V0bGV0LCByb3dEZWYsIHJlbmRlckluZGV4LCBjb250ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHJvdyB0ZW1wbGF0ZSBpbiB0aGUgb3V0bGV0IGFuZCBmaWxscyBpdCB3aXRoIHRoZSBzZXQgb2YgY2VsbCB0ZW1wbGF0ZXMuXG4gICAqIE9wdGlvbmFsbHkgdGFrZXMgYSBjb250ZXh0IHRvIHByb3ZpZGUgdG8gdGhlIHJvdyBhbmQgY2VsbHMsIGFzIHdlbGwgYXMgYW4gb3B0aW9uYWwgaW5kZXhcbiAgICogb2Ygd2hlcmUgdG8gcGxhY2UgdGhlIG5ldyByb3cgdGVtcGxhdGUgaW4gdGhlIG91dGxldC5cbiAgICovXG4gIHByaXZhdGUgX3JlbmRlclJvdyhcbiAgICAgIG91dGxldDogUm93T3V0bGV0LCByb3dEZWY6IEJhc2VSb3dEZWYsIGluZGV4OiBudW1iZXIsIGNvbnRleHQ6IFJvd0NvbnRleHQ8VD4gPSB7fSkge1xuICAgIC8vIFRPRE8oYW5kcmV3c2VndWluKTogZW5mb3JjZSB0aGF0IG9uZSBvdXRsZXQgd2FzIGluc3RhbnRpYXRlZCBmcm9tIGNyZWF0ZUVtYmVkZGVkVmlld1xuICAgIG91dGxldC52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhyb3dEZWYudGVtcGxhdGUsIGNvbnRleHQsIGluZGV4KTtcblxuICAgIGZvciAobGV0IGNlbGxUZW1wbGF0ZSBvZiB0aGlzLl9nZXRDZWxsVGVtcGxhdGVzKHJvd0RlZikpIHtcbiAgICAgIGlmIChDZGtDZWxsT3V0bGV0Lm1vc3RSZWNlbnRDZWxsT3V0bGV0KSB7XG4gICAgICAgIENka0NlbGxPdXRsZXQubW9zdFJlY2VudENlbGxPdXRsZXQuX3ZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KGNlbGxUZW1wbGF0ZSwgY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgaW5kZXgtcmVsYXRlZCBjb250ZXh0IGZvciBlYWNoIHJvdyB0byByZWZsZWN0IGFueSBjaGFuZ2VzIGluIHRoZSBpbmRleCBvZiB0aGUgcm93cyxcbiAgICogZS5nLiBmaXJzdC9sYXN0L2V2ZW4vb2RkLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlUm93SW5kZXhDb250ZXh0KCkge1xuICAgIGNvbnN0IHZpZXdDb250YWluZXIgPSB0aGlzLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICBmb3IgKGxldCByZW5kZXJJbmRleCA9IDAsIGNvdW50ID0gdmlld0NvbnRhaW5lci5sZW5ndGg7IHJlbmRlckluZGV4IDwgY291bnQ7IHJlbmRlckluZGV4KyspIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB2aWV3Q29udGFpbmVyLmdldChyZW5kZXJJbmRleCkgYXMgUm93Vmlld1JlZjxUPjtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB2aWV3UmVmLmNvbnRleHQgYXMgUm93Q29udGV4dDxUPjtcbiAgICAgIGNvbnRleHQuY291bnQgPSBjb3VudDtcbiAgICAgIGNvbnRleHQuZmlyc3QgPSByZW5kZXJJbmRleCA9PT0gMDtcbiAgICAgIGNvbnRleHQubGFzdCA9IHJlbmRlckluZGV4ID09PSBjb3VudCAtIDE7XG4gICAgICBjb250ZXh0LmV2ZW4gPSByZW5kZXJJbmRleCAlIDIgPT09IDA7XG4gICAgICBjb250ZXh0Lm9kZCA9ICFjb250ZXh0LmV2ZW47XG5cbiAgICAgIGlmICh0aGlzLm11bHRpVGVtcGxhdGVEYXRhUm93cykge1xuICAgICAgICBjb250ZXh0LmRhdGFJbmRleCA9IHRoaXMuX3JlbmRlclJvd3NbcmVuZGVySW5kZXhdLmRhdGFJbmRleDtcbiAgICAgICAgY29udGV4dC5yZW5kZXJJbmRleCA9IHJlbmRlckluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGV4dC5pbmRleCA9IHRoaXMuX3JlbmRlclJvd3NbcmVuZGVySW5kZXhdLmRhdGFJbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY29sdW1uIGRlZmluaXRpb25zIGZvciB0aGUgcHJvdmlkZWQgcm93IGRlZi4gKi9cbiAgcHJpdmF0ZSBfZ2V0Q2VsbFRlbXBsYXRlcyhyb3dEZWY6IEJhc2VSb3dEZWYpOiBUZW1wbGF0ZVJlZjxhbnk+W10ge1xuICAgIGlmICghcm93RGVmIHx8ICFyb3dEZWYuY29sdW1ucykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb3dEZWYuY29sdW1ucywgY29sdW1uSWQgPT4ge1xuICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5fY29sdW1uRGVmc0J5TmFtZS5nZXQoY29sdW1uSWQpO1xuXG4gICAgICBpZiAoIWNvbHVtbikge1xuICAgICAgICB0aHJvdyBnZXRUYWJsZVVua25vd25Db2x1bW5FcnJvcihjb2x1bW5JZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3dEZWYuZXh0cmFjdENlbGxUZW1wbGF0ZShjb2x1bW4pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEFkZHMgbmF0aXZlIHRhYmxlIHNlY3Rpb25zIChlLmcuIHRib2R5KSBhbmQgbW92ZXMgdGhlIHJvdyBvdXRsZXRzIGludG8gdGhlbS4gKi9cbiAgcHJpdmF0ZSBfYXBwbHlOYXRpdmVUYWJsZVNlY3Rpb25zKCkge1xuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgY29uc3Qgc2VjdGlvbnMgPSBbXG4gICAgICB7dGFnOiAndGhlYWQnLCBvdXRsZXRzOiBbdGhpcy5faGVhZGVyUm93T3V0bGV0XX0sXG4gICAgICB7dGFnOiAndGJvZHknLCBvdXRsZXRzOiBbdGhpcy5fcm93T3V0bGV0LCB0aGlzLl9ub0RhdGFSb3dPdXRsZXRdfSxcbiAgICAgIHt0YWc6ICd0Zm9vdCcsIG91dGxldHM6IFt0aGlzLl9mb290ZXJSb3dPdXRsZXRdfSxcbiAgICBdO1xuXG4gICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHNlY3Rpb25zKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudChzZWN0aW9uLnRhZyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdyb3dncm91cCcpO1xuXG4gICAgICBmb3IgKGNvbnN0IG91dGxldCBvZiBzZWN0aW9uLm91dGxldHMpIHtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChvdXRsZXQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnRGcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBVc2UgYSBEb2N1bWVudEZyYWdtZW50IHNvIHdlIGRvbid0IGhpdCB0aGUgRE9NIG9uIGVhY2ggaXRlcmF0aW9uLlxuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudEZyYWdtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYSByZS1yZW5kZXIgb2YgdGhlIGRhdGEgcm93cy4gU2hvdWxkIGJlIGNhbGxlZCBpbiBjYXNlcyB3aGVyZSB0aGVyZSBoYXMgYmVlbiBhbiBpbnB1dFxuICAgKiBjaGFuZ2UgdGhhdCBhZmZlY3RzIHRoZSBldmFsdWF0aW9uIG9mIHdoaWNoIHJvd3Mgc2hvdWxkIGJlIHJlbmRlcmVkLCBlLmcuIHRvZ2dsaW5nXG4gICAqIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIG9yIGFkZGluZy9yZW1vdmluZyByb3cgZGVmaW5pdGlvbnMuXG4gICAqL1xuICBwcml2YXRlIF9mb3JjZVJlbmRlckRhdGFSb3dzKCkge1xuICAgIHRoaXMuX2RhdGFEaWZmZXIuZGlmZihbXSk7XG4gICAgdGhpcy5fcm93T3V0bGV0LnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICB0aGlzLnJlbmRlclJvd3MoKTtcbiAgICB0aGlzLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGVyZSBoYXMgYmVlbiBhIGNoYW5nZSBpbiBzdGlja3kgc3RhdGVzIHNpbmNlIGxhc3QgY2hlY2sgYW5kIGFwcGxpZXMgdGhlIGNvcnJlY3RcbiAgICogc3RpY2t5IHN0eWxlcy4gU2luY2UgY2hlY2tpbmcgcmVzZXRzIHRoZSBcImRpcnR5XCIgc3RhdGUsIHRoaXMgc2hvdWxkIG9ubHkgYmUgcGVyZm9ybWVkIG9uY2VcbiAgICogZHVyaW5nIGEgY2hhbmdlIGRldGVjdGlvbiBhbmQgYWZ0ZXIgdGhlIGlucHV0cyBhcmUgc2V0dGxlZCAoYWZ0ZXIgY29udGVudCBjaGVjaykuXG4gICAqL1xuICBwcml2YXRlIF9jaGVja1N0aWNreVN0YXRlcygpIHtcbiAgICBjb25zdCBzdGlja3lDaGVja1JlZHVjZXIgPSAoYWNjOiBib29sZWFuLCBkOiBDZGtIZWFkZXJSb3dEZWZ8Q2RrRm9vdGVyUm93RGVmfENka0NvbHVtbkRlZikgPT4ge1xuICAgICAgcmV0dXJuIGFjYyB8fCBkLmhhc1N0aWNreUNoYW5nZWQoKTtcbiAgICB9O1xuXG4gICAgLy8gTm90ZSB0aGF0IHRoZSBjaGVjayBuZWVkcyB0byBvY2N1ciBmb3IgZXZlcnkgZGVmaW5pdGlvbiBzaW5jZSBpdCBub3RpZmllcyB0aGUgZGVmaW5pdGlvblxuICAgIC8vIHRoYXQgaXQgY2FuIHJlc2V0IGl0cyBkaXJ0eSBzdGF0ZS4gVXNpbmcgYW5vdGhlciBvcGVyYXRvciBsaWtlIGBzb21lYCBtYXkgc2hvcnQtY2lyY3VpdFxuICAgIC8vIHJlbWFpbmluZyBkZWZpbml0aW9ucyBhbmQgbGVhdmUgdGhlbSBpbiBhbiB1bmNoZWNrZWQgc3RhdGUuXG5cbiAgICBpZiAodGhpcy5faGVhZGVyUm93RGVmcy5yZWR1Y2Uoc3RpY2t5Q2hlY2tSZWR1Y2VyLCBmYWxzZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RpY2t5SGVhZGVyUm93U3R5bGVzKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2Zvb3RlclJvd0RlZnMucmVkdWNlKHN0aWNreUNoZWNrUmVkdWNlciwgZmFsc2UpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0aWNreUZvb3RlclJvd1N0eWxlcygpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5mcm9tKHRoaXMuX2NvbHVtbkRlZnNCeU5hbWUudmFsdWVzKCkpLnJlZHVjZShzdGlja3lDaGVja1JlZHVjZXIsIGZhbHNlKSkge1xuICAgICAgdGhpcy51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgc3RpY2t5IHN0eWxlciB0aGF0IHdpbGwgYmUgdXNlZCBmb3Igc3RpY2t5IHJvd3MgYW5kIGNvbHVtbnMuIExpc3RlbnNcbiAgICogZm9yIGRpcmVjdGlvbmFsaXR5IGNoYW5nZXMgYW5kIHByb3ZpZGVzIHRoZSBsYXRlc3QgZGlyZWN0aW9uIHRvIHRoZSBzdHlsZXIuIFJlLWFwcGxpZXMgY29sdW1uXG4gICAqIHN0aWNraW5lc3Mgd2hlbiBkaXJlY3Rpb25hbGl0eSBjaGFuZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0dXBTdGlja3lTdHlsZXIoKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uOiBEaXJlY3Rpb24gPSB0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJztcbiAgICB0aGlzLl9zdGlja3lTdHlsZXIgPSBuZXcgU3RpY2t5U3R5bGVyKFxuICAgICAgICB0aGlzLl9pc05hdGl2ZUh0bWxUYWJsZSwgdGhpcy5zdGlja3lDc3NDbGFzcywgZGlyZWN0aW9uLCB0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpO1xuICAgICh0aGlzLl9kaXIgPyB0aGlzLl9kaXIuY2hhbmdlIDogb2JzZXJ2YWJsZU9mPERpcmVjdGlvbj4oKSlcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgIHRoaXMuX3N0aWNreVN0eWxlci5kaXJlY3Rpb24gPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKiBGaWx0ZXJzIGRlZmluaXRpb25zIHRoYXQgYmVsb25nIHRvIHRoaXMgdGFibGUgZnJvbSBhIFF1ZXJ5TGlzdC4gKi9cbiAgcHJpdmF0ZSBfZ2V0T3duRGVmczxJIGV4dGVuZHMge190YWJsZT86IGFueX0+KGl0ZW1zOiBRdWVyeUxpc3Q8ST4pOiBJW10ge1xuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoaXRlbSA9PiAhaXRlbS5fdGFibGUgfHwgaXRlbS5fdGFibGUgPT09IHRoaXMpO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgb3IgcmVtb3ZlcyB0aGUgbm8gZGF0YSByb3csIGRlcGVuZGluZyBvbiB3aGV0aGVyIGFueSBkYXRhIGlzIGJlaW5nIHNob3duLiAqL1xuICBwcml2YXRlIF91cGRhdGVOb0RhdGFSb3coKSB7XG4gICAgaWYgKHRoaXMuX25vRGF0YVJvdykge1xuICAgICAgY29uc3Qgc2hvdWxkU2hvdyA9IHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmxlbmd0aCA9PT0gMDtcblxuICAgICAgaWYgKHNob3VsZFNob3cgIT09IHRoaXMuX2lzU2hvd2luZ05vRGF0YVJvdykge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9ub0RhdGFSb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICAgICAgc2hvdWxkU2hvdyA/IGNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fbm9EYXRhUm93LnRlbXBsYXRlUmVmKSA6IGNvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICB0aGlzLl9pc1Nob3dpbmdOb0RhdGFSb3cgPSBzaG91bGRTaG93O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aVRlbXBsYXRlRGF0YVJvd3M6IEJvb2xlYW5JbnB1dDtcbn1cblxuLyoqIFV0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIGEgbWVyZ2VkIGxpc3Qgb2YgdGhlIGVudHJpZXMgaW4gYW4gYXJyYXkgYW5kIHZhbHVlcyBvZiBhIFNldC4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXlBbmRTZXQ8VD4oYXJyYXk6IFRbXSwgc2V0OiBTZXQ8VD4pOiBUW10ge1xuICByZXR1cm4gYXJyYXkuY29uY2F0KEFycmF5LmZyb20oc2V0KSk7XG59XG4iXX0=