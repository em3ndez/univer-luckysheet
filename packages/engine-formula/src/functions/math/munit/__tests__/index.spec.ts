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

import { describe, expect, it } from 'vitest';

import { ErrorType } from '../../../../basics/error-type';
import { ArrayValueObject, transformToValueObject } from '../../../../engine/value-object/array-value-object';
import { ErrorValueObject } from '../../../../engine/value-object/base-value-object';
import { BooleanValueObject, NullValueObject, NumberValueObject, StringValueObject } from '../../../../engine/value-object/primitive-object';
import { getObjectValue } from '../../../__tests__/create-function-test-bed';
import { FUNCTION_NAMES_MATH } from '../../function-names';
import { Munit } from '../index';

describe('Test munit function', () => {
    const testFunction = new Munit(FUNCTION_NAMES_MATH.MUNIT);

    describe('Munit', () => {
        it('Value is normal number', () => {
            const dimension = NumberValueObject.create(3);
            const result = testFunction.calculate(dimension);
            expect(getObjectValue(result)).toStrictEqual([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1],
            ]);
        });

        it('Value is number string', () => {
            const dimension = StringValueObject.create('1.5');
            const result = testFunction.calculate(dimension);
            expect(getObjectValue(result)).toStrictEqual([
                [1],
            ]);
        });

        it('Value is normal string', () => {
            const dimension = StringValueObject.create('test');
            const result = testFunction.calculate(dimension);
            expect(getObjectValue(result)).toBe(ErrorType.VALUE);
        });

        it('Value is boolean', () => {
            const dimension = BooleanValueObject.create(true);
            const result = testFunction.calculate(dimension);
            expect(getObjectValue(result)).toStrictEqual([
                [1],
            ]);
        });
        it('Value is blank cell', () => {
            const dimension = NullValueObject.create();
            const result = testFunction.calculate(dimension);
            expect(getObjectValue(result)).toBe(ErrorType.VALUE);
        });
        it('Value is error', () => {
            const dimension = ErrorValueObject.create(ErrorType.NAME);
            const result = testFunction.calculate(dimension);
            expect(getObjectValue(result)).toBe(ErrorType.NAME);
        });

        it('Value is array', () => {
            const dimension = ArrayValueObject.create({
                calculateValueList: transformToValueObject([
                    [1, ' ', 1.23, true, false, null],
                    [0, '100', '2.34', 'test', -3.4, ErrorType.NAME],
                ]),
                rowCount: 2,
                columnCount: 6,
                unitId: '',
                sheetId: '',
                row: 0,
                column: 0,
            });
            const result = testFunction.calculate(dimension);
            expect(getObjectValue(result)).toStrictEqual([
                [1, ErrorType.VALUE, 1, 1, ErrorType.VALUE, ErrorType.VALUE],
                [ErrorType.VALUE, 1, 1, ErrorType.VALUE, ErrorType.VALUE, ErrorType.NAME],
            ]);

            const dimension2 = ArrayValueObject.create({
                calculateValueList: transformToValueObject([
                    [1],
                ]),
                rowCount: 1,
                columnCount: 1,
                unitId: '',
                sheetId: '',
                row: 0,
                column: 0,
            });
            const result2 = testFunction.calculate(dimension2);
            expect(getObjectValue(result2)).toStrictEqual([
                [1],
            ]);
        });
    });
});
