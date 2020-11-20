/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { BehaviorSubject } from 'rxjs';
/** Subject used to dispatch and listen for changes to the auto change detection status . */
const autoChangeDetectionSubject = new BehaviorSubject({
    isDisabled: false
});
/** The current subscription to `autoChangeDetectionSubject`. */
let autoChangeDetectionSubscription;
/**
 * The default handler for auto change detection status changes. This handler will be used if the
 * specific environment does not install its own.
 * @param status The new auto change detection status.
 */
function defaultAutoChangeDetectionHandler(status) {
    var _a;
    (_a = status.onDetectChangesNow) === null || _a === void 0 ? void 0 : _a.call(status);
}
/**
 * Allows a test `HarnessEnvironment` to install its own handler for auto change detection status
 * changes.
 * @param handler The handler for the auto change detection status.
 */
export function handleAutoChangeDetectionStatus(handler) {
    stopHandlingAutoChangeDetectionStatus();
    autoChangeDetectionSubscription = autoChangeDetectionSubject.subscribe(handler);
}
/** Allows a `HarnessEnvironment` to stop handling auto change detection status changes. */
export function stopHandlingAutoChangeDetectionStatus() {
    autoChangeDetectionSubscription === null || autoChangeDetectionSubscription === void 0 ? void 0 : autoChangeDetectionSubscription.unsubscribe();
    autoChangeDetectionSubscription = null;
}
/**
 * Batches together triggering of change detection over the duration of the given function.
 * @param fn The function to call with batched change detection.
 * @param triggerBeforeAndAfter Optionally trigger change detection once before and after the batch
 *   operation. If false, change detection will not be triggered.
 * @return The result of the given function.
 */
function batchChangeDetection(fn, triggerBeforeAndAfter) {
    return __awaiter(this, void 0, void 0, function* () {
        // If change detection batching is already in progress, just run the function.
        if (autoChangeDetectionSubject.getValue().isDisabled) {
            return yield fn();
        }
        // If nothing is handling change detection batching, install the default handler.
        if (!autoChangeDetectionSubscription) {
            autoChangeDetectionSubject.subscribe(defaultAutoChangeDetectionHandler);
        }
        if (triggerBeforeAndAfter) {
            yield new Promise(resolve => autoChangeDetectionSubject.next({
                isDisabled: true,
                onDetectChangesNow: resolve,
            }));
            // The function passed in may throw (e.g. if the user wants to make an expectation of an error
            // being thrown. If this happens, we need to make sure we still re-enable change detection, so
            // we wrap it in a `finally` block.
            try {
                return yield fn();
            }
            finally {
                yield new Promise(resolve => autoChangeDetectionSubject.next({
                    isDisabled: false,
                    onDetectChangesNow: resolve,
                }));
            }
        }
        else {
            autoChangeDetectionSubject.next({ isDisabled: true });
            // The function passed in may throw (e.g. if the user wants to make an expectation of an error
            // being thrown. If this happens, we need to make sure we still re-enable change detection, so
            // we wrap it in a `finally` block.
            try {
                return yield fn();
            }
            finally {
                autoChangeDetectionSubject.next({ isDisabled: false });
            }
        }
    });
}
/**
 * Disables the harness system's auto change detection for the duration of the given function.
 * @param fn The function to disable auto change detection for.
 * @return The result of the given function.
 */
