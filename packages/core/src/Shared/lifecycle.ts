import { IDisposable } from '@wendellhu/redi';
import { Subscription, SubscriptionLike } from 'rxjs';
import { isSubscription } from 'rxjs/internal/Subscription';

export function toDisposable(subscription: SubscriptionLike): IDisposable;
export function toDisposable(callback: () => void): IDisposable;
export function toDisposable(v: SubscriptionLike | (() => void)): IDisposable {
    if (isSubscription(v)) {
        return {
            dispose: () => v.unsubscribe(),
        };
    }

    return {
        dispose: v as () => void,
    };
}

/**
 * @deprecated use toDisposable instead
 */
export function fromObservable(subscription: Subscription) {
    return toDisposable(() => {
        subscription.unsubscribe();
    });
}

export class DisposableCollection implements IDisposable {
    private readonly _disposables = new Set<IDisposable>();

    add(disposable: IDisposable): IDisposable {
        this._disposables.add(disposable);
        return {
            dispose: () => {
                disposable.dispose();
                this._disposables.delete(disposable);
            },
        };
    }

    dispose(): void {}
}

export class Disposable implements IDisposable {
    private readonly _collection = new DisposableCollection();

    disposeWithMe(disposable: IDisposable): IDisposable {
        return this._collection.add(disposable);
    }

    dispose(): void {
        this._collection.dispose();
    }
}
