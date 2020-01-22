/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Creates a browser MouseEvent with the specified options.
 * @docs-private
 */
export function createMouseEvent(type, x = 0, y = 0, button = 0) {
    const event = document.createEvent('MouseEvent');
    const originalPreventDefault = event.preventDefault;
    event.initMouseEvent(type, true, /* canBubble */ true, /* cancelable */ window, /* view */ 0, /* detail */ x, /* screenX */ y, /* screenY */ x, /* clientX */ y, /* clientY */ false, /* ctrlKey */ false, /* altKey */ false, /* shiftKey */ false, /* metaKey */ button, /* button */ null /* relatedTarget */);
    // `initMouseEvent` doesn't allow us to pass the `buttons` and
    // defaults it to 0 which looks like a fake event.
    Object.defineProperty(event, 'buttons', { get: () => 1 });
    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function () {
        Object.defineProperty(event, 'defaultPrevented', { get: () => true });
        return originalPreventDefault.apply(this, arguments);
    };
    return event;
}
/**
 * Creates a browser TouchEvent with the specified pointer coordinates.
 * @docs-private
 */
export function createTouchEvent(type, pageX = 0, pageY = 0) {
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    const event = document.createEvent('UIEvent');
    const touchDetails = { pageX, pageY };
    // TS3.6 removes the initUIEvent method and suggests porting to "new UIEvent()".
    event.initUIEvent(type, true, true, window, 0);
    // Most of the browsers don't have a "initTouchEvent" method that can be used to define
    // the touch details.
    Object.defineProperties(event, {
        touches: { value: [touchDetails] },
        targetTouches: { value: [touchDetails] },
        changedTouches: { value: [touchDetails] }
    });
    return event;
}
/**
 * Dispatches a keydown event from an element.
 * @docs-private
 */
export function createKeyboardEvent(type, keyCode = 0, key = '', target, modifiers = {}) {
    const event = document.createEvent('KeyboardEvent');
    const originalPreventDefault = event.preventDefault;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    if (event.initKeyEvent) {
        event.initKeyEvent(type, true, true, window, modifiers.control, modifiers.alt, modifiers.shift, modifiers.meta, keyCode);
    }
    else {
        // `initKeyboardEvent` expects to receive modifiers as a whitespace-delimited string
        // See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent
        let modifiersList = '';
        if (modifiers.control) {
            modifiersList += 'Control ';
        }
        if (modifiers.alt) {
            modifiersList += 'Alt ';
        }
        if (modifiers.shift) {
            modifiersList += 'Shift ';
        }
        if (modifiers.meta) {
            modifiersList += 'Meta ';
        }
        event.initKeyboardEvent(type, true, /* canBubble */ true, /* cancelable */ window, /* view */ 0, /* char */ key, /* key */ 0, /* location */ modifiersList.trim(), /* modifiersList */ false /* repeat */);
    }
    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
        keyCode: { get: () => keyCode },
        key: { get: () => key },
        target: { get: () => target },
        ctrlKey: { get: () => !!modifiers.control },
        altKey: { get: () => !!modifiers.alt },
        shiftKey: { get: () => !!modifiers.shift },
        metaKey: { get: () => !!modifiers.meta }
    });
    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function () {
        Object.defineProperty(event, 'defaultPrevented', { get: () => true });
        return originalPreventDefault.apply(this, arguments);
    };
    return event;
}
/**
 * Creates a fake event object with any desired event type.
 * @docs-private
 */
