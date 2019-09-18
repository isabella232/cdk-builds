/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef } from '@angular/core';
/**
 * Coerces an ElementRef or an Element into an element.
 * Useful for APIs that can accept either a ref or the native element itself.
 */
export function coerceElement(elementOrRef) {
    return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGsvY29lcmNpb24vZWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDOzs7R0FHRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUksWUFBK0I7SUFDOUQsT0FBTyxZQUFZLFlBQVksVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFDeEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENvZXJjZXMgYW4gRWxlbWVudFJlZiBvciBhbiBFbGVtZW50IGludG8gYW4gZWxlbWVudC5cbiAqIFVzZWZ1bCBmb3IgQVBJcyB0aGF0IGNhbiBhY2NlcHQgZWl0aGVyIGEgcmVmIG9yIHRoZSBuYXRpdmUgZWxlbWVudCBpdHNlbGYuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2VyY2VFbGVtZW50PFQ+KGVsZW1lbnRPclJlZjogRWxlbWVudFJlZjxUPiB8IFQpOiBUIHtcbiAgcmV0dXJuIGVsZW1lbnRPclJlZiBpbnN0YW5jZW9mIEVsZW1lbnRSZWYgPyBlbGVtZW50T3JSZWYubmF0aXZlRWxlbWVudCA6IGVsZW1lbnRPclJlZjtcbn1cbiJdfQ==