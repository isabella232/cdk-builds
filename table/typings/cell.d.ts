/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, TemplateRef } from '@angular/core';
/** Base interface for a cell definition. Captures a column's cell template definition. */
export interface CellDef {
    template: TemplateRef<any>;
}
/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
export declare class CdkCellDef implements CellDef {
    /** @docs-private */ template: TemplateRef<any>;
    constructor(/** @docs-private */ template: TemplateRef<any>);
}
/**
 * Header cell definition for a CDK table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
export declare class CdkHeaderCellDef implements CellDef {
    /** @docs-private */ template: TemplateRef<any>;
    constructor(/** @docs-private */ template: TemplateRef<any>);
}
/**
 * Footer cell definition for a CDK table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
export declare class CdkFooterCellDef implements CellDef {
    /** @docs-private */ template: TemplateRef<any>;
    constructor(/** @docs-private */ template: TemplateRef<any>);
}
/**
 * Column definition for the CDK table.
 * Defines a set of cells available for a table column.
 */
export declare class CdkColumnDef {
    /** Unique name for this column. */
    name: string;
    _name: string;
    /** @docs-private */
    cell: CdkCellDef;
    /** @docs-private */
    headerCell: CdkHeaderCellDef;
    /** @docs-private */
    footerCell: CdkFooterCellDef;
    /**
     * Transformed version of the column name that can be used as part of a CSS classname. Excludes
     * all non-alphanumeric characters and the special characters '-' and '_'. Any characters that
     * do not match are replaced by the '-' character.
     */
    cssClassFriendlyName: string;
}
/** Base class for the cells. Adds a CSS classname that identifies the column it renders in. */
export declare class BaseCdkCell {
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef);
}
/** Header cell template container that adds the right classes and role. */
export declare class CdkHeaderCell extends BaseCdkCell {
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef);
}
/** Footer cell template container that adds the right classes and role. */
export declare class CdkFooterCell extends BaseCdkCell {
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef);
}
/** Cell template container that adds the right classes and role. */
export declare class CdkCell extends BaseCdkCell {
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef);
}
