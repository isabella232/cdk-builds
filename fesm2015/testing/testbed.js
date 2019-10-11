import { __awaiter } from 'tslib';
import { triggerBlur, isTextInput, clearElement, dispatchMouseEvent, triggerFocus, typeInElement, HarnessEnvironment } from '@angular/cdk/testing';
import { BACKSPACE, TAB, ENTER, SHIFT, CONTROL, ALT, ESCAPE, PAGE_UP, PAGE_DOWN, END, HOME, LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW, INSERT, DELETE, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, META } from '@angular/cdk/keycodes';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** An enum of non-text keys that can be used with the `sendKeys` method. */
// NOTE: This is a separate enum from `@angular/cdk/keycodes` because we don't necessarily want to
// support every possible keyCode. We also can't rely on Protractor's `Key` because we don't want a
// dependency on any particular testing framework here. Instead we'll just maintain this supported
// list of keys and let individual concrete `HarnessEnvironment` classes map them to whatever key
// representation is used in its respective testing framework.
var TestKey;
(function (TestKey) {
    TestKey[TestKey["BACKSPACE"] = 0] = "BACKSPACE";
    TestKey[TestKey["TAB"] = 1] = "TAB";
    TestKey[TestKey["ENTER"] = 2] = "ENTER";
    TestKey[TestKey["SHIFT"] = 3] = "SHIFT";
    TestKey[TestKey["CONTROL"] = 4] = "CONTROL";
    TestKey[TestKey["ALT"] = 5] = "ALT";
    TestKey[TestKey["ESCAPE"] = 6] = "ESCAPE";
    TestKey[TestKey["PAGE_UP"] = 7] = "PAGE_UP";
    TestKey[TestKey["PAGE_DOWN"] = 8] = "PAGE_DOWN";
    TestKey[TestKey["END"] = 9] = "END";
    TestKey[TestKey["HOME"] = 10] = "HOME";
    TestKey[TestKey["LEFT_ARROW"] = 11] = "LEFT_ARROW";
    TestKey[TestKey["UP_ARROW"] = 12] = "UP_ARROW";
    TestKey[TestKey["RIGHT_ARROW"] = 13] = "RIGHT_ARROW";
    TestKey[TestKey["DOWN_ARROW"] = 14] = "DOWN_ARROW";
    TestKey[TestKey["INSERT"] = 15] = "INSERT";
    TestKey[TestKey["DELETE"] = 16] = "DELETE";
    TestKey[TestKey["F1"] = 17] = "F1";
    TestKey[TestKey["F2"] = 18] = "F2";
    TestKey[TestKey["F3"] = 19] = "F3";
    TestKey[TestKey["F4"] = 20] = "F4";
    TestKey[TestKey["F5"] = 21] = "F5";
    TestKey[TestKey["F6"] = 22] = "F6";
    TestKey[TestKey["F7"] = 23] = "F7";
    TestKey[TestKey["F8"] = 24] = "F8";
    TestKey[TestKey["F9"] = 25] = "F9";
    TestKey[TestKey["F10"] = 26] = "F10";
    TestKey[TestKey["F11"] = 27] = "F11";
    TestKey[TestKey["F12"] = 28] = "F12";
    TestKey[TestKey["META"] = 29] = "META";
})(TestKey || (TestKey = {}));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Maps `TestKey` constants to the `keyCode` and `key` values used by native browser events. */
const keyMap = {
    [TestKey.BACKSPACE]: { keyCode: BACKSPACE, key: 'Backspace' },
    [TestKey.TAB]: { keyCode: TAB, key: 'Tab' },
    [TestKey.ENTER]: { keyCode: ENTER, key: 'Enter' },
    [TestKey.SHIFT]: { keyCode: SHIFT, key: 'Shift' },
    [TestKey.CONTROL]: { keyCode: CONTROL, key: 'Control' },
    [TestKey.ALT]: { keyCode: ALT, key: 'Alt' },
    [TestKey.ESCAPE]: { keyCode: ESCAPE, key: 'Escape' },
    [TestKey.PAGE_UP]: { keyCode: PAGE_UP, key: 'PageUp' },
    [TestKey.PAGE_DOWN]: { keyCode: PAGE_DOWN, key: 'PageDown' },
    [TestKey.END]: { keyCode: END, key: 'End' },
    [TestKey.HOME]: { keyCode: HOME, key: 'Home' },
    [TestKey.LEFT_ARROW]: { keyCode: LEFT_ARROW, key: 'ArrowLeft' },
    [TestKey.UP_ARROW]: { keyCode: UP_ARROW, key: 'ArrowUp' },
    [TestKey.RIGHT_ARROW]: { keyCode: RIGHT_ARROW, key: 'ArrowRight' },
    [TestKey.DOWN_ARROW]: { keyCode: DOWN_ARROW, key: 'ArrowDown' },
    [TestKey.INSERT]: { keyCode: INSERT, key: 'Insert' },
    [TestKey.DELETE]: { keyCode: DELETE, key: 'Delete' },
    [TestKey.F1]: { keyCode: F1, key: 'F1' },
    [TestKey.F2]: { keyCode: F2, key: 'F2' },
    [TestKey.F3]: { keyCode: F3, key: 'F3' },
    [TestKey.F4]: { keyCode: F4, key: 'F4' },
    [TestKey.F5]: { keyCode: F5, key: 'F5' },
    [TestKey.F6]: { keyCode: F6, key: 'F6' },
    [TestKey.F7]: { keyCode: F7, key: 'F7' },
    [TestKey.F8]: { keyCode: F8, key: 'F8' },
    [TestKey.F9]: { keyCode: F9, key: 'F9' },
    [TestKey.F10]: { keyCode: F10, key: 'F10' },
    [TestKey.F11]: { keyCode: F11, key: 'F11' },
    [TestKey.F12]: { keyCode: F12, key: 'F12' },
    [TestKey.META]: { keyCode: META, key: 'Meta' }
};
/** A `TestElement` implementation for unit tests. */
class UnitTestElement {
    constructor(element, _stabilize) {
        this.element = element;
        this._stabilize = _stabilize;
    }
    blur() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            triggerBlur(this.element);
            yield this._stabilize();
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            if (!isTextInput(this.element)) {
                throw Error('Attempting to clear an invalid element');
            }
            clearElement(this.element);
            yield this._stabilize();
        });
    }
    click(relativeX = 0, relativeY = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            const { left, top } = this.element.getBoundingClientRect();
            // Round the computed click position as decimal pixels are not
            // supported by mouse events and could lead to unexpected results.
            const clientX = Math.round(left + relativeX);
            const clientY = Math.round(top + relativeY);
            dispatchMouseEvent(this.element, 'mousedown', clientX, clientY);
            dispatchMouseEvent(this.element, 'mouseup', clientX, clientY);
            dispatchMouseEvent(this.element, 'click', clientX, clientY);
            yield this._stabilize();
        });
    }
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            triggerFocus(this.element);
            yield this._stabilize();
        });
    }
    getCssValue(property) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            // TODO(mmalerba): Consider adding value normalization if we run into common cases where its
            //  needed.
            return getComputedStyle(this.element).getPropertyValue(property);
        });
    }
    hover() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            dispatchMouseEvent(this.element, 'mouseenter');
            yield this._stabilize();
        });
    }
    sendKeys(...modifiersAndKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            const args = modifiersAndKeys.map(k => typeof k === 'number' ? keyMap[k] : k);
            typeInElement(this.element, ...args);
            yield this._stabilize();
        });
    }
    text() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return (this.element.textContent || '').trim();
        });
    }
    getAttribute(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return this.element.getAttribute(name);
        });
    }
    hasClass(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return this.element.classList.contains(name);
        });
    }
    getDimensions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return this.element.getBoundingClientRect();
        });
    }
    getProperty(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            return this.element[name];
        });
    }
    matchesSelector(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stabilize();
            const elementPrototype = Element.prototype;
            return (elementPrototype['matches'] || elementPrototype['msMatchesSelector'])
                .call(this.element, selector);
        });
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** A `HarnessEnvironment` implementation for Angular's Testbed. */
class TestbedHarnessEnvironment extends HarnessEnvironment {
    constructor(rawRootElement, _fixture) {
        super(rawRootElement);
        this._fixture = _fixture;
        this._destroyed = false;
        _fixture.componentRef.onDestroy(() => this._destroyed = true);
    }
    /** Creates a `HarnessLoader` rooted at the given fixture's root element. */
    static loader(fixture) {
        return new TestbedHarnessEnvironment(fixture.nativeElement, fixture);
    }
    /**
     * Creates a `HarnessLoader` at the document root. This can be used if harnesses are
     * located outside of a fixture (e.g. overlays appended to the document body).
     */
    static documentRootLoader(fixture) {
        return new TestbedHarnessEnvironment(document.body, fixture);
    }
    /**
     * Creates an instance of the given harness type, using the fixture's root element as the
     * harness's host element. This method should be used when creating a harness for the root element
     * of a fixture, as components do not have the correct selector when they are created as the root
     * of the fixture.
     */
    static harnessForFixture(fixture, harnessType) {
        return __awaiter(this, void 0, void 0, function* () {
            const environment = new TestbedHarnessEnvironment(fixture.nativeElement, fixture);
            yield environment.forceStabilize();
            return environment.createComponentHarness(harnessType, fixture.nativeElement);
        });
    }
    forceStabilize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._destroyed) {
                throw Error('Harness is attempting to use a fixture that has already been destroyed.');
            }
            this._fixture.detectChanges();
            yield this._fixture.whenStable();
        });
    }
    getDocumentRoot() {
        return document.body;
    }
    createTestElement(element) {
        return new UnitTestElement(element, () => this.forceStabilize());
    }
    createEnvironment(element) {
        return new TestbedHarnessEnvironment(element, this._fixture);
    }
    getAllRawElements(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.forceStabilize();
            return Array.from(this.rawRootElement.querySelectorAll(selector));
        });
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { TestbedHarnessEnvironment, UnitTestElement };
//# sourceMappingURL=testbed.js.map