/**
 * @fileoverview added by tsickle
 * Generated from: src/cdk/a11y/aria-describer/aria-describer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { addAriaReferencedId, getAriaReferenceIds, removeAriaReferencedId } from './aria-reference';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Interface used to register message elements and keep a count of how many registrations have
 * the same message and the reference to the message element used for the `aria-describedby`.
 * @record
 */
export function RegisteredMessage() { }
if (false) {
    /**
     * The element containing the message.
     * @type {?}
     */
    RegisteredMessage.prototype.messageElement;
    /**
     * The number of elements that reference this message element via `aria-describedby`.
     * @type {?}
     */
    RegisteredMessage.prototype.referenceCount;
}
/**
 * ID used for the body container where all messages are appended.
 * @type {?}
 */
export const MESSAGES_CONTAINER_ID = 'cdk-describedby-message-container';
/**
 * ID prefix used for each created message element.
 * @type {?}
 */
export const CDK_DESCRIBEDBY_ID_PREFIX = 'cdk-describedby-message';
/**
 * Attribute given to each host element that is described by a message element.
 * @type {?}
 */
export const CDK_DESCRIBEDBY_HOST_ATTRIBUTE = 'cdk-describedby-host';
/**
 * Global incremental identifier for each registered message element.
 * @type {?}
 */
let nextId = 0;
/**
 * Global map of all registered message elements that have been placed into the document.
 * @type {?}
 */
const messageRegistry = new Map();
/**
 * Container for all registered messages.
 * @type {?}
 */
let messagesContainer = null;
/**
 * Utility that creates visually hidden elements with a message content. Useful for elements that
 * want to use aria-describedby to further describe themselves without adding additional visual
 * content.
 */
