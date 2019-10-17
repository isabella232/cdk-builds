/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
/**
 * Base class for component harnesses that all component harness authors should extend. This base
 * component harness provides the basic ability to locate element and sub-component harness. It
 * should be inherited when defining user's own harness.
 */
var ComponentHarness = /** @class */ (function () {
    function ComponentHarness(locatorFactory) {
        this.locatorFactory = locatorFactory;
    }
    /** Gets a `Promise` for the `TestElement` representing the host element of the component. */
    ComponentHarness.prototype.host = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.locatorFactory.rootElement];
            });
        });
    };
    /**
     * Gets a `LocatorFactory` for the document root element. This factory can be used to create
     * locators for elements that a component creates outside of its own root element. (e.g. by
     * appending to document.body).
     */
    ComponentHarness.prototype.documentRootLocatorFactory = function () {
        return this.locatorFactory.documentRootLocatorFactory();
    };
    ComponentHarness.prototype.locatorFor = function (arg) {
        return this.locatorFactory.locatorFor(arg);
    };
    ComponentHarness.prototype.locatorForOptional = function (arg) {
        return this.locatorFactory.locatorForOptional(arg);
    };
    ComponentHarness.prototype.locatorForAll = function (arg) {
        return this.locatorFactory.locatorForAll(arg);
    };
    /**
     * Flushes change detection and async tasks.
     * In most cases it should not be necessary to call this manually. However, there may be some edge
     * cases where it is needed to fully flush animation events.
     */
    ComponentHarness.prototype.forceStabilize = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.locatorFactory.forceStabilize()];
            });
        });
    };
    return ComponentHarness;
}());
export { ComponentHarness };
/**
 * A class used to associate a ComponentHarness class with predicates functions that can be used to
 * filter instances of the class.
 */
