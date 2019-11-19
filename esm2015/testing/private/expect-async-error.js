/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
/**
 * Expects the asynchronous function to throw an error that matches
 * the specified expectation.
 */
export function expectAsyncError(fn, expectation) {
    return __awaiter(this, void 0, void 0, function* () {
        let error = null;
        try {
            yield fn();
        }
        catch (e) {
            error = e.toString();
        }
        expect(error).not.toBe(null);
        if (expectation instanceof RegExp) {
            expect(error).toMatch(expectation, 'Expected error to be thrown.');
        }
        else {
            expect(error).toBe(expectation, 'Expected error to be throw.');
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZWN0LWFzeW5jLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay90ZXN0aW5nL3ByaXZhdGUvZXhwZWN0LWFzeW5jLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSDs7O0dBR0c7QUFDSCxNQUFNLFVBQWdCLGdCQUFnQixDQUFDLEVBQXNCLEVBQUUsV0FBNEI7O1FBQ3pGLElBQUksS0FBSyxHQUFnQixJQUFJLENBQUM7UUFDOUIsSUFBSTtZQUNGLE1BQU0sRUFBRSxFQUFFLENBQUM7U0FDWjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN0QjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksV0FBVyxZQUFZLE1BQU0sRUFBRTtZQUNqQyxNQUFNLENBQUMsS0FBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO1NBQ3JFO2FBQU07WUFDTCxNQUFNLENBQUMsS0FBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogRXhwZWN0cyB0aGUgYXN5bmNocm9ub3VzIGZ1bmN0aW9uIHRvIHRocm93IGFuIGVycm9yIHRoYXQgbWF0Y2hlc1xuICogdGhlIHNwZWNpZmllZCBleHBlY3RhdGlvbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4cGVjdEFzeW5jRXJyb3IoZm46ICgpID0+IFByb21pc2U8YW55PiwgZXhwZWN0YXRpb246IFJlZ0V4cCB8IHN0cmluZykge1xuICBsZXQgZXJyb3I6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBhd2FpdCBmbigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyb3IgPSBlLnRvU3RyaW5nKCk7XG4gIH1cbiAgZXhwZWN0KGVycm9yKS5ub3QudG9CZShudWxsKTtcbiAgaWYgKGV4cGVjdGF0aW9uIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgZXhwZWN0KGVycm9yISkudG9NYXRjaChleHBlY3RhdGlvbiwgJ0V4cGVjdGVkIGVycm9yIHRvIGJlIHRocm93bi4nKTtcbiAgfSBlbHNlIHtcbiAgICBleHBlY3QoZXJyb3IhKS50b0JlKGV4cGVjdGF0aW9uLCAnRXhwZWN0ZWQgZXJyb3IgdG8gYmUgdGhyb3cuJyk7XG4gIH1cbn1cbiJdfQ==