export function createFakeEvent(type, canBubble = false, cancelable = true) {
    const event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtb2JqZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGsvdGVzdGluZy90ZXN0YmVkL2Zha2UtZXZlbnRzL2V2ZW50LW9iamVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBSUg7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUM7SUFDckUsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxNQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7SUFFcEQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQ3ZCLElBQUksRUFBRSxlQUFlLENBQ3JCLElBQUksRUFBRSxnQkFBZ0IsQ0FDdEIsTUFBTSxFQUFFLFVBQVUsQ0FDbEIsQ0FBQyxFQUFFLFlBQVksQ0FDZixDQUFDLEVBQUUsYUFBYSxDQUNoQixDQUFDLEVBQUUsYUFBYSxDQUNoQixDQUFDLEVBQUUsYUFBYSxDQUNoQixDQUFDLEVBQUUsYUFBYSxDQUNoQixLQUFLLEVBQUUsYUFBYSxDQUNwQixLQUFLLEVBQUUsWUFBWSxDQUNuQixLQUFLLEVBQUUsY0FBYyxDQUNyQixLQUFLLEVBQUUsYUFBYSxDQUNwQixNQUFNLEVBQUUsWUFBWSxDQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUU1Qiw4REFBOEQ7SUFDOUQsa0RBQWtEO0lBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBRXhELG9GQUFvRjtJQUNwRixLQUFLLENBQUMsY0FBYyxHQUFHO1FBQ3JCLE1BQU0sQ0FB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QUFDLENBQUM7SUFDN0MsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TW9kaWZpZXJLZXlzfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJyb3dzZXIgTW91c2VFdmVudCB3aXRoIHRoZSBzcGVjaWZpZWQgb3B0aW9ucy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1vdXNlRXZlbnQodHlwZTogc3RyaW5nLCB4ID0gMCwgeSA9IDAsIGJ1dHRvbiA9IDApIHtcbiAgY29uc3QgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuICBjb25zdCBvcmlnaW5hbFByZXZlbnREZWZhdWx0ID0gZXZlbnQucHJldmVudERlZmF1bHQ7XG5cbiAgZXZlbnQuaW5pdE1vdXNlRXZlbnQodHlwZSxcbiAgICB0cnVlLCAvKiBjYW5CdWJibGUgKi9cbiAgICB0cnVlLCAvKiBjYW5jZWxhYmxlICovXG4gICAgd2luZG93LCAvKiB2aWV3ICovXG4gICAgMCwgLyogZGV0YWlsICovXG4gICAgeCwgLyogc2NyZWVuWCAqL1xuICAgIHksIC8qIHNjcmVlblkgKi9cbiAgICB4LCAvKiBjbGllbnRYICovXG4gICAgeSwgLyogY2xpZW50WSAqL1xuICAgIGZhbHNlLCAvKiBjdHJsS2V5ICovXG4gICAgZmFsc2UsIC8qIGFsdEtleSAqL1xuICAgIGZhbHNlLCAvKiBzaGlmdEtleSAqL1xuICAgIGZhbHNlLCAvKiBtZXRhS2V5ICovXG4gICAgYnV0dG9uLCAvKiBidXR0b24gKi9cbiAgICBudWxsIC8qIHJlbGF0ZWRUYXJnZXQgKi8pO1xuXG4gIC8vIGBpbml0TW91c2VFdmVudGAgZG9lc24ndCBhbGxvdyB1cyB0byBwYXNzIHRoZSBgYnV0dG9uc2AgYW5kXG4gIC8vIGRlZmF1bHRzIGl0IHRvIDAgd2hpY2ggbG9va3MgbGlrZSBhIGZha2UgZXZlbnQuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2J1dHRvbnMnLCB7Z2V0OiAoKSA9PiAxfSk7XG5cbiAgLy8gSUUgd29uJ3Qgc2V0IGBkZWZhdWx0UHJldmVudGVkYCBvbiBzeW50aGV0aWMgZXZlbnRzIHNvIHdlIG5lZWQgdG8gZG8gaXQgbWFudWFsbHkuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAnZGVmYXVsdFByZXZlbnRlZCcsIHsgZ2V0OiAoKSA9PiB0cnVlIH0pO1xuICAgIHJldHVybiBvcmlnaW5hbFByZXZlbnREZWZhdWx0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgcmV0dXJuIGV2ZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBicm93c2VyIFRvdWNoRXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUb3VjaEV2ZW50KHR5cGU6IHN0cmluZywgcGFnZVggPSAwLCBwYWdlWSA9IDApIHtcbiAgLy8gSW4gZmF2b3Igb2YgY3JlYXRpbmcgZXZlbnRzIHRoYXQgd29yayBmb3IgbW9zdCBvZiB0aGUgYnJvd3NlcnMsIHRoZSBldmVudCBpcyBjcmVhdGVkXG4gIC8vIGFzIGEgYmFzaWMgVUkgRXZlbnQuIFRoZSBuZWNlc3NhcnkgZGV0YWlscyBmb3IgdGhlIGV2ZW50IHdpbGwgYmUgc2V0IG1hbnVhbGx5LlxuICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdVSUV2ZW50Jyk7XG4gIGNvbnN0IHRvdWNoRGV0YWlscyA9IHtwYWdlWCwgcGFnZVl9O1xuXG4gIC8vIFRTMy42IHJlbW92ZXMgdGhlIGluaXRVSUV2ZW50IG1ldGhvZCBhbmQgc3VnZ2VzdHMgcG9ydGluZyB0byBcIm5ldyBVSUV2ZW50KClcIi5cbiAgKGV2ZW50IGFzIGFueSkuaW5pdFVJRXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAwKTtcblxuICAvLyBNb3N0IG9mIHRoZSBicm93c2VycyBkb24ndCBoYXZlIGEgXCJpbml0VG91Y2hFdmVudFwiIG1ldGhvZCB0aGF0IGNhbiBiZSB1c2VkIHRvIGRlZmluZVxuICAvLyB0aGUgdG91Y2ggZGV0YWlscy5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZXZlbnQsIHtcbiAgICB0b3VjaGVzOiB7dmFsdWU6IFt0b3VjaERldGFpbHNdfSxcbiAgICB0YXJnZXRUb3VjaGVzOiB7dmFsdWU6IFt0b3VjaERldGFpbHNdfSxcbiAgICBjaGFuZ2VkVG91Y2hlczoge3ZhbHVlOiBbdG91Y2hEZXRhaWxzXX1cbiAgfSk7XG5cbiAgcmV0dXJuIGV2ZW50O1xufVxuXG4vKipcbiAqIERpc3BhdGNoZXMgYSBrZXlkb3duIGV2ZW50IGZyb20gYW4gZWxlbWVudC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUtleWJvYXJkRXZlbnQodHlwZTogc3RyaW5nLCBrZXlDb2RlOiBudW1iZXIgPSAwLCBrZXk6IHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PzogRWxlbWVudCwgbW9kaWZpZXJzOiBNb2RpZmllcktleXMgPSB7fSkge1xuICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdLZXlib2FyZEV2ZW50JykgYXMgYW55O1xuICBjb25zdCBvcmlnaW5hbFByZXZlbnREZWZhdWx0ID0gZXZlbnQucHJldmVudERlZmF1bHQ7XG5cbiAgLy8gRmlyZWZveCBkb2VzIG5vdCBzdXBwb3J0IGBpbml0S2V5Ym9hcmRFdmVudGAsIGJ1dCBzdXBwb3J0cyBgaW5pdEtleUV2ZW50YC5cbiAgaWYgKGV2ZW50LmluaXRLZXlFdmVudCkge1xuICAgIGV2ZW50LmluaXRLZXlFdmVudCh0eXBlLCB0cnVlLCB0cnVlLCB3aW5kb3csIG1vZGlmaWVycy5jb250cm9sLCBtb2RpZmllcnMuYWx0LCBtb2RpZmllcnMuc2hpZnQsXG4gICAgICAgIG1vZGlmaWVycy5tZXRhLCBrZXlDb2RlKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBgaW5pdEtleWJvYXJkRXZlbnRgIGV4cGVjdHMgdG8gcmVjZWl2ZSBtb2RpZmllcnMgYXMgYSB3aGl0ZXNwYWNlLWRlbGltaXRlZCBzdHJpbmdcbiAgICAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0tleWJvYXJkRXZlbnQvaW5pdEtleWJvYXJkRXZlbnRcbiAgICBsZXQgbW9kaWZpZXJzTGlzdCA9ICcnO1xuXG4gICAgaWYgKG1vZGlmaWVycy5jb250cm9sKSB7XG4gICAgICBtb2RpZmllcnNMaXN0ICs9ICdDb250cm9sICc7XG4gICAgfVxuXG4gICAgaWYgKG1vZGlmaWVycy5hbHQpIHtcbiAgICAgIG1vZGlmaWVyc0xpc3QgKz0gJ0FsdCAnO1xuICAgIH1cblxuICAgIGlmIChtb2RpZmllcnMuc2hpZnQpIHtcbiAgICAgIG1vZGlmaWVyc0xpc3QgKz0gJ1NoaWZ0ICc7XG4gICAgfVxuXG4gICAgaWYgKG1vZGlmaWVycy5tZXRhKSB7XG4gICAgICBtb2RpZmllcnNMaXN0ICs9ICdNZXRhICc7XG4gICAgfVxuXG4gICAgZXZlbnQuaW5pdEtleWJvYXJkRXZlbnQodHlwZSxcbiAgICAgICAgdHJ1ZSwgLyogY2FuQnViYmxlICovXG4gICAgICAgIHRydWUsIC8qIGNhbmNlbGFibGUgKi9cbiAgICAgICAgd2luZG93LCAvKiB2aWV3ICovXG4gICAgICAgIDAsIC8qIGNoYXIgKi9cbiAgICAgICAga2V5LCAvKiBrZXkgKi9cbiAgICAgICAgMCwgLyogbG9jYXRpb24gKi9cbiAgICAgICAgbW9kaWZpZXJzTGlzdC50cmltKCksIC8qIG1vZGlmaWVyc0xpc3QgKi9cbiAgICAgICAgZmFsc2UgLyogcmVwZWF0ICovKTtcbiAgfVxuXG4gIC8vIFdlYmtpdCBCcm93c2VycyBkb24ndCBzZXQgdGhlIGtleUNvZGUgd2hlbiBjYWxsaW5nIHRoZSBpbml0IGZ1bmN0aW9uLlxuICAvLyBTZWUgcmVsYXRlZCBidWcgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE2NzM1XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGV2ZW50LCB7XG4gICAga2V5Q29kZTogeyBnZXQ6ICgpID0+IGtleUNvZGUgfSxcbiAgICBrZXk6IHsgZ2V0OiAoKSA9PiBrZXkgfSxcbiAgICB0YXJnZXQ6IHsgZ2V0OiAoKSA9PiB0YXJnZXQgfSxcbiAgICBjdHJsS2V5OiB7IGdldDogKCkgPT4gISFtb2RpZmllcnMuY29udHJvbCB9LFxuICAgIGFsdEtleTogeyBnZXQ6ICgpID0+ICEhbW9kaWZpZXJzLmFsdCB9LFxuICAgIHNoaWZ0S2V5OiB7IGdldDogKCkgPT4gISFtb2RpZmllcnMuc2hpZnQgfSxcbiAgICBtZXRhS2V5OiB7IGdldDogKCkgPT4gISFtb2RpZmllcnMubWV0YSB9XG4gIH0pO1xuXG4gIC8vIElFIHdvbid0IHNldCBgZGVmYXVsdFByZXZlbnRlZGAgb24gc3ludGhldGljIGV2ZW50cyBzbyB3ZSBuZWVkIHRvIGRvIGl0IG1hbnVhbGx5LlxuICBldmVudC5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2RlZmF1bHRQcmV2ZW50ZWQnLCB7IGdldDogKCkgPT4gdHJ1ZSB9KTtcbiAgICByZXR1cm4gb3JpZ2luYWxQcmV2ZW50RGVmYXVsdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJldHVybiBldmVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZmFrZSBldmVudCBvYmplY3Qgd2l0aCBhbnkgZGVzaXJlZCBldmVudCB0eXBlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmFrZUV2ZW50KHR5cGU6IHN0cmluZywgY2FuQnViYmxlID0gZmFsc2UsIGNhbmNlbGFibGUgPSB0cnVlKSB7XG4gIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gIGV2ZW50LmluaXRFdmVudCh0eXBlLCBjYW5CdWJibGUsIGNhbmNlbGFibGUpO1xuICByZXR1cm4gZXZlbnQ7XG59XG4iXX0=