/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createFakeEvent, createKeyboardEvent, createMouseEvent, createPointerEvent, createTouchEvent, } from './event-objects';
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
 * Shorthand to dispatch a keyboard event with a specified key code and
 * optional modifiers.
 * @docs-private
 */
export function dispatchKeyboardEvent(node, type, keyCode, key, modifiers) {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode, key, modifiers));
}
/**
 * Shorthand to dispatch a mouse event on the specified coordinates.
 * @docs-private
 */
export function dispatchMouseEvent(node, type, clientX = 0, clientY = 0, button, modifiers) {
    return dispatchEvent(node, createMouseEvent(type, clientX, clientY, button, modifiers));
}
/**
 * Shorthand to dispatch a pointer event on the specified coordinates.
 * @docs-private
 */
export function dispatchPointerEvent(node, type, clientX = 0, clientY = 0, options) {
    return dispatchEvent(node, createPointerEvent(type, clientX, clientY, options));
}
/**
 * Shorthand to dispatch a touch event on the specified coordinates.
 * @docs-private
 */
export function dispatchTouchEvent(node, type, x = 0, y = 0) {
    return dispatchEvent(node, createTouchEvent(type, x, y));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2gtZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay90ZXN0aW5nL3Rlc3RiZWQvZmFrZS1ldmVudHMvZGlzcGF0Y2gtZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFDTCxlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsZ0JBQWdCLEdBQ2pCLE1BQU0saUJBQWlCLENBQUM7QUFFekI7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBa0IsSUFBbUIsRUFBRSxLQUFRO0lBQzFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLElBQW1CLEVBQUUsSUFBWSxFQUFFLFNBQW1CO0lBQ3RGLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQUMsSUFBVSxFQUFFLElBQVksRUFBRSxPQUFnQixFQUFFLEdBQVksRUFDeEQsU0FBd0I7SUFDNUQsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUNyQixtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUUsSUFBVSxFQUFFLElBQVksRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQ3BGLE1BQWUsRUFBRSxTQUF3QjtJQUN6QyxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDMUYsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxJQUFVLEVBQUUsSUFBWSxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFDbEQsT0FBMEI7SUFDN0QsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFpQixDQUFDO0FBQ2xHLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBVSxFQUFFLElBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ3ZFLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge01vZGlmaWVyS2V5c30gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRmFrZUV2ZW50LFxuICBjcmVhdGVLZXlib2FyZEV2ZW50LFxuICBjcmVhdGVNb3VzZUV2ZW50LFxuICBjcmVhdGVQb2ludGVyRXZlbnQsXG4gIGNyZWF0ZVRvdWNoRXZlbnQsXG59IGZyb20gJy4vZXZlbnQtb2JqZWN0cyc7XG5cbi8qKlxuICogVXRpbGl0eSB0byBkaXNwYXRjaCBhbnkgZXZlbnQgb24gYSBOb2RlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudDxUIGV4dGVuZHMgRXZlbnQ+KG5vZGU6IE5vZGUgfCBXaW5kb3csIGV2ZW50OiBUKTogVCB7XG4gIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIHJldHVybiBldmVudDtcbn1cblxuLyoqXG4gKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSBmYWtlIGV2ZW50IG9uIGEgc3BlY2lmaWVkIG5vZGUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEZha2VFdmVudChub2RlOiBOb2RlIHwgV2luZG93LCB0eXBlOiBzdHJpbmcsIGNhbkJ1YmJsZT86IGJvb2xlYW4pOiBFdmVudCB7XG4gIHJldHVybiBkaXNwYXRjaEV2ZW50KG5vZGUsIGNyZWF0ZUZha2VFdmVudCh0eXBlLCBjYW5CdWJibGUpKTtcbn1cblxuLyoqXG4gKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSBrZXlib2FyZCBldmVudCB3aXRoIGEgc3BlY2lmaWVkIGtleSBjb2RlIGFuZFxuICogb3B0aW9uYWwgbW9kaWZpZXJzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hLZXlib2FyZEV2ZW50KG5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywga2V5Q29kZT86IG51bWJlciwga2V5Pzogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcnM/OiBNb2RpZmllcktleXMpOiBLZXlib2FyZEV2ZW50IHtcbiAgcmV0dXJuIGRpc3BhdGNoRXZlbnQobm9kZSxcbiAgICAgIGNyZWF0ZUtleWJvYXJkRXZlbnQodHlwZSwga2V5Q29kZSwga2V5LCBtb2RpZmllcnMpKTtcbn1cblxuLyoqXG4gKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSBtb3VzZSBldmVudCBvbiB0aGUgc3BlY2lmaWVkIGNvb3JkaW5hdGVzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hNb3VzZUV2ZW50KCBub2RlOiBOb2RlLCB0eXBlOiBzdHJpbmcsIGNsaWVudFggPSAwLCBjbGllbnRZID0gMCxcbiAgYnV0dG9uPzogbnVtYmVyLCBtb2RpZmllcnM/OiBNb2RpZmllcktleXMpOiBNb3VzZUV2ZW50IHtcbiAgcmV0dXJuIGRpc3BhdGNoRXZlbnQobm9kZSwgY3JlYXRlTW91c2VFdmVudCh0eXBlLCBjbGllbnRYLCBjbGllbnRZLCBidXR0b24sIG1vZGlmaWVycykpO1xufVxuXG4vKipcbiAqIFNob3J0aGFuZCB0byBkaXNwYXRjaCBhIHBvaW50ZXIgZXZlbnQgb24gdGhlIHNwZWNpZmllZCBjb29yZGluYXRlcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoUG9pbnRlckV2ZW50KG5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywgY2xpZW50WCA9IDAsIGNsaWVudFkgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM/OiBQb2ludGVyRXZlbnRJbml0KTogUG9pbnRlckV2ZW50IHtcbiAgcmV0dXJuIGRpc3BhdGNoRXZlbnQobm9kZSwgY3JlYXRlUG9pbnRlckV2ZW50KHR5cGUsIGNsaWVudFgsIGNsaWVudFksIG9wdGlvbnMpKSBhcyBQb2ludGVyRXZlbnQ7XG59XG5cbi8qKlxuICogU2hvcnRoYW5kIHRvIGRpc3BhdGNoIGEgdG91Y2ggZXZlbnQgb24gdGhlIHNwZWNpZmllZCBjb29yZGluYXRlcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoVG91Y2hFdmVudChub2RlOiBOb2RlLCB0eXBlOiBzdHJpbmcsIHggPSAwLCB5ID0gMCkge1xuICByZXR1cm4gZGlzcGF0Y2hFdmVudChub2RlLCBjcmVhdGVUb3VjaEV2ZW50KHR5cGUsIHgsIHkpKTtcbn1cbiJdfQ==