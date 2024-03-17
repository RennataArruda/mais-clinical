import {merge, Observable, Subject, Subscription} from 'rxjs';
import {combineAll, finalize, takeUntil} from 'rxjs/operators';

export class WatchSubscription {

    private constructor(private unsubscribe$: Subject<void>) { }

    public static createInstance(unsubscribe$: Subject<void> = new Subject()): WatchSubscription {
        return new WatchSubscription(unsubscribe$);
    }   

    get unsubscriber(): Subject<void> {
        return this.unsubscribe$;
    }

    destroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    wrapUp(observer: Observable<any>): Observable<any> {
        return observer.pipe(takeUntil(this.unsubscribe$));
    }

    watch(observer: Observable<any>, next: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.wrapUp(observer).pipe(finalize(() => complete && complete())).subscribe(next, error);
    }

    watchGroup(observers: Observable<any>[], next: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.group(observers).pipe(finalize(() => complete && complete())).subscribe(next, error);
    }

    group(observers: Observable<any>[]): Observable<any> {
        return this.wrapUp(merge(observers)).pipe(combineAll());
    }

}