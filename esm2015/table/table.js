/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { _DisposeViewRepeaterStrategy, isDataSource, _VIEW_REPEATER_STRATEGY, } from '@angular/cdk/collections';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EmbeddedViewRef, Inject, Input, IterableDiffers, Optional, QueryList, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { BehaviorSubject, isObservable, of as observableOf, Subject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkColumnDef } from './cell';
import { _CoalescedStyleScheduler, _COALESCED_STYLE_SCHEDULER } from './coalesced-style-scheduler';
import { CdkCellOutlet, CdkFooterRowDef, CdkHeaderRowDef, CdkNoDataRow, CdkRowDef } from './row';
import { StickyStyler } from './sticky-styler';
import { getTableDuplicateColumnNameError, getTableMissingMatchingRowDefError, getTableMissingRowDefsError, getTableMultipleDefaultRowDefsError, getTableUnknownColumnError, getTableUnknownDataSourceError } from './table-errors';
import { CDK_TABLE } from './tokens';
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
export class DataRowOutlet {
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
}
DataRowOutlet.decorators = [
    { type: Directive, args: [{ selector: '[rowOutlet]' },] }
];
DataRowOutlet.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ElementRef }
];
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * @docs-private
 */
export class HeaderRowOutlet {
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
}
HeaderRowOutlet.decorators = [
    { type: Directive, args: [{ selector: '[headerRowOutlet]' },] }
];
HeaderRowOutlet.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ElementRef }
];
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the footer.
 * @docs-private
 */
export class FooterRowOutlet {
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
}
FooterRowOutlet.decorators = [
    { type: Directive, args: [{ selector: '[footerRowOutlet]' },] }
];
FooterRowOutlet.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ElementRef }
];
/**
 * Provides a handle for the table to grab the view
 * container's ng-container to insert the no data row.
 * @docs-private
 */
export class NoDataRowOutlet {
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
}
NoDataRowOutlet.decorators = [
    { type: Directive, args: [{ selector: '[noDataRowOutlet]' },] }
];
NoDataRowOutlet.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ElementRef }
];
/**
 * The table template that can be used by the mat-table. Should not be used outside of the
 * material library.
 * @docs-private
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
 * Class used to conveniently type the embedded view ref for rows with a context.
 * @docs-private
 */
class RowViewRef extends EmbeddedViewRef {
}
/**
 * A data table that can render a header row, data rows, and a footer row.
 * Uses the dataSource input to determine the data to be rendered. The data can be provided either
 * as a data array, an Observable stream that emits the data array to render, or a DataSource with a
 * connect function that will return an Observable stream that emits the data array to render.
 */
