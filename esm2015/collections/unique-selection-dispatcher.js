/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
export class UniqueSelectionDispatcher {
    constructor() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    notify(id, name) {
        for (let listener of this._listeners) {
            listener(id, name);
        }
    }
    /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?} Function used to deregister listener
     */
    listen(listener) {
        this._listeners.push(listener);
        return (/**
         * @return {?}
         */
        () => {
            this._listeners = this._listeners.filter((/**
             * @param {?} registered
             * @return {?}
             */
            (registered) => {
                return listener !== registered;
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._listeners = [];
    }
}
UniqueSelectionDispatcher.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ UniqueSelectionDispatcher.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function UniqueSelectionDispatcher_Factory() { return new UniqueSelectionDispatcher(); }, token: UniqueSelectionDispatcher, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    UniqueSelectionDispatcher.prototype._listeners;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcXVlLXNlbGVjdGlvbi1kaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay9jb2xsZWN0aW9ucy91bmlxdWUtc2VsZWN0aW9uLWRpc3BhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7OztBQWdCcEQsTUFBTSxPQUFPLHlCQUF5QjtJQUR0QztRQUVVLGVBQVUsR0FBd0MsRUFBRSxDQUFDO0tBNkI5RDs7Ozs7OztJQXRCQyxNQUFNLENBQUMsRUFBVSxFQUFFLElBQVk7UUFDN0IsS0FBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7Ozs7SUFNRCxNQUFNLENBQUMsUUFBMkM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0I7OztRQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxVQUE2QyxFQUFFLEVBQUU7Z0JBQ3pGLE9BQU8sUUFBUSxLQUFLLFVBQVUsQ0FBQztZQUNqQyxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQztJQUNKLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7O1lBOUJGLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs7Ozs7O0lBRTlCLCtDQUE2RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLy8gVXNlcnMgb2YgdGhlIERpc3BhdGNoZXIgbmV2ZXIgbmVlZCB0byBzZWUgdGhpcyB0eXBlLCBidXQgVHlwZVNjcmlwdCByZXF1aXJlcyBpdCB0byBiZSBleHBvcnRlZC5cbmV4cG9ydCB0eXBlIFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJMaXN0ZW5lciA9IChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG5cbi8qKlxuICogQ2xhc3MgdG8gY29vcmRpbmF0ZSB1bmlxdWUgc2VsZWN0aW9uIGJhc2VkIG9uIG5hbWUuXG4gKiBJbnRlbmRlZCB0byBiZSBjb25zdW1lZCBhcyBhbiBBbmd1bGFyIHNlcnZpY2UuXG4gKiBUaGlzIHNlcnZpY2UgaXMgbmVlZGVkIGJlY2F1c2UgbmF0aXZlIHJhZGlvIGNoYW5nZSBldmVudHMgYXJlIG9ubHkgZmlyZWQgb24gdGhlIGl0ZW0gY3VycmVudGx5XG4gKiBiZWluZyBzZWxlY3RlZCwgYW5kIHdlIHN0aWxsIG5lZWQgdG8gdW5jaGVjayB0aGUgcHJldmlvdXMgc2VsZWN0aW9uLlxuICpcbiAqIFRoaXMgc2VydmljZSBkb2VzIG5vdCAqc3RvcmUqIGFueSBJRHMgYW5kIG5hbWVzIGJlY2F1c2UgdGhleSBtYXkgY2hhbmdlIGF0IGFueSB0aW1lLCBzbyBpdCBpc1xuICogbGVzcyBlcnJvci1wcm9uZSBpZiB0aGV5IGFyZSBzaW1wbHkgcGFzc2VkIHRocm91Z2ggd2hlbiB0aGUgZXZlbnRzIG9jY3VyLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfbGlzdGVuZXJzOiBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyTGlzdGVuZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBOb3RpZnkgb3RoZXIgaXRlbXMgdGhhdCBzZWxlY3Rpb24gZm9yIHRoZSBnaXZlbiBuYW1lIGhhcyBiZWVuIHNldC5cbiAgICogQHBhcmFtIGlkIElEIG9mIHRoZSBpdGVtLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBpdGVtLlxuICAgKi9cbiAgbm90aWZ5KGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGZvciAobGV0IGxpc3RlbmVyIG9mIHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgbGlzdGVuZXIoaWQsIG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gZm9yIGZ1dHVyZSBjaGFuZ2VzIHRvIGl0ZW0gc2VsZWN0aW9uLlxuICAgKiBAcmV0dXJuIEZ1bmN0aW9uIHVzZWQgdG8gZGVyZWdpc3RlciBsaXN0ZW5lclxuICAgKi9cbiAgbGlzdGVuKGxpc3RlbmVyOiBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyTGlzdGVuZXIpOiAoKSA9PiB2b2lkIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5maWx0ZXIoKHJlZ2lzdGVyZWQ6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJMaXN0ZW5lcikgPT4ge1xuICAgICAgICByZXR1cm4gbGlzdGVuZXIgIT09IHJlZ2lzdGVyZWQ7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gIH1cbn1cbiJdfQ==