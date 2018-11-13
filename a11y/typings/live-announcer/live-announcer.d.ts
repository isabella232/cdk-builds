/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ContentObserver } from '@angular/cdk/observers';
import { ElementRef, NgZone, OnDestroy, Provider } from '@angular/core';
/** Possible politeness levels. */
export declare type AriaLivePoliteness = 'off' | 'polite' | 'assertive';
export declare class LiveAnnouncer implements OnDestroy {
    private _ngZone;
    private _liveElement;
    private _document;
    private _previousTimeout?;
    constructor(elementToken: any, _ngZone: NgZone, _document: any);
    /**
     * Announces a message to screenreaders.
     * @param message Message to be announced to the screenreader
     * @param politeness The politeness of the announcer element
     * @returns Promise that will be resolved when the message is added to the DOM.
     */
    announce(message: string, politeness?: AriaLivePoliteness): Promise<void>;
    ngOnDestroy(): void;
    private _createLiveElement;
}
/**
 * A directive that works similarly to aria-live, but uses the LiveAnnouncer to ensure compatibility
 * with a wider range of browsers and screen readers.
 */
export declare class CdkAriaLive implements OnDestroy {
    private _elementRef;
    private _liveAnnouncer;
    private _contentObserver;
    private _ngZone;
    /** The aria-live politeness level to use when announcing messages. */
    politeness: AriaLivePoliteness;
    private _politeness;
    private _previousAnnouncedText?;
    private _subscription;
    constructor(_elementRef: ElementRef, _liveAnnouncer: LiveAnnouncer, _contentObserver: ContentObserver, _ngZone: NgZone);
    ngOnDestroy(): void;
}
/** @docs-private @deprecated @breaking-change 8.0.0 */
export declare function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher: LiveAnnouncer, liveElement: any, _document: any, ngZone: NgZone): LiveAnnouncer;
/** @docs-private @deprecated @breaking-change 8.0.0 */
export declare const LIVE_ANNOUNCER_PROVIDER: Provider;
