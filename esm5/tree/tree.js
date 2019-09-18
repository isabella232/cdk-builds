import { isDataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, Input, IterableDiffers, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkTreeNodeDef, CdkTreeNodeOutletContext } from './node';
import { CdkTreeNodeOutlet } from './outlet';
import { getTreeControlFunctionsMissingError, getTreeControlMissingError, getTreeMissingMatchingNodeDefError, getTreeMultipleDefaultNodeDefsError, getTreeNoValidDataSourceError } from './tree-errors';
/**
 * CDK tree component that connects with a data source to retrieve data of type `T` and renders
 * dataNodes with hierarchy. Updates the dataNodes when new data is provided by the data source.
 */
var CdkTree = /** @class */ (function () {
    function CdkTree(_differs, _changeDetectorRef) {
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
        /** Level of nodes */
        this._levels = new Map();
        // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
        //     Remove the MAX_VALUE in viewChange
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChange = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
    }
    Object.defineProperty(CdkTree.prototype, "dataSource", {
        /**
         * Provides a stream containing the latest data array to render. Influenced by the tree's
         * stream of view window (what dataNodes are currently on screen).
         * Data source can be an observable of data array, or a data array to render.
         */
        get: function () { return this._dataSource; },
        set: function (dataSource) {
            if (this._dataSource !== dataSource) {
                this._switchDataSource(dataSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    CdkTree.prototype.ngOnInit = function () {
        this._dataDiffer = this._differs.find([]).create(this.trackBy);
        if (!this.treeControl) {
            throw getTreeControlMissingError();
        }
    };
    CdkTree.prototype.ngOnDestroy = function () {
        this._nodeOutlet.viewContainer.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this._dataSource && typeof this._dataSource.disconnect === 'function') {
            this.dataSource.disconnect(this);
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    };
    CdkTree.prototype.ngAfterContentChecked = function () {
        var defaultNodeDefs = this._nodeDefs.filter(function (def) { return !def.when; });
        if (defaultNodeDefs.length > 1) {
            throw getTreeMultipleDefaultNodeDefsError();
        }
        this._defaultNodeDef = defaultNodeDefs[0];
        if (this.dataSource && this._nodeDefs && !this._dataSubscription) {
            this._observeRenderChanges();
        }
    };
    // TODO(tinayuangao): Work on keyboard traversal and actions, make sure it's working for RTL
    //     and nested trees.
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    CdkTree.prototype._switchDataSource = function (dataSource) {
        if (this._dataSource && typeof this._dataSource.disconnect === 'function') {
            this.dataSource.disconnect(this);
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        // Remove the all dataNodes if there is now no data source
        if (!dataSource) {
            this._nodeOutlet.viewContainer.clear();
        }
        this._dataSource = dataSource;
        if (this._nodeDefs) {
            this._observeRenderChanges();
        }
    };
    /** Set up a subscription for the data provided by the data source. */
    CdkTree.prototype._observeRenderChanges = function () {
        var _this = this;
        var dataStream;
        if (isDataSource(this._dataSource)) {
            dataStream = this._dataSource.connect(this);
        }
        else if (this._dataSource instanceof Observable) {
            dataStream = this._dataSource;
        }
        else if (Array.isArray(this._dataSource)) {
            dataStream = observableOf(this._dataSource);
        }
        if (dataStream) {
            this._dataSubscription = dataStream.pipe(takeUntil(this._onDestroy))
                .subscribe(function (data) { return _this.renderNodeChanges(data); });
        }
        else {
            throw getTreeNoValidDataSourceError();
        }
    };
    /** Check for changes made in the data and render each change (node added/removed/moved). */
    CdkTree.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer, parentData) {
        var _this = this;
        if (dataDiffer === void 0) { dataDiffer = this._dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this._nodeOutlet.viewContainer; }
        var changes = dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
            if (item.previousIndex == null) {
                _this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
                _this._levels.delete(item.item);
            }
            else {
                var view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
        this._changeDetectorRef.detectChanges();
    };
    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned. Otherwise, find the node definition that has a when
     * predicate that returns true with the data. If none return true, return the default node
     * definition.
     */
    CdkTree.prototype._getNodeDef = function (data, i) {
        if (this._nodeDefs.length === 1) {
            return this._nodeDefs.first;
        }
        var nodeDef = this._nodeDefs.find(function (def) { return def.when && def.when(i, data); }) || this._defaultNodeDef;
        if (!nodeDef) {
            throw getTreeMissingMatchingNodeDefError();
        }
        return nodeDef;
    };
    /**
     * Create the embedded view for the data node template and place it in the correct index location
     * within the data node view container.
     */
    CdkTree.prototype.insertNode = function (nodeData, index, viewContainer, parentData) {
        var node = this._getNodeDef(nodeData, index);
        // Node context that will be provided to created embedded view
        var context = new CdkTreeNodeOutletContext(nodeData);
        // If the tree is flat tree, then use the `getLevel` function in flat tree control
        // Otherwise, use the level of parent node.
        if (this.treeControl.getLevel) {
            context.level = this.treeControl.getLevel(nodeData);
        }
        else if (typeof parentData !== 'undefined' && this._levels.has(parentData)) {
            context.level = this._levels.get(parentData) + 1;
        }
        else {
            context.level = 0;
        }
        this._levels.set(nodeData, context.level);
        // Use default tree nodeOutlet, or nested node's nodeOutlet
        var container = viewContainer ? viewContainer : this._nodeOutlet.viewContainer;
        container.createEmbeddedView(node.template, context, index);
        // Set the data to just created `CdkTreeNode`.
        // The `CdkTreeNode` created from `createEmbeddedView` will be saved in static variable
        //     `mostRecentTreeNode`. We get it from static variable and pass the node data to it.
        if (CdkTreeNode.mostRecentTreeNode) {
            CdkTreeNode.mostRecentTreeNode.data = nodeData;
        }
    };
    CdkTree.decorators = [
        { type: Component, args: [{
                    moduleId: module.id,
                    selector: 'cdk-tree',
                    exportAs: 'cdkTree',
                    template: "<ng-container cdkTreeNodeOutlet></ng-container>",
                    host: {
                        'class': 'cdk-tree',
                        'role': 'tree',
                    },
                    encapsulation: ViewEncapsulation.None,
                    // The "OnPush" status for the `CdkTree` component is effectively a noop, so we are removing it.
                    // The view for `CdkTree` consists entirely of templates declared in other views. As they are
                    // declared elsewhere, they are checked when their declaration points are checked.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default
                }] }
    ];
    /** @nocollapse */
    CdkTree.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: ChangeDetectorRef }
    ]; };
    CdkTree.propDecorators = {
        dataSource: [{ type: Input }],
        treeControl: [{ type: Input }],
        trackBy: [{ type: Input }],
        _nodeOutlet: [{ type: ViewChild, args: [CdkTreeNodeOutlet, { static: true },] }],
        _nodeDefs: [{ type: ContentChildren, args: [CdkTreeNodeDef,] }]
    };
    return CdkTree;
}());
export { CdkTree };
/**
 * Tree node for CdkTree. It contains the data in the tree node.
 */
var CdkTreeNode = /** @class */ (function () {
    function CdkTreeNode(_elementRef, _tree) {
        this._elementRef = _elementRef;
        this._tree = _tree;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new Subject();
        /** Emits when the node's data has changed. */
        this._dataChanges = new Subject();
        /**
         * The role of the node should be 'group' if it's an internal node,
         * and 'treeitem' if it's a leaf node.
         */
        this.role = 'treeitem';
        CdkTreeNode.mostRecentTreeNode = this;
    }
    Object.defineProperty(CdkTreeNode.prototype, "data", {
        /** The tree node's data. */
        get: function () { return this._data; },
        set: function (value) {
            if (value !== this._data) {
                this._data = value;
                this._setRoleFromData();
                this._dataChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNode.prototype, "isExpanded", {
        get: function () {
            return this._tree.treeControl.isExpanded(this._data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNode.prototype, "level", {
        get: function () {
            return this._tree.treeControl.getLevel ? this._tree.treeControl.getLevel(this._data) : 0;
        },
        enumerable: true,
        configurable: true
    });
    CdkTreeNode.prototype.ngOnDestroy = function () {
        // If this is the last tree node being destroyed,
        // clear out the reference to avoid leaking memory.
        if (CdkTreeNode.mostRecentTreeNode === this) {
            CdkTreeNode.mostRecentTreeNode = null;
        }
        this._dataChanges.complete();
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Focuses the menu item. Implements for FocusableOption. */
    CdkTreeNode.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    CdkTreeNode.prototype._setRoleFromData = function () {
        var _this = this;
        if (this._tree.treeControl.isExpandable) {
            this.role = this._tree.treeControl.isExpandable(this._data) ? 'group' : 'treeitem';
        }
        else {
            if (!this._tree.treeControl.getChildren) {
                throw getTreeControlFunctionsMissingError();
            }
            var childrenNodes = this._tree.treeControl.getChildren(this._data);
            if (Array.isArray(childrenNodes)) {
                this._setRoleFromChildren(childrenNodes);
            }
            else if (childrenNodes instanceof Observable) {
                childrenNodes.pipe(takeUntil(this._destroyed))
                    .subscribe(function (children) { return _this._setRoleFromChildren(children); });
            }
        }
    };
    CdkTreeNode.prototype._setRoleFromChildren = function (children) {
        this.role = children && children.length ? 'group' : 'treeitem';
    };
    /**
     * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
     * in `CdkTree` and set the data to it.
     */
    CdkTreeNode.mostRecentTreeNode = null;
    CdkTreeNode.decorators = [
        { type: Directive, args: [{
                    selector: 'cdk-tree-node',
                    exportAs: 'cdkTreeNode',
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.aria-level]': 'role === "treeitem" ? level : null',
                        '[attr.role]': 'role',
                        'class': 'cdk-tree-node',
                    },
                },] }
    ];
    /** @nocollapse */
    CdkTreeNode.ctorParameters = function () { return [
        { type: ElementRef },
        { type: CdkTree }
    ]; };
    CdkTreeNode.propDecorators = {
        role: [{ type: Input }]
    };
    return CdkTreeNode;
}());
export { CdkTreeNode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGsvdHJlZS90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBK0IsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDcEYsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxlQUFlLEVBR2YsU0FBUyxFQUNULFNBQVMsRUFFVCxpQkFBaUIsRUFFbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDNUYsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxjQUFjLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDaEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxtQ0FBbUMsRUFDbkMsMEJBQTBCLEVBQzFCLGtDQUFrQyxFQUNsQyxtQ0FBbUMsRUFDbkMsNkJBQTZCLEVBQzlCLE1BQU0sZUFBZSxDQUFDO0FBRXZCOzs7R0FHRztBQUNIO0lBeUVFLGlCQUFvQixRQUF5QixFQUN6QixrQkFBcUM7UUFEckMsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQXhEekQsZ0VBQWdFO1FBQ3hELGVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBV3pDLHFCQUFxQjtRQUNiLFlBQU8sR0FBbUIsSUFBSSxHQUFHLEVBQWEsQ0FBQztRQWlDdkQsNkZBQTZGO1FBQzdGLHlDQUF5QztRQUN6Qzs7O1dBR0c7UUFDSCxlQUFV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LFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLElBQUksRUFBRTt3QkFDSixzQkFBc0IsRUFBRSxZQUFZO3dCQUNwQyxtQkFBbUIsRUFBRSxvQ0FBb0M7d0JBQ3pELGFBQWEsRUFBRSxNQUFNO3dCQUNyQixPQUFPLEVBQUUsZUFBZTtxQkFDekI7aUJBQ0Y7Ozs7Z0JBdFJDLFVBQVU7Z0JBOFRtQixPQUFPOzs7dUJBSG5DLEtBQUs7O0lBNENSLGtCQUFDO0NBQUEsQUExRkQsSUEwRkM7U0FoRlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtGb2N1c2FibGVPcHRpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7Q29sbGVjdGlvblZpZXdlciwgRGF0YVNvdXJjZSwgaXNEYXRhU291cmNlfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgSXRlcmFibGVDaGFuZ2VSZWNvcmQsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFRyYWNrQnlGdW5jdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtUcmVlQ29udHJvbH0gZnJvbSAnLi9jb250cm9sL3RyZWUtY29udHJvbCc7XG5pbXBvcnQge0Nka1RyZWVOb2RlRGVmLCBDZGtUcmVlTm9kZU91dGxldENvbnRleHR9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge0Nka1RyZWVOb2RlT3V0bGV0fSBmcm9tICcuL291dGxldCc7XG5pbXBvcnQge1xuICBnZXRUcmVlQ29udHJvbEZ1bmN0aW9uc01pc3NpbmdFcnJvcixcbiAgZ2V0VHJlZUNvbnRyb2xNaXNzaW5nRXJyb3IsXG4gIGdldFRyZWVNaXNzaW5nTWF0Y2hpbmdOb2RlRGVmRXJyb3IsXG4gIGdldFRyZWVNdWx0aXBsZURlZmF1bHROb2RlRGVmc0Vycm9yLFxuICBnZXRUcmVlTm9WYWxpZERhdGFTb3VyY2VFcnJvclxufSBmcm9tICcuL3RyZWUtZXJyb3JzJztcblxuLyoqXG4gKiBDREsgdHJlZSBjb21wb25lbnQgdGhhdCBjb25uZWN0cyB3aXRoIGEgZGF0YSBzb3VyY2UgdG8gcmV0cmlldmUgZGF0YSBvZiB0eXBlIGBUYCBhbmQgcmVuZGVyc1xuICogZGF0YU5vZGVzIHdpdGggaGllcmFyY2h5LiBVcGRhdGVzIHRoZSBkYXRhTm9kZXMgd2hlbiBuZXcgZGF0YSBpcyBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2Nkay10cmVlJyxcbiAgZXhwb3J0QXM6ICdjZGtUcmVlJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIGNka1RyZWVOb2RlT3V0bGV0PjwvbmctY29udGFpbmVyPmAsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnY2RrLXRyZWUnLFxuICAgICdyb2xlJzogJ3RyZWUnLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXG4gIC8vIFRoZSBcIk9uUHVzaFwiIHN0YXR1cyBmb3IgdGhlIGBDZGtUcmVlYCBjb21wb25lbnQgaXMgZWZmZWN0aXZlbHkgYSBub29wLCBzbyB3ZSBhcmUgcmVtb3ZpbmcgaXQuXG4gIC8vIFRoZSB2aWV3IGZvciBgQ2RrVHJlZWAgY29uc2lzdHMgZW50aXJlbHkgb2YgdGVtcGxhdGVzIGRlY2xhcmVkIGluIG90aGVyIHZpZXdzLiBBcyB0aGV5IGFyZVxuICAvLyBkZWNsYXJlZCBlbHNld2hlcmUsIHRoZXkgYXJlIGNoZWNrZWQgd2hlbiB0aGVpciBkZWNsYXJhdGlvbiBwb2ludHMgYXJlIGNoZWNrZWQuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBDZGtUcmVlPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29sbGVjdGlvblZpZXdlciwgT25EZXN0cm95LCBPbkluaXQge1xuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIERpZmZlciB1c2VkIHRvIGZpbmQgdGhlIGNoYW5nZXMgaW4gdGhlIGRhdGEgcHJvdmlkZWQgYnkgdGhlIGRhdGEgc291cmNlLiAqL1xuICBwcml2YXRlIF9kYXRhRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxUPjtcblxuICAvKiogU3RvcmVzIHRoZSBub2RlIGRlZmluaXRpb24gdGhhdCBkb2VzIG5vdCBoYXZlIGEgd2hlbiBwcmVkaWNhdGUuICovXG4gIHByaXZhdGUgX2RlZmF1bHROb2RlRGVmOiBDZGtUcmVlTm9kZURlZjxUPiB8IG51bGw7XG5cbiAgLyoqIERhdGEgc3Vic2NyaXB0aW9uICovXG4gIHByaXZhdGUgX2RhdGFTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgLyoqIExldmVsIG9mIG5vZGVzICovXG4gIHByaXZhdGUgX2xldmVsczogTWFwPFQsIG51bWJlcj4gPSBuZXcgTWFwPFQsIG51bWJlcj4oKTtcblxuICAvKipcbiAgICogUHJvdmlkZXMgYSBzdHJlYW0gY29udGFpbmluZyB0aGUgbGF0ZXN0IGRhdGEgYXJyYXkgdG8gcmVuZGVyLiBJbmZsdWVuY2VkIGJ5IHRoZSB0cmVlJ3NcbiAgICogc3RyZWFtIG9mIHZpZXcgd2luZG93ICh3aGF0IGRhdGFOb2RlcyBhcmUgY3VycmVudGx5IG9uIHNjcmVlbikuXG4gICAqIERhdGEgc291cmNlIGNhbiBiZSBhbiBvYnNlcnZhYmxlIG9mIGRhdGEgYXJyYXksIG9yIGEgZGF0YSBhcnJheSB0byByZW5kZXIuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlPFQ+IHwgT2JzZXJ2YWJsZTxUW10+IHwgVFtdIHsgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7IH1cbiAgc2V0IGRhdGFTb3VyY2UoZGF0YVNvdXJjZTogRGF0YVNvdXJjZTxUPiB8IE9ic2VydmFibGU8VFtdPiB8IFRbXSkge1xuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICE9PSBkYXRhU291cmNlKSB7XG4gICAgICB0aGlzLl9zd2l0Y2hEYXRhU291cmNlKGRhdGFTb3VyY2UpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9kYXRhU291cmNlOiBEYXRhU291cmNlPFQ+IHwgT2JzZXJ2YWJsZTxUW10+IHwgVFtdO1xuXG4gIC8qKiBUaGUgdHJlZSBjb250cm9sbGVyICovXG4gIEBJbnB1dCgpIHRyZWVDb250cm9sOiBUcmVlQ29udHJvbDxUPjtcblxuICAvKipcbiAgICogVHJhY2tpbmcgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gY2hlY2sgdGhlIGRpZmZlcmVuY2VzIGluIGRhdGEgY2hhbmdlcy4gVXNlZCBzaW1pbGFybHlcbiAgICogdG8gYG5nRm9yYCBgdHJhY2tCeWAgZnVuY3Rpb24uIE9wdGltaXplIG5vZGUgb3BlcmF0aW9ucyBieSBpZGVudGlmeWluZyBhIG5vZGUgYmFzZWQgb24gaXRzIGRhdGFcbiAgICogcmVsYXRpdmUgdG8gdGhlIGZ1bmN0aW9uIHRvIGtub3cgaWYgYSBub2RlIHNob3VsZCBiZSBhZGRlZC9yZW1vdmVkL21vdmVkLlxuICAgKiBBY2NlcHRzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyB0d28gcGFyYW1ldGVycywgYGluZGV4YCBhbmQgYGl0ZW1gLlxuICAgKi9cbiAgQElucHV0KCkgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPFQ+O1xuXG4gIC8vIE91dGxldHMgd2l0aGluIHRoZSB0cmVlJ3MgdGVtcGxhdGUgd2hlcmUgdGhlIGRhdGFOb2RlcyB3aWxsIGJlIGluc2VydGVkLlxuICBAVmlld0NoaWxkKENka1RyZWVOb2RlT3V0bGV0LCB7c3RhdGljOiB0cnVlfSkgX25vZGVPdXRsZXQ6IENka1RyZWVOb2RlT3V0bGV0O1xuXG4gIC8qKiBUaGUgdHJlZSBub2RlIHRlbXBsYXRlIGZvciB0aGUgdHJlZSAqL1xuICBAQ29udGVudENoaWxkcmVuKENka1RyZWVOb2RlRGVmKSBfbm9kZURlZnM6IFF1ZXJ5TGlzdDxDZGtUcmVlTm9kZURlZjxUPj47XG5cbiAgLy8gVE9ETyh0aW5heXVhbmdhbyk6IFNldHVwIGEgbGlzdGVuZXIgZm9yIHNjcm9sbGluZywgZW1pdCB0aGUgY2FsY3VsYXRlZCB2aWV3IHRvIHZpZXdDaGFuZ2UuXG4gIC8vICAgICBSZW1vdmUgdGhlIE1BWF9WQUxVRSBpbiB2aWV3Q2hhbmdlXG4gIC8qKlxuICAgKiBTdHJlYW0gY29udGFpbmluZyB0aGUgbGF0ZXN0IGluZm9ybWF0aW9uIG9uIHdoYXQgcm93cyBhcmUgYmVpbmcgZGlzcGxheWVkIG9uIHNjcmVlbi5cbiAgICogQ2FuIGJlIHVzZWQgYnkgdGhlIGRhdGEgc291cmNlIHRvIGFzIGEgaGV1cmlzdGljIG9mIHdoYXQgZGF0YSBzaG91bGQgYmUgcHJvdmlkZWQuXG4gICAqL1xuICB2aWV3Q2hhbmdlID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PHtzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcn0+KHtzdGFydDogMCwgZW5kOiBOdW1iZXIuTUFYX1ZBTFVFfSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fZGF0YURpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKHRoaXMudHJhY2tCeSk7XG4gICAgaWYgKCF0aGlzLnRyZWVDb250cm9sKSB7XG4gICAgICB0aHJvdyBnZXRUcmVlQ29udHJvbE1pc3NpbmdFcnJvcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX25vZGVPdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpO1xuXG4gICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcblxuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmIHR5cGVvZiAodGhpcy5fZGF0YVNvdXJjZSBhcyBEYXRhU291cmNlPFQ+KS5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAodGhpcy5kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmRpc2Nvbm5lY3QodGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICBjb25zdCBkZWZhdWx0Tm9kZURlZnMgPSB0aGlzLl9ub2RlRGVmcy5maWx0ZXIoZGVmID0+ICFkZWYud2hlbik7XG4gICAgaWYgKGRlZmF1bHROb2RlRGVmcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBnZXRUcmVlTXVsdGlwbGVEZWZhdWx0Tm9kZURlZnNFcnJvcigpO1xuICAgIH1cbiAgICB0aGlzLl9kZWZhdWx0Tm9kZURlZiA9IGRlZmF1bHROb2RlRGVmc1swXTtcblxuICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5fbm9kZURlZnMgJiYgIXRoaXMuX2RhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX29ic2VydmVSZW5kZXJDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cblxuICAvLyBUT0RPKHRpbmF5dWFuZ2FvKTogV29yayBvbiBrZXlib2FyZCB0cmF2ZXJzYWwgYW5kIGFjdGlvbnMsIG1ha2Ugc3VyZSBpdCdzIHdvcmtpbmcgZm9yIFJUTFxuICAvLyAgICAgYW5kIG5lc3RlZCB0cmVlcy5cblxuICAvKipcbiAgICogU3dpdGNoIHRvIHRoZSBwcm92aWRlZCBkYXRhIHNvdXJjZSBieSByZXNldHRpbmcgdGhlIGRhdGEgYW5kIHVuc3Vic2NyaWJpbmcgZnJvbSB0aGUgY3VycmVudFxuICAgKiByZW5kZXIgY2hhbmdlIHN1YnNjcmlwdGlvbiBpZiBvbmUgZXhpc3RzLiBJZiB0aGUgZGF0YSBzb3VyY2UgaXMgbnVsbCwgaW50ZXJwcmV0IHRoaXMgYnlcbiAgICogY2xlYXJpbmcgdGhlIG5vZGUgb3V0bGV0LiBPdGhlcndpc2Ugc3RhcnQgbGlzdGVuaW5nIGZvciBuZXcgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgX3N3aXRjaERhdGFTb3VyY2UoZGF0YVNvdXJjZTogRGF0YVNvdXJjZTxUPiB8IE9ic2VydmFibGU8VFtdPiB8IFRbXSkge1xuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmIHR5cGVvZiAodGhpcy5fZGF0YVNvdXJjZSBhcyBEYXRhU291cmNlPFQ+KS5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAodGhpcy5kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmRpc2Nvbm5lY3QodGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgYWxsIGRhdGFOb2RlcyBpZiB0aGVyZSBpcyBub3cgbm8gZGF0YSBzb3VyY2VcbiAgICBpZiAoIWRhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMuX25vZGVPdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIH1cblxuICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgIGlmICh0aGlzLl9ub2RlRGVmcykge1xuICAgICAgdGhpcy5fb2JzZXJ2ZVJlbmRlckNoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0IHVwIGEgc3Vic2NyaXB0aW9uIGZvciB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gIHByaXZhdGUgX29ic2VydmVSZW5kZXJDaGFuZ2VzKCkge1xuICAgIGxldCBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPFRbXSB8IFJlYWRvbmx5QXJyYXk8VD4+IHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKGlzRGF0YVNvdXJjZSh0aGlzLl9kYXRhU291cmNlKSkge1xuICAgICAgZGF0YVN0cmVhbSA9IHRoaXMuX2RhdGFTb3VyY2UuY29ubmVjdCh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGFTb3VyY2UgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICBkYXRhU3RyZWFtID0gdGhpcy5fZGF0YVNvdXJjZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fZGF0YVNvdXJjZSkpIHtcbiAgICAgIGRhdGFTdHJlYW0gPSBvYnNlcnZhYmxlT2YodGhpcy5fZGF0YVNvdXJjZSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFTdHJlYW0pIHtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24gPSBkYXRhU3RyZWFtLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLnJlbmRlck5vZGVDaGFuZ2VzKGRhdGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZ2V0VHJlZU5vVmFsaWREYXRhU291cmNlRXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2hlY2sgZm9yIGNoYW5nZXMgbWFkZSBpbiB0aGUgZGF0YSBhbmQgcmVuZGVyIGVhY2ggY2hhbmdlIChub2RlIGFkZGVkL3JlbW92ZWQvbW92ZWQpLiAqL1xuICByZW5kZXJOb2RlQ2hhbmdlcyhkYXRhOiBUW10gfCBSZWFkb25seUFycmF5PFQ+LCBkYXRhRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxUPiA9IHRoaXMuX2RhdGFEaWZmZXIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYgPSB0aGlzLl9ub2RlT3V0bGV0LnZpZXdDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERhdGE/OiBUKSB7XG4gICAgY29uc3QgY2hhbmdlcyA9IGRhdGFEaWZmZXIuZGlmZihkYXRhKTtcbiAgICBpZiAoIWNoYW5nZXMpIHsgcmV0dXJuOyB9XG5cbiAgICBjaGFuZ2VzLmZvckVhY2hPcGVyYXRpb24oKGl0ZW06IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRqdXN0ZWRQcmV2aW91c0luZGV4OiBudW1iZXIgfCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEluZGV4OiBudW1iZXIgfCBudWxsKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLnByZXZpb3VzSW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuaW5zZXJ0Tm9kZShkYXRhW2N1cnJlbnRJbmRleCFdLCBjdXJyZW50SW5kZXghLCB2aWV3Q29udGFpbmVyLCBwYXJlbnREYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgIHZpZXdDb250YWluZXIucmVtb3ZlKGFkanVzdGVkUHJldmlvdXNJbmRleCEpO1xuICAgICAgICAgIHRoaXMuX2xldmVscy5kZWxldGUoaXRlbS5pdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB2aWV3ID0gdmlld0NvbnRhaW5lci5nZXQoYWRqdXN0ZWRQcmV2aW91c0luZGV4ISk7XG4gICAgICAgICAgdmlld0NvbnRhaW5lci5tb3ZlKHZpZXchLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyB0aGUgbWF0Y2hpbmcgbm9kZSBkZWZpbml0aW9uIHRoYXQgc2hvdWxkIGJlIHVzZWQgZm9yIHRoaXMgbm9kZSBkYXRhLiBJZiB0aGVyZSBpcyBvbmx5XG4gICAqIG9uZSBub2RlIGRlZmluaXRpb24sIGl0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIGZpbmQgdGhlIG5vZGUgZGVmaW5pdGlvbiB0aGF0IGhhcyBhIHdoZW5cbiAgICogcHJlZGljYXRlIHRoYXQgcmV0dXJucyB0cnVlIHdpdGggdGhlIGRhdGEuIElmIG5vbmUgcmV0dXJuIHRydWUsIHJldHVybiB0aGUgZGVmYXVsdCBub2RlXG4gICAqIGRlZmluaXRpb24uXG4gICAqL1xuICBfZ2V0Tm9kZURlZihkYXRhOiBULCBpOiBudW1iZXIpOiBDZGtUcmVlTm9kZURlZjxUPiB7XG4gICAgaWYgKHRoaXMuX25vZGVEZWZzLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gdGhpcy5fbm9kZURlZnMuZmlyc3Q7IH1cblxuICAgIGNvbnN0IG5vZGVEZWYgPVxuICAgICAgdGhpcy5fbm9kZURlZnMuZmluZChkZWYgPT4gZGVmLndoZW4gJiYgZGVmLndoZW4oaSwgZGF0YSkpIHx8IHRoaXMuX2RlZmF1bHROb2RlRGVmO1xuICAgIGlmICghbm9kZURlZikgeyB0aHJvdyBnZXRUcmVlTWlzc2luZ01hdGNoaW5nTm9kZURlZkVycm9yKCk7IH1cblxuICAgIHJldHVybiBub2RlRGVmO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgZW1iZWRkZWQgdmlldyBmb3IgdGhlIGRhdGEgbm9kZSB0ZW1wbGF0ZSBhbmQgcGxhY2UgaXQgaW4gdGhlIGNvcnJlY3QgaW5kZXggbG9jYXRpb25cbiAgICogd2l0aGluIHRoZSBkYXRhIG5vZGUgdmlldyBjb250YWluZXIuXG4gICAqL1xuICBpbnNlcnROb2RlKG5vZGVEYXRhOiBULCBpbmRleDogbnVtYmVyLCB2aWV3Q29udGFpbmVyPzogVmlld0NvbnRhaW5lclJlZiwgcGFyZW50RGF0YT86IFQpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5fZ2V0Tm9kZURlZihub2RlRGF0YSwgaW5kZXgpO1xuXG4gICAgLy8gTm9kZSBjb250ZXh0IHRoYXQgd2lsbCBiZSBwcm92aWRlZCB0byBjcmVhdGVkIGVtYmVkZGVkIHZpZXdcbiAgICBjb25zdCBjb250ZXh0ID0gbmV3IENka1RyZWVOb2RlT3V0bGV0Q29udGV4dDxUPihub2RlRGF0YSk7XG5cbiAgICAvLyBJZiB0aGUgdHJlZSBpcyBmbGF0IHRyZWUsIHRoZW4gdXNlIHRoZSBgZ2V0TGV2ZWxgIGZ1bmN0aW9uIGluIGZsYXQgdHJlZSBjb250cm9sXG4gICAgLy8gT3RoZXJ3aXNlLCB1c2UgdGhlIGxldmVsIG9mIHBhcmVudCBub2RlLlxuICAgIGlmICh0aGlzLnRyZWVDb250cm9sLmdldExldmVsKSB7XG4gICAgICBjb250ZXh0LmxldmVsID0gdGhpcy50cmVlQ29udHJvbC5nZXRMZXZlbChub2RlRGF0YSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyZW50RGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5fbGV2ZWxzLmhhcyhwYXJlbnREYXRhKSkge1xuICAgICAgY29udGV4dC5sZXZlbCA9IHRoaXMuX2xldmVscy5nZXQocGFyZW50RGF0YSkhICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGV4dC5sZXZlbCA9IDA7XG4gICAgfVxuICAgIHRoaXMuX2xldmVscy5zZXQobm9kZURhdGEsIGNvbnRleHQubGV2ZWwpO1xuXG4gICAgLy8gVXNlIGRlZmF1bHQgdHJlZSBub2RlT3V0bGV0LCBvciBuZXN0ZWQgbm9kZSdzIG5vZGVPdXRsZXRcbiAgICBjb25zdCBjb250YWluZXIgPSB2aWV3Q29udGFpbmVyID8gdmlld0NvbnRhaW5lciA6IHRoaXMuX25vZGVPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICBjb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KG5vZGUudGVtcGxhdGUsIGNvbnRleHQsIGluZGV4KTtcblxuICAgIC8vIFNldCB0aGUgZGF0YSB0byBqdXN0IGNyZWF0ZWQgYENka1RyZWVOb2RlYC5cbiAgICAvLyBUaGUgYENka1RyZWVOb2RlYCBjcmVhdGVkIGZyb20gYGNyZWF0ZUVtYmVkZGVkVmlld2Agd2lsbCBiZSBzYXZlZCBpbiBzdGF0aWMgdmFyaWFibGVcbiAgICAvLyAgICAgYG1vc3RSZWNlbnRUcmVlTm9kZWAuIFdlIGdldCBpdCBmcm9tIHN0YXRpYyB2YXJpYWJsZSBhbmQgcGFzcyB0aGUgbm9kZSBkYXRhIHRvIGl0LlxuICAgIGlmIChDZGtUcmVlTm9kZS5tb3N0UmVjZW50VHJlZU5vZGUpIHtcbiAgICAgIENka1RyZWVOb2RlLm1vc3RSZWNlbnRUcmVlTm9kZS5kYXRhID0gbm9kZURhdGE7XG4gICAgfVxuICB9XG59XG5cblxuLyoqXG4gKiBUcmVlIG5vZGUgZm9yIENka1RyZWUuIEl0IGNvbnRhaW5zIHRoZSBkYXRhIGluIHRoZSB0cmVlIG5vZGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2Nkay10cmVlLW5vZGUnLFxuICBleHBvcnRBczogJ2Nka1RyZWVOb2RlJyxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdpc0V4cGFuZGVkJyxcbiAgICAnW2F0dHIuYXJpYS1sZXZlbF0nOiAncm9sZSA9PT0gXCJ0cmVlaXRlbVwiID8gbGV2ZWwgOiBudWxsJyxcbiAgICAnW2F0dHIucm9sZV0nOiAncm9sZScsXG4gICAgJ2NsYXNzJzogJ2Nkay10cmVlLW5vZGUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDZGtUcmVlTm9kZTxUPiBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBtb3N0IHJlY2VudGx5IGNyZWF0ZWQgYENka1RyZWVOb2RlYC4gV2Ugc2F2ZSBpdCBpbiBzdGF0aWMgdmFyaWFibGUgc28gd2UgY2FuIHJldHJpZXZlIGl0XG4gICAqIGluIGBDZGtUcmVlYCBhbmQgc2V0IHRoZSBkYXRhIHRvIGl0LlxuICAgKi9cbiAgc3RhdGljIG1vc3RSZWNlbnRUcmVlTm9kZTogQ2RrVHJlZU5vZGU8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJvdGVjdGVkIF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBub2RlJ3MgZGF0YSBoYXMgY2hhbmdlZC4gKi9cbiAgX2RhdGFDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogVGhlIHRyZWUgbm9kZSdzIGRhdGEuICovXG4gIGdldCBkYXRhKCk6IFQgeyByZXR1cm4gdGhpcy5fZGF0YTsgfVxuICBzZXQgZGF0YSh2YWx1ZTogVCkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICAgICAgdGhpcy5fc2V0Um9sZUZyb21EYXRhKCk7XG4gICAgICB0aGlzLl9kYXRhQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICB9XG4gIHByb3RlY3RlZCBfZGF0YTogVDtcblxuICBnZXQgaXNFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGVkKHRoaXMuX2RhdGEpO1xuICB9XG5cbiAgZ2V0IGxldmVsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwgPyB0aGlzLl90cmVlLnRyZWVDb250cm9sLmdldExldmVsKHRoaXMuX2RhdGEpIDogMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9sZSBvZiB0aGUgbm9kZSBzaG91bGQgYmUgJ2dyb3VwJyBpZiBpdCdzIGFuIGludGVybmFsIG5vZGUsXG4gICAqIGFuZCAndHJlZWl0ZW0nIGlmIGl0J3MgYSBsZWFmIG5vZGUuXG4gICAqL1xuICBASW5wdXQoKSByb2xlOiAndHJlZWl0ZW0nIHwgJ2dyb3VwJyA9ICd0cmVlaXRlbSc7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF90cmVlOiBDZGtUcmVlPFQ+KSB7XG4gICAgQ2RrVHJlZU5vZGUubW9zdFJlY2VudFRyZWVOb2RlID0gdGhpcyBhcyBDZGtUcmVlTm9kZTxUPjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vIElmIHRoaXMgaXMgdGhlIGxhc3QgdHJlZSBub2RlIGJlaW5nIGRlc3Ryb3llZCxcbiAgICAvLyBjbGVhciBvdXQgdGhlIHJlZmVyZW5jZSB0byBhdm9pZCBsZWFraW5nIG1lbW9yeS5cbiAgICBpZiAoQ2RrVHJlZU5vZGUubW9zdFJlY2VudFRyZWVOb2RlID09PSB0aGlzKSB7XG4gICAgICBDZGtUcmVlTm9kZS5tb3N0UmVjZW50VHJlZU5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX2RhdGFDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBtZW51IGl0ZW0uIEltcGxlbWVudHMgZm9yIEZvY3VzYWJsZU9wdGlvbi4gKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3NldFJvbGVGcm9tRGF0YSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGFibGUpIHtcbiAgICAgIHRoaXMucm9sZSA9IHRoaXMuX3RyZWUudHJlZUNvbnRyb2wuaXNFeHBhbmRhYmxlKHRoaXMuX2RhdGEpID8gJ2dyb3VwJyA6ICd0cmVlaXRlbSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5fdHJlZS50cmVlQ29udHJvbC5nZXRDaGlsZHJlbikge1xuICAgICAgICB0aHJvdyBnZXRUcmVlQ29udHJvbEZ1bmN0aW9uc01pc3NpbmdFcnJvcigpO1xuICAgICAgfVxuICAgICAgY29uc3QgY2hpbGRyZW5Ob2RlcyA9IHRoaXMuX3RyZWUudHJlZUNvbnRyb2wuZ2V0Q2hpbGRyZW4odGhpcy5fZGF0YSk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbk5vZGVzKSkge1xuICAgICAgICB0aGlzLl9zZXRSb2xlRnJvbUNoaWxkcmVuKGNoaWxkcmVuTm9kZXMgYXMgVFtdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hpbGRyZW5Ob2RlcyBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgY2hpbGRyZW5Ob2Rlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShjaGlsZHJlbiA9PiB0aGlzLl9zZXRSb2xlRnJvbUNoaWxkcmVuKGNoaWxkcmVuKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zZXRSb2xlRnJvbUNoaWxkcmVuKGNoaWxkcmVuOiBUW10pIHtcbiAgICB0aGlzLnJvbGUgPSBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPyAnZ3JvdXAnIDogJ3RyZWVpdGVtJztcbiAgfVxufVxuIl19