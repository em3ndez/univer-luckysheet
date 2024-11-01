/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * `FBase` is a base class for all facade classes.
 * It provides a way to extend classes with static and instance methods.
 * The `_initialize` as a special method that will be called after the constructor. You should never call it directly.
 */
export abstract class FBase {
    private static _constructorQueue: Array<() => void> = [];

    constructor() {
        // eslint-disable-next-line ts/no-this-alias
        const self = this;
        FBase._constructorQueue.forEach(function (fn) {
            fn.apply(self);
        });
    }

    _initialize() { }

    static extend(source: any): void {
        Object.getOwnPropertyNames(source.prototype).forEach((name) => {
            if (name === '_initialize') {
                FBase._constructorQueue.push(source.prototype._initialize);
            } else if (name !== 'constructor') {
                // @ts-ignore
                this.prototype[name] = source.prototype[name];
            }
        });

        Object.getOwnPropertyNames(source).forEach((name) => {
            if (name !== 'prototype' && name !== 'name' && name !== 'length') {
                // @ts-ignore
                this[name] = source[name];
            }
        });
    }
}