export function manualChangeDetection(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        return batchChangeDetection(fn, false);
    });
}
export function parallel(values) {
    return __awaiter(this, void 0, void 0, function* () {
        return batchChangeDetection(() => Promise.all(values()), true);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLWRldGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGsvdGVzdGluZy9jaGFuZ2UtZGV0ZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBY25ELDRGQUE0RjtBQUM1RixNQUFNLDBCQUEwQixHQUFHLElBQUksZUFBZSxDQUE0QjtJQUNoRixVQUFVLEVBQUUsS0FBSztDQUNsQixDQUFDLENBQUM7QUFFSCxnRUFBZ0U7QUFDaEUsSUFBSSwrQkFBb0QsQ0FBQztBQUV6RDs7OztHQUlHO0FBQ0gsU0FBUyxpQ0FBaUMsQ0FBQyxNQUFpQzs7SUFDMUUsTUFBQSxNQUFNLENBQUMsa0JBQWtCLCtDQUF6QixNQUFNLEVBQXdCO0FBQ2hDLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLCtCQUErQixDQUMzQyxPQUFvRDtJQUN0RCxxQ0FBcUMsRUFBRSxDQUFDO0lBQ3hDLCtCQUErQixHQUFHLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRixDQUFDO0FBRUQsMkZBQTJGO0FBQzNGLE1BQU0sVUFBVSxxQ0FBcUM7SUFDbkQsK0JBQStCLGFBQS9CLCtCQUErQix1QkFBL0IsK0JBQStCLENBQUUsV0FBVyxHQUFHO0lBQy9DLCtCQUErQixHQUFHLElBQUksQ0FBQztBQUN6QyxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZSxvQkFBb0IsQ0FBSSxFQUFvQixFQUFFLHFCQUE4Qjs7UUFDekYsOEVBQThFO1FBQzlFLElBQUksMEJBQTBCLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFO1lBQ3BELE9BQU8sTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUNuQjtRQUVELGlGQUFpRjtRQUNqRixJQUFJLENBQUMsK0JBQStCLEVBQUU7WUFDcEMsMEJBQTBCLENBQUMsU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDekU7UUFFRCxJQUFJLHFCQUFxQixFQUFFO1lBQ3pCLE1BQU0sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUM7Z0JBQzNELFVBQVUsRUFBRSxJQUFJO2dCQUNoQixrQkFBa0IsRUFBRSxPQUFPO2FBQzVCLENBQUMsQ0FBQyxDQUFDO1lBQ0osOEZBQThGO1lBQzlGLDhGQUE4RjtZQUM5RixtQ0FBbUM7WUFDbkMsSUFBSTtnQkFDRixPQUFPLE1BQU0sRUFBRSxFQUFFLENBQUM7YUFDbkI7b0JBQVM7Z0JBQ1IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQztvQkFDM0QsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLGtCQUFrQixFQUFFLE9BQU87aUJBQzVCLENBQUMsQ0FBQyxDQUFDO2FBQ0w7U0FDRjthQUFNO1lBQ0wsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDcEQsOEZBQThGO1lBQzlGLDhGQUE4RjtZQUM5RixtQ0FBbUM7WUFDbkMsSUFBSTtnQkFDRixPQUFPLE1BQU0sRUFBRSxFQUFFLENBQUM7YUFDbkI7b0JBQVM7Z0JBQ1IsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDdEQ7U0FDRjtJQUNILENBQUM7Q0FBQTtBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQWdCLHFCQUFxQixDQUFJLEVBQW9COztRQUNqRSxPQUFPLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQUE7QUEyREQsTUFBTSxVQUFnQixRQUFRLENBQUksTUFBMEM7O1FBQzFFLE9BQU8sb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuLyoqIFJlcHJlc2VudHMgdGhlIHN0YXR1cyBvZiBhdXRvIGNoYW5nZSBkZXRlY3Rpb24uICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9DaGFuZ2VEZXRlY3Rpb25TdGF0dXMge1xuICAvKiogV2hldGhlciBhdXRvIGNoYW5nZSBkZXRlY3Rpb24gaXMgZGlzYWJsZWQuICovXG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBjYWxsYmFjaywgaWYgcHJlc2VudCBpdCBpbmRpY2F0ZXMgdGhhdCBjaGFuZ2UgZGV0ZWN0aW9uIHNob3VsZCBiZSBydW4gaW1tZWRpYXRlbHksXG4gICAqIHdoaWxlIGhhbmRsaW5nIHRoZSBzdGF0dXMgY2hhbmdlLiBUaGUgY2FsbGJhY2sgc2hvdWxkIHRoZW4gYmUgY2FsbGVkIGFzIHNvb24gYXMgY2hhbmdlXG4gICAqIGRldGVjdGlvbiBpcyBkb25lLlxuICAgKi9cbiAgb25EZXRlY3RDaGFuZ2VzTm93PzogKCkgPT4gdm9pZDtcbn1cblxuLyoqIFN1YmplY3QgdXNlZCB0byBkaXNwYXRjaCBhbmQgbGlzdGVuIGZvciBjaGFuZ2VzIHRvIHRoZSBhdXRvIGNoYW5nZSBkZXRlY3Rpb24gc3RhdHVzIC4gKi9cbmNvbnN0IGF1dG9DaGFuZ2VEZXRlY3Rpb25TdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBdXRvQ2hhbmdlRGV0ZWN0aW9uU3RhdHVzPih7XG4gIGlzRGlzYWJsZWQ6IGZhbHNlXG59KTtcblxuLyoqIFRoZSBjdXJyZW50IHN1YnNjcmlwdGlvbiB0byBgYXV0b0NoYW5nZURldGVjdGlvblN1YmplY3RgLiAqL1xubGV0IGF1dG9DaGFuZ2VEZXRlY3Rpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgaGFuZGxlciBmb3IgYXV0byBjaGFuZ2UgZGV0ZWN0aW9uIHN0YXR1cyBjaGFuZ2VzLiBUaGlzIGhhbmRsZXIgd2lsbCBiZSB1c2VkIGlmIHRoZVxuICogc3BlY2lmaWMgZW52aXJvbm1lbnQgZG9lcyBub3QgaW5zdGFsbCBpdHMgb3duLlxuICogQHBhcmFtIHN0YXR1cyBUaGUgbmV3IGF1dG8gY2hhbmdlIGRldGVjdGlvbiBzdGF0dXMuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRBdXRvQ2hhbmdlRGV0ZWN0aW9uSGFuZGxlcihzdGF0dXM6IEF1dG9DaGFuZ2VEZXRlY3Rpb25TdGF0dXMpIHtcbiAgc3RhdHVzLm9uRGV0ZWN0Q2hhbmdlc05vdz8uKCk7XG59XG5cbi8qKlxuICogQWxsb3dzIGEgdGVzdCBgSGFybmVzc0Vudmlyb25tZW50YCB0byBpbnN0YWxsIGl0cyBvd24gaGFuZGxlciBmb3IgYXV0byBjaGFuZ2UgZGV0ZWN0aW9uIHN0YXR1c1xuICogY2hhbmdlcy5cbiAqIEBwYXJhbSBoYW5kbGVyIFRoZSBoYW5kbGVyIGZvciB0aGUgYXV0byBjaGFuZ2UgZGV0ZWN0aW9uIHN0YXR1cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUF1dG9DaGFuZ2VEZXRlY3Rpb25TdGF0dXMoXG4gICAgaGFuZGxlcjogKHN0YXR1czogQXV0b0NoYW5nZURldGVjdGlvblN0YXR1cykgPT4gdm9pZCkge1xuICBzdG9wSGFuZGxpbmdBdXRvQ2hhbmdlRGV0ZWN0aW9uU3RhdHVzKCk7XG4gIGF1dG9DaGFuZ2VEZXRlY3Rpb25TdWJzY3JpcHRpb24gPSBhdXRvQ2hhbmdlRGV0ZWN0aW9uU3ViamVjdC5zdWJzY3JpYmUoaGFuZGxlcik7XG59XG5cbi8qKiBBbGxvd3MgYSBgSGFybmVzc0Vudmlyb25tZW50YCB0byBzdG9wIGhhbmRsaW5nIGF1dG8gY2hhbmdlIGRldGVjdGlvbiBzdGF0dXMgY2hhbmdlcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9wSGFuZGxpbmdBdXRvQ2hhbmdlRGV0ZWN0aW9uU3RhdHVzKCkge1xuICBhdXRvQ2hhbmdlRGV0ZWN0aW9uU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICBhdXRvQ2hhbmdlRGV0ZWN0aW9uU3Vic2NyaXB0aW9uID0gbnVsbDtcbn1cblxuLyoqXG4gKiBCYXRjaGVzIHRvZ2V0aGVyIHRyaWdnZXJpbmcgb2YgY2hhbmdlIGRldGVjdGlvbiBvdmVyIHRoZSBkdXJhdGlvbiBvZiB0aGUgZ2l2ZW4gZnVuY3Rpb24uXG4gKiBAcGFyYW0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2l0aCBiYXRjaGVkIGNoYW5nZSBkZXRlY3Rpb24uXG4gKiBAcGFyYW0gdHJpZ2dlckJlZm9yZUFuZEFmdGVyIE9wdGlvbmFsbHkgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIG9uY2UgYmVmb3JlIGFuZCBhZnRlciB0aGUgYmF0Y2hcbiAqICAgb3BlcmF0aW9uLiBJZiBmYWxzZSwgY2hhbmdlIGRldGVjdGlvbiB3aWxsIG5vdCBiZSB0cmlnZ2VyZWQuXG4gKiBAcmV0dXJuIFRoZSByZXN1bHQgb2YgdGhlIGdpdmVuIGZ1bmN0aW9uLlxuICovXG5hc3luYyBmdW5jdGlvbiBiYXRjaENoYW5nZURldGVjdGlvbjxUPihmbjogKCkgPT4gUHJvbWlzZTxUPiwgdHJpZ2dlckJlZm9yZUFuZEFmdGVyOiBib29sZWFuKSB7XG4gIC8vIElmIGNoYW5nZSBkZXRlY3Rpb24gYmF0Y2hpbmcgaXMgYWxyZWFkeSBpbiBwcm9ncmVzcywganVzdCBydW4gdGhlIGZ1bmN0aW9uLlxuICBpZiAoYXV0b0NoYW5nZURldGVjdGlvblN1YmplY3QuZ2V0VmFsdWUoKS5pc0Rpc2FibGVkKSB7XG4gICAgcmV0dXJuIGF3YWl0IGZuKCk7XG4gIH1cblxuICAvLyBJZiBub3RoaW5nIGlzIGhhbmRsaW5nIGNoYW5nZSBkZXRlY3Rpb24gYmF0Y2hpbmcsIGluc3RhbGwgdGhlIGRlZmF1bHQgaGFuZGxlci5cbiAgaWYgKCFhdXRvQ2hhbmdlRGV0ZWN0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgYXV0b0NoYW5nZURldGVjdGlvblN1YmplY3Quc3Vic2NyaWJlKGRlZmF1bHRBdXRvQ2hhbmdlRGV0ZWN0aW9uSGFuZGxlcik7XG4gIH1cblxuICBpZiAodHJpZ2dlckJlZm9yZUFuZEFmdGVyKSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBhdXRvQ2hhbmdlRGV0ZWN0aW9uU3ViamVjdC5uZXh0KHtcbiAgICAgIGlzRGlzYWJsZWQ6IHRydWUsXG4gICAgICBvbkRldGVjdENoYW5nZXNOb3c6IHJlc29sdmUsXG4gICAgfSkpO1xuICAgIC8vIFRoZSBmdW5jdGlvbiBwYXNzZWQgaW4gbWF5IHRocm93IChlLmcuIGlmIHRoZSB1c2VyIHdhbnRzIHRvIG1ha2UgYW4gZXhwZWN0YXRpb24gb2YgYW4gZXJyb3JcbiAgICAvLyBiZWluZyB0aHJvd24uIElmIHRoaXMgaGFwcGVucywgd2UgbmVlZCB0byBtYWtlIHN1cmUgd2Ugc3RpbGwgcmUtZW5hYmxlIGNoYW5nZSBkZXRlY3Rpb24sIHNvXG4gICAgLy8gd2Ugd3JhcCBpdCBpbiBhIGBmaW5hbGx5YCBibG9jay5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGZuKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gYXV0b0NoYW5nZURldGVjdGlvblN1YmplY3QubmV4dCh7XG4gICAgICAgIGlzRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBvbkRldGVjdENoYW5nZXNOb3c6IHJlc29sdmUsXG4gICAgICB9KSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGF1dG9DaGFuZ2VEZXRlY3Rpb25TdWJqZWN0Lm5leHQoe2lzRGlzYWJsZWQ6IHRydWV9KTtcbiAgICAvLyBUaGUgZnVuY3Rpb24gcGFzc2VkIGluIG1heSB0aHJvdyAoZS5nLiBpZiB0aGUgdXNlciB3YW50cyB0byBtYWtlIGFuIGV4cGVjdGF0aW9uIG9mIGFuIGVycm9yXG4gICAgLy8gYmVpbmcgdGhyb3duLiBJZiB0aGlzIGhhcHBlbnMsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIHN0aWxsIHJlLWVuYWJsZSBjaGFuZ2UgZGV0ZWN0aW9uLCBzb1xuICAgIC8vIHdlIHdyYXAgaXQgaW4gYSBgZmluYWxseWAgYmxvY2suXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBmbigpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhdXRvQ2hhbmdlRGV0ZWN0aW9uU3ViamVjdC5uZXh0KHtpc0Rpc2FibGVkOiBmYWxzZX0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGVzIHRoZSBoYXJuZXNzIHN5c3RlbSdzIGF1dG8gY2hhbmdlIGRldGVjdGlvbiBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoZSBnaXZlbiBmdW5jdGlvbi5cbiAqIEBwYXJhbSBmbiBUaGUgZnVuY3Rpb24gdG8gZGlzYWJsZSBhdXRvIGNoYW5nZSBkZXRlY3Rpb24gZm9yLlxuICogQHJldHVybiBUaGUgcmVzdWx0IG9mIHRoZSBnaXZlbiBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1hbnVhbENoYW5nZURldGVjdGlvbjxUPihmbjogKCkgPT4gUHJvbWlzZTxUPikge1xuICByZXR1cm4gYmF0Y2hDaGFuZ2VEZXRlY3Rpb24oZm4sIGZhbHNlKTtcbn1cblxuXG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGdpdmVuIGxpc3Qgb2YgYXN5bmMgdmFsdWVzIGluIHBhcmFsbGVsIChpLmUuIHZpYSBQcm9taXNlLmFsbCkgd2hpbGUgYmF0Y2hpbmcgY2hhbmdlXG4gKiBkZXRlY3Rpb24gb3ZlciB0aGUgZW50aXJlIG9wZXJhdGlvbiBzdWNoIHRoYXQgY2hhbmdlIGRldGVjdGlvbiBvY2N1cnMgZXhhY3RseSBvbmNlIGJlZm9yZVxuICogcmVzb2x2aW5nIHRoZSB2YWx1ZXMgYW5kIG9uY2UgYWZ0ZXIuXG4gKiBAcGFyYW0gdmFsdWVzIEEgZ2V0dGVyIGZvciB0aGUgYXN5bmMgdmFsdWVzIHRvIHJlc29sdmUgaW4gcGFyYWxsZWwgd2l0aCBiYXRjaGVkIGNoYW5nZSBkZXRlY3Rpb24uXG4gKiBAcmV0dXJuIFRoZSByZXNvbHZlZCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJhbGxlbDxUMSwgVDIsIFQzLCBUNCwgVDU+KFxuICB2YWx1ZXM6ICgpID0+XG4gICAgICBbVDEgfCBQcm9taXNlTGlrZTxUMT4sIFQyIHwgUHJvbWlzZUxpa2U8VDI+LCBUMyB8IFByb21pc2VMaWtlPFQzPiwgVDQgfCBQcm9taXNlTGlrZTxUND4sXG4gICAgICAgVDUgfCBQcm9taXNlTGlrZTxUNT5cbiAgICAgIF0pOiBQcm9taXNlPFtUMSwgVDIsIFQzLCBUNCwgVDVdPjtcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgZ2l2ZW4gbGlzdCBvZiBhc3luYyB2YWx1ZXMgaW4gcGFyYWxsZWwgKGkuZS4gdmlhIFByb21pc2UuYWxsKSB3aGlsZSBiYXRjaGluZyBjaGFuZ2VcbiAqIGRldGVjdGlvbiBvdmVyIHRoZSBlbnRpcmUgb3BlcmF0aW9uIHN1Y2ggdGhhdCBjaGFuZ2UgZGV0ZWN0aW9uIG9jY3VycyBleGFjdGx5IG9uY2UgYmVmb3JlXG4gKiByZXNvbHZpbmcgdGhlIHZhbHVlcyBhbmQgb25jZSBhZnRlci5cbiAqIEBwYXJhbSB2YWx1ZXMgQSBnZXR0ZXIgZm9yIHRoZSBhc3luYyB2YWx1ZXMgdG8gcmVzb2x2ZSBpbiBwYXJhbGxlbCB3aXRoIGJhdGNoZWQgY2hhbmdlIGRldGVjdGlvbi5cbiAqIEByZXR1cm4gVGhlIHJlc29sdmVkIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcmFsbGVsPFQxLCBUMiwgVDMsIFQ0PihcbiAgdmFsdWVzOiAoKSA9PlxuICAgICAgW1QxIHwgUHJvbWlzZUxpa2U8VDE+LCBUMiB8IFByb21pc2VMaWtlPFQyPiwgVDMgfCBQcm9taXNlTGlrZTxUMz4sIFQ0IHwgUHJvbWlzZUxpa2U8VDQ+XSk6XG4gIFByb21pc2U8W1QxLCBUMiwgVDMsIFQ0XT47XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGdpdmVuIGxpc3Qgb2YgYXN5bmMgdmFsdWVzIGluIHBhcmFsbGVsIChpLmUuIHZpYSBQcm9taXNlLmFsbCkgd2hpbGUgYmF0Y2hpbmcgY2hhbmdlXG4gKiBkZXRlY3Rpb24gb3ZlciB0aGUgZW50aXJlIG9wZXJhdGlvbiBzdWNoIHRoYXQgY2hhbmdlIGRldGVjdGlvbiBvY2N1cnMgZXhhY3RseSBvbmNlIGJlZm9yZVxuICogcmVzb2x2aW5nIHRoZSB2YWx1ZXMgYW5kIG9uY2UgYWZ0ZXIuXG4gKiBAcGFyYW0gdmFsdWVzIEEgZ2V0dGVyIGZvciB0aGUgYXN5bmMgdmFsdWVzIHRvIHJlc29sdmUgaW4gcGFyYWxsZWwgd2l0aCBiYXRjaGVkIGNoYW5nZSBkZXRlY3Rpb24uXG4gKiBAcmV0dXJuIFRoZSByZXNvbHZlZCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJhbGxlbDxUMSwgVDIsIFQzPihcbiAgdmFsdWVzOiAoKSA9PiBbVDEgfCBQcm9taXNlTGlrZTxUMT4sIFQyIHwgUHJvbWlzZUxpa2U8VDI+LCBUMyB8IFByb21pc2VMaWtlPFQzPl0pOlxuICBQcm9taXNlPFtUMSwgVDIsIFQzXT47XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGdpdmVuIGxpc3Qgb2YgYXN5bmMgdmFsdWVzIGluIHBhcmFsbGVsIChpLmUuIHZpYSBQcm9taXNlLmFsbCkgd2hpbGUgYmF0Y2hpbmcgY2hhbmdlXG4gKiBkZXRlY3Rpb24gb3ZlciB0aGUgZW50aXJlIG9wZXJhdGlvbiBzdWNoIHRoYXQgY2hhbmdlIGRldGVjdGlvbiBvY2N1cnMgZXhhY3RseSBvbmNlIGJlZm9yZVxuICogcmVzb2x2aW5nIHRoZSB2YWx1ZXMgYW5kIG9uY2UgYWZ0ZXIuXG4gKiBAcGFyYW0gdmFsdWVzIEEgZ2V0dGVyIGZvciB0aGUgYXN5bmMgdmFsdWVzIHRvIHJlc29sdmUgaW4gcGFyYWxsZWwgd2l0aCBiYXRjaGVkIGNoYW5nZSBkZXRlY3Rpb24uXG4gKiBAcmV0dXJuIFRoZSByZXNvbHZlZCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJhbGxlbDxUMSwgVDI+KHZhbHVlczogKCkgPT4gW1QxIHwgUHJvbWlzZUxpa2U8VDE+LCBUMiB8IFByb21pc2VMaWtlPFQyPl0pOlxuICBQcm9taXNlPFtUMSwgVDJdPjtcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgZ2l2ZW4gbGlzdCBvZiBhc3luYyB2YWx1ZXMgaW4gcGFyYWxsZWwgKGkuZS4gdmlhIFByb21pc2UuYWxsKSB3aGlsZSBiYXRjaGluZyBjaGFuZ2VcbiAqIGRldGVjdGlvbiBvdmVyIHRoZSBlbnRpcmUgb3BlcmF0aW9uIHN1Y2ggdGhhdCBjaGFuZ2UgZGV0ZWN0aW9uIG9jY3VycyBleGFjdGx5IG9uY2UgYmVmb3JlXG4gKiByZXNvbHZpbmcgdGhlIHZhbHVlcyBhbmQgb25jZSBhZnRlci5cbiAqIEBwYXJhbSB2YWx1ZXMgQSBnZXR0ZXIgZm9yIHRoZSBhc3luYyB2YWx1ZXMgdG8gcmVzb2x2ZSBpbiBwYXJhbGxlbCB3aXRoIGJhdGNoZWQgY2hhbmdlIGRldGVjdGlvbi5cbiAqIEByZXR1cm4gVGhlIHJlc29sdmVkIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcmFsbGVsPFQ+KHZhbHVlczogKCkgPT4gKFQgfCBQcm9taXNlTGlrZTxUPilbXSk6IFByb21pc2U8VFtdPjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBhcmFsbGVsPFQ+KHZhbHVlczogKCkgPT4gSXRlcmFibGU8VCB8IFByb21pc2VMaWtlPFQ+Pik6IFByb21pc2U8VFtdPiB7XG4gIHJldHVybiBiYXRjaENoYW5nZURldGVjdGlvbigoKSA9PiBQcm9taXNlLmFsbCh2YWx1ZXMoKSksIHRydWUpO1xufVxuIl19