var HarnessPredicate = /** @class */ (function () {
    function HarnessPredicate(harnessType, options) {
        this.harnessType = harnessType;
        this._predicates = [];
        this._descriptions = [];
        this._addBaseOptions(options);
    }
    /**
     * Checks if a string matches the given pattern.
     * @param s The string to check, or a Promise for the string to check.
     * @param pattern The pattern the string is expected to match. If `pattern` is a string, `s` is
     *   expected to match exactly. If `pattern` is a regex, a partial match is allowed.
     * @return A Promise that resolves to whether the string matches the pattern.
     */
    HarnessPredicate.stringMatches = function (s, pattern) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, s];
                    case 1:
                        s = _a.sent();
                        return [2 /*return*/, typeof pattern === 'string' ? s === pattern : pattern.test(s)];
                }
            });
        });
    };
    /**
     * Adds a predicate function to be run against candidate harnesses.
     * @param description A description of this predicate that may be used in error messages.
     * @param predicate An async predicate function.
     * @return this (for method chaining).
     */
    HarnessPredicate.prototype.add = function (description, predicate) {
        this._descriptions.push(description);
        this._predicates.push(predicate);
        return this;
    };
    /**
     * Adds a predicate function that depends on an option value to be run against candidate
     * harnesses. If the option value is undefined, the predicate will be ignored.
     * @param name The name of the option (may be used in error messages).
     * @param option The option value.
     * @param predicate The predicate function to run if the option value is not undefined.
     * @return this (for method chaining).
     */
    HarnessPredicate.prototype.addOption = function (name, option, predicate) {
        // Add quotes around strings to differentiate them from other values
        var value = typeof option === 'string' ? "\"" + option + "\"" : "" + option;
        if (option !== undefined) {
            this.add(name + " = " + value, function (item) { return predicate(item, option); });
        }
        return this;
    };
    /**
     * Filters a list of harnesses on this predicate.
     * @param harnesses The list of harnesses to filter.
     * @return A list of harnesses that satisfy this predicate.
     */
    HarnessPredicate.prototype.filter = function (harnesses) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var results;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(harnesses.map(function (h) { return _this.evaluate(h); }))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, harnesses.filter(function (_, i) { return results[i]; })];
                }
            });
        });
    };
    /**
     * Evaluates whether the given harness satisfies this predicate.
     * @param harness The harness to check
     * @return A promise that resolves to true if the harness satisfies this predicate,
     *   and resolves to false otherwise.
     */
    HarnessPredicate.prototype.evaluate = function (harness) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var results;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this._predicates.map(function (p) { return p(harness); }))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.reduce(function (combined, current) { return combined && current; }, true)];
                }
            });
        });
    };
    /** Gets a description of this predicate for use in error messages. */
    HarnessPredicate.prototype.getDescription = function () {
        return this._descriptions.join(', ');
    };
    /** Gets the selector used to find candidate elements. */
    HarnessPredicate.prototype.getSelector = function () {
        var _this = this;
        return this._ancestor.split(',')
            .map(function (part) { return (part.trim() + " " + _this.harnessType.hostSelector).trim(); })
            .join(',');
    };
    /** Adds base options common to all harness types. */
    HarnessPredicate.prototype._addBaseOptions = function (options) {
        var _this = this;
        this._ancestor = options.ancestor || '';
        if (this._ancestor) {
            this._descriptions.push("has ancestor matching selector \"" + this._ancestor + "\"");
        }
        var selector = options.selector;
        if (selector !== undefined) {
            this.add("host matches selector \"" + selector + "\"", function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, item.host()];
                        case 1: return [2 /*return*/, (_a.sent()).matchesSelector(selector)];
                    }
                });
            }); });
        }
    };
    return HarnessPredicate;
}());
export { HarnessPredicate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrL3Rlc3RpbmcvY29tcG9uZW50LWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQTBLSDs7OztHQUlHO0FBQ0g7SUFDRSwwQkFBK0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQUcsQ0FBQztJQUVqRSw2RkFBNkY7SUFDdkYsK0JBQUksR0FBVjs7O2dCQUNFLHNCQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFDOzs7S0FDeEM7SUFFRDs7OztPQUlHO0lBQ08scURBQTBCLEdBQXBDO1FBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDMUQsQ0FBQztJQXlCUyxxQ0FBVSxHQUFwQixVQUFxQixHQUFRO1FBQzNCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQXlCUyw2Q0FBa0IsR0FBNUIsVUFBNkIsR0FBUTtRQUNuQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQXdCUyx3Q0FBYSxHQUF2QixVQUF3QixHQUFRO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDYSx5Q0FBYyxHQUE5Qjs7O2dCQUNFLHNCQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLEVBQUM7OztLQUM3QztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQXpHRCxJQXlHQzs7QUFxQkQ7OztHQUdHO0FBQ0g7SUFLRSwwQkFBbUIsV0FBMkMsRUFBRSxPQUEyQjtRQUF4RSxnQkFBVyxHQUFY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Q0FBQyxJQUFJLEVBQUUsRUFBeEQsQ0FBd0QsQ0FBQzthQUNyRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELHFEQUFxRDtJQUM3QywwQ0FBZSxHQUF2QixVQUF3QixPQUEyQjtRQUFuRCxpQkFXQztRQVZDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHNDQUFtQyxJQUFJLENBQUMsU0FBUyxPQUFHLENBQUMsQ0FBQztTQUMvRTtRQUNELElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDbEMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQTBCLFFBQVEsT0FBRyxFQUFFLFVBQU0sSUFBSTs7O2dDQUNoRCxxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7Z0NBQXpCLHNCQUFPLENBQUMsU0FBaUIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBQzs7O2lCQUN0RCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFqR0QsSUFpR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUZXN0RWxlbWVudH0gZnJvbSAnLi90ZXN0LWVsZW1lbnQnO1xuXG4vKiogQW4gYXN5bmMgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvbWlzZSB3aGVuIGNhbGxlZC4gKi9cbmV4cG9ydCB0eXBlIEFzeW5jRmFjdG9yeUZuPFQ+ID0gKCkgPT4gUHJvbWlzZTxUPjtcblxuLyoqIEFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYW4gaXRlbSBhbmQgcmV0dXJucyBhIGJvb2xlYW4gcHJvbWlzZSAqL1xuZXhwb3J0IHR5cGUgQXN5bmNQcmVkaWNhdGU8VD4gPSAoaXRlbTogVCkgPT4gUHJvbWlzZTxib29sZWFuPjtcblxuLyoqIEFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYW4gaXRlbSBhbmQgYW4gb3B0aW9uIHZhbHVlIGFuZCByZXR1cm5zIGEgYm9vbGVhbiBwcm9taXNlLiAqL1xuZXhwb3J0IHR5cGUgQXN5bmNPcHRpb25QcmVkaWNhdGU8VCwgTz4gPSAoaXRlbTogVCwgb3B0aW9uOiBPKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuXG4vKipcbiAqIEludGVyZmFjZSB1c2VkIHRvIGxvYWQgQ29tcG9uZW50SGFybmVzcyBvYmplY3RzLiBUaGlzIGludGVyZmFjZSBpcyB1c2VkIGJ5IHRlc3QgYXV0aG9ycyB0b1xuICogaW5zdGFudGlhdGUgYENvbXBvbmVudEhhcm5lc3NgZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSGFybmVzc0xvYWRlciB7XG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYW4gZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBzZWxlY3RvciB1bmRlciB0aGUgY3VycmVudCBpbnN0YW5jZXMncyByb290IGVsZW1lbnQsXG4gICAqIGFuZCByZXR1cm5zIGEgYEhhcm5lc3NMb2FkZXJgIHJvb3RlZCBhdCB0aGUgbWF0Y2hpbmcgZWxlbWVudC4gSWYgbXVsdGlwbGUgZWxlbWVudHMgbWF0Y2ggdGhlXG4gICAqIHNlbGVjdG9yLCB0aGUgZmlyc3QgaXMgdXNlZC4gSWYgbm8gZWxlbWVudHMgbWF0Y2gsIGFuIGVycm9yIGlzIHRocm93bi5cbiAgICogQHBhcmFtIHNlbGVjdG9yIFRoZSBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgbmV3IGBIYXJuZXNzTG9hZGVyYFxuICAgKiBAcmV0dXJuIEEgYEhhcm5lc3NMb2FkZXJgIHJvb3RlZCBhdCB0aGUgZWxlbWVudCBtYXRjaGluZyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXG4gICAqIEB0aHJvd3MgSWYgYSBtYXRjaGluZyBlbGVtZW50IGNhbid0IGJlIGZvdW5kLlxuICAgKi9cbiAgZ2V0Q2hpbGRMb2FkZXIoc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8SGFybmVzc0xvYWRlcj47XG5cbiAgLyoqXG4gICAqIFNlYXJjaGVzIGZvciBhbGwgZWxlbWVudHMgd2l0aCB0aGUgZ2l2ZW4gc2VsZWN0b3IgdW5kZXIgdGhlIGN1cnJlbnQgaW5zdGFuY2VzJ3Mgcm9vdCBlbGVtZW50LFxuICAgKiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBgSGFybmVzc0xvYWRlcmBzLCBvbmUgZm9yIGVhY2ggbWF0Y2hpbmcgZWxlbWVudCwgcm9vdGVkIGF0IHRoYXRcbiAgICogZWxlbWVudC5cbiAgICogQHBhcmFtIHNlbGVjdG9yIFRoZSBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgbmV3IGBIYXJuZXNzTG9hZGVyYFxuICAgKiBAcmV0dXJuIEEgbGlzdCBvZiBgSGFybmVzc0xvYWRlcmBzLCBvbmUgZm9yIGVhY2ggbWF0Y2hpbmcgZWxlbWVudCwgcm9vdGVkIGF0IHRoYXQgZWxlbWVudC5cbiAgICovXG4gIGdldEFsbENoaWxkTG9hZGVycyhzZWxlY3Rvcjogc3RyaW5nKTogUHJvbWlzZTxIYXJuZXNzTG9hZGVyW10+O1xuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYW4gaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBoYXJuZXNzIHR5cGUgdW5kZXIgdGhlXG4gICAqIGBIYXJuZXNzTG9hZGVyYCdzIHJvb3QgZWxlbWVudCwgYW5kIHJldHVybnMgYSBgQ29tcG9uZW50SGFybmVzc2AgZm9yIHRoYXQgaW5zdGFuY2UuIElmIG11bHRpcGxlXG4gICAqIG1hdGNoaW5nIGNvbXBvbmVudHMgYXJlIGZvdW5kLCBhIGhhcm5lc3MgZm9yIHRoZSBmaXJzdCBvbmUgaXMgcmV0dXJuZWQuIElmIG5vIG1hdGNoaW5nXG4gICAqIGNvbXBvbmVudCBpcyBmb3VuZCwgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgKiBAcGFyYW0gaGFybmVzc1R5cGUgVGhlIHR5cGUgb2YgaGFybmVzcyB0byBjcmVhdGVcbiAgICogQHJldHVybiBBbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gaGFybmVzcyB0eXBlXG4gICAqIEB0aHJvd3MgSWYgYSBtYXRjaGluZyBjb21wb25lbnQgaW5zdGFuY2UgY2FuJ3QgYmUgZm91bmQuXG4gICAqL1xuICBnZXRIYXJuZXNzPFQgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzPihcbiAgICAgIGhhcm5lc3NUeXBlOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4gfCBIYXJuZXNzUHJlZGljYXRlPFQ+KTogUHJvbWlzZTxUPjtcblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGNvbXBvbmVudCBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBoYXJuZXNzIHR5cGUgdW5kZXIgdGhlXG4gICAqIGBIYXJuZXNzTG9hZGVyYCdzIHJvb3QgZWxlbWVudCwgYW5kIHJldHVybnMgYSBsaXN0IGBDb21wb25lbnRIYXJuZXNzYCBmb3IgZWFjaCBpbnN0YW5jZS5cbiAgICogQHBhcmFtIGhhcm5lc3NUeXBlIFRoZSB0eXBlIG9mIGhhcm5lc3MgdG8gY3JlYXRlXG4gICAqIEByZXR1cm4gQSBsaXN0IGluc3RhbmNlcyBvZiB0aGUgZ2l2ZW4gaGFybmVzcyB0eXBlLlxuICAgKi9cbiAgZ2V0QWxsSGFybmVzc2VzPFQgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzPihcbiAgICAgIGhhcm5lc3NUeXBlOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4gfCBIYXJuZXNzUHJlZGljYXRlPFQ+KTogUHJvbWlzZTxUW10+O1xufVxuXG4vKipcbiAqIEludGVyZmFjZSB1c2VkIHRvIGNyZWF0ZSBhc3luY2hyb25vdXMgbG9jYXRvciBmdW5jdGlvbnMgdXNlZCBmaW5kIGVsZW1lbnRzIGFuZCBjb21wb25lbnRcbiAqIGhhcm5lc3Nlcy4gVGhpcyBpbnRlcmZhY2UgaXMgdXNlZCBieSBgQ29tcG9uZW50SGFybmVzc2AgYXV0aG9ycyB0byBjcmVhdGUgbG9jYXRvciBmdW5jdGlvbnMgZm9yXG4gKiB0aGVpciBgQ29tcG9uZW50SGFyZW5zc2Agc3ViY2xhc3MuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYXRvckZhY3Rvcnkge1xuICAvKiogR2V0cyBhIGxvY2F0b3IgZmFjdG9yeSByb290ZWQgYXQgdGhlIGRvY3VtZW50IHJvb3QuICovXG4gIGRvY3VtZW50Um9vdExvY2F0b3JGYWN0b3J5KCk6IExvY2F0b3JGYWN0b3J5O1xuXG4gIC8qKiBUaGUgcm9vdCBlbGVtZW50IG9mIHRoaXMgYExvY2F0b3JGYWN0b3J5YCBhcyBhIGBUZXN0RWxlbWVudGAuICovXG4gIHJvb3RFbGVtZW50OiBUZXN0RWxlbWVudDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhc3luY2hyb25vdXMgbG9jYXRvciBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgZWxlbWVudHMgd2l0aCB0aGUgZ2l2ZW5cbiAgICogc2VsZWN0b3IgdW5kZXIgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGlzIGBMb2NhdG9yRmFjdG9yeWAuIFdoZW4gdGhlIHJlc3VsdGluZyBsb2NhdG9yIGZ1bmN0aW9uXG4gICAqIGlzIGludm9rZWQsIGlmIG11bHRpcGxlIG1hdGNoaW5nIGVsZW1lbnRzIGFyZSBmb3VuZCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgcmV0dXJuZWQuIElmIG5vXG4gICAqIGVsZW1lbnRzIGFyZSBmb3VuZCwgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgKiBAcGFyYW0gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgZWxlbWVudCB0aGF0IHRoZSBsb2NhdG9yIGZ1bmN0aW9uIHNob3VsZCBzZWFyY2ggZm9yLlxuICAgKiBAcmV0dXJuIEFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgc2VhcmNoZXMgZm9yIGVsZW1lbnRzIHdpdGggdGhlIGdpdmVuIHNlbGVjdG9yLFxuICAgKiAgICAgYW5kIGVpdGhlciBmaW5kcyBvbmUgb3IgdGhyb3dzIGFuIGVycm9yXG4gICAqL1xuICBsb2NhdG9yRm9yKHNlbGVjdG9yOiBzdHJpbmcpOiBBc3luY0ZhY3RvcnlGbjxUZXN0RWxlbWVudD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGxvY2F0b3IgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBmaW5kIGEgYENvbXBvbmVudEhhcm5lc3NgIGZvciBhXG4gICAqIGNvbXBvbmVudCBtYXRjaGluZyB0aGUgZ2l2ZW4gaGFybmVzcyB0eXBlIHVuZGVyIHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBgTG9jYXRvckZhY3RvcnlgLlxuICAgKiBXaGVuIHRoZSByZXN1bHRpbmcgbG9jYXRvciBmdW5jdGlvbiBpcyBpbnZva2VkLCBpZiBtdWx0aXBsZSBtYXRjaGluZyBjb21wb25lbnRzIGFyZSBmb3VuZCwgYVxuICAgKiBoYXJuZXNzIGZvciB0aGUgZmlyc3Qgb25lIGlzIHJldHVybmVkLiBJZiBubyBjb21wb25lbnRzIGFyZSBmb3VuZCwgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgKiBAcGFyYW0gaGFybmVzc1R5cGUgVGhlIHR5cGUgb2YgaGFybmVzcyB0byBzZWFyY2ggZm9yLlxuICAgKiBAcmV0dXJuIEFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgc2VhcmNoZXMgY29tcG9uZW50cyBtYXRjaGluZyB0aGUgZ2l2ZW4gaGFybmVzc1xuICAgKiAgICAgdHlwZSwgYW5kIGVpdGhlciByZXR1cm5zIGEgYENvbXBvbmVudEhhcm5lc3NgIGZvciB0aGUgY29tcG9uZW50LCBvciB0aHJvd3MgYW4gZXJyb3IuXG4gICAqL1xuICBsb2NhdG9yRm9yPFQgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzPihcbiAgICAgIGhhcm5lc3NUeXBlOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4gfCBIYXJuZXNzUHJlZGljYXRlPFQ+KTogQXN5bmNGYWN0b3J5Rm48VD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGxvY2F0b3IgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGVsZW1lbnRzIHdpdGggdGhlIGdpdmVuXG4gICAqIHNlbGVjdG9yIHVuZGVyIHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBgTG9jYXRvckZhY3RvcnlgLiBXaGVuIHRoZSByZXN1bHRpbmcgbG9jYXRvciBmdW5jdGlvblxuICAgKiBpcyBpbnZva2VkLCBpZiBtdWx0aXBsZSBtYXRjaGluZyBlbGVtZW50cyBhcmUgZm91bmQsIHRoZSBmaXJzdCBlbGVtZW50IGlzIHJldHVybmVkLiBJZiBub1xuICAgKiBlbGVtZW50cyBhcmUgZm91bmQsIG51bGwgaXMgcmV0dXJuZWQuXG4gICAqIEBwYXJhbSBzZWxlY3RvciBUaGUgc2VsZWN0b3IgZm9yIHRoZSBlbGVtZW50IHRoYXQgdGhlIGxvY2F0b3IgZnVuY3Rpb24gc2hvdWxkIHNlYXJjaCBmb3IuXG4gICAqIEByZXR1cm4gQW4gYXN5bmNocm9ub3VzIGxvY2F0b3IgZnVuY3Rpb24gdGhhdCBzZWFyY2hlcyBmb3IgZWxlbWVudHMgd2l0aCB0aGUgZ2l2ZW4gc2VsZWN0b3IsXG4gICAqICAgICBhbmQgZWl0aGVyIGZpbmRzIG9uZSBvciByZXR1cm5zIG51bGwuXG4gICAqL1xuICBsb2NhdG9yRm9yT3B0aW9uYWwoc2VsZWN0b3I6IHN0cmluZyk6IEFzeW5jRmFjdG9yeUZuPFRlc3RFbGVtZW50IHwgbnVsbD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGxvY2F0b3IgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBmaW5kIGEgYENvbXBvbmVudEhhcm5lc3NgIGZvciBhXG4gICAqIGNvbXBvbmVudCBtYXRjaGluZyB0aGUgZ2l2ZW4gaGFybmVzcyB0eXBlIHVuZGVyIHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBgTG9jYXRvckZhY3RvcnlgLlxuICAgKiBXaGVuIHRoZSByZXN1bHRpbmcgbG9jYXRvciBmdW5jdGlvbiBpcyBpbnZva2VkLCBpZiBtdWx0aXBsZSBtYXRjaGluZyBjb21wb25lbnRzIGFyZSBmb3VuZCwgYVxuICAgKiBoYXJuZXNzIGZvciB0aGUgZmlyc3Qgb25lIGlzIHJldHVybmVkLiBJZiBubyBjb21wb25lbnRzIGFyZSBmb3VuZCwgbnVsbCBpcyByZXR1cm5lZC5cbiAgICogQHBhcmFtIGhhcm5lc3NUeXBlIFRoZSB0eXBlIG9mIGhhcm5lc3MgdG8gc2VhcmNoIGZvci5cbiAgICogQHJldHVybiBBbiBhc3luY2hyb25vdXMgbG9jYXRvciBmdW5jdGlvbiB0aGF0IHNlYXJjaGVzIGNvbXBvbmVudHMgbWF0Y2hpbmcgdGhlIGdpdmVuIGhhcm5lc3NcbiAgICogICAgIHR5cGUsIGFuZCBlaXRoZXIgcmV0dXJucyBhIGBDb21wb25lbnRIYXJuZXNzYCBmb3IgdGhlIGNvbXBvbmVudCwgb3IgbnVsbCBpZiBub25lIGlzIGZvdW5kLlxuICAgKi9cbiAgbG9jYXRvckZvck9wdGlvbmFsPFQgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzPihcbiAgICAgIGhhcm5lc3NUeXBlOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4gfCBIYXJuZXNzUHJlZGljYXRlPFQ+KTogQXN5bmNGYWN0b3J5Rm48VCB8IG51bGw+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGxpc3Qgb2YgZWxlbWVudHMgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gc2VsZWN0b3IgdW5kZXIgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGlzIGBMb2NhdG9yRmFjdG9yeWAuIFdoZW4gdGhlIHJlc3VsdGluZyBsb2NhdG9yXG4gICAqIGZ1bmN0aW9uIGlzIGludm9rZWQsIGEgbGlzdCBvZiBtYXRjaGluZyBlbGVtZW50cyBpcyByZXR1cm5lZC5cbiAgICogQHBhcmFtIHNlbGVjdG9yIFRoZSBzZWxlY3RvciBmb3IgdGhlIGVsZW1lbnQgdGhhdCB0aGUgbG9jYXRvciBmdW5jdGlvbiBzaG91bGQgc2VhcmNoIGZvci5cbiAgICogQHJldHVybiBBbiBhc3luY2hyb25vdXMgbG9jYXRvciBmdW5jdGlvbiB0aGF0IHNlYXJjaGVzIGZvciBlbGVtZW50cyB3aXRoIHRoZSBnaXZlbiBzZWxlY3RvcixcbiAgICogICAgIGFuZCBlaXRoZXIgZmluZHMgb25lIG9yIHRocm93cyBhbiBlcnJvclxuICAgKi9cbiAgbG9jYXRvckZvckFsbChzZWxlY3Rvcjogc3RyaW5nKTogQXN5bmNGYWN0b3J5Rm48VGVzdEVsZW1lbnRbXT47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGxvY2F0b3IgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBmaW5kIGEgbGlzdCBvZlxuICAgKiBgQ29tcG9uZW50SGFybmVzc2BlcyBmb3IgYWxsIGNvbXBvbmVudHMgbWF0Y2hpbmcgdGhlIGdpdmVuIGhhcm5lc3MgdHlwZSB1bmRlciB0aGUgcm9vdCBlbGVtZW50XG4gICAqIG9mIHRoaXMgYExvY2F0b3JGYWN0b3J5YC4gV2hlbiB0aGUgcmVzdWx0aW5nIGxvY2F0b3IgZnVuY3Rpb24gaXMgaW52b2tlZCwgYSBsaXN0IG9mXG4gICAqIGBDb21wb25lbnRIYXJuZXNzYGVzIGZvciB0aGUgbWF0Y2hpbmcgY29tcG9uZW50cyBpcyByZXR1cm5lZC5cbiAgICogQHBhcmFtIGhhcm5lc3NUeXBlIFRoZSB0eXBlIG9mIGhhcm5lc3MgdG8gc2VhcmNoIGZvci5cbiAgICogQHJldHVybiBBbiBhc3luY2hyb25vdXMgbG9jYXRvciBmdW5jdGlvbiB0aGF0IHNlYXJjaGVzIGNvbXBvbmVudHMgbWF0Y2hpbmcgdGhlIGdpdmVuIGhhcm5lc3NcbiAgICogICAgIHR5cGUsIGFuZCByZXR1cm5zIGEgbGlzdCBvZiBgQ29tcG9uZW50SGFybmVzc2Blcy5cbiAgICovXG4gIGxvY2F0b3JGb3JBbGw8VCBleHRlbmRzIENvbXBvbmVudEhhcm5lc3M+KFxuICAgICAgaGFybmVzc1R5cGU6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxUPiB8IEhhcm5lc3NQcmVkaWNhdGU8VD4pOiBBc3luY0ZhY3RvcnlGbjxUW10+O1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NMb2FkZXJgIGluc3RhbmNlIGZvciBhbiBlbGVtZW50IHVuZGVyIHRoZSByb290IG9mIHRoaXMgYExvY2F0b3JGYWN0b3J5YC5cbiAgICogQHBhcmFtIHNlbGVjdG9yIFRoZSBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiBBIGBIYXJuZXNzTG9hZGVyYCByb290ZWQgYXQgdGhlIGZpcnN0IGVsZW1lbnQgbWF0Y2hpbmcgdGhlIGdpdmVuIHNlbGVjdG9yLlxuICAgKiBAdGhyb3dzIElmIG5vIG1hdGNoaW5nIGVsZW1lbnQgaXMgZm91bmQgZm9yIHRoZSBnaXZlbiBzZWxlY3Rvci5cbiAgICovXG4gIGhhcm5lc3NMb2FkZXJGb3Ioc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8SGFybmVzc0xvYWRlcj47XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc0xvYWRlcmAgaW5zdGFuY2UgZm9yIGFuIGVsZW1lbnQgdW5kZXIgdGhlIHJvb3Qgb2YgdGhpcyBgTG9jYXRvckZhY3RvcnlgXG4gICAqIEBwYXJhbSBzZWxlY3RvciBUaGUgc2VsZWN0b3IgZm9yIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEByZXR1cm4gQSBgSGFybmVzc0xvYWRlcmAgcm9vdGVkIGF0IHRoZSBmaXJzdCBlbGVtZW50IG1hdGNoaW5nIHRoZSBnaXZlbiBzZWxlY3Rvciwgb3IgbnVsbCBpZlxuICAgKiAgICAgbm8gbWF0Y2hpbmcgZWxlbWVudCBpcyBmb3VuZC5cbiAgICovXG4gIGhhcm5lc3NMb2FkZXJGb3JPcHRpb25hbChzZWxlY3Rvcjogc3RyaW5nKTogUHJvbWlzZTxIYXJuZXNzTG9hZGVyIHwgbnVsbD47XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIGBIYXJuZXNzTG9hZGVyYCBpbnN0YW5jZXMsIG9uZSBmb3IgZWFjaCBtYXRjaGluZyBlbGVtZW50LlxuICAgKiBAcGFyYW0gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIEEgbGlzdCBvZiBgSGFybmVzc0xvYWRlcmAsIG9uZSByb290ZWQgYXQgZWFjaCBlbGVtZW50IG1hdGNoaW5nIHRoZSBnaXZlbiBzZWxlY3Rvci5cbiAgICovXG4gIGhhcm5lc3NMb2FkZXJGb3JBbGwoc2VsZWN0b3I6IHN0cmluZyk6IFByb21pc2U8SGFybmVzc0xvYWRlcltdPjtcblxuICAvKipcbiAgICogRmx1c2hlcyBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCBhc3luYyB0YXNrcy5cbiAgICogSW4gbW9zdCBjYXNlcyBpdCBzaG91bGQgbm90IGJlIG5lY2Vzc2FyeSB0byBjYWxsIHRoaXMgbWFudWFsbHkuIEhvd2V2ZXIsIHRoZXJlIG1heSBiZSBzb21lIGVkZ2VcbiAgICogY2FzZXMgd2hlcmUgaXQgaXMgbmVlZGVkIHRvIGZ1bGx5IGZsdXNoIGFuaW1hdGlvbiBldmVudHMuXG4gICAqL1xuICBmb3JjZVN0YWJpbGl6ZSgpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGNvbXBvbmVudCBoYXJuZXNzZXMgdGhhdCBhbGwgY29tcG9uZW50IGhhcm5lc3MgYXV0aG9ycyBzaG91bGQgZXh0ZW5kLiBUaGlzIGJhc2VcbiAqIGNvbXBvbmVudCBoYXJuZXNzIHByb3ZpZGVzIHRoZSBiYXNpYyBhYmlsaXR5IHRvIGxvY2F0ZSBlbGVtZW50IGFuZCBzdWItY29tcG9uZW50IGhhcm5lc3MuIEl0XG4gKiBzaG91bGQgYmUgaW5oZXJpdGVkIHdoZW4gZGVmaW5pbmcgdXNlcidzIG93biBoYXJuZXNzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50SGFybmVzcyB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBsb2NhdG9yRmFjdG9yeTogTG9jYXRvckZhY3RvcnkpIHt9XG5cbiAgLyoqIEdldHMgYSBgUHJvbWlzZWAgZm9yIHRoZSBgVGVzdEVsZW1lbnRgIHJlcHJlc2VudGluZyB0aGUgaG9zdCBlbGVtZW50IG9mIHRoZSBjb21wb25lbnQuICovXG4gIGFzeW5jIGhvc3QoKTogUHJvbWlzZTxUZXN0RWxlbWVudD4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGYWN0b3J5LnJvb3RFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgTG9jYXRvckZhY3RvcnlgIGZvciB0aGUgZG9jdW1lbnQgcm9vdCBlbGVtZW50LiBUaGlzIGZhY3RvcnkgY2FuIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqIGxvY2F0b3JzIGZvciBlbGVtZW50cyB0aGF0IGEgY29tcG9uZW50IGNyZWF0ZXMgb3V0c2lkZSBvZiBpdHMgb3duIHJvb3QgZWxlbWVudC4gKGUuZy4gYnlcbiAgICogYXBwZW5kaW5nIHRvIGRvY3VtZW50LmJvZHkpLlxuICAgKi9cbiAgcHJvdGVjdGVkIGRvY3VtZW50Um9vdExvY2F0b3JGYWN0b3J5KCk6IExvY2F0b3JGYWN0b3J5IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRmFjdG9yeS5kb2N1bWVudFJvb3RMb2NhdG9yRmFjdG9yeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGxvY2F0b3IgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGVsZW1lbnRzIHdpdGggdGhlIGdpdmVuXG4gICAqIHNlbGVjdG9yIHVuZGVyIHRoZSBob3N0IGVsZW1lbnQgb2YgdGhpcyBgQ29tcG9uZW50SGFybmVzc2AuIFdoZW4gdGhlIHJlc3VsdGluZyBsb2NhdG9yIGZ1bmN0aW9uXG4gICAqIGlzIGludm9rZWQsIGlmIG11bHRpcGxlIG1hdGNoaW5nIGVsZW1lbnRzIGFyZSBmb3VuZCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgcmV0dXJuZWQuIElmIG5vXG4gICAqIGVsZW1lbnRzIGFyZSBmb3VuZCwgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgKiBAcGFyYW0gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgZWxlbWVudCB0aGF0IHRoZSBsb2NhdG9yIGZ1bmN0aW9uIHNob3VsZCBzZWFyY2ggZm9yLlxuICAgKiBAcmV0dXJuIEFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgc2VhcmNoZXMgZm9yIGVsZW1lbnRzIHdpdGggdGhlIGdpdmVuIHNlbGVjdG9yLFxuICAgKiAgICAgYW5kIGVpdGhlciBmaW5kcyBvbmUgb3IgdGhyb3dzIGFuIGVycm9yXG4gICAqL1xuICBwcm90ZWN0ZWQgbG9jYXRvckZvcihzZWxlY3Rvcjogc3RyaW5nKTogQXN5bmNGYWN0b3J5Rm48VGVzdEVsZW1lbnQ+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gZmluZCBhIGBDb21wb25lbnRIYXJuZXNzYCBmb3IgYVxuICAgKiBjb21wb25lbnQgbWF0Y2hpbmcgdGhlIGdpdmVuIGhhcm5lc3MgdHlwZSB1bmRlciB0aGUgaG9zdCBlbGVtZW50IG9mIHRoaXMgYENvbXBvbmVudEhhcm5lc3NgLlxuICAgKiBXaGVuIHRoZSByZXN1bHRpbmcgbG9jYXRvciBmdW5jdGlvbiBpcyBpbnZva2VkLCBpZiBtdWx0aXBsZSBtYXRjaGluZyBjb21wb25lbnRzIGFyZSBmb3VuZCwgYVxuICAgKiBoYXJuZXNzIGZvciB0aGUgZmlyc3Qgb25lIGlzIHJldHVybmVkLiBJZiBubyBjb21wb25lbnRzIGFyZSBmb3VuZCwgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgKiBAcGFyYW0gaGFybmVzc1R5cGUgVGhlIHR5cGUgb2YgaGFybmVzcyB0byBzZWFyY2ggZm9yLlxuICAgKiBAcmV0dXJuIEFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgc2VhcmNoZXMgY29tcG9uZW50cyBtYXRjaGluZyB0aGUgZ2l2ZW4gaGFybmVzc1xuICAgKiAgICAgdHlwZSwgYW5kIGVpdGhlciByZXR1cm5zIGEgYENvbXBvbmVudEhhcm5lc3NgIGZvciB0aGUgY29tcG9uZW50LCBvciB0aHJvd3MgYW4gZXJyb3IuXG4gICAqL1xuICBwcm90ZWN0ZWQgbG9jYXRvckZvcjxUIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcz4oXG4gICAgICBoYXJuZXNzVHlwZTogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFQ+IHwgSGFybmVzc1ByZWRpY2F0ZTxUPik6IEFzeW5jRmFjdG9yeUZuPFQ+O1xuXG4gIHByb3RlY3RlZCBsb2NhdG9yRm9yKGFyZzogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZhY3RvcnkubG9jYXRvckZvcihhcmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGxvY2F0b3IgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGVsZW1lbnRzIHdpdGggdGhlIGdpdmVuXG4gICAqIHNlbGVjdG9yIHVuZGVyIHRoZSBob3N0IGVsZW1lbnQgb2YgdGhpcyBgQ29tcG9uZW50SGFybmVzc2AuIFdoZW4gdGhlIHJlc3VsdGluZyBsb2NhdG9yIGZ1bmN0aW9uXG4gICAqIGlzIGludm9rZWQsIGlmIG11bHRpcGxlIG1hdGNoaW5nIGVsZW1lbnRzIGFyZSBmb3VuZCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgcmV0dXJuZWQuIElmIG5vXG4gICAqIGVsZW1lbnRzIGFyZSBmb3VuZCwgbnVsbCBpcyByZXR1cm5lZC5cbiAgICogQHBhcmFtIHNlbGVjdG9yIFRoZSBzZWxlY3RvciBmb3IgdGhlIGVsZW1lbnQgdGhhdCB0aGUgbG9jYXRvciBmdW5jdGlvbiBzaG91bGQgc2VhcmNoIGZvci5cbiAgICogQHJldHVybiBBbiBhc3luY2hyb25vdXMgbG9jYXRvciBmdW5jdGlvbiB0aGF0IHNlYXJjaGVzIGZvciBlbGVtZW50cyB3aXRoIHRoZSBnaXZlbiBzZWxlY3RvcixcbiAgICogICAgIGFuZCBlaXRoZXIgZmluZHMgb25lIG9yIHJldHVybnMgbnVsbC5cbiAgICovXG4gIHByb3RlY3RlZCBsb2NhdG9yRm9yT3B0aW9uYWwoc2VsZWN0b3I6IHN0cmluZyk6IEFzeW5jRmFjdG9yeUZuPFRlc3RFbGVtZW50IHwgbnVsbD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGxvY2F0b3IgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBmaW5kIGEgYENvbXBvbmVudEhhcm5lc3NgIGZvciBhXG4gICAqIGNvbXBvbmVudCBtYXRjaGluZyB0aGUgZ2l2ZW4gaGFybmVzcyB0eXBlIHVuZGVyIHRoZSBob3N0IGVsZW1lbnQgb2YgdGhpcyBgQ29tcG9uZW50SGFybmVzc2AuXG4gICAqIFdoZW4gdGhlIHJlc3VsdGluZyBsb2NhdG9yIGZ1bmN0aW9uIGlzIGludm9rZWQsIGlmIG11bHRpcGxlIG1hdGNoaW5nIGNvbXBvbmVudHMgYXJlIGZvdW5kLCBhXG4gICAqIGhhcm5lc3MgZm9yIHRoZSBmaXJzdCBvbmUgaXMgcmV0dXJuZWQuIElmIG5vIGNvbXBvbmVudHMgYXJlIGZvdW5kLCBudWxsIGlzIHJldHVybmVkLlxuICAgKiBAcGFyYW0gaGFybmVzc1R5cGUgVGhlIHR5cGUgb2YgaGFybmVzcyB0byBzZWFyY2ggZm9yLlxuICAgKiBAcmV0dXJuIEFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgc2VhcmNoZXMgY29tcG9uZW50cyBtYXRjaGluZyB0aGUgZ2l2ZW4gaGFybmVzc1xuICAgKiAgICAgdHlwZSwgYW5kIGVpdGhlciByZXR1cm5zIGEgYENvbXBvbmVudEhhcm5lc3NgIGZvciB0aGUgY29tcG9uZW50LCBvciBudWxsIGlmIG5vbmUgaXMgZm91bmQuXG4gICAqL1xuICBwcm90ZWN0ZWQgbG9jYXRvckZvck9wdGlvbmFsPFQgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzPihcbiAgICAgIGhhcm5lc3NUeXBlOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4gfCBIYXJuZXNzUHJlZGljYXRlPFQ+KTogQXN5bmNGYWN0b3J5Rm48VCB8IG51bGw+O1xuXG4gIHByb3RlY3RlZCBsb2NhdG9yRm9yT3B0aW9uYWwoYXJnOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRmFjdG9yeS5sb2NhdG9yRm9yT3B0aW9uYWwoYXJnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIGxpc3Qgb2YgZWxlbWVudHMgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gc2VsZWN0b3IgdW5kZXIgdGhlIGhvc3QgZWxlbWVudCBvZiB0aGlzIGBDb21wb25lbnRIYXJuZXNzYC4gV2hlbiB0aGUgcmVzdWx0aW5nXG4gICAqIGxvY2F0b3IgZnVuY3Rpb24gaXMgaW52b2tlZCwgYSBsaXN0IG9mIG1hdGNoaW5nIGVsZW1lbnRzIGlzIHJldHVybmVkLlxuICAgKiBAcGFyYW0gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgZWxlbWVudCB0aGF0IHRoZSBsb2NhdG9yIGZ1bmN0aW9uIHNob3VsZCBzZWFyY2ggZm9yLlxuICAgKiBAcmV0dXJuIEFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgc2VhcmNoZXMgZm9yIGVsZW1lbnRzIHdpdGggdGhlIGdpdmVuIHNlbGVjdG9yLFxuICAgKiAgICAgYW5kIGVpdGhlciBmaW5kcyBvbmUgb3IgdGhyb3dzIGFuIGVycm9yXG4gICAqL1xuICBwcm90ZWN0ZWQgbG9jYXRvckZvckFsbChzZWxlY3Rvcjogc3RyaW5nKTogQXN5bmNGYWN0b3J5Rm48VGVzdEVsZW1lbnRbXT47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIGxvY2F0b3IgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBmaW5kIGEgbGlzdCBvZlxuICAgKiBgQ29tcG9uZW50SGFybmVzc2BlcyBmb3IgYWxsIGNvbXBvbmVudHMgbWF0Y2hpbmcgdGhlIGdpdmVuIGhhcm5lc3MgdHlwZSB1bmRlciB0aGUgaG9zdCBlbGVtZW50XG4gICAqIG9mIHRoaXMgYENvbXBvbmVudEhhcm5lc3NgLiBXaGVuIHRoZSByZXN1bHRpbmcgbG9jYXRvciBmdW5jdGlvbiBpcyBpbnZva2VkLCBhIGxpc3Qgb2ZcbiAgICogYENvbXBvbmVudEhhcm5lc3NgZXMgZm9yIHRoZSBtYXRjaGluZyBjb21wb25lbnRzIGlzIHJldHVybmVkLlxuICAgKiBAcGFyYW0gaGFybmVzc1R5cGUgVGhlIHR5cGUgb2YgaGFybmVzcyB0byBzZWFyY2ggZm9yLlxuICAgKiBAcmV0dXJuIEFuIGFzeW5jaHJvbm91cyBsb2NhdG9yIGZ1bmN0aW9uIHRoYXQgc2VhcmNoZXMgY29tcG9uZW50cyBtYXRjaGluZyB0aGUgZ2l2ZW4gaGFybmVzc1xuICAgKiAgICAgdHlwZSwgYW5kIHJldHVybnMgYSBsaXN0IG9mIGBDb21wb25lbnRIYXJuZXNzYGVzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGxvY2F0b3JGb3JBbGw8VCBleHRlbmRzIENvbXBvbmVudEhhcm5lc3M+KFxuICAgICAgaGFybmVzc1R5cGU6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxUPiB8IEhhcm5lc3NQcmVkaWNhdGU8VD4pOiBBc3luY0ZhY3RvcnlGbjxUW10+O1xuXG4gIHByb3RlY3RlZCBsb2NhdG9yRm9yQWxsKGFyZzogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZhY3RvcnkubG9jYXRvckZvckFsbChhcmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsdXNoZXMgY2hhbmdlIGRldGVjdGlvbiBhbmQgYXN5bmMgdGFza3MuXG4gICAqIEluIG1vc3QgY2FzZXMgaXQgc2hvdWxkIG5vdCBiZSBuZWNlc3NhcnkgdG8gY2FsbCB0aGlzIG1hbnVhbGx5LiBIb3dldmVyLCB0aGVyZSBtYXkgYmUgc29tZSBlZGdlXG4gICAqIGNhc2VzIHdoZXJlIGl0IGlzIG5lZWRlZCB0byBmdWxseSBmbHVzaCBhbmltYXRpb24gZXZlbnRzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGZvcmNlU3RhYmlsaXplKCkge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGYWN0b3J5LmZvcmNlU3RhYmlsaXplKCk7XG4gIH1cbn1cblxuLyoqIENvbnN0cnVjdG9yIGZvciBhIENvbXBvbmVudEhhcm5lc3Mgc3ViY2xhc3MuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxUIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcz4ge1xuICBuZXcobG9jYXRvckZhY3Rvcnk6IExvY2F0b3JGYWN0b3J5KTogVDtcblxuICAvKipcbiAgICogYENvbXBvbmVudEhhcm5lc3NgIHN1YmNsYXNzZXMgbXVzdCBzcGVjaWZ5IGEgc3RhdGljIGBob3N0U2VsZWN0b3JgIHByb3BlcnR5IHRoYXQgaXMgdXNlZCB0b1xuICAgKiBmaW5kIHRoZSBob3N0IGVsZW1lbnQgZm9yIHRoZSBjb3JyZXNwb25kaW5nIGNvbXBvbmVudC4gVGhpcyBwcm9wZXJ0eSBzaG91bGQgbWF0Y2ggdGhlIHNlbGVjdG9yXG4gICAqIGZvciB0aGUgQW5ndWxhciBjb21wb25lbnQuXG4gICAqL1xuICBob3N0U2VsZWN0b3I6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlSGFybmVzc0ZpbHRlcnMge1xuICAvKiogT25seSBmaW5kIGNvbXBvbmVudCBpbnN0YW5jZXMgd2hvc2UgaG9zdCBlbGVtZW50IG1hdGNoZXMgdGhlIGdpdmVuIHNlbGVjdG9yLiAqL1xuICBzZWxlY3Rvcj86IHN0cmluZztcbiAgLyoqIE9ubHkgZmluZCBjb21wb25lbnQgaW5zdGFuY2VzIHRoYXQgYXJlIG5lc3RlZCB1bmRlciBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIHNlbGVjdG9yLiAqL1xuICBhbmNlc3Rvcj86IHN0cmluZztcbn1cblxuLyoqXG4gKiBBIGNsYXNzIHVzZWQgdG8gYXNzb2NpYXRlIGEgQ29tcG9uZW50SGFybmVzcyBjbGFzcyB3aXRoIHByZWRpY2F0ZXMgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG9cbiAqIGZpbHRlciBpbnN0YW5jZXMgb2YgdGhlIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgSGFybmVzc1ByZWRpY2F0ZTxUIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcz4ge1xuICBwcml2YXRlIF9wcmVkaWNhdGVzOiBBc3luY1ByZWRpY2F0ZTxUPltdID0gW107XG4gIHByaXZhdGUgX2Rlc2NyaXB0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBfYW5jZXN0b3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaGFybmVzc1R5cGU6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxUPiwgb3B0aW9uczogQmFzZUhhcm5lc3NGaWx0ZXJzKSB7XG4gICAgdGhpcy5fYWRkQmFzZU9wdGlvbnMob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgc3RyaW5nIG1hdGNoZXMgdGhlIGdpdmVuIHBhdHRlcm4uXG4gICAqIEBwYXJhbSBzIFRoZSBzdHJpbmcgdG8gY2hlY2ssIG9yIGEgUHJvbWlzZSBmb3IgdGhlIHN0cmluZyB0byBjaGVjay5cbiAgICogQHBhcmFtIHBhdHRlcm4gVGhlIHBhdHRlcm4gdGhlIHN0cmluZyBpcyBleHBlY3RlZCB0byBtYXRjaC4gSWYgYHBhdHRlcm5gIGlzIGEgc3RyaW5nLCBgc2AgaXNcbiAgICogICBleHBlY3RlZCB0byBtYXRjaCBleGFjdGx5LiBJZiBgcGF0dGVybmAgaXMgYSByZWdleCwgYSBwYXJ0aWFsIG1hdGNoIGlzIGFsbG93ZWQuXG4gICAqIEByZXR1cm4gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gd2hldGhlciB0aGUgc3RyaW5nIG1hdGNoZXMgdGhlIHBhdHRlcm4uXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgc3RyaW5nTWF0Y2hlcyhzOiBzdHJpbmcgfCBQcm9taXNlPHN0cmluZz4sIHBhdHRlcm46IHN0cmluZyB8IFJlZ0V4cCk6XG4gICAgICBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBzID0gYXdhaXQgcztcbiAgICByZXR1cm4gdHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnID8gcyA9PT0gcGF0dGVybiA6IHBhdHRlcm4udGVzdChzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGJlIHJ1biBhZ2FpbnN0IGNhbmRpZGF0ZSBoYXJuZXNzZXMuXG4gICAqIEBwYXJhbSBkZXNjcmlwdGlvbiBBIGRlc2NyaXB0aW9uIG9mIHRoaXMgcHJlZGljYXRlIHRoYXQgbWF5IGJlIHVzZWQgaW4gZXJyb3IgbWVzc2FnZXMuXG4gICAqIEBwYXJhbSBwcmVkaWNhdGUgQW4gYXN5bmMgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJuIHRoaXMgKGZvciBtZXRob2QgY2hhaW5pbmcpLlxuICAgKi9cbiAgYWRkKGRlc2NyaXB0aW9uOiBzdHJpbmcsIHByZWRpY2F0ZTogQXN5bmNQcmVkaWNhdGU8VD4pIHtcbiAgICB0aGlzLl9kZXNjcmlwdGlvbnMucHVzaChkZXNjcmlwdGlvbik7XG4gICAgdGhpcy5fcHJlZGljYXRlcy5wdXNoKHByZWRpY2F0ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHByZWRpY2F0ZSBmdW5jdGlvbiB0aGF0IGRlcGVuZHMgb24gYW4gb3B0aW9uIHZhbHVlIHRvIGJlIHJ1biBhZ2FpbnN0IGNhbmRpZGF0ZVxuICAgKiBoYXJuZXNzZXMuIElmIHRoZSBvcHRpb24gdmFsdWUgaXMgdW5kZWZpbmVkLCB0aGUgcHJlZGljYXRlIHdpbGwgYmUgaWdub3JlZC5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG9wdGlvbiAobWF5IGJlIHVzZWQgaW4gZXJyb3IgbWVzc2FnZXMpLlxuICAgKiBAcGFyYW0gb3B0aW9uIFRoZSBvcHRpb24gdmFsdWUuXG4gICAqIEBwYXJhbSBwcmVkaWNhdGUgVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB0byBydW4gaWYgdGhlIG9wdGlvbiB2YWx1ZSBpcyBub3QgdW5kZWZpbmVkLlxuICAgKiBAcmV0dXJuIHRoaXMgKGZvciBtZXRob2QgY2hhaW5pbmcpLlxuICAgKi9cbiAgYWRkT3B0aW9uPE8+KG5hbWU6IHN0cmluZywgb3B0aW9uOiBPIHwgdW5kZWZpbmVkLCBwcmVkaWNhdGU6IEFzeW5jT3B0aW9uUHJlZGljYXRlPFQsIE8+KSB7XG4gICAgLy8gQWRkIHF1b3RlcyBhcm91bmQgc3RyaW5ncyB0byBkaWZmZXJlbnRpYXRlIHRoZW0gZnJvbSBvdGhlciB2YWx1ZXNcbiAgICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnID8gYFwiJHtvcHRpb259XCJgIDogYCR7b3B0aW9ufWA7XG4gICAgaWYgKG9wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFkZChgJHtuYW1lfSA9ICR7dmFsdWV9YCwgaXRlbSA9PiBwcmVkaWNhdGUoaXRlbSwgb3B0aW9uKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgYSBsaXN0IG9mIGhhcm5lc3NlcyBvbiB0aGlzIHByZWRpY2F0ZS5cbiAgICogQHBhcmFtIGhhcm5lc3NlcyBUaGUgbGlzdCBvZiBoYXJuZXNzZXMgdG8gZmlsdGVyLlxuICAgKiBAcmV0dXJuIEEgbGlzdCBvZiBoYXJuZXNzZXMgdGhhdCBzYXRpc2Z5IHRoaXMgcHJlZGljYXRlLlxuICAgKi9cbiAgYXN5bmMgZmlsdGVyKGhhcm5lc3NlczogVFtdKTogUHJvbWlzZTxUW10+IHtcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoaGFybmVzc2VzLm1hcChoID0+IHRoaXMuZXZhbHVhdGUoaCkpKTtcbiAgICByZXR1cm4gaGFybmVzc2VzLmZpbHRlcigoXywgaSkgPT4gcmVzdWx0c1tpXSk7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIGhhcm5lc3Mgc2F0aXNmaWVzIHRoaXMgcHJlZGljYXRlLlxuICAgKiBAcGFyYW0gaGFybmVzcyBUaGUgaGFybmVzcyB0byBjaGVja1xuICAgKiBAcmV0dXJuIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIGhhcm5lc3Mgc2F0aXNmaWVzIHRoaXMgcHJlZGljYXRlLFxuICAgKiAgIGFuZCByZXNvbHZlcyB0byBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBhc3luYyBldmFsdWF0ZShoYXJuZXNzOiBUKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKHRoaXMuX3ByZWRpY2F0ZXMubWFwKHAgPT4gcChoYXJuZXNzKSkpO1xuICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoY29tYmluZWQsIGN1cnJlbnQpID0+IGNvbWJpbmVkICYmIGN1cnJlbnQsIHRydWUpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBkZXNjcmlwdGlvbiBvZiB0aGlzIHByZWRpY2F0ZSBmb3IgdXNlIGluIGVycm9yIG1lc3NhZ2VzLiAqL1xuICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb25zLmpvaW4oJywgJyk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgc2VsZWN0b3IgdXNlZCB0byBmaW5kIGNhbmRpZGF0ZSBlbGVtZW50cy4gKi9cbiAgZ2V0U2VsZWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FuY2VzdG9yLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcChwYXJ0ID0+IGAke3BhcnQudHJpbSgpfSAke3RoaXMuaGFybmVzc1R5cGUuaG9zdFNlbGVjdG9yfWAudHJpbSgpKVxuICAgICAgICAuam9pbignLCcpO1xuICB9XG5cbiAgLyoqIEFkZHMgYmFzZSBvcHRpb25zIGNvbW1vbiB0byBhbGwgaGFybmVzcyB0eXBlcy4gKi9cbiAgcHJpdmF0ZSBfYWRkQmFzZU9wdGlvbnMob3B0aW9uczogQmFzZUhhcm5lc3NGaWx0ZXJzKSB7XG4gICAgdGhpcy5fYW5jZXN0b3IgPSBvcHRpb25zLmFuY2VzdG9yIHx8ICcnO1xuICAgIGlmICh0aGlzLl9hbmNlc3Rvcikge1xuICAgICAgdGhpcy5fZGVzY3JpcHRpb25zLnB1c2goYGhhcyBhbmNlc3RvciBtYXRjaGluZyBzZWxlY3RvciBcIiR7dGhpcy5fYW5jZXN0b3J9XCJgKTtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBvcHRpb25zLnNlbGVjdG9yO1xuICAgIGlmIChzZWxlY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFkZChgaG9zdCBtYXRjaGVzIHNlbGVjdG9yIFwiJHtzZWxlY3Rvcn1cImAsIGFzeW5jIGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IGl0ZW0uaG9zdCgpKS5tYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=