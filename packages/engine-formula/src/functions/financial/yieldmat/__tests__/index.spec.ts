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

import { FUNCTION_NAMES_FINANCIAL } from '../../function-names';
import { Yieldmat } from '../index';
import { BooleanValueObject, NullValueObject, NumberValueObject, StringValueObject } from '../../../../engine/value-object/primitive-object';
import { ArrayValueObject, transformToValueObject } from '../../../../engine/value-object/array-value-object';
import { ErrorValueObject } from '../../../../engine/value-object/base-value-object';
import { ErrorType } from '../../../../basics/error-type';

describe('Test yieldmat function', () => {
    const testFunction = new Yieldmat(FUNCTION_NAMES_FINANCIAL.YIELDMAT);

    describe('Yieldmat', () => {
        it('Value is normal', () => {
            const settlement = StringValueObject.create('2008-11-11');
            const maturity = StringValueObject.create('2021-3-1');
            const issue = StringValueObject.create('2008-10-15');
            const rate = NumberValueObject.create(0.0785);
            const pr = NumberValueObject.create(98.45);
            const basis = NumberValueObject.create(1);
            const result = testFunction.calculate(settlement, maturity, issue, rate, pr, basis);
            expect(result.getValue()).toStrictEqual(0.08054463998901565);
        });

        it('Value is normal, but correct order is maturity > settlement > issue, otherwise return #NUM!', () => {
            const settlement = StringValueObject.create('2018-11-11');
            const maturity = StringValueObject.create('2021-3-1');
            const issue = StringValueObject.create('2028-10-15');
            const rate = NumberValueObject.create(0.0785);
            const pr = NumberValueObject.create(98.45);
            const basis = NumberValueObject.create(1);
            const result = testFunction.calculate(settlement, maturity, issue, rate, pr, basis);
            expect(result.getValue()).toStrictEqual(ErrorType.NUM);
        });

        it('Rate < 0', () => {
            const settlement = StringValueObject.create('2008-11-11');
            const maturity = StringValueObject.create('2021-3-1');
            const issue = StringValueObject.create('2008-10-15');
            const rate = NumberValueObject.create(-0.0785);
            const pr = NumberValueObject.create(98.45);
            const basis = NumberValueObject.create(1);
            const result = testFunction.calculate(settlement, maturity, issue, rate, pr, basis);
            expect(result.getValue()).toStrictEqual(ErrorType.NUM);
        });

        it('Pr <= 0', () => {
            const settlement = StringValueObject.create('2008-11-11');
            const maturity = StringValueObject.create('2021-3-1');
            const issue = StringValueObject.create('2008-10-15');
            const rate = NumberValueObject.create(0.0785);
            const pr = NumberValueObject.create(0);
            const basis = NumberValueObject.create(1);
            const result = testFunction.calculate(settlement, maturity, issue, rate, pr, basis);
            expect(result.getValue()).toStrictEqual(ErrorType.NUM);
        });

        it('Basis value test', () => {
            const settlement = StringValueObject.create('2008-11-11');
            const maturity = StringValueObject.create('2021-3-1');
            const issue = StringValueObject.create('2008-10-15');
            const rate = NumberValueObject.create(0.0785);
            const pr = NumberValueObject.create(98.45);
            const basis = NumberValueObject.create(5);
            const result = testFunction.calculate(settlement, maturity, issue, rate, pr, basis);
            expect(result.getValue()).toStrictEqual(ErrorType.NUM);

            const basis2 = NumberValueObject.create(0);
            const result2 = testFunction.calculate(settlement, maturity, issue, rate, pr, basis2);
            expect(result2.getValue()).toStrictEqual(0.08055145927494163);

            const basis3 = NumberValueObject.create(2);
            const result3 = testFunction.calculate(settlement, maturity, issue, rate, pr, basis3);
            expect(result3.getValue()).toStrictEqual(0.08051589089528836);

            const basis4 = NumberValueObject.create(3);
            const result4 = testFunction.calculate(settlement, maturity, issue, rate, pr, basis4);
            expect(result4.getValue()).toStrictEqual(0.08053986600547684);

            const basis5 = NumberValueObject.create(4);
            const result5 = testFunction.calculate(settlement, maturity, issue, rate, pr, basis5);
            expect(result5.getValue()).toStrictEqual(0.08055145927494163);

            const basis6 = NullValueObject.create();
            const result6 = testFunction.calculate(settlement, maturity, issue, rate, pr, basis6);
            expect(result6.getValue()).toStrictEqual(0.08055145927494163);
        });

        it('Value is error', () => {
            const settlement = ErrorValueObject.create(ErrorType.NAME);
            const maturity = StringValueObject.create('2021-3-1');
            const issue = StringValueObject.create('2008-10-15');
            const rate = NumberValueObject.create(0.0785);
            const pr = NumberValueObject.create(98.45);
            const basis = NumberValueObject.create(1);
            const result = testFunction.calculate(settlement, maturity, issue, rate, pr, basis);
            expect(result.getValue()).toStrictEqual(ErrorType.NAME);
        });

        it('Value is boolean', () => {
            const settlement = StringValueObject.create('2008-11-11');
            const maturity = StringValueObject.create('2021-3-1');
            const issue = StringValueObject.create('2008-10-15');
            const rate = NumberValueObject.create(0.0785);
            const pr = NumberValueObject.create(98.45);
            const basis = BooleanValueObject.create(true);
            const result = testFunction.calculate(settlement, maturity, issue, rate, pr, basis);
            expect(result.getValue()).toStrictEqual(ErrorType.VALUE);
        });

        it('Value is normal string', () => {
            const settlement = StringValueObject.create('test');
            const maturity = StringValueObject.create('2021-3-1');
            const issue = StringValueObject.create('2008-10-15');
            const rate = NumberValueObject.create(0.0785);
            const pr = NumberValueObject.create(98.45);
            const basis = NumberValueObject.create(1);
            const result = testFunction.calculate(settlement, maturity, issue, rate, pr, basis);
            expect(result.getValue()).toStrictEqual(ErrorType.VALUE);

            const settlement2 = StringValueObject.create('2008-11-11');
            const maturity2 = StringValueObject.create('test');
            const result2 = testFunction.calculate(settlement2, maturity2, issue, rate, pr, basis);
            expect(result2.getValue()).toStrictEqual(ErrorType.VALUE);

            const issue2 = StringValueObject.create('test');
            const result3 = testFunction.calculate(settlement2, maturity, issue2, rate, pr, basis);
            expect(result3.getValue()).toStrictEqual(ErrorType.VALUE);

            const rate2 = StringValueObject.create('test');
            const result4 = testFunction.calculate(settlement2, maturity, issue, rate2, pr, basis);
            expect(result4.getValue()).toStrictEqual(ErrorType.VALUE);
        });

        it('Value is array', () => {
            const settlement = ArrayValueObject.create({
                calculateValueList: transformToValueObject([
                    ['2012-3-29', 'test', true, false, ErrorType.NAME],
                ]),
                rowCount: 1,
                columnCount: 5,
                unitId: '',
                sheetId: '',
                row: 0,
                column: 0,
            });
            const maturity = StringValueObject.create('2021-3-1');
            const issue = StringValueObject.create('2008-10-15');
            const rate = NumberValueObject.create(0.0785);
            const pr = NumberValueObject.create(98.45);
            const basis = NumberValueObject.create(1);
            const result = testFunction.calculate(settlement, maturity, issue, rate, pr, basis);
            expect(result.getValue()).toStrictEqual(ErrorType.VALUE);
        });
    });
});