export class CdkTable {
    constructor(_differs, _changeDetectorRef, _elementRef, role, _dir, _document, _platform, 
    /**
     * @deprecated `_coalescedStyleScheduler`, `_viewRepeater` and `_viewportRuler`
     *    parameters to become required.
     * @breaking-change 11.0.0
     */
    _viewRepeater, _coalescedStyleScheduler) {
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        this._dir = _dir;
        this._platform = _platform;
        this._viewRepeater = _viewRepeater;
        this._coalescedStyleScheduler = _coalescedStyleScheduler;
        /** Subject that emits when the component has been destroyed. */
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
         * Whether to manually add positon: sticky to all sticky cell elements. Not needed if
         * the position is set in a selector associated with the value of stickyCssClass. May be
         * overridden by table subclasses
         */
        this.needsPositionStickyOnElement = true;
        /** Whether the no data row is currently showing anything. */
        this._isShowingNoDataRow = false;
        this._multiTemplateDataRows = false;
        // TODO(andrewseguin): Remove max value as the end index
        //   and instead calculate the view on init and scroll.
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         *
         * @docs-private
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
     */
    get trackBy() {
        return this._trackByFn;
    }
    set trackBy(fn) {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && fn != null && typeof fn !== 'function') {
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
     */
    get dataSource() {
        return this._dataSource;
    }
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
     */
    get multiTemplateDataRows() {
        return this._multiTemplateDataRows;
    }
    set multiTemplateDataRows(v) {
        this._multiTemplateDataRows = coerceBooleanProperty(v);
        // In Ivy if this value is set via a static attribute (e.g. <table multiTemplateDataRows>),
        // this setter will be invoked before the row outlet has been defined hence the null check.
        if (this._rowOutlet && this._rowOutlet.viewContainer.length) {
            this._forceRenderDataRows();
            this.updateStickyColumnStyles();
        }
    }
    ngOnInit() {
        this._setupStickyStyler();
        if (this._isNativeHtmlTable) {
            this._applyNativeTableSections();
        }
        // Set up the trackBy function so that it uses the `RenderRow` as its identity by default. If
        // the user has provided a custom trackBy, return the result of that function as evaluated
        // with the values of the `RenderRow`'s data and index.
        this._dataDiffer = this._differs.find([]).create((_i, dataRow) => {
            return this.trackBy ? this.trackBy(dataRow.dataIndex, dataRow.data) : dataRow;
        });
    }
    ngAfterContentChecked() {
        // Cache the row and column definitions gathered by ContentChildren and programmatic injection.
        this._cacheRowDefs();
        this._cacheColumnDefs();
        // Make sure that the user has at least added header, footer, or data row def.
        if (!this._headerRowDefs.length && !this._footerRowDefs.length && !this._rowDefs.length &&
            (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getTableMissingRowDefsError();
        }
        // Render updates if the list of columns have been changed for the header, row, or footer defs.
        const columnsChanged = this._renderUpdatedColumns();
        const stickyColumnStyleUpdateNeeded = columnsChanged || this._headerRowDefChanged || this._footerRowDefChanged;
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
        else if (stickyColumnStyleUpdateNeeded) {
            // In the above case, _observeRenderChanges will result in updateStickyColumnStyles being
            // called when it row data arrives. Otherwise, we need to call it proactively.
            this.updateStickyColumnStyles();
        }
        this._checkStickyStates();
    }
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
     */
    renderRows() {
        this._renderRows = this._getAllRenderRows();
        const changes = this._dataDiffer.diff(this._renderRows);
        if (!changes) {
            this._updateNoDataRow();
            return;
        }
        const viewContainer = this._rowOutlet.viewContainer;
        // @breaking-change 11.0.0 Remove null check for `_viewRepeater` and the
        // `else` clause once `_viewRepeater` is turned into a required parameter.
        if (this._viewRepeater) {
            this._viewRepeater.applyChanges(changes, viewContainer, (record, _adjustedPreviousIndex, currentIndex) => this._getEmbeddedViewArgs(record.item, currentIndex), (record) => record.item.data, (change) => {
                if (change.operation === 1 /* INSERTED */ && change.context) {
                    this._renderCellTemplateForItem(change.record.item.rowDef, change.context);
                }
            });
        }
        else {
            changes.forEachOperation((record, prevIndex, currentIndex) => {
                if (record.previousIndex == null) {
                    const renderRow = record.item;
                    const rowDef = renderRow.rowDef;
                    const context = { $implicit: renderRow.data };
                    this._renderRow(this._rowOutlet, rowDef, currentIndex, context);
                }
                else if (currentIndex == null) {
                    viewContainer.remove(prevIndex);
                }
                else {
                    const view = viewContainer.get(prevIndex);
                    viewContainer.move(view, currentIndex);
                }
            });
        }
        // Update the meta context of a row's context data (index, count, first, last, ...)
        this._updateRowIndexContext();
        // Update rows that did not get added/removed/moved but may have had their identity changed,
        // e.g. if trackBy matched data on some property but the actual data reference changed.
        changes.forEachIdentityChange((record) => {
            const rowView = viewContainer.get(record.currentIndex);
            rowView.context.$implicit = record.item.data;
        });
        this._updateNoDataRow();
        this.updateStickyColumnStyles();
    }
    /** Adds a column definition that was not included as part of the content children. */
    addColumnDef(columnDef) {
        this._customColumnDefs.add(columnDef);
    }
    /** Removes a column definition that was not included as part of the content children. */
    removeColumnDef(columnDef) {
        this._customColumnDefs.delete(columnDef);
    }
    /** Adds a row definition that was not included as part of the content children. */
    addRowDef(rowDef) {
        this._customRowDefs.add(rowDef);
    }
    /** Removes a row definition that was not included as part of the content children. */
    removeRowDef(rowDef) {
        this._customRowDefs.delete(rowDef);
    }
    /** Adds a header row definition that was not included as part of the content children. */
    addHeaderRowDef(headerRowDef) {
        this._customHeaderRowDefs.add(headerRowDef);
        this._headerRowDefChanged = true;
    }
    /** Removes a header row definition that was not included as part of the content children. */
    removeHeaderRowDef(headerRowDef) {
        this._customHeaderRowDefs.delete(headerRowDef);
        this._headerRowDefChanged = true;
    }
    /** Adds a footer row definition that was not included as part of the content children. */
    addFooterRowDef(footerRowDef) {
        this._customFooterRowDefs.add(footerRowDef);
        this._footerRowDefChanged = true;
    }
    /** Removes a footer row definition that was not included as part of the content children. */
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
     */
    updateStickyHeaderRowStyles() {
        const headerRows = this._getRenderedRows(this._headerRowOutlet);
        const tableElement = this._elementRef.nativeElement;
        // Hide the thead element if there are no header rows. This is necessary to satisfy
        // overzealous a11y checkers that fail because the `rowgroup` element does not contain
        // required child `row`.
        const thead = tableElement.querySelector('thead');
        if (thead) {
            thead.style.display = headerRows.length ? '' : 'none';
        }
        const stickyStates = this._headerRowDefs.map(def => def.sticky);
        this._stickyStyler.clearStickyPositioning(headerRows, ['top']);
        this._stickyStyler.stickRows(headerRows, stickyStates, 'top');
        // Reset the dirty state of the sticky input change since it has been used.
        this._headerRowDefs.forEach(def => def.resetStickyChanged());
    }
    /**
     * Updates the footer sticky styles. First resets all applied styles with respect to the cells
     * sticking to the bottom. Then, evaluating which cells need to be stuck to the bottom. This is
     * automatically called when the footer row changes its displayed set of columns, or if its
     * sticky input changes. May be called manually for cases where the cell content changes outside
     * of these events.
     */
    updateStickyFooterRowStyles() {
        const footerRows = this._getRenderedRows(this._footerRowOutlet);
        const tableElement = this._elementRef.nativeElement;
        // Hide the tfoot element if there are no footer rows. This is necessary to satisfy
        // overzealous a11y checkers that fail because the `rowgroup` element does not contain
        // required child `row`.
        const tfoot = tableElement.querySelector('tfoot');
        if (tfoot) {
            tfoot.style.display = footerRows.length ? '' : 'none';
        }
        const stickyStates = this._footerRowDefs.map(def => def.sticky);
        this._stickyStyler.clearStickyPositioning(footerRows, ['bottom']);
        this._stickyStyler.stickRows(footerRows, stickyStates, 'bottom');
        this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement, stickyStates);
        // Reset the dirty state of the sticky input change since it has been used.
        this._footerRowDefs.forEach(def => def.resetStickyChanged());
    }
    /**
     * Updates the column sticky styles. First resets all applied styles with respect to the cells
     * sticking to the left and right. Then sticky styles are added for the left and right according
     * to the column definitions for each cell in each row. This is automatically called when
     * the data source provides a new set of data or when a column definition changes its sticky
     * input. May be called manually for cases where the cell content changes outside of these events.
     */
    updateStickyColumnStyles() {
        const headerRows = this._getRenderedRows(this._headerRowOutlet);
        const dataRows = this._getRenderedRows(this._rowOutlet);
        const footerRows = this._getRenderedRows(this._footerRowOutlet);
        // Clear the left and right positioning from all columns in the table across all rows since
        // sticky columns span across all table sections (header, data, footer)
        this._stickyStyler.clearStickyPositioning([...headerRows, ...dataRows, ...footerRows], ['left', 'right']);
        // Update the sticky styles for each header row depending on the def's sticky state
        headerRows.forEach((headerRow, i) => {
            this._addStickyColumnStyles([headerRow], this._headerRowDefs[i]);
        });
        // Update the sticky styles for each data row depending on its def's sticky state
        this._rowDefs.forEach(rowDef => {
            // Collect all the rows rendered with this row definition.
            const rows = [];
            for (let i = 0; i < dataRows.length; i++) {
                if (this._renderRows[i].rowDef === rowDef) {
                    rows.push(dataRows[i]);
                }
            }
            this._addStickyColumnStyles(rows, rowDef);
        });
        // Update the sticky styles for each footer row depending on the def's sticky state
        footerRows.forEach((footerRow, i) => {
            this._addStickyColumnStyles([footerRow], this._footerRowDefs[i]);
        });
        // Reset the dirty state of the sticky input change since it has been used.
        Array.from(this._columnDefsByName.values()).forEach(def => def.resetStickyChanged());
    }
    /**
     * Get the list of RenderRow objects to render according to the current list of data and defined
     * row definitions. If the previous list already contained a particular pair, it should be reused
     * so that the differ equates their references.
     */
    _getAllRenderRows() {
        const renderRows = [];
        // Store the cache and create a new one. Any re-used RenderRow objects will be moved into the
        // new cache while unused ones can be picked up by garbage collection.
        const prevCachedRenderRows = this._cachedRenderRowsMap;
        this._cachedRenderRowsMap = new Map();
        // For each data object, get the list of rows that should be rendered, represented by the
        // respective `RenderRow` object which is the pair of `data` and `CdkRowDef`.
        for (let i = 0; i < this._data.length; i++) {
            let data = this._data[i];
            const renderRowsForData = this._getRenderRowsForData(data, i, prevCachedRenderRows.get(data));
            if (!this._cachedRenderRowsMap.has(data)) {
                this._cachedRenderRowsMap.set(data, new WeakMap());
            }
            for (let j = 0; j < renderRowsForData.length; j++) {
                let renderRow = renderRowsForData[j];
                const cache = this._cachedRenderRowsMap.get(renderRow.data);
                if (cache.has(renderRow.rowDef)) {
                    cache.get(renderRow.rowDef).push(renderRow);
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
     */
    _getRenderRowsForData(data, dataIndex, cache) {
        const rowDefs = this._getRowDefs(data, dataIndex);
        return rowDefs.map(rowDef => {
            const cachedRenderRows = (cache && cache.has(rowDef)) ? cache.get(rowDef) : [];
            if (cachedRenderRows.length) {
                const dataRow = cachedRenderRows.shift();
                dataRow.dataIndex = dataIndex;
                return dataRow;
            }
            else {
                return { data, rowDef, dataIndex };
            }
        });
    }
    /** Update the map containing the content's column definitions. */
    _cacheColumnDefs() {
        this._columnDefsByName.clear();
        const columnDefs = mergeArrayAndSet(this._getOwnDefs(this._contentColumnDefs), this._customColumnDefs);
        columnDefs.forEach(columnDef => {
            if (this._columnDefsByName.has(columnDef.name) &&
                (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw getTableDuplicateColumnNameError(columnDef.name);
            }
            this._columnDefsByName.set(columnDef.name, columnDef);
        });
    }
    /** Update the list of all available row definitions that can be used. */
    _cacheRowDefs() {
        this._headerRowDefs = mergeArrayAndSet(this._getOwnDefs(this._contentHeaderRowDefs), this._customHeaderRowDefs);
        this._footerRowDefs = mergeArrayAndSet(this._getOwnDefs(this._contentFooterRowDefs), this._customFooterRowDefs);
        this._rowDefs = mergeArrayAndSet(this._getOwnDefs(this._contentRowDefs), this._customRowDefs);
        // After all row definitions are determined, find the row definition to be considered default.
        const defaultRowDefs = this._rowDefs.filter(def => !def.when);
        if (!this.multiTemplateDataRows && defaultRowDefs.length > 1 &&
            (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getTableMultipleDefaultRowDefsError();
        }
        this._defaultRowDef = defaultRowDefs[0];
    }
    /**
     * Check if the header, data, or footer rows have changed what columns they want to display or
     * whether the sticky states have changed for the header or footer. If there is a diff, then
     * re-render that section.
     */
    _renderUpdatedColumns() {
        const columnsDiffReducer = (acc, def) => acc || !!def.getColumnsDiff();
        // Force re-render data rows if the list of column definitions have changed.
        const dataColumnsChanged = this._rowDefs.reduce(columnsDiffReducer, false);
        if (dataColumnsChanged) {
            this._forceRenderDataRows();
        }
        // Force re-render header/footer rows if the list of column definitions have changed.
        const headerColumnsChanged = this._headerRowDefs.reduce(columnsDiffReducer, false);
        if (headerColumnsChanged) {
            this._forceRenderHeaderRows();
        }
        const footerColumnsChanged = this._footerRowDefs.reduce(columnsDiffReducer, false);
        if (footerColumnsChanged) {
            this._forceRenderFooterRows();
        }
        return dataColumnsChanged || headerColumnsChanged || footerColumnsChanged;
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row outlet. Otherwise start listening for new data.
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
    /** Set up a subscription for the data provided by the data source. */
    _observeRenderChanges() {
        // If no data source has been set, there is nothing to observe for changes.
        if (!this.dataSource) {
            return;
        }
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
        if (dataStream === undefined && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getTableUnknownDataSourceError();
        }
        this._renderChangeSubscription = dataStream.pipe(takeUntil(this._onDestroy))
            .subscribe(data => {
            this._data = data || [];
            this.renderRows();
        });
    }
    /**
     * Clears any existing content in the header row outlet and creates a new embedded view
     * in the outlet using the header row definition.
     */
    _forceRenderHeaderRows() {
        // Clear the header row outlet if any content exists.
        if (this._headerRowOutlet.viewContainer.length > 0) {
            this._headerRowOutlet.viewContainer.clear();
        }
        this._headerRowDefs.forEach((def, i) => this._renderRow(this._headerRowOutlet, def, i));
        this.updateStickyHeaderRowStyles();
    }
    /**
     * Clears any existing content in the footer row outlet and creates a new embedded view
     * in the outlet using the footer row definition.
     */
    _forceRenderFooterRows() {
        // Clear the footer row outlet if any content exists.
        if (this._footerRowOutlet.viewContainer.length > 0) {
            this._footerRowOutlet.viewContainer.clear();
        }
        this._footerRowDefs.forEach((def, i) => this._renderRow(this._footerRowOutlet, def, i));
        this.updateStickyFooterRowStyles();
    }
    /** Adds the sticky column styles for the rows according to the columns' stick states. */
    _addStickyColumnStyles(rows, rowDef) {
        const columnDefs = Array.from(rowDef.columns || []).map(columnName => {
            const columnDef = this._columnDefsByName.get(columnName);
            if (!columnDef && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw getTableUnknownColumnError(columnName);
            }
            return columnDef;
        });
        const stickyStartStates = columnDefs.map(columnDef => columnDef.sticky);
        const stickyEndStates = columnDefs.map(columnDef => columnDef.stickyEnd);
        this._stickyStyler.updateStickyColumns(rows, stickyStartStates, stickyEndStates);
    }
    /** Gets the list of rows that have been rendered in the row outlet. */
    _getRenderedRows(rowOutlet) {
        const renderedRows = [];
        for (let i = 0; i < rowOutlet.viewContainer.length; i++) {
            const viewRef = rowOutlet.viewContainer.get(i);
            renderedRows.push(viewRef.rootNodes[0]);
        }
        return renderedRows;
    }
    /**
     * Get the matching row definitions that should be used for this row data. If there is only
     * one row definition, it is returned. Otherwise, find the row definitions that has a when
     * predicate that returns true with the data. If none return true, return the default row
     * definition.
     */
    _getRowDefs(data, dataIndex) {
        if (this._rowDefs.length == 1) {
            return [this._rowDefs[0]];
        }
        let rowDefs = [];
        if (this.multiTemplateDataRows) {
            rowDefs = this._rowDefs.filter(def => !def.when || def.when(dataIndex, data));
        }
        else {
            let rowDef = this._rowDefs.find(def => def.when && def.when(dataIndex, data)) || this._defaultRowDef;
            if (rowDef) {
                rowDefs.push(rowDef);
            }
        }
        if (!rowDefs.length && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getTableMissingMatchingRowDefError(data);
        }
        return rowDefs;
    }
    _getEmbeddedViewArgs(renderRow, index) {
        const rowDef = renderRow.rowDef;
        const context = { $implicit: renderRow.data };
        return {
            templateRef: rowDef.template,
            context,
            index,
        };
    }
    /**
     * Creates a new row template in the outlet and fills it with the set of cell templates.
     * Optionally takes a context to provide to the row and cells, as well as an optional index
     * of where to place the new row template in the outlet.
     */
    _renderRow(outlet, rowDef, index, context = {}) {
        // TODO(andrewseguin): enforce that one outlet was instantiated from createEmbeddedView
        const view = outlet.viewContainer.createEmbeddedView(rowDef.template, context, index);
        this._renderCellTemplateForItem(rowDef, context);
        return view;
    }
    _renderCellTemplateForItem(rowDef, context) {
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
     */
    _updateRowIndexContext() {
        const viewContainer = this._rowOutlet.viewContainer;
        for (let renderIndex = 0, count = viewContainer.length; renderIndex < count; renderIndex++) {
            const viewRef = viewContainer.get(renderIndex);
            const context = viewRef.context;
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
    /** Gets the column definitions for the provided row def. */
    _getCellTemplates(rowDef) {
        if (!rowDef || !rowDef.columns) {
            return [];
        }
        return Array.from(rowDef.columns, columnId => {
            const column = this._columnDefsByName.get(columnId);
            if (!column && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw getTableUnknownColumnError(columnId);
            }
            return rowDef.extractCellTemplate(column);
        });
    }
    /** Adds native table sections (e.g. tbody) and moves the row outlets into them. */
    _applyNativeTableSections() {
        const documentFragment = this._document.createDocumentFragment();
        const sections = [
            { tag: 'thead', outlets: [this._headerRowOutlet] },
            { tag: 'tbody', outlets: [this._rowOutlet, this._noDataRowOutlet] },
            { tag: 'tfoot', outlets: [this._footerRowOutlet] },
        ];
        for (const section of sections) {
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
     */
    _forceRenderDataRows() {
        this._dataDiffer.diff([]);
        this._rowOutlet.viewContainer.clear();
        this.renderRows();
    }
    /**
     * Checks if there has been a change in sticky states since last check and applies the correct
     * sticky styles. Since checking resets the "dirty" state, this should only be performed once
     * during a change detection and after the inputs are settled (after content check).
     */
    _checkStickyStates() {
        const stickyCheckReducer = (acc, d) => {
            return acc || d.hasStickyChanged();
        };
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
     */
    _setupStickyStyler() {
        const direction = this._dir ? this._dir.value : 'ltr';
        this._stickyStyler = new StickyStyler(this._isNativeHtmlTable, this.stickyCssClass, direction, this._coalescedStyleScheduler, this._platform.isBrowser, this.needsPositionStickyOnElement);
        (this._dir ? this._dir.change : observableOf())
            .pipe(takeUntil(this._onDestroy))
            .subscribe(value => {
            this._stickyStyler.direction = value;
            this.updateStickyColumnStyles();
        });
    }
    /** Filters definitions that belong to this table from a QueryList. */
    _getOwnDefs(items) {
        return items.filter(item => !item._table || item._table === this);
    }
    /** Creates or removes the no data row, depending on whether any data is being shown. */
    _updateNoDataRow() {
        if (this._noDataRow) {
            const shouldShow = this._rowOutlet.viewContainer.length === 0;
            if (shouldShow !== this._isShowingNoDataRow) {
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
                providers: [
                    { provide: CDK_TABLE, useExisting: CdkTable },
                    { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
                    { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
                ]
            },] }
];
CdkTable.ctorParameters = () => [
    { type: IterableDiffers },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Platform },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_VIEW_REPEATER_STRATEGY,] }] },
    { type: _CoalescedStyleScheduler, decorators: [{ type: Optional }, { type: Inject, args: [_COALESCED_STYLE_SCHEDULER,] }] }
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
/** Utility function that gets a merged list of the entries in an array and values of a Set. */
function mergeArrayAndSet(array, set) {
    return array.concat(Array.from(set));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrL3RhYmxlL3RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBWSxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBR0wsNEJBQTRCLEVBQzVCLFlBQVksRUFDWix1QkFBdUIsR0FLeEIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLGVBQWUsRUFDZixNQUFNLEVBQ04sS0FBSyxFQUdMLGVBQWUsRUFHZixRQUFRLEVBQ1IsU0FBUyxFQUdULFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxlQUFlLEVBQ2YsWUFBWSxFQUVaLEVBQUUsSUFBSSxZQUFZLEVBQ2xCLE9BQU8sR0FFUixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSwwQkFBMEIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2pHLE9BQU8sRUFFTCxhQUFhLEVBR2IsZUFBZSxFQUNmLGVBQWUsRUFDZixZQUFZLEVBQ1osU0FBUyxFQUNWLE1BQU0sT0FBTyxDQUFDO0FB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QUFFO29CQUNoQyxXQUFXLEVBQUUsSUFBSTtpQkFDbEI7b0NBR0EsZUFBZSxTQUFDLGVBQWUsRUFBRTtvQkFDaEMsV0FBVyxFQUFFLElBQUk7aUJBQ2xCO3lCQUdBLFlBQVksU0FBQyxZQUFZOztBQXl1QjVCLCtGQUErRjtBQUMvRixTQUFTLGdCQUFnQixDQUFJLEtBQVUsRUFBRSxHQUFXO0lBQ2xELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDb2xsZWN0aW9uVmlld2VyLFxuICBEYXRhU291cmNlLFxuICBfRGlzcG9zZVZpZXdSZXBlYXRlclN0cmF0ZWd5LFxuICBpc0RhdGFTb3VyY2UsXG4gIF9WSUVXX1JFUEVBVEVSX1NUUkFURUdZLFxuICBfVmlld1JlcGVhdGVyLFxuICBfVmlld1JlcGVhdGVySXRlbUNoYW5nZSxcbiAgX1ZpZXdSZXBlYXRlckl0ZW1JbnNlcnRBcmdzLFxuICBfVmlld1JlcGVhdGVyT3BlcmF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIEl0ZXJhYmxlQ2hhbmdlUmVjb3JkLFxuICBJdGVyYWJsZURpZmZlcixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFRyYWNrQnlGdW5jdGlvbixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGlzT2JzZXJ2YWJsZSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YgYXMgb2JzZXJ2YWJsZU9mLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7Q2RrQ29sdW1uRGVmfSBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHtfQ29hbGVzY2VkU3R5bGVTY2hlZHVsZXIsIF9DT0FMRVNDRURfU1RZTEVfU0NIRURVTEVSfSBmcm9tICcuL2NvYWxlc2NlZC1zdHlsZS1zY2hlZHVsZXInO1xuaW1wb3J0IHtcbiAgQmFzZVJvd0RlZixcbiAgQ2RrQ2VsbE91dGxldCxcbiAgQ2RrQ2VsbE91dGxldE11bHRpUm93Q29udGV4dCxcbiAgQ2RrQ2VsbE91dGxldFJvd0NvbnRleHQsXG4gIENka0Zvb3RlclJvd0RlZixcbiAgQ2RrSGVhZGVyUm93RGVmLFxuICBDZGtOb0RhdGFSb3csXG4gIENka1Jvd0RlZlxufSBmcm9tICcuL3Jvdyc7XG5pbXBvcnQge1N0aWNreVN0eWxlcn0gZnJvbSAnLi9zdGlja3ktc3R5bGVyJztcbmltcG9ydCB7XG4gIGdldFRhYmxlRHVwbGljYXRlQ29sdW1uTmFtZUVycm9yLFxuICBnZXRUYWJsZU1pc3NpbmdNYXRjaGluZ1Jvd0RlZkVycm9yLFxuICBnZXRUYWJsZU1pc3NpbmdSb3dEZWZzRXJyb3IsXG4gIGdldFRhYmxlTXVsdGlwbGVEZWZhdWx0Um93RGVmc0Vycm9yLFxuICBnZXRUYWJsZVVua25vd25Db2x1bW5FcnJvcixcbiAgZ2V0VGFibGVVbmtub3duRGF0YVNvdXJjZUVycm9yXG59IGZyb20gJy4vdGFibGUtZXJyb3JzJztcbmltcG9ydCB7Q0RLX1RBQkxFfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8qKiBJbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGFuIG91dGxldCBmb3Igcm93cyB0byBiZSBpbnNlcnRlZCBpbnRvLiAqL1xuZXhwb3J0IGludGVyZmFjZSBSb3dPdXRsZXQge1xuICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuXG4vKipcbiAqIFVuaW9uIG9mIHRoZSB0eXBlcyB0aGF0IGNhbiBiZSBzZXQgYXMgdGhlIGRhdGEgc291cmNlIGZvciBhIGBDZGtUYWJsZWAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbnR5cGUgQ2RrVGFibGVEYXRhU291cmNlSW5wdXQ8VD4gPVxuICAgIERhdGFTb3VyY2U8VD58T2JzZXJ2YWJsZTxSZWFkb25seUFycmF5PFQ+fFRbXT58UmVhZG9ubHlBcnJheTxUPnxUW107XG5cbi8qKlxuICogUHJvdmlkZXMgYSBoYW5kbGUgZm9yIHRoZSB0YWJsZSB0byBncmFiIHRoZSB2aWV3IGNvbnRhaW5lcidzIG5nLWNvbnRhaW5lciB0byBpbnNlcnQgZGF0YSByb3dzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tyb3dPdXRsZXRdJ30pXG5leHBvcnQgY2xhc3MgRGF0YVJvd091dGxldCBpbXBsZW1lbnRzIFJvd091dGxldCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhIGhhbmRsZSBmb3IgdGhlIHRhYmxlIHRvIGdyYWIgdGhlIHZpZXcgY29udGFpbmVyJ3MgbmctY29udGFpbmVyIHRvIGluc2VydCB0aGUgaGVhZGVyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1toZWFkZXJSb3dPdXRsZXRdJ30pXG5leHBvcnQgY2xhc3MgSGVhZGVyUm93T3V0bGV0IGltcGxlbWVudHMgUm93T3V0bGV0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgaGFuZGxlIGZvciB0aGUgdGFibGUgdG8gZ3JhYiB0aGUgdmlldyBjb250YWluZXIncyBuZy1jb250YWluZXIgdG8gaW5zZXJ0IHRoZSBmb290ZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2Zvb3RlclJvd091dGxldF0nfSlcbmV4cG9ydCBjbGFzcyBGb290ZXJSb3dPdXRsZXQgaW1wbGVtZW50cyBSb3dPdXRsZXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYSBoYW5kbGUgZm9yIHRoZSB0YWJsZSB0byBncmFiIHRoZSB2aWV3XG4gKiBjb250YWluZXIncyBuZy1jb250YWluZXIgdG8gaW5zZXJ0IHRoZSBubyBkYXRhIHJvdy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbm9EYXRhUm93T3V0bGV0XSd9KVxuZXhwb3J0IGNsYXNzIE5vRGF0YVJvd091dGxldCBpbXBsZW1lbnRzIFJvd091dGxldCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLyoqXG4gKiBUaGUgdGFibGUgdGVtcGxhdGUgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgbWF0LXRhYmxlLiBTaG91bGQgbm90IGJlIHVzZWQgb3V0c2lkZSBvZiB0aGVcbiAqIG1hdGVyaWFsIGxpYnJhcnkuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBDREtfVEFCTEVfVEVNUExBVEUgPVxuICAgIC8vIE5vdGUgdGhhdCBhY2NvcmRpbmcgdG8gTUROLCB0aGUgYGNhcHRpb25gIGVsZW1lbnQgaGFzIHRvIGJlIHByb2plY3RlZCBhcyB0aGUgKipmaXJzdCoqXG4gICAgLy8gZWxlbWVudCBpbiB0aGUgdGFibGUuIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvY2FwdGlvblxuICAgIGBcbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2FwdGlvblwiPjwvbmctY29udGVudD5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY29sZ3JvdXAsIGNvbFwiPjwvbmctY29udGVudD5cbiAgPG5nLWNvbnRhaW5lciBoZWFkZXJSb3dPdXRsZXQ+PC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250YWluZXIgcm93T3V0bGV0PjwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyIG5vRGF0YVJvd091dGxldD48L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciBmb290ZXJSb3dPdXRsZXQ+PC9uZy1jb250YWluZXI+XG5gO1xuXG4vKipcbiAqIEludGVyZmFjZSB1c2VkIHRvIGNvbnZlbmllbnRseSB0eXBlIHRoZSBwb3NzaWJsZSBjb250ZXh0IGludGVyZmFjZXMgZm9yIHRoZSByZW5kZXIgcm93LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NvbnRleHQ8VD4gZXh0ZW5kcyBDZGtDZWxsT3V0bGV0TXVsdGlSb3dDb250ZXh0PFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2RrQ2VsbE91dGxldFJvd0NvbnRleHQ8VD4ge31cblxuLyoqXG4gKiBDbGFzcyB1c2VkIHRvIGNvbnZlbmllbnRseSB0eXBlIHRoZSBlbWJlZGRlZCB2aWV3IHJlZiBmb3Igcm93cyB3aXRoIGEgY29udGV4dC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuYWJzdHJhY3QgY2xhc3MgUm93Vmlld1JlZjxUPiBleHRlbmRzIEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PFQ+PiB7fVxuXG4vKipcbiAqIFNldCBvZiBwcm9wZXJ0aWVzIHRoYXQgcmVwcmVzZW50cyB0aGUgaWRlbnRpdHkgb2YgYSBzaW5nbGUgcmVuZGVyZWQgcm93LlxuICpcbiAqIFdoZW4gdGhlIHRhYmxlIG5lZWRzIHRvIGRldGVybWluZSB0aGUgbGlzdCBvZiByb3dzIHRvIHJlbmRlciwgaXQgd2lsbCBkbyBzbyBieSBpdGVyYXRpbmcgdGhyb3VnaFxuICogZWFjaCBkYXRhIG9iamVjdCBhbmQgZXZhbHVhdGluZyBpdHMgbGlzdCBvZiByb3cgdGVtcGxhdGVzIHRvIGRpc3BsYXkgKHdoZW4gbXVsdGlUZW1wbGF0ZURhdGFSb3dzXG4gKiBpcyBmYWxzZSwgdGhlcmUgaXMgb25seSBvbmUgdGVtcGxhdGUgcGVyIGRhdGEgb2JqZWN0KS4gRm9yIGVhY2ggcGFpciBvZiBkYXRhIG9iamVjdCBhbmQgcm93XG4gKiB0ZW1wbGF0ZSwgYSBgUmVuZGVyUm93YCBpcyBhZGRlZCB0byB0aGUgbGlzdCBvZiByb3dzIHRvIHJlbmRlci4gSWYgdGhlIGRhdGEgb2JqZWN0IGFuZCByb3dcbiAqIHRlbXBsYXRlIHBhaXIgaGFzIGFscmVhZHkgYmVlbiByZW5kZXJlZCwgdGhlIHByZXZpb3VzbHkgdXNlZCBgUmVuZGVyUm93YCBpcyBhZGRlZDsgZWxzZSBhIG5ld1xuICogYFJlbmRlclJvd2AgaXMgKiBjcmVhdGVkLiBPbmNlIHRoZSBsaXN0IGlzIGNvbXBsZXRlIGFuZCBhbGwgZGF0YSBvYmplY3RzIGhhdmUgYmVlbiBpdGVyZWF0ZWRcbiAqIHRocm91Z2gsIGEgZGlmZiBpcyBwZXJmb3JtZWQgdG8gZGV0ZXJtaW5lIHRoZSBjaGFuZ2VzIHRoYXQgbmVlZCB0byBiZSBtYWRlIHRvIHRoZSByZW5kZXJlZCByb3dzLlxuICpcbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJSb3c8VD4ge1xuICBkYXRhOiBUO1xuICBkYXRhSW5kZXg6IG51bWJlcjtcbiAgcm93RGVmOiBDZGtSb3dEZWY8VD47XG59XG5cbi8qKlxuICogQSBkYXRhIHRhYmxlIHRoYXQgY2FuIHJlbmRlciBhIGhlYWRlciByb3csIGRhdGEgcm93cywgYW5kIGEgZm9vdGVyIHJvdy5cbiAqIFVzZXMgdGhlIGRhdGFTb3VyY2UgaW5wdXQgdG8gZGV0ZXJtaW5lIHRoZSBkYXRhIHRvIGJlIHJlbmRlcmVkLiBUaGUgZGF0YSBjYW4gYmUgcHJvdmlkZWQgZWl0aGVyXG4gKiBhcyBhIGRhdGEgYXJyYXksIGFuIE9ic2VydmFibGUgc3RyZWFtIHRoYXQgZW1pdHMgdGhlIGRhdGEgYXJyYXkgdG8gcmVuZGVyLCBvciBhIERhdGFTb3VyY2Ugd2l0aCBhXG4gKiBjb25uZWN0IGZ1bmN0aW9uIHRoYXQgd2lsbCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBzdHJlYW0gdGhhdCBlbWl0cyB0aGUgZGF0YSBhcnJheSB0byByZW5kZXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nkay10YWJsZSwgdGFibGVbY2RrLXRhYmxlXScsXG4gIGV4cG9ydEFzOiAnY2RrVGFibGUnLFxuICB0ZW1wbGF0ZTogQ0RLX1RBQkxFX1RFTVBMQVRFLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2Nkay10YWJsZScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIFRoZSBcIk9uUHVzaFwiIHN0YXR1cyBmb3IgdGhlIGBNYXRUYWJsZWAgY29tcG9uZW50IGlzIGVmZmVjdGl2ZWx5IGEgbm9vcCwgc28gd2UgYXJlIHJlbW92aW5nIGl0LlxuICAvLyBUaGUgdmlldyBmb3IgYE1hdFRhYmxlYCBjb25zaXN0cyBlbnRpcmVseSBvZiB0ZW1wbGF0ZXMgZGVjbGFyZWQgaW4gb3RoZXIgdmlld3MuIEFzIHRoZXkgYXJlXG4gIC8vIGRlY2xhcmVkIGVsc2V3aGVyZSwgdGhleSBhcmUgY2hlY2tlZCB3aGVuIHRoZWlyIGRlY2xhcmF0aW9uIHBvaW50cyBhcmUgY2hlY2tlZC5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogQ0RLX1RBQkxFLCB1c2VFeGlzdGluZzogQ2RrVGFibGV9LFxuICAgIHtwcm92aWRlOiBfVklFV19SRVBFQVRFUl9TVFJBVEVHWSwgdXNlQ2xhc3M6IF9EaXNwb3NlVmlld1JlcGVhdGVyU3RyYXRlZ3l9LFxuICAgIHtwcm92aWRlOiBfQ09BTEVTQ0VEX1NUWUxFX1NDSEVEVUxFUiwgdXNlQ2xhc3M6IF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcn0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2RrVGFibGU8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb2xsZWN0aW9uVmlld2VyLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICAvKiogTGF0ZXN0IGRhdGEgcHJvdmlkZWQgYnkgdGhlIGRhdGEgc291cmNlLiAqL1xuICBwcm90ZWN0ZWQgX2RhdGE6IFRbXXxSZWFkb25seUFycmF5PFQ+O1xuXG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogTGlzdCBvZiB0aGUgcmVuZGVyZWQgcm93cyBhcyBpZGVudGlmaWVkIGJ5IHRoZWlyIGBSZW5kZXJSb3dgIG9iamVjdC4gKi9cbiAgcHJpdmF0ZSBfcmVuZGVyUm93czogUmVuZGVyUm93PFQ+W107XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0aGF0IGxpc3RlbnMgZm9yIHRoZSBkYXRhIHByb3ZpZGVkIGJ5IHRoZSBkYXRhIHNvdXJjZS4gKi9cbiAgcHJpdmF0ZSBfcmVuZGVyQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb258bnVsbDtcblxuICAvKipcbiAgICogTWFwIG9mIGFsbCB0aGUgdXNlcidzIGRlZmluZWQgY29sdW1ucyAoaGVhZGVyLCBkYXRhLCBhbmQgZm9vdGVyIGNlbGwgdGVtcGxhdGUpIGlkZW50aWZpZWQgYnlcbiAgICogbmFtZS4gQ29sbGVjdGlvbiBwb3B1bGF0ZWQgYnkgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBnYXRoZXJlZCBieSBgQ29udGVudENoaWxkcmVuYCBhcyB3ZWxsIGFzXG4gICAqIGFueSBjdXN0b20gY29sdW1uIGRlZmluaXRpb25zIGFkZGVkIHRvIGBfY3VzdG9tQ29sdW1uRGVmc2AuXG4gICAqL1xuICBwcml2YXRlIF9jb2x1bW5EZWZzQnlOYW1lID0gbmV3IE1hcDxzdHJpbmcsIENka0NvbHVtbkRlZj4oKTtcblxuICAvKipcbiAgICogU2V0IG9mIGFsbCByb3cgZGVmaW5pdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGlzIHRhYmxlLiBQb3B1bGF0ZWQgYnkgdGhlIHJvd3MgZ2F0aGVyZWQgYnlcbiAgICogdXNpbmcgYENvbnRlbnRDaGlsZHJlbmAgYXMgd2VsbCBhcyBhbnkgY3VzdG9tIHJvdyBkZWZpbml0aW9ucyBhZGRlZCB0byBgX2N1c3RvbVJvd0RlZnNgLlxuICAgKi9cbiAgcHJpdmF0ZSBfcm93RGVmczogQ2RrUm93RGVmPFQ+W107XG5cbiAgLyoqXG4gICAqIFNldCBvZiBhbGwgaGVhZGVyIHJvdyBkZWZpbml0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoaXMgdGFibGUuIFBvcHVsYXRlZCBieSB0aGUgcm93c1xuICAgKiBnYXRoZXJlZCBieSB1c2luZyBgQ29udGVudENoaWxkcmVuYCBhcyB3ZWxsIGFzIGFueSBjdXN0b20gcm93IGRlZmluaXRpb25zIGFkZGVkIHRvXG4gICAqIGBfY3VzdG9tSGVhZGVyUm93RGVmc2AuXG4gICAqL1xuICBwcml2YXRlIF9oZWFkZXJSb3dEZWZzOiBDZGtIZWFkZXJSb3dEZWZbXTtcblxuICAvKipcbiAgICogU2V0IG9mIGFsbCByb3cgZGVmaW5pdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGlzIHRhYmxlLiBQb3B1bGF0ZWQgYnkgdGhlIHJvd3MgZ2F0aGVyZWQgYnlcbiAgICogdXNpbmcgYENvbnRlbnRDaGlsZHJlbmAgYXMgd2VsbCBhcyBhbnkgY3VzdG9tIHJvdyBkZWZpbml0aW9ucyBhZGRlZCB0b1xuICAgKiBgX2N1c3RvbUZvb3RlclJvd0RlZnNgLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyUm93RGVmczogQ2RrRm9vdGVyUm93RGVmW107XG5cbiAgLyoqIERpZmZlciB1c2VkIHRvIGZpbmQgdGhlIGNoYW5nZXMgaW4gdGhlIGRhdGEgcHJvdmlkZWQgYnkgdGhlIGRhdGEgc291cmNlLiAqL1xuICBwcml2YXRlIF9kYXRhRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxSZW5kZXJSb3c8VD4+O1xuXG4gIC8qKiBTdG9yZXMgdGhlIHJvdyBkZWZpbml0aW9uIHRoYXQgZG9lcyBub3QgaGF2ZSBhIHdoZW4gcHJlZGljYXRlLiAqL1xuICBwcml2YXRlIF9kZWZhdWx0Um93RGVmOiBDZGtSb3dEZWY8VD58bnVsbDtcblxuICAvKipcbiAgICogQ29sdW1uIGRlZmluaXRpb25zIHRoYXQgd2VyZSBkZWZpbmVkIG91dHNpZGUgb2YgdGhlIGRpcmVjdCBjb250ZW50IGNoaWxkcmVuIG9mIHRoZSB0YWJsZS5cbiAgICogVGhlc2Ugd2lsbCBiZSBkZWZpbmVkIHdoZW4sIGUuZy4sIGNyZWF0aW5nIGEgd3JhcHBlciBhcm91bmQgdGhlIGNka1RhYmxlIHRoYXQgaGFzXG4gICAqIGNvbHVtbiBkZWZpbml0aW9ucyBhcyAqaXRzKiBjb250ZW50IGNoaWxkLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3VzdG9tQ29sdW1uRGVmcyA9IG5ldyBTZXQ8Q2RrQ29sdW1uRGVmPigpO1xuXG4gIC8qKlxuICAgKiBEYXRhIHJvdyBkZWZpbml0aW9ucyB0aGF0IHdlcmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBkaXJlY3QgY29udGVudCBjaGlsZHJlbiBvZiB0aGUgdGFibGUuXG4gICAqIFRoZXNlIHdpbGwgYmUgZGVmaW5lZCB3aGVuLCBlLmcuLCBjcmVhdGluZyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBjZGtUYWJsZSB0aGF0IGhhc1xuICAgKiBidWlsdC1pbiBkYXRhIHJvd3MgYXMgKml0cyogY29udGVudCBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2N1c3RvbVJvd0RlZnMgPSBuZXcgU2V0PENka1Jvd0RlZjxUPj4oKTtcblxuICAvKipcbiAgICogSGVhZGVyIHJvdyBkZWZpbml0aW9ucyB0aGF0IHdlcmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBkaXJlY3QgY29udGVudCBjaGlsZHJlbiBvZiB0aGUgdGFibGUuXG4gICAqIFRoZXNlIHdpbGwgYmUgZGVmaW5lZCB3aGVuLCBlLmcuLCBjcmVhdGluZyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBjZGtUYWJsZSB0aGF0IGhhc1xuICAgKiBidWlsdC1pbiBoZWFkZXIgcm93cyBhcyAqaXRzKiBjb250ZW50IGNoaWxkLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3VzdG9tSGVhZGVyUm93RGVmcyA9IG5ldyBTZXQ8Q2RrSGVhZGVyUm93RGVmPigpO1xuXG4gIC8qKlxuICAgKiBGb290ZXIgcm93IGRlZmluaXRpb25zIHRoYXQgd2VyZSBkZWZpbmVkIG91dHNpZGUgb2YgdGhlIGRpcmVjdCBjb250ZW50IGNoaWxkcmVuIG9mIHRoZSB0YWJsZS5cbiAgICogVGhlc2Ugd2lsbCBiZSBkZWZpbmVkIHdoZW4sIGUuZy4sIGNyZWF0aW5nIGEgd3JhcHBlciBhcm91bmQgdGhlIGNka1RhYmxlIHRoYXQgaGFzIGFcbiAgICogYnVpbHQtaW4gZm9vdGVyIHJvdyBhcyAqaXRzKiBjb250ZW50IGNoaWxkLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3VzdG9tRm9vdGVyUm93RGVmcyA9IG5ldyBTZXQ8Q2RrRm9vdGVyUm93RGVmPigpO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBoZWFkZXIgcm93IGRlZmluaXRpb24gaGFzIGJlZW4gY2hhbmdlZC4gVHJpZ2dlcnMgYW4gdXBkYXRlIHRvIHRoZSBoZWFkZXIgcm93IGFmdGVyXG4gICAqIGNvbnRlbnQgaXMgY2hlY2tlZC4gSW5pdGlhbGl6ZWQgYXMgdHJ1ZSBzbyB0aGF0IHRoZSB0YWJsZSByZW5kZXJzIHRoZSBpbml0aWFsIHNldCBvZiByb3dzLlxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyUm93RGVmQ2hhbmdlZCA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGZvb3RlciByb3cgZGVmaW5pdGlvbiBoYXMgYmVlbiBjaGFuZ2VkLiBUcmlnZ2VycyBhbiB1cGRhdGUgdG8gdGhlIGZvb3RlciByb3cgYWZ0ZXJcbiAgICogY29udGVudCBpcyBjaGVja2VkLiBJbml0aWFsaXplZCBhcyB0cnVlIHNvIHRoYXQgdGhlIHRhYmxlIHJlbmRlcnMgdGhlIGluaXRpYWwgc2V0IG9mIHJvd3MuXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJSb3dEZWZDaGFuZ2VkID0gdHJ1ZTtcblxuICAvKipcbiAgICogQ2FjaGUgb2YgdGhlIGxhdGVzdCByZW5kZXJlZCBgUmVuZGVyUm93YCBvYmplY3RzIGFzIGEgbWFwIGZvciBlYXN5IHJldHJpZXZhbCB3aGVuIGNvbnN0cnVjdGluZ1xuICAgKiBhIG5ldyBsaXN0IG9mIGBSZW5kZXJSb3dgIG9iamVjdHMgZm9yIHJlbmRlcmluZyByb3dzLiBTaW5jZSB0aGUgbmV3IGxpc3QgaXMgY29uc3RydWN0ZWQgd2l0aFxuICAgKiB0aGUgY2FjaGVkIGBSZW5kZXJSb3dgIG9iamVjdHMgd2hlbiBwb3NzaWJsZSwgdGhlIHJvdyBpZGVudGl0eSBpcyBwcmVzZXJ2ZWQgd2hlbiB0aGUgZGF0YVxuICAgKiBhbmQgcm93IHRlbXBsYXRlIG1hdGNoZXMsIHdoaWNoIGFsbG93cyB0aGUgYEl0ZXJhYmxlRGlmZmVyYCB0byBjaGVjayByb3dzIGJ5IHJlZmVyZW5jZVxuICAgKiBhbmQgdW5kZXJzdGFuZCB3aGljaCByb3dzIGFyZSBhZGRlZC9tb3ZlZC9yZW1vdmVkLlxuICAgKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBhIG1hcCBvZiBtYXBzIHdoZXJlIHRoZSBmaXJzdCBrZXkgaXMgdGhlIGBkYXRhOiBUYCBvYmplY3QgYW5kIHRoZSBzZWNvbmQgaXMgdGhlXG4gICAqIGBDZGtSb3dEZWY8VD5gIG9iamVjdC4gV2l0aCB0aGUgdHdvIGtleXMsIHRoZSBjYWNoZSBwb2ludHMgdG8gYSBgUmVuZGVyUm93PFQ+YCBvYmplY3QgdGhhdFxuICAgKiBjb250YWlucyBhbiBhcnJheSBvZiBjcmVhdGVkIHBhaXJzLiBUaGUgYXJyYXkgaXMgbmVjZXNzYXJ5IHRvIGhhbmRsZSBjYXNlcyB3aGVyZSB0aGUgZGF0YVxuICAgKiBhcnJheSBjb250YWlucyBtdWx0aXBsZSBkdXBsaWNhdGUgZGF0YSBvYmplY3RzIGFuZCBlYWNoIGluc3RhbnRpYXRlZCBgUmVuZGVyUm93YCBtdXN0IGJlXG4gICAqIHN0b3JlZC5cbiAgICovXG4gIHByaXZhdGUgX2NhY2hlZFJlbmRlclJvd3NNYXAgPSBuZXcgTWFwPFQsIFdlYWtNYXA8Q2RrUm93RGVmPFQ+LCBSZW5kZXJSb3c8VD5bXT4+KCk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRhYmxlIGlzIGFwcGxpZWQgdG8gYSBuYXRpdmUgYDx0YWJsZT5gLiAqL1xuICBwcml2YXRlIF9pc05hdGl2ZUh0bWxUYWJsZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogVXRpbGl0eSBjbGFzcyB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciBhcHBseWluZyB0aGUgYXBwcm9wcmlhdGUgc3RpY2t5IHBvc2l0aW9uaW5nIHN0eWxlcyB0b1xuICAgKiB0aGUgdGFibGUncyByb3dzIGFuZCBjZWxscy5cbiAgICovXG4gIHByaXZhdGUgX3N0aWNreVN0eWxlcjogU3RpY2t5U3R5bGVyO1xuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgYWRkZWQgdG8gYW55IHJvdyBvciBjZWxsIHRoYXQgaGFzIHN0aWNreSBwb3NpdGlvbmluZyBhcHBsaWVkLiBNYXkgYmUgb3ZlcnJpZGVuIGJ5XG4gICAqIHRhYmxlIHN1YmNsYXNzZXMuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RpY2t5Q3NzQ2xhc3M6IHN0cmluZyA9ICdjZGstdGFibGUtc3RpY2t5JztcblxuICAvKipcbiAgICogV2hldGhlciB0byBtYW51YWxseSBhZGQgcG9zaXRvbjogc3RpY2t5IHRvIGFsbCBzdGlja3kgY2VsbCBlbGVtZW50cy4gTm90IG5lZWRlZCBpZlxuICAgKiB0aGUgcG9zaXRpb24gaXMgc2V0IGluIGEgc2VsZWN0b3IgYXNzb2NpYXRlZCB3aXRoIHRoZSB2YWx1ZSBvZiBzdGlja3lDc3NDbGFzcy4gTWF5IGJlXG4gICAqIG92ZXJyaWRkZW4gYnkgdGFibGUgc3ViY2xhc3Nlc1xuICAgKi9cbiAgcHJvdGVjdGVkIG5lZWRzUG9zaXRpb25TdGlja3lPbkVsZW1lbnQgPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBubyBkYXRhIHJvdyBpcyBjdXJyZW50bHkgc2hvd2luZyBhbnl0aGluZy4gKi9cbiAgcHJpdmF0ZSBfaXNTaG93aW5nTm9EYXRhUm93ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRyYWNraW5nIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGNoZWNrIHRoZSBkaWZmZXJlbmNlcyBpbiBkYXRhIGNoYW5nZXMuIFVzZWQgc2ltaWxhcmx5XG4gICAqIHRvIGBuZ0ZvcmAgYHRyYWNrQnlgIGZ1bmN0aW9uLiBPcHRpbWl6ZSByb3cgb3BlcmF0aW9ucyBieSBpZGVudGlmeWluZyBhIHJvdyBiYXNlZCBvbiBpdHMgZGF0YVxuICAgKiByZWxhdGl2ZSB0byB0aGUgZnVuY3Rpb24gdG8ga25vdyBpZiBhIHJvdyBzaG91bGQgYmUgYWRkZWQvcmVtb3ZlZC9tb3ZlZC5cbiAgICogQWNjZXB0cyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgdHdvIHBhcmFtZXRlcnMsIGBpbmRleGAgYW5kIGBpdGVtYC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCB0cmFja0J5KCk6IFRyYWNrQnlGdW5jdGlvbjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYWNrQnlGbjtcbiAgfVxuICBzZXQgdHJhY2tCeShmbjogVHJhY2tCeUZ1bmN0aW9uPFQ+KSB7XG4gICAgaWYgKCh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmIGZuICE9IG51bGwgJiYgdHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oYHRyYWNrQnkgbXVzdCBiZSBhIGZ1bmN0aW9uLCBidXQgcmVjZWl2ZWQgJHtKU09OLnN0cmluZ2lmeShmbil9LmApO1xuICAgIH1cbiAgICB0aGlzLl90cmFja0J5Rm4gPSBmbjtcbiAgfVxuICBwcml2YXRlIF90cmFja0J5Rm46IFRyYWNrQnlGdW5jdGlvbjxUPjtcblxuICAvKipcbiAgICogVGhlIHRhYmxlJ3Mgc291cmNlIG9mIGRhdGEsIHdoaWNoIGNhbiBiZSBwcm92aWRlZCBpbiB0aHJlZSB3YXlzIChpbiBvcmRlciBvZiBjb21wbGV4aXR5KTpcbiAgICogICAtIFNpbXBsZSBkYXRhIGFycmF5IChlYWNoIG9iamVjdCByZXByZXNlbnRzIG9uZSB0YWJsZSByb3cpXG4gICAqICAgLSBTdHJlYW0gdGhhdCBlbWl0cyBhIGRhdGEgYXJyYXkgZWFjaCB0aW1lIHRoZSBhcnJheSBjaGFuZ2VzXG4gICAqICAgLSBgRGF0YVNvdXJjZWAgb2JqZWN0IHRoYXQgaW1wbGVtZW50cyB0aGUgY29ubmVjdC9kaXNjb25uZWN0IGludGVyZmFjZS5cbiAgICpcbiAgICogSWYgYSBkYXRhIGFycmF5IGlzIHByb3ZpZGVkLCB0aGUgdGFibGUgbXVzdCBiZSBub3RpZmllZCB3aGVuIHRoZSBhcnJheSdzIG9iamVjdHMgYXJlXG4gICAqIGFkZGVkLCByZW1vdmVkLCBvciBtb3ZlZC4gVGhpcyBjYW4gYmUgZG9uZSBieSBjYWxsaW5nIHRoZSBgcmVuZGVyUm93cygpYCBmdW5jdGlvbiB3aGljaCB3aWxsXG4gICAqIHJlbmRlciB0aGUgZGlmZiBzaW5jZSB0aGUgbGFzdCB0YWJsZSByZW5kZXIuIElmIHRoZSBkYXRhIGFycmF5IHJlZmVyZW5jZSBpcyBjaGFuZ2VkLCB0aGUgdGFibGVcbiAgICogd2lsbCBhdXRvbWF0aWNhbGx5IHRyaWdnZXIgYW4gdXBkYXRlIHRvIHRoZSByb3dzLlxuICAgKlxuICAgKiBXaGVuIHByb3ZpZGluZyBhbiBPYnNlcnZhYmxlIHN0cmVhbSwgdGhlIHRhYmxlIHdpbGwgdHJpZ2dlciBhbiB1cGRhdGUgYXV0b21hdGljYWxseSB3aGVuIHRoZVxuICAgKiBzdHJlYW0gZW1pdHMgYSBuZXcgYXJyYXkgb2YgZGF0YS5cbiAgICpcbiAgICogRmluYWxseSwgd2hlbiBwcm92aWRpbmcgYSBgRGF0YVNvdXJjZWAgb2JqZWN0LCB0aGUgdGFibGUgd2lsbCB1c2UgdGhlIE9ic2VydmFibGUgc3RyZWFtXG4gICAqIHByb3ZpZGVkIGJ5IHRoZSBjb25uZWN0IGZ1bmN0aW9uIGFuZCB0cmlnZ2VyIHVwZGF0ZXMgd2hlbiB0aGF0IHN0cmVhbSBlbWl0cyBuZXcgZGF0YSBhcnJheVxuICAgKiB2YWx1ZXMuIER1cmluZyB0aGUgdGFibGUncyBuZ09uRGVzdHJveSBvciB3aGVuIHRoZSBkYXRhIHNvdXJjZSBpcyByZW1vdmVkIGZyb20gdGhlIHRhYmxlLCB0aGVcbiAgICogdGFibGUgd2lsbCBjYWxsIHRoZSBEYXRhU291cmNlJ3MgYGRpc2Nvbm5lY3RgIGZ1bmN0aW9uIChtYXkgYmUgdXNlZnVsIGZvciBjbGVhbmluZyB1cCBhbnlcbiAgICogc3Vic2NyaXB0aW9ucyByZWdpc3RlcmVkIGR1cmluZyB0aGUgY29ubmVjdCBwcm9jZXNzKS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBkYXRhU291cmNlKCk6IENka1RhYmxlRGF0YVNvdXJjZUlucHV0PFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgfVxuICBzZXQgZGF0YVNvdXJjZShkYXRhU291cmNlOiBDZGtUYWJsZURhdGFTb3VyY2VJbnB1dDxUPikge1xuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICE9PSBkYXRhU291cmNlKSB7XG4gICAgICB0aGlzLl9zd2l0Y2hEYXRhU291cmNlKGRhdGFTb3VyY2UpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9kYXRhU291cmNlOiBDZGtUYWJsZURhdGFTb3VyY2VJbnB1dDxUPjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBhbGxvdyBtdWx0aXBsZSByb3dzIHBlciBkYXRhIG9iamVjdCBieSBldmFsdWF0aW5nIHdoaWNoIHJvd3MgZXZhbHVhdGUgdGhlaXIgJ3doZW4nXG4gICAqIHByZWRpY2F0ZSB0byB0cnVlLiBJZiBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBpcyBmYWxzZSwgd2hpY2ggaXMgdGhlIGRlZmF1bHQgdmFsdWUsIHRoZW4gZWFjaFxuICAgKiBkYXRhb2JqZWN0IHdpbGwgcmVuZGVyIHRoZSBmaXJzdCByb3cgdGhhdCBldmFsdWF0ZXMgaXRzIHdoZW4gcHJlZGljYXRlIHRvIHRydWUsIGluIHRoZSBvcmRlclxuICAgKiBkZWZpbmVkIGluIHRoZSB0YWJsZSwgb3Igb3RoZXJ3aXNlIHRoZSBkZWZhdWx0IHJvdyB3aGljaCBkb2VzIG5vdCBoYXZlIGEgd2hlbiBwcmVkaWNhdGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlUZW1wbGF0ZURhdGFSb3dzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aVRlbXBsYXRlRGF0YVJvd3M7XG4gIH1cbiAgc2V0IG11bHRpVGVtcGxhdGVEYXRhUm93cyh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlUZW1wbGF0ZURhdGFSb3dzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuXG4gICAgLy8gSW4gSXZ5IGlmIHRoaXMgdmFsdWUgaXMgc2V0IHZpYSBhIHN0YXRpYyBhdHRyaWJ1dGUgKGUuZy4gPHRhYmxlIG11bHRpVGVtcGxhdGVEYXRhUm93cz4pLFxuICAgIC8vIHRoaXMgc2V0dGVyIHdpbGwgYmUgaW52b2tlZCBiZWZvcmUgdGhlIHJvdyBvdXRsZXQgaGFzIGJlZW4gZGVmaW5lZCBoZW5jZSB0aGUgbnVsbCBjaGVjay5cbiAgICBpZiAodGhpcy5fcm93T3V0bGV0ICYmIHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZm9yY2VSZW5kZXJEYXRhUm93cygpO1xuICAgICAgdGhpcy51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgICB9XG4gIH1cbiAgX211bHRpVGVtcGxhdGVEYXRhUm93czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIFRPRE8oYW5kcmV3c2VndWluKTogUmVtb3ZlIG1heCB2YWx1ZSBhcyB0aGUgZW5kIGluZGV4XG4gIC8vICAgYW5kIGluc3RlYWQgY2FsY3VsYXRlIHRoZSB2aWV3IG9uIGluaXQgYW5kIHNjcm9sbC5cbiAgLyoqXG4gICAqIFN0cmVhbSBjb250YWluaW5nIHRoZSBsYXRlc3QgaW5mb3JtYXRpb24gb24gd2hhdCByb3dzIGFyZSBiZWluZyBkaXNwbGF5ZWQgb24gc2NyZWVuLlxuICAgKiBDYW4gYmUgdXNlZCBieSB0aGUgZGF0YSBzb3VyY2UgdG8gYXMgYSBoZXVyaXN0aWMgb2Ygd2hhdCBkYXRhIHNob3VsZCBiZSBwcm92aWRlZC5cbiAgICpcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgdmlld0NoYW5nZTogQmVoYXZpb3JTdWJqZWN0PHtzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcn0+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8e3N0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyfT4oe3N0YXJ0OiAwLCBlbmQ6IE51bWJlci5NQVhfVkFMVUV9KTtcblxuICAvLyBPdXRsZXRzIGluIHRoZSB0YWJsZSdzIHRlbXBsYXRlIHdoZXJlIHRoZSBoZWFkZXIsIGRhdGEgcm93cywgYW5kIGZvb3RlciB3aWxsIGJlIGluc2VydGVkLlxuICBAVmlld0NoaWxkKERhdGFSb3dPdXRsZXQsIHtzdGF0aWM6IHRydWV9KSBfcm93T3V0bGV0OiBEYXRhUm93T3V0bGV0O1xuICBAVmlld0NoaWxkKEhlYWRlclJvd091dGxldCwge3N0YXRpYzogdHJ1ZX0pIF9oZWFkZXJSb3dPdXRsZXQ6IEhlYWRlclJvd091dGxldDtcbiAgQFZpZXdDaGlsZChGb290ZXJSb3dPdXRsZXQsIHtzdGF0aWM6IHRydWV9KSBfZm9vdGVyUm93T3V0bGV0OiBGb290ZXJSb3dPdXRsZXQ7XG4gIEBWaWV3Q2hpbGQoTm9EYXRhUm93T3V0bGV0LCB7c3RhdGljOiB0cnVlfSkgX25vRGF0YVJvd091dGxldDogTm9EYXRhUm93T3V0bGV0O1xuXG4gIC8qKlxuICAgKiBUaGUgY29sdW1uIGRlZmluaXRpb25zIHByb3ZpZGVkIGJ5IHRoZSB1c2VyIHRoYXQgY29udGFpbiB3aGF0IHRoZSBoZWFkZXIsIGRhdGEsIGFuZCBmb290ZXJcbiAgICogY2VsbHMgc2hvdWxkIHJlbmRlciBmb3IgZWFjaCBjb2x1bW4uXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKENka0NvbHVtbkRlZiwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgX2NvbnRlbnRDb2x1bW5EZWZzOiBRdWVyeUxpc3Q8Q2RrQ29sdW1uRGVmPjtcblxuICAvKiogU2V0IG9mIGRhdGEgcm93IGRlZmluaXRpb25zIHRoYXQgd2VyZSBwcm92aWRlZCB0byB0aGUgdGFibGUgYXMgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDZGtSb3dEZWYsIHtkZXNjZW5kYW50czogdHJ1ZX0pIF9jb250ZW50Um93RGVmczogUXVlcnlMaXN0PENka1Jvd0RlZjxUPj47XG5cbiAgLyoqIFNldCBvZiBoZWFkZXIgcm93IGRlZmluaXRpb25zIHRoYXQgd2VyZSBwcm92aWRlZCB0byB0aGUgdGFibGUgYXMgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDZGtIZWFkZXJSb3dEZWYsIHtcbiAgICBkZXNjZW5kYW50czogdHJ1ZVxuICB9KSBfY29udGVudEhlYWRlclJvd0RlZnM6IFF1ZXJ5TGlzdDxDZGtIZWFkZXJSb3dEZWY+O1xuXG4gIC8qKiBTZXQgb2YgZm9vdGVyIHJvdyBkZWZpbml0aW9ucyB0aGF0IHdlcmUgcHJvdmlkZWQgdG8gdGhlIHRhYmxlIGFzIGNvbnRlbnQgY2hpbGRyZW4uICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2RrRm9vdGVyUm93RGVmLCB7XG4gICAgZGVzY2VuZGFudHM6IHRydWVcbiAgfSkgX2NvbnRlbnRGb290ZXJSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrRm9vdGVyUm93RGVmPjtcblxuICAvKiogUm93IGRlZmluaXRpb24gdGhhdCB3aWxsIG9ubHkgYmUgcmVuZGVyZWQgaWYgdGhlcmUncyBubyBkYXRhIGluIHRoZSB0YWJsZS4gKi9cbiAgQENvbnRlbnRDaGlsZChDZGtOb0RhdGFSb3cpIF9ub0RhdGFSb3c6IENka05vRGF0YVJvdztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByb3RlY3RlZCByZWFkb25seSBfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIEBBdHRyaWJ1dGUoJ3JvbGUnKSByb2xlOiBzdHJpbmcsXG4gICAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgcmVhZG9ubHkgX2RpcjogRGlyZWN0aW9uYWxpdHksIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICAgICAgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXByZWNhdGVkIGBfY29hbGVzY2VkU3R5bGVTY2hlZHVsZXJgLCBgX3ZpZXdSZXBlYXRlcmAgYW5kIGBfdmlld3BvcnRSdWxlcmBcbiAgICAgICAqICAgIHBhcmFtZXRlcnMgdG8gYmVjb21lIHJlcXVpcmVkLlxuICAgICAgICogQGJyZWFraW5nLWNoYW5nZSAxMS4wLjBcbiAgICAgICAqL1xuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChfVklFV19SRVBFQVRFUl9TVFJBVEVHWSlcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IF92aWV3UmVwZWF0ZXI/OiBfVmlld1JlcGVhdGVyPFQsIFJlbmRlclJvdzxUPiwgUm93Q29udGV4dDxUPj4sXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KF9DT0FMRVNDRURfU1RZTEVfU0NIRURVTEVSKVxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyPzogX0NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyKSB7XG4gICAgaWYgKCFyb2xlKSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2dyaWQnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kb2N1bWVudCA9IF9kb2N1bWVudDtcbiAgICB0aGlzLl9pc05hdGl2ZUh0bWxUYWJsZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ1RBQkxFJztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3NldHVwU3RpY2t5U3R5bGVyKCk7XG5cbiAgICBpZiAodGhpcy5faXNOYXRpdmVIdG1sVGFibGUpIHtcbiAgICAgIHRoaXMuX2FwcGx5TmF0aXZlVGFibGVTZWN0aW9ucygpO1xuICAgIH1cblxuICAgIC8vIFNldCB1cCB0aGUgdHJhY2tCeSBmdW5jdGlvbiBzbyB0aGF0IGl0IHVzZXMgdGhlIGBSZW5kZXJSb3dgIGFzIGl0cyBpZGVudGl0eSBieSBkZWZhdWx0LiBJZlxuICAgIC8vIHRoZSB1c2VyIGhhcyBwcm92aWRlZCBhIGN1c3RvbSB0cmFja0J5LCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGF0IGZ1bmN0aW9uIGFzIGV2YWx1YXRlZFxuICAgIC8vIHdpdGggdGhlIHZhbHVlcyBvZiB0aGUgYFJlbmRlclJvd2AncyBkYXRhIGFuZCBpbmRleC5cbiAgICB0aGlzLl9kYXRhRGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKF9pOiBudW1iZXIsIGRhdGFSb3c6IFJlbmRlclJvdzxUPikgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudHJhY2tCeSA/IHRoaXMudHJhY2tCeShkYXRhUm93LmRhdGFJbmRleCwgZGF0YVJvdy5kYXRhKSA6IGRhdGFSb3c7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gQ2FjaGUgdGhlIHJvdyBhbmQgY29sdW1uIGRlZmluaXRpb25zIGdhdGhlcmVkIGJ5IENvbnRlbnRDaGlsZHJlbiBhbmQgcHJvZ3JhbW1hdGljIGluamVjdGlvbi5cbiAgICB0aGlzLl9jYWNoZVJvd0RlZnMoKTtcbiAgICB0aGlzLl9jYWNoZUNvbHVtbkRlZnMoKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSB1c2VyIGhhcyBhdCBsZWFzdCBhZGRlZCBoZWFkZXIsIGZvb3Rlciwgb3IgZGF0YSByb3cgZGVmLlxuICAgIGlmICghdGhpcy5faGVhZGVyUm93RGVmcy5sZW5ndGggJiYgIXRoaXMuX2Zvb3RlclJvd0RlZnMubGVuZ3RoICYmICF0aGlzLl9yb3dEZWZzLmxlbmd0aCAmJlxuICAgICAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgZ2V0VGFibGVNaXNzaW5nUm93RGVmc0Vycm9yKCk7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIHVwZGF0ZXMgaWYgdGhlIGxpc3Qgb2YgY29sdW1ucyBoYXZlIGJlZW4gY2hhbmdlZCBmb3IgdGhlIGhlYWRlciwgcm93LCBvciBmb290ZXIgZGVmcy5cbiAgICBjb25zdCBjb2x1bW5zQ2hhbmdlZCA9IHRoaXMuX3JlbmRlclVwZGF0ZWRDb2x1bW5zKCk7XG4gICAgY29uc3Qgc3RpY2t5Q29sdW1uU3R5bGVVcGRhdGVOZWVkZWQgPVxuICAgICAgICAgICAgY29sdW1uc0NoYW5nZWQgfHwgdGhpcy5faGVhZGVyUm93RGVmQ2hhbmdlZCB8fCB0aGlzLl9mb290ZXJSb3dEZWZDaGFuZ2VkO1xuXG4gICAgLy8gSWYgdGhlIGhlYWRlciByb3cgZGVmaW5pdGlvbiBoYXMgYmVlbiBjaGFuZ2VkLCB0cmlnZ2VyIGEgcmVuZGVyIHRvIHRoZSBoZWFkZXIgcm93LlxuICAgIGlmICh0aGlzLl9oZWFkZXJSb3dEZWZDaGFuZ2VkKSB7XG4gICAgICB0aGlzLl9mb3JjZVJlbmRlckhlYWRlclJvd3MoKTtcbiAgICAgIHRoaXMuX2hlYWRlclJvd0RlZkNoYW5nZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZm9vdGVyIHJvdyBkZWZpbml0aW9uIGhhcyBiZWVuIGNoYW5nZWQsIHRyaWdnZXIgYSByZW5kZXIgdG8gdGhlIGZvb3RlciByb3cuXG4gICAgaWYgKHRoaXMuX2Zvb3RlclJvd0RlZkNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX2ZvcmNlUmVuZGVyRm9vdGVyUm93cygpO1xuICAgICAgdGhpcy5fZm9vdGVyUm93RGVmQ2hhbmdlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIGEgZGF0YSBzb3VyY2UgYW5kIHJvdyBkZWZpbml0aW9ucywgY29ubmVjdCB0byB0aGUgZGF0YSBzb3VyY2UgdW5sZXNzIGFcbiAgICAvLyBjb25uZWN0aW9uIGhhcyBhbHJlYWR5IGJlZW4gbWFkZS5cbiAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHRoaXMuX3Jvd0RlZnMubGVuZ3RoID4gMCAmJiAhdGhpcy5fcmVuZGVyQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9vYnNlcnZlUmVuZGVyQ2hhbmdlcygpO1xuICAgIH0gZWxzZSBpZiAoc3RpY2t5Q29sdW1uU3R5bGVVcGRhdGVOZWVkZWQpIHtcbiAgICAgIC8vIEluIHRoZSBhYm92ZSBjYXNlLCBfb2JzZXJ2ZVJlbmRlckNoYW5nZXMgd2lsbCByZXN1bHQgaW4gdXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzIGJlaW5nXG4gICAgICAvLyBjYWxsZWQgd2hlbiBpdCByb3cgZGF0YSBhcnJpdmVzLiBPdGhlcndpc2UsIHdlIG5lZWQgdG8gY2FsbCBpdCBwcm9hY3RpdmVseS5cbiAgICAgIHRoaXMudXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hlY2tTdGlja3lTdGF0ZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgdGhpcy5fbm9EYXRhUm93T3V0bGV0LnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICB0aGlzLl9oZWFkZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIHRoaXMuX2Zvb3RlclJvd091dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICB0aGlzLl9jYWNoZWRSZW5kZXJSb3dzTWFwLmNsZWFyKCk7XG5cbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuXG4gICAgaWYgKGlzRGF0YVNvdXJjZSh0aGlzLmRhdGFTb3VyY2UpKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGlzY29ubmVjdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVycyByb3dzIGJhc2VkIG9uIHRoZSB0YWJsZSdzIGxhdGVzdCBzZXQgb2YgZGF0YSwgd2hpY2ggd2FzIGVpdGhlciBwcm92aWRlZCBkaXJlY3RseSBhcyBhblxuICAgKiBpbnB1dCBvciByZXRyaWV2ZWQgdGhyb3VnaCBhbiBPYnNlcnZhYmxlIHN0cmVhbSAoZGlyZWN0bHkgb3IgZnJvbSBhIERhdGFTb3VyY2UpLlxuICAgKiBDaGVja3MgZm9yIGRpZmZlcmVuY2VzIGluIHRoZSBkYXRhIHNpbmNlIHRoZSBsYXN0IGRpZmYgdG8gcGVyZm9ybSBvbmx5IHRoZSBuZWNlc3NhcnlcbiAgICogY2hhbmdlcyAoYWRkL3JlbW92ZS9tb3ZlIHJvd3MpLlxuICAgKlxuICAgKiBJZiB0aGUgdGFibGUncyBkYXRhIHNvdXJjZSBpcyBhIERhdGFTb3VyY2Ugb3IgT2JzZXJ2YWJsZSwgdGhpcyB3aWxsIGJlIGludm9rZWQgYXV0b21hdGljYWxseVxuICAgKiBlYWNoIHRpbWUgdGhlIHByb3ZpZGVkIE9ic2VydmFibGUgc3RyZWFtIGVtaXRzIGEgbmV3IGRhdGEgYXJyYXkuIE90aGVyd2lzZSBpZiB5b3VyIGRhdGEgaXNcbiAgICogYW4gYXJyYXksIHRoaXMgZnVuY3Rpb24gd2lsbCBuZWVkIHRvIGJlIGNhbGxlZCB0byByZW5kZXIgYW55IGNoYW5nZXMuXG4gICAqL1xuICByZW5kZXJSb3dzKCkge1xuICAgIHRoaXMuX3JlbmRlclJvd3MgPSB0aGlzLl9nZXRBbGxSZW5kZXJSb3dzKCk7XG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX2RhdGFEaWZmZXIuZGlmZih0aGlzLl9yZW5kZXJSb3dzKTtcbiAgICBpZiAoIWNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZU5vRGF0YVJvdygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB2aWV3Q29udGFpbmVyID0gdGhpcy5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG5cbiAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDExLjAuMCBSZW1vdmUgbnVsbCBjaGVjayBmb3IgYF92aWV3UmVwZWF0ZXJgIGFuZCB0aGVcbiAgICAvLyBgZWxzZWAgY2xhdXNlIG9uY2UgYF92aWV3UmVwZWF0ZXJgIGlzIHR1cm5lZCBpbnRvIGEgcmVxdWlyZWQgcGFyYW1ldGVyLlxuICAgIGlmICh0aGlzLl92aWV3UmVwZWF0ZXIpIHtcbiAgICAgIHRoaXMuX3ZpZXdSZXBlYXRlci5hcHBseUNoYW5nZXMoXG4gICAgICAgICAgY2hhbmdlcyxcbiAgICAgICAgICB2aWV3Q29udGFpbmVyLFxuICAgICAgICAgIChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFJlbmRlclJvdzxUPj4sXG4gICAgICAgICAgIF9hZGp1c3RlZFByZXZpb3VzSW5kZXg6IG51bWJlcnxudWxsLFxuICAgICAgICAgICBjdXJyZW50SW5kZXg6IG51bWJlcnxudWxsKSA9PiB0aGlzLl9nZXRFbWJlZGRlZFZpZXdBcmdzKHJlY29yZC5pdGVtLCBjdXJyZW50SW5kZXghKSxcbiAgICAgICAgICAocmVjb3JkKSA9PiByZWNvcmQuaXRlbS5kYXRhLFxuICAgICAgICAgIChjaGFuZ2U6IF9WaWV3UmVwZWF0ZXJJdGVtQ2hhbmdlPFJlbmRlclJvdzxUPiwgUm93Q29udGV4dDxUPj4pID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2Uub3BlcmF0aW9uID09PSBfVmlld1JlcGVhdGVyT3BlcmF0aW9uLklOU0VSVEVEICYmIGNoYW5nZS5jb250ZXh0KSB7XG4gICAgICAgICAgICAgIHRoaXMuX3JlbmRlckNlbGxUZW1wbGF0ZUZvckl0ZW0oY2hhbmdlLnJlY29yZC5pdGVtLnJvd0RlZiwgY2hhbmdlLmNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGFuZ2VzLmZvckVhY2hPcGVyYXRpb24oXG4gICAgICAgIChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFJlbmRlclJvdzxUPj4sIHByZXZJbmRleDogbnVtYmVyfG51bGwsXG4gICAgICAgICBjdXJyZW50SW5kZXg6IG51bWJlcnxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHJlY29yZC5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbmRlclJvdyA9IHJlY29yZC5pdGVtO1xuICAgICAgICAgICAgY29uc3Qgcm93RGVmID0gcmVuZGVyUm93LnJvd0RlZjtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQ6IFJvd0NvbnRleHQ8VD4gPSB7JGltcGxpY2l0OiByZW5kZXJSb3cuZGF0YX07XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJSb3codGhpcy5fcm93T3V0bGV0LCByb3dEZWYsIGN1cnJlbnRJbmRleCEsIGNvbnRleHQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXIucmVtb3ZlKHByZXZJbmRleCEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gPFJvd1ZpZXdSZWY8VD4+dmlld0NvbnRhaW5lci5nZXQocHJldkluZGV4ISk7XG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyLm1vdmUodmlldyEsIGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIG1ldGEgY29udGV4dCBvZiBhIHJvdydzIGNvbnRleHQgZGF0YSAoaW5kZXgsIGNvdW50LCBmaXJzdCwgbGFzdCwgLi4uKVxuICAgIHRoaXMuX3VwZGF0ZVJvd0luZGV4Q29udGV4dCgpO1xuXG4gICAgLy8gVXBkYXRlIHJvd3MgdGhhdCBkaWQgbm90IGdldCBhZGRlZC9yZW1vdmVkL21vdmVkIGJ1dCBtYXkgaGF2ZSBoYWQgdGhlaXIgaWRlbnRpdHkgY2hhbmdlZCxcbiAgICAvLyBlLmcuIGlmIHRyYWNrQnkgbWF0Y2hlZCBkYXRhIG9uIHNvbWUgcHJvcGVydHkgYnV0IHRoZSBhY3R1YWwgZGF0YSByZWZlcmVuY2UgY2hhbmdlZC5cbiAgICBjaGFuZ2VzLmZvckVhY2hJZGVudGl0eUNoYW5nZSgocmVjb3JkOiBJdGVyYWJsZUNoYW5nZVJlY29yZDxSZW5kZXJSb3c8VD4+KSA9PiB7XG4gICAgICBjb25zdCByb3dWaWV3ID0gPFJvd1ZpZXdSZWY8VD4+dmlld0NvbnRhaW5lci5nZXQocmVjb3JkLmN1cnJlbnRJbmRleCEpO1xuICAgICAgcm93Vmlldy5jb250ZXh0LiRpbXBsaWNpdCA9IHJlY29yZC5pdGVtLmRhdGE7XG4gICAgfSk7XG5cbiAgICB0aGlzLl91cGRhdGVOb0RhdGFSb3coKTtcbiAgICB0aGlzLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICB9XG5cbiAgLyoqIEFkZHMgYSBjb2x1bW4gZGVmaW5pdGlvbiB0aGF0IHdhcyBub3QgaW5jbHVkZWQgYXMgcGFydCBvZiB0aGUgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgYWRkQ29sdW1uRGVmKGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmKSB7XG4gICAgdGhpcy5fY3VzdG9tQ29sdW1uRGVmcy5hZGQoY29sdW1uRGVmKTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVzIGEgY29sdW1uIGRlZmluaXRpb24gdGhhdCB3YXMgbm90IGluY2x1ZGVkIGFzIHBhcnQgb2YgdGhlIGNvbnRlbnQgY2hpbGRyZW4uICovXG4gIHJlbW92ZUNvbHVtbkRlZihjb2x1bW5EZWY6IENka0NvbHVtbkRlZikge1xuICAgIHRoaXMuX2N1c3RvbUNvbHVtbkRlZnMuZGVsZXRlKGNvbHVtbkRlZik7XG4gIH1cblxuICAvKiogQWRkcyBhIHJvdyBkZWZpbml0aW9uIHRoYXQgd2FzIG5vdCBpbmNsdWRlZCBhcyBwYXJ0IG9mIHRoZSBjb250ZW50IGNoaWxkcmVuLiAqL1xuICBhZGRSb3dEZWYocm93RGVmOiBDZGtSb3dEZWY8VD4pIHtcbiAgICB0aGlzLl9jdXN0b21Sb3dEZWZzLmFkZChyb3dEZWYpO1xuICB9XG5cbiAgLyoqIFJlbW92ZXMgYSByb3cgZGVmaW5pdGlvbiB0aGF0IHdhcyBub3QgaW5jbHVkZWQgYXMgcGFydCBvZiB0aGUgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgcmVtb3ZlUm93RGVmKHJvd0RlZjogQ2RrUm93RGVmPFQ+KSB7XG4gICAgdGhpcy5fY3VzdG9tUm93RGVmcy5kZWxldGUocm93RGVmKTtcbiAgfVxuXG4gIC8qKiBBZGRzIGEgaGVhZGVyIHJvdyBkZWZpbml0aW9uIHRoYXQgd2FzIG5vdCBpbmNsdWRlZCBhcyBwYXJ0IG9mIHRoZSBjb250ZW50IGNoaWxkcmVuLiAqL1xuICBhZGRIZWFkZXJSb3dEZWYoaGVhZGVyUm93RGVmOiBDZGtIZWFkZXJSb3dEZWYpIHtcbiAgICB0aGlzLl9jdXN0b21IZWFkZXJSb3dEZWZzLmFkZChoZWFkZXJSb3dEZWYpO1xuICAgIHRoaXMuX2hlYWRlclJvd0RlZkNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqIFJlbW92ZXMgYSBoZWFkZXIgcm93IGRlZmluaXRpb24gdGhhdCB3YXMgbm90IGluY2x1ZGVkIGFzIHBhcnQgb2YgdGhlIGNvbnRlbnQgY2hpbGRyZW4uICovXG4gIHJlbW92ZUhlYWRlclJvd0RlZihoZWFkZXJSb3dEZWY6IENka0hlYWRlclJvd0RlZikge1xuICAgIHRoaXMuX2N1c3RvbUhlYWRlclJvd0RlZnMuZGVsZXRlKGhlYWRlclJvd0RlZik7XG4gICAgdGhpcy5faGVhZGVyUm93RGVmQ2hhbmdlZCA9IHRydWU7XG4gIH1cblxuICAvKiogQWRkcyBhIGZvb3RlciByb3cgZGVmaW5pdGlvbiB0aGF0IHdhcyBub3QgaW5jbHVkZWQgYXMgcGFydCBvZiB0aGUgY29udGVudCBjaGlsZHJlbi4gKi9cbiAgYWRkRm9vdGVyUm93RGVmKGZvb3RlclJvd0RlZjogQ2RrRm9vdGVyUm93RGVmKSB7XG4gICAgdGhpcy5fY3VzdG9tRm9vdGVyUm93RGVmcy5hZGQoZm9vdGVyUm93RGVmKTtcbiAgICB0aGlzLl9mb290ZXJSb3dEZWZDaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVzIGEgZm9vdGVyIHJvdyBkZWZpbml0aW9uIHRoYXQgd2FzIG5vdCBpbmNsdWRlZCBhcyBwYXJ0IG9mIHRoZSBjb250ZW50IGNoaWxkcmVuLiAqL1xuICByZW1vdmVGb290ZXJSb3dEZWYoZm9vdGVyUm93RGVmOiBDZGtGb290ZXJSb3dEZWYpIHtcbiAgICB0aGlzLl9jdXN0b21Gb290ZXJSb3dEZWZzLmRlbGV0ZShmb290ZXJSb3dEZWYpO1xuICAgIHRoaXMuX2Zvb3RlclJvd0RlZkNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGhlYWRlciBzdGlja3kgc3R5bGVzLiBGaXJzdCByZXNldHMgYWxsIGFwcGxpZWQgc3R5bGVzIHdpdGggcmVzcGVjdCB0byB0aGUgY2VsbHNcbiAgICogc3RpY2tpbmcgdG8gdGhlIHRvcC4gVGhlbiwgZXZhbHVhdGluZyB3aGljaCBjZWxscyBuZWVkIHRvIGJlIHN0dWNrIHRvIHRoZSB0b3AuIFRoaXMgaXNcbiAgICogYXV0b21hdGljYWxseSBjYWxsZWQgd2hlbiB0aGUgaGVhZGVyIHJvdyBjaGFuZ2VzIGl0cyBkaXNwbGF5ZWQgc2V0IG9mIGNvbHVtbnMsIG9yIGlmIGl0c1xuICAgKiBzdGlja3kgaW5wdXQgY2hhbmdlcy4gTWF5IGJlIGNhbGxlZCBtYW51YWxseSBmb3IgY2FzZXMgd2hlcmUgdGhlIGNlbGwgY29udGVudCBjaGFuZ2VzIG91dHNpZGVcbiAgICogb2YgdGhlc2UgZXZlbnRzLlxuICAgKi9cbiAgdXBkYXRlU3RpY2t5SGVhZGVyUm93U3R5bGVzKCk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRlclJvd3MgPSB0aGlzLl9nZXRSZW5kZXJlZFJvd3ModGhpcy5faGVhZGVyUm93T3V0bGV0KTtcbiAgICBjb25zdCB0YWJsZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAvLyBIaWRlIHRoZSB0aGVhZCBlbGVtZW50IGlmIHRoZXJlIGFyZSBubyBoZWFkZXIgcm93cy4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gc2F0aXNmeVxuICAgIC8vIG92ZXJ6ZWFsb3VzIGExMXkgY2hlY2tlcnMgdGhhdCBmYWlsIGJlY2F1c2UgdGhlIGByb3dncm91cGAgZWxlbWVudCBkb2VzIG5vdCBjb250YWluXG4gICAgLy8gcmVxdWlyZWQgY2hpbGQgYHJvd2AuXG4gICAgY29uc3QgdGhlYWQgPSB0YWJsZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGhlYWQnKTtcbiAgICBpZiAodGhlYWQpIHtcbiAgICAgIHRoZWFkLnN0eWxlLmRpc3BsYXkgPSBoZWFkZXJSb3dzLmxlbmd0aCA/ICcnIDogJ25vbmUnO1xuICAgIH1cblxuICAgIGNvbnN0IHN0aWNreVN0YXRlcyA9IHRoaXMuX2hlYWRlclJvd0RlZnMubWFwKGRlZiA9PiBkZWYuc3RpY2t5KTtcbiAgICB0aGlzLl9zdGlja3lTdHlsZXIuY2xlYXJTdGlja3lQb3NpdGlvbmluZyhoZWFkZXJSb3dzLCBbJ3RvcCddKTtcbiAgICB0aGlzLl9zdGlja3lTdHlsZXIuc3RpY2tSb3dzKGhlYWRlclJvd3MsIHN0aWNreVN0YXRlcywgJ3RvcCcpO1xuXG4gICAgLy8gUmVzZXQgdGhlIGRpcnR5IHN0YXRlIG9mIHRoZSBzdGlja3kgaW5wdXQgY2hhbmdlIHNpbmNlIGl0IGhhcyBiZWVuIHVzZWQuXG4gICAgdGhpcy5faGVhZGVyUm93RGVmcy5mb3JFYWNoKGRlZiA9PiBkZWYucmVzZXRTdGlja3lDaGFuZ2VkKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGZvb3RlciBzdGlja3kgc3R5bGVzLiBGaXJzdCByZXNldHMgYWxsIGFwcGxpZWQgc3R5bGVzIHdpdGggcmVzcGVjdCB0byB0aGUgY2VsbHNcbiAgICogc3RpY2tpbmcgdG8gdGhlIGJvdHRvbS4gVGhlbiwgZXZhbHVhdGluZyB3aGljaCBjZWxscyBuZWVkIHRvIGJlIHN0dWNrIHRvIHRoZSBib3R0b20uIFRoaXMgaXNcbiAgICogYXV0b21hdGljYWxseSBjYWxsZWQgd2hlbiB0aGUgZm9vdGVyIHJvdyBjaGFuZ2VzIGl0cyBkaXNwbGF5ZWQgc2V0IG9mIGNvbHVtbnMsIG9yIGlmIGl0c1xuICAgKiBzdGlja3kgaW5wdXQgY2hhbmdlcy4gTWF5IGJlIGNhbGxlZCBtYW51YWxseSBmb3IgY2FzZXMgd2hlcmUgdGhlIGNlbGwgY29udGVudCBjaGFuZ2VzIG91dHNpZGVcbiAgICogb2YgdGhlc2UgZXZlbnRzLlxuICAgKi9cbiAgdXBkYXRlU3RpY2t5Rm9vdGVyUm93U3R5bGVzKCk6IHZvaWQge1xuICAgIGNvbnN0IGZvb3RlclJvd3MgPSB0aGlzLl9nZXRSZW5kZXJlZFJvd3ModGhpcy5fZm9vdGVyUm93T3V0bGV0KTtcbiAgICBjb25zdCB0YWJsZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAvLyBIaWRlIHRoZSB0Zm9vdCBlbGVtZW50IGlmIHRoZXJlIGFyZSBubyBmb290ZXIgcm93cy4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gc2F0aXNmeVxuICAgIC8vIG92ZXJ6ZWFsb3VzIGExMXkgY2hlY2tlcnMgdGhhdCBmYWlsIGJlY2F1c2UgdGhlIGByb3dncm91cGAgZWxlbWVudCBkb2VzIG5vdCBjb250YWluXG4gICAgLy8gcmVxdWlyZWQgY2hpbGQgYHJvd2AuXG4gICAgY29uc3QgdGZvb3QgPSB0YWJsZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGZvb3QnKTtcbiAgICBpZiAodGZvb3QpIHtcbiAgICAgIHRmb290LnN0eWxlLmRpc3BsYXkgPSBmb290ZXJSb3dzLmxlbmd0aCA/ICcnIDogJ25vbmUnO1xuICAgIH1cblxuICAgIGNvbnN0IHN0aWNreVN0YXRlcyA9IHRoaXMuX2Zvb3RlclJvd0RlZnMubWFwKGRlZiA9PiBkZWYuc3RpY2t5KTtcbiAgICB0aGlzLl9zdGlja3lTdHlsZXIuY2xlYXJTdGlja3lQb3NpdGlvbmluZyhmb290ZXJSb3dzLCBbJ2JvdHRvbSddKTtcbiAgICB0aGlzLl9zdGlja3lTdHlsZXIuc3RpY2tSb3dzKGZvb3RlclJvd3MsIHN0aWNreVN0YXRlcywgJ2JvdHRvbScpO1xuICAgIHRoaXMuX3N0aWNreVN0eWxlci51cGRhdGVTdGlja3lGb290ZXJDb250YWluZXIodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzdGlja3lTdGF0ZXMpO1xuXG4gICAgLy8gUmVzZXQgdGhlIGRpcnR5IHN0YXRlIG9mIHRoZSBzdGlja3kgaW5wdXQgY2hhbmdlIHNpbmNlIGl0IGhhcyBiZWVuIHVzZWQuXG4gICAgdGhpcy5fZm9vdGVyUm93RGVmcy5mb3JFYWNoKGRlZiA9PiBkZWYucmVzZXRTdGlja3lDaGFuZ2VkKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNvbHVtbiBzdGlja3kgc3R5bGVzLiBGaXJzdCByZXNldHMgYWxsIGFwcGxpZWQgc3R5bGVzIHdpdGggcmVzcGVjdCB0byB0aGUgY2VsbHNcbiAgICogc3RpY2tpbmcgdG8gdGhlIGxlZnQgYW5kIHJpZ2h0LiBUaGVuIHN0aWNreSBzdHlsZXMgYXJlIGFkZGVkIGZvciB0aGUgbGVmdCBhbmQgcmlnaHQgYWNjb3JkaW5nXG4gICAqIHRvIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgZm9yIGVhY2ggY2VsbCBpbiBlYWNoIHJvdy4gVGhpcyBpcyBhdXRvbWF0aWNhbGx5IGNhbGxlZCB3aGVuXG4gICAqIHRoZSBkYXRhIHNvdXJjZSBwcm92aWRlcyBhIG5ldyBzZXQgb2YgZGF0YSBvciB3aGVuIGEgY29sdW1uIGRlZmluaXRpb24gY2hhbmdlcyBpdHMgc3RpY2t5XG4gICAqIGlucHV0LiBNYXkgYmUgY2FsbGVkIG1hbnVhbGx5IGZvciBjYXNlcyB3aGVyZSB0aGUgY2VsbCBjb250ZW50IGNoYW5nZXMgb3V0c2lkZSBvZiB0aGVzZSBldmVudHMuXG4gICAqL1xuICB1cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKSB7XG4gICAgY29uc3QgaGVhZGVyUm93cyA9IHRoaXMuX2dldFJlbmRlcmVkUm93cyh0aGlzLl9oZWFkZXJSb3dPdXRsZXQpO1xuICAgIGNvbnN0IGRhdGFSb3dzID0gdGhpcy5fZ2V0UmVuZGVyZWRSb3dzKHRoaXMuX3Jvd091dGxldCk7XG4gICAgY29uc3QgZm9vdGVyUm93cyA9IHRoaXMuX2dldFJlbmRlcmVkUm93cyh0aGlzLl9mb290ZXJSb3dPdXRsZXQpO1xuXG4gICAgLy8gQ2xlYXIgdGhlIGxlZnQgYW5kIHJpZ2h0IHBvc2l0aW9uaW5nIGZyb20gYWxsIGNvbHVtbnMgaW4gdGhlIHRhYmxlIGFjcm9zcyBhbGwgcm93cyBzaW5jZVxuICAgIC8vIHN0aWNreSBjb2x1bW5zIHNwYW4gYWNyb3NzIGFsbCB0YWJsZSBzZWN0aW9ucyAoaGVhZGVyLCBkYXRhLCBmb290ZXIpXG4gICAgdGhpcy5fc3RpY2t5U3R5bGVyLmNsZWFyU3RpY2t5UG9zaXRpb25pbmcoXG4gICAgICAgIFsuLi5oZWFkZXJSb3dzLCAuLi5kYXRhUm93cywgLi4uZm9vdGVyUm93c10sIFsnbGVmdCcsICdyaWdodCddKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgc3RpY2t5IHN0eWxlcyBmb3IgZWFjaCBoZWFkZXIgcm93IGRlcGVuZGluZyBvbiB0aGUgZGVmJ3Mgc3RpY2t5IHN0YXRlXG4gICAgaGVhZGVyUm93cy5mb3JFYWNoKChoZWFkZXJSb3csIGkpID0+IHtcbiAgICAgIHRoaXMuX2FkZFN0aWNreUNvbHVtblN0eWxlcyhbaGVhZGVyUm93XSwgdGhpcy5faGVhZGVyUm93RGVmc1tpXSk7XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHN0aWNreSBzdHlsZXMgZm9yIGVhY2ggZGF0YSByb3cgZGVwZW5kaW5nIG9uIGl0cyBkZWYncyBzdGlja3kgc3RhdGVcbiAgICB0aGlzLl9yb3dEZWZzLmZvckVhY2gocm93RGVmID0+IHtcbiAgICAgIC8vIENvbGxlY3QgYWxsIHRoZSByb3dzIHJlbmRlcmVkIHdpdGggdGhpcyByb3cgZGVmaW5pdGlvbi5cbiAgICAgIGNvbnN0IHJvd3M6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlclJvd3NbaV0ucm93RGVmID09PSByb3dEZWYpIHtcbiAgICAgICAgICByb3dzLnB1c2goZGF0YVJvd3NbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2FkZFN0aWNreUNvbHVtblN0eWxlcyhyb3dzLCByb3dEZWYpO1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBzdGlja3kgc3R5bGVzIGZvciBlYWNoIGZvb3RlciByb3cgZGVwZW5kaW5nIG9uIHRoZSBkZWYncyBzdGlja3kgc3RhdGVcbiAgICBmb290ZXJSb3dzLmZvckVhY2goKGZvb3RlclJvdywgaSkgPT4ge1xuICAgICAgdGhpcy5fYWRkU3RpY2t5Q29sdW1uU3R5bGVzKFtmb290ZXJSb3ddLCB0aGlzLl9mb290ZXJSb3dEZWZzW2ldKTtcbiAgICB9KTtcblxuICAgIC8vIFJlc2V0IHRoZSBkaXJ0eSBzdGF0ZSBvZiB0aGUgc3RpY2t5IGlucHV0IGNoYW5nZSBzaW5jZSBpdCBoYXMgYmVlbiB1c2VkLlxuICAgIEFycmF5LmZyb20odGhpcy5fY29sdW1uRGVmc0J5TmFtZS52YWx1ZXMoKSkuZm9yRWFjaChkZWYgPT4gZGVmLnJlc2V0U3RpY2t5Q2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxpc3Qgb2YgUmVuZGVyUm93IG9iamVjdHMgdG8gcmVuZGVyIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBsaXN0IG9mIGRhdGEgYW5kIGRlZmluZWRcbiAgICogcm93IGRlZmluaXRpb25zLiBJZiB0aGUgcHJldmlvdXMgbGlzdCBhbHJlYWR5IGNvbnRhaW5lZCBhIHBhcnRpY3VsYXIgcGFpciwgaXQgc2hvdWxkIGJlIHJldXNlZFxuICAgKiBzbyB0aGF0IHRoZSBkaWZmZXIgZXF1YXRlcyB0aGVpciByZWZlcmVuY2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0QWxsUmVuZGVyUm93cygpOiBSZW5kZXJSb3c8VD5bXSB7XG4gICAgY29uc3QgcmVuZGVyUm93czogUmVuZGVyUm93PFQ+W10gPSBbXTtcblxuICAgIC8vIFN0b3JlIHRoZSBjYWNoZSBhbmQgY3JlYXRlIGEgbmV3IG9uZS4gQW55IHJlLXVzZWQgUmVuZGVyUm93IG9iamVjdHMgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZVxuICAgIC8vIG5ldyBjYWNoZSB3aGlsZSB1bnVzZWQgb25lcyBjYW4gYmUgcGlja2VkIHVwIGJ5IGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICBjb25zdCBwcmV2Q2FjaGVkUmVuZGVyUm93cyA9IHRoaXMuX2NhY2hlZFJlbmRlclJvd3NNYXA7XG4gICAgdGhpcy5fY2FjaGVkUmVuZGVyUm93c01hcCA9IG5ldyBNYXAoKTtcblxuICAgIC8vIEZvciBlYWNoIGRhdGEgb2JqZWN0LCBnZXQgdGhlIGxpc3Qgb2Ygcm93cyB0aGF0IHNob3VsZCBiZSByZW5kZXJlZCwgcmVwcmVzZW50ZWQgYnkgdGhlXG4gICAgLy8gcmVzcGVjdGl2ZSBgUmVuZGVyUm93YCBvYmplY3Qgd2hpY2ggaXMgdGhlIHBhaXIgb2YgYGRhdGFgIGFuZCBgQ2RrUm93RGVmYC5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBkYXRhID0gdGhpcy5fZGF0YVtpXTtcbiAgICAgIGNvbnN0IHJlbmRlclJvd3NGb3JEYXRhID0gdGhpcy5fZ2V0UmVuZGVyUm93c0ZvckRhdGEoZGF0YSwgaSwgcHJldkNhY2hlZFJlbmRlclJvd3MuZ2V0KGRhdGEpKTtcblxuICAgICAgaWYgKCF0aGlzLl9jYWNoZWRSZW5kZXJSb3dzTWFwLmhhcyhkYXRhKSkge1xuICAgICAgICB0aGlzLl9jYWNoZWRSZW5kZXJSb3dzTWFwLnNldChkYXRhLCBuZXcgV2Vha01hcCgpKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZW5kZXJSb3dzRm9yRGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICBsZXQgcmVuZGVyUm93ID0gcmVuZGVyUm93c0ZvckRhdGFbal07XG5cbiAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLl9jYWNoZWRSZW5kZXJSb3dzTWFwLmdldChyZW5kZXJSb3cuZGF0YSkhO1xuICAgICAgICBpZiAoY2FjaGUuaGFzKHJlbmRlclJvdy5yb3dEZWYpKSB7XG4gICAgICAgICAgY2FjaGUuZ2V0KHJlbmRlclJvdy5yb3dEZWYpIS5wdXNoKHJlbmRlclJvdyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FjaGUuc2V0KHJlbmRlclJvdy5yb3dEZWYsIFtyZW5kZXJSb3ddKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJSb3dzLnB1c2gocmVuZGVyUm93KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyUm93cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBgUmVuZGVyUm93PFQ+YCBmb3IgdGhlIHByb3ZpZGVkIGRhdGEgb2JqZWN0IGFuZCBhbnkgYENka1Jvd0RlZmAgb2JqZWN0cyB0aGF0XG4gICAqIHNob3VsZCBiZSByZW5kZXJlZCBmb3IgdGhpcyBkYXRhLiBSZXVzZXMgdGhlIGNhY2hlZCBSZW5kZXJSb3cgb2JqZWN0cyBpZiB0aGV5IG1hdGNoIHRoZSBzYW1lXG4gICAqIGAoVCwgQ2RrUm93RGVmKWAgcGFpci5cbiAgICovXG4gIHByaXZhdGUgX2dldFJlbmRlclJvd3NGb3JEYXRhKFxuICAgICAgZGF0YTogVCwgZGF0YUluZGV4OiBudW1iZXIsIGNhY2hlPzogV2Vha01hcDxDZGtSb3dEZWY8VD4sIFJlbmRlclJvdzxUPltdPik6IFJlbmRlclJvdzxUPltdIHtcbiAgICBjb25zdCByb3dEZWZzID0gdGhpcy5fZ2V0Um93RGVmcyhkYXRhLCBkYXRhSW5kZXgpO1xuXG4gICAgcmV0dXJuIHJvd0RlZnMubWFwKHJvd0RlZiA9PiB7XG4gICAgICBjb25zdCBjYWNoZWRSZW5kZXJSb3dzID0gKGNhY2hlICYmIGNhY2hlLmhhcyhyb3dEZWYpKSA/IGNhY2hlLmdldChyb3dEZWYpISA6IFtdO1xuICAgICAgaWYgKGNhY2hlZFJlbmRlclJvd3MubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGRhdGFSb3cgPSBjYWNoZWRSZW5kZXJSb3dzLnNoaWZ0KCkhO1xuICAgICAgICBkYXRhUm93LmRhdGFJbmRleCA9IGRhdGFJbmRleDtcbiAgICAgICAgcmV0dXJuIGRhdGFSb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge2RhdGEsIHJvd0RlZiwgZGF0YUluZGV4fTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBVcGRhdGUgdGhlIG1hcCBjb250YWluaW5nIHRoZSBjb250ZW50J3MgY29sdW1uIGRlZmluaXRpb25zLiAqL1xuICBwcml2YXRlIF9jYWNoZUNvbHVtbkRlZnMoKSB7XG4gICAgdGhpcy5fY29sdW1uRGVmc0J5TmFtZS5jbGVhcigpO1xuXG4gICAgY29uc3QgY29sdW1uRGVmcyA9IG1lcmdlQXJyYXlBbmRTZXQoXG4gICAgICAgIHRoaXMuX2dldE93bkRlZnModGhpcy5fY29udGVudENvbHVtbkRlZnMpLCB0aGlzLl9jdXN0b21Db2x1bW5EZWZzKTtcbiAgICBjb2x1bW5EZWZzLmZvckVhY2goY29sdW1uRGVmID0+IHtcbiAgICAgIGlmICh0aGlzLl9jb2x1bW5EZWZzQnlOYW1lLmhhcyhjb2x1bW5EZWYubmFtZSkgJiZcbiAgICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgICAgdGhyb3cgZ2V0VGFibGVEdXBsaWNhdGVDb2x1bW5OYW1lRXJyb3IoY29sdW1uRGVmLm5hbWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29sdW1uRGVmc0J5TmFtZS5zZXQoY29sdW1uRGVmLm5hbWUsIGNvbHVtbkRlZik7XG4gICAgfSk7XG4gIH1cblxuICAvKiogVXBkYXRlIHRoZSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgcm93IGRlZmluaXRpb25zIHRoYXQgY2FuIGJlIHVzZWQuICovXG4gIHByaXZhdGUgX2NhY2hlUm93RGVmcygpIHtcbiAgICB0aGlzLl9oZWFkZXJSb3dEZWZzID0gbWVyZ2VBcnJheUFuZFNldChcbiAgICAgICAgdGhpcy5fZ2V0T3duRGVmcyh0aGlzLl9jb250ZW50SGVhZGVyUm93RGVmcyksIHRoaXMuX2N1c3RvbUhlYWRlclJvd0RlZnMpO1xuICAgIHRoaXMuX2Zvb3RlclJvd0RlZnMgPSBtZXJnZUFycmF5QW5kU2V0KFxuICAgICAgICB0aGlzLl9nZXRPd25EZWZzKHRoaXMuX2NvbnRlbnRGb290ZXJSb3dEZWZzKSwgdGhpcy5fY3VzdG9tRm9vdGVyUm93RGVmcyk7XG4gICAgdGhpcy5fcm93RGVmcyA9IG1lcmdlQXJyYXlBbmRTZXQoXG4gICAgICAgIHRoaXMuX2dldE93bkRlZnModGhpcy5fY29udGVudFJvd0RlZnMpLCB0aGlzLl9jdXN0b21Sb3dEZWZzKTtcblxuICAgIC8vIEFmdGVyIGFsbCByb3cgZGVmaW5pdGlvbnMgYXJlIGRldGVybWluZWQsIGZpbmQgdGhlIHJvdyBkZWZpbml0aW9uIHRvIGJlIGNvbnNpZGVyZWQgZGVmYXVsdC5cbiAgICBjb25zdCBkZWZhdWx0Um93RGVmcyA9IHRoaXMuX3Jvd0RlZnMuZmlsdGVyKGRlZiA9PiAhZGVmLndoZW4pO1xuICAgIGlmICghdGhpcy5tdWx0aVRlbXBsYXRlRGF0YVJvd3MgJiYgZGVmYXVsdFJvd0RlZnMubGVuZ3RoID4gMSAmJlxuICAgICAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgZ2V0VGFibGVNdWx0aXBsZURlZmF1bHRSb3dEZWZzRXJyb3IoKTtcbiAgICB9XG4gICAgdGhpcy5fZGVmYXVsdFJvd0RlZiA9IGRlZmF1bHRSb3dEZWZzWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBoZWFkZXIsIGRhdGEsIG9yIGZvb3RlciByb3dzIGhhdmUgY2hhbmdlZCB3aGF0IGNvbHVtbnMgdGhleSB3YW50IHRvIGRpc3BsYXkgb3JcbiAgICogd2hldGhlciB0aGUgc3RpY2t5IHN0YXRlcyBoYXZlIGNoYW5nZWQgZm9yIHRoZSBoZWFkZXIgb3IgZm9vdGVyLiBJZiB0aGVyZSBpcyBhIGRpZmYsIHRoZW5cbiAgICogcmUtcmVuZGVyIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX3JlbmRlclVwZGF0ZWRDb2x1bW5zKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNvbHVtbnNEaWZmUmVkdWNlciA9IChhY2M6IGJvb2xlYW4sIGRlZjogQmFzZVJvd0RlZikgPT4gYWNjIHx8ICEhZGVmLmdldENvbHVtbnNEaWZmKCk7XG5cbiAgICAvLyBGb3JjZSByZS1yZW5kZXIgZGF0YSByb3dzIGlmIHRoZSBsaXN0IG9mIGNvbHVtbiBkZWZpbml0aW9ucyBoYXZlIGNoYW5nZWQuXG4gICAgY29uc3QgZGF0YUNvbHVtbnNDaGFuZ2VkID0gdGhpcy5fcm93RGVmcy5yZWR1Y2UoY29sdW1uc0RpZmZSZWR1Y2VyLCBmYWxzZSk7XG4gICAgaWYgKGRhdGFDb2x1bW5zQ2hhbmdlZCkge1xuICAgICAgdGhpcy5fZm9yY2VSZW5kZXJEYXRhUm93cygpO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIHJlLXJlbmRlciBoZWFkZXIvZm9vdGVyIHJvd3MgaWYgdGhlIGxpc3Qgb2YgY29sdW1uIGRlZmluaXRpb25zIGhhdmUgY2hhbmdlZC5cbiAgICBjb25zdCBoZWFkZXJDb2x1bW5zQ2hhbmdlZCA9IHRoaXMuX2hlYWRlclJvd0RlZnMucmVkdWNlKGNvbHVtbnNEaWZmUmVkdWNlciwgZmFsc2UpO1xuICAgIGlmIChoZWFkZXJDb2x1bW5zQ2hhbmdlZCkge1xuICAgICAgdGhpcy5fZm9yY2VSZW5kZXJIZWFkZXJSb3dzKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZm9vdGVyQ29sdW1uc0NoYW5nZWQgPSB0aGlzLl9mb290ZXJSb3dEZWZzLnJlZHVjZShjb2x1bW5zRGlmZlJlZHVjZXIsIGZhbHNlKTtcbiAgICBpZiAoZm9vdGVyQ29sdW1uc0NoYW5nZWQpIHtcbiAgICAgIHRoaXMuX2ZvcmNlUmVuZGVyRm9vdGVyUm93cygpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhQ29sdW1uc0NoYW5nZWQgfHwgaGVhZGVyQ29sdW1uc0NoYW5nZWQgfHwgZm9vdGVyQ29sdW1uc0NoYW5nZWQ7XG4gIH1cblxuICAvKipcbiAgICogU3dpdGNoIHRvIHRoZSBwcm92aWRlZCBkYXRhIHNvdXJjZSBieSByZXNldHRpbmcgdGhlIGRhdGEgYW5kIHVuc3Vic2NyaWJpbmcgZnJvbSB0aGUgY3VycmVudFxuICAgKiByZW5kZXIgY2hhbmdlIHN1YnNjcmlwdGlvbiBpZiBvbmUgZXhpc3RzLiBJZiB0aGUgZGF0YSBzb3VyY2UgaXMgbnVsbCwgaW50ZXJwcmV0IHRoaXMgYnlcbiAgICogY2xlYXJpbmcgdGhlIHJvdyBvdXRsZXQuIE90aGVyd2lzZSBzdGFydCBsaXN0ZW5pbmcgZm9yIG5ldyBkYXRhLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3dpdGNoRGF0YVNvdXJjZShkYXRhU291cmNlOiBDZGtUYWJsZURhdGFTb3VyY2VJbnB1dDxUPikge1xuICAgIHRoaXMuX2RhdGEgPSBbXTtcblxuICAgIGlmIChpc0RhdGFTb3VyY2UodGhpcy5kYXRhU291cmNlKSkge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRpc2Nvbm5lY3QodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gU3RvcCBsaXN0ZW5pbmcgZm9yIGRhdGEgZnJvbSB0aGUgcHJldmlvdXMgZGF0YSBzb3VyY2UuXG4gICAgaWYgKHRoaXMuX3JlbmRlckNoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fcmVuZGVyQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9yZW5kZXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIGlmICghZGF0YVNvdXJjZSkge1xuICAgICAgaWYgKHRoaXMuX2RhdGFEaWZmZXIpIHtcbiAgICAgICAgdGhpcy5fZGF0YURpZmZlci5kaWZmKFtdKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gIH1cblxuICAvKiogU2V0IHVwIGEgc3Vic2NyaXB0aW9uIGZvciB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gIHByaXZhdGUgX29ic2VydmVSZW5kZXJDaGFuZ2VzKCkge1xuICAgIC8vIElmIG5vIGRhdGEgc291cmNlIGhhcyBiZWVuIHNldCwgdGhlcmUgaXMgbm90aGluZyB0byBvYnNlcnZlIGZvciBjaGFuZ2VzLlxuICAgIGlmICghdGhpcy5kYXRhU291cmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGRhdGFTdHJlYW06IE9ic2VydmFibGU8VFtdfFJlYWRvbmx5QXJyYXk8VD4+fHVuZGVmaW5lZDtcblxuICAgIGlmIChpc0RhdGFTb3VyY2UodGhpcy5kYXRhU291cmNlKSkge1xuICAgICAgZGF0YVN0cmVhbSA9IHRoaXMuZGF0YVNvdXJjZS5jb25uZWN0KHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlKHRoaXMuZGF0YVNvdXJjZSkpIHtcbiAgICAgIGRhdGFTdHJlYW0gPSB0aGlzLmRhdGFTb3VyY2U7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZGF0YVNvdXJjZSkpIHtcbiAgICAgIGRhdGFTdHJlYW0gPSBvYnNlcnZhYmxlT2YodGhpcy5kYXRhU291cmNlKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YVN0cmVhbSA9PT0gdW5kZWZpbmVkICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBnZXRUYWJsZVVua25vd25EYXRhU291cmNlRXJyb3IoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJDaGFuZ2VTdWJzY3JpcHRpb24gPSBkYXRhU3RyZWFtIS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGEgfHwgW107XG4gICAgICAgIHRoaXMucmVuZGVyUm93cygpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFueSBleGlzdGluZyBjb250ZW50IGluIHRoZSBoZWFkZXIgcm93IG91dGxldCBhbmQgY3JlYXRlcyBhIG5ldyBlbWJlZGRlZCB2aWV3XG4gICAqIGluIHRoZSBvdXRsZXQgdXNpbmcgdGhlIGhlYWRlciByb3cgZGVmaW5pdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX2ZvcmNlUmVuZGVySGVhZGVyUm93cygpIHtcbiAgICAvLyBDbGVhciB0aGUgaGVhZGVyIHJvdyBvdXRsZXQgaWYgYW55IGNvbnRlbnQgZXhpc3RzLlxuICAgIGlmICh0aGlzLl9oZWFkZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9oZWFkZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIH1cblxuICAgIHRoaXMuX2hlYWRlclJvd0RlZnMuZm9yRWFjaCgoZGVmLCBpKSA9PiB0aGlzLl9yZW5kZXJSb3codGhpcy5faGVhZGVyUm93T3V0bGV0LCBkZWYsIGkpKTtcbiAgICB0aGlzLnVwZGF0ZVN0aWNreUhlYWRlclJvd1N0eWxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbnkgZXhpc3RpbmcgY29udGVudCBpbiB0aGUgZm9vdGVyIHJvdyBvdXRsZXQgYW5kIGNyZWF0ZXMgYSBuZXcgZW1iZWRkZWQgdmlld1xuICAgKiBpbiB0aGUgb3V0bGV0IHVzaW5nIHRoZSBmb290ZXIgcm93IGRlZmluaXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9mb3JjZVJlbmRlckZvb3RlclJvd3MoKSB7XG4gICAgLy8gQ2xlYXIgdGhlIGZvb3RlciByb3cgb3V0bGV0IGlmIGFueSBjb250ZW50IGV4aXN0cy5cbiAgICBpZiAodGhpcy5fZm9vdGVyUm93T3V0bGV0LnZpZXdDb250YWluZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fZm9vdGVyUm93T3V0bGV0LnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9mb290ZXJSb3dEZWZzLmZvckVhY2goKGRlZiwgaSkgPT4gdGhpcy5fcmVuZGVyUm93KHRoaXMuX2Zvb3RlclJvd091dGxldCwgZGVmLCBpKSk7XG4gICAgdGhpcy51cGRhdGVTdGlja3lGb290ZXJSb3dTdHlsZXMoKTtcbiAgfVxuXG4gIC8qKiBBZGRzIHRoZSBzdGlja3kgY29sdW1uIHN0eWxlcyBmb3IgdGhlIHJvd3MgYWNjb3JkaW5nIHRvIHRoZSBjb2x1bW5zJyBzdGljayBzdGF0ZXMuICovXG4gIHByaXZhdGUgX2FkZFN0aWNreUNvbHVtblN0eWxlcyhyb3dzOiBIVE1MRWxlbWVudFtdLCByb3dEZWY6IEJhc2VSb3dEZWYpIHtcbiAgICBjb25zdCBjb2x1bW5EZWZzID0gQXJyYXkuZnJvbShyb3dEZWYuY29sdW1ucyB8fCBbXSkubWFwKGNvbHVtbk5hbWUgPT4ge1xuICAgICAgY29uc3QgY29sdW1uRGVmID0gdGhpcy5fY29sdW1uRGVmc0J5TmFtZS5nZXQoY29sdW1uTmFtZSk7XG4gICAgICBpZiAoIWNvbHVtbkRlZiAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgICB0aHJvdyBnZXRUYWJsZVVua25vd25Db2x1bW5FcnJvcihjb2x1bW5OYW1lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2x1bW5EZWYhO1xuICAgIH0pO1xuICAgIGNvbnN0IHN0aWNreVN0YXJ0U3RhdGVzID0gY29sdW1uRGVmcy5tYXAoY29sdW1uRGVmID0+IGNvbHVtbkRlZi5zdGlja3kpO1xuICAgIGNvbnN0IHN0aWNreUVuZFN0YXRlcyA9IGNvbHVtbkRlZnMubWFwKGNvbHVtbkRlZiA9PiBjb2x1bW5EZWYuc3RpY2t5RW5kKTtcbiAgICB0aGlzLl9zdGlja3lTdHlsZXIudXBkYXRlU3RpY2t5Q29sdW1ucyhyb3dzLCBzdGlja3lTdGFydFN0YXRlcywgc3RpY2t5RW5kU3RhdGVzKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBsaXN0IG9mIHJvd3MgdGhhdCBoYXZlIGJlZW4gcmVuZGVyZWQgaW4gdGhlIHJvdyBvdXRsZXQuICovXG4gIF9nZXRSZW5kZXJlZFJvd3Mocm93T3V0bGV0OiBSb3dPdXRsZXQpOiBIVE1MRWxlbWVudFtdIHtcbiAgICBjb25zdCByZW5kZXJlZFJvd3M6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93T3V0bGV0LnZpZXdDb250YWluZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSAocm93T3V0bGV0LnZpZXdDb250YWluZXIuZ2V0KGkpISBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pik7XG4gICAgICByZW5kZXJlZFJvd3MucHVzaCh2aWV3UmVmLnJvb3ROb2Rlc1swXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVkUm93cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hdGNoaW5nIHJvdyBkZWZpbml0aW9ucyB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciB0aGlzIHJvdyBkYXRhLiBJZiB0aGVyZSBpcyBvbmx5XG4gICAqIG9uZSByb3cgZGVmaW5pdGlvbiwgaXQgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSwgZmluZCB0aGUgcm93IGRlZmluaXRpb25zIHRoYXQgaGFzIGEgd2hlblxuICAgKiBwcmVkaWNhdGUgdGhhdCByZXR1cm5zIHRydWUgd2l0aCB0aGUgZGF0YS4gSWYgbm9uZSByZXR1cm4gdHJ1ZSwgcmV0dXJuIHRoZSBkZWZhdWx0IHJvd1xuICAgKiBkZWZpbml0aW9uLlxuICAgKi9cbiAgX2dldFJvd0RlZnMoZGF0YTogVCwgZGF0YUluZGV4OiBudW1iZXIpOiBDZGtSb3dEZWY8VD5bXSB7XG4gICAgaWYgKHRoaXMuX3Jvd0RlZnMubGVuZ3RoID09IDEpIHtcbiAgICAgIHJldHVybiBbdGhpcy5fcm93RGVmc1swXV07XG4gICAgfVxuXG4gICAgbGV0IHJvd0RlZnM6IENka1Jvd0RlZjxUPltdID0gW107XG4gICAgaWYgKHRoaXMubXVsdGlUZW1wbGF0ZURhdGFSb3dzKSB7XG4gICAgICByb3dEZWZzID0gdGhpcy5fcm93RGVmcy5maWx0ZXIoZGVmID0+ICFkZWYud2hlbiB8fCBkZWYud2hlbihkYXRhSW5kZXgsIGRhdGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJvd0RlZiA9XG4gICAgICAgICAgdGhpcy5fcm93RGVmcy5maW5kKGRlZiA9PiBkZWYud2hlbiAmJiBkZWYud2hlbihkYXRhSW5kZXgsIGRhdGEpKSB8fCB0aGlzLl9kZWZhdWx0Um93RGVmO1xuICAgICAgaWYgKHJvd0RlZikge1xuICAgICAgICByb3dEZWZzLnB1c2gocm93RGVmKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJvd0RlZnMubGVuZ3RoICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBnZXRUYWJsZU1pc3NpbmdNYXRjaGluZ1Jvd0RlZkVycm9yKGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dEZWZzO1xuICB9XG5cblxuICBwcml2YXRlIF9nZXRFbWJlZGRlZFZpZXdBcmdzKHJlbmRlclJvdzogUmVuZGVyUm93PFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBudW1iZXIpOiBfVmlld1JlcGVhdGVySXRlbUluc2VydEFyZ3M8Um93Q29udGV4dDxUPj4ge1xuICAgIGNvbnN0IHJvd0RlZiA9IHJlbmRlclJvdy5yb3dEZWY7XG4gICAgY29uc3QgY29udGV4dDogUm93Q29udGV4dDxUPiA9IHskaW1wbGljaXQ6IHJlbmRlclJvdy5kYXRhfTtcbiAgICByZXR1cm4ge1xuICAgICAgdGVtcGxhdGVSZWY6IHJvd0RlZi50ZW1wbGF0ZSxcbiAgICAgIGNvbnRleHQsXG4gICAgICBpbmRleCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgcm93IHRlbXBsYXRlIGluIHRoZSBvdXRsZXQgYW5kIGZpbGxzIGl0IHdpdGggdGhlIHNldCBvZiBjZWxsIHRlbXBsYXRlcy5cbiAgICogT3B0aW9uYWxseSB0YWtlcyBhIGNvbnRleHQgdG8gcHJvdmlkZSB0byB0aGUgcm93IGFuZCBjZWxscywgYXMgd2VsbCBhcyBhbiBvcHRpb25hbCBpbmRleFxuICAgKiBvZiB3aGVyZSB0byBwbGFjZSB0aGUgbmV3IHJvdyB0ZW1wbGF0ZSBpbiB0aGUgb3V0bGV0LlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVuZGVyUm93KFxuICAgICAgb3V0bGV0OiBSb3dPdXRsZXQsIHJvd0RlZjogQmFzZVJvd0RlZiwgaW5kZXg6IG51bWJlcixcbiAgICAgIGNvbnRleHQ6IFJvd0NvbnRleHQ8VD4gPSB7fSk6IEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PFQ+PiB7XG4gICAgLy8gVE9ETyhhbmRyZXdzZWd1aW4pOiBlbmZvcmNlIHRoYXQgb25lIG91dGxldCB3YXMgaW5zdGFudGlhdGVkIGZyb20gY3JlYXRlRW1iZWRkZWRWaWV3XG4gICAgY29uc3QgdmlldyA9IG91dGxldC52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhyb3dEZWYudGVtcGxhdGUsIGNvbnRleHQsIGluZGV4KTtcbiAgICB0aGlzLl9yZW5kZXJDZWxsVGVtcGxhdGVGb3JJdGVtKHJvd0RlZiwgY29udGV4dCk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICBwcml2YXRlIF9yZW5kZXJDZWxsVGVtcGxhdGVGb3JJdGVtKHJvd0RlZjogQmFzZVJvd0RlZiwgY29udGV4dDogUm93Q29udGV4dDxUPikge1xuICAgIGZvciAobGV0IGNlbGxUZW1wbGF0ZSBvZiB0aGlzLl9nZXRDZWxsVGVtcGxhdGVzKHJvd0RlZikpIHtcbiAgICAgIGlmIChDZGtDZWxsT3V0bGV0Lm1vc3RSZWNlbnRDZWxsT3V0bGV0KSB7XG4gICAgICAgIENka0NlbGxPdXRsZXQubW9zdFJlY2VudENlbGxPdXRsZXQuX3ZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KGNlbGxUZW1wbGF0ZSwgY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgaW5kZXgtcmVsYXRlZCBjb250ZXh0IGZvciBlYWNoIHJvdyB0byByZWZsZWN0IGFueSBjaGFuZ2VzIGluIHRoZSBpbmRleCBvZiB0aGUgcm93cyxcbiAgICogZS5nLiBmaXJzdC9sYXN0L2V2ZW4vb2RkLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlUm93SW5kZXhDb250ZXh0KCkge1xuICAgIGNvbnN0IHZpZXdDb250YWluZXIgPSB0aGlzLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICBmb3IgKGxldCByZW5kZXJJbmRleCA9IDAsIGNvdW50ID0gdmlld0NvbnRhaW5lci5sZW5ndGg7IHJlbmRlckluZGV4IDwgY291bnQ7IHJlbmRlckluZGV4KyspIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB2aWV3Q29udGFpbmVyLmdldChyZW5kZXJJbmRleCkgYXMgUm93Vmlld1JlZjxUPjtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB2aWV3UmVmLmNvbnRleHQgYXMgUm93Q29udGV4dDxUPjtcbiAgICAgIGNvbnRleHQuY291bnQgPSBjb3VudDtcbiAgICAgIGNvbnRleHQuZmlyc3QgPSByZW5kZXJJbmRleCA9PT0gMDtcbiAgICAgIGNvbnRleHQubGFzdCA9IHJlbmRlckluZGV4ID09PSBjb3VudCAtIDE7XG4gICAgICBjb250ZXh0LmV2ZW4gPSByZW5kZXJJbmRleCAlIDIgPT09IDA7XG4gICAgICBjb250ZXh0Lm9kZCA9ICFjb250ZXh0LmV2ZW47XG5cbiAgICAgIGlmICh0aGlzLm11bHRpVGVtcGxhdGVEYXRhUm93cykge1xuICAgICAgICBjb250ZXh0LmRhdGFJbmRleCA9IHRoaXMuX3JlbmRlclJvd3NbcmVuZGVySW5kZXhdLmRhdGFJbmRleDtcbiAgICAgICAgY29udGV4dC5yZW5kZXJJbmRleCA9IHJlbmRlckluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGV4dC5pbmRleCA9IHRoaXMuX3JlbmRlclJvd3NbcmVuZGVySW5kZXhdLmRhdGFJbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY29sdW1uIGRlZmluaXRpb25zIGZvciB0aGUgcHJvdmlkZWQgcm93IGRlZi4gKi9cbiAgcHJpdmF0ZSBfZ2V0Q2VsbFRlbXBsYXRlcyhyb3dEZWY6IEJhc2VSb3dEZWYpOiBUZW1wbGF0ZVJlZjxhbnk+W10ge1xuICAgIGlmICghcm93RGVmIHx8ICFyb3dEZWYuY29sdW1ucykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb3dEZWYuY29sdW1ucywgY29sdW1uSWQgPT4ge1xuICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5fY29sdW1uRGVmc0J5TmFtZS5nZXQoY29sdW1uSWQpO1xuXG4gICAgICBpZiAoIWNvbHVtbiAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgICB0aHJvdyBnZXRUYWJsZVVua25vd25Db2x1bW5FcnJvcihjb2x1bW5JZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3dEZWYuZXh0cmFjdENlbGxUZW1wbGF0ZShjb2x1bW4hKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBBZGRzIG5hdGl2ZSB0YWJsZSBzZWN0aW9ucyAoZS5nLiB0Ym9keSkgYW5kIG1vdmVzIHRoZSByb3cgb3V0bGV0cyBpbnRvIHRoZW0uICovXG4gIHByaXZhdGUgX2FwcGx5TmF0aXZlVGFibGVTZWN0aW9ucygpIHtcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGNvbnN0IHNlY3Rpb25zID0gW1xuICAgICAge3RhZzogJ3RoZWFkJywgb3V0bGV0czogW3RoaXMuX2hlYWRlclJvd091dGxldF19LFxuICAgICAge3RhZzogJ3Rib2R5Jywgb3V0bGV0czogW3RoaXMuX3Jvd091dGxldCwgdGhpcy5fbm9EYXRhUm93T3V0bGV0XX0sXG4gICAgICB7dGFnOiAndGZvb3QnLCBvdXRsZXRzOiBbdGhpcy5fZm9vdGVyUm93T3V0bGV0XX0sXG4gICAgXTtcblxuICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBzZWN0aW9ucykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoc2VjdGlvbi50YWcpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncm93Z3JvdXAnKTtcblxuICAgICAgZm9yIChjb25zdCBvdXRsZXQgb2Ygc2VjdGlvbi5vdXRsZXRzKSB7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob3V0bGV0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gVXNlIGEgRG9jdW1lbnRGcmFnbWVudCBzbyB3ZSBkb24ndCBoaXQgdGhlIERPTSBvbiBlYWNoIGl0ZXJhdGlvbi5cbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnRGcmFnbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2VzIGEgcmUtcmVuZGVyIG9mIHRoZSBkYXRhIHJvd3MuIFNob3VsZCBiZSBjYWxsZWQgaW4gY2FzZXMgd2hlcmUgdGhlcmUgaGFzIGJlZW4gYW4gaW5wdXRcbiAgICogY2hhbmdlIHRoYXQgYWZmZWN0cyB0aGUgZXZhbHVhdGlvbiBvZiB3aGljaCByb3dzIHNob3VsZCBiZSByZW5kZXJlZCwgZS5nLiB0b2dnbGluZ1xuICAgKiBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBvciBhZGRpbmcvcmVtb3Zpbmcgcm93IGRlZmluaXRpb25zLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9yY2VSZW5kZXJEYXRhUm93cygpIHtcbiAgICB0aGlzLl9kYXRhRGlmZmVyLmRpZmYoW10pO1xuICAgIHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgdGhpcy5yZW5kZXJSb3dzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZXJlIGhhcyBiZWVuIGEgY2hhbmdlIGluIHN0aWNreSBzdGF0ZXMgc2luY2UgbGFzdCBjaGVjayBhbmQgYXBwbGllcyB0aGUgY29ycmVjdFxuICAgKiBzdGlja3kgc3R5bGVzLiBTaW5jZSBjaGVja2luZyByZXNldHMgdGhlIFwiZGlydHlcIiBzdGF0ZSwgdGhpcyBzaG91bGQgb25seSBiZSBwZXJmb3JtZWQgb25jZVxuICAgKiBkdXJpbmcgYSBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCBhZnRlciB0aGUgaW5wdXRzIGFyZSBzZXR0bGVkIChhZnRlciBjb250ZW50IGNoZWNrKS5cbiAgICovXG4gIHByaXZhdGUgX2NoZWNrU3RpY2t5U3RhdGVzKCkge1xuICAgIGNvbnN0IHN0aWNreUNoZWNrUmVkdWNlciA9IChhY2M6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6IENka0hlYWRlclJvd0RlZnxDZGtGb290ZXJSb3dEZWZ8Q2RrQ29sdW1uRGVmKSA9PiB7XG4gICAgICByZXR1cm4gYWNjIHx8IGQuaGFzU3RpY2t5Q2hhbmdlZCgpO1xuICAgIH07XG5cbiAgICAvLyBOb3RlIHRoYXQgdGhlIGNoZWNrIG5lZWRzIHRvIG9jY3VyIGZvciBldmVyeSBkZWZpbml0aW9uIHNpbmNlIGl0IG5vdGlmaWVzIHRoZSBkZWZpbml0aW9uXG4gICAgLy8gdGhhdCBpdCBjYW4gcmVzZXQgaXRzIGRpcnR5IHN0YXRlLiBVc2luZyBhbm90aGVyIG9wZXJhdG9yIGxpa2UgYHNvbWVgIG1heSBzaG9ydC1jaXJjdWl0XG4gICAgLy8gcmVtYWluaW5nIGRlZmluaXRpb25zIGFuZCBsZWF2ZSB0aGVtIGluIGFuIHVuY2hlY2tlZCBzdGF0ZS5cblxuICAgIGlmICh0aGlzLl9oZWFkZXJSb3dEZWZzLnJlZHVjZShzdGlja3lDaGVja1JlZHVjZXIsIGZhbHNlKSkge1xuICAgICAgdGhpcy51cGRhdGVTdGlja3lIZWFkZXJSb3dTdHlsZXMoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZm9vdGVyUm93RGVmcy5yZWR1Y2Uoc3RpY2t5Q2hlY2tSZWR1Y2VyLCBmYWxzZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RpY2t5Rm9vdGVyUm93U3R5bGVzKCk7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmZyb20odGhpcy5fY29sdW1uRGVmc0J5TmFtZS52YWx1ZXMoKSkucmVkdWNlKHN0aWNreUNoZWNrUmVkdWNlciwgZmFsc2UpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBzdGlja3kgc3R5bGVyIHRoYXQgd2lsbCBiZSB1c2VkIGZvciBzdGlja3kgcm93cyBhbmQgY29sdW1ucy4gTGlzdGVuc1xuICAgKiBmb3IgZGlyZWN0aW9uYWxpdHkgY2hhbmdlcyBhbmQgcHJvdmlkZXMgdGhlIGxhdGVzdCBkaXJlY3Rpb24gdG8gdGhlIHN0eWxlci4gUmUtYXBwbGllcyBjb2x1bW5cbiAgICogc3RpY2tpbmVzcyB3aGVuIGRpcmVjdGlvbmFsaXR5IGNoYW5nZXMuXG4gICAqL1xuICBwcml2YXRlIF9zZXR1cFN0aWNreVN0eWxlcigpIHtcbiAgICBjb25zdCBkaXJlY3Rpb246IERpcmVjdGlvbiA9IHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA6ICdsdHInO1xuICAgIHRoaXMuX3N0aWNreVN0eWxlciA9IG5ldyBTdGlja3lTdHlsZXIoXG4gICAgICAgIHRoaXMuX2lzTmF0aXZlSHRtbFRhYmxlLCB0aGlzLnN0aWNreUNzc0NsYXNzLCBkaXJlY3Rpb24sIHRoaXMuX2NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLFxuICAgICAgICB0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIsIHRoaXMubmVlZHNQb3NpdGlvblN0aWNreU9uRWxlbWVudCk7XG4gICAgKHRoaXMuX2RpciA/IHRoaXMuX2Rpci5jaGFuZ2UgOiBvYnNlcnZhYmxlT2Y8RGlyZWN0aW9uPigpKVxuICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5fc3RpY2t5U3R5bGVyLmRpcmVjdGlvbiA9IHZhbHVlO1xuICAgICAgdGhpcy51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBGaWx0ZXJzIGRlZmluaXRpb25zIHRoYXQgYmVsb25nIHRvIHRoaXMgdGFibGUgZnJvbSBhIFF1ZXJ5TGlzdC4gKi9cbiAgcHJpdmF0ZSBfZ2V0T3duRGVmczxJIGV4dGVuZHMge190YWJsZT86IGFueX0+KGl0ZW1zOiBRdWVyeUxpc3Q8ST4pOiBJW10ge1xuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoaXRlbSA9PiAhaXRlbS5fdGFibGUgfHwgaXRlbS5fdGFibGUgPT09IHRoaXMpO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgb3IgcmVtb3ZlcyB0aGUgbm8gZGF0YSByb3csIGRlcGVuZGluZyBvbiB3aGV0aGVyIGFueSBkYXRhIGlzIGJlaW5nIHNob3duLiAqL1xuICBwcml2YXRlIF91cGRhdGVOb0RhdGFSb3coKSB7XG4gICAgaWYgKHRoaXMuX25vRGF0YVJvdykge1xuICAgICAgY29uc3Qgc2hvdWxkU2hvdyA9IHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmxlbmd0aCA9PT0gMDtcblxuICAgICAgaWYgKHNob3VsZFNob3cgIT09IHRoaXMuX2lzU2hvd2luZ05vRGF0YVJvdykge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9ub0RhdGFSb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICAgICAgc2hvdWxkU2hvdyA/IGNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fbm9EYXRhUm93LnRlbXBsYXRlUmVmKSA6IGNvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICB0aGlzLl9pc1Nob3dpbmdOb0RhdGFSb3cgPSBzaG91bGRTaG93O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aVRlbXBsYXRlRGF0YVJvd3M6IEJvb2xlYW5JbnB1dDtcbn1cblxuLyoqIFV0aWxpdHkgZnVuY3Rpb24gdGhhdCBnZXRzIGEgbWVyZ2VkIGxpc3Qgb2YgdGhlIGVudHJpZXMgaW4gYW4gYXJyYXkgYW5kIHZhbHVlcyBvZiBhIFNldC4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXlBbmRTZXQ8VD4oYXJyYXk6IFRbXSwgc2V0OiBTZXQ8VD4pOiBUW10ge1xuICByZXR1cm4gYXJyYXkuY29uY2F0KEFycmF5LmZyb20oc2V0KSk7XG59XG4iXX0=