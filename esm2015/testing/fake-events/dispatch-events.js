/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createFakeEvent, createKeyboardEvent, createMouseEvent, createTouchEvent } from './event-objects';
/**
 * Utility to dispatch any event on a Node.
 * @docs-private
 */
export function dispatchEvent(node, event) {
    node.dispatchEvent(event);
    return event;
}
/**
 * Shorthand to dispatch a fake event on a specified node.
 * @docs-private
 */
export function dispatchFakeEvent(node, type, canBubble) {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
}
/**
 * Shorthand to dispatch a keyboard event with a specified key code.
 * @docs-private
 */
export function dispatchKeyboardEvent(node, type, keyCode, key, target, modifiers) {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode, key, target, modifiers));
}
/**
 * Shorthand to dispatch a mouse event on the specified coordinates.
 * @docs-private
 */
export function dispatchMouseEvent(node, type, x = 0, y = 0, event = createMouseEvent(type, x, y)) {
    return dispatchEvent(node, event);
}
/**
 * Shorthand to dispatch a touch event on the specified coordinates.
 * @docs-private
 */
export function dispatchTouchEvent(node, type, x = 0, y = 0) {
    return dispatchEvent(node, createTouchEvent(type, x, y));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2gtZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay90ZXN0aW5nL2Zha2UtZXZlbnRzL2Rpc3BhdGNoLWV2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBRWpCLE1BQU0saUJBQWlCLENBQUM7QUFFekI7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFtQixFQUFFLEtBQVk7SUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBbUIsRUFBRSxJQUFZLEVBQUUsU0FBbUI7SUFDdEYsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQVUsRUFBRSxJQUFZLEVBQUUsT0FBZ0IsRUFBRSxHQUFZLEVBQ3hELE1BQWdCLEVBQUUsU0FBd0I7SUFDOUUsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUNyQixtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQWtCLENBQUM7QUFDbkYsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxJQUFVLEVBQUUsSUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDdkUsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQWUsQ0FBQztBQUNsRCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLElBQVUsRUFBRSxJQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUN2RSxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgY3JlYXRlRmFrZUV2ZW50LFxuICBjcmVhdGVLZXlib2FyZEV2ZW50LFxuICBjcmVhdGVNb3VzZUV2ZW50LFxuICBjcmVhdGVUb3VjaEV2ZW50LFxuICBNb2RpZmllcktleXNcbn0gZnJvbSAnLi9ldmVudC1vYmplY3RzJztcblxuLyoqXG4gKiBVdGlsaXR5IHRvIGRpc3BhdGNoIGFueSBldmVudCBvbiBhIE5vZGUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KG5vZGU6IE5vZGUgfCBXaW5kb3csIGV2ZW50OiBFdmVudCk6IEV2ZW50IHtcbiAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgcmV0dXJuIGV2ZW50O1xufVxuXG4vKipcbiAqIFNob3J0aGFuZCB0byBkaXNwYXRjaCBhIGZha2UgZXZlbnQgb24gYSBzcGVjaWZpZWQgbm9kZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRmFrZUV2ZW50KG5vZGU6IE5vZGUgfCBXaW5kb3csIHR5cGU6IHN0cmluZywgY2FuQnViYmxlPzogYm9vbGVhbik6IEV2ZW50IHtcbiAgcmV0dXJuIGRpc3BhdGNoRXZlbnQobm9kZSwgY3JlYXRlRmFrZUV2ZW50KHR5cGUsIGNhbkJ1YmJsZSkpO1xufVxuXG4vKipcbiAqIFNob3J0aGFuZCB0byBkaXNwYXRjaCBhIGtleWJvYXJkIGV2ZW50IHdpdGggYSBzcGVjaWZpZWQga2V5IGNvZGUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEtleWJvYXJkRXZlbnQobm9kZTogTm9kZSwgdHlwZTogc3RyaW5nLCBrZXlDb2RlPzogbnVtYmVyLCBrZXk/OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD86IEVsZW1lbnQsIG1vZGlmaWVycz86IE1vZGlmaWVyS2V5cyk6IEtleWJvYXJkRXZlbnQge1xuICByZXR1cm4gZGlzcGF0Y2hFdmVudChub2RlLFxuICAgICAgY3JlYXRlS2V5Ym9hcmRFdmVudCh0eXBlLCBrZXlDb2RlLCBrZXksIHRhcmdldCwgbW9kaWZpZXJzKSkgYXMgS2V5Ym9hcmRFdmVudDtcbn1cblxuLyoqXG4gKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSBtb3VzZSBldmVudCBvbiB0aGUgc3BlY2lmaWVkIGNvb3JkaW5hdGVzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hNb3VzZUV2ZW50KG5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywgeCA9IDAsIHkgPSAwLFxuICBldmVudCA9IGNyZWF0ZU1vdXNlRXZlbnQodHlwZSwgeCwgeSkpOiBNb3VzZUV2ZW50IHtcbiAgcmV0dXJuIGRpc3BhdGNoRXZlbnQobm9kZSwgZXZlbnQpIGFzIE1vdXNlRXZlbnQ7XG59XG5cbi8qKlxuICogU2hvcnRoYW5kIHRvIGRpc3BhdGNoIGEgdG91Y2ggZXZlbnQgb24gdGhlIHNwZWNpZmllZCBjb29yZGluYXRlcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoVG91Y2hFdmVudChub2RlOiBOb2RlLCB0eXBlOiBzdHJpbmcsIHggPSAwLCB5ID0gMCkge1xuICByZXR1cm4gZGlzcGF0Y2hFdmVudChub2RlLCBjcmVhdGVUb3VjaEV2ZW50KHR5cGUsIHgsIHkpKTtcbn1cbiJdfQ==