let AriaDescriber = /** @class */ (() => {
    /**
     * Utility that creates visually hidden elements with a message content. Useful for elements that
     * want to use aria-describedby to further describe themselves without adding additional visual
     * content.
     */
    class AriaDescriber {
        /**
         * @param {?} _document
         */
        constructor(_document) {
            this._document = _document;
        }
        /**
         * Adds to the host element an aria-describedby reference to a hidden element that contains
         * the message. If the same message has already been registered, then it will reuse the created
         * message element.
         * @param {?} hostElement
         * @param {?} message
         * @return {?}
         */
        describe(hostElement, message) {
            if (!this._canBeDescribed(hostElement, message)) {
                return;
            }
            if (typeof message !== 'string') {
                // We need to ensure that the element has an ID.
                this._setMessageId(message);
                messageRegistry.set(message, { messageElement: message, referenceCount: 0 });
            }
            else if (!messageRegistry.has(message)) {
                this._createMessageElement(message);
            }
            if (!this._isElementDescribedByMessage(hostElement, message)) {
                this._addMessageReference(hostElement, message);
            }
        }
        /**
         * Removes the host element's aria-describedby reference to the message element.
         * @param {?} hostElement
         * @param {?} message
         * @return {?}
         */
        removeDescription(hostElement, message) {
            if (!this._isElementNode(hostElement)) {
                return;
            }
            if (this._isElementDescribedByMessage(hostElement, message)) {
                this._removeMessageReference(hostElement, message);
            }
            // If the message is a string, it means that it's one that we created for the
            // consumer so we can remove it safely, otherwise we should leave it in place.
            if (typeof message === 'string') {
                /** @type {?} */
                const registeredMessage = messageRegistry.get(message);
                if (registeredMessage && registeredMessage.referenceCount === 0) {
                    this._deleteMessageElement(message);
                }
            }
            if (messagesContainer && messagesContainer.childNodes.length === 0) {
                this._deleteMessagesContainer();
            }
        }
        /**
         * Unregisters all created message elements and removes the message container.
         * @return {?}
         */
        ngOnDestroy() {
            /** @type {?} */
            const describedElements = this._document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}]`);
            for (let i = 0; i < describedElements.length; i++) {
                this._removeCdkDescribedByReferenceIds(describedElements[i]);
                describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
            }
            if (messagesContainer) {
                this._deleteMessagesContainer();
            }
            messageRegistry.clear();
        }
        /**
         * Creates a new element in the visually hidden message container element with the message
         * as its content and adds it to the message registry.
         * @private
         * @param {?} message
         * @return {?}
         */
        _createMessageElement(message) {
            /** @type {?} */
            const messageElement = this._document.createElement('div');
            this._setMessageId(messageElement);
            messageElement.textContent = message;
            this._createMessagesContainer();
            (/** @type {?} */ (messagesContainer)).appendChild(messageElement);
            messageRegistry.set(message, { messageElement, referenceCount: 0 });
        }
        /**
         * Assigns a unique ID to an element, if it doesn't have one already.
         * @private
         * @param {?} element
         * @return {?}
         */
        _setMessageId(element) {
            if (!element.id) {
                element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${nextId++}`;
            }
        }
        /**
         * Deletes the message element from the global messages container.
         * @private
         * @param {?} message
         * @return {?}
         */
        _deleteMessageElement(message) {
            /** @type {?} */
            const registeredMessage = messageRegistry.get(message);
            /** @type {?} */
            const messageElement = registeredMessage && registeredMessage.messageElement;
            if (messagesContainer && messageElement) {
                messagesContainer.removeChild(messageElement);
            }
            messageRegistry.delete(message);
        }
        /**
         * Creates the global container for all aria-describedby messages.
         * @private
         * @return {?}
         */
        _createMessagesContainer() {
            if (!messagesContainer) {
                /** @type {?} */
                const preExistingContainer = this._document.getElementById(MESSAGES_CONTAINER_ID);
                // When going from the server to the client, we may end up in a situation where there's
                // already a container on the page, but we don't have a reference to it. Clear the
                // old container so we don't get duplicates. Doing this, instead of emptying the previous
                // container, should be slightly faster.
                if (preExistingContainer) {
                    (/** @type {?} */ (preExistingContainer.parentNode)).removeChild(preExistingContainer);
                }
                messagesContainer = this._document.createElement('div');
                messagesContainer.id = MESSAGES_CONTAINER_ID;
                messagesContainer.setAttribute('aria-hidden', 'true');
                messagesContainer.style.display = 'none';
                this._document.body.appendChild(messagesContainer);
            }
        }
        /**
         * Deletes the global messages container.
         * @private
         * @return {?}
         */
        _deleteMessagesContainer() {
            if (messagesContainer && messagesContainer.parentNode) {
                messagesContainer.parentNode.removeChild(messagesContainer);
                messagesContainer = null;
            }
        }
        /**
         * Removes all cdk-describedby messages that are hosted through the element.
         * @private
         * @param {?} element
         * @return {?}
         */
        _removeCdkDescribedByReferenceIds(element) {
            // Remove all aria-describedby reference IDs that are prefixed by CDK_DESCRIBEDBY_ID_PREFIX
            /** @type {?} */
            const originalReferenceIds = getAriaReferenceIds(element, 'aria-describedby')
                .filter((/**
             * @param {?} id
             * @return {?}
             */
            id => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0));
            element.setAttribute('aria-describedby', originalReferenceIds.join(' '));
        }
        /**
         * Adds a message reference to the element using aria-describedby and increments the registered
         * message's reference count.
         * @private
         * @param {?} element
         * @param {?} message
         * @return {?}
         */
        _addMessageReference(element, message) {
            /** @type {?} */
            const registeredMessage = (/** @type {?} */ (messageRegistry.get(message)));
            // Add the aria-describedby reference and set the
            // describedby_host attribute to mark the element.
            addAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
            element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, '');
            registeredMessage.referenceCount++;
        }
        /**
         * Removes a message reference from the element using aria-describedby
         * and decrements the registered message's reference count.
         * @private
         * @param {?} element
         * @param {?} message
         * @return {?}
         */
        _removeMessageReference(element, message) {
            /** @type {?} */
            const registeredMessage = (/** @type {?} */ (messageRegistry.get(message)));
            registeredMessage.referenceCount--;
            removeAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
            element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
        }
        /**
         * Returns true if the element has been described by the provided message ID.
         * @private
         * @param {?} element
         * @param {?} message
         * @return {?}
         */
        _isElementDescribedByMessage(element, message) {
            /** @type {?} */
            const referenceIds = getAriaReferenceIds(element, 'aria-describedby');
            /** @type {?} */
            const registeredMessage = messageRegistry.get(message);
            /** @type {?} */
            const messageId = registeredMessage && registeredMessage.messageElement.id;
            return !!messageId && referenceIds.indexOf(messageId) != -1;
        }
        /**
         * Determines whether a message can be described on a particular element.
         * @private
         * @param {?} element
         * @param {?} message
         * @return {?}
         */
        _canBeDescribed(element, message) {
            if (!this._isElementNode(element)) {
                return false;
            }
            if (message && typeof message === 'object') {
                // We'd have to make some assumptions about the description element's text, if the consumer
                // passed in an element. Assume that if an element is passed in, the consumer has verified
                // that it can be used as a description.
                return true;
            }
            /** @type {?} */
            const trimmedMessage = message == null ? '' : `${message}`.trim();
            /** @type {?} */
            const ariaLabel = element.getAttribute('aria-label');
            // We shouldn't set descriptions if they're exactly the same as the `aria-label` of the
            // element, because screen readers will end up reading out the same text twice in a row.
            return trimmedMessage ? (!ariaLabel || ariaLabel.trim() !== trimmedMessage) : false;
        }
        /**
         * Checks whether a node is an Element node.
         * @private
         * @param {?} element
         * @return {?}
         */
        _isElementNode(element) {
            return element.nodeType === this._document.ELEMENT_NODE;
        }
    }
    AriaDescriber.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    AriaDescriber.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ];
    /** @nocollapse */ AriaDescriber.ɵprov = i0.ɵɵdefineInjectable({ factory: function AriaDescriber_Factory() { return new AriaDescriber(i0.ɵɵinject(i1.DOCUMENT)); }, token: AriaDescriber, providedIn: "root" });
    return AriaDescriber;
})();
export { AriaDescriber };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AriaDescriber.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYS1kZXNjcmliZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrL2ExMXkvYXJpYS1kZXNjcmliZXIvYXJpYS1kZXNjcmliZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7OztBQU9sRyx1Q0FNQzs7Ozs7O0lBSkMsMkNBQXdCOzs7OztJQUd4QiwyQ0FBdUI7Ozs7OztBQUl6QixNQUFNLE9BQU8scUJBQXFCLEdBQUcsbUNBQW1DOzs7OztBQUd4RSxNQUFNLE9BQU8seUJBQXlCLEdBQUcseUJBQXlCOzs7OztBQUdsRSxNQUFNLE9BQU8sOEJBQThCLEdBQUcsc0JBQXNCOzs7OztJQUdoRSxNQUFNLEdBQUcsQ0FBQzs7Ozs7TUFHUixlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQXlDOzs7OztJQUdwRSxpQkFBaUIsR0FBdUIsSUFBSTs7Ozs7O0FBT2hEOzs7Ozs7SUFBQSxNQUNhLGFBQWE7Ozs7UUFHeEIsWUFBOEIsU0FBYztZQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM3QixDQUFDOzs7Ozs7Ozs7UUFPRCxRQUFRLENBQUMsV0FBb0IsRUFBRSxPQUEyQjtZQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0JBQy9DLE9BQU87YUFDUjtZQUVELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUMvQixnREFBZ0Q7Z0JBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7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QXpNRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7O2dEQUlqQixNQUFNLFNBQUMsUUFBUTs7O3dCQXBEOUI7S0EwUEM7U0F6TVksYUFBYTs7Ozs7O0lBQ3hCLGtDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2FkZEFyaWFSZWZlcmVuY2VkSWQsIGdldEFyaWFSZWZlcmVuY2VJZHMsIHJlbW92ZUFyaWFSZWZlcmVuY2VkSWR9IGZyb20gJy4vYXJpYS1yZWZlcmVuY2UnO1xuXG5cbi8qKlxuICogSW50ZXJmYWNlIHVzZWQgdG8gcmVnaXN0ZXIgbWVzc2FnZSBlbGVtZW50cyBhbmQga2VlcCBhIGNvdW50IG9mIGhvdyBtYW55IHJlZ2lzdHJhdGlvbnMgaGF2ZVxuICogdGhlIHNhbWUgbWVzc2FnZSBhbmQgdGhlIHJlZmVyZW5jZSB0byB0aGUgbWVzc2FnZSBlbGVtZW50IHVzZWQgZm9yIHRoZSBgYXJpYS1kZXNjcmliZWRieWAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVnaXN0ZXJlZE1lc3NhZ2Uge1xuICAvKiogVGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgbWVzc2FnZS4gKi9cbiAgbWVzc2FnZUVsZW1lbnQ6IEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgdGhhdCByZWZlcmVuY2UgdGhpcyBtZXNzYWdlIGVsZW1lbnQgdmlhIGBhcmlhLWRlc2NyaWJlZGJ5YC4gKi9cbiAgcmVmZXJlbmNlQ291bnQ6IG51bWJlcjtcbn1cblxuLyoqIElEIHVzZWQgZm9yIHRoZSBib2R5IGNvbnRhaW5lciB3aGVyZSBhbGwgbWVzc2FnZXMgYXJlIGFwcGVuZGVkLiAqL1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VTX0NPTlRBSU5FUl9JRCA9ICdjZGstZGVzY3JpYmVkYnktbWVzc2FnZS1jb250YWluZXInO1xuXG4vKiogSUQgcHJlZml4IHVzZWQgZm9yIGVhY2ggY3JlYXRlZCBtZXNzYWdlIGVsZW1lbnQuICovXG5leHBvcnQgY29uc3QgQ0RLX0RFU0NSSUJFREJZX0lEX1BSRUZJWCA9ICdjZGstZGVzY3JpYmVkYnktbWVzc2FnZSc7XG5cbi8qKiBBdHRyaWJ1dGUgZ2l2ZW4gdG8gZWFjaCBob3N0IGVsZW1lbnQgdGhhdCBpcyBkZXNjcmliZWQgYnkgYSBtZXNzYWdlIGVsZW1lbnQuICovXG5leHBvcnQgY29uc3QgQ0RLX0RFU0NSSUJFREJZX0hPU1RfQVRUUklCVVRFID0gJ2Nkay1kZXNjcmliZWRieS1ob3N0JztcblxuLyoqIEdsb2JhbCBpbmNyZW1lbnRhbCBpZGVudGlmaWVyIGZvciBlYWNoIHJlZ2lzdGVyZWQgbWVzc2FnZSBlbGVtZW50LiAqL1xubGV0IG5leHRJZCA9IDA7XG5cbi8qKiBHbG9iYWwgbWFwIG9mIGFsbCByZWdpc3RlcmVkIG1lc3NhZ2UgZWxlbWVudHMgdGhhdCBoYXZlIGJlZW4gcGxhY2VkIGludG8gdGhlIGRvY3VtZW50LiAqL1xuY29uc3QgbWVzc2FnZVJlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmd8SFRNTEVsZW1lbnQsIFJlZ2lzdGVyZWRNZXNzYWdlPigpO1xuXG4vKiogQ29udGFpbmVyIGZvciBhbGwgcmVnaXN0ZXJlZCBtZXNzYWdlcy4gKi9cbmxldCBtZXNzYWdlc0NvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuLyoqXG4gKiBVdGlsaXR5IHRoYXQgY3JlYXRlcyB2aXN1YWxseSBoaWRkZW4gZWxlbWVudHMgd2l0aCBhIG1lc3NhZ2UgY29udGVudC4gVXNlZnVsIGZvciBlbGVtZW50cyB0aGF0XG4gKiB3YW50IHRvIHVzZSBhcmlhLWRlc2NyaWJlZGJ5IHRvIGZ1cnRoZXIgZGVzY3JpYmUgdGhlbXNlbHZlcyB3aXRob3V0IGFkZGluZyBhZGRpdGlvbmFsIHZpc3VhbFxuICogY29udGVudC5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQXJpYURlc2NyaWJlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSkge1xuICAgIHRoaXMuX2RvY3VtZW50ID0gX2RvY3VtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdG8gdGhlIGhvc3QgZWxlbWVudCBhbiBhcmlhLWRlc2NyaWJlZGJ5IHJlZmVyZW5jZSB0byBhIGhpZGRlbiBlbGVtZW50IHRoYXQgY29udGFpbnNcbiAgICogdGhlIG1lc3NhZ2UuIElmIHRoZSBzYW1lIG1lc3NhZ2UgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkLCB0aGVuIGl0IHdpbGwgcmV1c2UgdGhlIGNyZWF0ZWRcbiAgICogbWVzc2FnZSBlbGVtZW50LlxuICAgKi9cbiAgZGVzY3JpYmUoaG9zdEVsZW1lbnQ6IEVsZW1lbnQsIG1lc3NhZ2U6IHN0cmluZ3xIVE1MRWxlbWVudCkge1xuICAgIGlmICghdGhpcy5fY2FuQmVEZXNjcmliZWQoaG9zdEVsZW1lbnQsIG1lc3NhZ2UpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgLy8gV2UgbmVlZCB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBoYXMgYW4gSUQuXG4gICAgICB0aGlzLl9zZXRNZXNzYWdlSWQobWVzc2FnZSk7XG4gICAgICBtZXNzYWdlUmVnaXN0cnkuc2V0KG1lc3NhZ2UsIHttZXNzYWdlRWxlbWVudDogbWVzc2FnZSwgcmVmZXJlbmNlQ291bnQ6IDB9KTtcbiAgICB9IGVsc2UgaWYgKCFtZXNzYWdlUmVnaXN0cnkuaGFzKG1lc3NhZ2UpKSB7XG4gICAgICB0aGlzLl9jcmVhdGVNZXNzYWdlRWxlbWVudChtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2lzRWxlbWVudERlc2NyaWJlZEJ5TWVzc2FnZShob3N0RWxlbWVudCwgbWVzc2FnZSkpIHtcbiAgICAgIHRoaXMuX2FkZE1lc3NhZ2VSZWZlcmVuY2UoaG9zdEVsZW1lbnQsIG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZW1vdmVzIHRoZSBob3N0IGVsZW1lbnQncyBhcmlhLWRlc2NyaWJlZGJ5IHJlZmVyZW5jZSB0byB0aGUgbWVzc2FnZSBlbGVtZW50LiAqL1xuICByZW1vdmVEZXNjcmlwdGlvbihob3N0RWxlbWVudDogRWxlbWVudCwgbWVzc2FnZTogc3RyaW5nfEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKCF0aGlzLl9pc0VsZW1lbnROb2RlKGhvc3RFbGVtZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pc0VsZW1lbnREZXNjcmliZWRCeU1lc3NhZ2UoaG9zdEVsZW1lbnQsIG1lc3NhZ2UpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVNZXNzYWdlUmVmZXJlbmNlKGhvc3RFbGVtZW50LCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbWVzc2FnZSBpcyBhIHN0cmluZywgaXQgbWVhbnMgdGhhdCBpdCdzIG9uZSB0aGF0IHdlIGNyZWF0ZWQgZm9yIHRoZVxuICAgIC8vIGNvbnN1bWVyIHNvIHdlIGNhbiByZW1vdmUgaXQgc2FmZWx5LCBvdGhlcndpc2Ugd2Ugc2hvdWxkIGxlYXZlIGl0IGluIHBsYWNlLlxuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHJlZ2lzdGVyZWRNZXNzYWdlID0gbWVzc2FnZVJlZ2lzdHJ5LmdldChtZXNzYWdlKTtcbiAgICAgIGlmIChyZWdpc3RlcmVkTWVzc2FnZSAmJiByZWdpc3RlcmVkTWVzc2FnZS5yZWZlcmVuY2VDb3VudCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9kZWxldGVNZXNzYWdlRWxlbWVudChtZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZXNDb250YWluZXIgJiYgbWVzc2FnZXNDb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2RlbGV0ZU1lc3NhZ2VzQ29udGFpbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFVucmVnaXN0ZXJzIGFsbCBjcmVhdGVkIG1lc3NhZ2UgZWxlbWVudHMgYW5kIHJlbW92ZXMgdGhlIG1lc3NhZ2UgY29udGFpbmVyLiAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjb25zdCBkZXNjcmliZWRFbGVtZW50cyA9XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFske0NES19ERVNDUklCRURCWV9IT1NUX0FUVFJJQlVURX1dYCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc2NyaWJlZEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9yZW1vdmVDZGtEZXNjcmliZWRCeVJlZmVyZW5jZUlkcyhkZXNjcmliZWRFbGVtZW50c1tpXSk7XG4gICAgICBkZXNjcmliZWRFbGVtZW50c1tpXS5yZW1vdmVBdHRyaWJ1dGUoQ0RLX0RFU0NSSUJFREJZX0hPU1RfQVRUUklCVVRFKTtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZXNDb250YWluZXIpIHtcbiAgICAgIHRoaXMuX2RlbGV0ZU1lc3NhZ2VzQ29udGFpbmVyKCk7XG4gICAgfVxuXG4gICAgbWVzc2FnZVJlZ2lzdHJ5LmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBlbGVtZW50IGluIHRoZSB2aXN1YWxseSBoaWRkZW4gbWVzc2FnZSBjb250YWluZXIgZWxlbWVudCB3aXRoIHRoZSBtZXNzYWdlXG4gICAqIGFzIGl0cyBjb250ZW50IGFuZCBhZGRzIGl0IHRvIHRoZSBtZXNzYWdlIHJlZ2lzdHJ5LlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlTWVzc2FnZUVsZW1lbnQobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgbWVzc2FnZUVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9zZXRNZXNzYWdlSWQobWVzc2FnZUVsZW1lbnQpO1xuICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcblxuICAgIHRoaXMuX2NyZWF0ZU1lc3NhZ2VzQ29udGFpbmVyKCk7XG4gICAgbWVzc2FnZXNDb250YWluZXIhLmFwcGVuZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcblxuICAgIG1lc3NhZ2VSZWdpc3RyeS5zZXQobWVzc2FnZSwge21lc3NhZ2VFbGVtZW50LCByZWZlcmVuY2VDb3VudDogMH0pO1xuICB9XG5cbiAgLyoqIEFzc2lnbnMgYSB1bmlxdWUgSUQgdG8gYW4gZWxlbWVudCwgaWYgaXQgZG9lc24ndCBoYXZlIG9uZSBhbHJlYWR5LiAqL1xuICBwcml2YXRlIF9zZXRNZXNzYWdlSWQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQuaWQpIHtcbiAgICAgIGVsZW1lbnQuaWQgPSBgJHtDREtfREVTQ1JJQkVEQllfSURfUFJFRklYfS0ke25leHRJZCsrfWA7XG4gICAgfVxuICB9XG5cbiAgLyoqIERlbGV0ZXMgdGhlIG1lc3NhZ2UgZWxlbWVudCBmcm9tIHRoZSBnbG9iYWwgbWVzc2FnZXMgY29udGFpbmVyLiAqL1xuICBwcml2YXRlIF9kZWxldGVNZXNzYWdlRWxlbWVudChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCByZWdpc3RlcmVkTWVzc2FnZSA9IG1lc3NhZ2VSZWdpc3RyeS5nZXQobWVzc2FnZSk7XG4gICAgY29uc3QgbWVzc2FnZUVsZW1lbnQgPSByZWdpc3RlcmVkTWVzc2FnZSAmJiByZWdpc3RlcmVkTWVzc2FnZS5tZXNzYWdlRWxlbWVudDtcbiAgICBpZiAobWVzc2FnZXNDb250YWluZXIgJiYgbWVzc2FnZUVsZW1lbnQpIHtcbiAgICAgIG1lc3NhZ2VzQ29udGFpbmVyLnJlbW92ZUNoaWxkKG1lc3NhZ2VFbGVtZW50KTtcbiAgICB9XG4gICAgbWVzc2FnZVJlZ2lzdHJ5LmRlbGV0ZShtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGVzIHRoZSBnbG9iYWwgY29udGFpbmVyIGZvciBhbGwgYXJpYS1kZXNjcmliZWRieSBtZXNzYWdlcy4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlTWVzc2FnZXNDb250YWluZXIoKSB7XG4gICAgaWYgKCFtZXNzYWdlc0NvbnRhaW5lcikge1xuICAgICAgY29uc3QgcHJlRXhpc3RpbmdDb250YWluZXIgPSB0aGlzLl9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChNRVNTQUdFU19DT05UQUlORVJfSUQpO1xuXG4gICAgICAvLyBXaGVuIGdvaW5nIGZyb20gdGhlIHNlcnZlciB0byB0aGUgY2xpZW50LCB3ZSBtYXkgZW5kIHVwIGluIGEgc2l0dWF0aW9uIHdoZXJlIHRoZXJlJ3NcbiAgICAgIC8vIGFscmVhZHkgYSBjb250YWluZXIgb24gdGhlIHBhZ2UsIGJ1dCB3ZSBkb24ndCBoYXZlIGEgcmVmZXJlbmNlIHRvIGl0LiBDbGVhciB0aGVcbiAgICAgIC8vIG9sZCBjb250YWluZXIgc28gd2UgZG9uJ3QgZ2V0IGR1cGxpY2F0ZXMuIERvaW5nIHRoaXMsIGluc3RlYWQgb2YgZW1wdHlpbmcgdGhlIHByZXZpb3VzXG4gICAgICAvLyBjb250YWluZXIsIHNob3VsZCBiZSBzbGlnaHRseSBmYXN0ZXIuXG4gICAgICBpZiAocHJlRXhpc3RpbmdDb250YWluZXIpIHtcbiAgICAgICAgcHJlRXhpc3RpbmdDb250YWluZXIucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQocHJlRXhpc3RpbmdDb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICBtZXNzYWdlc0NvbnRhaW5lciA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbWVzc2FnZXNDb250YWluZXIuaWQgPSBNRVNTQUdFU19DT05UQUlORVJfSUQ7XG4gICAgICBtZXNzYWdlc0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgIG1lc3NhZ2VzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLl9kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1lc3NhZ2VzQ29udGFpbmVyKTtcbiAgICB9XG4gIH1cblxuICAvKiogRGVsZXRlcyB0aGUgZ2xvYmFsIG1lc3NhZ2VzIGNvbnRhaW5lci4gKi9cbiAgcHJpdmF0ZSBfZGVsZXRlTWVzc2FnZXNDb250YWluZXIoKSB7XG4gICAgaWYgKG1lc3NhZ2VzQ29udGFpbmVyICYmIG1lc3NhZ2VzQ29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIG1lc3NhZ2VzQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWVzc2FnZXNDb250YWluZXIpO1xuICAgICAgbWVzc2FnZXNDb250YWluZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZW1vdmVzIGFsbCBjZGstZGVzY3JpYmVkYnkgbWVzc2FnZXMgdGhhdCBhcmUgaG9zdGVkIHRocm91Z2ggdGhlIGVsZW1lbnQuICovXG4gIHByaXZhdGUgX3JlbW92ZUNka0Rlc2NyaWJlZEJ5UmVmZXJlbmNlSWRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICAvLyBSZW1vdmUgYWxsIGFyaWEtZGVzY3JpYmVkYnkgcmVmZXJlbmNlIElEcyB0aGF0IGFyZSBwcmVmaXhlZCBieSBDREtfREVTQ1JJQkVEQllfSURfUFJFRklYXG4gICAgY29uc3Qgb3JpZ2luYWxSZWZlcmVuY2VJZHMgPSBnZXRBcmlhUmVmZXJlbmNlSWRzKGVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgICAgICAgLmZpbHRlcihpZCA9PiBpZC5pbmRleE9mKENES19ERVNDUklCRURCWV9JRF9QUkVGSVgpICE9IDApO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5Jywgb3JpZ2luYWxSZWZlcmVuY2VJZHMuam9pbignICcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWVzc2FnZSByZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgdXNpbmcgYXJpYS1kZXNjcmliZWRieSBhbmQgaW5jcmVtZW50cyB0aGUgcmVnaXN0ZXJlZFxuICAgKiBtZXNzYWdlJ3MgcmVmZXJlbmNlIGNvdW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfYWRkTWVzc2FnZVJlZmVyZW5jZShlbGVtZW50OiBFbGVtZW50LCBtZXNzYWdlOiBzdHJpbmd8SFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCByZWdpc3RlcmVkTWVzc2FnZSA9IG1lc3NhZ2VSZWdpc3RyeS5nZXQobWVzc2FnZSkhO1xuXG4gICAgLy8gQWRkIHRoZSBhcmlhLWRlc2NyaWJlZGJ5IHJlZmVyZW5jZSBhbmQgc2V0IHRoZVxuICAgIC8vIGRlc2NyaWJlZGJ5X2hvc3QgYXR0cmlidXRlIHRvIG1hcmsgdGhlIGVsZW1lbnQuXG4gICAgYWRkQXJpYVJlZmVyZW5jZWRJZChlbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScsIHJlZ2lzdGVyZWRNZXNzYWdlLm1lc3NhZ2VFbGVtZW50LmlkKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShDREtfREVTQ1JJQkVEQllfSE9TVF9BVFRSSUJVVEUsICcnKTtcblxuICAgIHJlZ2lzdGVyZWRNZXNzYWdlLnJlZmVyZW5jZUNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIG1lc3NhZ2UgcmVmZXJlbmNlIGZyb20gdGhlIGVsZW1lbnQgdXNpbmcgYXJpYS1kZXNjcmliZWRieVxuICAgKiBhbmQgZGVjcmVtZW50cyB0aGUgcmVnaXN0ZXJlZCBtZXNzYWdlJ3MgcmVmZXJlbmNlIGNvdW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVtb3ZlTWVzc2FnZVJlZmVyZW5jZShlbGVtZW50OiBFbGVtZW50LCBtZXNzYWdlOiBzdHJpbmd8SFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCByZWdpc3RlcmVkTWVzc2FnZSA9IG1lc3NhZ2VSZWdpc3RyeS5nZXQobWVzc2FnZSkhO1xuICAgIHJlZ2lzdGVyZWRNZXNzYWdlLnJlZmVyZW5jZUNvdW50LS07XG5cbiAgICByZW1vdmVBcmlhUmVmZXJlbmNlZElkKGVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgcmVnaXN0ZXJlZE1lc3NhZ2UubWVzc2FnZUVsZW1lbnQuaWQpO1xuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKENES19ERVNDUklCRURCWV9IT1NUX0FUVFJJQlVURSk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIGRlc2NyaWJlZCBieSB0aGUgcHJvdmlkZWQgbWVzc2FnZSBJRC4gKi9cbiAgcHJpdmF0ZSBfaXNFbGVtZW50RGVzY3JpYmVkQnlNZXNzYWdlKGVsZW1lbnQ6IEVsZW1lbnQsIG1lc3NhZ2U6IHN0cmluZ3xIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlZmVyZW5jZUlkcyA9IGdldEFyaWFSZWZlcmVuY2VJZHMoZWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknKTtcbiAgICBjb25zdCByZWdpc3RlcmVkTWVzc2FnZSA9IG1lc3NhZ2VSZWdpc3RyeS5nZXQobWVzc2FnZSk7XG4gICAgY29uc3QgbWVzc2FnZUlkID0gcmVnaXN0ZXJlZE1lc3NhZ2UgJiYgcmVnaXN0ZXJlZE1lc3NhZ2UubWVzc2FnZUVsZW1lbnQuaWQ7XG5cbiAgICByZXR1cm4gISFtZXNzYWdlSWQgJiYgcmVmZXJlbmNlSWRzLmluZGV4T2YobWVzc2FnZUlkKSAhPSAtMTtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBtZXNzYWdlIGNhbiBiZSBkZXNjcmliZWQgb24gYSBwYXJ0aWN1bGFyIGVsZW1lbnQuICovXG4gIHByaXZhdGUgX2NhbkJlRGVzY3JpYmVkKGVsZW1lbnQ6IEVsZW1lbnQsIG1lc3NhZ2U6IHN0cmluZ3xIVE1MRWxlbWVudHx2b2lkKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9pc0VsZW1lbnROb2RlKGVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBXZSdkIGhhdmUgdG8gbWFrZSBzb21lIGFzc3VtcHRpb25zIGFib3V0IHRoZSBkZXNjcmlwdGlvbiBlbGVtZW50J3MgdGV4dCwgaWYgdGhlIGNvbnN1bWVyXG4gICAgICAvLyBwYXNzZWQgaW4gYW4gZWxlbWVudC4gQXNzdW1lIHRoYXQgaWYgYW4gZWxlbWVudCBpcyBwYXNzZWQgaW4sIHRoZSBjb25zdW1lciBoYXMgdmVyaWZpZWRcbiAgICAgIC8vIHRoYXQgaXQgY2FuIGJlIHVzZWQgYXMgYSBkZXNjcmlwdGlvbi5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHRyaW1tZWRNZXNzYWdlID0gbWVzc2FnZSA9PSBudWxsID8gJycgOiBgJHttZXNzYWdlfWAudHJpbSgpO1xuICAgIGNvbnN0IGFyaWFMYWJlbCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyk7XG5cbiAgICAvLyBXZSBzaG91bGRuJ3Qgc2V0IGRlc2NyaXB0aW9ucyBpZiB0aGV5J3JlIGV4YWN0bHkgdGhlIHNhbWUgYXMgdGhlIGBhcmlhLWxhYmVsYCBvZiB0aGVcbiAgICAvLyBlbGVtZW50LCBiZWNhdXNlIHNjcmVlbiByZWFkZXJzIHdpbGwgZW5kIHVwIHJlYWRpbmcgb3V0IHRoZSBzYW1lIHRleHQgdHdpY2UgaW4gYSByb3cuXG4gICAgcmV0dXJuIHRyaW1tZWRNZXNzYWdlID8gKCFhcmlhTGFiZWwgfHwgYXJpYUxhYmVsLnRyaW0oKSAhPT0gdHJpbW1lZE1lc3NhZ2UpIDogZmFsc2U7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgYSBub2RlIGlzIGFuIEVsZW1lbnQgbm9kZS4gKi9cbiAgcHJpdmF0ZSBfaXNFbGVtZW50Tm9kZShlbGVtZW50OiBOb2RlKTogZWxlbWVudCBpcyBFbGVtZW50IHtcbiAgICByZXR1cm4gZWxlbWVudC5ub2RlVHlwZSA9PT0gdGhpcy5fZG9jdW1lbnQuRUxFTUVOVF9OT0RFO1xuICB9XG59XG4iXX0=